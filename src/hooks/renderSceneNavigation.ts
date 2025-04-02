import { Achievements } from '../classes/achievements'

Hooks.on('renderSceneNavigation', async function () {
    Achievements.addChatControl();
    //console.log("AchievementsScreen GM true");
    const style = await game.settings.get("farchievements", "bannerBackground");
    let banner = "";

    if (style != "")
        banner = "background: url(" + style + ")!important;";

    const bannerstyle = 'top: -200px; ' + banner + ' background-position: center!important; display: flex;  background-size: 100% 100% !important;';
    const el = `<div id="Achievementbar" style="display: none;" class="Achievementbar"><div id="FoundryAchievements" class="FoundryAchievementsBanner" style="` + bannerstyle + `"><img id="AchievementIMG" class="AchievementIMG" src="modules/farchievements/standardIcon.PNG"></img><p class="AchievementText"><label class="AchievementTextLabel">${game.i18n.localize('Farchievements.NewAchievement')}</label> (${game.i18n.localize('Farchievements.Achievement')}) </p><i class="Shiny"></i></div></div>`;
    document.getElementById("notifications")!.innerHTML = el;
});
