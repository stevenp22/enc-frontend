"use client";
import React, { useEffect, useState } from "react";
import Categoria, { CategoriaData } from "@/components/Categoria";
import { getEmpresasRequest } from "@/api/EmpresasApi";
import { crearPlantillaRequest, enviarImagenRequest } from "@/api/PlantillasApi";
import { useSnackbar } from "notistack";
import {
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Crear: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [formulario, setFormulario] = useState({
    nombre: "",
    empresa: "",
    tipo: "",
    imagen: "",
    categorias: [] as CategoriaData[],
  });

  const [imagenPreview, setImagenPreview] = useState(String);

  const [empresas, setEmpresas] = useState([
    {
      nombre: "",
    },
  ]);

  const getEmpresas = async () => {
    const response = await getEmpresasRequest();
    setEmpresas(response.data);
  };

  useEffect(() => {
    getEmpresas();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };

  const agregarCategoria = () => {
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      categorias: [...prevFormulario.categorias, { nombre: "", preguntas: [] }],
    }));
  };

  const eliminarUltimaCategoria = () => {
    setFormulario((prevFormulario) => {
      const nuevasCategorias = [...prevFormulario.categorias];
      nuevasCategorias.pop();
      return {
        ...prevFormulario,
        categorias: nuevasCategorias,
      };
    });
  };

  const manejarCambio = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImagenPreview(URL.createObjectURL(img));
    }
  };

  const enviarImagen = async (imagen: any) => {
    let response;
    try {
      response = await enviarImagenRequest(imagen);
      console.log(response.data);
      return response.data;
    } catch (e) {
      if (e == "Error: Request failed with status code 400") {
        enqueueSnackbar("Problemas subiendo la imagen, vuelva a intentar", {
          variant: "warning",
        });
      }
    }
  }

  const crearPlantillas = async (values: any) => {
    let response;
    const imagenInput = document.getElementById('imagenInput') as HTMLInputElement;
    if (imagenInput.files && imagenInput.files[0]) {
      let filename = await enviarImagen(imagenInput.files[0]);
      values.imagen = filename;
    }
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

  const guardarFormulario = (event: React.FormEvent) => {
    event.preventDefault();
    
    crearPlantillas(formulario);
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
        <form onSubmit={guardarFormulario}>
          <Grid container spacing={3}>
            <Grid item xs={11.5} sm={12} lg={12} sx={{ marginLeft: "20px" }}>
              <Typography variant="h6" gutterBottom>
                Crear Plantilla
              </Typography>
            </Grid>

            <Grid item xs={11.5} sm={11.5} lg={5.7}>
              <FormControl fullWidth>
                <TextField
                  multiline
                  placeholder="nombre"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={11.5} sm={11.5} lg={5.7}>
              <FormControl fullWidth>
                <TextField
                  placeholder="empresa"
                  id="empresa"
                  label="empresa"
                  name="empresa"
                  value={formulario.empresa}
                  onChange={handleChange}
                  select
                >
                  {empresas.map((empresa, index) => (
                    <MenuItem value={empresa.nombre} key={index}>
                      {empresa.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
            <Grid item xs={11.5} sm={11.5} lg={5.7}>
              <FormControl fullWidth>
                <TextField
                  multiline
                  placeholder="tipo"
                  label="tipo"
                  name="tipo"
                  value={formulario.tipo}
                  onChange={handleChange}
                  select
                >
                  <MenuItem value={"Maestra"}>Maestra</MenuItem>
                  <MenuItem value={"Estandar"}>Estandar</MenuItem>
                </TextField>
              </FormControl>
            </Grid>
            <Grid item xs={11.5} sm={11.5} lg={5.7}>
              <FormControl fullWidth>
                <input type="file" onChange={manejarCambio} accept="image/*" id="imagenInput" />
              </FormControl>
            </Grid>
            {imagenPreview && (
              <Grid item xs={11.5} sm={11.5} lg={5.7}>
                <FormControl fullWidth>
                  <Image src={imagenPreview} alt="imagen" width={200} height={200} />
                </FormControl>
              </Grid>
            )}
            {formulario.categorias.map((categoria, index) => (
              <Grid item xs={11.5} sm={11.5} key={index}>
                <FormControl fullWidth>
                  <Categoria
                    key={index}
                    categoria={categoria}
                    onChange={(nuevaCategoria) => {
                      const nuevasCategorias = [...formulario.categorias];
                      nuevasCategorias[index] = nuevaCategoria;
                      setFormulario({
                        ...formulario,
                        categorias: nuevasCategorias,
                      });
                    }}
                  />
                </FormControl>
              </Grid>
            ))}

            <Grid item xs={11} sm={11.5}>
              <Stack spacing={2} direction="row">
                <Button
                  fullWidth
                  color="inherit"
                  variant="contained"
                  onClick={agregarCategoria}
                >
                  Agregar Categoría
                </Button>
                <Button
                  fullWidth
                  color="inherit"
                  variant="contained"
                  onClick={eliminarUltimaCategoria}
                >
                  Eliminar Última Categoría
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={11} sm={11.5}>
              <Button fullWidth type="submit" variant="contained">
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Crear;
