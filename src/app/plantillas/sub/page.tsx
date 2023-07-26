"use client"
import { useEffect, useState } from "react";
import { Plantilla, Categoria, Pregunta } from "./interfaces";
import { CategoriaComponent } from "./components/CategoriaComponent";
import { getSinglePlantillaRequest } from "@/api/PlantillasApi";

const PlantillaPage: React.FC = () => {
  const [plantilla, setPlantilla] = useState<Plantilla | null>(null);
  const [preguntasSeleccionadas, setPreguntasSeleccionadas] = useState<Pregunta[]>([]);

  useEffect(() => {
    // Aquí debes realizar la llamada a la API para obtener la plantilla.
    // Supongamos que la API devuelve un objeto con la estructura de la interfaz Plantilla.

    // Ejemplo de cómo recibir la respuesta de la API (debes ajustar esto según tu API):
    const obtenerPlantillaDesdeAPI = async () => {
      try {
        const response = await getSinglePlantillaRequest("64c19e440c13a1399befdaf3");
        setPlantilla(response.data);
      } catch (error) {
        console.error("Error al obtener la plantilla desde la API:", error);
      }
    };

    obtenerPlantillaDesdeAPI();
  }, []);

  const handleGuardar = () => {
    const categoriasSeleccionadas: Categoria[] = [];

    for (const categoria of plantilla?.categorias || []) {
      const preguntasCategoriaSeleccionadas = preguntasSeleccionadas.filter((pregunta) =>
        categoria.preguntas.includes(pregunta)
      );
      if (preguntasCategoriaSeleccionadas.length > 0) {
        categoriasSeleccionadas.push({
          nombre: categoria.nombre,
          preguntas: preguntasCategoriaSeleccionadas,
        });
      }
    }

    const subPlantilla = {
      nombre: plantilla?.nombre || "",
      empresa: plantilla?.empresa || "",
      tipo: "Subplantilla",
      categoriasSeleccionadas,
    };

    // Aquí puedes hacer algo con la subPlantilla, como guardarla en el backend.
    console.log(subPlantilla);
  };

  if (!plantilla) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{plantilla.nombre}</h1>
      <h2>{plantilla.empresa}</h2>
      <h3>{plantilla.tipo}</h3>
      {plantilla.categorias.map((categoria, index) => (
        <CategoriaComponent
          key={index}
          categoria={categoria}
          preguntasSeleccionadas={preguntasSeleccionadas}
          setPreguntasSeleccionadas={setPreguntasSeleccionadas}
        />
      ))}
      <button onClick={handleGuardar}>Guardar</button>
    </div>
  );
};

export default PlantillaPage;
