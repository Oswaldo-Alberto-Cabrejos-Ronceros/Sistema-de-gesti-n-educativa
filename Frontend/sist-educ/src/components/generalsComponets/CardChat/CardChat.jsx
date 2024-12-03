import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
  
    const script = document.createElement('script');
    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    script.type = "text/javascript";


    script.onload = () => {
      window.voiceflow.chat.load({
        verify: { projectID: '67478a6f80e8c43aea5d3da3' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
      });
    };

    // Insertar el script en el head del documento
    document.head.appendChild(script);

    // Limpiar el script cuando el componente se desmonte
    return () => {
      document.head.removeChild(script);
    };
  }, []); 

};

export default Chatbot;