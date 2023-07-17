"use client";
import { getOpcionesRequest } from "@/api/OpcionesApi";
import {
  TextField,
  MenuItem,
  Paper,
  Grid,
  FormControl,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";

const Questions = ({
  enunciado,
  tipoRespuesta,
  comentario,
  enunciadoComentario,
  tipo,
  onChange,
}: any) => {
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
    <Paper elevation={4} style={{ padding: "30px 20px", borderRadius: "12px" }}>
      <Grid item>
        <FormControl fullWidth>
          <TextField
            multiline
            name="enunciado"
            value={enunciado}
            onChange={onChange}
            placeholder="Enunciado"
            label="Enunciado"
          />
        </FormControl>
      </Grid>
      {tipo == "pregunta" && (
        <Stack spacing={2} direction="row">
          <Grid item xs={11} sm={11} lg={6} style={{ paddingTop: "20px" }}>
            <FormControl fullWidth>
              <TextField
                placeholder="tipoRespuesta"
                id="tipoRespuesta"
                label="Tipo de Respuesta"
                onChange={onChange}
                name="tipoRespuesta"
                value={tipoRespuesta}
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
                placeholder="comentario"
                id="comentario"
                label="comentario"
                onChange={onChange}
                name="comentario"
                value={comentario}
                select
              >
                <MenuItem value={"true"}>Si</MenuItem>
                <MenuItem value={"false"}>No</MenuItem>
              </TextField>
            </FormControl>
          </Grid>
        </Stack>
      )}
      {comentario == "true" && (
        <Grid item style={{ paddingTop: "20px" }}>
          <FormControl fullWidth>
            <TextField
              multiline
              name="enunciadoComentario"
              value={enunciadoComentario}
              onChange={onChange}
              placeholder="Enunciado Comentario"
              label="Enunciado Comentario"
            />
          </FormControl>
        </Grid>
      )}
    </Paper>
  );
};

export default Questions;
