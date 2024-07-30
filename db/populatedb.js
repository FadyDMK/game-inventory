const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS developers (
    developer_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS games (
    game_id SERIAL PRIMARY KEY,
    developer_id INTEGER NOT NULL,
    FOREIGN KEY (developer_id) REFERENCES developers(developer_id),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    imageURL TEXT DEFAULT 'https://via.placeholder.com/150'
);

CREATE TABLE IF NOT EXISTS games_categories (
    game_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY (game_id) REFERENCES games(game_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    PRIMARY KEY (game_id, category_id)
);



INSERT INTO categories (name) VALUES ('Action');
INSERT INTO categories (name) VALUES ('Adventure');

INSERT INTO developers (name) VALUES ('Ubisoft');
INSERT INTO developers (name) VALUES ('Rockstar Games');

INSERT INTO games (name, description, developer_id,imageURL) VALUES ('Assassin''s Creed', 'Assassin''s Creed is an action-adventure video game developed by Ubisoft Montreal and published by Ubisoft.', 1, 'https://www.giantbomb.com/a/uploads/scale_small/8/82063/2843355-ac.jpg');
INSERT INTO games (name, description, developer_id,imageURL) VALUES ('Grand Theft Auto V', 'Grand Theft Auto V is a 2013 action-adventure game developed by Rockstar North and published by Rockstar Games.', 2, 'https://www.giantbomb.com/a/uploads/scale_small/20/201266/3532840-6042895878-co2lb.png');

INSERT INTO games_categories (game_id, category_id) VALUES (1, 1);
INSERT INTO games_categories (game_id, category_id) VALUES (1, 2);
INSERT INTO games_categories (game_id, category_id) VALUES (2, 1);


`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.ROLE}:${process.env.ROLE_PWD}@${process.env.HOST}/${process.env.DB_NAME}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done seeding");
}

main();
