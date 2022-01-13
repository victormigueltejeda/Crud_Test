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

export default function ActorForms() {
  const [actor, Setmovie] = React.useState({
    nombre_completo: "",
    sexo: "",
  });
  const [loading, Setloading] = React.useState(false);
  const [editing, setEditing] = React.useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    Setloading(true);

    if (editing) {
      await fetch(`http://localhost:4000/actor/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(actor),
      });
    } else {
      await fetch("http://localhost:4000/actor", {
        method: "POST",
        body: JSON.stringify(actor),
        headers: { "Content-Type": "application/json" },
      });
    }

    Setloading(false);
    navigate("/actor");
  };

  const handlerChage = (e) => {
    Setmovie({ ...actor, [e.target.name]: e.target.value });
  };

  const loadMovie = async (id) => {
    const res = await fetch(`http://localhost:4000/actor/${id}`);
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
            {editing ? "Update" : "Agregar Actores"}
          </Typography>
          <CardContent>
            <form onSubmit={handlerSubmit}>
              <TextField
                name="nombre_completo"
                value={actor.nombre_completo}
                onChange={handlerChage}
                variant="filled"
                placeholder="Escribe El Nombre Completo"
                label="Escribe El Nombre Completo"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
              />
              <TextField
                name="sexo"
                value={actor.sexo}
                onChange={handlerChage}
                variant="filled"
                placeholder="Escribel El Sexo"
                label="Escribe El Sexo"
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
                disabled={!actor.nombre_completo || !actor.sexo}
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
