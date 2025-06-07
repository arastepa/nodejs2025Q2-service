# Build PostgreSQL image
docker build -t your-dockerhub-username/postgres:latest -f Dockerfile.postgres .

# Build application image
docker build -t your-dockerhub-username/home-library-app:latest -f Dockerfile .

# Scan images for vulnerabilities
docker scan your-dockerhub-username/postgres:latest
docker scan your-dockerhub-username/home-library-app:latest