const { Router } = require("express");
// variable de Actor
const {
  getAllActor,
  getActor,
  addActor,
  deleteActor,
  updateActor,
} = require("../controllers/actor.controllets");

// Variable de peliculas
const {
  getAllmovi,
  getMovi,
  addMovi,
  deleteMovi,
  updateMovi,
} = require("../controllers/tasks.controllets");

const router = Router();

router.get("/movie", getAllmovi);

router.get("/movie/:id", getMovi);

router.post("/movie", addMovi);

router.delete("/movie/:id", deleteMovi);

router.put("/movie/:id", updateMovi);

//Rutas De Actores

router.get("/actor", getAllActor);

router.get("/actor/:id", getActor);

router.post("/actor", addActor);

router.delete("/actor/:id", deleteActor);

router.put("/actor/:id", updateActor);

module.exports = router;
