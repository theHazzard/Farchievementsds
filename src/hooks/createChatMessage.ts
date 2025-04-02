import { Achievement } from "../classes/achievement";
import { SendSyncMessage } from "../helpers/message";
import { AchievementSync } from "../classes/achievementSync";

interface FoundryAchievement {
    name: string;
    description: string;
    image: unknown;
    players: string[];
    seenBy: unknown[];
    playerDates: Record<string, unknown>;
    progressRequired: number;
    progressType: string;
    playerProgress: Record<string, number>;
    chainLength: number;
    diceType: string
}

Hooks.on('createChatMessage', (chatMessage: { rolls: { total: number, formula: string; }[], user: { id: string } }) => {
    if (!game.user.isGM) return;

    // Check if the chat message contains roll data
    if (chatMessage.rolls && chatMessage.rolls.length > 0) {
        console.log("Farchievements | Checking rolls in chat message...");

        const rollData = chatMessage.rolls[0];
        const rolledValue = rollData.total;
        const userId = chatMessage.user.id;

        console.log(`Farchievements | Roll detected in chat message for user: ${userId}, roll total: ${rolledValue}`);

        const achievementList = JSON.parse(game.settings.get('farchievements', 'achievementdataNEW'));
        console.log(`Farchievements | Loaded achievement list:`, achievementList);

        // Filter for achievements that have a progressType of 'dice' or 'diceChain'
        const diceAchievements = achievementList.filter((ach: { progressType: string }) => ach.progressType === 'dice' || ach.progressType === 'diceChain');
        console.log(`Farchievements | Filtered dice achievements:`, diceAchievements);

        let hasAchievementUpdated = false;

        diceAchievements.forEach((achievementData: FoundryAchievement) => {
            console.log(`Farchievements | Processing achievement: ${achievementData.name}`);

            const achievement = new Achievement(
                achievementData.name,
                achievementData.description,
                achievementData.image,
                achievementData.players,
                achievementData.seenBy,
                achievementData.playerDates,
                achievementData.progressRequired,
                achievementData.progressType,
                achievementData.playerProgress,
                achievementData.chainLength,
                achievementData.diceType
            );

            // Check if the dice type matches the achievement's diceType requirement
            if (rollData.formula.includes(achievement.diceType)) {
                // Check if the achievement already applies to the player who rolled
                if (achievement.players.includes(userId)) {
                    console.log(`Farchievements | Player ${userId} already has achievement: ${achievement.name}`);
                    return; // Skip if the player already has the achievement
                }

                console.log(`Farchievements | Rolled value: ${rolledValue}`);

                if (achievement.progressType === 'dice') {
                    console.log(`Farchievements | Handling [dice] achievement for: ${achievement.name}`);

                    const condition = achievement.progressRequired;
                    if (typeof condition === 'string') {
                        let targetValue;
                        console.log(`Farchievements | Condition is a string: ${condition}`);

                        if (condition.startsWith('<')) {
                            targetValue = parseInt(condition.substring(1).trim());
                            console.log(`Farchievements | Target value is less than ${targetValue}`);
                            if (rolledValue < targetValue) {
                                achievement.addPlayer(userId);
                                hasAchievementUpdated = true;
                                console.log(`Farchievements | Achievement unlocked for player: ${userId} (rolled < ${targetValue})`);
                            }
                        } else if (condition.startsWith('>')) {
                            targetValue = parseInt(condition.substring(1).trim());
                            console.log(`Farchievements | Target value is greater than ${targetValue}`);
                            if (rolledValue > targetValue) {
                                achievement.addPlayer(userId);
                                hasAchievementUpdated = true;
                                console.log(`Farchievements | Achievement unlocked for player: ${userId} (rolled > ${targetValue})`);
                            }
                        } else {
                            targetValue = parseInt(condition);
                            console.log(`Farchievements | Target value is equal to ${targetValue}`);
                            if (rolledValue === targetValue) {
                                achievement.addPlayer(userId);
                                hasAchievementUpdated = true;
                                console.log(`Farchievements | Achievement unlocked for player: ${userId} (rolled == ${targetValue})`);
                            }
                        }
                    }
                } else if (achievement.progressType === 'diceChain') {
                    console.log(`Farchievements | Handling [diceChain] achievement for: ${achievement.name}`);

                    const condition = achievement.progressRequired;
                    if (typeof condition === 'string') {
                        let targetValue;
                        console.log(`Farchievements | Condition is a string: ${condition}`);

                        if (condition.startsWith('<')) {
                            targetValue = parseInt(condition.substring(1).trim());
                            console.log(`Farchievements | Target value is less than ${targetValue}`);
                            if (rolledValue < targetValue) {
                                achievement.addProgress(userId, true, true); // Increment chain
                                console.log(`Farchievements | Successful roll for chain (rolled < ${targetValue})`);
                            } else {
                                // Reset the chain on failure
                                achievement.addProgress(userId, false, true);
                                console.log(`Farchievements | Chain reset for player ${userId}`);
                            }
                        } else if (condition.startsWith('>')) {
                            targetValue = parseInt(condition.substring(1).trim());
                            console.log(`Farchievements | Target value is greater than ${targetValue}`);
                            if (rolledValue > targetValue) {
                                achievement.addProgress(userId, true, true); // Increment chain
                                console.log(`Farchievements | Successful roll for chain (rolled > ${targetValue})`);
                            } else {
                                // Reset the chain on failure
                                achievement.addProgress(userId, false, true);
                                console.log(`Farchievements | Chain reset for player ${userId}`);
                            }
                        } else {
                            targetValue = parseInt(condition);
                            console.log(`Farchievements | Target value is equal to ${targetValue}`);
                            if (rolledValue === targetValue) {
                                achievement.addProgress(userId, true, true); // Increment chain
                                console.log(`Farchievements | Successful roll for chain (rolled == ${targetValue})`);
                            } else {
                                // Reset the chain on failure
                                achievement.addProgress(userId, false, true);
                                console.log(`Farchievements | Chain reset for player ${userId}`);
                            }
                        }
                    }

                    if (achievement.getProgress(userId) >= achievement.chainLength) {
                        // Chain complete, award achievement
                        console.log(`Farchievements | Chain complete, awarding achievement to player ${userId}`);
                        achievement.addPlayer(userId);
                        hasAchievementUpdated = true;
                    }
                }

                // Update the achievement list in game settings
                const updatedAchievementList = achievementList.map((a: { name: string }) => (a.name === achievement.name ? achievement : a));
                game.settings.set('farchievements', 'achievementdataNEW', JSON.stringify(updatedAchievementList));
            }
        });

        // Only send the update message if any achievement was updated
        if (hasAchievementUpdated) {
            SendSyncMessage();
        }
    }
});

Hooks.on("createChatMessage", async function (message: { content: string }) {
    if (message.content.includes('Achievements Synced'))
        AchievementSync.SyncAchievements();

    if (message.content.includes("Farchievements-SyncRequest")) {
        if (!game.user.isGM) return;
        const NAME = message.content.split("|")[1];
        const ACHIEVMENTNAME = message.content.split("|")[2];
        //==========================================
        const achData = game.settings.get('farchievements', 'achievementdata').split(';;;');
        const dataArray = game.settings.get('farchievements', 'clientdataSYNC').split("||");
        let Player, dataArrayPlayer, toSYNC;
        if (NAME != "")
            Player = game.users.getName(NAME);
        else {
            Player = game.user;
        }
        if (Player == null) {
            ui.notifications.error(game.i18n.localize('Farchievements.Notification.Prefix') + game.i18n.localize('Farchievements.Notification.UserDoesNotExist'));
            return;
        }
        const PID = dataArray.indexOf(dataArray.filter((entry: string) => entry.includes(Player.id))[0]);
        const achievementID = achData.filter((entry: string) => entry.split("////")[0].includes(ACHIEVMENTNAME))[0][0];
        if (dataArray[PID] == "" || dataArray[PID] == null) { // IF NO DATA YET
            dataArrayPlayer = game.users._source[PID].id + ":" + achievementID + ",";
            dataArray[PID] = dataArrayPlayer;
            toSYNC = dataArray.join("||");
            console.log(toSYNC);
            //await game.settings.set('farchievements', 'clientdataSYNC', toSYNC);

            console.log("Setting Achievement: " + ACHIEVMENTNAME + "(ID:" + achievementID + ")" + " for user: " + NAME);
            return;
        }
        else {
            dataArrayPlayer = dataArray[PID].split(":")[0] + ":" + dataArray[PID].split(":")[1] + achievementID + ",";
            dataArray[PID] = dataArrayPlayer;
            toSYNC = dataArray.join("||");
            console.log(toSYNC);
        }
        await game.settings.set('farchievements', 'clientdataSYNC', toSYNC);

        ChatMessage.create({
            user: game.user.id,
            content: 'Achievements Synced',
            blind: false,
            whisper: game.users.entities.filter((u: { isGM: string }) => u.isGM).map((u: { id: string }) => u.id)
        });
        ui.notifications.notify('Achievements Synced');
        AchievementSync.SyncAchievements();
    }
});