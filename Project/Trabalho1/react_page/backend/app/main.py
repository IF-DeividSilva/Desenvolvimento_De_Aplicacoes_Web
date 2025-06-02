from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import logging
import io
import base64
from PIL import Image

# Renomear a importação para evitar conflitos
from app.ai_service import classify_image as ai_classify_image

app = FastAPI(title="Educação Visual API")

# Configuração de logging básica e limpa
logging.basicConfig(level=logging.INFO)

# Configurar CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/classify")
async def classify_image(file: UploadFile):
    print(f"[API] Recebendo imagem: {file.filename}")
    
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Usar nome diferente para a função importada
        predictions, educational_info = ai_classify_image(image)
        
        print(f"[API] Imagem processada com sucesso: {file.filename}")
        return {
            "predictions": predictions,
            "educational_info": educational_info
        }
        
    except Exception as e:
        print(f"[API] ERRO ao processar imagem: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro ao processar imagem: {str(e)}")