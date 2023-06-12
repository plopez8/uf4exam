const db = require("../database/rec-api")

const createNewPlayer = async (id, username, fullname) => {
    const query = `
      INSERT INTO Players (ID, username, fullname, createdAt, updatedAt)
      VALUES (?, ?, ?, datetime('now'), datetime('now'))
    `;
    return new Promise((resolve, reject) => {
      db.run(query, [id, username, fullname], function(err) {
        if (err) {
          reject(new Error(`Could not create player: ${err.message}`));
        } else {
          resolve({
            id,
            username,
            fullname,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      });
    });
  };

const getAllPlayers = () => {
    return new Promise((resolve, reject) => { 
      db.all('SELECT * FROM Players;', [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };

const getOnePlayer = (id) => {
  return new Promise((resolve, reject) => { 
    db.get('SELECT * FROM Players WHERE ID = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const updatePlayer = async (id, playerData) => {
    const {username, fullname } = playerData;
    const updatedPlayer = await db.run(
      `UPDATE Players SET username = ?, fullname = ?, updatedAt = datetime('now') WHERE ID = ?`,
      [username, fullname, id]
    );
    return updatedPlayer;
  };


const deletePlayer = async (id) => {
    const deletedPlayer = await db.run(`DELETE FROM Players WHERE ID = ?`, id);
    return deletedPlayer;
  };  

  const getPlayerGames = (id) => {
    return new Promise((resolve, reject) => { 
      db.all('SELECT * FROM Game WHERE white_player = ? OR black_player = ?', [id, id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  };
  const getPlayerGamesByColor = (filterParams, id) => {
    let query = 'SELECT * FROM Game WHERE ';
    let params = [id];
    switch (filterParams.posicio) {
      case 'WHITE':
        query += 'white_player = ?';
        break;
      case 'BLACK':
        query += 'black_player = ?';
        break;
      default:
        throw new Error('Posicio debe ser WHITE o BLACK');
    }
  
    return new Promise((resolve, reject) => {
      db.all(query, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  };
  const getPlayerGamesByData = (filterParams, id) => {
    let query = 'SELECT * FROM Game WHERE date = ? AND (white_player = ? OR black_player = ?)';
    let params = [filterParams.data, id, id];
    return new Promise((resolve, reject) => {
      db.all(query, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  };
  
  const getPlayerGamesByColorData = (filterParams, id) => {
    let query = 'SELECT * FROM Game WHERE ';
    let params = [id, filterParams.data];
    switch (filterParams.posicio) {
      case 'WHITE':
        query += 'white_player = ?';
        break;
      case 'BLACK':
        query += 'black_player = ?';
        break;
      default:
        throw new Error('Posicio debe ser WHITE o BLACK');
    }
    query += ' AND date = ?';
  
    return new Promise((resolve, reject) => {
      db.all(query, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  };

    module.exports = {
        createNewPlayer, 
        getAllPlayers,
        getOnePlayer,
        updatePlayer,
        deletePlayer,
        getPlayerGames,
        getPlayerGamesByColor,
        getPlayerGamesByData,
        getPlayerGamesByColorData
     };