from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt

import crud
import schemas
import security
from database import SessionLocal

router = APIRouter(
    tags=["Autenticação"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    """Decodifica o token JWT para obter o usuário atual."""
    credentials_exception = HTTPException(
        status_code=401,
        detail="Credenciais inválidas",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Log para depuração
        print(f"Verificando token: {token[:20]}...")
        
        # Decodifica o token
        payload = jwt.decode(token, security.SECRET_KEY, algorithms=[security.ALGORITHM])
        username: str = payload.get("sub")
        
        if username is None:
            raise credentials_exception
            
        print(f"Token válido para usuário: {username}")
    except JWTError as e:
        print(f"Erro ao decodificar token JWT: {str(e)}")
        raise credentials_exception
        
    # Busca o usuário no banco de dados
    user = crud.get_user_by_username(db, username=username)
    if user is None:
        print(f"Usuário {username} não encontrado no banco de dados")
        raise credentials_exception
        
    return user

async def get_current_active_user(current_user: Annotated[schemas.User, Depends(get_current_user)]):
    """Verifica se o usuário atual está ativo (pode ser expandido no futuro)."""
    return current_user


@router.post("/token", response_model=schemas.Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()], 
    db: Session = Depends(get_db)
):
    """
    Endpoint de login. Recebe username e password, retorna um access_token.
    """
    user = crud.get_user_by_username(db, username=form_data.username)
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Nome de usuário ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = security.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/users/register", response_model=schemas.User)
def create_new_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    Endpoint de registro para criar um novo usuário.
    """
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Nome de usuário já registrado")
    return crud.create_user(db=db, user=user)

@router.get("/users/me", response_model=schemas.User)
async def read_users_me(current_user: Annotated[schemas.User, Depends(get_current_active_user)]):
    """Retorna os dados do usuário atualmente logado."""
    return current_user