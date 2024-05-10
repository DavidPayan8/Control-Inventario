import modelo from "../models/modelo.js";

const mostrarInventario = async (req, res) => {
  let productos = await modelo.obtener_todos_productos();
  let sucursales = await modelo.obtener_sucursales();
  console.table(productos);

  res.render("index", { title: "Inventario", productos, sucursales });
};

const nuevoProducto = (req, res) => {
  res.render("newProduct", { title: "Agregar Producto" });
};

const agregarProducto = async (req,res) => {
  
}

export default {
  mostrarInventario,
  nuevoProducto,
  agregarProducto,
};
