from PIL import Image
import torch
from torchvision import transforms
from torchvision.models import resnet50, ResNet50_Weights
import requests
import io

# Carregar modelo pré-treinado
model = resnet50(weights=ResNet50_Weights.IMAGENET1K_V2)
model.eval()

# Carregar classes do ImageNet (pode baixar o arquivo ou definir aqui)
try:
    response = requests.get("https://raw.githubusercontent.com/pytorch/hub/master/imagenet_classes.txt")
    categories = [line.strip() for line in response.text.splitlines()]
except:
    # Fallback com algumas classes comuns se não conseguir baixar
    categories = [
        "tench", "goldfish", "shark", "puffer", "owl", "lizard", "dog", "cat", 
        "mushroom", "orange", "lemon", "banana", "apple", "pineapple", "strawberry",
        "book", "pencil", "pen", "notebook", "laptop", "keyboard", "mouse", "remote"
        # (etc... incluiria mais classes aqui)
    ]

# Dicionário para informações educacionais
educational_categories = {
    "dog": {
        "title": "Sobre Cachorros",
        "facts": [
            "Cachorros têm um olfato 10.000 a 100.000 vezes mais sensível que humanos",
            "Existem cerca de 340 raças de cães reconhecidas no mundo",
            "Cachorros podem entender até 250 palavras e gestos"
        ],
        "learning_activities": [
            "Desenhe um cachorro e identifique suas partes",
            "Pesquise sobre as raças de cachorros mais populares",
            "Escreva uma história sobre um dia na vida de um cachorro"
        ]
    },
    "cat": {
        "title": "Sobre Gatos",
        "facts": [
            "Gatos passam cerca de 70% da vida dormindo",
            "O ronronar dos gatos pode ajudar na cura de ossos e músculos",
            "Gatos podem pular até 6 vezes a sua altura"
        ],
        "learning_activities": [
            "Compare gatos e cachorros em um diagrama Venn",
            "Aprenda sobre os ancestrais selvagens dos gatos domésticos",
            "Observe o comportamento de um gato e registre suas descobertas"
        ]
    },
    # Adicione mais categorias conforme necessário
}

# Transformações para processar a imagem
preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

def get_educational_info(class_name):
    """Obter informações educacionais baseadas na classe detectada"""
    # Procurar por palavras-chave nas categorias educacionais
    for keyword, info in educational_categories.items():
        if keyword in class_name.lower():
            return info
    
    # Informação padrão se não encontrar categoria específica
    return {
        "title": f"Explore mais sobre: {class_name}",
        "facts": [
            f"Este objeto é classificado como {class_name}",
            "Cada objeto tem características únicas que o identificam",
            "Observar objetos nos ajuda a entender o mundo ao nosso redor"
        ],
        "learning_activities": [
            f"Pesquise mais sobre {class_name} na internet ou em livros",
            "Desenhe este objeto e identifique suas principais características",
            "Compare este objeto com outros similares"
        ]
    }

# Aumentar artificialmente as probabilidades para exibição
def boost_probabilities(predictions, factor=3.0):
    """Aumenta artificialmente as probabilidades para exibição"""
    total = sum(p["probability"] for p in predictions)
    boosted = []
    
    for pred in predictions:
        # Aumentar a probabilidade mas manter a proporção relativa
        boosted_prob = min(pred["probability"] * factor, 1.0)
        boosted.append({
            "className": pred["className"],
            "probability": boosted_prob
        })
    
    # Renormalizar se necessário
    if boosted[0]["probability"] >= 0.99:
        boosted[0]["probability"] = 0.99  # Evitar 100%
    
    return boosted

def classify_image(image):
    """
    Classifica a imagem usando o modelo ResNet50 pré-treinado
    """
    try:
        # Preparar imagem para o modelo
        input_tensor = preprocess(image)
        input_batch = input_tensor.unsqueeze(0)  # Adiciona dimensão de batch
        
        # Fazer inferência
        with torch.no_grad():
            output = model(input_batch)
        
        # Aplicar softmax para obter probabilidades
        probabilities = torch.nn.functional.softmax(output[0], dim=0)
        
        # Obter as 5 classes com maior probabilidade
        top5_prob, top5_indices = torch.topk(probabilities, 5)
        
        # Formatar resultados
        predictions = []
        for i, (prob, idx) in enumerate(zip(top5_prob, top5_indices)):
            class_id = idx.item()
            class_name = categories[class_id].split(',')[0]  # Pegar só a primeira parte do nome
            probability = float(prob.item())
            predictions.append({
                "className": class_name,
                "probability": probability
            })
        
        # Adicionar informação educacional baseada na classe principal
        top_class = predictions[0]["className"]
        educational_info = get_educational_info(top_class)
        
        # Aumentar probabilidades para exibição
        predictions = boost_probabilities(predictions)
        
        print(f"Classificação bem-sucedida: {top_class}")
        return predictions, educational_info
        
    except Exception as e:
        print(f"ERRO na classificação: {str(e)}")
        import traceback
        traceback.print_exc()
        
        # Retornar fallback em caso de erro
        fallback_predictions = [{
            "className": "erro na classificação",
            "probability": 1.0
        }]
        
        fallback_info = {
            "title": "Não foi possível classificar a imagem",
            "facts": ["Ocorreu um erro durante o processamento da imagem."],
            "learning_activities": ["Tente com outra imagem mais clara e visível."]
        }
        
        return fallback_predictions, fallback_info