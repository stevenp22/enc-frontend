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
import { useParams } from "next/navigation";
import CompartirButton from "@/components/CompartirButton";

const Crear = () => {
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [encuestaState, setEncuestaState] = useState({
    _id: "",
    nombre: "",
    empresa: "",
    nombreEncuestado: "",
    cargo: "",
    razonSocial: "",
    ciudad: "",
    createdAt: "",
    updatedAt: "",
    categorias: [
      {
        nombre: "",
        preguntas: [
          {
            enunciado: "",
            tipoRespuesta: "",
            valoracion: "",
            comentario: "",
            enunciadoComentario: "",
            textoComentario: "",
          },
        ],
      },
    ],
  });

  const getEncuesta = async (id: any) => {
    const response = await getSinglePlantillaRequest(id);
    setEncuestaState(response.data);
  };

  useEffect(() => {
    getEncuesta(params.id);

    setLoading(false);
  }, [params.id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  const handleAddRespuesta = (e: any, indexCategoria: number, indexRespuesta: number) => {
    const { name, value } = e.target;

    const updateCampos = { ...encuestaState };
    updateCampos.categorias[indexCategoria].preguntas[indexRespuesta] = {
      ...updateCampos.categorias[indexCategoria].preguntas[indexRespuesta],
      [name]: value,
    }
    setEncuestaState(updateCampos);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEncuestaState((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const crearEncuestado = async (values: any) => {
    let response;
    try {
      response = await crearEncuestadoRequest(values);
      //console.log(response);
      response.data.statusCode == "200"
        ? enqueueSnackbar(`${response.data.message}`, { variant: "warning" })
        : enqueueSnackbar(`${response.data.message}`, { variant: "success" });
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
    const { _id, createdAt, updatedAt, ...updatedEncuestaState } = encuestaState;
    //console.log(updatedEncuestaState);
    crearEncuestado(updatedEncuestaState);
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
        <CompartirButton/>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={11.5} sm={12} lg={12} sx={{ marginLeft: "20px" }}>
              <Typography variant="h6" gutterBottom>
                {encuestaState.nombre}
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
                  placeholder="Nombre"
                  label="Nombre"
                  name="nombreEncuestado"
                  value={encuestaState.nombreEncuestado}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={11.5} sm={11.5} lg={5.5}>
              <FormControl fullWidth>
                <TextField
                  multiline
                  placeholder="Cargo"
                  label="Cargo"
                  name="cargo"
                  value={encuestaState.cargo}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={11.5} sm={11.5} lg={5.5}>
              <FormControl fullWidth>
                <TextField
                  multiline
                  placeholder="Razon Social"
                  label="Razon Social"
                  name="razonSocial"
                  value={encuestaState.razonSocial}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={11.5} sm={11.5} lg={5.5}>
              <FormControl fullWidth>
                <TextField
                  multiline
                  placeholder="Ciudad"
                  label="Ciudad"
                  name="ciudad"
                  value={encuestaState.ciudad}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            {encuestaState.categorias.map((categoria: any, indexCategoria: number) => {
              return (
                <Grid item xs={11.5} sm={11.5} key={indexCategoria}>
                  <FormControl fullWidth>
                    <Typography
                      variant="h4"
                      gutterBottom
                      style={{ backgroundColor: "#c7c8ca" }}
                    >
                      {categoria.nombre}
                    </Typography>
                    {categoria.preguntas.map((pregunta: any, indexRespuesta: number) => {
                      return (
                        <Grid item xs={11.5} sm={11.5} key={indexRespuesta}>
                          <Respuesta
                            enunciado={pregunta.enunciado}
                            tipoRespuesta={pregunta.tipoRespuesta}
                            valoracion={pregunta.valoracion}
                            comentario={pregunta.comentario}
                            enunciadoComentario={pregunta.enunciadoComentario}
                            textoComentario={pregunta.textoComentario}
                            onChange={(e: any) => handleAddRespuesta(e, indexCategoria, indexRespuesta)}
                          />
                        </Grid>
                      );
                    })}
                  </FormControl>
                </Grid>
              );
            })}

            <Grid item xs={11.5} sm={11.5}>
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
