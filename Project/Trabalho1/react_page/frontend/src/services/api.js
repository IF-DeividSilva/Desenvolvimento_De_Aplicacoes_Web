import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const classifyImage = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/classify`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return {
      predictions: response.data.predictions,
      educationalInfo: response.data.educational_info,
    };
  } catch (error) {
    console.error('Erro ao classificar imagem:', error);
    throw error;
  }
};

// Alternativa usando base64 se necessário
export const classifyImageBase64 = async (base64Image) => {
  try {
    const response = await axios.post(`${API_URL}/api/classify-base64`, {
      image: base64Image
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao classificar imagem:', error);
    throw error;
  }
};