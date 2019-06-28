## Introducción
Recupera los datos de firma digital de un pdf 
para ejecutar el server node (para desarrollo) se necesita 
node 10 y java 8 breydi .vasquez
## Ejecutar contenedor
Tener instalado docker y ejecutar
```
    docker build -t jpoma/validador-node .
    docker run --name node-validador -p 4000:4000 -d jpoma/validador-node
```
estara corriendo en el puerto 4000

## test

```
curl -X GET http://localhost:4000/api/v1/test/firmas
```

## api

```
curl -X POST 'http://localhost:4000/api/v1/firmas?formato=base64' -d '{"documento": "<BASE_64_DOCUMENTO_FIRMADO>"}'
```
