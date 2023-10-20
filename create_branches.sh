#!/bin/bash

branches=("emmanuel" "camila" "karen" "Backend" "Frontend" "backup" "fcisco" "franco" "juan" "richard" "soledad")

for branch in "${branches[@]}"
do
    git branch "$branch"
done
