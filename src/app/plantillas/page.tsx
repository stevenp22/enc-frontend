"use client";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  ToggleButton,
  Tooltip,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import PropTypes, { element } from "prop-types";
import { useTheme } from "@mui/material/styles";
import Crear from "./crear";
import { useEffect, useState } from "react";
//import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import {
  getPlantillasRequest,
  deletePlantillaRequest,
} from "@/api/PlantillasApi";
import DeleteModal from "@/components/DeleteModal";
import SearchBox from "@/components/SearchBox";
import Link from "next/link";
import { Add, Edit } from "@mui/icons-material";

function TablePaginationActions(props: any) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const Plantillas = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRow, setSelectedRow] = useState({
    id: "",
  });
  const [open, setOpen] = useState(false);
  //const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getPlantillas = async () => {
    const response = await getPlantillasRequest();
    setData(response.data);
  };

  useEffect(() => {
    setLoading(false);
    getPlantillas();
  }, []);

  const handleModal = () => {
    setOpen(!open);
  };

  const updateValue = (text: any) => {
    setValue(text);
  };

  const onDelete = async () => {
    try {
      await deletePlantillaRequest(selectedRow.id);
      setOpen(false);
      getPlantillas();
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DeleteModal
              open={open}
              handleChange={handleModal}
              onDelete={onDelete}
            />
            <Paper elevation={3}>
              <Grid
                container
                justifyContent="flex-end"
                alignItems="center"
                p={3}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "2px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <SearchBox value={value} updateValue={updateValue} />
                  <MuiLink component={Link} href="/plantillas/crear">
                    <Tooltip title="Añadir">
                      <Button sx={{ cursor: "pointer" }}>
                        <Add sx={{ color: "#15cb68", fontSize: "30px" }} />
                      </Button>
                    </Tooltip>
                  </MuiLink>
                </Box>
              </Grid>
              <TableContainer component={Paper}>
                <Divider sx={{ borderBottomWidth: 3 }} />
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        <Typography sx={{ fontSize: "20px" }}>nombre</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography sx={{ fontSize: "20px" }}>
                          empresa
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography sx={{ fontSize: "20px" }}>
                          Acciones
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? filteredData.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : filteredData
                    ).map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center" component="th" scope="row">
                          {row.nombre}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {row.empresa}
                        </TableCell>
                          <TableCell sx={{ width: "170px" }} align="center">
                            <Tooltip title="Editar">
                              <MuiLink>
                                <Button
                                  onClick={() =>
                                    router.push({
                                      pathname: `plantilla/${row.id}/editar`,
                                    })
                                  }
                                >
                                  <Edit sx={{ color: "#ffc327" }} />
                                </Button>
                              </MuiLink>
                            </Tooltip>
                          </TableCell>
                      </TableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "Todo", value: -1 },
                        ]}
                        colSpan={5}
                        count={filteredData.length}
                        rowsPerPage={rowsPerPage}
                        labelRowsPerPage={"Filas por página"}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            "aria-label": "rows per page",
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Plantillas;
