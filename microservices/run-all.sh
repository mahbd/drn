#!/bin/bash

if ! ss -tulpn | grep -q ':5432'; then
    echo -e "\e[31mPostgreSQL possibly not running. This script may fail.\e[0m"
fi
if [ -z "$POSTGRES_USER" ]; then
    echo -e "\e[31mPOSTGRES_USER environment variable is not set!\e[0m"
fi
if [ -z "$POSTGRES_PASSWORD" ]; then
    echo -e "\e[31mPOSTGRES_PASSWORD environment variable is not set!\e[0m"
fi
if [ -z "$JWT_SECRET_KEY" ]; then
    echo -e "\e[31mJWT_SECRET_KEY environment variable is not set. User service won't run!\e[0m"
fi

commands=(
  "cd user-service && mvn clean install && java -jar target/user-service-0.0.1-SNAPSHOT.jar"
  "cd alert-service && mvn clean install && java -jar target/alert-service-0.0.1-SNAPSHOT.jar"
  "cd api-gateway && mvn clean install && java -jar target/api-gateway-0.0.1-SNAPSHOT.jar"
  "cd chatbot-service && mvn clean install && java -jar target/chatbot-service-0.0.1-SNAPSHOT.jar"
  "cd donation-service && mvn clean install && java -jar target/donation-service-0.0.1-SNAPSHOT.jar"
  "cd others-service && mvn clean install && java -jar target/others-service-0.0.1-SNAPSHOT.jar"
)

for command in "${commands[@]}"; do
  gnome-terminal -- bash -c "$command" & 
done
