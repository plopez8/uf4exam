const db = require("../database/examen")

const createNewTicket = async (vol, seientAssignat, id, dniTitular, nomCompletTitular, classe) => {
    const query = `
      INSERT INTO Bitllet (vol, seientAssignat, id, dniTitular, nomCompletTitular, classe, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `;
    return new Promise((resolve, reject) => {
      db.run(query, [vol, seientAssignat, id, dniTitular, nomCompletTitular, classe], function(err) {
        if (err) {
          reject(new Error(`Could not create ticket: ${err.message}`));
        } else {
          resolve({
            vol,
            seientAssignat,
            id,
            dniTitular,
            nomCompletTitular,
            classe,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      });
    });
  };


  const getOneTicket = (id) => {
  return new Promise((resolve, reject) => { 
    db.get('SELECT * FROM Bitllet WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const updateTicket = async (id, ticketData) => {
    const { seientAssignat, dniTitular, nomCompletTitular, classe } = ticketData;
    const updatedTicket = await db.run(
      `UPDATE Bitllet SET seientAssignat = ?, dniTitular = ?, nomCompletTitular = ?, classe = ?, updatedAt = datetime('now') WHERE id = ?`,
      [seientAssignat, dniTitular, nomCompletTitular, classe, id]
    );
    return updatedTicket;
  };


const deleteTicket = async (id) => {
    const deletedTicket = await db.run(`DELETE FROM Bitllet WHERE id = ?`, id);
    return deletedTicket;
  };  



  
    module.exports = {
        createNewTicket, 
        getOneTicket,
        updateTicket,
        deleteTicket
     };