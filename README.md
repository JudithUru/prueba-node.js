# 📄 Prueba Técnica – API Generadora de Documentos Word

![Node.js](https://img.shields.io/badge/Node.js-16+-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-blue?logo=express)

## 🎯 Objetivo

API construida con **Node.js + Express** que permite generar documentos **Word (.docx)** a partir de contenido en **HTML**.  
La API incluye **autenticación básica** para proteger el endpoint.

---

## ⚙️ Requisitos previos

- Node.js >= 16
- npm >= 8

---

## 📦 Instalación

Clonar el repositorio y entrar en el proyecto:

```bash
git clone https://github.com/JudithUru/prueba-node.js.git
cd prueba-node.js
```

Instalar dependencias:

```bash
npm install
```

---

## 🔑 Configuración

Crear un archivo `.env` donde puedes definir las credenciales de autenticación:

```env
USER=admin
PASSWORD=12345
PORT=3000
```

---

## ▶️ Ejecución

Para iniciar el servidor:

```bash
node server.js
```

La API quedará disponible en:
👉 `http://localhost:3000`

---

## 🔐 Autenticación

La ruta principal está protegida con **Basic Auth**.
Debes enviar usuario y contraseña (por defecto desde `.env`).

Ejemplo:

- Usuario: `admin`
- Contraseña: `12345`

---

## 📄 Endpoint disponible

### **POST** `/api/generar-doc`

#### Body (JSON)

```json
{
    "nombre": "Nombre de Usuario o del documento",
    "departamento": "TI",
    "descripcion": "<!DOCTYPE html><body style='font-family:Georgia,sans-serif;background:#f4f6f8;color:#333;margin:0;padding:10px;'><header style='background:#4a6fa5;color:#fff;padding:10px;text-align:center;font-size:20px;'>Mi Página de Prueba</header><main style='padding:10px;'><h1 style='color:#355070;'>Bienvenido</h1><p style='color:#333;'>Este es un ejemplo de página con acentos, ñ y caracteres especiales en el idioma español.</p><img src='https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='Imagen de ejemplo' width='400' height='250' style='display:block;margin:10px 0;border-radius:8px;'><br><button style='background:#4a6fa5;color:#fff;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;'>Presióname</button><table border='1' style='border-collapse:collapse;width:100%;margin-top:15px;'><tr style='background:#d3e0ff;'><th style='padding:5px;'>Producto</th><th style='padding:5px;'>Estado</th><th style='padding:5px;'>Precio</th></tr><tr><td style='padding:5px;'>Suscripción “Temporada”</td><td style='padding:5px;'>Activo</td><td style='padding:5px;'>$19.90</td></tr><tr><td style='padding:5px;'>Curso Frontend</td><td style='padding:5px;'>En preventa</td><td style='padding:5px;'>$49.00</td></tr></table><p style='color:#333;'>Gracias por usar nuestra demo de DOCX en español.</p></main><footer style='background:#ddd;color:#555;text-align:center;padding:10px;margin-top:15px;'>© 2025 Prueba</footer></body></html>"
}
```

#### Respuesta

Un archivo **.docx** descargable que mantiene el formato HTML enviado.

---

## 🧪 Ejemplo de prueba con cURL

```bash
curl -X POST http://localhost:3000/api/generar-doc \
-u admin:12345 \
-H "Content-Type: application/json" \
-d '{
  "nombre": "Nombre de Usuario o del documento",
  "departamento": "TI",
  "descripcion": "<h1>Hola</h1><p>Documento generado desde la API</p>"
}'
```

## También puedes hacer la ejecución del método POST en _Postman_

---

## ⚠️ Posibles errores

- **401 Unauthorized** → si las credenciales de Basic Auth son incorrectas.
- **400 Bad Request** → si el JSON no incluye descripcion.
- **500 Internal Server Error** → si el HTML enviado tiene errores graves.

---

## 👩‍💻 Autora

- **Judith Uruchima**

---

## 📝 Tecnologías utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [basic-auth](https://www.npmjs.com/package/basic-auth)
- [html-docx-js](https://www.npmjs.com/package/html-docx-js)
- [dotenv](https://www.npmjs.com/package/dotenv)
