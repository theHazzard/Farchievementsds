import { sendAchievementNotification, SendSyncMessage } from './message';

export async function addAchievementFromCommand(achievementID: number, PID: string) {
    const cleanPlayerID = game.users.contents.indexOf(game.users.get(PID)) - 1;
    let dataPlayerID = cleanPlayerID; //++xathick
    const player = game.users.get(PID);
    const playerName = player.name;
    const clientdataSYNC = game.settings.get('farchievements', 'clientdataSYNC'); //GET DATA
    const dataArray = clientdataSYNC.split("||"); //DATA TO ARRAY
    let dataArrayPlayer; //DATA TO ARRAY
    let toSYNC;
    let index = 0;
    const achievement = await getAchievementByID(achievementID);
    await sendAchievementNotification(playerName, achievement);
    for (index; index < dataArray.length; index++) {
        if (dataArray[index].split(":")[0] == PID) {
            dataPlayerID = index;
        }
        game.settings.get('farchievements', 'clientdataSYNC').split("||");
    }
    if (dataArray[dataPlayerID] == "" || dataArray[dataPlayerID] == 'NULL') { // IF NO DATA YET ADD ACHIEVEMENT
        dataArrayPlayer = game.users.contents[dataPlayerID]._id + ":" + achievementID + ",";
        dataArray[dataPlayerID] = dataArrayPlayer; //++xathick
        toSYNC = dataArray.join("||");
        await game.settings.set('farchievements', 'clientdataSYNC', toSYNC);
        if (document.getElementById('AchPlayerNav')!.className == "AchPlayerNav") //CHECK FOR EDITING WITHIN NORMAL WINDOW
        {
            await game.settings.set('farchievements', 'loadSettingsForPlayer', PID);
            $('#achsyncnormalmode').append('<i id="SyncAch2" onclick="SendSyncMessage()" class="fas fa-sync achievementsettings" title="Click to push changes right now"></i>');
            window.loadAchievements();
        }
        else
            window.loadAchievementsEditMode();
        return;
    }

    if (dataArray[dataPlayerID].split(":")[1].includes(',' + "" + achievementID + ',')) { //DETECT EXISTING ACHIEVEMENT, SKIP REST
        ui.notifications.notify("Farchievements | This player already has the achievement");
        return;
    }
    else if (dataArray[dataPlayerID].split(":")[1].split(",")[0] == "" + achievementID) { //FIRST ACHIEVEMENT IN DATA? => CHECK AGAIN SPECIAL FORMATTING
        ui.notifications.notify("Farchievements | This player already has the achievement");
        return;
    }
    else if (dataArray[dataPlayerID].split(":")[1].split(",")[dataArray[dataPlayerID].split(":")[1].split(",")[0].length + 1] == "" + achievementID) { //LAST ACHIEVEMENT IN DATA? => SPECIAL FORMATTING
        const firstDataArray = dataArray[dataPlayerID].split(":")[1].split(",");
        firstDataArray.pop();
        dataArray[dataPlayerID] = dataArray[dataPlayerID].split(":")[0] + ":" + firstDataArray;
        toSYNC = dataArray.join("||");
    }
    else {//IF IT DOESN'T EXIST ON THIS PLAYER YET, ADD THE ACHIEVEMENT
        dataArrayPlayer = dataArray[dataPlayerID].split(":")[0] + ":" + dataArray[dataPlayerID].split(":")[1] + achievementID + ",";
        dataArray[dataPlayerID] = dataArrayPlayer;
        toSYNC = dataArray.join("||");
    }
    if (document.getElementById('SyncAchUnsaved') != null) {
        if ((document.getElementById('SyncAchUnsaved') as HTMLInputElement).value == toSYNC) {
            document.getElementById('SyncAchUnsaved')!.id = "SyncAch";
            (document.getElementById('SyncAchUnsaved') as HTMLInputElement).value = "";
        }
    }
    if (document.getElementById('SyncAch') != null) {
        (document.getElementById('SyncAch') as HTMLInputElement).value = toSYNC;
        document.getElementById('SyncAch')!.id = "SyncAchUnsaved";
    }

    await game.settings.set('farchievements', 'clientdataSYNC', toSYNC);
    SendSyncMessage();
    //RELOAD ANY OPEN WINDOW
    if (document.getElementById('AchPlayerNav') == null) return;
    if (document.getElementById('AchPlayerNav')!.className == "AchPlayerNav") //CHECK FOR EDITING WITHIN NORMAL WINDOW
    {
        await game.settings.set('farchievements', 'loadSettingsForPlayer', PID);
        $('#achsyncnormalmode').append('<i id="SyncAch2" onclick="SendSyncMessage()" class="fas fa-sync achievementsettings" title="Click to push changes right now"></i>');
        window.loadAchievements();
    }
    else
        window.loadAchievementsEditMode();
}
export async function removeAchievementFromCommand(achievementID: string, PID: string) {
    const cleanPlayerID = game.users.contents.indexOf(game.users.get(PID)) - 1;
    let dataPlayerID = cleanPlayerID; //++xathick
    // const player = game.users.get(PID);
    // const playerName = player.name;
    const clientdataSYNC = game.settings.get('farchievements', 'clientdataSYNC'); //GET DATA
    const dataArray = clientdataSYNC.split("||"); //DATA TO ARRAY
    let dataArrayPlayer; //DATA TO ARRAY
    let toSYNC;
    let index = 0;
    for (index; index < dataArray.length; index++) {
        if (dataArray[index].split(":")[0] == PID) {
            dataPlayerID = index;
        }
        game.settings.get('farchievements', 'clientdataSYNC').split("||");
    }
    if (dataArray[dataPlayerID] == "" || dataArray[dataPlayerID] == 'NULL') { // IF NO DATA YET ADD ACHIEVEMENT
        dataArrayPlayer = game.users.contents[dataPlayerID]._id + ":" + achievementID + ",";
        dataArray[dataPlayerID] = dataArrayPlayer; //++xathick
        toSYNC = dataArray.join("||");
        await game.settings.set('farchievements', 'clientdataSYNC', toSYNC);
        if (document.getElementById('AchPlayerNav')!.className == "AchPlayerNav") //CHECK FOR EDITING WITHIN NORMAL WINDOW
        {
            await game.settings.set('farchievements', 'loadSettingsForPlayer', PID);
            $('#achsyncnormalmode').append('<i id="SyncAch2" onclick="SendSyncMessage()" class="fas fa-sync achievementsettings" title="Click to push changes right now"></i>');
            window.loadAchievements();
        }
        else
            window.loadAchievementsEditMode();
        return;
    }

    if (dataArray[dataPlayerID].split(":")[1].includes(',' + "" + achievementID + ',')) { //DETECT EXISTING ACHIEVEMENT, REMOVE IT
        const toReplace = achievementID + ",";//REPLACE FROM WITHIN DATA
        dataArrayPlayer = dataArray[dataPlayerID].split(":")[0] + ":" + dataArray[dataPlayerID].split(":")[1].replace(toReplace, "");
        dataArray[dataPlayerID] = dataArrayPlayer;
        toSYNC = dataArray.join("||");
        //console.log(toSYNC);
    }
    else if (dataArray[dataPlayerID].split(":")[1].split(",")[0] == "" + achievementID) { //FIRST ACHIEVEMENT IN DATA?
        const firstDataArray = dataArray[dataPlayerID].split(":")[1].split(",");
        firstDataArray.shift();
        dataArray[dataPlayerID] = dataArray[dataPlayerID].split(":")[0] + ":" + firstDataArray;
        toSYNC = dataArray.join("||");
        //console.log(toSYNC);
    }
    else if (dataArray[dataPlayerID].split(":")[1].split(",")[dataArray[dataPlayerID].split(":")[1].split(",")[0].length + 1] == "" + achievementID) { //LAST ACHIEVEMENT IN DATA?
        const firstDataArray = dataArray[dataPlayerID].split(":")[1].split(",");
        firstDataArray.pop();
        dataArray[dataPlayerID] = dataArray[dataPlayerID].split(":")[0] + ":" + firstDataArray;
        toSYNC = dataArray.join("||");
        //console.log(toSYNC);
    }
    if (document.getElementById('SyncAchUnsaved') != null) {
        if ((document.getElementById('SyncAchUnsaved') as HTMLInputElement).value == toSYNC) {
            document.getElementById('SyncAchUnsaved')!.id = "SyncAch";
            (document.getElementById('SyncAch') as HTMLInputElement).value = "";
        }
    }
    if (document.getElementById('SyncAch') != null) {
        (document.getElementById('SyncAch') as HTMLInputElement).value = toSYNC;
        document.getElementById('SyncAch')!.id = "SyncAchUnsaved";
    }

    await game.settings.set('farchievements', 'clientdataSYNC', toSYNC);
    SendSyncMessage();
    //RELOAD ANY OPEN WINDOW
    if (document.getElementById('AchPlayerNav') == null) return;
    if (document.getElementById('AchPlayerNav')!.className == "AchPlayerNav") //CHECK FOR EDITING WITHIN NORMAL WINDOW
    {
        await game.settings.set('farchievements', 'loadSettingsForPlayer', PID);
        $('#achsyncnormalmode').append('<i id="SyncAch2" onclick="SendSyncMessage()" class="fas fa-sync achievementsettings" title="Click to push changes right now"></i>');
        window.loadAchievements();
    }
    else
        window.loadAchievementsEditMode();
}
export async function displayMyNewAchievementInChat(newAchievements: string[]) {
    if (!game.settings.get('farchievements', 'chatMessage')) return;
    const AchievementList = JSON.parse(game.settings.get('farchievements', 'achievementdataNEW'));
    if (!Array.isArray(newAchievements)) {
        if (newAchievements != "") {
            if (newAchievements === "" || newAchievements === " ") return; // Skip empty or space strings
            console.log("Achievement to display:", newAchievements);
            const achievementData = AchievementList.find((x: { name: string }) => x.name == newAchievements);
            const displayContent = '<p class="achGainedChatText">Achievement Gained:</p>' + '<div class="AchievementChatDisplay"><img class="chatAchImg" src="' + achievementData.image + '"></img><b class="achNameChatP">' + newAchievements + '<b/> </div>';

            ChatMessage.create({
                content: displayContent,
                blind: false,
            });
        }
        return;
    }

    newAchievements.forEach(achievement => {
        if (achievement === "" || achievement === " ") return; // Skip empty or space strings
        console.log("Achievement to display:", achievement);
        const achievementData = AchievementList.find((x: { name: string }) => x.name == achievement);
        const displayContent = '<p class="achGainedChatText">Achievement Gained:</p>' + '<div class="AchievementChatDisplay"><img class="chatAchImg" src="' + achievementData.image + '"></img><b class="achNameChatP">' + achievement + '<b/> </div>';

        ChatMessage.create({
            content: displayContent,
            blind: false,
        });
    });
}

export async function loadAchievementList() {
    let achievementData;
    try {
        achievementData = JSON.parse(await game.settings.get('farchievements', 'achievementdataNEW'));
        if (!Array.isArray(achievementData)) throw new Error("Achievement data is not an array");
    } catch (e) {
        console.error("Farchievements | Failed to load achievements data:", e);
        return [];
    }

    return achievementData;
}

export async function getAchievementByName(achievementName: string) {
    const achievements = await loadAchievementList();
    return achievements.find((achievement) => achievement.name === achievementName)
}

export async function getAchievementByID(achievementID: number) {
    const achievements = await loadAchievementList();
    return achievements.find((achievement) => achievement.id === achievementID)
}