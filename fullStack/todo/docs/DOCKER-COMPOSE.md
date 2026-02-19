# Guide Docker Compose

Ce document explique le fichier `docker-compose.yml` à la racine du projet, qui orchestre les services **frontend** et **backend** ensemble.

---

## Vue d'ensemble

```yaml
version: "3.9"

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3001:80"
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
```

### Services

| Service | Image | Port hôte | Port conteneur | Description |
|---|---|---|---|---|
| `frontend` | Buildée depuis `frontend/Dockerfile` | 3001 | 80 | React + Nginx |
| `backend` | Buildée depuis `backend/Dockerfile` | 3000 | 3000 | Express.js |

---

## Explication des directives

### `build.context`

Définit le dossier racine envoyé au daemon Docker lors du build. Tous les chemins dans le `Dockerfile` sont relatifs à ce contexte.

- `./frontend` → le `Dockerfile` peut accéder à `react/` et `nginx/`
- `./backend` → le `Dockerfile` peut accéder à `index.js`, `package.json`, etc.

### `build.dockerfile`

Nom du `Dockerfile` à utiliser dans le contexte. Ici `Dockerfile` dans les deux cas (valeur par défaut, mais explicite pour la clarté).

### `ports`

Format `"hôte:conteneur"`. Docker transfère le trafic du port de la machine locale vers le port exposé dans le conteneur.

```
"3001:80"   →  localhost:3001  ──►  conteneur frontend:80  (Nginx)
"3000:3000" →  localhost:3000  ──►  conteneur backend:3000 (Express)
```

### `depends_on`

Garantit que le service `backend` est **démarré** avant le service `frontend`. Cela ne garantit pas que le backend est **prêt** à recevoir des requêtes (pour cela, il faudrait ajouter un `healthcheck`).

---

## Utilisation

### Premier démarrage

```bash
# Construire les images et démarrer les conteneurs
docker compose build
docker compose up -d
```

Ou en une seule commande :

```bash
docker compose up -d --build
```

### Vérifier que les conteneurs tournent

```bash
docker compose ps
```

Exemple de sortie attendue :

```
NAME                    STATUS    PORTS
grafikart-frontend-1    running   0.0.0.0:3001->80/tcp
grafikart-backend-1     running   0.0.0.0:3000->3000/tcp
```

### Accéder aux services

| Service | URL |
|---|---|
| Frontend (React) | http://localhost:3001 |
| Backend (API) | http://localhost:3000 |

### Suivre les logs

```bash
docker compose logs -f             # Tous les services
docker compose logs -f frontend    # Frontend uniquement
docker compose logs -f backend     # Backend uniquement
```

### Arrêter les conteneurs

```bash
docker compose down          # Arrête et supprime les conteneurs
docker compose stop          # Arrête sans supprimer
docker compose start         # Redémarre des conteneurs arrêtés
```

### Supprimer les images en plus des conteneurs

```bash
docker compose down --rmi all
```

### Redémarrer un seul service

```bash
docker compose restart frontend
docker compose restart backend
```

---

## Via le Makefile

Les cibles Makefile sont des raccourcis des commandes ci-dessus :

```bash
make docker-build      # docker compose build
make docker-up         # docker compose up -d
make docker-down       # docker compose down
make docker-logs       # docker compose logs -f
make docker-restart    # docker-down + docker-up
```

---

## Réseau interne

Docker Compose crée automatiquement un réseau bridge privé entre les services. Les services peuvent se joindre par leur **nom de service** comme hostname :

```
http://backend:3000/api/auth/login
```

> Pour que le frontend appelle le backend via ce nom interne, les requêtes doivent passer par le serveur (SSR ou proxy Nginx). Les appels depuis le navigateur utilisent toujours `localhost:3000` car ils s'exécutent hors du réseau Docker.

---

## Structure des fichiers concernés

```
.                          ← racine du projet
├── docker-compose.yml     ← orchestration des services
├── frontend/
│   ├── Dockerfile         ← image du frontend (React + Nginx)
│   └── nginx/
│       └── default.conf   ← configuration Nginx
└── backend/
    └── Dockerfile         ← image du backend (Express) — à créer
```

---

## Prérequis

- **Docker** ≥ 24
- **Docker Compose** v2 (intégré à Docker Desktop ou `docker compose` plugin)

Vérifier les versions installées :

```bash
docker --version
docker compose version
```
