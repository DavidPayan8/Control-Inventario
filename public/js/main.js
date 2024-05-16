let producto = {};
let proveedor = {};
let sucursal;
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
let pedidoRealizado = false;

window.addEventListener("DOMContentLoaded", (ev) => {
  ev.preventDefault();

  const agregarForm = document.getElementById("agregarForm");
  const enviarForm = document.getElementById("enviarForm");
  const btnCancelar = document.getElementsByClassName("cancel-order");
  const openModal = document.getElementById("openModal");
  const orderForm = document.getElementById("orderForm");
  const orderModal = document.getElementById("orderModal");
  const sucursalCard = document.getElementById("sucursalCard");
  const nameProduct = document.getElementById("nameProduct");
  const cantidadCard = document.getElementById("cantidad");
  const emailCard = document.getElementById("emailCard");
  const desCard = document.getElementById("desCard");
  const marcaCard = document.getElementById("marcaCard");

  agregarForm.addEventListener("submit", (ev) => {
    ev.preventDefault();

    //Datos producto
    sucursal = parseInt(agregarForm["sucursal"].value);
    nombreProducto = agregarForm["nombreProducto"].value;
    precio = agregarForm["precio"].value;
    cantidad = agregarForm["cantidad"].value;
    unidad = agregarForm["unidad"].value;
    marca = agregarForm["marca"].value;
    desc = agregarForm["desc"].value;
    producto = {
      sucursal,
      nombreProducto,
      precio,
      cantidad,
      unidad,
      marca,
      desc,
    };

    //Datos proveedor
    nombreProveedor = agregarForm["nombreProveedor"].value;
    cantidadPedido = agregarForm["cantidadPedido"].value;
    email = agregarForm["email"].value;
    descProveedor = agregarForm["descProveedor"].value;
    proveedor = { nombreProveedor, cantidadPedido, email, descProveedor };

    //Añadir y mostrar la tarjeta de confirmacion
    sucursalCard.innerHTML = `<strong>Sucursal: </strong>${producto.sucursal}`;
    nameProduct.innerHTML = `<strong>Nombre: </strong>${producto.nombreProducto}`;
    marcaCard.innerHTML = `<strong>Marca: </strong>${producto.marca}`;
    cantidadCard.innerHTML = `<strong>Cantidad pedida: </strong>${proveedor.cantidadPedido} ${producto.unidad}`;
    emailCard.innerHTML = `<strong>Email de pedido: </strong>${proveedor.email}`;
    desCard.innerHTML = `<strong>Detalles: </strong>${producto.desc}`;
    enviarForm["producto"].value = JSON.stringify(producto);
    enviarForm["proveedor"].value = JSON.stringify(proveedor);

    openModal.style.display = "block";
  });

  btnCancelar.addEventListener("click", (ev) => {
    ev.preventDefault();

    openModal.style.display = "none";
  });

  /* if(orderModal.dataset.active === "true"){
    console.log("HOLA EL DATA ES -",orderModal.dataset.active)
  } */
  
});

if(orderModal.className === "active"){
  openOrderModal()
}


function openOrderModal() {

  orderModal.innerHTML += `
      <h2>¡Pedido realizado con exito!</h2>
    `;
  setTimeout(() => {
    orderModal.innerHTML = "";
  }, 3000);
}
