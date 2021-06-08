# AA-Coop-Tracker

Installation:

1. Transfer transfer and unzip the files to your server
2. Move or download your vanilla (or modded) server into the Tracker directory
3. Either rename your server folder to Vanilla 1.(verision), or using edit the second line of the parser.js file in the server directory
  a. Open the file, either in a text editor or IDE, or using the nano command in the command line
  b. Change the value of the folder variable on the second line to the name of your server folder
4. Install Nodejs in your server machine (steps may vary based on OS)
5. Make sure you open your server's firewall at the port that the website runs on (Default port is 80, but can be changed in the first line of parser.js)


Usage:

1. Enter the Tracker directory
2. Run node ./server/parser.js
3. Visit your server ip in your web browser
  a. If you change the port variable in the first line of your parser.js file, you can access the website by visiting yourserverip:port
4. When you play in your server, whenever the game saves by running /save-all, or by stopping the server, the webpage can be reloaded to display the advancements and subrcriteria completed.

Project Credits:

Tips and Formatting: Members of the AAdv Coop Discord: https://discord.gg/2bVR4xuCQG

Images: DarwinBaker/CTM's Singleplayer AAdv Tool: https://github.com/DarwinBaker/AATool
