import moment from "moment";
import { hacer_consulta } from "./bbdd.js";

async function getResultados(query) {
  try {
    // Ejecutar la consulta SQL.
    const resultados = await hacer_consulta(query);
    return resultados;
  } catch (err) {
    console.log("Erorr: ", err);
  }
}

//Obtener todas las sucursales de dicha tienda.
function obtener_sucursales() {
  const results = getResultados(`SELECT * FROM tienda;`);
  return results;
}

//Obtener todos los productos.
function obtener_todos_productos() {
  const results = getResultados(
    `SELECT id, nombre ,cantidad, precio, tipo_unidad,sucursal_id FROM productos;`
  );
  return results;
}

//Obtener todos los pedidos.
function obtener_todos_pedidos() {
  const results = getResultados(`SELECT * FROM linea_pedido;`);
  return results;
}

//Obtener pedidos ordenados
async function obtener_pedidos_ordenados_fecha() {
  const results = await getResultados(
    `SELECT * FROM linea_pedido ORDER BY fecha_pedido ASC;
    `
  );
  results.forEach(pedido => {
    let fecha = pedido.fecha_pedido;
    pedido.fecha_pedido =  moment(fecha).format("DD/MM/YYYY");
});
  return results;
}

//Obtener los proveedores.
async function obtener_proveedores() {
  const results = getResultados(`SELECT * FROM proveedor;`);
  return results;
}

//Agregar nuevo producto.
async function agregar_producto(newProducto, proveedor) {
  let idProveedor;
  try {
    let hayProveedor = await buscar_proveedor(proveedor.nombreProveedor);

    if (hayProveedor.length == 0) {
      //Creamos el proveedor del producto.
      await nuevo_proveedor(proveedor);
      let result = await obtener_proveedores();
      idProveedor = result.length;

    }else{
      idProveedor = hayProveedor[0].id;
    }

    //Consulta para agregar un nuevo producto.
    const query = `INSERT INTO productos (nombre, sucursal_id, tipo_unidad, cantidad, precio, marca, descripcion, proveedor_id) VALUES
    ('${newProducto.nombreProducto}',${newProducto.sucursal},'${newProducto.unidad}', ${newProducto.cantidad}, ${newProducto.precio}, '${newProducto.marca}', '${newProducto.desc}', '${idProveedor}');`;

    // Ejecutar la consulta SQL.
    const resultados = await hacer_consulta(query);
    return resultados;
  } catch (err) {
    console.log("Erorr: ", err);
  }
}

//Agregar linea de pedido
async function nuevo_pedido(pedido) {
  try {
    let proveedor = await buscar_proveedor(pedido.nombreProveedor);
    let id = proveedor[0].id;

    //Consulta para agregar un nuevo pedido.
    const query = `INSERT INTO linea_pedido (producto_id, proveedor_id, fecha_pedido, cantidad, precio_total) VALUES
    ('${pedido.producto_id}','${id}','${pedido.fecha}', ${pedido.cantidad}, ${pedido.precio});`;

    // Ejecutar la consulta SQL.
    const resultados = await hacer_consulta(query);
    return resultados;
  } catch (err) {
    console.log("Erorr: ", err);
  }
}

//Buscar producto por id.
async function buscarProducto(id) {
  try {
    const query = `SELECT * FROM productos where id = ${id}`;
    let result = hacer_consulta(query);

    return result;
  } catch (err) {
    console.log(err);
  }
}

//Crear un nuevo proveedor.
async function nuevo_proveedor(proveedor) {
  try {
    const query = `INSERT INTO proveedor (nombre, descripcion, email) VALUES
    ('${proveedor.nombreProveedor}', '${proveedor.descProveedor}', '${proveedor.email}');`;

    await hacer_consulta(query);
  } catch (err) {
    console.log(err);
  }
}

//Buscar proveedor por nombre
async function buscar_proveedor(nombre) {
  try {
    const query = `SELECT * FROM proveedor WHERE nombre = '${nombre}';`;

    return await hacer_consulta(query);
  } catch (err) {
    console.log(err);
  }
}

//Editar producto.
async function editarProducto(producto) {
  try {
    const query = `UPDATE productos
    SET nombre = '${producto.nombre}',
        sucursal_id = ${producto.sucursal},
        tipo_unidad = '${producto.unidad}',
        cantidad = ${producto.cantidad},
        precio = ${producto.precio},
        marca = '${producto.marca}',
        descripcion = '${producto.desc}'
    WHERE id = ${producto.id};
    `;
    const result = await hacer_consulta(query);
    return result;
  } catch (error) {
    console.log(err);
  }
}

//Eliminar producto.
async function eliminarProducto(id) {
  try {
    const query = `
      DELETE FROM productos WHERE id = ${id};
    `;
    let result = await hacer_consulta(query);
    return result;
  } catch (error) {
    console.log(err);
  }
}

export default {
  obtener_sucursales,
  obtener_proveedores,
  obtener_todos_productos,
  obtener_todos_pedidos,
  obtener_pedidos_ordenados_fecha,
  agregar_producto,
  nuevo_proveedor,
  buscar_proveedor,
  nuevo_pedido,
  editarProducto,
  buscarProducto,
  eliminarProducto,
};
