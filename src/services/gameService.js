const db = require("../database/rec-api")

const createNewGame = async (id, white_player, black_player, winner, date) => {
    const query = `
      INSERT INTO Game (id, white_player, black_player, winner, date, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `;
    return new Promise((resolve, reject) => {
      db.run(query, [id, white_player, black_player, winner, date], function(err) {
        if (err) {
          reject(new Error(`Could not create game: ${err.message}`));
        } else {
          resolve({
            id,
            white_player,
            black_player,
            winner,
            date,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      });
    });
  };

const getAllGames = () => {
    return new Promise((resolve, reject) => { 
      db.all('SELECT * FROM Game;', [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };

const getOneGame = (id) => {
  return new Promise((resolve, reject) => { 
    db.get('SELECT * FROM Game WHERE ID = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const updateGame = async (id, gameData) => {
    const { white_player, black_player, winner, date } = gameData;
    const updatedGame = await db.run(
      `UPDATE Game SET white_player = ?, black_player = ?, winner = ?, date = ?, updatedAt = datetime('now') WHERE id = ?`,
      [white_player, black_player, winner, date, id]
    );
    return updatedGame;
  };


const deleteGame = async (id) => {
    const deletedGame = await db.run(`DELETE FROM Game WHERE id = ?`, id);
    return deletedGame;
  };  

    module.exports = {
        createNewGame, 
        getAllGames,
        getOneGame,
        updateGame,
        deleteGame
     };