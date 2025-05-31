import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-12 text-center shadow-lg rounded-b-[40px] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
          Descubra o que há em sua imagem
        </h1>
        <p className="text-xl text-blue-100 mt-3 max-w-2xl mx-auto font-light">
          Envie uma imagem e descubra o que há nela com a ajuda de uma IA treinada!
        </p>
      </div>
      <div className="absolute -bottom-6 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-blue-50/30"></div>
    </header>
  );
};

export default Header;