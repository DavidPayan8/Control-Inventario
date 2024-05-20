fetch('/report-data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log('Objeto recibido desde el servidor:', data);
    // Aquí puedes trabajar con el objeto data recibido del servidor
  })
  .catch(error => {
    console.error('Error al obtener el objeto desde el servidor:', error);
  });
