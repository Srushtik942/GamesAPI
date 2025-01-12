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
app.get('/games/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await getGameById(id);
  res.json({ result });
});

module.exports = {
  app,
};
