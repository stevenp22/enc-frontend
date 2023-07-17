"use client"
import { crearEmpresasRequest } from "@/api/EmpresasApi";
import { Button, Container, FormControl, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { motion } from "framer-motion";

const Crear = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({ 
    nombre: "",
    nit: "",
    alias: "",
    actividad_economica: "",
    direccion: "",
    municipio_dane: "",
    telefono: "",
    correo: "",
   });
  const crearEmpresa = async (values: any) => {
    let response;
    try {
      response = await crearEmpresasRequest(values);
      console.log(response);
      response.data.statusCode == "200"
        ? enqueueSnackbar(`${response.data.message}`, { variant: "warning" })
        : enqueueSnackbar(`${response.data.message}`, { variant: "success" });
      //router.push("/plantillas")
    } catch (e) {
      if (e == "Error: Request failed with status code 400") {
        enqueueSnackbar("Problemas creando la empresa, vuelva a intentar", {
          variant: "warning",
        });
      }
    }
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(form);
    crearEmpresa(form);
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
                nombre de la empresa
              </Typography>
            </Grid>

            <Grid item xs={11} sm={11} lg={5.5}>
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

            <Grid item xs={11} sm={11} lg={5.5}>
              <FormControl fullWidth>
                <TextField
                  multiline
                  placeholder="nit"
                  name="nit"
                  value={form.nit}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={11} sm={11} lg={5.5}>
              <FormControl fullWidth>
                <TextField
                  multiline
                  placeholder="alias"
                  name="alias"
                  value={form.alias}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={11} sm={11} lg={5.5}>
              <FormControl fullWidth>
                <TextField
                  multiline
                  placeholder="actividad_economica"
                  name="actividad_economica"
                  value={form.actividad_economica}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={11} sm={11} lg={5.5}>
              <FormControl fullWidth>
                <TextField
                  multiline
                  placeholder="direccion"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={11} sm={11} lg={5.5}>
              <FormControl fullWidth>
                <TextField
                  multiline
                  placeholder="municipio_dane"
                  name="municipio_dane"
                  value={form.municipio_dane}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={11} sm={11} lg={5.5}>
              <FormControl fullWidth>
                <TextField
                  multiline
                  placeholder="telefono"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={11} sm={11} lg={5.5}>
              <FormControl fullWidth>
                <TextField
                  multiline
                  placeholder="correo"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

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
  )
};
export default Crear;