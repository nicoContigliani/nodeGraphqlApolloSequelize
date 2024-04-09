#!/bin/bash

models_folder="./models/"

for file in $models_folder/*.js; do
  if [ -f "$file" ]; then
    class_code=$(grep -oPz '(?<=class ).*?(?=extends)' "$file" | tr -d '\0' | awk '{$1=$1};1')
    echo "$class_code"
  fi
done