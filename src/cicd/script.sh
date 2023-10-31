#!/bin/bash
docker exec -it cons-be bash -c 'git pull && exit' && docker restart cons-be