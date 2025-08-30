const express = require('express');
const basicAuth = require('basic-auth');
const htmlDocx = require('html-docx-js');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid'); //genera identificador unico 


require('dotenv').config();

const router = express.Router();

// Autenticación
const auth = (req, res, next) => {
	const user = basicAuth(req);
	if (!user || user.name !== process.env.USER || user.pass !== process.env.PASSWORD) {
		res.set('WWW-Authenticate', 'Basic realm="prueba-api-docx"');
		return res.status(401).send('<h1>Se requiere de autenticación para continuar</h1>');
	}
	next();
};

// Ruta POST
router.post('/generar-doc', auth, async (req, res) => {
	const { nombre, departamento, descripcion } = req.body;

	if (!nombre || !departamento || !descripcion) {
		return res.status(400).send('<h1> Error: Faltan parámetros </h1>');
	}

	const contenidoHTML = `
    <!DOCTYPE html>
	<html lang='es'>
	<head>
		<meta charset='UTF-8'>
		<title>${nombre}</title>
	</head>
    <html>
    <body>
      <h1>${nombre}</h1>
      <h3>${departamento}</h3>
      ${descripcion}
    </body>
    </html>
  `;

	try {
		// const fileBuffer = await htmlToDocx(contenidoHTML);

		const blob = htmlDocx.asBlob(contenidoHTML);
		const docxBuffer = Buffer.from(await blob.arrayBuffer()); 


		const downloadsDir = path.join(__dirname, '../downloads');

		if (!fs.existsSync(downloadsDir)) {
			fs.mkdirSync(downloadsDir);
		}

		const fileName = `documento-${uuid.v4()}-${nombre.toLowerCase().replace(/ /g, '_')}.docx`;
		const filePath = path.join(downloadsDir, fileName);

		fs.writeFileSync(filePath, docxBuffer);

		const downloadUrl = `http://localhost:3000/api/download/${fileName}`;
		return res.status(200).json({
			message: 'Documento generado con éxito',
			downloadUrl: downloadUrl
		});

	} catch (err) {
		console.error('Error al generar el documento:', err);
		res.status(500).send('<h1>Error interno del servidor.</h1>');
	}
});


//Ruta GET
router.get('/download/:fileName', auth, (req, res) => {
	const fileName = req.params.fileName;
	const filePath = path.join(__dirname, '../downloads', fileName);

	//Verifica que el archivo exista
	if (fs.existsSync(filePath)) {
		console.log('Descargando archivo...');
		res.download(filePath, (err) => {
			if (err) {
				console.error("Error al descargar el archivo:", err);
				res.status(500).send("Error interno del servidor.");
			}
			//Se elimina el archivo del buffer luego de ser descargado
			fs.unlink(filePath, (unlinkErr) => {
				if (unlinkErr) console.error('Error al eliminar el archivo temporal:', unlinkErr);
				console.log(`Archivo temporal ${fileName} eliminado.`);
			});
		});
		console.log('Archivo descargado con éxito.')
	}
	else {
		return res.status(404).send('Archivo no encontrado.');
	}
});


module.exports = router;