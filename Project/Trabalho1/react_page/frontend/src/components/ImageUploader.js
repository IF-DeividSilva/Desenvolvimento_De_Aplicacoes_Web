import React, { useState, useEffect } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';

/**
 * Componente ImageUploader
 * 
 * Este componente permite ao usuário fazer upload de uma imagem e usar o modelo
 * MobileNet do TensorFlow.js para classificar o conteúdo da imagem.
 * O componente exibe a imagem carregada e mostra os resultados da análise.
 */
const ImageUploader = () => {
  // Estado para armazenar o modelo MobileNet carregado
  const [model, setModel] = useState(null);
  
  // Estado para armazenar a imagem selecionada (como URL base64)
  const [image, setImage] = useState(null);
  
  // Estado para armazenar as previsões/classificações da imagem
  const [predictions, setPredictions] = useState([]);
  
  // Estado para controlar o estado de carregamento (modelo ou classificação)
  const [loading, setLoading] = useState(true);
  
  // Estado para controlar o processo de upload da imagem
  const [uploading, setUploading] = useState(false);

  /**
   * Effect hook para carregar o modelo MobileNet quando o componente é montado
   * Executa apenas uma vez no carregamento inicial do componente
   */
  useEffect(() => {
    async function loadModel() {
      // Carrega o modelo MobileNet do TensorFlow.js
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
      setLoading(false); // Atualiza o estado para indicar que o modelo está pronto
    }
    loadModel();
  }, []);

  /**
   * Função para lidar com o upload da imagem selecionada pelo usuário
   * Converte o arquivo em uma URL base64 para exibição e uso posterior
   * 
   * @param {Event} event - O evento de mudança do input file
   */
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true); // Indica que o upload está em andamento
      const reader = new FileReader();
      
      // Callback executado quando a leitura do arquivo é concluída
      reader.onload = (e) => {
        setImage(e.target.result); // Armazena a imagem como URL base64
        setUploading(false); // Upload concluído
      };
      
      // Inicia a leitura do arquivo como URL de dados (base64)
      reader.readAsDataURL(file);
    }
  };

  /**
   * Função para classificar a imagem usando o modelo MobileNet
   * Chamada quando o usuário clica no botão "Descobrir"
   */
  const handleClassify = async () => {
    if (model && image) {
      setPredictions([]); // Limpa previsões anteriores
      setLoading(true); // Indica que o processo de classificação iniciou
      
      // Obtém o elemento de imagem do DOM para classificação
      const imgElement = document.getElementById('uploaded-img');
      
      // Usa o modelo para classificar a imagem
      const preds = await model.classify(imgElement);
      
      // Atualiza o estado com as previsões e finaliza o carregamento
      setPredictions(preds);
      setLoading(false);
    }
  };

  return (
    // Removido o div com gradiente, apenas o conteúdo principal
    <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-10 max-w-4xl mx-auto my-10">
      {/* Título principal do componente */}
      <h2 className="text-center text-3xl text-blue-600 font-bold mb-6">
        Teste Agora!
      </h2>
      
      <div className="flex flex-col items-center">
        {/* Instruções de uso para o usuário */}
        <div className="w-full max-w-md bg-blue-50 p-6 rounded-xl mb-6">
          <p className="mb-3 font-medium">Como usar:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Selecione uma imagem do seu dispositivo</li>
            <li>Verifique a prévia da imagem abaixo</li>
            <li>Clique em "Descobrir" para analisar</li>
          </ol>
        </div>

        {/* Botão para carregar uma imagem (implementado como label para estilização) */}
        <label className="w-full max-w-xs mb-6 cursor-pointer">
          <div className="bg-blue-100 hover:bg-blue-200 border border-blue-300 rounded-xl p-4 text-center transition-all">
            <svg className="w-8 h-8 mx-auto text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-blue-700">Escolher imagem</p>
          </div>
          {/* Input file oculto, acionado pelo label acima */}
          <input
            type="file"
            accept="image/*" // Aceita apenas arquivos de imagem
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
        
        {/* Container de prévia da imagem - só é exibido quando uma imagem é selecionada */}
        {image && (
          <div className="w-full max-w-lg mb-6">
            {/* Cabeçalho do container de imagem */}
            <div className="bg-gray-50 p-3 rounded-t-lg border-t border-x border-gray-300">
              <h3 className="font-medium text-gray-700 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Imagem Selecionada
              </h3>
            </div>
            {/* Corpo do container com a imagem */}
            <div className="border-x border-b border-gray-300 p-4 rounded-b-lg bg-white flex justify-center">
              {/* A imagem propriamente dita, com ID para referência no classificador */}
              <img
                id="uploaded-img" // ID usado pela função de classificação para referência
                src={image} // URL base64 da imagem
                alt="Prévia da imagem selecionada"
                className="max-w-full max-h-[350px] rounded-lg shadow-md"
                style={{ display: 'block', minHeight: '150px' }} // Garantia de visibilidade
              />
            </div>
          </div>
        )}
        
        {/* Botão para iniciar a classificação da imagem */}
        <button
          onClick={handleClassify}
          // Desabilita o botão durante o carregamento ou se não houver imagem
          disabled={loading || !image || uploading}
          className={`${
            loading || !image || uploading 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' // Estilo para botão desabilitado
              : 'bg-blue-600 hover:bg-blue-700 text-white' // Estilo para botão habilitado
          } font-medium py-3 px-8 rounded-full transition-all duration-300 mb-6`}
        >
          {/* Texto do botão muda de acordo com o estado */}
          {loading ? 'Processando...' : (image ? '🔍 Descobrir' : 'Selecione uma imagem')}
        </button>
        
        {/* Exibe os resultados da classificação quando disponíveis */}
        {predictions.length > 0 && (
          <div className="w-full max-w-md bg-green-50 p-5 rounded-xl border border-green-200">
            <h3 className="font-bold text-lg mb-3 text-green-800">
              Resultados da Análise:
            </h3>
            {/* Lista de previsões com suas probabilidades */}
            <ul className="space-y-2">
              {predictions.map((p, index) => (
                <li key={index} className="flex items-center p-2 bg-white rounded border border-green-100">
                  <span className="font-medium mr-2">{index+1}.</span>
                  <span className="flex-1">{p.className}</span>
                  {/* Exibe a probabilidade como porcentagem */}
                  <span className="bg-green-600 text-white text-sm py-1 px-2 rounded">
                    {(p.probability * 100).toFixed(1)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageUploader;