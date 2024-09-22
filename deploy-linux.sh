#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# check project structure
if [ ! -d "$DIR/microservices" ]; then
    echo "Microservices folder not found. Exiting..."
    exit 1
fi
if [ ! -d "$DIR/frontend" ]; then
    echo "Frontend folder not found. Skipping front-end deploy..."
    exit 1
else
  # check if node 20 installed
  if ! command -v node &> /dev/null
  then
      echo "Node 20 not found, installing..."
      sudo apt-get install -y curl
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
      source ~/.bashrc
      nvm install 20
      nvm use 20
      npm install -g npm@latest
      sudo apt-get install -y nodejs
  else
      echo "Node 20 found. Building frontend..."
  fi
  # install dependencies if cd fails then echo error
  cd "$DIR/frontend" || { echo "cd frontend failed"; exit 1; }
  npm install
  npm run build
  # check if drn-frontend service exists
  if [ ! -f "/etc/systemd/system/drn-frontend.service" ]; then
      echo "Creating drn-frontend service..."
      FRONT_DIR=$(pwd)
      sudo cp "$DIR/frontend/drn-frontend.service" /etc/systemd/system/
      # replace $USER$ $NODE_PATH$ and $DIR$ in drn-frontend.service
      sudo sed -i "s|#USER#|$USER|g" /etc/systemd/system/drn-frontend.service
      sudo sed -i "s|#NPM_PATH#|$(which npm)|g" /etc/systemd/system/drn-frontend.service
      sudo sed -i "s|#DIR#|$FRONT_DIR|g" /etc/systemd/system/drn-frontend.service

      sudo systemctl enable drn-frontend
      sudo systemctl start drn-frontend
      echo "Status of drn-frontend service:"
      sudo systemctl status drn-frontend
  else
      echo "drn-frontend service already exists. Restarting..."
      sudo systemctl restart drn-frontend
      echo "Status of drn-frontend service:"
      sudo systemctl status drn-frontend
  fi
fi
# check if mvn is installed
if ! command -v mvn &> /dev/null
then
    echo "Maven not found, installing..."
    sudo apt-get install -y maven
else
    echo "Maven found."
fi
if ! command -v java &> /dev/null
then
    echo "Java 21 not found, installing..."
    sudo apt-get install -y openjdk-21-jdk
else
    echo "Java 21 found. Building microservices..."
fi
microservices=$(find "$DIR/microservices" -mindepth 1 -maxdepth 1 -type d 2>/dev/null)
# check if there are any microservices
if [ -z "$DIR/microservices" ]; then
    echo "No microservices found. Exiting..."
    exit 1
fi
# loop through each microservice
JAVA_PATH=$(which java)
for microservice in $microservices; do
    # get microservice name
    microservice_name=$(basename "$microservice")
    # if microservice folder does not contain name.service file, skip
    if [ ! -f "$microservice/$microservice_name.service" ]; then
        echo "$microservice_name service file not found. Skipping..."
        continue
    fi
    echo "Deploying $microservice_name..."
    cd $microservice
    mvn clean install
    # get microservice jar
    JAR_PATH=$(find "$microservice/target" -name "*.jar")
    # check if microservice has a systemd service
    if [ ! -f "/etc/systemd/system/$microservice_name.service" ]; then
        echo "Creating $microservice_name service..."
        sudo cp "$microservice/$microservice_name.service" /etc/systemd/system/
        # replace $USER$ $JAVA_PATH$ and $JAR_PATH$ in $microservice_name.service
        sudo sed -i "s|#DIR#|$microservice|g" /etc/systemd/system/"$microservice_name".service
        sudo sed -i "s|#USER#|$USER|g" /etc/systemd/system/"$microservice_name".service
        sudo sed -i "s|#JAVA_PATH#|$JAVA_PATH|g" /etc/systemd/system/"$microservice_name".service
        sudo sed -i "s|#JAR_PATH#|$JAR_PATH|g" /etc/systemd/system/"$microservice_name".service

        sudo systemctl enable "$microservice_name"
        sudo systemctl start "$microservice_name"
        echo "Status of $microservice_name service:"
        sudo systemctl status "$microservice_name"
    else
        echo "$microservice_name service already exists. Restarting..."
        sudo systemctl restart "$microservice_name"
        echo "Status of $microservice_name service:"
        sudo systemctl status "$microservice_name"
    fi
done
