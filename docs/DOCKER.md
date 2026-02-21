# Guide Docker — Frontend

Ce document explique le `Dockerfile` du frontend React (`frontend/Dockerfile`) et la configuration Nginx associée (`frontend/nginx/default.conf`).

## Vue d'ensemble

Le build Docker du frontend utilise un **multi-stage build** en deux étapes :

```
Stage 1 : builder  →  Node.js 22 Alpine  →  npm ci + npm run build
Stage 2 : serve    →  Nginx Alpine       →  sert le dossier dist/
```

L'image finale **ne contient pas Node.js**, uniquement Nginx et les fichiers statiques compilés. Cela la rend légère et sécurisée.

---

## Dockerfile

```dockerfile
# --- Stage 1 : Build ---
FROM node:22-alpine AS builder

WORKDIR /app

COPY react/package*.json ./
RUN npm ci

COPY react/ .
RUN npm run build

# --- Stage 2 : Serve ---
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Stage 1 — `builder`

| Instruction | Rôle |
|---|---|
| `FROM node:22-alpine AS builder` | Image Node.js minimale (~60 Mo) nommée `builder` |
| `WORKDIR /app` | Répertoire de travail dans le conteneur |
| `COPY react/package*.json ./` | Copie uniquement les fichiers de dépendances en premier pour exploiter le **cache Docker** |
| `RUN npm ci` | Installation déterministe depuis `package-lock.json` |
| `COPY react/ .` | Copie ensuite tout le code source |
| `RUN npm run build` | Exécute `tsc -b && vite build` — génère le dossier `dist/` |

> **Astuce cache** : en copiant `package*.json` avant le code source, Docker ne réinstalle les dépendances que si ces fichiers changent.

### Stage 2 — `serve`

| Instruction | Rôle |
|---|---|
| `FROM nginx:alpine` | Image Nginx ultra-légère (~25 Mo) |
| `COPY --from=builder /app/dist ...` | Récupère uniquement le `dist/` du stage précédent |
| `COPY nginx/default.conf ...` | Applique la configuration Nginx personnalisée |
| `EXPOSE 80` | Déclare le port HTTP (documentation, non-contraignant) |
| `CMD [...]` | Lance Nginx en foreground (requis par Docker) |

---

## Configuration Nginx (`nginx/default.conf`)

```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript ...;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|...|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Points clés

**`try_files $uri $uri/ /index.html`**
Indispensable pour React Router. Sans cette ligne, un rechargement de page sur `/login` ou `/signup` renverrait une erreur 404 Nginx. Toute URL inconnue est renvoyée vers `index.html` pour que React Router gère le routage côté client.

**Cache des assets statiques**
Vite génère des noms de fichiers avec hash (`main.a3f2c1.js`). Ces fichiers ne changent jamais une fois générés, d'où un cache d'un an (`expires 1y`) avec l'en-tête `immutable` pour éviter toute revalidation.

**Gzip**
Compresse les réponses textuelles (JS, CSS, JSON) avant envoi au navigateur, réduisant significativement la taille des transferts.

---

## Utilisation

### Build manuel de l'image

Le contexte de build est le dossier `frontend/` (pas la racine du projet).

```bash
# Depuis la racine du projet
docker build -t grafikart-frontend ./frontend

# Vérifier la taille de l'image finale
docker images grafikart-frontend
```

### Démarrer le conteneur

```bash
docker run -d -p 3001:80 --name grafikart-frontend grafikart-frontend
```

L'application est accessible sur **http://localhost:3001**.

### Arrêter et supprimer le conteneur

```bash
docker stop grafikart-frontend
docker rm grafikart-frontend
```

### Inspecter les logs Nginx

```bash
docker logs grafikart-frontend
docker logs -f grafikart-frontend   # Suivi en temps réel
```

---

## Structure des fichiers concernés

```
frontend/
├── Dockerfile               # Multi-stage build
├── nginx/
│   └── default.conf         # Configuration du serveur Nginx
└── react/
    ├── package.json
    ├── package-lock.json
    ├── src/
    └── dist/                # Généré par npm run build (ignoré par git)
```

---

## Prérequis

- **Docker** ≥ 24
- Le dossier `frontend/` comme contexte de build
- **Aucun** Node.js local nécessaire pour builder l'image
