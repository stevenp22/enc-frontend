import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

interface GraficoProps {
  datos: number[];
  opciones: string[];
  enunciado: string;
}

const Grafico: React.FC<GraficoProps> = ({ datos, opciones, enunciado }) => {
  const data = opciones.map((opcion, index) => ({
    opcion,
    personas: datos[index],
  }));

  return (
    <Container>
      <Typography variant="body1" color="textPrimary">
        {enunciado}
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="opcion" />
          <YAxis ticks={[]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="personas" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};

export { Grafico };
