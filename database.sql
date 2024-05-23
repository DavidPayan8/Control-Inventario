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
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
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
    proveedor_id INT,
    FOREIGN KEY (sucursal_id) REFERENCES tienda(sucursal),
    FOREIGN KEY (proveedor_id) REFERENCES proveedor(id)
);

-- Crear la tabla "linea_pedido"
CREATE TABLE IF NOT EXISTS linea_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT NOT NULL,
    proveedor_id INT NOT NULL,
    fecha_pedido DATE NOT NULL,
    cantidad INT NOT NULL,
    precio_total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (producto_id) REFERENCES productos(id),
    FOREIGN KEY (proveedor_id) REFERENCES proveedor(id)
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
INSERT INTO productos (nombre, sucursal_id ,tipo_unidad, cantidad, precio, marca, descripcion, proveedor_id) VALUES
('DoggyDelight', 1 ,'kg', 10, 5.99, 'Marca A', 'Alimento para perros premium', 1),
('CottonTee', 2 ,'u', 50, 2.50, 'Marca B', 'Camiseta de algodón de alta calidad', 2),
('TechPhone', 3 ,'u', 20, 8.75, 'Marca C', 'Smartphone con las últimas características', 3),
('PowerDrill', 4 ,'u', 30, 49.99, 'Marca D', 'Taladro inalámbrico potente', 4),
('CleanAll', 5 ,'kg', 5, 3.25, 'Marca E', 'Limpiador multiusos para el hogar', 5);


-- Insertar datos de ejemplo en la tabla linea_pedido
INSERT INTO linea_pedido (producto_id, proveedor_id, fecha_pedido, cantidad, precio_total) VALUES
    (1, '1', '2023-09-20', 45, 189.70),
    (2, '2', '2023-08-25', 30, 142.75),
    (3, '3', '2023-07-14', 120, 1100.60),
    (4, '4', '2023-06-21', 95, 240.30),
    (1, '1', '2024-05-12', 55, 345.80),
    (2, '2', '2023-11-30', 75, 310.50),
    (3, '3', '2024-01-05', 130, 950.25),
    (4, '4', '2023-10-30', 60, 180.75),
    (1, '1', '2024-06-18', 80, 560.90),
    (2, '2', '2023-12-10', 85, 280.20),
    (3, '3', '2023-09-07', 110, 890.50),
    (4, '4', '2023-07-22', 100, 260.10),
    (1, '1', '2024-07-16', 75, 432.45),
    (2, '2', '2024-01-25', 90, 340.80),
    (3, '3', '2023-08-18', 140, 980.65),
    (4, '4', '2023-05-20', 70, 210.50),
    (1, '1', '2024-08-10', 95, 610.35),
    (2, '2', '2023-09-12', 55, 190.60),
    (3, '3', '2024-03-08', 100, 830.90),
    (4, '4', '2023-06-25', 50, 170.80);


