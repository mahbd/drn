It seems I'm unable to access the provided URLs. However, I can still help you write a README file based on the information you've shared about the Disaster Response Network (DRN) project. Below is a template you can use or modify as needed.

---

# Disaster Response Network (DRN)

A comprehensive platform for disaster preparedness, response, and recovery in Bangladesh.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

The **Disaster Response Network (DRN)** is a platform designed to improve disaster management by providing real-time alerts, AI-powered assistance, and optimized resource allocation. The platform includes both an Android app and a web interface.

## Features

- Real-time disaster alerts
- AI-powered chatbot for assistance
- Resource allocation optimization
- Incident reporting and volunteer management
- Real-time mapping with location tracking
- Evacuation route mapping
- Multilingual support for global collaboration
- Donation system

## Technology Stack

- **Frontend**: Next.js with DaisyUI
- **Backend**: Spring Boot
- **Database**: PostgreSQL
- **Mobile App**: Android (Java)
- **APIs**:
  - Google Maps (Location Services)
  - Google AI Studio
  - Google Speech Recognition

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mahbd/drn.git
   ```
2. Navigate to the project directory:
   ```bash
   cd drn
   ```
3. Install frontend dependencies:
   ```bash
   npm install
   ```
4. Install backend dependencies:

   ```bash
   mvn clean install
   ```

5. Set up PostgreSQL database:

   ```bash
   CREATE DATABASE db_name; # Replace db_name with the name in application.properties
   CREATE USER drn_admin WITH ENCRYPTED PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE drn_db TO drn_admin;
   ```

6. Configure environment variables for the backend:

   - Set database credentials, API keys, and other configurations in `.env`.

7. Start the project:
   - **Frontend**:
     ```bash
     npm run dev
     ```
   - **Backend**:
     ```bash
     java -jar target/user-service-0.0.1-SNAPSHOT.jar
     java -jar target/alert-service-0.0.1-SNAPSHOT.jar
     java -jar target/api-gateway-0.0.1-SNAPSHOT.jar
     java -jar target/chatbot-service-0.0.1-SNAPSHOT.jar
     java -jar target/donation-service-0.0.1-SNAPSHOT.jar
     java -jar target/others-service-0.0.1-SNAPSHOT.jar
     ```

## Usage

Once the installation is complete, you can access the platform via:

- **Web**: Open `http://localhost:3000` for the web interface.
- **Android**: Install the Android app to receive disaster alerts on the go.

## Contributing

We welcome contributions to the DRN project! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add feature"
   ```
4. Push to your forked repository:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Let me know if you'd like to modify or add anything to this template!
