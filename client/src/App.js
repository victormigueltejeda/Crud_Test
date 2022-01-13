import { BrowserRouter, Route, Routes } from "react-router-dom";
import MoviForms from "./components/MoviForms";
import MoviList from "./components/MoviList";
import ActorForms from "./components/ActorForms";
import ActorList from "./components/ActorList";
import Menu from "./components/Navbar";
import { Container } from "@mui/material";

export default function app() {
  return (
    <BrowserRouter>
      <Menu />
      <Container>
        <Routes>
          <Route path="/" element={<MoviList />} />
          <Route path="/movie/new" element={<MoviForms />} />
          <Route path="/movie/:id/edit" element={<MoviForms />} />
          // Rutas de Actores
          <Route path="/actor" element={<ActorList />} />
          <Route path="/actor/new" element={<ActorForms />} />
          <Route path="/actor/:id/edit" element={<ActorForms />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
