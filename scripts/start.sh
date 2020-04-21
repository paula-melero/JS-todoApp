#!/bin/bash
export NODE_ENV=production
export jwtPrivateKey=1234

# RANDOM_STR=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 4 | head -n 1)
# DIRS=~/todoapp-*
# mkdir ~/todoapp-$RANDOM_STR
# TO_DELETE=~/todoapp-!("$RANDOM_STR")
# if ((${#DIRS[@]})); then
#     echo "Reached condition"
#      rm -rm ~/todoapp-*
# fi

cd home/todoapp
npm install
npm start &