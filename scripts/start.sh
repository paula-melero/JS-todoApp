#!/bin/bash
export NODE_ENV=production
export jwtPrivateKey=1234

cd /home/todoapp
npm install
npm start > /dev/null 2> /dev/null < /dev/null &