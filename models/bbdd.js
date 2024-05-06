import mysql from 'mysql2/promise';

async function crear_conexion(host, user, password, database) {
    try {
        return await mysql.createConnection({
            host,
            user,
            password,
            database,
            rowsAsArray: true
          });
    } catch (err) {
        console.log("Al conectar la DB erro: ",err)
    }
}

function cerrar_conexion(conexion){
    conexion.end();
}

async function consultar(consulta,conexion){
    try {
        const [results, fields] = await conexion.query(consulta);
      
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
      } catch (err) {
        console.log(err);
      }
}
