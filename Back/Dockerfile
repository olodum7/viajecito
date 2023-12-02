FROM eclipse-temurin:17-jdk-alpine
WORKDIR /api
COPY /api/target/api-0.0.1-SNAPSHOT.jar viajecito-api.jar
EXPOSE 8089
CMD ["java","-jar","viajecito-api.jar"]