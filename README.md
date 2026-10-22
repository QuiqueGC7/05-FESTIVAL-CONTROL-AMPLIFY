# FESTIVAL CONTROL · React Native + Expo Web + Amplify Gen 2

Demo para la charla de AWS Amplify. Mantiene la identidad visual del cuaderno 04-PILARES-SERVERLESS: fondo `#090909`, cards `#151515`, acento `#FF2F92`, confirmado `#39D98A` y retrasado `#F5C542`. El backend Amplify Gen 2 guarda eventos en DynamoDB mediante una API de AWS AppSync.

## Inicio rápido

Terminal 1 (necesita credenciales de AWS):
```bash
npm install
npx expo install --fix
npm run sandbox
```

Terminal 2:
```bash
npm run web
```

`ampx sandbox` necesita credenciales AWS configuradas y genera `amplify_outputs.json`, que conecta la aplicación con el backend. Ese archivo se ignora en Git; Amplify lo genera también durante el despliegue. Para cerrar el sandbox al terminar, pulsa `Ctrl+C` en el terminal 1.

## Datos y acceso

El modelo `FestivalEvent` permite crear, consultar, actualizar y eliminar eventos con artista, escenario, hora y estado. Los datos se almacenan en AWS y se conservan al recargar la aplicación.

Esta demo usa una clave API pública de 30 días y permite que cualquiera con la URL y la clave lea, cree, edite y elimine eventos. No uses este modo para datos privados o una aplicación real; configura autenticación y reglas de autorización antes de publicar datos sensibles.

## Exportación para AWS Amplify Hosting

```bash
npm run build:web
```

El resultado estático se genera en `dist/`. En Amplify Hosting, conecta el repositorio y la rama (por ejemplo `main`) y usa `amplify.yml`. La fase backend despliega el backend Gen 2 con `ampx pipeline-deploy`; el rol de despliegue de Amplify debe tener permisos para aprovisionar los recursos del backend. La configuración del API se genera antes de compilar el frontend.

## Prueba de alumno

1. Abrir **Eventos**. La primera vez la lista estará vacía.
2. Crear `TECHNO TITANS`, escenario `MAIN STAGE`, hora `21:45` y estado `CONFIRMED`.
3. Recargar la página y comprobar que el evento sigue guardado.
4. Editarlo, cambiar la hora a `23:00`, probar el cambio de estado y eliminarlo.

## Referencia docente

https://github.com/albertohdezakkari/04-PILARES-SERVERLESS
