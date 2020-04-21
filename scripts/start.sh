#!/bin/bash
export NODE_ENV=production
export jwtPrivateKey=1234
cd /opt/codedeploy-agent/deployment-root/deployment-instructions/
rm -rf *-cleanup
cd /home/todoapp
npm install
npm start &