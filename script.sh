#!/bin/bash
start=$(date +'%s')
echo "Begin!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"

echo "Begin install systems"


docker exec -it cons-be bash -c 'git pull && exit' && docker restart cons-be


echo "bat dau thoi gian:$start"
end=$(date +'%s')
echo "ket thuc thoi gian:$end"
