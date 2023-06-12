const express = require('express');
const router = express.Router();
const flyController = require('../../controllers/flyController');
const ticketController = require('../../controllers/ticketController');

router
    .post('/vols', flyController.createNewFly)
    .post('/bitllet', ticketController.createNewTicket)
    


    .get('/vols', flyController.getAllFlys)
    .get('/bitllet/:id', ticketController.getOneTicket)
    
    .patch('/bitllet/:id', ticketController.updateTicket)
    
    .delete('/bitllet/:id', ticketController.deleteTicket)
    .delete('/vols/:id', flyController.deleteFly)

    .get('/vols/:id/bitllet', flyController.getFlyTickets)
    
module.exports = router;