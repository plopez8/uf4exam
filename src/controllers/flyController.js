const flyService = require("../services/flyService");

const createNewFly = async (req, res) => {
    try {
      const { id, origen, desti, dataEnlairament, modelAvio, duradaTrajecte } = req.body;
      const fly = await flyService.createNewFly(id, origen, desti, dataEnlairament, modelAvio, duradaTrajecte);
      res.json(fly);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


const getAllFlys = async (req, res) => {
    try {
      const flys = await flyService.getAllFlys();
      res.json(flys);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  const getFlyTickets = async (req, res) => {
    const mode = req.query;
    try {
      const id = req.params.id;
      if(mode.classe){
        const tickets = await flyService.getFlyTicketClass(mode,id);
        res.json(tickets);
      }else if (mode.data){
        const tickets = await flyService.getFlyTicketsByData(mode, id);
        res.json(tickets);
      }else if (mode.data && mode.posicio){
        const games = await flyService.getPlayerTicketsByClassData(mode, id);
        res.json(games);
      }else{
        const tickets = await flyService.getFlyTickets(id);
        res.json(tickets);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  const deleteFly = async (req, res) => {
    const id = req.params.id;
    const tickets = await flyService.getFlyTickets(id);
    const resultat = tickets;
    res.json(tickets);
    try{
      if(resultat.length == 0){
        try {
          const deletedFly = await flyService.deleteFly(id);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
    }catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


module.exports = {
  createNewFly,
  getAllFlys,
  getFlyTickets,
  deleteFly
}