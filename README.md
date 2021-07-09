# AA-Coop-Tracker

Installation:

1. Transfer transfer and unzip the files to your server
2. Move or download your vanilla (or modded) server into the Tracker directory - NOTE THAT THIS CAN AFFECT THE FILE PATH THAT OTHER PROGRAMS MAY USE
3. Either rename your server folder to Vanilla 1.(verision), or using edit the second line of the parser.js file in the server directory
  a. Open the file, either in a text editor or IDE, or using the nano command in the command line
  b. Change the value of the folder variable on the second line to the name of your server folder
4. Install Nodejs in your server by running sudo apt install nodejs 
5. Make sure you open your server's firewall at the port that the website runs on (Default port is 80, but can be changed in the first line of parser.js)


Usage:

1. Enter the Tracker directory
3. Run the following commands to install nodejs libraries 
  a. sudo apt install npm
  b. sudo apt install zip
  b. sudo npm install express 
  c. sudo npm install socket.io 
  d. sudo npm install serve-favicon 
  e. sudo npm install ejs
4. OPTIONAL - Set up the tracker.service file to run the website on boot
  a. sudo mv tracker.service /etc/systemd/system
  b. sudo nano /etc/systemd/system/tracker.service
  c. change YOUR_PASSWORD_HERE to a password of your choice
  d. The default file pathing for the service is /var/minecraft/Tracker(Version) in accordance with https://github.com/Civitello/MCSRS, but if you are using the website only, you can change the pathing to whatever file path is correct for you
5. Run sudo node ./server/parser.js
6. Visit your server ip in your web browser
  a. If you change the port variable in the first line of your parser.js file, you can access the website by visiting yourserverip:port
7. When you play in your server, whenever the game saves by running /save-all, or by stopping the server, the webpage can be reloaded to display the advancements and subrcriteria completed.

Project Credits:

Tips, Formatting, and Favicon: Members of the AAdv Coop Discord: https://discord.gg/2bVR4xuCQG

Images: DarwinBaker/CTM's Singleplayer AAdv Tool: https://github.com/DarwinBaker/AATool

Contant me on Discord: and_penguin#7114
