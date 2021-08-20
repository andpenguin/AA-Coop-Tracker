# AA-Coop-Tracker
<img width="1436" alt="Screen Shot 2021-08-19 at 10 16 04 PM" src="https://user-images.githubusercontent.com/71165067/130183018-c9116a3a-f11c-460c-a0c2-281fbc64eeb8.png">

##What does the AA Coop Tracker do?

The AA Coop Tracker reads advancements in your server (which save every 5 minutes, or on /save-all, not on hitting escape like in singleplayer) compiles all players completed ones, and displays them on a website acessible to anyone with the server ip.

It also has bonus features that help with managing runs in the Admin Dashboard such as downloading your world file remotely, and controlling when your server should reset worlds (https://github.com/Civitello/MCSRS)

##Contributions:

If you would like to contribute any suggestions, Contact me on Discord: and_penguin#7114. I'll consider adding new features by popular demand, so just tell me if you want something new

If you want to support me and the project, any contributions to my PayPal are greatly appreciated. The project will always be free and open source, but any donations are extremely welcome, and will get your name added to the bottom of everyone's trackers.

##Automatic Installation

Using the trackerserver_installation.sh script, installating the combo of the multi instance resetting server and the tracker at once (which are designed to go hand in hand as the tracker has controls that manage the resetting), installation as of v1.2.0 is now super simple! (Scripts for 1.17 are coming soon)

Just open up an Ubuntu server, and run these four commands:
sudo wget -O installer.sh https://github.com//andpenguin/AA-Coop-Tracker/releases/download/v1.2.0-beta/trackerserver_installation.sh
sudo chown ubuntu installer.sh
chmod +x installer.sh
./installer.sh

The installation will prompt you to edit server.properties to your desired settings, after which you can save and exit the file
Similarly, when it opens tracker.service change the value after "-p" (YOUR_PASSWORD_HERE) to your desired admin password, and after "-f" (YOUR_FOLDER_HERE) to the name of your MC server folder (in the case of automatic installation, it will be "minecraft" as is default with Fabric Servers)

Now, whenever you start up that server (or an image of it), the tracker, alongside the auto resetting MC servers will launch automatically!

#Speedrun Legality

As with CTM and other's trackers, this tool only reads the advancements and statistics files (as well as the list of players in usercache.json) which is allowed per speedrun.com rules. This program is not a mod, datapack, or client, and simply functions as an external server-side application.

It is also designed to help you follow the latest AA and AA coop rules by letting you download the world files into a .zip remotely through the click of 1 button

The Tracker has been used in several AA Coop WRs, and if moderators wish to ask questions about the code or intentions of the project as a whole, they are welcome to.

#Manual Installation:

1. Transfer the zip file to your server, and unzip it
2. Move or download your vanilla (or modded) server into the Tracker directory - NOTE THAT THIS CAN AFFECT THE FILE PATH THAT OTHER PROGRAMS MAY USE
3. Install Nodejs in your server by running sudo apt install nodejs, and then enter the tracker directory
4. Run the following commands to install nodejs libraries 
  a. sudo apt install npm
  b. sudo apt install zip
  c. sudo npm install express 
  d. sudo npm install socket.io 
  e. sudo npm install serve-favicon 
  f. sudo npm install ejs
5. OPTIONAL - Set up the tracker.service file to run the website on boot (allowing you to skip steps 1 and 2 of Usage)
  a. sudo mv tracker.service /etc/systemd/system
  b. sudo nano /etc/systemd/system/tracker.service
  c. change YOUR_PASSWORD_HERE to a password of your choice, and YOUR_FOLDER_HERE to the name of your MC server folder
  d. The default file pathing for the service is /var/minecraft/Tracker(Version) in accordance with https://github.com/Civitello/MCSRS, but if you are using the
  website only, you can change the pathing to whatever file path is correct for you
  e. sudo systemctl enable tracker
6. Make sure you open your server's firewall at the port that the website runs on (Default port is 80, but can be changed in the first line of parser.js)


#Manual Usage:

1. Enter the Tracker directory
2. Run sudo node ./server/parser.js -p [your passsword] -f [your mc folder name]
3. Visit your server ip in your web browser
  a. If you change the port variable in the first line of your parser.js file (to run more than one tracker / other websites), you can access the website by visiting yourserverip:port
4. When you play in your server, whenever the game saves by running /save-all, or by stopping the server, the webpage can be reloaded to display the advancements and subrcriteria completed.

Project Credits:

Tips, Formatting, and Favicon: Members of the AAdv Coop Discord: https://discord.gg/2bVR4xuCQG

Images: DarwinBaker/CTM's Singleplayer AAdv Tool: https://github.com/DarwinBaker/AATool
