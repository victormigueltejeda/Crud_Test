import React, { useEffect } from "react";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  TextField,
  Button,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

export default function MoviForms() {
  const [movie, Setmovie] = React.useState({
    title: "",
    genero: "",
  });
  const [loading, Setloading] = React.useState(false);
  const [editing, setEditing] = React.useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    Setloading(true);

    if (editing) {
      await fetch(`http://localhost:4000/movie/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie),
      });
    } else {
      await fetch("http://localhost:4000/movie", {
        method: "POST",
        body: JSON.stringify(movie),
        headers: { "Content-Type": "application/json" },
      });
    }

    Setloading(false);
    navigate("/");
  };

  const handlerChage = (e) => {
    Setmovie({ ...movie, [e.target.name]: e.target.value });
  };

  const loadMovie = async (id) => {
    const res = await fetch(`http://localhost:4000/movie/${id}`);
    const data = await res.json();
    Setmovie({ title: data.title, genero: data.genero });
    setEditing(true);
  };

  useEffect(() => {
    if (params.id) {
      loadMovie(params.id);
    }
  }, [params.id]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={6}>
        <Card sx={{ mt: 5 }}>
          <Typography variant="5" textAlign="center">
            {editing ? "Update" : "Agregar pelicula"}
          </Typography>
          <CardContent>
            <form onSubmit={handlerSubmit}>
              <TextField
                name="title"
                value={movie.title}
                onChange={handlerChage}
                variant="filled"
                placeholder="Titulo"
                label="Escribe el Titulo"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
              />
              <TextField
                name="genero"
                value={movie.genero}
                onChange={handlerChage}
                variant="filled"
                placeholder="Categoria"
                label="Escribe la categoria"
                rows={4}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!movie.title || !movie.genero}
              >
                {loading ? "cargado.." : "Crear"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
