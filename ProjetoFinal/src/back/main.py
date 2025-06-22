import os
from fastapi import FastAPI, Depends, HTTPException, Path, Request
from sqlalchemy.orm import Session
import google.generativeai as genai
from fastapi.responses import StreamingResponse, Response
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

import models
import schemas
import crud
import export_services
from database import engine
from auth import router as auth_router, get_current_active_user, get_db

load_dotenv()
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API de Geração de Conteúdo Educacional",
    description="Gere textos de apoio, listas de exercícios e exporte em DOCX ou PDF.",
    version="2.0.0"
)

# Configuração CORS corrigida
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Adicionar ambos os endereços
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],  # Permitir todos os cabeçalhos
)

api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise RuntimeError("A variável de ambiente GOOGLE_API_KEY não foi definida.")
genai.configure(api_key=api_key)

def get_generative_model():
    return genai.GenerativeModel('gemini-1.5-flash')

app.include_router(auth_router, prefix="/auth")

@app.get("/", tags=["Status"])
def read_root():
    return {"message": "Bem-vindo à API de Geração de Conteúdo v2.0!"}


@app.post("/textos-apoio", response_model=schemas.TextoGerado, tags=["Geração"])
def gerar_texto_de_apoio(
    request: schemas.GeracaoTextoRequest,
    db: Session = Depends(get_db),
    model: genai.GenerativeModel = Depends(get_generative_model),
    current_user: schemas.User = Depends(get_current_active_user)
):
    """
    Gera um texto de apoio ou resumo sobre um tópico específico.
    """
    # Ajustes específicos baseados na matéria
    estilo_especifico = ""
    if request.materia.lower() == "matemática":
        estilo_especifico = """
        - Use exemplos numéricos claros para ilustrar conceitos
        - Quando incluir fórmulas matemáticas, formate-as em negrito e separadas em linhas próprias
        - Evite notações complexas, prefira explicações passo a passo
        - Use marcadores para listar propriedades ou regras importantes
        """
    elif request.materia.lower() in ["física", "química"]:
        estilo_especifico = """
        - Inclua exemplos práticos do cotidiano para ilustrar conceitos
        - Quando mencionar fórmulas, explique o significado de cada variável
        - Use marcadores para listar fenômenos ou reações importantes
        - Divida temas complexos em partes menores e mais digeríveis
        """
    elif request.materia.lower() in ["história", "geografia"]:
        estilo_especifico = """
        - Organize o conteúdo em ordem cronológica (para história) ou espacial (para geografia)
        - Destaque datas, locais e personagens importantes em negrito
        - Use subtópicos para separar períodos históricos ou regiões geográficas
        - Inclua contextos relevantes para facilitar a compreensão
        """
    elif request.materia.lower() == "português":
        estilo_especifico = """
        - Use exemplos de texto para ilustrar regras gramaticais ou conceitos literários
        - Destaque exceções às regras em um formato visual diferente
        - Organize regras gramaticais em tabelas quando apropriado
        - Use comparações entre termos semelhantes para evitar confusões comuns
        """
    elif request.materia.lower() == "biologia":
        estilo_especifico = """
        - Use analogias para explicar processos biológicos complexos
        - Organize informações sobre taxonomia ou classificações em listas
        - Destaque termos científicos em negrito na primeira menção
        - Use estrutura hierárquica para mostrar relações entre conceitos
        """

    prompt = f"""
    Crie um texto de apoio didático e claro sobre o tópico '{request.topico}' da matéria de '{request.materia}', para alunos do ensino {request.nivel}.

    **Instruções de Formatação OBRIGATÓRIAS:**
    - Utilize o formato Markdown para estruturar o texto.
    - Use um título principal claro e relevante
    - Divida o conteúdo em seções lógicas com subtítulos ('##')
    - O texto DEVE conter parágrafos distintos (separados por uma linha em branco).
    - Use subtítulos com '##' para as seções mais importantes.
    - Se fizer sentido, use listas com marcadores (usando '*' ou '-') para listar exemplos ou pontos-chave.
    - Use negrito (com '**texto**') para destacar os termos mais importantes.
    - Utilize itálico para termos secundários quando apropriado.
    - Use espaçamento adequado para melhorar a legibilidade.

    {estilo_especifico}

    **Estrutura Sugerida:**
    1. Introdução ao conceito (contextualização)
    2. Explicação principal do tópico
    3. Exemplos ou aplicações práticas
    4. Resumo ou pontos-chave para lembrar

    Mantenha uma linguagem adequada ao nível de ensino especificado. Gere o texto estruturado agora.
    """
    try:
        response = model.generate_content(prompt)
        tema = f"{request.topico} ({request.materia} - {request.nivel})"
        
        # Limpa possíveis blocos de código da resposta da IA
        cleaned_response = response.text.strip().replace("```markdown", "").replace("```", "").strip()

        texto_a_salvar = schemas.TextoGeradoCreate(tema=tema, conteudo=cleaned_response)
        return crud.create_texto_gerado(db=db, texto=texto_a_salvar)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/listas-exercicios", response_model=schemas.ListaExercicios, tags=["Geração"])
def gerar_lista_de_exercicios(
    request: schemas.GeracaoListaExerciciosRequest,
    db: Session = Depends(get_db),
    model: genai.GenerativeModel = Depends(get_generative_model),
    current_user: schemas.User = Depends(get_current_active_user)
):
    """
    Gera uma lista de exercícios sobre um tópico específico.
    """
    prompt = f"""
    Com base no tópico '{request.topico}' da matéria de '{request.materia}' para o ensino {request.nivel}, gere {request.quantidade_exercicios} exercícios do tipo '{request.tipo_exercicio}'.

    Instruções de Formato OBRIGATÓRIAS:
    - Sua resposta deve ser um único objeto JSON.
    - Este objeto deve ter uma única chave: "exercicios".
    - O valor de "exercicios" deve ser uma LISTA de objetos, onde cada objeto representa um exercício.
    - Cada exercício DEVE ter EXATAMENTE as seguintes chaves: "enunciado", "tipo", "opcoes", "resposta_correta".
    - O campo "opcoes" deve ser um dicionário como {{"A": "...", "B": "..."}}. Se for dissertativo, use null.
    """
    try:
        response = model.generate_content(prompt)
        
        cleaned_ia_response = response.text.strip().replace("```json", "").replace("```", "").strip()

        return crud.create_lista_exercicios(db=db, request=request, dados_ia=cleaned_ia_response)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/textos-apoio/{texto_id}/exportar/{formato}", tags=["Exportação"])
def exportar_texto(
    texto_id: int,
    formato: str = Path(..., description="Formato do arquivo: 'pdf' ou 'docx'"),
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_active_user)
):
    """
    Exporta um texto de apoio gerado para o formato DOCX ou PDF.
    """
    db_texto = crud.get_texto_gerado_by_id(db, texto_id)
    if not db_texto:
        raise HTTPException(status_code=404, detail="Texto de apoio não encontrado.")

    filename = f"texto_apoio_{texto_id}.{formato}"
    if formato == "pdf":
        file_stream = export_services.gerar_pdf_texto_apoio(db_texto)
        media_type = "application/pdf"
    elif formato == "docx":
        file_stream = export_services.gerar_docx_texto_apoio(db_texto)
        media_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    else:
        raise HTTPException(status_code=400, detail="Formato inválido. Use 'pdf' ou 'docx'.")

    headers = {"Content-Disposition": f'attachment; filename="{filename}"'}
    return StreamingResponse(file_stream, media_type=media_type, headers=headers)


@app.get("/listas-exercicios/{lista_id}/exportar/{formato}", tags=["Exportação"])
def exportar_lista_exercicios(
    lista_id: int,
    formato: str = Path(..., description="Formato do arquivo: 'pdf' ou 'docx'"),
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_active_user)
):
    """
    Exporta uma lista de exercícios (com gabarito) para o formato DOCX ou PDF.
    """
    db_lista = crud.get_lista_exercicios_by_id(db, lista_id)
    if not db_lista:
        raise HTTPException(status_code=404, detail="Lista de exercícios não encontrada.")

    filename = f"lista_exercicios_{lista_id}.{formato}"
    if formato == "pdf":
        file_stream = export_services.gerar_pdf_lista_exercicios(db_lista)
        media_type = "application/pdf"
    elif formato == "docx":
        file_stream = export_services.gerar_docx_lista_exercicios(db_lista)
        media_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    else:
        raise HTTPException(status_code=400, detail="Formato inválido. Use 'pdf' ou 'docx'.")

    headers = {"Content-Disposition": f'attachment; filename="{filename}"'}
    return StreamingResponse(file_stream, media_type=media_type, headers=headers)

@app.post("/avaliacoes", response_model=schemas.ListaExercicios, tags=["Geração"])
def gerar_avaliacao(
    request: schemas.GeracaoAvaliacaoRequest,
    db: Session = Depends(get_db),
    model: genai.GenerativeModel = Depends(get_generative_model),
    current_user: schemas.User = Depends(get_current_active_user)
):
    """
    Gera uma avaliação com exercícios aleatórios com base no nível de dificuldade.
    """
    prompt = f"""
    Com base no tópico '{request.topico}' da matéria de '{request.materia}' para o ensino {request.nivel}, gere {request.quantidade_exercicios} exercícios com o nível de dificuldade '{request.dificuldade}'.

    Instruções de Formato OBRIGATÓRIAS:
    - Sua resposta deve ser um único objeto JSON.
    - Este objeto deve ter uma única chave: "exercicios".
    - O valor de "exercicios" deve ser uma LISTA de objetos, onde cada objeto representa um exercício.
    - Cada exercício DEVE ter EXATAMENTE as seguintes chaves: "enunciado", "tipo", "opcoes", "resposta_correta".
    - O campo "opcoes" deve ser um dicionário como {{"A": "...", "B": "..."}}. Se for dissertativo, use null.
    - Os exercícios devem ser todos do nível {request.dificuldade}.
    """
    try:
        response = model.generate_content(prompt)
        
        cleaned_ia_response = response.text.strip().replace("```json", "").replace("```", "").strip()

        return crud.create_lista_exercicios(db=db, request=request, dados_ia=cleaned_ia_response)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/export/assessment", response_class=Response, tags=["Exportação"])
async def export_assessment(
    request: Request,
    db: Session = Depends(get_db),
    current_user: schemas.User = Depends(get_current_active_user)
):
    """
    Exporta uma avaliação para PDF ou DOCX.
    """
    try:
        # Obter dados do corpo da requisição
        data = await request.json()
        assessment_data = data.get("assessment")
        export_format = data.get("format", "pdf").lower()
        include_answers = data.get("includeAnswers", False)
        
        if export_format == "pdf":
            # Usar o serviço de geração de PDF
            file_content = export_services.generate_assessment_pdf(
                assessment_data, 
                include_answers
            )
            media_type = "application/pdf"
            filename = f"avaliacao.pdf"
        elif export_format == "docx":
            # Usar o serviço de geração de DOCX
            file_content = export_services.generate_assessment_docx(
                assessment_data, 
                include_answers
            )
            media_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            filename = f"avaliacao.docx"
        else:
            raise HTTPException(
                status_code=400, 
                detail="Formato de arquivo não suportado"
            )
            
        # Registrar a exportação no banco de dados
        export_record = schemas.ExportCreate(
            user_id=current_user.id,
            content_type="assessment",
            export_format=export_format
        )
        crud.create_export_record(db=db, export_record=export_record)
        
        # Retornar o arquivo gerado
        return Response(
            content=file_content,
            media_type=media_type,
            headers={
                "Content-Disposition": f"attachment; filename={filename}"
            }
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Erro ao exportar avaliação: {str(e)}"
        )

@app.middleware("http")
async def log_requests(request, call_next):
    print(f"Request: {request.method} {request.url}")
    print(f"Headers: {request.headers}")
    # Não tente ler o corpo aqui, deixe os handlers fazerem isso
    
    response = await call_next(request)
    return response