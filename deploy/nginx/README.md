# ai-gateway.cmcu.edu.vn on Ubuntu/Debian

The Docker Compose service must listen on `127.0.0.1:20128`, with
`BASE_URL=https://ai-gateway.cmcu.edu.vn` and `AUTH_COOKIE_SECURE=true`.

After the domain points to this server and inbound ports 80 and 443 are open:

```bash
sudo apt-get update
sudo apt-get install -y nginx snapd
sudo cp deploy/nginx/ai-gateway.cmcu.edu.vn.conf /etc/nginx/sites-available/ai-gateway.cmcu.edu.vn
sudo ln -sfn /etc/nginx/sites-available/ai-gateway.cmcu.edu.vn /etc/nginx/sites-enabled/ai-gateway.cmcu.edu.vn
sudo nginx -t
sudo systemctl enable --now nginx
sudo systemctl reload nginx

sudo snap install --classic certbot
sudo ln -sfn /snap/bin/certbot /usr/local/bin/certbot
sudo certbot --nginx -d ai-gateway.cmcu.edu.vn --redirect
sudo certbot renew --dry-run
```

Certbot edits the installed Nginx site to add the certificate and HTTPS redirect.
Its package sets up automatic renewal; `renew --dry-run` verifies that path.
