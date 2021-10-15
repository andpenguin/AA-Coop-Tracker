#!/bin/bash
while true
do
service minecraft status | grep 'active (running)' > /dev/null 2>&1

if [ $? != 0 ]
then
        sudo service minecraft restart > /dev/null
fi
done
