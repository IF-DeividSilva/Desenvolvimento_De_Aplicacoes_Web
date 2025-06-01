# Aplicação Web Moderna com IA: Resposta a Perguntas em Linguagem Natural

## Introdução e Objetivos

Esta aplicação web robustece a experiência de aprendizado interativo, permitindo que usuários obtenham respostas precisas para perguntas baseadas em um texto fornecido. O sistema foi re arquitetado para utilizar uma interface moderna com **React e Material-UI** no frontend, e uma **Inteligência Artificial mais poderosa no backend com Python, FastAPI e Hugging Face Transformers**. O objetivo é oferecer uma ferramenta dinâmica, responsiva e eficiente para processamento de linguagem natural.

---

## Descrição Técnica da Implementação

### Estrutura da Aplicação

A aplicação é dividida em duas partes principais:

1.  **Frontend (Cliente):**
    * `src/App.js`: Componente principal da aplicação React, contendo a lógica da interface do usuário e o fluxo de interação.
    * **Material-UI:** Utilizada para construir a interface do usuário com componentes modernos, responsivos e estilizados.
    * **Estado e Lógica:** Gerenciamento de estado do React (`useState`) para controlar o fluxo de múltiplos passos (inserção de texto, pergunta, resposta) e a comunicação com o backend.

2.  **Backend (Servidor API):**
    * `main.py` (ou nome similar): Aplicação FastAPI em Python que expõe endpoints RESTful.
    * **Hugging Face Transformers:** Biblioteca utilizada para carregar e executar modelos de Question Answering (QA) de última geração (ex: `deepset/roberta-base-squad2`).
    * **Uvicorn:** Servidor ASGI para rodar a aplicação FastAPI.

3.  **Comunicação:**
    * O frontend envia o texto de contexto e a pergunta do usuário para o backend via uma requisição HTTP POST para um endpoint da API RESTful.
    * O backend processa a requisição usando o modelo de IA e retorna a resposta em formato JSON.

### Funcionalidades

-   Interface de usuário moderna e intuitiva construída com React e Material-UI.
-   Fluxo de interação guiado em múltiplos passos:
    1.  Inserção do texto de contexto pelo usuário.
    2.  Exibição do contexto salvo e inserção da pergunta.
    3.  Apresentação da resposta fornecida pela IA.
    4.  Opções para fazer uma nova pergunta sobre o mesmo texto ou para inserir um novo texto (limpando o estado atual).
-   Utilização de um modelo avançado de Question Answering (Hugging Face Transformers) no backend para maior precisão.
-   Extração automática de respostas diretamente do conteúdo inserido pelo usuário, processada no servidor.
-   Modal de ajuda com exemplo prático para facilitar o primeiro uso.
-   Interface responsiva, adaptando-se a diferentes tamanhos de tela, graças ao Material-UI e técnicas de design responsivo.
-   Estilo visual profissional e consistente provido pelo Material-UI.

---

## Tecnologias Utilizadas

### Frontend:
-   **React**: Biblioteca JavaScript para construção de interfaces de usuário.
-   **Material-UI (MUI)**: Biblioteca de componentes React para um design mais rápido e fácil, seguindo o Material Design.
-   **JavaScript (ES6+)**: Linguagem de programação principal do frontend.
-   **HTML5 & CSS3**: Estrutura e estilização base (amplamente gerenciados pelo React e MUI).

### Backend:
-   **Python**: Linguagem de programação principal do backend.
-   **FastAPI**: Framework web moderno e de alta performance para construir APIs com Python.
-   **Uvicorn**: Servidor ASGI para FastAPI.
-   **Hugging Face `transformers`**: Biblioteca para modelos de NLP de última geração.
-   **PyTorch** (ou TensorFlow): Backend para os modelos da Hugging Face.

### Comunicação:
-   **API RESTful**: Padrão de arquitetura para a comunicação entre frontend e backend.
-   **JSON**: Formato de troca de dados.

---

## Instruções de Execução Local

Para executar este projeto localmente, você precisará rodar o backend (FastAPI) e o frontend (React) separadamente, em terminais diferentes.

### 1. Backend (API com FastAPI)

   a. **Navegue até a pasta do backend** (onde está seu arquivo `main.py` e o ambiente virtual `venv-qna`).
        python -m venv venv-qna

   b. **Ative o ambiente virtual Python:**
      ```bash
      # No Windows
      venv-qna\Scripts\activate
      # No macOS/Linux
      # source venv-qna/bin/activate
      ```

   c. **Instale as dependências (se ainda não o fez):**
      ```bash
      pip install fastapi uvicorn "transformers[torch]" torch
      ```

   d. **Inicie o servidor FastAPI:**
      ```bash
      uvicorn main:app --reload
      ```
      Por padrão, o servidor FastAPI estará rodando em `http://localhost:8000`.

### 2. Frontend (Aplicação React)

   a. **Navegue até a pasta do frontend** (onde está seu `package.json` e a pasta `src`).

   b. **Instale as dependências do Node.js (se ainda não o fez):**
      ```bash
      npm install
      # ou, se você usa yarn:
      # yarn install
      ```
      Certifique-se de ter instalado as dependências do Material-UI:
      ```bash
      npm install @mui/material @emotion/react @emotion/styled
      ```

   c. **Inicie a aplicação React:**
      ```bash
      npm start
      # ou, se você usa yarn:
      # yarn start
      ```
      Por padrão, a aplicação React estará rodando em `http://localhost:3000` e abrirá automaticamente no seu navegador.

**Importante:** Ambos os servidores (backend e frontend) precisam estar rodando simultaneamente para que a aplicação funcione completamente.

---

## Instruções para Usar o Site

A aplicação guia o usuário através de um processo de três passos principais:

1.  **Passo 1: Escrever o Texto de Contexto**
    * A tela inicial apresentará a seção "1. Escreva seu texto aqui:".
    * Digite ou cole o texto que servirá de base para as perguntas no campo fornecido.
    * Clique no botão "Save Text".
    * ![img](Desenvolvimento_De_Aplicacoes_Web\Project\Trabalho2\img\p11.png)  

2.  **Passo 2: Escrever a Pergunta**
    * Após salvar o texto, a seção anterior é substituída.
    * O "Contexto Salvo" será exibido para referência.
    * Abaixo, a seção "2. Escreva sua pergunta:" aparecerá.
    * Digite sua pergunta relacionada ao contexto no campo fornecido.
    * Clique no botão "Ask".
    * [Local para Imagem: Tela mostrando o contexto salvo e a área para inserir a pergunta]

3.  **Passo 3: Visualizar a Resposta**
    * Após clicar em "Ask", a aplicação mostrará "Analisando sua pergunta com a API...".
    * Em seguida, a seção "3. Sua resposta:" exibirá a resposta encontrada pela IA.
    * Abaixo da resposta, você terá botões para:
        * "Fazer outra pergunta (mesmo texto)": Retorna ao Passo 2, mantendo o contexto atual.
        * "Inserir Novo Texto (Limpar Tudo)": Limpa todos os dados e retorna ao Passo 1.
    * [Local para Imagem: Tela exibindo a resposta da IA e as opções de próximos passos]

**Funcionalidades Adicionais:**

* **Ajuda/Exemplo de Uso:** Um botão no topo da página abre um modal com um exemplo de texto, perguntas e respostas para demonstrar o funcionamento.
* **Começar Novamente (Limpar Tudo):** Um botão no topo (visível a partir do Passo 2) permite limpar todos os campos e voltar ao Passo 1 a qualquer momento.

---

## Link para Vídeo Explicativo (Exemplo)

- [Video.mp4](https://youtu.be/8sgoZhAJkr8)   
`[Link para seu vídeo aqui, se houver]` (ex: video_demonstracao.mp4)

---

## Referências e Links de Apoio

-   **React:** [https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html)
-   **Material-UI (MUI):** [https://mui.com/getting-started/installation/](https://mui.com/getting-started/installation/)
-   **FastAPI:** [https://fastapi.tiangolo.com/](https://fastapi.tiangolo.com/)
-   **Hugging Face Transformers:** [https://huggingface.co/docs/transformers/index](https://huggingface.co/docs/transformers/index)
-   **Python:** [https://docs.python.org/3/](https://docs.python.org/3/)
-   **MDN Web Docs - HTML, CSS, JavaScript:** [https://developer.mozilla.org/pt-BR/docs/Web](https://developer.mozilla.org/pt-BR/docs/Web)

---

## Autor

-   **Nome:** Deivid da Silva Galvão
-   **E-mail:** deivid.2002@alunos.utfpr.edu.br

**Disciplina:** Desenvolvimento de Aplicações Web
**Professor:** Luiz Rodrigues

---