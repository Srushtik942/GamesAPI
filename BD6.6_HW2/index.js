const express = require('express');
const cors = require('cors');
const { getAllGames, getGameById } = require('./controllers');
const app = express();
app.use(express.json());
app.use(cors());

// Retrieve All Games
app.get('/games', async (req, res) => {
  let games = await getAllGames();
  res.json( {games} );
});

// Retrieve Game by ID
app.get('/games/details/1', async (req, res) => {
  let result = await getGameById( req.params.id);
  res.json({ result });
});

module.exports = {
  app,
};
