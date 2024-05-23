import modelo from "../models/modelo.js";
import { enviar_email } from "../services/mailService.js";


const cantidadAvisoStock = 5;
const emailEmpresa = "davilito184@gmail.com"
let orderModalActive = "";



const mostrarInventario = async (req, res) => {
  //Obtener todos los datos a mostrar en el index
  let productos = await modelo.obtener_todos_productos();
  let sucursales = await modelo.obtener_sucursales();

  let reponerProductos = await modelo.productos_a_reponer(cantidadAvisoStock)
  if(reponerProductos.length !== 0){
    enviar_email("Reponer",reponerProductos,emailEmpresa)
  };

  if (orderModalActive) {
    res.render("index", {
      title: "Inventario",
      productos,
      sucursales,
      orderModalActive,
    });
    orderModalActive = "";
  } else {
    res.render("index", {
      title: "Inventario",
      productos,
      sucursales,
      orderModalActive,
    });
  }
};

const nuevoProducto = async (req, res) => {
  //Obtener las sucursales para opciones del producto
  let sucursales = await modelo.obtener_sucursales();

  res.render("newProduct", { title: "Agregar Producto", sucursales });
};

const agregarProducto = async (req, res) => {
  //Obtener los objetos enviados por metodo POST
  let producto = JSON.parse(req.body.producto);
  let proveedor = JSON.parse(req.body.proveedor);
  let pedido = JSON.parse(req.body.pedido);

  //Hacer las consultas de guardado.
  await modelo.agregar_producto(producto, proveedor);
  let result = await modelo.obtener_todos_productos();

  pedido["producto_id"] = result[result.length-1].id;

  await modelo.nuevo_pedido(pedido)

  res.redirect("/");
};

const getEditForm = async (req, res) => {
  let id = parseInt(req.params.id);
  let producto = await modelo.buscarProducto(id);
  let sucursales = await modelo.obtener_sucursales();

  if (producto.length === 0) {
    res.render("/");
  } else {
    res.render("editForm", { producto: producto[0], sucursales });
  }
};

const confirmEdit = async (req, res) => {
  let id = parseInt(req.params.id);
  let hayProducto = await modelo.buscarProducto(id);

  if (hayProducto.length === 0) {
    res.redirect("/");
  } else {
    //Recogemos los nuevos parametros
    let nombre = req.body.nombreProducto;
    let sucursal = req.body.sucursal;
    let precio = req.body.precio;
    let cantidad = req.body.cantidad;
    let unidad = req.body.unidad;
    let marca = req.body.marca;
    let desc = req.body.desc;

    let producto = {
      id,
      nombre,
      sucursal,
      precio,
      cantidad,
      unidad,
      marca,
      desc,
    };

    //Hacemos la consulta
    await modelo.editarProducto(producto);

    res.redirect("/");
  }
};

const getOrderForm = async (req, res) => {
  let id = parseInt(req.params.id);
  let producto = await modelo.buscarProducto(id);
  let proveedores = await modelo.obtener_proveedores();

  if (producto.length === 0) {
    res.render("/");
  } else {
    res.render("orderForm", { producto: producto[0], proveedores });
  }
};

const confirmOrder = async (req, res) => {
  let id = parseInt(req.params.id);
  let results = await modelo.buscarProducto(id);
  let precio = parseInt(results[0].precio * req.body.cantidadPedido);
  let hayProducto = await modelo.buscarProducto(id);
  let pedido = {
    producto_id:id,
    nombreProveedor: req.body.proveedor,
    fecha: new Date().toISOString().slice(0, 10),
    cantidad: req.body.cantidadPedido,
    precio
  };

  if (hayProducto.length === 0) {
    res.redirect("/");
  } else {

    await modelo.nuevo_pedido(pedido);
    
    //Datos para el email.
    let proveedor = await modelo.buscar_proveedor(req.body.proveedor);
    let datos ={
      pedido,
      proveedor: proveedor[0],
      producto:hayProducto,
    }
    orderModalActive = "active";
    enviar_email("Pedido",datos,proveedor[0].email);
    
    res.redirect("/");
  }
};

const mostrarVistaGrafico = async (req, res) => {
  res.render("report");
};

const obtenerGrafico = async (req, res) => {
  let productos = await modelo.obtener_todos_productos();
  let pedidos = await modelo.obtener_pedidos_ordenados_fecha();

  res.json({ productos, pedidos });
};

const borrarProducto = async (req, res) => {
  let id = parseInt(req.params.id);
  let hayProducto = await modelo.buscarProducto(id);

  if (hayProducto.length === 0) {
    res.redirect("/");
  } else {
    await modelo.eliminarProducto(id);
    res.redirect("/");
  }
};

export default {
  mostrarInventario,
  nuevoProducto,
  agregarProducto,
  getEditForm,
  getOrderForm,
  confirmEdit,
  confirmOrder,
  mostrarVistaGrafico,
  obtenerGrafico,
  borrarProducto,
};
