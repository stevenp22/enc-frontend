"use client";
import React, { useEffect, useState } from "react";
import { buscarEncuestadosPorNombreRequest } from "@/api/EncuestadoApi";
import { Encuesta, Plantilla, Opcion } from "../interfaces";
import { getSinglePlantillaRequest } from "@/api/PlantillasApi";
import { useParams } from "next/navigation";
import { getSingleOpcionesRequest } from "@/api/OpcionesApi";
import { Grafico } from "../Grafico";
import { Paper, Typography } from "@mui/material";

const Page: React.FC = () => {
  const [encuestaState, setEncuestaState] = useState<Array<Encuesta>>([]);
  const [plantilla, setPlantilla] = useState<Plantilla | undefined>();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [dataFinal, setDataFinal] = useState<number[][]>([]);
  const [opcionesFinal, setOpcionesFinal] = useState<Opcion[][]>([]);
  const [enunciado, setEnunciado] = useState<string[]>([]);
  const [estadoNps, setEstadoNps] = useState<Array<number>>([]);
  const [estadoLealtad, setEstadoLealtad] = useState<Array<number>>([]);
  const [estadoSatisfacción, setEstadoSatisfacción] = useState<Array<number>>(
    []
  );

  const getEncuestas = async (nombre: string) => {
    const response = await buscarEncuestadosPorNombreRequest(nombre);
    setEncuestaState(response.data);
  };

  const getEncuesta = async (id: any) => {
    const response = await getSinglePlantillaRequest(id);
    setPlantilla(response.data);
  };

  useEffect(() => {
    getEncuesta(params.id);
  }, [params.id]);

  useEffect(() => {
    if (plantilla !== undefined) {
      getEncuestas(plantilla.nombre);
    }
  }, [plantilla]);

  useEffect(() => {
    if (encuestaState) {
      contadorEncuesta();
    }
    setLoading(false);
  }, [encuestaState]);

  const contarValoracionesIguales = (
    enunciado: string,
    valoracion: string,
    categoriaIndex: number,
    preguntaIndex: number,
    cantidadValoracionesIguales: Array<number>
  ) => {
    let contador = 0;

    encuestaState.forEach((encuesta) => {
      if (
        encuesta.categorias[categoriaIndex] &&
        encuesta.categorias[categoriaIndex].preguntas[preguntaIndex]
      ) {
        const pregunta =
          encuesta.categorias[categoriaIndex].preguntas[preguntaIndex];
        if (
          pregunta.enunciado === enunciado &&
          pregunta.valoracion === valoracion
        ) {
          contador++;
        }
      }
    });
    cantidadValoracionesIguales.push(contador);
  };

  const contadorEncuesta = async () => {
    if (plantilla !== undefined) {
      const newOpcionesFinal: Opcion[][] = [];
      const newDataFinal: number[][] = [];
      const satisfacionTemporal: number[][] = [];
      const newEnunciado: string[] = [];
      for (
        let categoriaIndex = 0;
        categoriaIndex < plantilla.categorias.length;
        categoriaIndex++
      ) {
        const categoria = plantilla.categorias[categoriaIndex];
        for (
          let preguntaIndex = 0;
          preguntaIndex < categoria.preguntas.length;
          preguntaIndex++
        ) {
          const pregunta = categoria.preguntas[preguntaIndex];
          const opciones = await getSingleOpcionesRequest(
            pregunta.tipoRespuesta
          );
          const cantidadValoracionesIguales: Array<number> = [];
          if (opciones.data.opciones) {
            newOpcionesFinal.push([...opciones.data.opciones]);
            newEnunciado.push(pregunta.enunciado);
            for (
              let opcionIndex = 0;
              opcionIndex < opciones.data.opciones.length;
              opcionIndex++
            ) {
              const opcion = opciones.data.opciones[opcionIndex];
              const opcionTyped = opcion as Opcion;
              contarValoracionesIguales(
                pregunta.enunciado,
                opcionTyped.valor,
                categoriaIndex,
                preguntaIndex,
                cantidadValoracionesIguales
              );
            }
          }
          if (categoria.nombre == "NPS") {
            // Sumar los primeros 7 valores
            const detractor = cantidadValoracionesIguales
              .slice(0, 7)
              .reduce((a, b) => a + b, 0);

            // Sumar los valores 8 y 9
            const neutro = cantidadValoracionesIguales
              .slice(7, 9)
              .reduce((a, b) => a + b, 0);

            // Sumar los valores 10 y 11
            const promotor = cantidadValoracionesIguales
              .slice(9)
              .reduce((a, b) => a + b, 0);

            // Sumar todos los valores del array
            const total = cantidadValoracionesIguales.reduce(
              (a, b) => a + b,
              0
            );
            // Restar el valor de promotor y detractor
            const factor = promotor - detractor;
            // Crear un nuevo arreglo con todas las variables
            const npsTemporal: Array<number> = [
              detractor,
              neutro,
              promotor,
              total,
              factor,
            ];
            setEstadoNps(npsTemporal);
          }
          if (categoria.nombre == "LEALTAD") {
            // Sumar los valores 4 y 5
            const factor = cantidadValoracionesIguales
              .slice(4)
              .reduce((a, b) => a + b, 0);

            // Sumar todos los valores del array
            const total = cantidadValoracionesIguales.reduce(
              (a, b) => a + b,
              0
            );
            const lealtadTemporal: Array<number> = [factor, total];
            setEstadoLealtad(lealtadTemporal);
          }
          if (categoria.nombre == "SATISFACCIÓN") {
            if (cantidadValoracionesIguales.length > 0) {
              satisfacionTemporal.push([...cantidadValoracionesIguales]);
            }
          }
          if (cantidadValoracionesIguales.length > 0) {
            newDataFinal.push([...cantidadValoracionesIguales]);
          }
        }
        if (
          satisfacionTemporal.length > 0 &&
          categoria.nombre == "SATISFACCIÓN"
        ) {
          const sumaPosiciones3y4 = satisfacionTemporal
            .slice(1)
            .reduce(
              (total, subarreglo) => total + subarreglo[3] + subarreglo[4],
              0
            );

          const sumaTotal = satisfacionTemporal
            .slice(1)
            .reduce(
              (total, subarreglo) =>
                total + subarreglo.reduce((a, b) => a + b, 0),
              0
            );

          const ISCreal = (sumaPosiciones3y4 / sumaTotal) * 100;

          const primerArreglo = satisfacionTemporal[0];

          const sumaPosiciones3y4General = primerArreglo[3] + primerArreglo[4];
          const sumaTotalGeneral = primerArreglo.reduce((a, b) => a + b, 0);

          const ISCpercibido =
            (sumaPosiciones3y4General / sumaTotalGeneral) * 100;

          setEstadoSatisfacción([ISCreal, ISCpercibido]);
        }
      }
      setOpcionesFinal(newOpcionesFinal);
      setDataFinal(newDataFinal);
      setEnunciado(newEnunciado);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {opcionesFinal.length > 0 &&
        dataFinal.length > 0 &&
        opcionesFinal.map((opciones, index) => (
          <Grafico
            key={index}
            enunciado={enunciado[index]}
            datos={dataFinal[index]}
            opciones={opciones.map((opcion: Opcion) => opcion.valor)}
          />
        ))}
      {estadoNps && (
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Typography variant="h6">Nps</Typography>
          <Typography variant="h6">
            Detractor: {(estadoNps[0] / estadoNps[3]) * 100}%
          </Typography>
          <Typography variant="h6">
            Neutro: {(estadoNps[1] / estadoNps[3]) * 100}%
          </Typography>
          <Typography variant="h6">
            Promotor: {(estadoNps[2] / estadoNps[3]) * 100}%
          </Typography>
          <Typography variant="h6">Total: {estadoNps[3]}</Typography>
          <Typography variant="h6">
            Factor: {(estadoNps[4] / estadoNps[3]) * 100}%
          </Typography>
        </Paper>
      )}
      {estadoLealtad && (
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Typography variant="h6">Lealtad</Typography>
          <Typography variant="h6">
            Factor: {(estadoLealtad[0] / estadoLealtad[1]) * 100}%
          </Typography>
        </Paper>
      )}
      {estadoSatisfacción && (
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Typography variant="h6">Satisfacción</Typography>
          <Typography variant="h6">
            ISCreal: {estadoSatisfacción[0]}%
          </Typography>
          <Typography variant="h6">
            ISCpercibido: {estadoSatisfacción[1]}%
          </Typography>
        </Paper>
      )}
    </div>
  );
};

export default Page;
