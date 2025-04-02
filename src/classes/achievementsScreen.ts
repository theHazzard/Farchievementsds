export class AchievementsScreen extends Application {
    activateListeners(html: JQuery<HTMLElement>) {
        super.activateListeners(html);
        html.find('.SyncAch').click(() => {
            //update the actor
            ui.notifications.notify("SYNC");
        });
    }
    openDialog() {
        //LOAD TEMPLATE DATA
        const $dialog = $('.achievementsscreen-window');
        if ($dialog.length > 0) {
            $dialog.remove();
            //return;
        }
        const templateData = {
            data: super.getData(),
            title: "Farchievements"
        };

        const templatePath = "modules/farchievements/AchievementsScreen.html";
        if (document.getElementsByClassName("achievementsscreen-window").length > 0) { }
        AchievementsScreen.renderMenu(templatePath, templateData);

    }
    static renderMenu(path: string, data: unknown) {
        const dialogOptions = {
            width: 1050,
            heith: 630,
            top: 200,
            left: window.innerWidth / 2 - 510,
            resizable: true,
            classes: ['achievementsscreen-window resizable']
        };
        renderTemplate(path, data).then(dlg => {
            new Dialog({
                title: game.settings.get('farchievements', 'AchievementWindowTitle'),
                content: dlg,
                buttons: {}
            }, dialogOptions).render(true);
        });
    }
}