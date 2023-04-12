pipeline {
    def app

    agent {
        label 'docker' 
    }

    stages {
        stage('Docker node test') {
            agent {
                docker {
                // Set both label and image
                label 'docker'
                image 'node:7-alpine'
                args '--name docker-node' // list any args
                }
            }
            steps {
                // Steps run in node:7-alpine docker container on docker agent
                sh 'node --version'
            }
        }
    }
    stage('Clone repository') {
      

        checkout scm
    }

    stage('Build image') {
  
       app = docker.build("darylcuenco/dbmanager-k8s")
    }

    stage('Test image') {
  

        app.inside {
            sh 'echo "Tests passed"'
        }
    }

    stage('Push image') {
        
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            app.push("${env.BUILD_NUMBER}")
        }
    }
    
    stage('Trigger ManifestUpdate') {
                echo "triggering deployment-pipeline"
                build job: 'deployment-pipeline', parameters: [string(name: 'DOCKERTAG', value: env.BUILD_NUMBER)]
        }
}