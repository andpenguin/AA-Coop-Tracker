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
sudo wget https://github.com/mrmangohands/krypton/releases/download/mc1.16.1-0.1.3-SNAPSHOT%2B2021-02-20/krypton-1.16.1-backport-0.1.3-SNAPSHOT+2021-02-20.jar
sudo wget  https://github.com/CaffeineMC/lithium-fabric/releases/download/mc1.16.1-0.5.1/lithium-fabric-mc1.16.1-0.5.1.jar
sudo wget https://github.com/PaperMC/Starlight/releases/download/1.0.0-RC2/starlight-fabric-1.0.0-RC2-1.16.x.jar
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
sed -i '20s/.*/ReadWriteDirectories=/var/minecraft/Tracker1.16/minecraft/' minecraft.service
sed -i '21s/.*/WorkingDirectory=/var/minecraft/Tracker1.16/minecraft/' minecraft.service
sudo wget https://raw.githubusercontent.com/andpenguin/AA-Coop-Tracker/main/crash.service
cd /var/minecraft
sudo wget https://raw.githubusercontent.com/Civitello/MCSRS/main/mcreset.sh
sed -i '2s/.*/MC_FOLDER="/var/minecraft/Tracker1.16/minecraft"/' mcreset.sh
sudo chmod +x mcreset.sh
sudo wget https://raw.githubusercontent.com/andpenguin/AA-Coop-Tracker/main/crash.sh
sudo chmod +x crash.sh
sudo wget -O tracker.zip https://github.com/andpenguin/AA-Coop-Tracker/releases/download/v1.2.0-beta/Tracker1.16v1.2.0-beta.zip
sudo apt install zip
sudo unzip tracker.zip
sudo rm tracker.zip
sudo mv minecraft Tracker1.16
sudo apt install nodejs
cd Tracker1.16
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
