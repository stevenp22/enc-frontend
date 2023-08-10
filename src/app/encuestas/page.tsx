"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  MenuItem,
  IconButton,
  TextField,
  Tooltip,
  Link as MuiLink,
  Button,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import Link from "next/link";
import { getEncuestasRequest } from "@/api/EncuestadoApi";
import { getEmpresasRequest } from "@/api/EmpresasApi";
import { getPlantillasRequest } from "@/api/PlantillasApi";
import { useRouter } from "next/navigation";

const EncuestaListView: React.FC = () => {
  const router = useRouter();
  const [empresaFilter, setEmpresaFilter] = useState("");
  const [nombreFilter, setNombreFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [empresas, setEmpresas] = useState([
    {
      nombre: "",
    },
  ]);
  const [plantillas, setPlantillas] = useState([
    {
      nombre: "",
    },
  ]);
  const [encuestaState, setEncuestaStateData] = useState([
    {
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
    },
  ]);

  const getEncuestas = async () => {
    const response = await getEncuestasRequest();
    setEncuestaStateData(response.data);
  };

  const getEmpresas = async () => {
    const response = await getEmpresasRequest();
    setEmpresas(response.data);
  };

  const getPlantillas = async () => {
    const response = await getPlantillasRequest();
    setPlantillas(response.data);
  };

  useEffect(() => {
    getEncuestas();
    getEmpresas();
    getPlantillas();
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  const filteredEncuestas = encuestaState.filter((encuesta) => {
    return (
      (empresaFilter === "" || encuesta.empresa === empresaFilter) &&
      (nombreFilter === "" || encuesta.nombre === nombreFilter)
    );
  });

  return (
    <div>
      <TextField
        placeholder="empresa"
        id="empresa"
        label="empresa"
        name="empresa"
        value={empresaFilter}
        sx={{ minWidth: "20%" }}
        onChange={(e) => setEmpresaFilter(e.target.value)}
        select
      >
        <MenuItem value="">Todas las Empresas</MenuItem>
        {empresas.map((empresa, index) => (
          <MenuItem value={empresa.nombre} key={index}>
            {empresa.nombre}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        placeholder="plantilla"
        id="plantilla"
        label="plantilla"
        name="plantilla"
        value={nombreFilter}
        sx={{ minWidth: "20%" }}
        onChange={(e) => setNombreFilter(e.target.value)}
        select
      >
        <MenuItem value="">Todos los Nombres</MenuItem>
        {plantillas.map((plantilla, index) => (
          <MenuItem value={plantilla.nombre} key={index}>
            {plantilla.nombre}
          </MenuItem>
        ))}
      </TextField>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre Encuestado</TableCell>
            <TableCell>Cargo</TableCell>
            <TableCell>Fecha Creación</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredEncuestas.map((encuesta) => (
            <TableRow key={encuesta._id}>
              <TableCell>{encuesta.nombreEncuestado}</TableCell>
              <TableCell>{encuesta.cargo}</TableCell>
              <TableCell>{encuesta.createdAt}</TableCell>
              <TableCell>
                <Tooltip title="Ver detalles">
                  <MuiLink>
                    <Button
                      onClick={() => router.push(`/encuestas/detalles/${encuesta._id}`)}
                    >
                      <InfoIcon sx={{ color: "#ffc327" }} />
                    </Button>
                  </MuiLink>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EncuestaListView;
