FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY mvnw mvnw.cmd pom.xml ./
COPY .mvn .mvn
RUN ./mvnw dependency:go-offline

# ⬅️ Must copy resources *before* building so data.sql gets inside the jar
COPY src ./src

RUN ./mvnw package -DskipTests

COPY target/backend-0.0.1-SNAPSHOT.jar .

CMD ["java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]
