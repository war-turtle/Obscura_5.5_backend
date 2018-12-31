# sudo snap install kubectl --classic
# pip install awscli
# wget https://github.com/kubernetes/kops/releases/download/1.10.0/kops-linux-amd64
# chmod +x kops-linux-amd64
# sudo mv kops-linux-amd64 /usr/local/bin/kops
# kops get cluster
# kops export kubecfg --name ${KOPS_CLUSTER_NAME}

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t warturtle/obscura6-backend:latest -t warturtle/obscura6-backend:$SHA .
docker push warturtle/obscura6-backend:latest
docker push warturtle/obscura6-backend:$SHA

# kubectl apply -f kubernetes
# kubectl set image deployment/backend-deployment server=warturtle/obscura6-backend:$SHA