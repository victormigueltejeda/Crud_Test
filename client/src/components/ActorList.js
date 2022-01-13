import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ActorList() {
  const [movie, Setmovie] = useState([]);

  const navigate = useNavigate();
  const loadMovie = async () => {
    const response = await fetch("http://localhost:4000/actor");
    const data = await response.json();
    Setmovie(data);
  };

  const handledelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/actor/${id}`, {
        method: "DELETE",
      });
      Setmovie(movie.filter((movi) => movi.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadMovie();
  }, []);
  return (
    <>
      <h1>Lista de Actores</h1>
      {movie.map((movie) => (
        <Card
          style={{
            marginBottom: ".7rem",
            backgroundColor: "white",
          }}
          key={movie.id}
        >
          <CardContent
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <Typography>{movie.nombre_completo}</Typography>
              <Typography>{movie.sexo}</Typography>
            </div>
            <div>
              <Button
                variant="contained"
                onClick={() => navigate(`/movie/${movie.id}/edit`)}
              >
                Editar
              </Button>
              <Button
                style={{ marginLeft: ".5rem" }}
                variant="contained"
                color="warning"
                onClick={() => handledelete(movie.id)}
              >
                Eliminar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
