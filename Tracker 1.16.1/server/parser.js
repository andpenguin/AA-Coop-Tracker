const port = "80";
const folder = "vanilla1.16";
var express = require('express');
var app = express();
var server = require("http").createServer(app);
var io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});
const fs = require("fs");

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("front");
});

server.listen(port, () => {
    console.log("Server is running at Port: " + port);
});

io.on("connection", (socket) => {
    loadAdvancements(socket);
    console.log("New client: " + socket.id + " connected");
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
    fs.readFile("./" + folder + "/world/advancements/" + playerid + ".json", "utf8", (err, jsonString) => {
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
    });
}

function igt(playerid, socket) {
    fs.readFile("./" + folder + "/world/stats/" + playerid + ".json", "utf8", (err, jsonString) => {
        try {
            let custom = "minecraft:custom"
            let time = "minecraft:play_one_minute"
            let ticks = JSON.parse(jsonString).stats[custom][time];
            let sec = ticks / 20;
            let hours = Math.floor(sec / 3600); // get hours
            let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
            let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
            seconds = seconds.toString().substring(0, 2);
            // add 0 if value < 10; Example: 2 => 02
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
        }
        catch{
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