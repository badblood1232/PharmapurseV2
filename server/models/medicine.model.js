import db from '../config/db.js'

const Medicine = {
        Create: async (name, details,image) =>{
            const result = await db.query(
                "INSERT INTO medicine (name, description,image) VALUES  (?, ?, ?)",
                [name,details,image]
            )
                return result.insertId
        },

        GetAll: async () => {
                const [rows] = await db.query("SELECT * FROM medicine")
                return rows;
        },

        GetbyId: async (id) =>{
            const [row] = await db.query("SELECT * FROM medicine WHERE med_id = ?",[id])
            return row.length>0 ? row[0] : null;
        },

        Update: async (id, name, details, image) => {
            const result = await db.query("UPDATE medicine SET name = ?, details = ?, image = ? WHERE med_id = ?",[name, details, image,id])
            return result;
        }


}
export default Medicine;