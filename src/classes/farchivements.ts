import { addAchievementFromCommand } from "../helpers/achievements";
import { Achievement } from "./achievement";

export class Farchievements {
    static Open() {
        $("#SettingsAchievementsButton").click()
    }
    static Render() {
        $("#SettingsAchievementsButton").click()
    }
    static DisplayAchievementPopup(achievementName: string, playerId = "") {
        const achievementList = JSON.parse(game.settings.get('farchievements', 'achievementdataNEW'));
        const achievement = achievementList.find((ach: { name: string }) => ach.name === achievementName);

        if (!achievement) {
            ui.notifications.warn(`Farchievements | Achievement '${achievementName}' not found.`);
            return;
        }

        // If a playerId is provided, check if they are in the achievement's players list
        const player = playerId ? game.users.get(playerId) : game.user;
        if (!player) {
            ui.notifications.warn(`Farchievements | Player with ID '${playerId}' not found.`);
            return;
        }

        // Ensure the player is actually in the achievement's players list
        if (!achievement.players && !game.user.isGM && !achievement.players.includes(player.id)) {
            ui.notifications.warn(`Farchievements | Player '${player.name}' does not have this achievement.`);
            return;
        }

        const receivedDate = achievement.playerDates?.[player.id] ? new Date(achievement.playerDates[player.id]) : null;
        const formattedDate = receivedDate
            ? receivedDate.toLocaleString('en-US')
            : null;

        const popupContent = `
        <div class="farchievements-popup" style="
            position: relative; 
            text-align: center; 
            padding: 20px; 
            border-radius: 10px;
            background: url('${achievement.image}') center/cover no-repeat;
            border: 3px solid ${achievement.color};
        ">
            <div style="
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgb(0 0 0 / 84%);
                backdrop-filter: blur(15px);
                border-radius: 10px;
            "></div>
            <img class="farchievements-popup-img" src="${achievement.image}" alt="${achievement.name}" style="
                width: 100px; 
                height: 100px; 
                display: block; 
                margin: auto; 
                border-radius: 10px; 
                border: 1px solid ${achievement.color};
                position: relative;
            ">
            <h2 class="farchievements-popup-title" style="
                margin-top: 10px; 
                color: ${achievement.color};
                position: relative;
            ">${achievement.name}</h2>
            <p class="farchievements-popup-description" style="
                margin-top: 5px; 
                color: white;
                position: relative;
            ">${achievement.description}</p>
            ${formattedDate ? `
            <p class="farchievements-popup-date" style="
                margin-top: 10px; 
                color: white;
                font-size: 0.9em;
                position: relative;
            "><b>Received:</b> ${formattedDate}</p>` : ""}
        </div>
    `;

        new Dialog({
            title: "Achievement Unlocked!",
            content: popupContent,
            buttons: {
                close: {
                    label: "Close",
                    callback: () => { }
                }
            }
        }).render(true);
    }
    static async AddAchievement(AchievementName: string, PlayerName: string) {
        if (!game.user.isGM) return;
        console.log(AchievementName);
        // const data = game.settings.get('farchievements', 'achievementdata').split(';;;');
        let AchievementID;
        for (let i = 0; i < game.settings.get('farchievements', 'achievementdata').split(';;;').length; i++) {
            if (AchievementName == game.settings.get('farchievements', 'achievementdata').split(';;;')[i].split('////')[0].split(":::")[1]) {
                AchievementID = game.settings.get('farchievements', 'achievementdata').split(';;;')[i].split('////')[0].split(":::")[0] - 1;
            }
        }
        const PlayerID = game.users.getName(PlayerName).id;

        if (PlayerID == null) {
            ui.notifications.warn("Farchievements | Is the player name right?")
            return;
        }
        if (AchievementID == null) {
            ui.notifications.warn("Farchievements | Is the achievement name right?")
            return;
        }
        addAchievementFromCommand(AchievementID, PlayerID);
    }
    static async RemoveAchievement(AchievementName: string, PlayerName: string) {
        if (!game.user.isGM) return;

        const achievementList = JSON.parse(game.settings.get('farchievements', 'achievementdataNEW')); // Get the achievement list
        const AchievementToRemove = achievementList.find((ach: { name: string }) => ach.name === AchievementName); // Find the specific achievement
        const PlayerID = game.users.getName(PlayerName).id; // Get the player ID

        if (PlayerID == null) {
            ui.notifications.warn("Farchievements | Is the player name correct?");
            return;
        }

        if (AchievementToRemove == null) {
            ui.notifications.warn("Farchievements | Is the achievement name correct?");
            return;
        }

        // Call the removePlayer method to remove the player from the achievement
        AchievementToRemove.removePlayer(PlayerID);

        // Save the updated achievement list back to the settings
        game.settings.set('farchievements', 'achievementdataNEW', JSON.stringify(achievementList));

        ui.notifications.notify(`Achievement "${AchievementName}" removed from player "${PlayerName}".`);
    }
    static async MigrateAchievements() {
        await ui.notifications.notify("Farchievements | Beginning migration of old data...");
        //console.log(game.settings.get('farchievements', 'achievementdataNEW'));
        await game.settings.set('farchievements', 'currentPage', 1);
        const oldData = game.settings.get('farchievements', 'achievementdata');
        const oldDataArr = oldData.split(";;;");
        const oldClientData = game.settings.get('farchievements', 'clientdataSYNC');
        const oldClientDataArr = oldClientData.split("||");
        // const newData = "";
        const AchievementList: Achievement[] = [];
        //console.log(oldDataArr.length);
        for (let i = 0; i < oldDataArr.length - 1; i++) {//FOR EVERY OLD ACHIEVEMENT
            //console.log(oldDataArr[i]);
            //constructor: name, description, image, players
            const playerslist = [];
            if (oldClientData != "") {
                for (let j = 0; j < oldClientDataArr.length - 1; j++) {//FOR EVERY CLIENT
                    if (oldClientDataArr[j] == "") continue;
                    if (oldClientDataArr[j].split(":")[1] == "") continue;

                    const clientAchArray = oldClientDataArr[j].split(":")[1].split(",");
                    for (let k = 0; k < clientAchArray.length - 1; k++) {//FOR EVERY ENTRY IN THE CLIENT ACHIEVEMENTS LIST
                        if (clientAchArray[k] == i) {
                            playerslist.push(oldClientDataArr[j].split(":")[0]);
                        }
                    }
                }
            }

            const newAch = new Achievement(oldDataArr[i].split(":::")[1].split("////")[0], oldDataArr[i].split("////")[2], oldDataArr[i].split("////")[1], playerslist);
            if (AchievementList.find(ach => ach.name == newAch.name)) {
                const number = AchievementList.filter(ach => ach.name.includes(newAch.name)).length
                newAch.name += "(" + number + ")"
            }
            //console.log(newAch);
            AchievementList.push(newAch);
        }
        //console.log(game.settings.get('farchievements', 'achievementdataNEW'));
        const data = JSON.stringify(AchievementList);
        //console.log(data);
        //let TestData = JSON.parse(data);
        game.settings.set('farchievements', 'achievementdataNEW', data);
        await ui.notifications.notify("Farchievements | Migration Finished");

    }
    static async debugAchievements() {
        return JSON.parse(game.settings.get('farchievements', 'achievementdataNEW'));
    }
}