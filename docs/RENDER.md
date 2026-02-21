# Deploiement sur Render

Ce guide explique comment deployer l'application Todo sur **Render** (base de donnees PostgreSQL + backend Express + frontend React).

---

## Architecture sur Render

```
┌─────────────────────────────────────────────────────┐
│                      Render                         │
│                                                     │
│  ┌──────────────┐    ┌──────────────────────────┐   │
│  │  Static Site │    │     Web Service           │   │
│  │  (Frontend)  │───>│     (Backend API)         │   │
│  │  React/Vite  │    │     Express + Prisma      │   │
│  └──────────────┘    └──────────┬───────────────┘   │
│                                 │                    │
│                      ┌──────────▼───────────────┐   │
│                      │     PostgreSQL            │   │
│                      │     (Managed DB)          │   │
│                      └──────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

**3 services Render :**

| Service         | Type          | Description                          |
|-----------------|---------------|--------------------------------------|
| `todo-db`       | PostgreSQL    | Base de donnees managee par Render   |
| `todo-backend`  | Web Service   | API Express.js (Docker)              |
| `todo-frontend` | Static Site   | Application React buildee par Vite   |

---

## Fichiers crees / modifies

### 1. `render.yaml` (nouveau)

Le **Blueprint** Render. Ce fichier definit toute l'infrastructure en code (IaC).
Render le detecte automatiquement a la racine du repo et propose de creer les services.

```yaml
databases:
  - name: todo-db        # PostgreSQL manage
services:
  - type: web            # Backend (Docker)
    name: todo-backend
  - type: web            # Frontend (Static Site)
    name: todo-frontend
    env: static
```

**Points importants :**
- `fromDatabase` injecte automatiquement la `DATABASE_URL` dans le backend
- `generateValue: true` genere un `JWT_SECRET` aleatoire et securise
- `sync: false` indique qu'une variable doit etre configuree manuellement apres le deploiement
- Les `routes` avec rewrite `/* -> /index.html` sont necessaires pour React Router (SPA)
- Les `headers` definissent le cache : pas de cache sur le HTML, cache long sur les assets

### 2. `backend/index.js` (modifie)

**Avant :**
```js
const port = 3000;
app.use(cors());
```

**Apres :**
```js
const port = process.env.PORT || 3000;
app.use(
  cors(
    process.env.CORS_ORIGIN
      ? { origin: process.env.CORS_ORIGIN, credentials: true }
      : undefined
  )
);
```

**Pourquoi :**
- **PORT dynamique** : Render assigne un port via la variable `PORT`. Le fallback `3000` conserve la compatibilite locale.
- **CORS configurable** : En production, on restreint les origines autorisees au domaine du frontend. Sans `CORS_ORIGIN`, le comportement reste permissif (dev local).

### 3. `frontend/react/src/config/api.ts` (nouveau)

```ts
export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";
```

**Pourquoi :**
- Centralise l'URL de l'API dans un seul fichier
- `VITE_API_URL` est une variable d'environnement Vite (prefixe `VITE_` obligatoire)
- En dev local, le fallback `http://localhost:3000` s'applique automatiquement
- En production, Render injecte la variable au moment du build

### 4. `frontend/react/src/contexts/AuthContext.tsx` (modifie)

**Avant :**
```ts
await fetch("http://localhost:3000/api/auth/login", { ... });
await fetch("http://localhost:3000/api/auth/signup", { ... });
```

**Apres :**
```ts
import { API_URL } from "../config/api";
// ...
await fetch(`${API_URL}/api/auth/login`, { ... });
await fetch(`${API_URL}/api/auth/signup`, { ... });
```

### 5. `frontend/react/src/pages/TodoList.tsx` (modifie)

Meme principe : les 4 appels `fetch` utilisent maintenant `API_URL` au lieu de `http://localhost:3000`.

---

## Etapes de deploiement

### Prerequis

- Un compte Render (gratuit : https://render.com)
- Le repo pousse sur GitHub ou GitLab

### Etape 1 : Connecter le repo

1. Se connecter sur https://dashboard.render.com
2. Cliquer sur **"New" > "Blueprint"**
3. Connecter le repo GitHub/GitLab
4. Render detecte le fichier `render.yaml` et affiche les services a creer
5. Cliquer sur **"Apply"**

### Etape 2 : Attendre le deploiement initial

Render va automatiquement :
- Creer la base de donnees PostgreSQL
- Builder et deployer le backend (Docker)
- Builder et deployer le frontend (Vite)

Le backend executera `prisma migrate deploy` au demarrage pour creer les tables.

### Etape 3 : Configurer les variables manuelles

Apres le premier deploiement, noter les URLs des services dans le dashboard Render.

#### Backend - `CORS_ORIGIN`

1. Aller dans le service `todo-backend` > **Environment**
2. Ajouter `CORS_ORIGIN` avec l'URL du frontend
   ```
   CORS_ORIGIN=https://todo-frontend.onrender.com
   ```
3. Sauvegarder (le service redemarrera)

#### Frontend - `VITE_API_URL`

1. Aller dans le service `todo-frontend` > **Environment**
2. Ajouter `VITE_API_URL` avec l'URL du backend
   ```
   VITE_API_URL=https://todo-backend.onrender.com
   ```
3. **Declencher un nouveau build** (necessaire car les variables Vite sont injectees au build)

### Etape 4 : Verifier

- Ouvrir l'URL du frontend (ex: `https://todo-frontend.onrender.com`)
- Creer un compte, se connecter, ajouter des todos
- Verifier les logs du backend dans le dashboard Render si besoin

---

## Variables d'environnement

| Variable        | Service  | Valeur                                    | Auto ? |
|-----------------|----------|-------------------------------------------|--------|
| `DATABASE_URL`  | Backend  | Connection string PostgreSQL              | Oui    |
| `JWT_SECRET`    | Backend  | Chaine aleatoire (64 chars)               | Oui    |
| `PORT`          | Backend  | Assigne par Render                        | Oui    |
| `CORS_ORIGIN`   | Backend  | URL du frontend (ex: `https://...`)       | Non    |
| `VITE_API_URL`  | Frontend | URL du backend (ex: `https://...`)        | Non    |

---

## Compatibilite locale

Toutes les modifications restent compatibles avec le developpement local :
- **Backend** : sans `PORT` ni `CORS_ORIGIN` dans l'environnement, le comportement est identique a avant (port 3000, CORS permissif)
- **Frontend** : sans `VITE_API_URL`, le fallback `http://localhost:3000` s'applique
- **Docker Compose** : `docker-compose.yml` n'est pas modifie et continue de fonctionner tel quel
