#!/bin/bash
start=$(date +'%s')
echo "Begin!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"

echo "Begin install systems"



# docker exec -it cons-be bash -c 'git pull && exit' && docker restart cons-be
sudo docker exec -it cons-be bash
sleep 1
sudo git pull
sleep 1
sudo exit
sleep 1
sudo docker restart cons-be
sleep 1


echo "bat dau thoi gian:$start"
end=$(date +'%s')
echo "ket thuc thoi gian:$end"
