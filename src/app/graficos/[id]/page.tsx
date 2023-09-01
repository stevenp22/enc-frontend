"use client";
import React, { useEffect, useState } from "react";
import { buscarEncuestadosPorNombreRequest } from "@/api/EncuestadoApi";
import { Encuesta, Plantilla, Opcion } from "../interfaces";
import { getSinglePlantillaRequest } from "@/api/PlantillasApi";
import { useParams } from "next/navigation";
import { getSingleOpcionesRequest } from "@/api/OpcionesApi";
import { Grafico } from "../Grafico";

const Page: React.FC = () => {
  const [encuestaState, setEncuestaState] = useState<Array<Encuesta>>([]);
  const [plantilla, setPlantilla] = useState<Plantilla | undefined>();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [dataFinal, setDataFinal] = useState<number[][]>([]);
  const [opcionesFinal, setOpcionesFinal] = useState<Opcion[][]>([]);
  const [enunciado, setEnunciado] = useState<string[]>([]);

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
    if (plantilla !== undefined) {getEncuestas(plantilla.nombre)};
  }, [plantilla]);

  useEffect(() => {
    if (encuestaState) {contadorEncuesta()};
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
          if (cantidadValoracionesIguales.length > 0) {
            newDataFinal.push([...cantidadValoracionesIguales]);
          }
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
    </div>
  );
};

export default Page;
