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
};
