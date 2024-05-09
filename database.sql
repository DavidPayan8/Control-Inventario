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
    sucursal INT auto_increment primary key,
    ubicacion VARCHAR(255)
);

-- Crear la tabla "proveedor"
CREATE TABLE IF NOT EXISTS proveedor (
    nombre VARCHAR(255) PRIMARY KEY,
    descripcion TEXT,
    email VARCHAR(255) NOT NULL
);

-- Crear la tabla "productos"
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    sucursal_id INT,
    tipo_unidad ENUM('kg', 'u') NOT NULL,
    cantidad DECIMAL(10,2) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    marca VARCHAR(255),
    descripcion TEXT,
    proveedor_nombre VARCHAR(255),
    FOREIGN KEY (sucursal_id) REFERENCES tienda(sucursal),
    FOREIGN KEY (proveedor_nombre) REFERENCES proveedor(nombre)
);

-- Insertar datos de ejemplo en la tabla tienda
INSERT INTO tienda (ubicacion) VALUES
('Sevilla'),
('Dos hermanas'),
('Toledo'),
('Malaga'),
('Galicia');

-- Insertar datos de ejemplo en la tabla proveedor
INSERT INTO proveedor (nombre, descripcion, email) VALUES
('FoodCo', 'Proveedor de alimentos variados', 'foodco@example.com'),
('FashionWholesale', 'Proveedor de ropa al por mayor', 'fashionwholesale@example.com'),
('TechSupply', 'Proveedor de equipos electrónicos', 'techsupply@example.com'),
('FurnitureDirect', 'Proveedor de muebles para el hogar', 'furnituredirect@example.com'),
('CleanSupplies', 'Proveedor de productos de limpieza', 'cleansupplies@example.com');

-- Insertar datos de ejemplo en la tabla productos
INSERT INTO productos (nombre, tipo_unidad, cantidad, precio, marca, descripcion, proveedor_nombre) VALUES
('DoggyDelight', 'kg', 10, 5.99, 'Marca A', 'Alimento para perros premium', 'FoodCo'),
('CottonTee', 'u', 50, 2.50, 'Marca B', 'Camiseta de algodón de alta calidad', 'FashionWholesale'),
('TechPhone', 'u', 20, 8.75, 'Marca C', 'Smartphone con las últimas características', 'TechSupply'),
('PowerDrill', 'u', 30, 49.99, 'Marca D', 'Taladro inalámbrico potente', 'FurnitureDirect'),
('CleanAll', 'kg', 5, 3.25, 'Marca E', 'Limpiador multiusos para el hogar', 'CleanSupplies');

