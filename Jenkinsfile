pipeline {
    agent any

    environment {
        IMAGE = "venkatpokala594/travel-app"
        TAG = "${BUILD_NUMBER}"
        DOCKER_CREDS = credentials('dockerhub-creds')
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/venkatpokala594/travel-app-devops.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t $IMAGE:$TAG .
                docker tag $IMAGE:$TAG $IMAGE:latest
                '''
            }
        }

        stage('Push Image to DockerHub') {
            steps {
                sh '''
                echo $DOCKER_CREDS_PSW | docker login -u $DOCKER_CREDS_USR --password-stdin
                docker push $IMAGE:$TAG
                docker push $IMAGE:latest
                '''
            }
        }

        stage('Deploy Container (Local Test)') {
            steps {
                sh '''
                docker rm -f travel-app || true
                docker run -d -p 5000:5000 --name travel-app $IMAGE:$TAG
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                sleep 10
                curl http://localhost:5000/flights
                '''
            }
        }
    }

    post {
        success {
            echo "✅ CI/CD Pipeline SUCCESS - App Deployed"
        }
        failure {
            echo "❌ Pipeline FAILED - Check Logs"
        }
    }
}
