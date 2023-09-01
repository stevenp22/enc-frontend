export interface Pregunta {
  enunciado: string;
  tipoRespuesta: string;
  valoracion: string;
  comentario: string;
  enunciadoComentario: string;
  textoComentario: string;
}

export interface Categoria {
  nombre: string;
  preguntas: Pregunta[];
}

export interface Encuesta {
  _id: string;
  nombre: string;
  empresa: string;
  nombreEncuestado: string;
  cargo: string;
  razonSocial: string;
  ciudad: string;
  createdAt: string;
  updatedAt: string;
  categorias: Categoria[];
}

export interface PreguntaPlantilla {
  enunciado: string;
  tipoRespuesta: string;
  valoracion: string;
  comentario: string;
  enunciadoComentario: string;
  textoComentario: string;
}

export interface CategoriaPlantilla {
  nombre: string;
  preguntas: PreguntaPlantilla[];
}

export interface Plantilla {
  nombre: string;
  empresa: string;
  tipo: string;
  categorias: CategoriaPlantilla[];
}

export interface Opcion {
  valor: string;
}