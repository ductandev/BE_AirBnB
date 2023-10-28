#!/bin/bash/
start=$(date +'%s')
echo "Begin!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"

echo "Begin install systems"

sudo docker rm -f cons-be
sleep 2

sudo docker rmi -f img-be
sleep 2

echo "bat dau thoi gian:$start"
end=$(date +'%s')
echo "ket thuc thoi gian:$end"