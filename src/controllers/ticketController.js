const ticketService = require("../services/ticketService");

const createNewTicket = async (req, res) => {
    try {
      const { vol, seientAssignat, id, dniTitular, nomCompletTitular, classe } = req.body;
      const ticket = await ticketService.createNewTicket(vol, seientAssignat, id, dniTitular, nomCompletTitular, classe);
      res.json(ticket);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const getOneTicket = async (req, res) => {
    try {
      const id = req.params.id;
      const ticket = await ticketService.getOneTicket(id);
      res.json(ticket);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const updateTicket = async (req, res) => {
    const { id } = req.params;
    const { seientAssignat, dniTitular, nomCompletTitular, classe } = req.body;
  
    try {
      const updatedTicket = await ticketService.updateTicket(id, { seientAssignat, dniTitular, nomCompletTitular, classe });
      res.json(updatedTicket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

const deleteTicket = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedTicket = await ticketService.deleteTicket(id);
      res.json(deletedTicket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

module.exports = {
  createNewTicket,
  getOneTicket,
  updateTicket,
  deleteTicket
}