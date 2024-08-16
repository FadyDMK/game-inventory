const pool = require("./pool");

async function getNumberGames() {
  const result = await pool.query("SELECT COUNT(*) FROM games");
  return result;
}

async function getNumberDevs() {
  const result = await pool.query("SELECT COUNT(*) FROM developers");
  return result;
}

async function getNumberGenres() {
  const result = await pool.query("SELECT COUNT(*) FROM categories");
  return result;
}

async function getGames() {
  const { rows } = await pool.query(
    "SELECT g.name,g.description,g.imageurl,d.name AS developer, g.game_id AS id FROM games AS g JOIN developers AS d ON g.developer_id = d.developer_id"
  );
  return rows;
}
async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getDevelopers() {
  const { rows } = await pool.query("SELECT * FROM developers");
  return rows;
}

async function searchGame(search) {
  const { rows } = await pool.query(
    `SELECT g.name,g.description,g.imageurl,d.name AS developer FROM games AS g JOIN developers AS d ON g.developer_id = d.developer_id WHERE UPPER(g.name) LIKE UPPER('%${search}%')`
  );
  return rows;
}

async function getGenres() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}
async function getGenresNames() {
  const { rows } = await pool.query("SELECT name FROM categories");
  return rows.map((row) => row.name);
}

async function addGenre(name) {
  await pool.query(`INSERT INTO categories (name) VALUES ($1)`, [name]);
}

async function getDevId(name) {
  const { rows } = await pool.query(
    `SELECT developer_id FROM developers WHERE name LIKE $1`,
    [name]
  );
  return rows[0].developer_id;
}

async function getCatId(names) {
  // var result = [];
  // names.forEach(async (name) => {
  //   let { rows } = await pool.query(
  //     `SELECT category_id FROM categories WHERE name LIKE $1`,[name]
  //   );
  //   result= [...result, rows[0].category_id];
  //   console.log(result);
  // });

  const result = await Promise.all(
    names.map(async (name) => {
      const { rows } = await pool.query(
        `SELECT category_id FROM categories WHERE name LIKE $1`,
        [name]
      );
      return rows[0].category_id;
    })
  );
  return result;
}

async function addGame(game) {
  const { rows } = await pool.query(
    `INSERT INTO games (name, description, developer_id, imageurl) VALUES ($1, $2, $3, $4) RETURNING game_id`,
    [game.name, game.description, game.developer, game.image]
  );
  const gameId = rows[0].game_id;
  await Promise.all(
    game.genres.map(async (genre) => {
      await pool.query(
        `INSERT INTO games_categories (game_id, category_id) VALUES ($1, $2)`,
        [gameId, genre]
      );
    })
  );
}

async function addDeveloper(name) {
  await pool.query(`INSERT INTO developers (name) VALUES ($1)`, [name]);
}

async function getGamesByCategory(id) {
  const { rows } = await pool.query(
    `SELECT g.name,g.description,g.imageurl,d.name AS developer ,g.game_id AS id FROM games AS g JOIN developers AS d ON g.developer_id = d.developer_id JOIN games_categories AS gc ON g.game_id = gc.game_id WHERE gc.category_id = $1`,
    [id]
  );
  return rows;
}
async function getGamesByDeveloper(id) {
  const { rows } = await pool.query(
    `SELECT g.name,g.description,g.imageurl,d.name AS developer, g.game_id AS id FROM games AS g JOIN developers AS d ON g.developer_id = d.developer_id WHERE d.developer_id = $1`,
    [id]
  );
  return rows;
}

async function getSomeGames() {
  const { rows } = await pool.query(
    "SELECT g.name,g.description,g.imageurl,d.name AS developer, g.game_id AS id FROM games AS g JOIN developers AS d ON g.developer_id = d.developer_id"
  );
  return rows.slice(0, 5);
}

async function getGameById(id) {
  const { rows } = await pool.query(
    `SELECT g.name AS name,g.game_id AS id,g.description,g.imageurl AS imageurl,d.name AS developer FROM games AS g JOIN developers AS d ON g.developer_id = d.developer_id WHERE g.game_id = $1`,
    [id]
  );
  return rows[0];
}

async function getGenresByGameId(id) {
  const { rows } = await pool.query(
    `SELECT c.name FROM categories AS c JOIN games_categories AS gc ON c.category_id = gc.category_id WHERE gc.game_id = $1`,
    [id]
  );
  return rows;
}
module.exports = {
  getNumberGames,
  getNumberDevs,
  getNumberGenres,
  getGames,
  getCategories,
  getDevelopers,
  searchGame,
  getGenres,
  getDevId,
  getCatId,
  addGame,
  getGenresNames,
  addGenre,
  addDeveloper,
  getGamesByCategory,
  getGamesByDeveloper,
  getSomeGames,
  getGameById,
  getGenresByGameId,
};
