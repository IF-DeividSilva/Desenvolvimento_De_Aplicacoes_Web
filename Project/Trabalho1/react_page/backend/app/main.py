from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import io
import base64
from PIL import Image

from app.ai_service import classify_image

app = FastAPI(title="Educação Visual API")

# Configurar CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL do frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ImageResponse(BaseModel):
    predictions: List[dict]
    educational_info: dict

@app.post("/api/classify", response_model=ImageResponse)
async def process_image(file: UploadFile = File(...)):
    """
    Recebe uma imagem, classifica usando modelo de IA e retorna informações educacionais
    """
    try:
        # Ler conteúdo da imagem
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Processar com modelo de IA
        predictions, educational_info = classify_image(image)
        
        return ImageResponse(
            predictions=predictions,
            educational_info=educational_info
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao processar imagem: {str(e)}")

@app.post("/api/classify-base64")
async def process_image_base64(data: dict):
    """
    Endpoint alternativo que recebe imagem em formato base64
    """
    try:
        image_data = data.get("image", "").split(",")[1]
        image = Image.open(io.BytesIO(base64.b64decode(image_data)))
        
        # Processar com modelo de IA
        predictions, educational_info = classify_image(image)
        
        return {
            "predictions": predictions,
            "educational_info": educational_info
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao processar imagem: {str(e)}")