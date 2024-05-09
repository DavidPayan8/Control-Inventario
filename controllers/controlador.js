import modelo from "../models/modelo.js";

const mostrarInventario = async (req, res) => {
  let productos = await modelo.obtener_todos_productos();
  let sucursales = await modelo.obtener_sucursales();
  console.table(productos)

  res.render("index", { title: "Inventario", productos, sucursales });
};

export default {
  mostrarInventario,
};
