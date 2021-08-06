# AA-Coop-Tracker

Installation:

1. Transfer the zip file to your server, and unzip it
2. Move or download your vanilla (or modded) server into the Tracker directory - NOTE THAT THIS CAN AFFECT THE FILE PATH THAT OTHER PROGRAMS MAY USE
3. Install Nodejs in your server by running sudo apt install nodejs 
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


Usage:

1. Enter the Tracker directory
2. Run sudo node ./server/parser.js -p [your passsword] -f [your mc folder name]
3. Visit your server ip in your web browser
  a. If you change the port variable in the first line of your parser.js file (to run more than one tracker / other websites), you can access the website by visiting yourserverip:port
4. When you play in your server, whenever the game saves by running /save-all, or by stopping the server, the webpage can be reloaded to display the advancements and subrcriteria completed.

Project Credits:

Tips, Formatting, and Favicon: Members of the AAdv Coop Discord: https://discord.gg/2bVR4xuCQG

Images: DarwinBaker/CTM's Singleplayer AAdv Tool: https://github.com/DarwinBaker/AATool

Contact me on Discord: and_penguin#7114
