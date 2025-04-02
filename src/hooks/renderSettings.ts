import { Achievements } from "../classes/achievements";
import { AchievementSync } from "../classes/achievementSync";

Hooks.on('renderSettings', function () {
    //ADD BUTTON TO SETTINGS
    function refreshData() {
        const x = 0.1;  // 0.1 seconds
        if (document.getElementById("FarchievementsSettings") == null && game.settings.get('farchievements', 'GameSettingsButton')) {
            $('#settings-game').append(`<div id="FarchievementsSettings" style="margin:0;"><h4>Farchievements</h4><button id="SettingsAchievementsButton" data-action="Achievements"><i class="fas fa-medal achievements-button"></i>${game.i18n.localize('Farchievements.Achievements')}</button></div>`);
            const AchievementsButton = document.getElementById("SettingsAchievementsButton");
            if (AchievementsButton != null)
                AchievementsButton.onclick = Achievements.initializeAchievements;
        }
        // Do your thing here
        //ui.notifications.notify("Test");
        if (document.getElementsByClassName("context-items")[0] != null) {
            if (document.getElementById("contextAchievement") == null) {
                if (document.getElementsByClassName("context-items")[0].closest('.player') != null) {
                    const id = document.getElementsByClassName("context-items")![0].closest('.player')!.getAttribute("data-user-id");
                    if (id != game.user.id && game.user.isGM) {//You can't open your own achievements
                        $(".context-items").append(`<li class="context-item" id="contextAchievement"><i class="fas fa-medal"></i> ${game.i18n.localize('Farchievements.ViewAchievements')}</li>`);
                        const AchievmentContextButton = document.getElementById("contextAchievement")!;
                        game.settings.set('farchievements', 'loadSettingsForPlayer', id);
                        AchievmentContextButton.onclick = Achievements.initializeAchievements;
                    }
                }
            }
        }
        setTimeout(refreshData, x * 1000);
    }

    if (game.user.isGM) {
        function WaitForReady() {
            const x = 0.1;  // 0.1 seconds
            // Do your thing here
            if (game.ready == true) {
                AchievementSync.SyncAchievements();
            }
            else
                setTimeout(WaitForReady, x * 1000);
        }
        WaitForReady();
    }

    if (game.version < 13) //IF < Version 13 use search algorithm
        refreshData();
    //else look onReady
});