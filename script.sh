#!/bin/bash
start=$(date +'%s')
echo "Begin!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"

echo "Begin install systems"

# sudo docker rm -f cons-be
# sleep 2

# sudo docker rmi -f img-be
# sleep 2

# sudo docker build . -t img-be
# sleep 2

# sudo docker run -d -p 8080:8080 -e DATABASE_URL=mysql://root:1234@143.198.84.117:3306/bt_airbnb?schema=public --name cons-be img-be
# sleep 2



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
