#!/bin/bash

echo "sudo docker build -f ./db/Dockerfile -t project315/psql ./db/"
sudo docker build -f ./db/Dockerfile -t project315/psql ./db/

echo "sudo docker container stop project315_psql && sudo docker container rm project315_psql"
sudo docker container stop project315_psql && sudo docker container rm project315_psql

echo "sudo docker run -p 5432:5432 -d --name project315_psql project315/psql"
sudo docker run -p 5432:5432 -d --name project315_psql project315/psql