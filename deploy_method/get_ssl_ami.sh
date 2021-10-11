export DOMAIN="test.kuuwang.com"

sudo docker run -it --rm --name certbot \
            -v "/etc/letsencrypt:/etc/letsencrypt" \
            -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
            -p 80:80 \
            -p 443:443 \
            certbot/certbot certonly -d $DOMAIN --agree-tos --email shellcodesniper@gmail.com --non-interact --standalone


# ssl 파일들 위치 
# /etc/letsencrypt/live/YOUR_WEBSITE_HERE/cert.pem
# /etc/letsencrypt/live/YOUR_WEBSITE_HERE/fullchain.pem
# /etc/letsencrypt/live/YOUR_WEBSITE_HERE/privkey.pem