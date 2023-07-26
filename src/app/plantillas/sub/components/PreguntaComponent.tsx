import { Pregunta } from "../interfaces";

interface PreguntaComponentProps {
  pregunta: Pregunta;
  isChecked: boolean;
  onCheckChange: () => void;
}

const PreguntaComponent: React.FC<PreguntaComponentProps> = ({
  pregunta,
  isChecked,
  onCheckChange,
}) => {
  return (
    <div>
      <label>
        <input type="checkbox" checked={isChecked} onChange={onCheckChange} />
        {pregunta.enunciado}
      </label>
    </div>
  );
};

export { PreguntaComponent };
