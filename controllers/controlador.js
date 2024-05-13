import modelo from "../models/modelo.js";

const mostrarInventario = async (req, res) => {
  //Obtener todos los datos a mostrar en el index
  let productos = await modelo.obtener_todos_productos();
  let sucursales = await modelo.obtener_sucursales();

  res.render("index", { title: "Inventario", productos, sucursales });
};

const nuevoProducto = async (req, res) => {
  //Obtener las sucursales para opciones del producto
  let sucursales = await modelo.obtener_sucursales();

  res.render("newProduct", { title: "Agregar Producto" , sucursales});
};

const agregarProducto = async (req,res) => {
  //Obtener los objetos enviados por metodo POST
  let producto = JSON.parse(req.body.producto);
  let proveedor = JSON.parse(req.body.proveedor);
  console.log(producto,proveedor);

  //Hacer las consultas de guardado.
  console.log(await modelo.agregar_producto(producto,proveedor));

  //Volver al index
  let productos = await modelo.obtener_todos_productos();
  let sucursales = await modelo.obtener_sucursales();
  console.table(productos);

  res.render("index", { title: "Inventario", productos, sucursales });
}

export default {
  mostrarInventario,
  nuevoProducto,
  agregarProducto,
};
