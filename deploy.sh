# curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
# chmod +x ./kubectl
# sudo mv ./kubectl /usr/local/bin/kubectl
# pip install awscli
# wget https://github.com/kubernetes/kops/releases/download/1.10.0/kops-linux-amd64
# chmod +x kops-linux-amd64
# sudo mv kops-linux-amd64 /usr/local/bin/kops
# kops get cluster
# kops export kubecfg --name ${KOPS_CLUSTER_NAME}

sudo apt install gnupg

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build --build-arg pass_phrase=$PASS_PHRASE -t warturtle/obscura6-backend:latest -t warturtle/obscura6-backend:$SHA .
docker push warturtle/obscura6-backend:latest
docker push warturtle/obscura6-backend:$SHA

gpg --batch --yes --passphrase ${PASS_PHRASE} -o obscura.pem -d obscura.pem.gpg
sudo chmod 400 obscura.pem
ssh -o "StrictHostKeyChecking no" -i obscura.pem ubuntu@www.obscuranitkkr.co.in sudo docker service update --image warturtle/obscura6-backend:$SHA backend
# kubectl apply -f kubernetes
# kubectl set image deployment/backend-deployment backend=warturtle/obscura6-backend:$SHA