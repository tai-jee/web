# my personal site (taijee.xyz)

this is the repository for my personal site, taijee.xyz. i plan to switch the
domain to match my new alias at some point but right now i simply cannot be
bothered.

it's built partially as a dumping ground for thoughts and partially as something
to work on to keep my attention-deficit brain occupied.

it uses the astro framework to build the site, which is then self-hosted on my
craptop-cum-server via nginx and a cloudflare tunnel.

feel free to clone the repo and adapt it for your own use, ion care. i'll
probably end up making another website entirely anyway in about three months'
time when i forget about this one.

## building the site

after cloning the repo, set the `TUNNEL_TOKEN` environment variable in .env to
your tunnel's token... obviously. set your tunnel route's service url to
http://site:80.

docker compose will then build the site and start running the tunnel with
cloudflared.

```bash
git clone https://github.com/tai-jee/web.git
cd web
echo "TUNNEL_TOKEN=ey..." > .env
docker compose up -d
```
