"use client";
import {
  TextField,
  Paper,
  Grid,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const Respuesta = ({
  enunciado,
  tipoRespuesta,
  valoracion,
  comentario,
  textoComentario,
  onChange,
}: any) => {
  const [arreglo, setArreglo] = useState<number[]>([]);
  let arregloTemp: number[] = new Array();

  useEffect(() => {
    for (let i = 0; i < tipoRespuesta; i++) {
      arregloTemp.push(i);
    }
    setArreglo(arregloTemp);
    console.log(arreglo);
  }, []);

  return (
    <Paper elevation={4} style={{ padding: "30px 20px", borderRadius: "12px" }}>
      <Grid item>
        <Typography variant="h6" gutterBottom>
          {enunciado}
        </Typography>
      </Grid>

      <Grid item>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            valoracion
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="valoracion"
            value={valoracion}
            onChange={onChange}
          >
            {arreglo.map((dato: any, index: number) => {
              return (
                <FormControlLabel
                  key={index}
                  value={dato}
                  control={<Radio />}
                  label={index + 1}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </Grid>
      {comentario && (
        <Grid item>
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
