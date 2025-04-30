#!/bin/bash

echo "👉 1. Suppression du fichier .env du suivi Git..."
git rm --cached .env

echo "👉 2. Ajout du .env au .gitignore (si pas déjà présent)..."
if ! grep -q "^.env$" .gitignore; then
  echo ".env" >> .gitignore
  git add .gitignore
fi

echo "👉 3. Commit des changements..."
git commit -m "Remove .env file from Git tracking and add to .gitignore"

echo "👉 4. Nettoyage terminé. Préparation du push forcé..."

echo "⚡ ATTENTION : Tu vas écraser l'ancien historique sur GitHub."
read -p "Veux-tu continuer (y/n)? " confirm
if [ "$confirm" = "y" ]; then
  git push origin main --force
  echo "✅ Push forcé effectué. Pense à régénérer ta clé Stripe !"
else
  echo "❌ Opération annulée."
fi
