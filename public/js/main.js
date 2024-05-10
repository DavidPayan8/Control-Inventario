const producto = {};
const proveedor = {};
let nombreProducto;
let precio;
let cantidad;
let unidad;
let marca;
let desc;
let nombreProveedor;
let cantidadPedido;
let email;
let descProveedor;

window.addEventListener("DOMContentLoaded", () => {
  const agregarForm = document.getElementById("agregarForm");
  const btnNewProducto = document.getElementById("btn-guardarProducto");

  btnNewProducto.addEventListener("click", () => {
    //Datos producto
    nombreProducto = agregarForm["nombreProducto"].value;
    precio = agregarForm["precio"].value;
    cantidad = agregarForm["cantidad"].value;
    unidad = agregarForm["unidad"].value;
    marca = agregarForm["marca"].value;
    desc = agregarForm["desc"].value;
    producto = { nombreProducto, precio, cantidad, unidad, marca, desc };
  
    //Datos proveedor
    nombreProveedor = agregarForm["nombreProveedor"].value;
    cantidadPedido = agregarForm["cantidadPedido"].value;
    email = agregarForm["email"].value;
    descProveedor = agregarForm["descProveedor"].value;
    proveedor = { nombreProveedor, cantidadPedido, email, descProveedor };
  
    console.log(producto, proveedor);
  });
});

