#!/bin/bash
export NODE_ENV=production
export jwtPrivateKey=1234
cp /home/todoapp /home/apps/todoapp
cd /home/apps/todoapp
npm install
npm start &