# Aplicação Web Educacional com IA: Resposta a perguntas em linguagem natural

## Introdução e Objetivos

Esta aplicação web tem como objetivo oferecer uma experiência de aprendizado interativa e moderna para alunos por meio de  **perguntas e respostas** com **uso de uma IA de texto**. O sistema utiliza **Inteligência Artificial com TensorFlow.js** para captar o texto do usuário e processar as respostas, tornando o processo de aprendizagem mais dinâmico e inclusivo.

---

## Descrição Técnica da Implementação

### Estrutura da Aplicação

- `PageTex.html`: estrutura da interface.
- `styles.css`: estilização visual e responsividade.
- Js integrado no HTML: lógica da aplicação e integração com o modelo IA.

### Funcionalidades

- Interface de quiz com perguntas de múltipla escolha.
- Detecção de palavras por voz utilizando modelo `speech-commands` do TensorFlow.js.
- Feedback automático com base nas respostas.
- Sistema de pontuação.
- Interface interativa com botões e emojis para atrair o usuario final(crianças do fundamental).

---

## Tecnologias Utilizadas

- **HTML5**: Estrutura da página.
- **CSS3**: Design visual, responsividade e UX.
- **JavaScript**: Lógica da aplicação.
- **[TensorFlow.js](https://www.tensorflow.org/js)**: biblioteca para execução de modelos IA no navegador.
- **Modelo Utilizado:** [`speech-commands`](https://github.com/tensorflow/tfjs-models/tree/master/speech-commands)

---

## Instruções de Execução Local

1. Baixe todos os arquivos do projeto:
   - `PageTex.html`
   - `styles.css`

2. Coloque todos os arquivos na mesma pasta.

3. Para executar corretamente, é necessário rodar o projeto em um servidor local (localhost).(Necessário devido as imagens que estão no JS).

4. Após iniciar o servidor local, abra o navegador e acesse o endereço fornecido (exemplo: http://localhost:5500/PageTex.html).

---
## Instruções para Usar o Site
### Tela inicial do site:
![img](./img/p2.png)

1. Digitar um texto no campo "Write your text:".
![img](./img/p1.png)

2. Digitar uma pegunta em relação ao texto que foi colocado acima no campo "Write your ask:" .
![img](./img/p3.png)

3. A resposta aparecerá em baixo do "Your Answer:" após a análise.
![img](./img/p4.png)

### Link para Vídeo Explicativo
- [VideoLixo.mp4](https://youtu.be/6Ux5-oC99Cw)
---
## Referências e Links de Apoio

- [TensorFlow.js - speech-commands](https://github.com/tensorflow/tfjs-models/tree/master/speech-commands)
- [Documentação oficial do TensorFlow.js](https://www.tensorflow.org/js)
- [MDN Web Docs - HTML, CSS, JavaScript](https://developer.mozilla.org/) "nada como aprender do cliente (heheh)"


---
## Autor

- Nome: Deivid da Silva Galvão

Disciplina: Desenvolvimento de Aplicações Web  
Professor: Luiz v2

---

