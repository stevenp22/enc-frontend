"use client";
import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useRouter, useParams } from "next/navigation";
import { getSingleEncuestaRequest } from "@/api/EncuestadoApi";
import { format } from "date-fns";

const EncuestaDetailsView: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [encuesta, setEncuesta] = useState({
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

  useEffect(() => {
    const obtenerEncuestaDesdeAPI = async () => {
      try {
        const response = await getSingleEncuestaRequest(params.id);
        const formattedCreatedAt = format(
          new Date(response.data.createdAt),
          "dd/MM/yyyy HH:mm:ss"
        );
        setEncuesta({
          ...response.data,
          createdAt: formattedCreatedAt,
        });
      } catch (error) {
        console.error("Error al obtener la encuesta desde la API:", error);
      }
    };
    obtenerEncuestaDesdeAPI();
  }, [params.id]);

  return (
    <div>
      <Typography variant="h4">Detalles de la Encuesta</Typography>

      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h6">Información General</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Nombre:
                </TableCell>
                <TableCell>{encuesta.nombre}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Empresa:
                </TableCell>
                <TableCell>{encuesta.empresa}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Nombre del Encuestado:
                </TableCell>
                <TableCell>{encuesta.nombreEncuestado}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Cargo:
                </TableCell>
                <TableCell>{encuesta.cargo}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Razón Social:
                </TableCell>
                <TableCell>{encuesta.razonSocial}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Ciudad:
                </TableCell>
                <TableCell>{encuesta.ciudad}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Fecha de Creación:
                </TableCell>
                <TableCell>{encuesta.createdAt}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h6">Categorías y Preguntas</Typography>
        {encuesta.categorias.map((categoria) => (
          <div key={categoria.nombre} style={{ marginTop: "10px" }}>
            <Typography variant="subtitle1">
              Categoría: {categoria.nombre}
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Enunciado</TableCell>
                    <TableCell>Valoración</TableCell>
                    <TableCell>Enunciado del Comentario</TableCell>
                    <TableCell>Texto del Comentario</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categoria.preguntas.map((pregunta) => (
                    <TableRow key={pregunta.enunciado}>
                      <TableCell>{pregunta.enunciado}</TableCell>
                      <TableCell>{pregunta.valoracion}</TableCell>
                      <TableCell>{pregunta.enunciadoComentario}</TableCell>
                      <TableCell>{pregunta.textoComentario}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))}
      </Paper>
    </div>
  );
};

export default EncuestaDetailsView;
