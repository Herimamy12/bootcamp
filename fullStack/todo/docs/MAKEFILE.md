# Guide du Makefile

Le `Makefile` à la racine du projet centralise toutes les tâches courantes : installation, développement, build, lint, Docker et nettoyage.

## Prérequis

- **GNU Make** ≥ 3.81
- **Node.js** ≥ 22 et **npm** ≥ 10
- **Docker** et **Docker Compose** (pour les cibles `docker-*`)

## Afficher l'aide

```bash
make help
```

Affiche la liste de toutes les cibles disponibles avec leur description.

---

## Catégories de cibles

### Installation

Installe les dépendances npm de chaque sous-projet en utilisant `npm ci` (installation déterministe depuis `package-lock.json`).

```bash
make install             # Frontend + Backend
make install-frontend    # Frontend uniquement (frontend/react/)
make install-backend     # Backend uniquement  (backend/)
```

---

### Développement

Lance les serveurs en mode développement. La cible `dev` démarre le frontend et le backend **en parallèle** via `make -j2`.

```bash
make dev             # Frontend (Vite) + Backend (Node) en parallèle
make dev-frontend    # Vite dev server — http://localhost:5173
make dev-backend     # Express server  — http://localhost:3000
```

> Le frontend s'ouvre automatiquement dans le navigateur si configuré dans Vite.

---

### Build

Compile le frontend pour la production (vérification TypeScript + bundle Vite optimisé). Le résultat est placé dans `frontend/react/dist/`.

```bash
make build             # Build du frontend
make build-frontend    # Identique à make build
make build-backend     # Vérifie la syntaxe de backend/index.js (node --check)
```

---

### Qualité du code

```bash
make lint       # Lance ESLint sur le frontend
make preview    # Build le frontend puis lance vite preview — http://localhost:4173
```

> `preview` sert à tester le build de production localement avant de déployer.

---

### Docker

Raccourcis autour de `docker compose`. Assurez-vous d'avoir buildé les images avant de les démarrer.

```bash
make docker-build      # Construit les images Docker (frontend + backend)
make docker-up         # Démarre les conteneurs en arrière-plan (-d)
make docker-down       # Arrête et supprime les conteneurs
make docker-logs       # Suit les logs en temps réel (Ctrl-C pour quitter)
make docker-restart    # docker-down puis docker-up
```

Workflow typique pour un premier lancement :

```bash
make docker-build
make docker-up
make docker-logs
```

---

### Nettoyage

Supprime les dossiers générés (`node_modules`, `dist`) pour repartir d'un état propre.

```bash
make clean              # Frontend + Backend
make clean-frontend     # Supprime frontend/react/node_modules et frontend/react/dist
make clean-backend      # Supprime backend/node_modules
```

---

## Variables internes

| Variable | Valeur par défaut | Rôle |
|---|---|---|
| `FRONTEND_DIR` | `frontend/react` | Chemin vers le projet React |
| `BACKEND_DIR` | `backend` | Chemin vers le projet Express |

Ces variables peuvent être surchargées en ligne de commande :

```bash
make build FRONTEND_DIR=mon/autre/chemin
```

---

## Flux de travail recommandés

### Démarrage du projet (première fois)

```bash
make install
make dev
```

### Avant un commit

```bash
make lint
make build
```

### Déploiement via Docker

```bash
make docker-build
make docker-up
make docker-logs
```

### Repartir de zéro

```bash
make clean
make install
```
