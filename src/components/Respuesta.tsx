import { getSingleOpcionesRequest } from "@/api/OpcionesApi";
import {
  TextField,
  Paper,
  Grid,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const Respuesta = ({
  enunciado,
  tipoRespuesta,
  valoracion,
  comentario,
  enunciadoComentario,
  textoComentario,
  onChange,
}: any) => {
  const [loading, setLoading] = useState(true);
  const [opcionesState, setOpcionesState] = useState([]);

  const getOpciones = async () => {
    const response = await getSingleOpcionesRequest(tipoRespuesta);
    if (Array.isArray(response.data.opciones)) {
      setOpcionesState(response.data.opciones);
    }
  };

  useEffect(() => {
    getOpciones();
    setLoading(false);
  }, [loading]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Paper elevation={4} style={{ padding: "30px 20px", borderRadius: "12px" }}>
      <Grid item>
        <Typography variant="h5" gutterBottom>
          {enunciado}
        </Typography>
      </Grid>

      {opcionesState && (
        <Grid item>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="valoracion"
              value={valoracion}
              onChange={onChange}
              row
            >
              {opcionesState.map((dato: any, index: number) => {
                return (
                  <FormControlLabel
                    key={index}
                    value={dato.valor}
                    control={<Radio />}
                    label={dato.valor}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </Grid>
      )}

      {comentario == "true" && (
        <Grid item>
          <Typography variant="h6" gutterBottom>
            {enunciadoComentario}
          </Typography>
          <FormControl fullWidth>
            <TextField
              multiline
              name="textoComentario"
              value={textoComentario}
              onChange={onChange}
              placeholder="Comentario"
            />
          </FormControl>
        </Grid>
      )}
    </Paper>
  );
};

export default Respuesta;
