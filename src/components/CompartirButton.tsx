import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function CompartirButton() {
  const copiarAlPortapapeles = () => {
    // Obtener la URL actual
    const urlActual = window.location.href;

    // Crear un elemento de entrada de texto temporal
    const input = document.createElement('input');
    input.value = urlActual;

    // Agregar el elemento al DOM (fuera de la vista)
    document.body.appendChild(input);

    // Seleccionar el texto del elemento
    input.select();
    input.setSelectionRange(0, 99999); // Para dispositivos móviles

    // Copiar el texto al portapapeles
    document.execCommand('copy');

    // Eliminar el elemento de entrada de texto temporal
    document.body.removeChild(input);

    // Opcional: mostrar una notificación o mensaje de éxito
    alert('URL copiada al portapapeles: ' + urlActual);
  };

  return (
    <Box display="flex" justifyContent="flex-end">
      <Button variant="contained" color="success" onClick={copiarAlPortapapeles}>
        Compartir
      </Button>
    </Box>
  );
}
