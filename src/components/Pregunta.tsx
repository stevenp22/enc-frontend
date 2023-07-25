import React from "react";

export interface PreguntaData {
  enunciado: string;
  tipoRespuesta: string;
  enunciadoComentario: string;
  comentario: string;
}

interface PreguntaProps {
  pregunta: PreguntaData;
  onChange: (nuevaPregunta: PreguntaData) => void;
}

const Pregunta: React.FC<PreguntaProps> = ({ pregunta, onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onChange({ ...pregunta, [name]: value });
  };

  return (
    <div>
      <div>
        <label>Enunciado:</label>
        <input
          type="text"
          name="enunciado"
          value={pregunta.enunciado}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Tipo de Respuesta:</label>
        <input
          type="text"
          name="tipoRespuesta"
          value={pregunta.tipoRespuesta}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Enunciado Comentario:</label>
        <input
          type="text"
          name="enunciadoComentario"
          value={pregunta.enunciadoComentario}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Comentario:</label>
        <input
          type="text"
          name="comentario"
          value={pregunta.comentario}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Pregunta;
