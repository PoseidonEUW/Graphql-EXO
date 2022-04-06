const db = require('../services/db');
// const config = require('../config');


async function concerts() {
    //   const offset = helper.getOffset(page, config.listPerPage);
    const data = await db.query(
        `SELECT idConcert, idTournee, dateConcert, ville, nbrPlaceVendu FROM ExoAPI.Concert;
        `);
    return data
}

module.exports = {
    concerts
}