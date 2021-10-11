# crontab 자동 적용
# sudo crontab -e
# 30 2 * * Sun /home/ec2-user/renew_ssl_ami.sh

sudo docker run -it --rm --name certbot \
            -v "/etc/letsencrypt:/etc/letsencrypt" \
            -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
            -p 80:80 \
            -p 443:443 \
            certbot/certbot renew