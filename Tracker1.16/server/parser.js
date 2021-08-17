const port = "80";
var folder = "vanilla1.16";
var password = "password"
const express = require('express');
const app = express();
const server = require("http").createServer(app);
const favicon = require('serve-favicon');
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});
const fs = require("fs");
const child = require("child_process");
var authorized = false
var download = false
var resetting = true

app.set('view engine', 'ejs');
app.use(favicon('./views/favicon.ico'));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("front");
});

app.get("/admin", (req, res) => {
    if (authorized) {
        res.render("admin");
        authorized = false
    } else {
        res.status(404).render("404err")
    }
});

app.get("/world", (req, res) => {
    fs.readFile(process.cwd() + '/world.zip', (err) => {
        if (err || !download) {
            res.status(404).render("404err")
        } else {
            res.download(process.cwd() + "/world.zip")
            download = false;
        }
    });
});

app.use(function(req, res, next) {
    res.status(404).render("404err");
});

server.listen(port, () => {
    console.log("Server is running at Port: " + port)
    if (process.argv[2] = "-p" && process.argv.length > 3)
        password = process.argv[3]
    if (process.argv[4] = "-f" && process.argv.length > 5)
        folder = process.argv[5]
});

io.on("connection", (socket) => {
    loadAdvancements(socket);
    console.log("New client: " + socket.handshake.address + " connected");

    socket.on("ping", () => {
        socket.emit("pong", resetting);
    });

    socket.on("zip", () => {
        try {
            child.execSync('zip -r ' + process.cwd() + '/world.zip *', {
                cwd: process.cwd() + '/' + folder + '/world'
            });
        } catch {
            console.log("No World Found");
        }
        download = true;
    });
    socket.on("reset", (toggle) => { // When toggle reset button is pressed
        try {
            if (!toggle) { // If it is toggled off
                child.execSync('sudo systemctl stop mcreset')
                child.execSync('sudo systemctl disable mcreset')
                resetting = false
            }
        } catch {
            resetting = false
        }
    });
    socket.on("password", (pass) => {
        if (pass === password) {
            authorized = true
            socket.emit("authorize")
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
    "minecraft:adventure/ol_betsy"
];

function isDone(playerid, advancement, socket, player) {
    fs.readFile("./" + folder + "/world/advancements/" + playerid + ".json", "utf8", (err, jsonString) => { //advancements
        if (err) {} else {
            
        }
        try {
            var doc = JSON.parse(jsonString);
            var data = [
                advancement,
                doc[advancement].done,
                Object.keys(doc[advancement].criteria).length,
                Object.keys(doc[advancement].criteria),
                player
            ]
            socket.emit("data", data);
            let now = new Date();
            socket.emit("time", now);
        } catch {
            var data = [
                advancement,
                "Not Found or Started"
            ]
            socket.emit("data", data);
            let now = new Date();
            socket.emit("time", now)
        }
        fs.readFile("./" + folder + "/world/stats/" + playerid + ".json", "utf8", (err, jsonString) => { //items
            if (err) {} else {
                try {
                    var doc = JSON.parse(jsonString);
                    var trident = doc["stats"]["minecraft:picked_up"]["minecraft:trident"] > 0;
                    var god_apple = doc["stats"]["minecraft:picked_up"]["minecraft:enchanted_golden_apple"] > 0;
                    var data = [
                        trident,
                        god_apple
                    ];
                    socket.emit("items", data)
                }
                catch {
                    var data = [
                        false, false
                    ]
                    socket.emit("items", data)
                }
            }
        });
    });
}

function igt(playerid, socket) {
    fs.readFile("./" + folder + "/world/stats/" + playerid + ".json", "utf8", (err, jsonString) => {
        if (err) {} else {
            try {
                let custom = "minecraft:custom"
                let time = "minecraft:play_one_minute"
                let ticks = JSON.parse(jsonString).stats[custom][time];
                let sec = ticks / 20;
                let hours = Math.floor(sec / 3600); // get hours
                let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
                let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
                seconds = seconds.toString().substring(0, 2);
                if (hours < 10) {
                    hours = "0" + hours;
                }
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                data = [
                    parseInt(hours),
                    parseInt(minutes),
                    parseInt(seconds),
                    hours + ':' + minutes + ':' + seconds
                ]
                socket.emit("igt", data); // Return is HH : MM : SS
            } catch {}
        }
    });
}

function loadAdvancements(socket) { // goes through each advancement of each player and logs if it is done
    var players = []; // reset the players array to empty (will be needed when a check is run multiple times)
    var uuids = [];
    fs.readFile("./" + folder + "/usercache.json", "utf-8", (err, jsonString) => { // open the player list file
        if (err) {} else {
            try {
                const data = JSON.parse(jsonString); // read the file
                for (i = 0; i < data.length; i++) { // loop from 0 to # of players in the file
                    uuids[i] = data[i].uuid; // adds the player uuid from the file to the players array
                    players[i] = data[i].name;
                }
            } catch {
                console.log("File parsing failed"); //error protection
            }
        }
        for (x = 0; x < uuids.length; x++) { // for each player
            for (i = 0; i < advancementlist.length; i++) { // go through each advancement
                isDone(uuids[x], advancementlist[i], socket, players[x]); // check if it is done
            }
            igt(uuids[x], socket);
        }
    });
}
