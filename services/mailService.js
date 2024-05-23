import * as nodemailer from "nodemailer";


//Configuracion de la cuenta que manda mensajes.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "davidpayanalvarado@gmail.com",
    pass: "twovgxgqblmerocg",
  },
  tls: {
    rejectUnauthorized: true,
  }
});

export function enviar_email(asunto, datos, destino) {
  const mail = {
    from: "",
    to: destino,
    subject: asunto,
    text: "Saludos desde las oficinas de Smarty",
    html: plantillaHtml(asunto,datos),
  };

  transporter.sendMail(mail, (err, info) => {
    if (err) {
      console.log("Error al enviar email: " + err);
    } else {
      console.log("Email enviado: " + info);
    }
  });
}

function plantillaHtml(asunto, datos) {
  let msj = "";
  if (asunto === "Pedido") {
    msj = `
        <h3>Notificacion para realizacion de pedido</h3>
        <hr>
        <div class="order-details" style="padding: 20px">
            <h4>Detalles:</h4>
            <p><strong>Producto:</strong> ${datos.producto[0].nombre}</p>
            <p><strong>Cantidad:</strong> ${datos.pedido.cantidad}</p>
            <p><strong>Proveedor:</strong> ${datos.proveedor.nombre}</p>
            <p><strong>Fecha del Pedido:</strong> ${datos.pedido.fecha}</p>
        </div>
        <hr>
        <h4>Muchas gracias, esperamos su respuesta.</h4>
        `;
  } else {
    msj += `
            <h3>Notificacion sobre el poco stock de los siguientes productos</h3>
            <hr>
            <div class="order-details">
        `;
    datos.forEach((elem) => {
      msj += `
                <p><strong>Producto:</strong> ${elem.nombre}---<strong>cantidad:</strong> ${elem.cantidad}</p>
            `;
    });

    msj += `
        <hr>
        </div>
    `;
  }
  return msj;
}
