import { createPool } from "mysql2/promise";


//Usamos pool porque cierra las conexiones de manera auto.
export const pool = createPool({
  host: "localhost",
  user: "userUSER2",
  password: "userUSER2",
  database: "inventario",
});
