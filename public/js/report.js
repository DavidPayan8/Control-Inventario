Chart.defaults.color = "#fff";
Chart.defaults.borderColor = "#444";
const productOptions = document.getElementById("productOptions");
const parTotal = document.getElementById("total");
const idChart = "yearsChart";

let data = [];
let fechas = [];

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

      mostrarTotal("cantidad", cantidades);
      renderYearOrders(fechas, cantidades);

      //Escuchar los cambios de producto
      productOptions.addEventListener("change", (ev) => {
        ev.preventDefault();

        if (ev.target.value === "total") {
          data = result.pedidos.map((pedido) => pedido.precio_total);

          mostrarTotal(ev.target.value, data);
          updateChart(idChart, data, ev.target.value);
        } else {
          data = result.pedidos.map((pedido) => pedido.cantidad);

          mostrarTotal(ev.target.value, data);
          updateChart(idChart, data, ev.target.value);
        }
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

  const data = {
    labels: fechas,
    datasets: [
      {
        data: cantidad,
        tension: 0.5,
        fill: true,
        pointBorderWidth: 5,
        backgroundColor: "rgba(30, 103, 44, 0.5)",
        borderColor: "#1e672c",
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
    },
  };

  new Chart(idChart, { type: "line", data, options });
}

//Actualizar datos
function updateChart(chartId, data, label) {
  const chart = Chart.getChart(chartId);
  chart.data.datasets[0].data = data;
  chart.data.datasets[0].label = label;
  chart.update();
}

//Calcular total
function calcularTotal(data) {
  return (
    Math.floor(data.reduce((sum, datos) => sum + parseFloat(datos), 0) * 100) /
    100
  );
}

//Mostrar Total
function mostrarTotal(label, data) {
  parTotal.innerHTML = "";
  if (label === "total") {
    parTotal.innerHTML = `<strong>Gasto total: </strong> ${calcularTotal(
      data
    )}`;
  } else {
    parTotal.innerHTML = `<strong>Cantidad total pedida: </strong> ${calcularTotal(
      data
    )}`;
  }
}

printChars();
