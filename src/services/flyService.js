const db = require("../database/examen")

const createNewFly = async (id, origen, desti, dataEnlairament, modelAvio, duradaTrajecte) => {
    const query = `
      INSERT INTO VOl (id, origen, desti, dataEnlairament, modelAvio, duradaTrajecte, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `;
    return new Promise((resolve, reject) => {
      db.run(query, [id, origen, desti, dataEnlairament, modelAvio, duradaTrajecte], function(err) {
        if (err) {
          reject(new Error(`Could not create fly: ${err.message}`));
        } else {
          resolve({
            id,
            origen,
            desti,
            dataEnlairament,
            modelAvio,
            duradaTrajecte,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      });
    });
  };

const getAllFlys = () => {
    return new Promise((resolve, reject) => { 
      db.all('SELECT * FROM Vol;', [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };


  const getFlyTickets = (id) => {
    return new Promise((resolve, reject) => { 
      db.all('SELECT * FROM Bitllet WHERE vol = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  };

  const getFlyTicketClass = (filterParams, id) => {
    let query = 'SELECT * FROM Bitllet WHERE vol = ? AND classe = ?';
    let params = [id, filterParams.classe];
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

  const getFlyTicketsByData = (filterParams, id) => {
    console.log("data");
    let query = 'SELECT * FROM Bitllet WHERE vol = ? AND createdAt < ?';
    let params = [id, filterParams.data];
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
  


  const getPlayerTicketsByClassData = (filterParams, id) => {
    let query = 'SELECT * FROM Bitllet WHERE vol = ? AND classe = ? AND createdAt < ?';
    let params = [id, filterParams.classe, filterParams.data];
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


  const deleteFly = async (id) => {
    const deletedTicket = await db.run(`DELETE FROM Vol WHERE id = ?`, id);
    return deletedTicket;
  };  

    module.exports = {
        createNewFly, 
        getAllFlys,
        getFlyTickets,
        getFlyTicketClass,
        getFlyTicketsByData,
        getPlayerTicketsByClassData,
        deleteFly
     };