import { getOpcionesRequest } from "@/api/OpcionesApi";
import {
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

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

  const [opcionesState, setOpcionesState] = useState([
    {
      _id: "",
      nombre: "",
    },
  ]);

  const getOpciones = async () => {
    const response = await getOpcionesRequest();
    setOpcionesState(response.data);
  };

  useEffect(() => {
    getOpciones();
  }, []);

  return (
    <Paper elevation={4} style={{ margin: "30px 20px", borderRadius: "12px" }}>
      <Grid item>
        <FormControl fullWidth>
          <TextField
            multiline
            placeholder="Enunciado"
            label="Enunciado"
            name="enunciado"
            value={pregunta.enunciado}
            onChange={handleInputChange}
          />
        </FormControl>
      </Grid>
      <Stack spacing={2} direction="row">
        <Grid item xs={11} sm={11} lg={6} style={{ paddingTop: "20px" }}>
          <FormControl fullWidth>
            <TextField
              id="tipoRespuesta"
              placeholder="tipoRespuesta"
              label="Tipo de Respuesta"
              name="tipoRespuesta"
              value={pregunta.tipoRespuesta}
              onChange={handleInputChange}
              select
            >
              <MenuItem value={""}>sin valor</MenuItem>
              {opcionesState.map((opcion, index) => (
                <MenuItem value={opcion._id} key={index}>
                  {opcion.nombre}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Grid>
        <Grid item xs={11} sm={11} lg={6} style={{ paddingTop: "20px" }}>
          <FormControl fullWidth>
            <TextField
              id="comentario"
              label="comentario"
              placeholder="comentario"
              name="comentario"
              value={pregunta.comentario}
              onChange={handleInputChange}
              select
            >
              <MenuItem value={"true"}>Si</MenuItem>
              <MenuItem value={"false"}>No</MenuItem>
            </TextField>
          </FormControl>
        </Grid>
      </Stack>
      {pregunta.comentario == "true" && (
        <Grid item style={{ paddingTop: "20px" }}>
          <FormControl fullWidth>
            <TextField
              multiline
              placeholder="Enunciado Comentario"
              label="Enunciado Comentario"
              name="enunciadoComentario"
              value={pregunta.enunciadoComentario}
              onChange={handleInputChange}
            />
          </FormControl>
        </Grid>
      )}
    </Paper>
  );
};

export default Pregunta;
