const playerService = require("../services/playerService");

const createNewPlayer = async (req, res) => {
    try {
      const { id, username, fullname } = req.body;
      const player = await playerService.createNewPlayer(id, username, fullname);
      res.json(player);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const getOnePlayer = async (req, res) => {
    try {
      const id = req.params.id;
      const player = await playerService.getOnePlayer(id);
      res.json(player);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const getAllPlayers = async (req, res) => {
    try {
      const players = await playerService.getAllPlayers();
      res.json(players);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const updatePlayer = async (req, res) => {
    const { id } = req.params;
    const {username, fullname } = req.body;
  
    try {
      const updatedPlayer = await playerService.updatePlayer(id, { username, fullname });
      res.json(updatedPlayer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

const deletePlayer = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedPlayer = await playerService.deletePlayer(id);
      res.json(deletedPlayer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };   

  const getPlayerGames = async (req, res) => {
    console.log(req);
    const mode = req.query;
    try {
      const id = req.params.id;
      console.log("hola");
      console.log(id);
      console.log("mode:");
      console.log(mode);
      if(mode.posicio){
        const games = await playerService.getPlayerGamesByColor(mode,id);
        res.json(games);
      }else if (mode.data){
        const games = await playerService.getPlayerGamesByData(mode, id);
        res.json(games);
      }else if (mode.data && mode.posicio){
        const games = await playerService.getPlayerGamesByColorData(mode, id);
        res.json(games);
      }else{
        const games = await playerService.getPlayerGames(id);
        res.json(games);
      }
    } catch (error) {
      console.log("error");
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
  createNewPlayer,
  getAllPlayers,
  getOnePlayer,
  updatePlayer,
  deletePlayer,
  getPlayerGames,
}