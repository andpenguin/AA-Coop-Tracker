#!/bin/bash
sudo apt -y update && sudo apt -y install default-jre screen
sudo apt install openjdk-16-jre openjdk-16-jre
sudo mkdir /usr/games/minecraft
cd /usr/games/minecraft
sudo wget https://maven.fabricmc.net/net/fabricmc/fabric-installer/0.7.3/fabric-installer-0.7.3.jar
sudo java -jar fabric-installer-0.7.3.jar server -mcversion 1.16.1 -downloadMinecraft
sudo java -Xmx14G -Xms14G -jar fabric-server-launch.jar nogui
sudo chown ubuntu eula.txt
echo "eula=true" > eula.txt
cd mods
https://cdn.modrinth.com/data/gvQqBUqZ/versions/mc1.17.1-0.7.4/lithium-fabric-mc1.17.1-0.7.4.jar
https://cdn.modrinth.com/data/H8CaAYZC/versions/Starlight%201.0.0%201.17.x/starlight-1.0.0+fabric.73f6d37.jar
https://github.com/astei/krypton/releases/download/v0.1.4/krypton-0.1.4.jar
https://cdn.modrinth.com/data/hvFnDODi/versions/0.1.2/lazydfu-0.1.2.jar
cd ..
sudo nano server.properties
cd ..
sudo git clone https://github.com/Tiiffi/mcrcon.git
cd mcrcon
sudo apt install make
sudo apt install gcc
sudo make
sudo make install
sudo groupadd -r minecraft
sudo useradd -r -g minecraft -d "/var/minecraft" -s "/bin/bash" minecraft
sudo mkdir /var/minecraft
sudo cp -r /usr/games/minecraft /var/minecraft/minecraft
cd /var/minecraft
sudo chown minecraft.minecraft -R /var/minecraft/
cd /etc/systemd/system
sudo wget https://raw.githubusercontent.com/Civitello/MCSRS/main/mcreset.service
sudo wget https://raw.githubusercontent.com/Civitello/MCSRS/main/minecraft.service
sudo sed -i 's/ReadWriteDirectories=\/var\/minecraft\/minecraft/ReadWriteDirectories=\/var\/minecraft\/Tracker1.16\/minecraft/' mcreset.sh
sudo sed -i 's/WorkingDirectory=\/var\/minecraft\/minecraft/WorkingDirectory=\/var\/minecraft\/Tracker1.16\/minecraft/' mcreset.shsudo wget https://raw.githubusercontent.com/andpenguin/AA-Coop-Tracker/main/crash.service
cd /var/minecraft
sudo wget https://raw.githubusercontent.com/Civitello/MCSRS/main/mcreset.sh
sudo sed -i 's/MC_FOLDER="\/var\/minecraft\/minecraft"/MC_FOLDER="\/var\/minecraft\/Tracker1.16\/minecraft"/' mcreset.sh
sudo chmod +x mcreset.sh
sudo wget https://raw.githubusercontent.com/andpenguin/AA-Coop-Tracker/main/crash.sh
sudo chmod +x crash.sh
sudo wget -O tracker.zip https://github.com/andpenguin/AA-Coop-Tracker/releases/download/v1.2.1-beta/Tracker1.17v1.2.1-beta.zip
sudo apt install zip
sudo unzip tracker.zip
sudo rm tracker.zip
sudo mv minecraft Tracker1.17
sudo apt install nodejs
cd Tracker1.17
sudo apt install npm
sudo apt install zip
sudo npm install express
sudo npm install socket.io
sudo npm install serve-favicon
sudo npm install ejs
sudo mv tracker.service /etc/systemd/system
sudo nano /etc/systemd/system/tracker.service
sudo systemctl enable tracker
sudo systemctl daemon-reload
sudo systemctl enable mcreset
sudo reboot now