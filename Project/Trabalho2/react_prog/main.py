# Para rodar: uvicorn main:app --reload
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware # Para permitir requisições do React

# --- Pydantic Models para validação de request/response ---
class QARequest(BaseModel):
    passage: str
    question: str

class QAResponse(BaseModel):
    answer: str
    score: float 
    error: str = None

# --- Inicialização do FastAPI App ---
app = FastAPI(
    title="Q&A API",
    description="API para responder perguntas baseadas em um contexto usando Hugging Face Transformers.",
    version="1.0.0"
)

# --- Configuração do CORS ---
# Permite que o frontend React (rodando em outra porta, ex: 3000) acesse a API
origins = [
    "http://localhost",
    "http://localhost:3000", # Adicione a porta do seu app React
    # Adicione outros origins se necessário (ex: seu app em produção)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"], # Permite todos os cabeçalhos
)

# --- Carregamento do Modelo de Q&A ---
# Carregue o modelo uma vez quando a aplicação iniciar para evitar recarregá-lo a cada requisição.
# Escolha um modelo: https://huggingface.co/models?pipeline_tag=question-answering
# Exemplos:
# - 'distilbert-base-cased-distilled-squad' (mais leve)
# - 'bert-large-uncased-whole-word-masking-finetuned-squad' (bom desempenho)
# - 'deepset/roberta-base-squad2' (bom com perguntas sem resposta no texto)
try:
    print("Carregando modelo de Q&A...")
    # Usaremos um modelo que pode indicar se a resposta não está no texto
    qna_pipeline = pipeline("question-answering", model="deepset/roberta-base-squad2")
    print("Modelo carregado com sucesso!")
except Exception as e:
    print(f"Erro ao carregar o modelo: {e}")
    qna_pipeline = None


# --- Endpoint da API ---
@app.post("/answer-question/", response_model=QAResponse)
async def answer_question(request_data: QARequest):
    if not qna_pipeline:
        raise HTTPException(status_code=503, detail="Modelo de Q&A não está disponível.")

    if not request_data.passage or not request_data.passage.strip():
        return QAResponse(answer="", score=0.0, error="Passage (contexto) não pode ser vazio.")
    if not request_data.question or not request_data.question.strip():
        return QAResponse(answer="", score=0.0, error="Question não pode ser vazia.")

    try:
        print(f"Processando pergunta: '{request_data.question}'")
        result = qna_pipeline(question=request_data.question, context=request_data.passage)

        # O modelo 'deepset/roberta-base-squad2' pode retornar uma resposta vazia
        # e score baixo se achar que a resposta não está no texto.
        if not result['answer'] or result['score'] < 0.1: # Limiar de confiança, ajuste conforme necessário
            return QAResponse(answer="Não foi possível encontrar uma resposta no texto fornecido.", score=result['score'])

        return QAResponse(answer=result['answer'], score=result['score'])

    except Exception as e:
        print(f"Erro durante o processamento da Q&A: {e}")
        raise HTTPException(status_code=500, detail=f"Erro interno ao processar a pergunta: {str(e)}")

# --- Endpoint de Health Check
@app.get("/")
async def root():
    return {"message": "Q&A API está funcionando!"}
