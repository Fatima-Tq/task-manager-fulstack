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
                sh 'sudo docker compose build'
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Purane containers down karke naye versions live kiye ja rahe hain...'
                sh 'sudo docker compose down'
                sh 'sudo docker compose up -d'
            }
        }
    }

    post {
        always {
            echo 'Jenkins storage clean karne ke liye workspace clear kiya ja raha hai...'
            cleanWs()
        }
        success {
            echo '🎉 Mubarak ho! Project Jenkins ke zariye successfully deploy ho gaya hai.'
        }
        failure {
            echo '❌ Pipeline fail ho gayi. Console output check karein.'
        }
    }
}
