const express = require('express');
const router = express.Router();
const playerController = require('../../controllers/playerController');
const gameController = require('../../controllers/gameController');

router
    .post('/jugadors', playerController.createNewPlayer)
    .post('/partides', gameController.createNewGame)

    .get('/jugadors', playerController.getAllPlayers)
    .get('/partides', gameController.getAllGames)

    .get('/jugadors/:id', playerController.getOnePlayer)
    .get('/partides/:id', gameController.getOneGame)
    
    .patch('/jugadors/:id', playerController.updatePlayer)
    .patch('/partides/:id', gameController.updateGame)
    
    .delete('/jugadors/:id', playerController.deletePlayer)
    .delete('/partides/:id', gameController.deleteGame)

    .get('/jugadors/:id/partides', playerController.getPlayerGames)
    
module.exports = router;