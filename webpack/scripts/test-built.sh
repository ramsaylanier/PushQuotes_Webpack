#!/bin/sh

cd ../dist
if [ ! -d bundle ]
then
  tar -xvf meteor.tar.gz
  (cd bundle/programs/server && npm install)
fi
cd bundle
echo Starting meteor at localhost:3000
env PORT=3000 ROOT_URL=http://localhost MONGO_URL=mongodb://localhost:27017/meteor-webpack-react node main.js