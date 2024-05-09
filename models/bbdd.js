import { pool } from "./config.js";

export async function hacer_consulta(query){
    try {
        const [results] = await pool.query(query);
        return results
      } catch (err) {
        console.log(err);
      }
}

