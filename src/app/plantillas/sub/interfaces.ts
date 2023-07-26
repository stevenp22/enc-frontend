export interface Pregunta {
  enunciado: string;
  tipoRespuesta: string;
  enunciadoComentario: string;
  comentario: string;
}

export interface Categoria {
  nombre: string;
  preguntas: Pregunta[];
}

export interface Plantilla {
  nombre: string;
  empresa: string;
  tipo: string;
  categorias: Categoria[];
}