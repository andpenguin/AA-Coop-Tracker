const port = "80" //Port for connecting to the website
var folder = "minecraft" //Minecraft Folder name
var password = "password" // Value of the password to acess the admin dashboard
//Importing JS libraries for file reading, server launching, and favicon
var express = require('express');
var app = express();
var server = require("http").createServer(app);
const favicon = require('serve-favicon');
var io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});
const fs = require("fs");
const child = require("child_process");

var authorized = false // Shows when acess to the admin dashboard is allowed
var download = false // When downloading access is allowed
var resetting = true // When the resetting process is running

app.set('view engine', 'ejs') // Initializes ejs library
app.use(favicon('./views/favicon.ico')) // Displays favicon image file
app.use(express.static('public'))

app.get("/", (req, res) => { // Renders the front page when a user loads into the main domain
    res.render("front");
});

app.get("/admin", (req, res) => { // Renders the Admin Dashboard when a user connects to the /admin page
    if (authorized) { // If access is allowed
        res.render("admin") // Display the page
        authorized = false // Removes access to other users
    } else { // If acess to the admin page is not authorized
        res.status(404).render("404err") // Display the 404 error page
    }
});

app.get("/world", (req, res) => { // Downloads the world when the /world page is accessed
    fs.readFile(process.cwd() + '/world.zip', (err) => { // Check if the .zip file is there already
        if (err || !download) { // If the file does not exist, or downloading access is not authorized
            res.status(404).render("404err") // Display the 404 error page
        } else { // If access is allowed, and the file exists 
            res.download(process.cwd() + "/world.zip") // Download it to the client
            download = false // Remove access
        }
    });
});

app.use(function(req, res, next) { // If any other page is accessed
    res.status(404).render("404err") // Display the 404 error page
});

server.listen(port, () => { // Start listening for clients when the server is launched
    console.log("Server is running at Port: " + port) // log the server port
    if (process.argv[2] = "-p" && process.argv.length > 3) // Check for custom password args
        password = process.argv[3]
    if (process.argv[4] = "-f" && process.argv.length > 5) // Check for custom folder args
        folder = process.argv[5]
});

io.on("connection", (socket) => { // When a client connects
    loadAdvancements(socket) // Send them the latest advancements
    console.log("New client: " + socket.handshake.address + " connected") // Log the new client connecting
    socket.on("ping", () => { // When the server is pinged to check the status of resetting
        socket.emit("pong", resetting) // send the resetting status
    });
    socket.on("zip", () => { // When the server is pinged to download the world file into a zip
        try { // Attempt to download the world
            child.execSync('zip -r ' + process.cwd() + '/world.zip *', { // Download the file to cwd/world.zip
                cwd: process.cwd() + '/' + folder + '/world'
            });
        } catch { // If the world file does not exist
            console.log("No World Found") // Log the error
        }
        download = true // Allow Downloading access to the zipped file
    });
    socket.on("reset", (toggle) => { // When toggle reset button is pressed
        try {
            if (!toggle) { // If it is toggled off
                child.execSync('sudo systemctl stop mcreset') // Stop the automatic resetting
                child.execSync('sudo systemctl disable mcreset') // Prevent it from enabling on reboots
                child.execSync('sudo systemctl start crash') // Start the crash prevention instead
                resetting = false // Mark the resetting status as off
            }
        } catch { // If the commands don't work
            resetting = false // Resetting must not exist, therefore it is off
        }
    });
    socket.on("password", (pass) => { // If the server is pinged to check the client's password attempt
        if (pass === password) { // Check the attempt against the saved password
            authorized = true // Allow access to the admin dashboard page
            socket.emit("authorize") // Bring the client to that page
        }
    });
});

var advancementlist = [ //list of advancements
    "minecraft:story/obtain_armor",
    "minecraft:story/lava_bucket",
    "minecraft:story/deflect_arrow",
    "minecraft:story/iron_tools",
    "minecraft:story/mine_stone",
    "minecraft:story/enter_the_nether",
    "minecraft:story/upgrade_tools",
    "minecraft:story/cure_zombie_villager",
    "minecraft:story/form_obsidian",
    "minecraft:story/smelt_iron",
    "minecraft:story/shiny_gear",
    "minecraft:story/enchant_item",
    "minecraft:story/follow_ender_eye",
    "minecraft:story/mine_diamond",
    "minecraft:story/enter_the_end",

    "minecraft:nether/obtain_crying_obsidian",
    "minecraft:nether/distract_piglin",
    "minecraft:nether/all_potions",
    "minecraft:nether/create_beacon",
    "minecraft:nether/brew_potion",
    "minecraft:nether/explore_nether",
    "minecraft:nether/ride_strider",
    "minecraft:nether/all_effects",
    "minecraft:nether/get_wither_skull",
    "minecraft:nether/obtain_blaze_rod",
    "minecraft:nether/loot_bastion",
    "minecraft:nether/charge_respawn_anchor",
    "minecraft:nether/return_to_sender",
    "minecraft:nether/find_bastion",
    "minecraft:nether/obtain_ancient_debris",
    "minecraft:nether/create_full_beacon",
    "minecraft:nether/summon_wither",
    "minecraft:nether/fast_travel",
    "minecraft:nether/use_lodestone",
    "minecraft:nether/uneasy_alliance",
    "minecraft:nether/find_fortress",
    "minecraft:nether/netherite_armor",

    "minecraft:end/kill_dragon",
    "minecraft:end/dragon_egg",
    "minecraft:end/levitate",
    "minecraft:end/find_end_city",
    "minecraft:end/enter_end_gateway",
    "minecraft:end/respawn_dragon",
    "minecraft:end/elytra",
    "minecraft:end/dragon_breath",

    "minecraft:husbandry/tame_an_animal",
    "minecraft:husbandry/fishy_business",
    "minecraft:husbandry/bred_all_animals",
    "minecraft:husbandry/tactical_fishing",
    "minecraft:husbandry/silk_touch_nest",
    "minecraft:husbandry/obtain_netherite_hoe",
    "minecraft:husbandry/plant_seed",
    "minecraft:husbandry/balanced_diet",
    "minecraft:husbandry/safely_harvest_honey",
    "minecraft:husbandry/breed_an_animal",
    "minecraft:husbandry/complete_catalogue",
    "minecraft:husbandry/ride_a_boat_with_a_goat",
    "minecraft:husbandry/wax_on",
    "minecraft:husbandry/wax_off",
    "minecraft:husbandry/axolotl_in_a_bucket",
    "minecraft:husbandry/kill_axolotl_target",
    "minecraft:husbandry/make_a_sign_glow",

    "minecraft:adventure/very_very_frightening",
    "minecraft:adventure/sniper_duel",
    "minecraft:adventure/bullseye",
    "minecraft:adventure/two_birds_one_arrow",
    "minecraft:adventure/whos_the_pillager_now",
    "minecraft:adventure/shoot_arrow",
    "minecraft:adventure/arbalistic",
    "minecraft:adventure/summon_iron_golem",
    "minecraft:adventure/sleep_in_bed",
    "minecraft:adventure/kill_all_mobs",
    "minecraft:adventure/voluntary_exile",
    "minecraft:adventure/totem_of_undying",
    "minecraft:adventure/kill_a_mob",
    "minecraft:adventure/adventuring_time",
    "minecraft:adventure/hero_of_the_village",
    "minecraft:adventure/trade",
    "minecraft:adventure/throw_trident",
    "minecraft:adventure/honey_block_slide",
    "minecraft:adventure/ol_betsy",
    "minecraft:adventure/lightning_rod_with_villager_no_fire",
    "minecraft:adventure/spyglass_at_parrot",
    "minecraft:adventure/spyglass_at_ghast",
    "minecraft:adventure/spyglass_at_dragon",
    "minecraft:adventure/walk_on_powder_snow_with_leather_boots",
];

function isDone(playerid, advancement, socket, player) {
    fs.readFile("./" + folder + "/world/advancements/" + playerid + ".json", "utf8", (err, jsonString) => { // Reads the advancements file of the player
        if (err) {} else { // If the file exists
            try { // try to find the advancement in that file
                var doc = JSON.parse(jsonString) // object version of the .json file in array form
                var data = [ // values to be transmitted to client
                    advancement, // the advancement
                    doc[advancement].done, // whether it is completed or not
                    Object.keys(doc[advancement].criteria).length, // how many criteria have been finished
                    Object.keys(doc[advancement].criteria), // the criteria that have been finished
                    player // The name of the player
                ]
                socket.emit("data", data) // send the data to the client
                let time = new Date() // Get the time
                now = "Last Updated: " + time.getUTCHours() + ":" + time.getUTCMinutes() + ":" + time.getUTCSeconds() + " UTC"
                socket.emit("time", now) // send it
            } catch { // If the advancement isn't found
                var data = [ // Data to send to the client
                    advancement,
                    false
                ]
                socket.emit("data", data) // Send the data to the client
                let time = new Date() // Get the time
                now = "Last Updated: " + time.getUTCHours() + ":" + time.getUTCMinutes() + ":" + time.getUTCSeconds() + " UTC"
                socket.emit("time", now) // send it
            }
        }
    });
}

/* Checks if a Trident or Enchanted Golden Apple Have been picked up
    @param playerid - the uuid of the player file being checked
    @param socket - the client to send the data to
*/
function items(playerid, socket) {
    fs.readFile("./" + folder + "/world/stats/" + playerid + ".json", "utf8", (err, jsonString) => { // Reads stats file of the player
        if (err) {} else { // if the stats file is found
            try {
                var doc = JSON.parse(jsonString) // Read it as an object
                var trident = doc["stats"]["minecraft:picked_up"]["minecraft:trident"] > 0 // If a trident has been obtained
                var god_apple = doc["stats"]["minecraft:picked_up"]["minecraft:enchanted_golden_apple"] > 0 // If an enchanted golden apple has been obtained
                var data = [ // Data to send to the client
                    trident,
                    god_apple
                ]
                socket.emit("items", data) // Send the data
            }
            catch { // if there is no stats file
                var data = [ // They have not picked up the items
                    false, false
                ]
                socket.emit("items", data) // Send the data
            }
        }
    });
}

/* Reads the time played of a given player
    @param playerid - the uuid of the player file being read
    @param socket - the client to send the data to
*/
function igt(playerid, socket) { // Send the time played
    fs.readFile("./" + folder + "/world/stats/" + playerid + ".json", "utf8", (err, jsonString) => { // Reads the stats file of the player
        if (err) {} else { // If the file exists
            try {
                let ticks = JSON.parse(jsonString).stats["minecraft:custom"]["minecraft:play_time"] // Read the time played in the file
                let sec = ticks / 20 // convert ticks to total seconds
                let hours = Math.floor(sec / 3600) // get hours played
                let minutes = Math.floor((sec - (hours * 3600)) / 60) // get minutes played
                let seconds = sec - (hours * 3600) - (minutes * 60) //  get seconds played
                seconds = seconds.toString().substring(0, 2)
                if (hours < 10) { // formatting
                    hours = "0" + hours
                }
                if (minutes < 10) {
                    minutes = "0" + minutes
                }
                if (seconds < 10) {
                    seconds = "0" + seconds
                }
                data = [ // data to send to the client
                    parseInt(hours),
                    parseInt(minutes),
                    parseInt(seconds),
                    hours + ':' + minutes + ':' + seconds
                ]
                socket.emit("igt", data) // Return is HH : MM : SS
            } catch {}
        }
    });
}

/* Main function that loads the advancements, time, and items to the client
    @param socket - client to send all data to
*/
function loadAdvancements(socket) { // goes through each advancement of each player and logs if it is done
    var players = [] // reset the players array to empty (will be needed when a check is run multiple times)
    var uuids = []
    fs.readFile("./" + folder + "/usercache.json", "utf-8", (err, jsonString) => { // open the player list file
        if (err) {} else {
            try {
                const data = JSON.parse(jsonString) // read the file
                for (i = 0; i < data.length; i++) { // loop from 0 to # of players in the file
                    uuids[i] = data[i].uuid // adds the player uuid from the file to the players array
                    players[i] = data[i].name
                }
            } catch {
                console.log("File parsing failed") //error protection
            }
        }
        for (x = 0; x < uuids.length; x++) { // for each player
            for (i = 0; i < advancementlist.length; i++) { // go through each advancement
                isDone(uuids[x], advancementlist[i], socket, players[x]) // check if it is done
            }
            igt(uuids[x], socket) // Send the in game time
            items(uuids[x], socket) // Send the items picked up results
        }
    });
}