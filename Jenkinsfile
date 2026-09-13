pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Git repository se latest code pull ho raha hai...'
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Docker Compose ke zariye frontend aur backend images fresh build ho rahi hain...'
                sh ' docker compose build'
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Purane containers down karke naye versions live kiye ja rahe hain...'
                sh ' docker compose down'
                sh ' docker compose up -d'
            }
        }
    }

    post {
        always {
            echo 'Jenkins storage clean karne ke liye workspace clear kiya ja raha hai...'
            cleanWs()
        }
        success {
            echo 'CONGRATS! Project IS SUCCESSFULLY DEPLOYED USING JENKINS.'
        }
        failure {
            echo '❌ Pipeline FAIL, CHECK CONSOLE OUTPUT.'
        }
    }
}
