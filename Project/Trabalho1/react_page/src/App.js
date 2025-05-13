import React, { useState, useEffect } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";
import "./App.css";

export default function App() {
  const [model, setModel] = useState(null);
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadModel() {
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
      setLoading(false);
    }
    loadModel();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleClassify = async () => {
    if (model && image) {
      const imgElement = document.getElementById("uploaded-img");
      const preds = await model.classify(imgElement);
      setPredictions(preds);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-100 to-yellow-50 font-sans text-gray-800">
      <header className="bg-gradient-to-r from-blue-100 to-yellow-100 text-blue-600 py-10 text-center shadow-lg rounded-b-3xl">
        <h1 className="text-4xl font-bold drop-shadow-md">
          Descubra o que há em sua imagem
        </h1>
        <p className="text-xl text-yellow-600 mt-2 drop-shadow-sm">
          Envie uma imagem e descubra o que há nela com a ajuda de uma IA
          treinada!
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <section className="bg-white p-6 rounded-2xl shadow-md border-2 border-dashed border-blue-300 mb-10">
          <h2 className="text-center text-3xl text-yellow-500 font-bold mb-4">
            Como Funciona?
          </h2>
          <p className="mb-2">
            É simples! Você só precisa <strong>enviar uma foto</strong> clicando
            no botão abaixo. Em poucos segundos, o site vai mostrar para você o
            que foi identificado na imagem.
          </p>
          <p>
            Sem complicações ou cadastro. Basta escolher uma imagem do seu
            celular ou computador e descobrir o que há nela de forma rápida e
            interativa!
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-md border-2 border-dashed border-blue-300 mb-10">
          <h2 className="text-center text-3xl text-yellow-500 font-bold mb-4">
            Teste Agora!
          </h2>
          <p className="text-center mb-4">
            1. Selecione uma imagem
            <br />
            2. Clique em "Descobrir"
            <br />
            3. Veja o que a IA reconhece!
          </p>
          <div className="flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-4 p-2 border-2 rounded-lg bg-blue-50 cursor-pointer"
            />
            <button
              onClick={handleClassify}
              disabled={loading}
              className="bg-yellow-100 hover:bg-blue-500 hover:text-white text-gray-700 font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300"
            >
              {loading ? "Carregando IA..." : "🔍 Descobrir"}
            </button>
            {image && (
              <img
                id="uploaded-img"
                src={image}
                alt="Upload preview"
                className="mt-6 rounded-xl max-w-full max-h-[400px] border-4 border-blue-300 shadow-lg"
              />
            )}
            {predictions.length > 0 && (
              <div className="bg-yellow-100 mt-6 p-4 border-l-8 border-yellow-500 rounded-xl w-full max-w-xl">
                <h3 className="font-bold text-lg mb-2">
                  Resultado da Análise:
                </h3>
                <ul className="list-disc list-inside">
                  {predictions.map((p, index) => (
                    <li key={index}>
                      <strong>{p.className}</strong>:{" "}
                      {(p.probability * 100).toFixed(2)}%
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-md border-2 border-dashed border-blue-300 mb-10">
          <h2 className="text-center text-3xl text-yellow-500 font-bold mb-4">
            Por Que Usar Isso na Educação?
          </h2>
          <ul className="list-disc pl-5">
            <li>Mais atenção aos detalhes</li>
            <li>Curiosidade sobre o que veem</li>
            <li>Interesse em descobrir coisas novas</li>
            <li>Facilidade para observar e pensar com lógica</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-md border-2 border-dashed border-blue-300">
          <h2 className="text-center text-3xl text-yellow-500 font-bold mb-4">
            Saiba Mais
          </h2>
          <ul className="list-disc pl-5">
            <li>
              <a
                href="https://www.tensorflow.org/js"
                className="text-blue-600 hover:underline"
              >
                TensorFlow.js - Documentação oficial
              </a>
            </li>
            <li>
              <a
                href="https://github.com/tensorflow/tfjs-models/tree/master/mobilenet"
                className="text-blue-600 hover:underline"
              >
                MobileNet no GitHub
              </a>
            </li>
            <li>
              <a
                href="Trabalho/PageAle.html"
                className="text-blue-600 hover:underline"
              >
                🔍 Site para respostas a perguntas
              </a>
            </li>
            <li>
              <a
                href="Trabalho2/PageTex.html"
                className="text-blue-600 hover:underline"
              >
                🎤 Quiz com microfone
              </a>
            </li>
          </ul>
        </section>
      </main>

      <footer className="bg-blue-600 text-white text-center py-6 mt-10 border-t-4 border-yellow-300">
        <div className="text-2xl mb-2">🎓</div>
        <p>Desenvolvido por Arthur Henrique de Oliveira Petroli</p>
        <p>Data: 01/05/2025</p>
        <p>Email: arthurpetroli@alunos.utfpr.edu.br</p>
        <p>
          &copy; 2025 UTFPR-EngComp - Um projeto para auxiliar no aprendizado.
        </p>
      </footer>
    </div>
  );
}
