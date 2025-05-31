# Descubra o que há em sua imagem

Esta aplicação web permite que o usuário **envie uma imagem** e receba uma **análise visual feita por Inteligência Artificial**, utilizando o modelo pré-treinado **MobileNet** com **TensorFlow.js**. É uma ferramenta educacional interativa e acessível que incentiva o aprendizado por meio da curiosidade visual.

---

## Objetivo

Facilitar o ensino de conceitos visuais, biológicos e tecnológicos através de uma experiência prática com visão computacional. A aplicação foi desenvolvida para ser usada tanto em ambientes escolares quanto em casa, proporcionando uma introdução acessível à IA para estudantes de diferentes idades.

---

## Funcionalidades

- Upload de imagens diretamente do dispositivo (computador ou celular)
- Classificação automática do conteúdo da imagem
- Exibição de lista com os possíveis objetos identificados e sua respectiva probabilidade
- Interface amigável, responsiva e com foco em acessibilidade infantil
- Visual moderno com botões intuitivos e destaque em cores educativas
- Fundo em degradê suave que proporciona melhor experiência visual
- Interface interativa com feedback visual do processo de análise

---

## Tecnologias Utilizadas

- **React.js** — biblioteca para criação de interfaces de usuário interativas
- **TailwindCSS** — framework CSS utilitário para estilização moderna
- **JavaScript (ES6+)** — lógica e integração com o modelo de IA
- **[TensorFlow.js](https://www.tensorflow.org/js)** — biblioteca de IA para uso no navegador
- **[MobileNet](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet)** — modelo leve de reconhecimento de imagem pré-treinado

### Sobre o MobileNet

O **MobileNet** é um modelo de rede neural convolucional eficiente projetado especialmente para aplicações móveis e dispositivos com recursos limitados. Características principais:

- **Arquitetura leve** — otimizado para funcionar em navegadores e dispositivos móveis
- **Pré-treinado** — reconhece mais de 1000 classes de objetos diferentes
- **Eficiência** — usa convoluções separáveis em profundidade para reduzir o tamanho do modelo
- **Performance** — oferece boa precisão com tempo de resposta rápido

---

## Descrição Técnica da Implementação

A aplicação foi estruturada usando componentes React para melhor organização e manutenção do código:

1. **Carregamento do Modelo**:
   - O modelo MobileNet é carregado assincronamente quando o componente é montado
   - Um estado de loading é exibido ao usuário durante o carregamento

2. **Processamento de Imagem**:
   - A imagem enviada é convertida para formato base64
   - Uma prévia da imagem é mostrada antes da análise
   - O modelo TensorFlow.js processa a imagem diretamente no navegador

3. **Gestão de Estados**:
   - Estados React são usados para controlar o fluxo da aplicação
   - Feedback visual é fornecido em cada etapa (carregando, analisando, resultados)

4. **Interface do Usuário**:
   - Design responsivo adaptado para diferentes dispositivos
   - Elementos visuais com foco em usabilidade infantil
   - Feedback visual claro para cada ação do usuário

5. **Otimizações**:
   - Código totalmente comentado para facilitar manutenção
   - Componente reutilizável para análise de imagens
   - Tratamento de erros para melhor experiência do usuário

---

## Como Funciona

1. O usuário **escolhe uma imagem** do dispositivo
2. A IA **processa e classifica** a imagem com base em sua base de dados de reconhecimento
3. Os **resultados são exibidos** na tela com uma lista de objetos reconhecidos e suas probabilidades

---

## Instruções Detalhadas de Execução

### Pré-requisitos

- **Node.js** (versão 14.x ou superior)
- **npm** (6.x ou superior) ou **yarn** (1.22.x ou superior)
- Navegador moderno (Chrome, Firefox, Edge ou Safari)
- Editor de código (recomendado: VS Code)
- Git (opcional, para clonar o repositório)

### Método 1: Versão HTML/JS Simples

Esta versão é mais leve e não requer a instalação de dependências ou servidores.

1. **Baixe os arquivos**:
   - Clone o repositório: `git clone [URL-DO-REPOSITÓRIO]`
   - Ou baixe o ZIP e extraia em uma pasta

2. **Estrutura de arquivos**:
   ```
   /projeto
   ├── index.html        # Página principal
   ├── style.css         # Estilos da aplicação
   ├── script.js         # Lógica do TensorFlow.js e interações
   └── /assets           # Imagens e recursos estáticos
   ```

3. **Execute localmente**:
   - Abra o arquivo index.html diretamente em seu navegador
   - Ou utilize um servidor local simples:
     - Python: `python -m http.server 8000`
     - Node.js: `npx serve`

4. **Uso da aplicação**:
   - Aguarde o carregamento do modelo (mensagem "🔍 Descobrir" indica quando está pronto)
   - Clique no botão de upload para selecionar uma imagem
   - Clique em "Descobrir" para iniciar a análise
   - Visualize os resultados na lista de previsões

### Método 2: Versão React (Frontend)

Esta versão oferece uma experiência mais completa e moderna, com componentes reutilizáveis e estado gerenciado.

1. **Clone e configure**:
   ```bash
   # Clone o repositório
   git clone [URL-DO-REPOSITÓRIO]
   
   # Entre na pasta do projeto
   cd [NOME-DA-PASTA]
   
   # Instale as dependências
   npm install
   # ou
   yarn install
   ```

2. **Estrutura do projeto React**:
   ```
   /projeto
   ├── /public              # Arquivos estáticos públicos
   ├── /src                 # Código-fonte
   │   ├── /components      # Componentes React
   │   │   └── ImageUploader.js  # Componente principal
   │   │   └── ResultDisplay.js  # Componente principal
   │   │   └── Footer.js         # Componente de rodapé
   │   │   └── Header.js         # Componente de cabeçalho
   │   │   └── InfoSection.js    # Componente de informações
   │   ├── /services      # Serviços de IA
   │   │   └── api.js  # Lógica de chamada à API
   │   ├── index.js         # Ponto de entrada
   │   └── styles.css       # Estilos globais
   ├── package.json         # Dependências do projeto
   ├── tailwind.config.js   # Configuração do TailwindCSS
   ├── postcss.config.js    # Configuração do PostCSS
   └── README.md            # Documentação
   ```

3. **Execute o projeto**:
   ```bash
   # Inicie o servidor de desenvolvimento
   npm start
   # ou
   yarn start
   ```

4. **Acesse a aplicação**:
   - Abra o navegador em: `http://localhost:3000`
   - A aplicação será recarregada automaticamente se você editar os arquivos fonte

5. **Uso da aplicação**:
   - O modelo MobileNet será carregado automaticamente ao iniciar
   - Use o botão de upload para selecionar uma imagem do seu dispositivo
   - Clique em "Descobrir" para processar a análise
   - Visualize os resultados com as previsões e probabilidades
   - Para analisar outra imagem, faça um novo upload

6. **Build para produção** (opcional):
   ```bash
   npm run build
   # ou
   yarn build
   ```
   - Os arquivos otimizados serão gerados na pasta `/build`
   - Você pode servir estes arquivos em qualquer servidor web estático

### Método 3: Configuração Completa (Frontend + Backend)

Para casos que necessitam armazenamento de dados ou processamento no servidor:

1. **Configure o Frontend**:
   - Siga as instruções da Versão React acima

2. **Configure o Backend** (opcional, para armazenamento de imagens):
   ```bash
   # Entre na pasta do backend
   cd backend
   
   # Instale as dependências
   npm install
   # ou
   yarn install
   
   # Inicie o servidor
   npm run dev
   # ou
   yarn dev
   ```

3. **Estrutura do backend**:
   ```
   /backend
   ├── /app
   │   ├── /ai_service     # Tratamento da ia
   │   ├── /main           # Implementaçao geral
   ├── requirements.txt    # Necessidades do backend
   └── .env                # Variáveis de ambiente
   ```

4. **Para desenvolvimento integrado**:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000/api`
   - As requisições do frontend para o backend são redirecionadas pelo proxy configurado no `package.json`


### Solução de Problemas Comuns

1. **Modelo não carrega**:
   - Verifique sua conexão com internet
   - Limpe o cache do navegador
   - Tente outro navegador moderno

2. **Imagem não é analisada**:
   - Verifique se a imagem foi carregada corretamente (deve aparecer na prévia)
   - Certifique-se que o formato é suportado (JPG, PNG)
   - Tente uma imagem menor (menos de 5MB)

3. **Erro de CORS**:
   - Se estiver executando localmente, use um servidor local em vez de abrir diretamente o arquivo HTML
   - Para React, verifique se o proxy está configurado corretamente

4. **Dependências não instalam**:
   - Limpe o cache do npm: `npm cache clean --force`
   - Verifique sua versão do Node.js: `node -v`
   - Tente usar o Yarn como alternativa

---

## Print Screens da Aplicação

A seguir estão algumas telas da aplicação "Descubra o que há em sua imagem":

### 1. Tela Inicial
Exibe o título da aplicação e a descrição principal com cores chamativas e layout amigável para crianças e professores.
Explica ao usuário, de forma simples, como usar a ferramenta: enviar uma imagem e visualizar os resultados com IA.

![Tela Inicial](markdownImage/foto1.png)

---

### 2. Upload e Botão de Análise
Interface com o botão de upload e o botão de análise ("🔍 Descobrir"). O modelo MobileNet é carregado em segundo plano.
![Botao Image](markdownImage/foto2.png)

Exemplo de resultados juntamente com as análises.

🚗 **Carro**:
![Carro Image](markdownImage/carro.png)

🌱 **Planta**:
![Planta Image](markdownImage/plantas.png)

🏙️ **Cidade**:
![Cidade Image](markdownImage/cidades.png)

---

### 3. Aplicação no Contexto Educacional
Demonstra como a ferramenta pode ser aplicada em sala de aula, reforçando a atenção, observação e raciocínio lógico dos estudantes.

![Explicação Educacional](markdownImage/explicas.png)

---

## Aplicações Educacionais

Esta ferramenta pode ser usada em:

- **Aulas de ciências e biologia**: identificação de animais, plantas, objetos
- **Educação infantil e fundamental**: incentivo à curiosidade e observação
- **Introdução à inteligência artificial**: mostrar de forma prática como um modelo pré-treinado pode ser usado
- **Projetos interdisciplinares**: combinando tecnologia com ciências, artes e línguas

---

## Detalhes Técnicos do Código

O componente principal `ImageUploader` implementa as seguintes funcionalidades:

```javascript
// Carregamento do modelo MobileNet
useEffect(() => {
  async function loadModel() {
    const loadedModel = await mobilenet.load();
    setModel(loadedModel);
    setLoading(false);
  }
  loadModel();
}, []);

// Classificação da imagem
const handleClassify = async () => {
  if (model && image) {
    setPredictions([]);
    setLoading(true);
    const imgElement = document.getElementById('uploaded-img');
    const preds = await model.classify(imgElement);
    setPredictions(preds);
    setLoading(false);
  }
};
```

O código completo está amplamente comentado para facilitar o entendimento e manutenção.

---

## Vídeo

Vídeo demonstrativo1: [Vídeo Explicativo](https://youtu.be/T6Q3TJRtWpc)
Vídeo demonstrativo2: [Vídeo Explicativo](https://youtu.be/T6Q3TJRtWpc)

Este vídeo de 30 segundos demonstra o funcionamento da aplicação, desde o upload da imagem até a exibição dos resultados da classificação.

---

## Fontes e Referências

- [TensorFlow.js - MobileNet](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet) - Documentação do modelo utilizado
- [Documentação oficial do TensorFlow.js](https://www.tensorflow.org/js) - Framework de IA para JavaScript
- [React Documentation](https://react.dev/) - Framework para construção da interface
- [TailwindCSS Documentation](https://tailwindcss.com/docs) - Framework CSS utilizado
- [MDN Web Docs](https://developer.mozilla.org/) - Referência para JavaScript e Web APIs
- [Google Fonts - Fredoka, Inter](https://fonts.google.com/) - Fontes utilizadas no projeto
- [Understanding MobileNet Architecture](https://medium.com/@yu4u/why-mobilenet-and-its-variants-e-g-shufflenet-are-fast-1c7048b9618d) - Artigo explicativo sobre a arquitetura MobileNet

---

## Autor 

**Arthur Henrique de Oliveira Petroli**  
📧 arthurpetroli@alunos.utfpr.edu.br  
🧑‍🎓 Projeto desenvolvido para fins educacionais — UTFPR - Engenharia da Computação  
📅 Maio de 2025

---

## Licença

Este projeto é de uso livre para fins educacionais e acadêmicos.