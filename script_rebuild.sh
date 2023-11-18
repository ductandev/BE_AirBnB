#!/bin/bash
start=$(date +'%s')
echo "Begin!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"

echo "Begin install systems"




sudo docker rm -f cons-be
sleep 2

sudo docker rmi -f img-be
sleep 2



sudo docker build . -t img-be
sleep 2

sudo docker run -d -p 8080:8080 -e DATABASE_URL=mysql://root:123456@206.189.84.20:3306/bt_airbnb?schema=public --name cons-be img-be
sleep 2




echo "bat dau thoi gian:$start"
end=$(date +'%s')
echo "ket thuc thoi gian:$end"
