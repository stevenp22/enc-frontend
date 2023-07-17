"use client";
import { crearOpcionesRequest } from "@/api/OpcionesApi";
import {
  Button,
  Container,
  FormControl,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { motion } from "framer-motion";

const Crear = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    nombre: "",
    opciones: [{ valor: "" }],
  });

  const addFields = () => {
    setForm({
      ...form,
      opciones: [...(form.opciones || []), { valor: "" }],
    });
  };

  const handleAddOpcion = (e: any, index: number) => {
    const { name, value } = e.target;

    const updateCampos = { ...form };
    updateCampos.opciones[index] = {
      ...updateCampos.opciones[index],
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

  const crearOpciones = async (values: any) => {
    let response;
    try {
      response = await crearOpcionesRequest(values);
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
    crearOpciones(form);
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
                Crear opciones de respuesta
              </Typography>
            </Grid>

            <Grid item xs={11.5} sm={11.5}>
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

            {form.opciones.map((opcion: any, index: number) => {
              return (
                <Grid item xs={11.5} sm={11.5} lg={5.5} key={index}>
                  <FormControl fullWidth>
                    <TextField
                      multiline
                      placeholder={`valor ${index+1}`}
                      name="valor"
                      value={opcion.valor}
                      onChange={(e: any) => handleAddOpcion(e, index)}
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
                <Button
                  fullWidth
                  color="inherit"
                  variant="contained"
                  onClick={addFields}
                >
                  Add Question
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
