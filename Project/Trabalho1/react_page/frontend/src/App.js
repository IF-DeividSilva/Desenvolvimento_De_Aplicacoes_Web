import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageUploader from './components/ImageUploader';
import ResultsDisplay from './components/ResultsDisplay';
import InfoSection from './components/InfoSection';
import './App.css';

function App() {
  const [results, setResults] = useState(null);
  
  return (
    <div className="App" style={{ 
      background: 'linear-gradient(to right, #e6f7ff, #fffbe6)',
      minHeight: '100vh',
      width: '100%'
    }}>
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-10">
        <InfoSection title="Como Funciona?" icon="💡" className="transform hover:translate-y-[-5px] transition-all duration-300">
          <p className="text-lg mb-4 leading-relaxed">
            É simples! Você só precisa <span className="text-blue-600 font-medium">enviar uma foto</span> usando nosso sistema intuitivo. Em segundos, nossa inteligência artificial analisará a imagem e mostrará o que foi identificado.
          </p>
          <p className="text-lg leading-relaxed">
            Sem complicações ou necessidade de cadastro. Escolha qualquer imagem do seu dispositivo e descubra o que há nela de forma rápida e interativa!
          </p>
        </InfoSection>

        <ImageUploader onResultsReceived={setResults} />

        <div className="grid md:grid-cols-2 gap-8">
          <InfoSection title="Por Que Usar na Educação?" icon="🎓" className="h-full transform hover:translate-y-[-5px] transition-all duration-300">
            <ul className="space-y-3 mt-2">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Desenvolve atenção aos detalhes</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Estimula a curiosidade e o questionamento</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Desperta o interesse pela descoberta</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Facilita o desenvolvimento do pensamento lógico</span>
              </li>
            </ul>
          </InfoSection>

          <InfoSection title="Saiba Mais" icon="🔗" className="h-full transform hover:translate-y-[-5px] transition-all duration-300">
            <ul className="space-y-3 mt-2">
              <li className="bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 p-2 rounded transition-all">
                <a
                  href="https://www.tensorflow.org/js"
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                  </svg>
                  TensorFlow.js - Documentação oficial
                </a>
              </li>
              <li className="bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 p-2 rounded transition-all">
                <a
                  href="https://github.com/tensorflow/tfjs-models/tree/master/mobilenet"
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                  </svg>
                  MobileNet no GitHub
                </a>
              </li>
              <li className="bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 p-2 rounded transition-all">
                <a
                  href="Trabalho/PageAle.html"
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                  </svg>
                  🔍 Site para respostas a perguntas
                </a>
              </li>
              <li className="bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 p-2 rounded transition-all">
                <a
                  href="Trabalho2/PageTex.html"
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                  </svg>
                  🎤 Quiz com microfone
                </a>
              </li>
            </ul>
          </InfoSection>
        </div>

        {results && <ResultsDisplay results={results} />}
      </main>

      <Footer />
      
      {/* Adicione esta animação CSS no seu arquivo CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default App;
