const gameService = require("../services/gameService");

const createNewGame = async (req, res) => {
    try {
      const { id, white_player, black_player, winner, date } = req.body;
      const game = await gameService.createNewGame(id, white_player, black_player, winner, date);
      res.json(game);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const getOneGame = async (req, res) => {
    try {
      const id = req.params.id;
      const game = await gameService.getOneGame(id);
      res.json(game);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const getAllGames = async (req, res) => {
    try {
      const games = await gameService.getAllGames();
      res.json(games);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const updateGame = async (req, res) => {
    const { id } = req.params;
    const { white_player, black_player, winner, date } = req.body;
  
    try {
      const updatedGame = await gameService.updateGame(id, { white_player, black_player, winner, date });
      res.json(updatedGame);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

const deleteGame = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedGame = await gameService.deleteGame(id);
      res.json(deletedGame);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };   

module.exports = {
  createNewGame,
  getAllGames,
  getOneGame,
  updateGame,
  deleteGame
}