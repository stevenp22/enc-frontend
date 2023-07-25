import React from "react";
import Pregunta, { PreguntaData } from "./Pregunta";

export interface CategoriaData {
  nombre: string;
  preguntas: PreguntaData[];
}

interface CategoriaProps {
  categoria: CategoriaData;
  onChange: (nuevaCategoria: CategoriaData) => void;
}

const Categoria: React.FC<CategoriaProps> = ({ categoria, onChange }) => {
  const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoNombre = event.target.value;
    onChange({ ...categoria, nombre: nuevoNombre });
  };

  const handlePreguntaChange = (index: number, nuevaPregunta: PreguntaData) => {
    const nuevasPreguntas = [...categoria.preguntas];
    nuevasPreguntas[index] = nuevaPregunta;
    onChange({ ...categoria, preguntas: nuevasPreguntas });
  };

  const agregarPregunta = () => {
    const nuevaPregunta: PreguntaData = {
      enunciado: "",
      tipoRespuesta: "",
      enunciadoComentario: "",
      comentario: "",
    };
    onChange({ ...categoria, preguntas: [...categoria.preguntas, nuevaPregunta] });
  };

  const eliminarUltimaPregunta = () => {
    const nuevasPreguntas = [...categoria.preguntas];
    nuevasPreguntas.pop();
    onChange({ ...categoria, preguntas: nuevasPreguntas });
  };

  return (
    <div>
      <div>
        <label>Nombre Categoría:</label>
        <input type="text" value={categoria.nombre} onChange={handleNombreChange} />
      </div>
      {categoria.preguntas.map((pregunta, index) => (
        <Pregunta
          key={index}
          pregunta={pregunta}
          onChange={(nuevaPregunta) => handlePreguntaChange(index, nuevaPregunta)}
        />
      ))}
      <button onClick={agregarPregunta}>Agregar Pregunta</button>
      <button onClick={eliminarUltimaPregunta}>Eliminar Última Pregunta</button>
    </div>
  );
};

export default Categoria;
