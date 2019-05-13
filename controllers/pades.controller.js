const pdfsig = require('pdfsig');
const { crudController } = require('mini-mvcs');

module.exports = (router, services) => {

  /**
  *
  * @return {String} Devuelve el estado del servicio
  */
  router.get('/estado', (req, res) => {
    return {
      status: 'El servicio se encuentra disponible',
    };

  });

  router.get('/firma', (req, res) => {
    const firmas = new pdfsig('./test/prueba.pdf');
    return firmas;

  });
};
