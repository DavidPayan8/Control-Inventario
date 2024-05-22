const productOptions = document.getElementById("productOptions");
let cantidades = []
let fechas = []

//Pintar los graficos
function printChars() {
  fetch("/report-data")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((result) => {
       cantidades = result.pedidos.map((pedido) => pedido.cantidad);
       fechas = result.pedidos.map((pedido) => pedido.fecha_pedido);

      renderYearOrders(fechas, cantidades);

      //Escuchar los cambios de producto
      productOptions.addEventListener("change", (ev) => {
        ev.preventDefault();

        if (ev.target.value === "0") {
          removeData("yearsChart");
          console.log(fechas);
          renderYearOrders("yearsChart", cantidades, fechas);
        }

        pedidosFiltrados = result.pedidos.filter(
          (pedido) => pedido.producto_id === parseInt(ev.target.value)
        );

        cantidades = pedidosFiltrados.map((pedido) => pedido.cantidad);
        fechas = pedidosFiltrados.map((pedido) => pedido.fecha_pedido);

        removeData("yearsChart");
        console.log(fechas);
        renderYearOrders("yearsChart", cantidades, fechas);
      });
    })
    .catch((error) => {
      console.error("Error al obtener el objeto desde el servidor:", error);
    });
}

//Funcion para configurar el grafico.
function renderYearOrders(fechas, cantidad) {
  //Formatear fechas
  fechas = fechas.map((fecha) => fecha.substring(0, 10));

  console.log(cantidad);
  console.log(fechas);

  const data = {
    labels: fechas,
    datasets: [
      {
        data: cantidad,
        tension: 0.5,
        fill: true,
        pointBorderWidth: 5,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
    },
  };

 new Chart("yearsChart", { type: "line", data, options });
}


printChars();
