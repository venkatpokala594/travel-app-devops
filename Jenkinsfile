pipeline {
    agent any

    environment {
        IMAGE = "sureshdevops/travel-app"
        TAG = "${BUILD_NUMBER}"
        DOCKER_CREDS = credentials('dockerhub-creds')
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/your-username/travel-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $IMAGE:$TAG ."
            }
        }

        stage('Push Image') {
            steps {
                sh """
                echo $DOCKER_CREDS_PSW | docker login -u $DOCKER_CREDS_USR --password-stdin
                docker push $IMAGE:$TAG
                """
            }
        }

        stage('Run Container (Test Deploy)') {
            steps {
                sh """
                docker stop travel-app || true
                docker rm travel-app || true
                docker run -d -p 5000:5000 --name travel-app $IMAGE:$TAG
                """
            }
        }
    }
}