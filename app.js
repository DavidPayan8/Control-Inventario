import express from "express";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import errorController from "./controllers/errorController.js";
import controlador from "./controllers/controlador.js";

//Guardar la ruta de este mismo directorio de node.js.
const __dirname = fileURLToPath(new URL(".", import.meta.url));

//Inicializa la app de express.
const app = express();
const PORT = 3000;

//Uso de Middelwares.
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

//Configurar la app.
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

//Configurar motor de vistas
app.set("views", path.join(__dirname, "vistas"));
app.set("view engine", "pug");

//Configurar rutas
app.get("/", controlador.mostrarInventario);
app.get("/newProduct", controlador.nuevoProducto);
app.post("/newProduct", controlador.agregarProducto);
app.get("/edit/:id", controlador.getEditForm);
app.post("/edit/:id");
app.get("/report");
app.get("/delete/:id");

app.use(errorController.error404);

//Levantar el servidor.
app.listen(PORT, () => {
  console.log(`Servidor levantado en : http://localhost:${PORT}`);
});
