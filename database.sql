-- Crear la base de datos "inventario"
CREATE DATABASE IF NOT EXISTS inventario;

-- Utilizar la base de datos "inventario"
USE inventario;

-- Crear un usuario "userUSER2" con privilegios para acceder desde cualquier host
CREATE USER IF NOT EXISTS 'userUSER2'@'%' IDENTIFIED BY 'userUSER2';

-- Otorgar todos los privilegios al usuario "userUSER2" en la base de datos "inventario"
GRANT ALL PRIVILEGES ON inventario.* TO 'userUSER2'@'%';

-- Actualizar los privilegios para que surtan efecto
FLUSH PRIVILEGES;

-- Crear la tabla "tienda"
CREATE TABLE IF NOT EXISTS tienda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombreEmpresa VARCHAR(255) NOT NULL,
    sucursal VARCHAR(255) NOT NULL
);

-- Crear la tabla "productos"
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tienda_id INT,
    tipo_unidad ENUM('kg', 'u') NOT NULL,
    cantidad DECIMAL(10,2) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    marca VARCHAR(255),
    descripcion TEXT,
    proveedor_nombre VARCHAR(255),
    FOREIGN KEY (tienda_id) REFERENCES tienda(id),
    FOREIGN KEY (proveedor_id) REFERENCES proveedor(nombre)
);

-- Crear la tabla "proveedor"
CREATE TABLE IF NOT EXISTS proveedor (
    nombre VARCHAR(255) PRIMARY KEY,
    descripcion TEXT,
    email VARCHAR(255)
);