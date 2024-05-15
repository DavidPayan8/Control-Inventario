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
  console.table(results);
  return results;
}

//Obtener los proveedores.
async function obtener_proveedores(){
  const results = getResultados(`SELECT * FROM proveedor;`);
  return results;
}

//Agregar nuevo producto.
async function agregar_producto(newProducto, proveedor) {
  try {
    //Creamos el proveedor del producto.
    nuevo_proveedor(proveedor);

    //Consulta para agregar un nuevo producto.
    const query = `INSERT INTO productos (nombre, sucursal_id, tipo_unidad, cantidad, precio, marca, descripcion, proveedor_nombre) VALUES
    ('${newProducto.nombreProducto}',${newProducto.sucursal},'${newProducto.unidad}', ${newProducto.cantidad}, ${newProducto.precio}, '${newProducto.marca}', '${newProducto.desc}', '${proveedor.nombreProveedor}');`;

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
    console.log(result);

    return result;
  } catch (err) {
    console.log(err);
  }
}

//Crear un nuevo proveedor.
async function nuevo_proveedor(proveedor) {
  const query = `INSERT INTO proveedor (nombre, descripcion, email) VALUES
    ('${proveedor.nombreProveedor}', '${proveedor.descProveedor}', '${proveedor.email}');`;

  await hacer_consulta(query);
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
    return result
  } catch (error) {
    console.log(err);
  }
}

//Eliminar producto.
async function eliminarProducto(id){
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
  agregar_producto,
  nuevo_proveedor,
  editarProducto,
  buscarProducto,
  eliminarProducto,
};
