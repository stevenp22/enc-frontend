import { useState } from "react";
import { Categoria, Pregunta } from "../interfaces";
import { PreguntaComponent } from "./PreguntaComponent";
import { FormControlLabel, Checkbox, Box } from "@mui/material";

interface CategoriaComponentProps {
  categoria: Categoria;
  preguntasSeleccionadas: Pregunta[];
  setPreguntasSeleccionadas: (prevPreguntasSeleccionadas: Pregunta[]) => void;
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
      <FormControlLabel
        control={<Checkbox checked={showPreguntas} onChange={() => setShowPreguntas((prev) => !prev)} />}
        label={categoria.nombre}
      />
      {showPreguntas &&
        categoria.preguntas.map((pregunta, index) => (
          <Box key={index} ml={2}>
            <PreguntaComponent
              pregunta={pregunta}
              isChecked={
                preguntasSeleccionadas.find((p) => p.enunciado === pregunta.enunciado) !== undefined
              }
              onCheckChange={() => togglePreguntaSelection(pregunta)}
            />
          </Box>
        ))}
    </div>
  );
};

export { CategoriaComponent };