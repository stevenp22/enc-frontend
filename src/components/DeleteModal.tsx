import {
  Modal,
  Fade,
  Button,
  Paper,
  Container,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { alpha } from "@mui/material/styles";

const DeleteModal = ({ open, handleChange, onDelete }: any) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleClick = () => {
    enqueueSnackbar("Eliminado exitosamente");
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={open}>
          <Paper
            sx={{
              backgroundColor: (theme) =>
                alpha(theme.palette.background.paper, 0.1),
              borderRadius: "10px",
              boxShadow: 5,
              padding: [2, 4, 3],
            }}
          >
            <Container
              sx={{
                width: "290px",
                height: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <h4 style={{ textAlign: "center" }}>¿Confirmar borrar?</h4>
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => onDelete()}
                  sx={{
                    margin: "30px",
                  }}
                >
                  Sí
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleChange()}
                  sx={{
                    margin: "30px",
                  }}
                >
                  No
                </Button>
              </div>
            </Container>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};
export default DeleteModal;
