import { useState } from "react";
import { Categoria, Pregunta } from "../interfaces";
import { PreguntaComponent } from "./PreguntaComponent";

interface CategoriaComponentProps {
  categoria: Categoria;
  preguntasSeleccionadas: Pregunta[];
  setPreguntasSeleccionadas: (preguntas: Pregunta[]) => void;
}

const CategoriaComponent: React.FC<CategoriaComponentProps> = ({
  categoria,
  preguntasSeleccionadas,
  setPreguntasSeleccionadas,
}) => {
  const [showPreguntas, setShowPreguntas] = useState(false);

  const togglePreguntaSelection = (pregunta: Pregunta) => {
    const preguntasSeleccionadasActualizadas = preguntasSeleccionadas.includes(pregunta)
      ? preguntasSeleccionadas.filter((p) => p !== pregunta)
      : [...preguntasSeleccionadas, pregunta];

    setPreguntasSeleccionadas(preguntasSeleccionadasActualizadas);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={showPreguntas}
          onChange={() => setShowPreguntas((prev) => !prev)}
        />
        {categoria.nombre}
      </label>
      {showPreguntas &&
        categoria.preguntas.map((pregunta, index) => (
          <PreguntaComponent
            key={index}
            pregunta={pregunta}
            isChecked={
              preguntasSeleccionadas.find((p) => p.enunciado === pregunta.enunciado) !== undefined
            }
            onCheckChange={() => togglePreguntaSelection(pregunta)}
          />
        ))}
    </div>
  );
};

export { CategoriaComponent };