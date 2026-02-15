# 🚀 Real-Time Product Manager

Aplicación backend desarrollada con Node.js que combina renderizado tradicional mediante HTTP y comunicación en tiempo real utilizando WebSockets.

## 📌 Descripción

Este proyecto demuestra cómo pueden convivir en una misma aplicación dos modelos de comunicación diferentes.

La vista **Home** utiliza el protocolo HTTP tradicional (modelo request-response) para renderizar los productos almacenados en un archivo JSON.

La vista **RealTimeProducts** utiliza WebSockets (Socket.io) para actualizar automáticamente la lista de productos cuando se crea o elimina uno, sin necesidad de recargar la página.

## 🛠 Tecnologías utilizadas

- Node.js
- Express
- Handlebars
- Socket.io
- Multer
- Persistencia en archivo JSON

## ⚙️ Funcionalidades

- Visualización de productos almacenados en un archivo JSON
- Creación de productos (con carga opcional de imagen)
- Eliminación de productos
- Actualización en tiempo real mediante WebSockets
- Separación de rutas con arquitectura modular
- Integración entre lógica HTTP y lógica WebSocket

## 🔄 Modelo de comunicación

Este proyecto combina intencionalmente dos protocolos:

- **HTTP** para el renderizado tradicional del lado del servidor (`/home`)
- **WebSockets** para la actualización bidireccional en tiempo real (`/RealTimeProducts`)
