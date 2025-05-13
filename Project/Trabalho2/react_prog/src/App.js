// npm init -y
// npm start
// npx create-react-app nome-do-projeto
// npm install @tensorflow/tfjs @tensorflow-models/qna
// npm install tensorflow/tfjs
// npm install



import React, { useEffect, useState } from 'react';
import * as qna from '@tensorflow-models/qna';
import '@tensorflow/tfjs'; // Necessário para o funcionamento do TensorFlow

function App() {
  // Estados para o texto, pergunta, resposta e passagem salva
  const [textInput, setTextInput] = useState('');
  const [passage, setPassage] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [model, setModel] = useState(null);

  // Carrega o modelo apenas uma vez quando o componente monta
  useEffect(() => {
    qna
      .load()
      .then((loadedModel) => setModel(loadedModel))
      .catch((e) => console.error('Erro ao carregar o modelo:', e));
  }, []);

  // Função que salva o texto inserido em um estado de "passage"
  const saveText = () => {
    setPassage(textInput);
    alert('Texto salvo com sucesso!');
  };

  // Função para responder à pergunta baseada no texto salvo
  const answering = () => {
    if (!passage.trim()) {
      alert('Por favor, escreva um texto para processeguir...');
      return;
    }
    if (!question.trim()) {
      alert('Por favor, escreva a sua pergunta.');
      return;
    }
    if (!model) {
      alert('O modelo ainda não foi carregado. Por favor, aguarde...');
      return;
    }

    setAnswer('Analyzing your question...');
    model
      .findAnswers(question, passage)
      .then((answers) => {
        if (answers && answers.length > 0) {
          setAnswer(answers[0].text);
        } else {
          setAnswer('No answer found.');
        }
      })
      .catch((err) => {
        console.error(err);
        setAnswer('Erro ao obter resposta.');
      });
  };

  return (
    <div className="container">
      <header>
        <h1>IA para Resposta a perguntas em linguagem natural</h1>
      </header>

      {/* Seção para inserir o texto */}
      <section className="text">
        <h2>Write your text:</h2>
        <textarea
          id="text-input"
          placeholder="Enter your text here..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <button onClick={saveText}>Save Text</button>
      </section>

      {/* Seção para inserir a pergunta */}
      <section className="question">
        <h2>Write your ask:</h2>
        <textarea
          id="ask-input"
          placeholder="Enter your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={answering}>Ask</button>
      </section>

      {/* Seção para exibir a resposta */}
      <section className="answer">
        <h2>Your Answer:</h2>
        <div id="results" className="result">
          {answer}
        </div>
      </section>

      {/* Seção "About" */}
      <section className="about">
        <h2>About Us</h2>
        <p>
          Our platform was designed to provide quick and accurate answers to your
          questions on any subject. With an intuitive interface, simply enter your
          text and ask your question, and our system will take care of the rest—
          delivering relevant and clear responses.
        </p>
      </section>

      {/* Seção de exemplo */}
      <section className="example">
        <h2>Example of use</h2>
        <h3>Write your text:</h3>
        <textarea
          readOnly
          rows="4"
          cols="50"
          value={`Newton's laws of motion describe how objects move. The first law states that an object at rest stays at rest unless acted upon by an external force. The second law explains that force equals mass times acceleration. The third law states that for every action, there is an equal and opposite reaction. These laws are fundamental in mechanics.`}
        />

        <h3>Write your ask:</h3>
        <textarea
          readOnly
          rows="3"
          cols="50"
          value={`What is Newton's first law of motion?`}
        />

        <h3>Your Answer:</h3>
        <p>
          an object at rest stays at rest unless acted upon by an external force
        </p>
      </section>

      <footer>
        <p>Desenvolvido por Deivid da Silva Galvão</p>
        <p>Data: 01/05/2025</p>
        <p>Email: deivid.2002@alunos.utfpr.edu.br</p>
        <p>&copy; 2025 UTFPR-EngComp - Um projeto para auxiliar no aprendizado.</p>
      </footer>
    </div>
  );
}

export default App;