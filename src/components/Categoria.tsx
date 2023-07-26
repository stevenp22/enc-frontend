import React from "react";
import Pregunta, { PreguntaData } from "./Pregunta";
import {
  Button,
  FormControl,
  Grid,
  Paper,
  Stack,
  TextField,
} from "@mui/material";

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
    onChange({
      ...categoria,
      preguntas: [...categoria.preguntas, nuevaPregunta],
    });
  };

  const eliminarUltimaPregunta = () => {
    const nuevasPreguntas = [...categoria.preguntas];
    nuevasPreguntas.pop();
    onChange({ ...categoria, preguntas: nuevasPreguntas });
  };

  return (
    <Paper elevation={4} style={{ margin: "30px 20px", borderRadius: "12px" }}>
      <Grid item>
        <FormControl fullWidth>
          <TextField
            multiline
            name="nombre"
            placeholder="Nombre Categoría"
            label="Nombre Categoría"
            value={categoria.nombre}
            onChange={handleNombreChange}
          />
        </FormControl>
      </Grid>
      {categoria.preguntas.map((pregunta, index) => (
        <Pregunta
          key={index}
          pregunta={pregunta}
          onChange={(nuevaPregunta) =>
            handlePreguntaChange(index, nuevaPregunta)
          }
        />
      ))}
      <Grid item xs={11} sm={11.5}>
        <Stack spacing={2} direction="row">
          <Button
            fullWidth
            color="inherit"
            variant="contained"
            onClick={agregarPregunta}
          >
            Agregar Pregunta
          </Button>
          <Button
            fullWidth
            color="inherit"
            variant="contained"
            onClick={eliminarUltimaPregunta}
          >
            Eliminar Última Pregunta
          </Button>
        </Stack>
      </Grid>
    </Paper>
  );
};

export default Categoria;
