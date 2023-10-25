#!/bin/bash

git fetch --all

 for branch in $(git branch -r | grep -v '\->'); do
  
   git branch --track "${branch#origin/}" "$branch"
     done

# Descripción:
# - 'git fetch --all' clona al  ultimo commit de todas las ramas remotas.
# - El 'for'  loopea  las ramas remotas y crea ramas en mirror locales que fetcheadas  a las ramas remotas.
