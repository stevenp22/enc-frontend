"use client";
import React, { useState } from "react";
import Categoria, { CategoriaData } from "@/components/Categoria";

const Crear: React.FC = () => {
  const [formulario, setFormulario] = useState({
    nombre: "",
    empresa: "",
    tipo: "",
    categorias: [] as CategoriaData[],
  });

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

  const guardarFormulario = () => {
    // Aquí puedes hacer lo que necesites con los datos guardados
    // Por ejemplo, enviarlos a un servidor o realizar alguna acción con ellos
    console.log(formulario);
  };

  return (
    <div>
      <h1>Formulario</h1>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={formulario.nombre}
          onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
        />
      </div>
      <div>
        <label>Empresa:</label>
        <input
          type="text"
          value={formulario.empresa}
          onChange={(e) => setFormulario({ ...formulario, empresa: e.target.value })}
        />
      </div>
      <div>
        <label>Tipo:</label>
        <input
          type="text"
          value={formulario.tipo}
          onChange={(e) => setFormulario({ ...formulario, tipo: e.target.value })}
        />
      </div>
      {formulario.categorias.map((categoria, index) => (
        <Categoria
          key={index}
          categoria={categoria}
          onChange={(nuevaCategoria) => {
            const nuevasCategorias = [...formulario.categorias];
            nuevasCategorias[index] = nuevaCategoria;
            setFormulario({ ...formulario, categorias: nuevasCategorias });
          }}
        />
      ))}
      <button onClick={agregarCategoria}>Agregar Categoría</button>
      <button onClick={eliminarUltimaCategoria}>Eliminar Última Categoría</button>
      <button onClick={guardarFormulario}>Guardar</button>
    </div>
  );
};

export default Crear;