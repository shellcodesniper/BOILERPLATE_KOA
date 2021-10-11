sudo amazon-linux-extras install docker -y
sudo systemctl enable docker && sudo systemctl start docker
sudo usermod -a -G docker ec2-user
docker info && sudo reboot