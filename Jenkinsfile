pipeline {
    agent { 
        node { 
            label 'build-ref' 
        }
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: "10"))
    }

    tools {
        maven 'Maven 3'
        nodejs 'NodeJS Latest'
    }

    stages {
        stage('Build with SonarQube analysis') {
            steps {
                withSonarQubeEnv('Sonar') {
                    sh "mvn -B -P jenkins clean install sonar:sonar"
                 }
            }
        }
        stage("Quality Gate") {
            steps {
                timeout(time: 2, unit: 'HOURS') {
                    // Parameter indicates whether to set pipeline to UNSTABLE if Quality Gate fails
                    // true = set pipeline to UNSTABLE, false = don't
                    waitForQualityGate abortPipeline: true
                }
            }
        }
	}

	post {
		always {
			step([$class: 'ClaimPublisher'])
	    }
	    failure {
			script {
                if (currentBuild.currentResult == 'FAILURE') { // Other values: SUCCESS, UNSTABLE
                    // Send an email only if the build status has changed from green/unstable to red
                    emailext subject: '$DEFAULT_SUBJECT',
                        body: '$DEFAULT_CONTENT',
                        recipientProviders: [
                            [$class: 'CulpritsRecipientProvider'],
                            [$class: 'DevelopersRecipientProvider'],
                            [$class: 'RequesterRecipientProvider']
                        ], 
                        replyTo: '$DEFAULT_REPLYTO',
                        to: '$DEFAULT_RECIPIENTS'
                }
            }
	    }
    }
}