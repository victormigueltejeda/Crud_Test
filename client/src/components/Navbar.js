import React from "react";
import {
  Box,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { fontFamily } from "@mui/system";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }}>
              <Link
                style={{ textDecoration: "none", fontSize: 24, color: "white" }}
                to="/"
              >
                Crud Prueba
              </Link>
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/movie/new")}
              style={{
                marginRight: ".8rem",
              }}
            >
              Crear pelicula
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/actor/new")}
            >
              Crear Actor
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
