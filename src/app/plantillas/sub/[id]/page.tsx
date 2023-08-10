"use client";
import { useEffect, useState } from "react";
import { Plantilla, Categoria, Pregunta } from "../interfaces";
import { CategoriaComponent } from "../components/CategoriaComponent";
import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import {
  crearPlantillaRequest,
  getSinglePlantillaRequest,
} from "@/api/PlantillasApi";
import { motion } from "framer-motion";
import { useSnackbar } from "notistack";
import { useRouter, useParams } from "next/navigation";

const PlantillaPage: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const params = useParams();
  const [plantilla, setPlantilla] = useState<Plantilla | null>(null);
  const [preguntasSeleccionadas, setPreguntasSeleccionadas] = useState<
    Pregunta[]
  >([]);
  const [nombrePlantilla, setNombrePlantilla] = useState<string>("");

  useEffect(() => {
    const obtenerPlantillaDesdeAPI = async () => {
      try {
        const response = await getSinglePlantillaRequest(params.id);
        setPlantilla(response.data);
        setNombrePlantilla(response.data.nombre);
      } catch (error) {
        console.error("Error al obtener la plantilla desde la API:", error);
      }
    };

    obtenerPlantillaDesdeAPI();
  }, []);

  const crearPlantillas = async (values: any) => {
    let response;
    try {
      response = await crearPlantillaRequest(values);
      response.data.statusCode == "200"
        ? enqueueSnackbar(`${response.data.message}`, { variant: "warning" })
        : enqueueSnackbar(`${response.data.message}`, { variant: "success" });
      router.push(`/plantillas`);
    } catch (e) {
      if (e == "Error: Request failed with status code 400") {
        enqueueSnackbar("Problemas creando la plantilla, vuelva a intentar", {
          variant: "warning",
        });
      }
    }
  };

  const handleGuardar = () => {
    const categorias: Categoria[] = [];

    for (const categoria of plantilla?.categorias || []) {
      const preguntasCategoriaSeleccionadas = preguntasSeleccionadas.filter(
        (pregunta) => categoria.preguntas.includes(pregunta)
      );
      if (preguntasCategoriaSeleccionadas.length > 0) {
        categorias.push({
          nombre: categoria.nombre,
          preguntas: preguntasCategoriaSeleccionadas,
        });
      }
    }

    const subPlantilla = {
      nombre: nombrePlantilla, // Utilizamos el nombre editado en el campo de texto.
      empresa: plantilla?.empresa || "",
      tipo: "Subplantilla",
      categorias,
    };

    // Aquí puedes hacer algo con la subPlantilla, como guardarla en el backend.
    console.log(subPlantilla);
    crearPlantillas(subPlantilla);
  };

  if (!plantilla) {
    return <div>Cargando...</div>;
  }

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
        <Grid container spacing={2} alignItems="center">
        <Grid item>
          <TextField
            label="Nombre de la plantilla"
            value={nombrePlantilla}
            onChange={(e) => setNombrePlantilla(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Typography variant="h4">{plantilla.empresa}</Typography>
        </Grid>
      </Grid>
        {plantilla.categorias.map((categoria, index) => (
          <CategoriaComponent
            key={index}
            categoria={categoria}
            preguntasSeleccionadas={preguntasSeleccionadas}
            setPreguntasSeleccionadas={setPreguntasSeleccionadas}
          />
        ))}
        <Button variant="contained" color="primary" onClick={handleGuardar}>
          Guardar
        </Button>
      </Paper>
    </Container>
  );
};

export default PlantillaPage;
