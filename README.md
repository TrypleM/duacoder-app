<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


# Duacoders

## Preparación del entorno

Es requisito contar con MySQL instalado y configurado con una base de datos denominada `duacodersdb`. Además, se necesita un usuario con el nombre `duacoder` y la contraseña `P4SSw0rD123` que tenga los privilegios necesarios para acceder a dicha base de datos.

## Preparación del proyecto

1. Clonar proyecto

2. Instalar las dependencias
```yarm install```

3. Clonar el archivo ```.env.example``` y renombrarlo a ```.env```

4. Levantar el proyecto: ```yarn start:dev```

## Utilización de la aplicación

Para poder utilizar la aplicación se deberá tener un usuario creado, para ello se puede utilizar el end-point de:
```
http://localhost:3000/auth/register
```

Todas las peticiones a la App (menos el registro, el login y la documentación de swagger) deben tener un Bearer Token de usuario.

Puede verse la documentación de Swagger en el end-point:
```
http://localhost:3000/api
```

La documentación de postman se encuentra en la carpeta ```documentation/postman/Duacoders.postman_collection.json```