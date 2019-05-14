const firmaDigitalPdf = require('validar-firma-digital-pdf');
const { crudController } = require('mini-mvcs');
const fs = require('fs');

module.exports = (router, services) => {

  /**
  *
  * @return {String} Devuelve el estado del servicio
  */


  router.get('/test/firmas', (req, res) => {
    let documento = base64_encode();
		console.log("TCL: documento", documento)
    
    return firmaDigitalPdf.obtenerFirmasBase64(documento.toString(), true);
  });

  router.get('/test/base64Ejemplo', (req, res) => {
    let documento = base64_encode();
    return {documento};
  });

  router.post('/firmas', (req, res) => {
    if (req.query.formato = 'base64'){
      const documento = req.body.documento;
      return firmaDigitalPdf.obtenerFirmasBase64(documento.toString(), true);
    } 
    return {
      mensaje: "Formato Desconocido"
    };
    
    
  });
};

const base64_encode = (file) => {
  // read binary data
  var bitmap = fs.readFileSync(`./test/prueba.pdf`, 'utf8');
  return new Buffer(bitmap).toString('base64');
  // convert binary data to base64 encoded string
  //return bitmap;
}
