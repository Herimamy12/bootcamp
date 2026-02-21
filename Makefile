.PHONY: help \
        install install-frontend install-backend \
        dev dev-frontend dev-backend \
        build build-frontend build-backend \
        lint preview \
        docker-build docker-up docker-down docker-logs docker-restart \
        clean clean-frontend clean-backend

# Répertoires
FRONTEND_DIR := frontend/react
BACKEND_DIR  := backend

##@ Aide

help: ## Affiche cette aide
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<cible>\033[0m\n"} \
	/^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-22s\033[0m %s\n", $$1, $$2 } \
	/^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) }' $(MAKEFILE_LIST)

##@ Installation

install: install-frontend install-backend ## Installe toutes les dépendances

install-frontend: ## Installe les dépendances du frontend
	npm ci --prefix $(FRONTEND_DIR)

install-backend: ## Installe les dépendances du backend
	npm ci --prefix $(BACKEND_DIR)

##@ Développement

dev: ## Lance le frontend et le backend en parallèle
	@$(MAKE) -j2 dev-frontend dev-backend

dev-frontend: ## Lance le serveur de développement Vite
	npm run dev --prefix $(FRONTEND_DIR)

dev-backend: ## Lance le serveur Express
	node $(BACKEND_DIR)/index.js

##@ Build

build: build-frontend ## Build tous les projets

build-frontend: ## Build le frontend (TypeScript + Vite)
	npm run build --prefix $(FRONTEND_DIR)

build-backend: ## Vérifie la syntaxe du backend (node --check)
	node --check $(BACKEND_DIR)/index.js

##@ Qualité

lint: ## Lint le frontend
	npm run lint --prefix $(FRONTEND_DIR)

preview: build-frontend ## Build puis prévisualise le frontend avec Vite
	npm run preview --prefix $(FRONTEND_DIR)

##@ Docker

docker-build: ## Build les images Docker
	docker compose build

docker-up: ## Lance les conteneurs en arrière-plan
	docker compose up -d

docker-down: ## Arrête et supprime les conteneurs
	docker compose down

docker-logs: ## Affiche les logs des conteneurs (Ctrl-C pour quitter)
	docker compose logs -f

docker-restart: docker-clean docker-up ## Redémarre tous les conteneurs

docker-clean: docker-down ## Arrête les conteneurs et supprime les volumes associés
	docker compose down -v
	docker system prune -af

##@ Nettoyage

clean: clean-frontend clean-backend ## Supprime tous les artefacts

clean-frontend: ## Supprime node_modules et dist du frontend
	rm -rf $(FRONTEND_DIR)/node_modules $(FRONTEND_DIR)/dist

clean-backend: ## Supprime node_modules du backend
	rm -rf $(BACKEND_DIR)/node_modules

clean-volumes: ## Supprime les volumes Docker (attention, données perdues)
	docker volume prune -f
	sudo rm -rf ./data

fclean: docker-clean clean-volumes ## Nettoie tout, y compris les volumes Docker

##@ Relances tout
re: fclean docker-up
