"use client";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  FormControl,
  Stack,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Respuesta from "@/components/Respuesta";
import { getSinglePlantillaRequest } from "@/api/PlantillasApi";
import { crearEncuestadoRequest } from "@/api/EncuestadoApi";

const Crear = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [encuesta, setEncuesta] = useState({
    nombre: "",
    empresa: "",
    preguntas: [
      {
        enunciado: "",
        tipoRespuesta: "",
        comentario: false,
      },
    ],
  });
  const [form, setForm] = useState({
    encuesta: "",
    nombre: "",
    cargo: "",
    razonSocial: "",
    ciudad: "",
    respuestas: [{}],
  });

  const getEncuesta = async (id: any) => {
    const response = await getSinglePlantillaRequest(id);
    setEncuesta(response.data);
    setForm((prevFormData) => ({
      ...prevFormData,
      encuesta: encuesta.nombre,
    }));
    //console.log(encuesta);
  };

  useEffect(() => {
    getEncuesta("64a0cde77cfb6997f488b991");
  }, []);

  const handleAddRespuesta = (e: any, index: number) => {
    const { name, value } = e.target;

    const updateCampos = { ...form };
    updateCampos.respuestas[index] = {
      ...updateCampos.respuestas[index],
      [name]: value,
    };

    setForm(updateCampos);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const crearEncuestado = async (values: any) => {
    let response;
    try {
      response = await crearEncuestadoRequest(values);
      console.log(response);
      response.data.statusCode == "200"
        ? enqueueSnackbar(`${response.data.message}`, { variant: "warning" })
        : enqueueSnackbar(`${response.data.message}`, { variant: "success" });
      //router.push("/plantillas")
    } catch (e) {
      if (e == "Error: Request failed with status code 400") {
        enqueueSnackbar("Problemas creando la plantilla, vuelva a intentar", {
          variant: "warning",
        });
      }
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(form);
    crearEncuestado(form);
  };

  return (
    <Container
      maxWidth="xl"
      component={motion.div}
      initial={{ x: "30%" }}
      animate={{ x: "0%" }}
      style={{ marginTop: "30px" }}
    >
      <Paper
        elevation={4}
        style={{ padding: "30px 20px", borderRadius: "12px" }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={11.5} sm={12} lg={12} sx={{ marginLeft: "20px" }}>
              <Typography variant="h6" gutterBottom>
                {encuesta.nombre}
              </Typography>
            </Grid>

            <Grid item xs={11.5} sm={12} lg={12} sx={{ marginLeft: "20px" }}>
              <Typography variant="h6" gutterBottom>
                informacion personal
              </Typography>
            </Grid>

            <Grid item xs={11.5} sm={11.5} lg={5.5}>
              <FormControl fullWidth>
                <TextField
                  multiline
                  placeholder="nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={11.5} sm={11.5} lg={5.5}>
              <FormControl fullWidth>
                <TextField
                  multiline
                  placeholder="cargo"
                  name="cargo"
                  value={form.cargo}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={11.5} sm={11.5} lg={5.5}>
              <FormControl fullWidth>
                <TextField
                  multiline
                  placeholder="razonSocial"
                  name="razonSocial"
                  value={form.razonSocial}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={11.5} sm={11.5} lg={5.5}>
              <FormControl fullWidth>
                <TextField
                  multiline
                  placeholder="ciudad"
                  name="ciudad"
                  value={form.ciudad}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={11.5} sm={12} lg={12} sx={{ marginLeft: "20px" }}>
              <Typography variant="h6" gutterBottom>
                valoracion
              </Typography>
            </Grid>

            {encuesta.preguntas.map((answer: any, index: number) => {
              return (
                <Grid item xs={11.5} sm={11.5} lg={5.5} key={index}>
                  <FormControl fullWidth>
                    <Respuesta
                      enunciado={answer.enunciado}
                      tipoRespuesta={answer.tipoRespuesta}
                      valoracion={answer.valoracion}
                      comentario={answer.comentario}
                      textoComentario={answer.textoComentario}
                      onChange={(e: any) => handleAddRespuesta(e, index)}
                    />
                  </FormControl>
                </Grid>
              );
            })}

            <Grid item xs={11} sm={11}>
              <Stack spacing={2} direction="row">
                <Button fullWidth type="submit" variant="contained">
                  Guardar
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
export default Crear;
