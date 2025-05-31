import React from 'react';

const InfoSection = ({ title, children, className, icon }) => {
  return (
    <section className={`bg-white rounded-3xl shadow-xl p-8 transform transition-all hover:shadow-2xl ${className}`}>
      <div className="flex items-center justify-center mb-5">
        {icon && <span className="text-3xl mr-3">{icon}</span>}
        <h2 className="text-center text-3xl text-blue-600 font-bold">
          {title}
        </h2>
      </div>
      <div className="text-gray-700">
        {children}
      </div>
    </section>
  );
};

export default InfoSection;