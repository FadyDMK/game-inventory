const pool = require("./pool");

async function getNumberGames() {
  const result = await pool.query("SELECT COUNT(*) FROM games");
  return result
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
    const {rows} = await pool.query("SELECT g.name,g.description,g.imageurl,d.name AS developer FROM games AS g JOIN developers AS d ON g.developer_id = d.developer_id");
    return rows;
}

module.exports = {
    getNumberGames,
    getNumberDevs,
    getNumberGenres,
    getGames,

    
};
