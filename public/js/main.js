let producto = {};
let proveedor = {};
let pedido = {};
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
let fechaFormat;
let precioTotal;
let pedidoRealizado = false;

window.addEventListener("DOMContentLoaded", (ev) => {
  ev.preventDefault();

  const agregarForm = document.getElementById("agregarForm");
  const enviarForm = document.getElementById("enviarForm");
  const btnCancelar = document.getElementById("cancel-order");
  const openModal = document.getElementById("openModal");
  const orderForm = document.getElementById("orderForm");
  const orderModal = document.getElementById("orderModal");
  const sucursalCard = document.getElementById("sucursalCard");
  const nameProduct = document.getElementById("nameProduct");
  const cantidadCard = document.getElementById("cantidad");
  const emailCard = document.getElementById("emailCard");
  const desCard = document.getElementById("desCard");
  const marcaCard = document.getElementById("marcaCard");
  const btnMostrarMas = document.getElementById("mostrarMas");
  const divMostrarMas = document.getElementById("read-more");
  const btnMostrarMenos = document.getElementById("mostrarMenos");
  const divSrcroll = document.getElementById("scroller");

  if (agregarForm) {
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
      proveedor = { nombreProveedor, email, descProveedor };

      //Datos pedido
      const fechaActual = new Date();
      const dia = String(fechaActual.getDate()).padStart(2, "0");
      const mes = String(fechaActual.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
      const anio = fechaActual.getFullYear();
      fechaFormat = `${anio}-${mes}-${dia}`;
      precioTotal = cantidadPedido * precio;
      pedido = {
        nombreProveedor,
        fecha: fechaFormat,
        cantidad: cantidadPedido,
        precio: precioTotal,
      };

      //Añadir y mostrar la tarjeta de confirmacion
      sucursalCard.innerHTML = `<strong>Sucursal: </strong>${producto.sucursal}`;
      nameProduct.innerHTML = `<strong>Producto: </strong>${producto.nombreProducto}`;
      marcaCard.innerHTML = `<strong>Marca: </strong>${producto.marca}`;
      cantidadCard.innerHTML = `<strong>Cantidad pedida: </strong>${cantidadPedido} ${producto.unidad}`;
      emailCard.innerHTML = `<strong>Email de pedido: </strong>${proveedor.email}`;
      desCard.innerHTML = `<strong>Detalles: </strong>${descProveedor}`;
      enviarForm["producto"].value = JSON.stringify(producto);
      enviarForm["proveedor"].value = JSON.stringify(proveedor);
      enviarForm["pedido"].value = JSON.stringify(pedido);

      openModal.classList.add("activeOrder");
      document.body.classList.add("activeOrder");
      openModal.style.display = "block";
    });
  }

  if (btnCancelar) {
    btnCancelar.addEventListener("click", (ev) => {
      ev.preventDefault();

      document.body.classList.remove("activeOrder");
      openModal.style.display = "none";
      document.body.classList.remove("activeOrder");
    });
  }

  if (btnMostrarMas) {
    btnMostrarMas.addEventListener("click", (ev) => {
      ev.preventDefault();

      divMostrarMas.classList.add("mostrarMasActive");
      divSrcroll.classList.add("divScroller");
      divMostrarMas.style.display = "flex";
      btnMostrarMas.style.display = "none";
      btnMostrarMenos.style.display = "block";
    });
  }

  if (btnMostrarMenos) {
    btnMostrarMenos.addEventListener("click", (ev) => {
      ev.preventDefault();

      divMostrarMas.classList.remove("mostrarMasActive");
      divSrcroll.classList.remove("divScroller");
      divMostrarMas.style.display = "none";
      btnMostrarMenos.style.display = "none";
      btnMostrarMas.style.display = "block";
    });
  }
});

if (orderModal.className === "active") {
  openOrderModal();
}

function openOrderModal() {
  document.body.classList.add("active");
  orderModal.firstElementChild.innerHTML += `

      <h2>¡Pedido realizado con exito!</h2>
    `;
  setTimeout(() => {
    document.body.classList.remove("active");
    orderModal.firstElementChild.innerHTML = "";
    orderModal.className = "";
  }, 3000);
}
