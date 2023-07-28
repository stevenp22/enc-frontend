import { Pregunta } from "../interfaces";
import { Checkbox, FormControlLabel } from "@mui/material";

interface PreguntaComponentProps {
  pregunta: Pregunta;
  isChecked: boolean;
  onCheckChange: () => void;
}

const PreguntaComponent: React.FC<PreguntaComponentProps> = ({ pregunta, isChecked, onCheckChange }) => {
  return (
    <div>
      <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={onCheckChange} />}
        label={pregunta.enunciado}
      />
    </div>
  );
};

export { PreguntaComponent };