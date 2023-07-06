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
import { crearPlantillaRequest } from "@/api/PlantillasApi";
import { useSnackbar } from "notistack";
import { useState } from "react";
import Questions from "@/components/Questions";
import { motion } from "framer-motion";

const Crear = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({
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
  //const [addQuestion, setAddQuestion] = useState<any>([]);

  const handleAddQuestion = (e: any, index: number) => {
    const { name, value, checked } = e.target;

    const updateCampos = { ...form };
    updateCampos.preguntas[index] = {
      ...updateCampos.preguntas[index],
      [name]: value,
      comentario: checked || false,
    };

    setForm(updateCampos);
  };

  const addFields = () => {
    setForm({
      ...form,
      preguntas: [
        ...(form.preguntas || []),
        { enunciado: "", tipoRespuesta: "", comentario: false },
      ],
    });
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
    crearPlantillas(form);
  };

  const crearPlantillas = async (values: any) => {
    let response;
    try {
      response = await crearPlantillaRequest(values);
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
                Crear Plantilla
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
                  placeholder="empresa"
                  name="empresa"
                  value={form.empresa}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            {form.preguntas.map((question: any, index: number) => {
              return (
                <Grid item xs={11.5} sm={11.5} lg={5.5} key={index}>
                  <FormControl fullWidth>
                    <Questions
                      enunciado={question.enunciado}
                      tipoRespuesta={question.tipoRespuesta}
                      comentario={question.comentario}
                      onChange={(e: any) => handleAddQuestion(e, index)}
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
