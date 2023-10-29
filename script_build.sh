#!/bin/bash
start=$(date +'%s')
echo "Begin!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"

echo "Begin install systems"


sudo chmod 777 script.sh

sudo docker rm -f cons-be
sleep 2

sudo docker rmi -f img-be
sleep 2

sudo apt  install docker.io 
sleep 2

sudo docker run -d -e MYSQL_ROOT_PASSWORD=1234 -p 3309:3306 --name mysql-be mysql
sleep 2

sudo docker build . -t img-be
sleep 2

sudo docker run -d -p 8080:8080 -e DATABASE_URL=mysql://root:1234@206.189.84.20:3306/bt_airbnb?schema=public --name cons-be img-be
sleep 2

sudo apt install docker-compose
sleep 2

sudo docker-compose -f docker-compose-nginx.yml up -d
sleep 2


echo "bat dau thoi gian:$start"
end=$(date +'%s')
echo "ket thuc thoi gian:$end"
