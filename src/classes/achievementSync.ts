import { Achievement } from "./achievement";
import { Farchievements } from "./farchivements";

export class AchievementSync {
	static sleep(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	static async PlayAnimation(achievementsGainedList: string) {
		await game.settings.set('farchievements', 'clientdata', game.settings.get('farchievements', 'clientdata') + achievementsGainedList);

		const AchievementList = JSON.parse(game.settings.get('farchievements', 'achievementdataNEW'));
		const achievementsToGain = achievementsGainedList.split("||||%%%||||");

		const showPopup = game.settings.get('farchievements', 'EnableAchievementPopup');
		const disableBanner = game.settings.get('farchievements', 'DisableAchievementBanner');

		for (let i = 0; i < achievementsToGain.length; i++) {
			await AchievementSync.sleep(100);

			const AchievementToGain = AchievementList.find((ach: { name: string }) => ach.name == achievementsToGain[i]);
			if (AchievementToGain == null) return;

			displayMyNewAchievementInChat(AchievementToGain.name);

			// Show Popup if enabled
			if (showPopup) {
				Farchievements.DisplayAchievementPopup(AchievementToGain.name);
			}

			// Skip banner if disabled
			if (disableBanner) continue;

			// Banner animation logic
			const name = AchievementToGain.name;
			const icon = AchievementToGain.image || game.settings.get('farchievements', 'standarticon');
			const anim = game.settings.get('farchievements', 'bannerAnimation');
			const dur = (anim == "fadeOut") ? 5 : 13;

			document.getElementsByClassName("AchievementText")[0].innerHTML = `<label class="AchievementTextLabel">${game.settings.get("farchievements", "achpretext")}</label>` + name;
			(document.getElementById("AchievementIMG")! as HTMLImageElement).src = icon;

			if (AchievementToGain.glowing)
				document.getElementById("FoundryAchievements")!.classList.add('glowingAch');
			else
				document.getElementById("FoundryAchievements")!.classList.remove('glowingAch');

			document.getElementById("Achievementbar")!.style.setProperty("animation-name", anim);
			document.getElementById("Achievementbar")!.style.setProperty("animation-duration", `${dur}s`);

			const sound = (anim == "fadeOut") ? 'achievementSound' : 'achievementStinger';
			const volume = (anim == "fadeOut") ? 'achievementSoundVolume' : 'achievementStingerVolume';
			await AudioHelper.play({ src: game.settings.get('farchievements', sound), volume: game.settings.get('farchievements', volume), autoplay: true, loop: false }, false);

			if (anim == "slidein") await AchievementSync.sleep(1800);
			document.getElementById("Achievementbar")!.style.setProperty("display", "flex");

			if (game.modules.get('confetti')?.active === true && game.settings.get('farchievements', 'EnableConfettiSupport')) {
				for (let c = 0; c < 3; c++) {
					await AchievementSync.sleep(500);
					const strength = window.confetti.confettiStrength.high;
					const shootConfettiProps = window.confetti.getShootConfettiProps(strength);
					window.confetti.handleShootConfetti(shootConfettiProps);
				}
			} else {
				await AchievementSync.sleep(dur * 1000);
			}
			document.getElementById("Achievementbar")!.style.setProperty("display", "none");
		}
	}
	static SyncAchievements(skip = null, start = false) {
		//console.log("SYNC Achievements");//DEBUG
		if (game.user.isGM) {
			if (!game.ready) return; //IF GAME IS READY, ELSE CHANGES WOULDN'T BE SAVED
			//CHECK FOR NEW USERS
			if (document.getElementById('SyncAchUnsaved') != null) {
				document.getElementById('SyncAchUnsaved')!.id = "SyncAch";
			}
			return;
		}
		else {//IF USER IS PLAYER
			//FOR EACH ACHIEVEMENT IF NOT IN CLIENTDATA PLAY ANIMATION AND ADD IT
			const AchievementList = JSON.parse(game.settings.get('farchievements', 'achievementdataNEW'));
			const existingAchievements = game.settings.get('farchievements', 'clientdata');
			let AchievementsToPlay = "";

			AchievementList.forEach(function (achievement: Achievement) {
				if (achievement.players && achievement.players.includes(game.userId)) {
					if (existingAchievements.includes(achievement.name)) return;
					AchievementsToPlay += achievement.name + "||||%%%||||";
				}
			});
			//console.log(AchievementsToPlay);
			if (AchievementsToPlay != "") {
				const amount = AchievementsToPlay.split("||||%%%||||").length - 1;
				if (skip == true) {
					game.settings.set('farchievements', 'clientdata', game.settings.get('farchievements', 'clientdata') + AchievementsToPlay);
					return;
				}
				if (start && amount > 0) {
					const d = new Dialog({
						title: `${game.i18n.localize('Farchievements.Html.SanitySaver.Title')}`,
						content: `${game.i18n.localize('Farchievements.Html.SanitySaver.Body1')} ` + amount + `${game.i18n.localize('Farchievements.Html.SanitySaver.Body2')}`,
						buttons: {
							one: {
								icon: '<i class="fas fa-check"></i>',
								label: `${game.i18n.localize('Farchievements.Html.SanitySaver.ButtonSeeAll')}`,
								callback: () => AchievementSync.PlayAnimation(AchievementsToPlay)
							},
							two: {
								icon: '<i class="fas fa-times"></i>',
								label: `${game.i18n.localize('Farchievements.Html.SanitySaver.ButtonSkip')}`,
								callback: () => {
									game.settings.set('farchievements', 'clientdata', game.settings.get('farchievements', 'clientdata') + AchievementsToPlay);
								}
							}
						}
					});
					d.render(true);
				}
				else {
					AchievementSync.PlayAnimation(AchievementsToPlay);
				}
			}
			//PLAY LIST AS ANIMATION 
			//console.log(AchievementList);//DEBUG
			if (document.getElementById("AchievementScript") != null)//IF USER IS ON THE ACHIEVEMENTSSCREEN, RELOAD IT
				document.getElementById("AchievementScript")!.onclick?.({} as MouseEvent);
		}
	}
}