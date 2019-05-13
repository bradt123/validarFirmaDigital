const configJson = require('./config/config.json');
const configJs = require('./config/config.js');
const bodyParser = require('body-parser');

const getErrorCode = (err) => {
  if (err.type === 'NotFoundError') return `${err.objectName}.notFound.error`;
  if (err.type === 'ValidationError') return `${err.objectName}.validation.error`;
  if (err.type === 'NotAuthorizedError') return 'authorization.invalid.error';
  // no deberia entrar aqui porque siempre se deberia lanzar una clase que herede de ApiError (ApiError es abstracta)
  return 'request.error';
};

const getErrorBody = (err) => {
  if (err.type === 'NotFoundError') {
    return Object.keys(err.data).map((key) => {
      const dataValue = err.data[key];

      const code = typeof dataValue === 'object' && dataValue !== null && 'code' in dataValue
        ? dataValue.code : 'notFound';
      const value = typeof dataValue === 'object' && dataValue !== null && 'value' in dataValue
        ? dataValue.value : dataValue;

      return {
        // se envia para posterior uso opcional de i18n en el cliente
        code: `${err.objectName}.${key}.${code}.error`,
        field: key,
        value,
      };
    });
  }

  if (err.type === 'ValidationError') {
    return err.data.map((fieldError) => {
      return {
        // se envia para posterior uso opcional de i18n en el cliente
        code: `${err.objectName}.${fieldError.field}.${fieldError.code}.error`,
        field: fieldError.field,
        ...(
          Array.isArray(fieldError.args) && fieldError.args.length > 0
            ? { value: fieldError.args[0] } : {}
        ),
        ...(!Array.isArray(fieldError.args) ? { value: fieldError.args } : {}),
      };
    });
  }

  if (err.type === 'NotAuthorizedError') {
    return [{
      code: 'authorization.token.invalid.error',
      field: 'token',
      // TODO: deberia devolver el token
      value: this.data.length > 0 ? this.data[0] : null,
    }];
  }

  // no deberia entrar aqui porque siempre se deberia lanzar una clase que herede de ApiError (ApiError es abstracta)
  return [];
};

const defaultConfig = {
  error: {
    codes: {
      NotAuthorizedError: 401,
      ValidationError: 400, // cambiando el error de validacion por defecto: de 412 a 400
    },
    renderer: (err) => {
      return {
        // si es un ApiError tiene la propiedad "type", caso contrario es un error de ejecución: 500
        code: 'type' in err ? getErrorCode(err) : 'server.error',
        numberCode: 'numberCode' in err ? err.numberCode : 400,
        message: err.message,
        errors: getErrorBody(err),
      };
    },
  },
  globalMiddleware: [
    bodyParser.json({ limit: '50mb' }),
    bodyParser.urlencoded({ extended: false }),
  ],
};

module.exports = {
  development: {
    ...configJs.development,
    ...defaultConfig,
    database: configJson.development,
  },
  test: {
    ...configJs.test,
    ...defaultConfig,
    database: configJson.test,
  },
  production: {
    ...configJs.production,
    ...defaultConfig,
    database: configJson.production,
  },
};

