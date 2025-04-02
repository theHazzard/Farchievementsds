import { AchievementSync } from '../classes/achievementSync';
import { Achievements } from '../classes/achievements';
import { Farchievements } from '../classes/farchivements';

Hooks.on('ready', async function () {
    //START MIGRATION
    if (game.user.isGM && game.settings.get('farchievements', 'achievementdataNEW') == "") {
        Farchievements.MigrateAchievements();
    }
    //sync achievements
    if (!game.user.isGM)
        AchievementSync.SyncAchievements(game.settings.get('farchievements', 'showAchOnStartup'), true);
});

Hooks.once('ready', () => {
    if (game.version < 13) return;
    function addSettingsButton() {
        console.log("FArchievementsADDSETTINGSBUTTON");
        if (!document.getElementById("FarchievementsSettings") && game.settings.get('farchievements', 'GameSettingsButton')) {
            const settingsContainer = document.getElementsByClassName("settings flexcol")[0];

            if (settingsContainer) {
                const settingsDiv = document.createElement("div");
                settingsDiv.id = "FarchievementsSettings";
                settingsDiv.style.margin = "0";
                settingsDiv.innerHTML = `<h4>Farchievements</h4>
                    <button id="SettingsAchievementsButton" data-action="Achievements">
                        <i class="fas fa-medal achievements-button"></i> ${game.i18n.localize('Farchievements.Achievements')}
                    </button>`;

                settingsContainer.appendChild(settingsDiv);

                const AchievementsButton = document.getElementById("SettingsAchievementsButton");
                if (AchievementsButton) {
                    AchievementsButton.onclick = Achievements.initializeAchievements;
                }
            }
        }
    }

    function addContextButton() {
        const contextMenu = document.getElementsByClassName("context-items")[0];

        if (contextMenu && !document.getElementById("contextAchievement")) {
            const playerElement = contextMenu.closest('.player');

            if (playerElement) {
                const id = playerElement.getAttribute("data-user-id");

                if (id !== game.user.id && game.user.isGM) { // Ensure it's not the user's own achievements
                    const contextItem = document.createElement("li");
                    contextItem.className = "context-item";
                    contextItem.id = "contextAchievement";
                    contextItem.innerHTML = `<i class="fas fa-medal"></i> ${game.i18n.localize('Farchievements.ViewAchievements')}`;

                    contextItem.onclick = () => {
                        game.settings.set('farchievements', 'loadSettingsForPlayer', id);
                        Achievements.initializeAchievements();
                    };

                    contextMenu.appendChild(contextItem);
                }
            }
        }
    }

    function refreshData() {
        addContextButton();
        setTimeout(refreshData, 100); // Runs every 0.1 seconds
    }

    addSettingsButton(); // Runs once
    refreshData(); // Starts periodic execution for context menu updates
});