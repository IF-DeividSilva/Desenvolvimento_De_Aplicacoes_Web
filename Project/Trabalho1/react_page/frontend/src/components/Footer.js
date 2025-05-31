import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-10 mt-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-3xl mb-3">🎓</div>
            <h3 className="text-2xl font-bold mb-2">EducAI Vision</h3>
            <p className="text-blue-100">Um projeto para auxiliar no aprendizado</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="mb-1">Desenvolvido por Arthur Henrique de Oliveira Petroli</p>
            <p className="mb-1 text-blue-200">Data: 01/05/2025</p>
            <p className="mb-1">
              <a href="mailto:arthurpetroli@alunos.utfpr.edu.br" 
                 className="text-blue-100 hover:text-white transition-colors">
                arthurpetroli@alunos.utfpr.edu.br
              </a>
            </p>
            <p className="mt-4 text-sm text-blue-200">
              &copy; 2025 UTFPR-EngComp - Todos os direitos reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;