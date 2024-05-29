const error404 = (req, res) => {
  res
    .status(404)
    .render("error404", {
      title: "Error 404",
      message: "No existe el recurso buscado",
    });
};

export default {
  error404,
};
