const pool = require("../db");

const getAllmovi = async (req, res, next) => {
  try {
    const allmovie = await pool.query("SELECT * FROM peliculas");
    res.json(allmovie.rows);
  } catch (error) {
    next(error);
  }
};

const getMovi = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM peliculas WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Pelicula No Encontrada",
      });

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const addMovi = async (req, res, next) => {
  const { title, genero } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO peliculas(title,genero) VALUES ($1,$2) RETURNING *",
      [title, genero]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteMovi = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM peliculas WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Pelicula No Encontrada",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const updateMovi = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, genero } = req.body;

    const result = await pool.query(
      "UPDATE peliculas SET title= $1, genero= $2 WHERE id= $3 RETURNING *",
      [title, genero, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Pelicula No Encontrada",
      });
    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllmovi,
  getMovi,
  addMovi,
  deleteMovi,
  updateMovi,
};
