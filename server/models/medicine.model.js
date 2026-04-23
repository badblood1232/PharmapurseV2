import db from '../config/db.js'

const Medicine = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM medicine');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM medicine WHERE med_id = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    },
};

export default Medicine;