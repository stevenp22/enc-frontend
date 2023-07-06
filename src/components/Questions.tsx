import {
  TextField,
  MenuItem,
  Select,
  Paper,
  Grid,
  FormControl,
  Checkbox,
  FormControlLabel,
  Stack,
} from "@mui/material";

const Questions = ({ enunciado, tipoRespuesta, onChange }: any) => {
  return (
    <Paper elevation={4} style={{ padding: "30px 20px", borderRadius: "12px" }}>
      <Grid item>
        <FormControl fullWidth>
          <TextField
            multiline
            name="enunciado"
            value={enunciado}
            onChange={onChange}
            placeholder="Enunciado"
          />
        </FormControl>
      </Grid>
      <Grid item xs={11} sm={11}>
        <Stack spacing={2} direction="row">
          <Select
            placeholder="tipoRespuesta"
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="tipoRespuesta"
            onChange={onChange}
            name="tipoRespuesta"
            value={tipoRespuesta}
            style={{ width: '180px' }}
          >
            <MenuItem value={5}>5 opciones</MenuItem>
            <MenuItem value={8}>8 opciones</MenuItem>
            <MenuItem value={10}>10 opciones</MenuItem>
          </Select>
          <FormControlLabel
            name="comentario"
            onChange={onChange}
            control={<Checkbox />}
            label="Comentario"
          />
        </Stack>
      </Grid>
    </Paper>
  );
};

export default Questions;
