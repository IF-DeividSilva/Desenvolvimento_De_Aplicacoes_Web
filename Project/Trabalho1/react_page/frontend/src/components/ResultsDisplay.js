import React from 'react';

const ResultsDisplay = ({ results }) => {
  if (!results || results.length === 0) return null;

  return (
    <div className="bg-yellow-100 mt-6 p-4 border-l-8 border-yellow-500 rounded-xl w-full max-w-xl">
      <h3 className="font-bold text-lg mb-2">Resultado da Análise:</h3>
      <ul className="list-disc list-inside">
        {results.map((p, index) => (
          <li key={index}>
            <strong>{p.className}</strong>:{' '}
            {(p.probability * 100).toFixed(2)}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsDisplay;