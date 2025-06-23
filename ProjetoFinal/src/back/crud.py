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

def create_lista_exercicios(db: Session, request, dados_ia: str, user_id: int = None, tipo: str = "exercicio") -> models.Avaliacao:
    """
    Cria os exercícios a partir do JSON da IA e os agrupa em uma nova Lista de Exercícios.
    """
    try:
        dados_dict = json.loads(dados_ia)
        exercicios_data = dados_dict.get("exercicios", [])
        
        materia_valor = getattr(request, 'materia', 'Não especificado')
        titulo_lista = f"Exercícios de {materia_valor}: {getattr(request, 'topico', 'Diversos')}"
        
        avaliacao_data = {
            "titulo": titulo_lista,
            "nivel_dificuldade": getattr(request, 'nivel', getattr(request, 'dificuldade', None)),
            "materia": materia_valor,  # Garante que a matéria seja armazenada
            "user_id": user_id,
            "tipo": tipo  # Garante que o tipo seja usado corretamente
        }
        
        db_lista = models.Avaliacao(**avaliacao_data)
        db.add(db_lista)
        db.commit()
        db.refresh(db_lista)
        
        # Criar exercícios e associá-los à lista
        for ex_data in exercicios_data:
            db_exercicio = create_exercicio(db, ex_data)
            db_lista.exercicios.append(db_exercicio)
        
        db.commit()
        db.refresh(db_lista)
        return db_lista
        
    except json.JSONDecodeError:
        raise ValueError(f"Dados inválidos fornecidos pela IA: {dados_ia}")
    except Exception as e:
        db.rollback()
        raise e



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