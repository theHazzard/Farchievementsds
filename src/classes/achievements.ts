import { AchievementsScreen } from './achievementsScreen';

export class Achievements {
	static AchievementsScreen: AchievementsScreen;
	static addChatControl() {
		if (game.version < 13) {
			if (!game.settings.get('farchievements', 'EnableChatBarButton'))
				return;
			const chatControlLeft = document.getElementsByClassName("chat-control-icon")[0];
			let tableNode = document.getElementById("achievements-button");

			if (chatControlLeft && !tableNode) {
				const chatControlLeftNode = chatControlLeft.firstElementChild;
				tableNode = document.createElement("label");
				tableNode.className = "AchievmentButtonLabel";
				tableNode.innerHTML = `<i id="achievements-button" class="fas fa-medal achievements-button" style="text-shadow: 0 0 1px black;"></i>`;
				tableNode.onclick = Achievements.initializeAchievements;
				chatControlLeft.insertBefore(tableNode, chatControlLeftNode);
				return;
			}
		}
		else {
			// V13
			const tabsFlexcol = document.getElementsByClassName("tabs")[0]?.getElementsByClassName("flexcol")[0];

			if (tabsFlexcol) {
				console.log("Farchievements | V13 Support");

				// Check if the button already exists
				if (!document.getElementById("achievements-button")) {
					const tableNode = document.createElement("button");
					tableNode.className = "AchievmentButtonLabelV13 ui-control plain icon";
					tableNode.innerHTML = `<i id="achievements-button" class="fas fa-medal achievements-button" style="text-shadow: 0 0 1px black;"></i>`;
					tableNode.onclick = Achievements.initializeAchievements;
					tabsFlexcol.append(tableNode);
				}
			}
		}
	}
	static initializeAchievements() {
		if (this.AchievementsScreen === undefined) {
			this.AchievementsScreen = new AchievementsScreen();
		}
		this.AchievementsScreen.openDialog();
	}
}