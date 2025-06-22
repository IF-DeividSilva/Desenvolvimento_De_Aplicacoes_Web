
from sqlalchemy.orm import Session
import models
import schemas
import json


def get_texto_gerado_by_id(db: Session, texto_id: int):
    return db.query(models.TextoGerado).filter(models.TextoGerado.id == texto_id).first()

def create_texto_gerado(db: Session, texto: schemas.TextoGeradoCreate):
    db_texto = models.TextoGerado(tema=texto.tema, conteudo=texto.conteudo)
    db.add(db_texto)
    db.commit()
    db.refresh(db_texto)
    return db_texto

def get_lista_exercicios_by_id(db: Session, lista_id: int):
    return db.query(models.Avaliacao).filter(models.Avaliacao.id == lista_id).first()

def create_lista_exercicios(db: Session, request: schemas.GeracaoListaExerciciosRequest, dados_ia: str) -> models.Avaliacao:
    """
    Cria os exercícios a partir do JSON da IA e os agrupa em uma nova Lista de Exercícios.
    """
    try:
        dados_exercicios_lista = json.loads(dados_ia)["exercicios"]
    except (json.JSONDecodeError, KeyError) as e:
        print(f"ERRO ao processar JSON da IA: {e}")
        print(f"Dados recebidos: {dados_ia}")
        raise ValueError("A resposta da IA não continha um JSON válido com a chave 'exercicios'.")

    exercicios_criados_ids = []
    for exercicio_data in dados_exercicios_lista:
        exercicio_schema = schemas.ExercicioCreate(**exercicio_data)
        db_exercicio = models.Exercicio(**exercicio_schema.model_dump())
        db.add(db_exercicio)
        db.flush() 
        exercicios_criados_ids.append(db_exercicio.id)

    titulo_lista = f"Exercícios de {request.materia}: {request.topico}"
    db_lista = models.Avaliacao(
        titulo=titulo_lista,
        nivel_dificuldade=request.nivel
    )
    
    exercicios_salvos = db.query(models.Exercicio).filter(models.Exercicio.id.in_(exercicios_criados_ids)).all()
    db_lista.exercicios.extend(exercicios_salvos)
    
    db.add(db_lista)
    db.commit()
    db.refresh(db_lista)
    return db_lista



def get_user_by_username(db: Session, username: str):
    """Busca um usuário pelo seu nome de usuário."""
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    """Cria um novo usuário com senha com hash."""
    import security
    hashed_password = security.get_password_hash(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user