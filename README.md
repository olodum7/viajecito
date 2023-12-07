![logo](/Front/public/viajecito-logo.png)

🌍 _Un Proyecto Integrador de Certified Tech Developer, una  iniciativa educativa co-creada por Digital House, Mercado Libre y Globant._

## Descripción

Viajecito permite a los viajeros explorar y reservar tours que capturan la esencia de diversas culturas y destinos. Desarrollado con pasión por estudiantes de Certified Tech Developer, este sitio es el primer paso para una aventura inolvidable, proporcionando un sistema de reservas fácil de usar y una gestión administrativa eficiente.

## Tecnologías 🛠️

- **Frontend**: React con Vite, estilizado con Bootstrap 5.
- **Backend**: SpringBoot, Maven, contenedorizado con Docker.
- **Base de Datos**: MySQL, gestionada en Docker y AWS EC2.
- **Almacenamiento**: AWS S3 para imágenes y contenido estático.
- **Despliegue**: GitHub Actions con runners en AWS EC2.

## Documentación de la API 📄

Consulta la documentación completa y prueba los endpoints de la API a través de Swagger UI:

[Swagger UI](http://34.207.134.182:8089/swagger-ui/index.html)

## Instalación 🚀

```bash
# Clonar repositorio
git clone https://github.com/olodum7/viajecito
# Frontend
cd viajecito/Front
npm install
npm run dev
# Backend
# Abrir con IntelliJ, resolver dependencias con Maven y lanzar.
```

## Uso 🖥️

![Página de Inicio](/Front/public/viajecito-home.png)

Navega a través de una variedad de categorías y descubre tours que se alinean con tus intereses. El sistema de reservas es intuitivo, facilitando la selección y confirmación de tus planes de viaje.

## Infraestructura 🌐

El proceso de CI/CD de Viajecito está automatizado con GitHub Actions y aprovecha la robusta infraestructura de AWS.

- **GitHub Actions**: Al realizar un push al branch principal, se activan los workflows definidos para el despliegue automático del backend y el frontend.
  - `build-backend`: Construye la imagen de Docker del backend a partir del `Dockerfile`, y luego la sube a Docker Hub.
  - `build-frontend`: Ejecuta `npm run build` para preparar el build de producción y lo despliega en un bucket S3 destinado al hosting del frontend.
  - `deploy-backend`: Toma la imagen del backend de Docker Hub y la despliega en un contenedor de Docker que se ejecuta en una instancia de Amazon EC2 dedicada a la API.

- **AWS S3**: Se utilizan dos buckets de S3:
  - Un bucket para alojar el build del frontend y servir el contenido estático a los usuarios.
  - Otro bucket para almacenar las imágenes que son cargadas en los tours, las cuales son referenciadas en la base de datos.

- **Amazon EC2**: Se emplean dos instancias de EC2:
  - Una para ejecutar el contenedor de Docker que aloja la base de datos MySQL, aislada dentro de una VPC para seguridad adicional.
  - Otra para ejecutar el contenedor de Docker que aloja la API del backend.

- **MySQL**: La base de datos corre en su propio contenedor en una de las instancias EC2 y almacena toda la información necesaria para el funcionamiento de Viajecito, incluyendo los datos de los tours y reservas.

![Diagrama de Infraestructura](/Front/public/viajecito-diagrama-infraestructura.png)

Esta infraestructura está diseñada para asegurar la escalabilidad, la eficiencia y la seguridad en el despliegue.

## Colaboradores 🤝

- Camila Fortunato
- Emanuel Espinel
- Francisco Rodríguez
- Franco Fantoni
- Juan Araujo
- Karen García
- Richard Gonzalez
- Soledad Caudana