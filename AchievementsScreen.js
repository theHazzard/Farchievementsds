Hooks.once('init', function() {
	const debouncedReload = debounce(() => window.location.reload(), 100);
	game.settings.register('farchievements', 'showAchOnStartup', {
        name: game.i18n.localize('Farchievements.Settings.showAchOnStartup.Text'),
        hint: game.i18n.localize('Farchievements.Settings.showAchOnStartup.Hint'),
        scope: 'world',
        config: true,
        default: false,
        type: Boolean,
    });
	game.settings.register('farchievements', 'EnableChatBarButton', {
        name: game.i18n.localize('Farchievements.Settings.EnableChatBarButton.Text'),
        hint: game.i18n.localize('Farchievements.Settings.EnableChatBarButton.Hint'),
        scope: 'world',
        config: true,
        default: false,
        type: Boolean,
		onChange: debouncedReload,
	});
	game.settings.register('farchievements', 'EnableAchievementMessage', {
        name: game.i18n.localize('Farchievements.Settings.EnableAchievementMessage.Text'),
        hint: game.i18n.localize('Farchievements.Settings.EnableAchievementMessage.Hint'),
        scope: 'world',
        config: true,
        default: false,
        type: Boolean,
	});
	game.settings.register('farchievements', 'EnableScoreboard', {
        name: game.i18n.localize('Farchievements.Settings.EnableScoreboard.Text'),
        hint: game.i18n.localize('Farchievements.Settings.EnableScoreboard.Hint'),
        scope: 'world',
        config: true,
        default: true,
        type: Boolean,
	});
	if (game.modules.get('confetti')?.active === true)
	game.settings.register('farchievements', 'EnableConfettiSupport', {
        name: game.i18n.localize('Farchievements.Settings.EnableConfettiSupport.Text'),
		hint: game.i18n.localize('Farchievements.Settings.EnableConfettiSupport.Hint'),
        scope: 'world',
        config: true,
        default: true,
        type: Boolean,
    });
	game.settings.register('farchievements', 'EnableContextButton', {
        name: game.i18n.localize('Farchievements.Settings.EnableContextButton.Text'),
        hint: game.i18n.localize('Farchievements.Settings.EnableContextButton.Hint'),
        scope: 'world',
        config: true,
        default: true,
        type: Boolean,
    });
	game.settings.register('farchievements', 'OmniView', {
        name: game.i18n.localize('Farchievements.Settings.OmniView.Text'),
        hint: game.i18n.localize('Farchievements.Settings.OmniView.Hint'),
        scope: 'client',
        config: false,
		default: false,
		type: Boolean,
    });
	game.settings.register('farchievements', 'ListView', {
        name: game.i18n.localize('Farchievements.Settings.ListView.Text'),
        hint: game.i18n.localize('Farchievements.Settings.ListView.Hint'),
        scope: 'world',
        config: true,
		default: false,
		type: Boolean,
    });
	game.settings.register('farchievements', 'loadPerPage', {
        name: game.i18n.localize('Farchievements.Settings.loadPerPage.Text'),
        hint: game.i18n.localize('Farchievements.Settings.loadPerPage.Hint'),
        scope: 'client',
        config: true,
		default: 50,
		type: Number,
		range: {
			min: 25,
			max: 150,
			step: 1
		}
    });
	game.settings.register('farchievements', 'currentPage', {
        name: game.i18n.localize('Farchievements.Settings.currentPage.Text'),
        hint: game.i18n.localize('Farchievements.Settings.currentPage.Hint'),
        scope: 'client',
        config: false,
		default: 1,
		type: Number,
    });
	game.settings.register('farchievements', 'GameSettingsButton', {
        name: game.i18n.localize('Farchievements.Settings.GameSettingsButton.Text'),
        hint: game.i18n.localize('Farchievements.Settings.GameSettingsButton.Hint'),
        scope: 'world',
        config: true,
        default: true,
        type: Boolean,
		onChange: debouncedReload,
    });
	game.settings.register('farchievements', 'AchievementWindowTitle', {
        name: game.i18n.localize('Farchievements.Settings.AchievementWindowTitle.Text'),
        hint: game.i18n.localize('Farchievements.Settings.AchievementWindowTitle.Hint'),
        scope: 'world',
        config: true,
        default: 'Your Achievements',
        type: String,
    });
	game.settings.register('farchievements', 'PlayerBackColor', {
        name: game.i18n.localize('Farchievements.Settings.PlayerBackColor.Text'),
        hint: game.i18n.localize('Farchievements.Settings.PlayerBackColor.Hint'),
        scope: 'world',
        config: true,
        default: true,
        type: Boolean,
    });
	game.settings.register('farchievements', 'HideUnknown', {
        name: game.i18n.localize('Farchievements.Settings.HideUnknown.Text'),
        hint: game.i18n.localize('Farchievements.Settings.HideUnknown.Hint'),
        scope: 'world',
        config: true,
        default: false,
        type: Boolean,
    });
	game.settings.register('farchievements', 'UnknownName', {
        name: game.i18n.localize('Farchievements.Settings.UnknownName.Text'),
        hint: game.i18n.localize('Farchievements.Settings.UnknownName.Hint'),
        scope: 'world',
        config: true,
        default: 'Unknown Achievement',
        type: String,
    });
	game.settings.register('farchievements', 'AlwaysShowName', {
        name: game.i18n.localize('Farchievements.Settings.AlwaysShowName.Text'),
        hint: game.i18n.localize('Farchievements.Settings.AlwaysShowName.Hint'),
        scope: 'world',
        config: true,
        default: false,
        type: Boolean,
    });
	game.settings.register('farchievements', 'UnknownDes', {
        name: game.i18n.localize('Farchievements.Settings.UnknownDes.Text'),
        hint: game.i18n.localize('Farchievements.Settings.UnknownDes.Hint'),
        scope: 'world',
        config: true,
        default: "",
        type: String,
    });
	game.settings.register('farchievements', 'AlwaysShowDes', {
        name: game.i18n.localize('Farchievements.Settings.AlwaysShowDes.Text'),
        hint: game.i18n.localize('Farchievements.Settings.AlwaysShowDes.Hint'),
        scope: 'world',
        config: true,
        default: false,
        type: Boolean,
    });
	game.settings.register('farchievements', 'DescriptionOnHover', {
        name: game.i18n.localize('Farchievements.Settings.DescriptionOnHover.Text'),
        hint: game.i18n.localize('Farchievements.Settings.DescriptionOnHover.Hint'),
        scope: 'world',
        config: true,
        default: true,
        type: Boolean,
    });
	game.settings.register('farchievements', 'achamount', {
        name: game.i18n.localize('Farchievements.Settings.achamount.Text'),
        hint: game.i18n.localize('Farchievements.Settings.achamount.Hint'),
        scope: 'world',
        config: true,
        default: "3",
        type: String,
    });
	game.settings.register('farchievements', 'standarticon', {
        name: game.i18n.localize('Farchievements.Settings.standarticon.Text'),
        hint: game.i18n.localize('Farchievements.Settings.standarticon.Hint'),
        scope: 'world',
        config: true,
        default: "modules/farchievements/standardIcon.PNG",
		type: String,
		filePicker: 'image',
    });	
	game.settings.register('farchievements', 'standardBackground', {
        name: game.i18n.localize('Farchievements.Settings.standardBackground.Text'),
        hint: game.i18n.localize('Farchievements.Settings.standardBackground.Hint'),
        scope: 'world',
        config: true,
        default: "modules/farchievements/farchievementslogo.png",
		type: String,
		filePicker: 'image',
    });
	game.settings.register('farchievements', 'bannerBackground', {
        name: game.i18n.localize('Farchievements.Settings.bannerBackground.Text'),
        hint: game.i18n.localize('Farchievements.Settings.bannerBackground.Hint'),
        scope: 'world',
        config: true,
        default: "modules/farchievements/achievementbanner.jpg",
		type: String,
		filePicker: 'image',
    });
	game.settings.register('farchievements', 'bannerAnimation', {
        name: game.i18n.localize('Farchievements.Settings.bannerAnimation.Text'),
        hint: game.i18n.localize('Farchievements.Settings.bannerAnimation.Hint'),
        scope: 'world',
        config: true,
        default: "upsize",
        type: String,
		choices: {
			"slidein": "sliding banner (SFX: stinger)",
			"fadeOut": "fade out (SFX: sound)",
		},
    });
	game.settings.register('farchievements', 'achievementStinger', {
        name: game.i18n.localize('Farchievements.Settings.achievementStinger.Text'),
		hint: game.i18n.localize('Farchievements.Settings.achievementStinger.Hint'),
        scope: 'world',
        config: true,
        default: "modules/farchievements/standardStinger_by_JFarenheit.mp3",
		type: String,
		filePicker: 'audio',
	});
	game.settings.register('farchievements', 'achievementSound', {
        name: game.i18n.localize('Farchievements.Settings.achievementSound.Text'),
		hint: game.i18n.localize('Farchievements.Settings.achievementSound.Hint'),
        scope: 'world',
        config: true,
        default: "modules/farchievements/mixkit-tile-game-reveal-960.mp3",
		type: String,
		filePicker: 'audio',
	});
	game.settings.register('farchievements', 'achievementStingerVolume', {
        name: game.i18n.localize('Farchievements.Settings.achievementStingerVolume.Text'),
        hint: game.i18n.localize('Farchievements.Settings.achievementStingerVolume.Hint'),
        scope: 'world',
        config: true,
        default: 0.1,
		type: Number,
		range: {
			min: 0,
			max: 1,
			step: 0.01
		}
    });
	game.settings.register('farchievements', 'achievementSoundVolume', {
        name: game.i18n.localize('Farchievements.Settings.achievementSoundVolume.Text'),
        hint: game.i18n.localize('Farchievements.Settings.achievementSoundVolume.Hint'),
        scope: 'world',
        config: true,
        default: 0.1,
		type: Number,
		range: {
			min: 0,
			max: 1,
			step: 0.01
		}
    });
	game.settings.register('farchievements', 'achpretext', {
        name: game.i18n.localize('Farchievements.Settings.achpretext.Text'),
        hint: game.i18n.localize('Farchievements.Settings.achpretext.Hint'),
        scope: 'world',
        config: true,
        default: "Achievement Gained: ",
        type: String,
    });
	game.settings.register('farchievements', 'greyscale', {
        name: game.i18n.localize('Farchievements.Settings.greyscale.Text'),
        hint: game.i18n.localize('Farchievements.Settings.greyscale.Hint'),
        scope: 'world',
        config: true,
        default: false,
        type: Boolean,
    });
	game.settings.register('farchievements', 'mystery', {
        name: game.i18n.localize('Farchievements.Settings.mystery.Text'),
        hint: game.i18n.localize('Farchievements.Settings.mystery.Hint'),
        scope: 'world',
        config: true,
        default: "modules/farchievements/mystery.jpg",
		type: String,
		filePicker: 'image',
    });
	game.settings.register('farchievements', 'achievementdata', {
        name: game.i18n.localize('Farchievements.Settings.AchievementData.Text'),
        hint: game.i18n.localize('Farchievements.Settings.AchievementData.Hint'),
        scope: 'world',
		config: true,
		default: "1:::Mounted////icons/sundries/misc/horseshoe-iron.webp////Acquire a mount.;;;2:::Translator////icons/sundries/scrolls/scroll-bound-blue-white.webp////Act as the party translator.;;;3:::Argumenter////icons/commodities/bones/beak-orange-green.webp////Argue with the DM over a dice roll.;;;4:::Bitte, Bitte Papa////icons/sundries/lights/candle-pillar-lit-yellow.webp////Ask a deity for a favor.;;;5:::Hardmode////icons/skills/wounds/injury-eyes-blood-red-pink.webp////Be deaf and blind simultaneously.;;;6:::You have no power here////icons/skills/wounds/injury-eyes-blood-red-pink.webp////Be ignored by the DM when citing rules.;;;7:::Special////icons/magic/unholy/silhouette-light-fire-blue.webp////Be the only person to roll 20 at a session;;;8:::Actor////icons/environment/people/spearfighter.webp////Beat a performance check while in disguise;;;9:::Deiety////icons/magic/holy/barrier-shield-winged-blue.webp////Become deified.;;;10:::Brute////icons/magic/earth/barrier-stone-brown-green.webp////Burst through a wall.;;;11:::Ouch////icons/skills/wounds/bone-broken-marrow-red.webp////Reach 0 HP twice in 1 encounter.;;;12:::Amazing Roleplayer////icons/skills/social/diplomacy-peace-alliance.webp////Roleplay your character exceptionally.;;;13:::(Un)advantage////icons/magic/control/voodoo-doll-pain-damage-purple.webp////Roll 2 1’s on an advantaged roll.;;;14:::Lucky////icons/magic/light/projectile-flare-blue.webp////Roll 2 20’s in a row.;;;15:::Never tell me the odds////icons/magic/control/buff-luck-fortune-clover-green.webp////Roll 2 20’s on a disadvantaged roll.;;;16:::Strongest in the Land////icons/skills/melee/unarmed-punch-fist.webp////Have a strength score over 20.;;;17:::Fastest in the Land////icons/magic/lightning/bolt-strike-cloud-gray.webp////Have a dexterity score over 20.;;;18:::Toughest in the Land////icons/magic/earth/strike-fist-stone-light.webp////Have a constitution score over 20.;;;19:::Smartest in the Land////icons/magic/control/silhouette-hold-beam-blue.webp////Have a intelligence score over 20.;;;20:::Wisest in the Land////icons/magic/nature/tree-elm-roots-brown.webp////Have a wisdom score over 20.;;;21:::The most Charming in the Land////icons/magic/unholy/strike-body-explode-disintegrate.webp////Have a charisma score over 20.;;;22:::I've nothing left to lose...////icons/magic/death/undead-skeleton-deformed-red.webp////...so the only path to choose is twisted. Be the sole survivor of a TPK;;;23:::Necromancer////icons/commodities/bones/bones-dragon-grey.webp////Raise the dead.;;;24:::Lorax////https://c.tenor.com/BzpCcZbxOAIAAAAd/lorax-the-lorax.gif////Speak for the trees;;;",
        type: String,
    });
	game.settings.register('farchievements', 'achievementdataNEW', {
        name: game.i18n.localize('Farchievements.Settings.achievementdataNEW.Text'),
        hint: game.i18n.localize('Farchievements.Settings.achievementdataNEW.Hint'),
        scope: 'world',
		config: true,
		default: '',
        type: String,
    });
	game.settings.register('farchievements', 'clientdataSYNC', {
        name: game.i18n.localize('Farchievements.Settings.ClientDataList.Text'),
        hint: game.i18n.localize('Farchievements.Settings.ClientDataList.Hint'),
        scope: 'world',
		config: false,
        default: "",
        type: String,
    });
	game.settings.register('farchievements', 'clientdata', {
        name: game.i18n.localize('Farchievements.Settings.ClientData.Text'),
        hint: game.i18n.localize('Farchievements.Settings.ClientData.Hint'),
        scope: 'client',
        config: false,
        default: "",
        type: String,
    });
	game.settings.register('farchievements', 'loadSettingsForPlayer', {
        name: game.i18n.localize('Farchievements.Settings.loadSettingsForPlayer.Text'),
        hint: game.i18n.localize('Farchievements.Settings.loadSettingsForPlayer.Hint'),
        scope: 'client',
        config: false,
        default: "",
        type: String,
    });
	console.log("Initialised Farchievements");
});
class Achievements {
    static addChatControl() {
		if(!game.settings.get('farchievements', 'EnableChatBarButton'))
			return;
        const chatControlLeft = document.getElementsByClassName("chat-control-icon")[0];
        let tableNode = document.getElementById("achievements-button");

        if (chatControlLeft && !tableNode) {
            const chatControlLeftNode = chatControlLeft.firstElementChild;
            const number = 3;
            tableNode = document.createElement("label");
			tableNode.className = "AchievmentButtonLabel";
            tableNode.innerHTML = `<i id="achievements-button" class="fas fa-medal achievements-button" style="text-shadow: 0 0 1px black;"></i>`;
            tableNode.onclick = Achievements.initializeAchievements;
            chatControlLeft.insertBefore(tableNode, chatControlLeftNode);
        }
	}
    static initializeAchievements() {
        if (this.AchievementsScreen === undefined) {
            this.AchievementsScreen = new AchievementsScreen();
        }
        this.AchievementsScreen.openDialog();
    } 
}
class AchievementsScreen extends Application {
	activateListeners(html) {
        super.activateListeners(html);
		html.find('.SyncAch').click(event => {
		   //update the actor
		   ui.notifications.notify("SYNC");
		});
	}
    openDialog() {
        //LOAD TEMPLATE DATA
        let $dialog = $('.achievementsscreen-window');
        if ($dialog.length > 0) {
            $dialog.remove();
            //return;
        }
        const templateData = {
            data: []
        };
        templateData.data = super.getData();
        templateData.title = "Farchievements";
		
        const templatePath = "modules/farchievements/AchievementsScreen.html";
		if(document.getElementsByClassName("achievementsscreen-window").length > 0){}
        AchievementsScreen.renderMenu(templatePath, templateData);

    }
    static renderMenu(path, data) {
        const dialogOptions = {
            width: 1050,
			heith: 630,
            top: 200,
            left: window.innerWidth/2 - 510,
            classes: ['achievementsscreen-window resizable']
        };
		dialogOptions.resizable = true;
        renderTemplate(path, data).then(dlg => {
            new Dialog({
                title: game.settings.get('farchievements', 'AchievementWindowTitle'),
                content: dlg,
                buttons: {}
            }, dialogOptions).render(true);
        });
    }
}
class AchievementSync{
	static sleep(ms){
	  return new Promise(resolve => setTimeout(resolve, ms));
	}
	static async PlayAnimation(achievementsGainedList){
		await game.settings.set('farchievements', 'clientdata', game.settings.get('farchievements', 'clientdata') + achievementsGainedList);
		let AchievementList = JSON.parse(game.settings.get('farchievements', 'achievementdataNEW'));
		let achievementsToGain = achievementsGainedList.split(",");
		let data;
		let name,icon;
		let toGain;
		let anim = game.settings.get('farchievements', 'bannerAnimation');
		
		for(let i = 0; i <= achievementsToGain.length; i++){
			await AchievementSync.sleep(100);
			
			//LOAD ACHIEVEMENT WITH NAME
			let AchievementToGain = AchievementList.find(ach => ach.name == achievementsToGain[i]);
			if(AchievementToGain == null) return;
			name = AchievementToGain.name;
			icon = AchievementToGain.image;
			if(icon == "icon"){icon = game.settings.get('farchievements', 'standarticon')} //IF STANDARD ICON USE ICON DEFINED IN GAMESETTINGS
			
			//SET HTML
			document.getElementsByClassName("AchievementText")[0].innerHTML = '<label class="AchievementTextLabel">'+game.settings.get("farchievements", "achpretext")+'</label>' + name;
			document.getElementById("AchievementIMG").src = icon;
			
			//SET GLOW
			if(AchievementToGain.glowing)
				document.getElementById("FoundryAchievements").classList.add('glowingAch');
			else
				document.getElementById("FoundryAchievements").classList.remove('glowingAch');
			
			//SET ANIMATION

			let dur = 13;
			if(anim == "fadeOut") 
				dur = 3;
				
			let durText = ""+dur+"s";
			document.getElementById("Achievementbar").style.setProperty("animation-name", anim);
			document.getElementById("Achievementbar").style.setProperty("animation-duration", durText);
			
			//PLAY DIFFERENT AUDIO BASED ON ANIM
			if(anim == "fadeOut")
				await AudioHelper.play({ src: game.settings.get('farchievements', 'achievementSound'), volume: game.settings.get('farchievements', 'achievementSoundVolume'), autoplay: true, loop: false}, false);
			else
				await AudioHelper.play({ src: game.settings.get('farchievements', 'achievementStinger'), volume: game.settings.get('farchievements', 'achievementStingerVolume'), autoplay: true, loop: false}, false);
			
			if(anim == "slidein")
				await AchievementSync.sleep(1800);
			document.getElementById("Achievementbar").style.setProperty("display", "flex");//ENABLE ACHIEVEMENT
			
			//CREATE MESSAGE
			if (game.settings.get('farchievements', 'EnableAchievementMessage')){

				let tempUserName = game.user.name;
				ChatMessage.create({
					user: game.user.id,
					content: `${tempUserName} ${game.i18n.localize('Farchievements.GainedAchivement')} '${name}' ${game.i18n.localize('Farchievements.Achievement')}`,
					blind: false,
				});
            }
			//?CONFETTI MODULE
			if (game.modules.get('confetti')?.active === true && game.settings.get('farchievements', 'EnableConfettiSupport')){
				for(let c = 0; c <3; c++){
					await AchievementSync.sleep(500);
					const strength = window.confetti.confettiStrength.high;
					const shootConfettiProps = window.confetti.getShootConfettiProps(strength);
					window.confetti.handleShootConfetti(shootConfettiProps);
				}
			}
			else
			await AchievementSync.sleep(dur*1000);
			document.getElementById("Achievementbar").style.setProperty("display", "none");
			//game.settings.set('farchievements', 'clientdata', game.settings.get('farchievements', 'clientdata') + "," +name);
		}
	}
	static SyncAchievements(skip = null){
		//console.log("SYNC Achievements");//DEBUG
		if(game.user.isGM){
			if(!game.ready) return; //IF GAME IS READY, ELSE CHANGES WOULDN'T BE SAVED
			//CHECK FOR NEW USERS
			if(document.getElementById('SyncAchUnsaved') != null){
				document.getElementById('SyncAchUnsaved').id = "SyncAch";
			}
			//OLD CODE REDUNDANT WITH NEW DATA STRUCTURE
			/*let clientDataSYNC = game.settings.get('farchievements', 'clientdataSYNC');
			if(clientDataSYNC == ""){ //IF THERE ARE NO USERS YET ADD ALL OF THEM
				for(let i = 0; i < game.users.contents.length; i++){
					if(game.users.contents[i].isGM) continue;
					clientDataSYNC += game.users.contents[i].id + ":||"
					console.log("Foundry Achievements | Added "+game.users.contents[i].name+" with ID: " + game.users.contents[i].id);
				}
			}
			else{
				for(let i = 0; i < game.users.contents.length; i++){
					if(game.users.contents[i].isGM) continue;
					if(!clientDataSYNC.includes(game.users.contents[i].id)){ //IF A NEW USER IS DETECTED ADD HIM TO THE SYNC SETTING
						clientDataSYNC += game.users.contents[i].id + ":||"
						//ui.notifications.notify("Foundry Achievements | Added "+game.users.contents[i].name+" with ID: " + game.users.contents[i].id);
						console.log("Foundry Achievements | Added "+game.users.contents[i].name+" with ID: " + game.users.contents[i].id);
					}
				}
				//CHECK FOR REDUNDANT USERS AND REMOVE THEM
				let userID;
				let ToSYNC = clientDataSYNC.split('||');
				if(game.users.contents.length == 1){
					ui.notifications.notify("Farchievements | you need to create some players in order to use this module");
					return;
				}
				for(let i = 0; i < clientDataSYNC.split('||').length; i++){
					userID = clientDataSYNC.split('||')[i].split(":")[0];
					if(game.users.get(userID) == null){ //IF A NEW USER IS DETECTED ADD HIM TO THE SYNC SETTING
						//ToSYNC.pop(i);
						ToSYNC.splice(i, 1);
						clientDataSYNC = ToSYNC.join("||") + "||";
						//console.log(clientDataSYNC);
						if(userID != "")
						ui.notifications.notify(game.i18n.localize('Farchievements.Notification.Prefix') + game.i18n.localize('Farchievements.Notification.PlayerIdChanged') + userID);
						
					}
				}
				
			 }*/
			//game.settings.set('farchievements', 'clientdataSYNC', clientDataSYNC);
		}
		else{//IF USER IS PLAYER
			//FOR EACH ACHIEVEMENT IF NOT IN CLIENTDATA PLAY ANIMATION AND ADD IT
			let AchievementList = JSON.parse(game.settings.get('farchievements', 'achievementdataNEW'));
			let existingAchievements = game.settings.get('farchievements', 'clientdata');
			let AchievementsToPlay = "";
			
			AchievementList.forEach (function (achievement, index) {
				if(achievement.players.includes(game.userId)){
					//ADD TO LIST
					if(existingAchievements.includes(achievement.name))return;
					AchievementsToPlay += achievement.name + ",";
				}
			});
			//console.log(AchievementsToPlay);
			if(AchievementsToPlay != ""){
				let amount = AchievementsToPlay.split(",").length -2;
				if(skip == true){
					game.settings.set('farchievements', 'clientdata', game.settings.get('farchievements', 'clientdata') + AchievementsToPlay);
					return;
				}
				if(amount > 5 ){
					let d = new Dialog({
						 title: `${game.i18n.localize('Farchievements.Html.SanitySaver.Title')}`,
						 content: `${game.i18n.localize('Farchievements.Html.SanitySaver.Body1')} `+ amount +`${game.i18n.localize('Farchievements.Html.SanitySaver.Body2')}`,
						 buttons: {
						  one: {
						   icon: '<i class="fas fa-check"></i>',
						   label:  `${game.i18n.localize('Farchievements.Html.SanitySaver.ButtonSeeAll')}`,
						   callback: () => AchievementSync.PlayAnimation(AchievementsToPlay)
						  },
						  two: {
						   icon: '<i class="fas fa-times"></i>',
						  label: `${game.i18n.localize('Farchievements.Html.SanitySaver.ButtonSkip')}`,
						   callback: () => game.settings.set('farchievements', 'clientdata', game.settings.get('farchievements', 'clientdata') + AchievementsToPlay)
						  }
						 },
						 default: "two",
						});
						d.render(true);
				}
				else{
					AchievementSync.PlayAnimation(AchievementsToPlay);
				}
			}
			//PLAY LIST AS ANIMATION 
			//console.log(AchievementList);//DEBUG
				if(document.getElementById("AchievementScript")!= null)//IF USER IS ON THE ACHIEVEMENTSSCREEN, RELOAD IT
					document.getElementById("AchievementScript").onclick();
		}
	}
}
Hooks.on('renderSceneNavigation', async function() {
        Achievements.addChatControl();
        //console.log("AchievementsScreen GM true");
		let style = await game.settings.get("farchievements", "bannerBackground");
		let banner = "";
		
		if(style != "")
			banner = "background: url("+style+")!important;";
		
		let bannerstyle = 'top: -200px; '+banner+' background-position: center!important; display: flex;  background-size: 100% 100% !important;';
		var el = `<div id="Achievementbar" style="display: none;" class="Achievementbar"><div id="FoundryAchievements" class="FoundryAchievementsBanner" style="`+bannerstyle+`"><img id="AchievementIMG" class="AchievementIMG" src="modules/farchievements/standardIcon.PNG"></img><p class="AchievementText"><label class="AchievementTextLabel">${game.i18n.localize('Farchievements.NewAchievement')}</label> (${game.i18n.localize('Farchievements.Achievement')}) </p><i class="Shiny"></i></div></div>`;
		document.getElementById("notifications").innerHTML = el;
});
Hooks.on('ready', async function() {
	//START MIGRATION
	if(game.user.isGM && game.settings.get('farchievements', 'achievementdataNEW') == ""){
		Farchievements.MigrateAchievements();
	}
	//sync achievements
	if(!game.user.isGM)
		AchievementSync.SyncAchievements(game.settings.get('farchievements', 'showAchOnStartup'));
});

Hooks.on('renderSettings', function() {
	//ADD BUTTON TO SETTINGS
	function refreshData(){
		let x = 0.1;  // 0.1 seconds
		
		if(document.getElementById("FarchievementsSettings") == null && game.settings.get('farchievements', 'GameSettingsButton')){
			$('#settings-game').append(`<div id="FarchievementsSettings" style="margin:0;"><h4>Farchievements</h4><button id="SettingsAchievementsButton" data-action="Achievements"><i class="fas fa-medal achievements-button"></i>${game.i18n.localize('Farchievements.Achievements')}</button></div>`);
			let AchievementsButton = document.getElementById("SettingsAchievementsButton");
			if(AchievementsButton != null)
			AchievementsButton.onclick = Achievements.initializeAchievements;
		}
		// Do your thing here
		//ui.notifications.notify("Test");
		if(document.getElementsByClassName("context-items")[0] != null){
			if(document.getElementById("contextAchievement") == null){
				if(document.getElementsByClassName("context-items")[0].closest('.player') != null){
					let id = document.getElementsByClassName("context-items")[0].closest('.player').getAttribute("data-user-id");
					if(id != game.user.id && game.user.isGM){//You can't open your own achievements
						$(".context-items").append(`<li class="context-item" id="contextAchievement"><i class="fas fa-medal"></i> ${game.i18n.localize('Farchievements.ViewAchievements')}</li>`);
						let AchievmentContextButton = document.getElementById("contextAchievement");
						game.settings.set('farchievements', 'loadSettingsForPlayer', id);
						AchievmentContextButton.onclick = Achievements.initializeAchievements;
					}
				}
			}
		}
	
		setTimeout(refreshData, x*1000);
	}
	if(game.user.isGM){
		function WaitForReady(){
			let x = 0.1;  // 0.1 seconds
			// Do your thing here
			if(game.ready == true){
				AchievementSync.SyncAchievements();
			}
			else
			setTimeout(WaitForReady, x*1000);
		}
		WaitForReady();
	}
	
	refreshData();
});
Hooks.on("createChatMessage", async function (message){
	if(message.content.includes('Achievements Synced'))
	AchievementSync.SyncAchievements();

if(message.content.includes("Farchievements-SyncRequest")){
	if(!game.user.isGM)return;
	let NAME = message.content.split("|")[1];
	let ACHIEVMENTNAME = message.content.split("|")[2];
	//==========================================
	let achData = game.settings.get('farchievements', 'achievementdata').split(';;;');
	let dataArray = game.settings.get('farchievements', 'clientdataSYNC').split("||");
	let Player, achievementID, dataArrayPlayer, toSYNC, PID;
	if(NAME != "")
	Player = game.users.getName(NAME);
	else{
	Player = game.user;
	}
	if(Player == null){
		ui.notifications.error(game.i18n.localize('Farchievements.Notification.Prefix') + game.i18n.localize('Farchievements.Notification.UserDoesNotExist'));
		return;
	}
	PID = dataArray.indexOf(dataArray.filter(entry => entry.includes(Player.id))[0]);
	achievementID = achData.filter(entry => entry.split("////")[0].includes(ACHIEVMENTNAME))[0][0];
	if(dataArray[PID] == "" || dataArray[PID] == null){ // IF NO DATA YET
				dataArrayPlayer = game.users._source[PID].id + ":" + achievementID + ",";
				dataArray[PID] = dataArrayPlayer;
				toSYNC = dataArray.join("||");
				console.log(toSYNC);
				//await game.settings.set('farchievements', 'clientdataSYNC', toSYNC);

				console.log("Setting Achievement: " + achievementname + "(ID:"+ achievementID + ")" + " for user: " + playerName);
				return;
	}
	else{
		dataArrayPlayer = dataArray[PID].split(":")[0] + ":" + dataArray[PID].split(":")[1] + achievementID + ",";
		dataArray[PID] = dataArrayPlayer;
		toSYNC = dataArray.join("||");
		console.log(toSYNC);
	}
	await game.settings.set('farchievements', 'clientdataSYNC', toSYNC);

	ChatMessage.create({
		user : game.user.id,
		content: 'Achievements Synced',
		blind: false,
		whisper : game.users.entities.filter(u => u.isGM).map(u => u.id)
	});
	ui.notifications.notify('Achievements Synced');
	AchievementSync.SyncAchievements();
}});

window.farchievements_DEBUG_Reset_EVERYTHING = async function resetSettings(){
	if(!game.user.isGM) return;
	await game.settings.set('farchievements', 'achievementdata', "1:::Mounted////systems/dnd5e/icons/items/inventory/horseshoe.jpg////Acquire a mount.;;;2:::Translator////systems/dnd5e/icons/items/inventory/note-scroll.jpg////Act as the party translator.;;;3:::Argumenter////systems/dnd5e/icons/items/inventory/monster-beak.jpg////Argue with the DM over a dice roll.;;;4:::Bitte, Bitte Papa////systems/dnd5e/icons/items/inventory/runestone-dwarven.jpg////Ask a deity for a favor.;;;5:::Hardmode////icons/skills/wounds/injury-eyes-blood-red-pink.webp////Be deaf and blind simultaneously.;;;6:::You have no power here////systems/dnd5e/icons/skills/blood_12.jpg////Be ignored by the DM when citing rules.;;;7:::Special////systems/dnd5e/icons/skills/green_27.jpg////Be the only person to roll 20 at a session;;;8:::Actor////systems/dnd5e/icons/skills/emerald_07.jpg////Beat a performance check while in disguise;;;9:::Deiety////systems/dnd5e/icons/skills/yellow_13.jpg////Become deified.;;;10:::Brute////icons/magic/earth/barrier-stone-brown-green.webp////Burst through a wall.;;;11:::Ouch////https://assets.forge-vtt.com/5fa2d7054f8a4cf1b34c8a38/Icons/spellbook_page1/SpellBook08_13.png////Reach 0 HP twice in 1 encounter.;;;12:::Amazing Roleplayer////icons/skills/social/diplomacy-peace-alliance.webp////Roleplay your character exceptionally.;;;13:::(Un)advantage////icons/magic/control/voodoo-doll-pain-damage-purple.webp////Roll 2 1’s on an advantaged roll.;;;14:::Lucky////icons/magic/light/projectile-flare-blue.webp////Roll 2 20’s in a row.;;;15:::Never tell me the odds////icons/magic/control/buff-luck-fortune-clover-green.webp////Roll 2 20’s on a disadvantaged roll.;;;16:::Strongest in the Land////icons/skills/melee/unarmed-punch-fist.webp////Have a strength score over 20.;;;17:::Fastest in the Land////icons/magic/lightning/bolt-strike-cloud-gray.webp////Have a dexterity score over 20.;;;18:::Toughest in the Land////icons/magic/earth/strike-fist-stone-light.webp////Have a constitution score over 20.;;;19:::Smartest in the Land////icons/magic/control/silhouette-hold-beam-blue.webp////Have a intelligence score over 20.;;;20:::Wisest in the Land////icons/magic/nature/tree-elm-roots-brown.webp////Have a wisdom score over 20.;;;21:::The most Charming in the Land////icons/magic/unholy/strike-body-explode-disintegrate.webp////Have a charisma score over 20.;;;22:::I've nothing left to lose...////icons/magic/death/undead-skeleton-deformed-red.webp////...so the only path to choose is twisted. Be the sole survivor of a TPK;;;23:::Necromancer////icons/commodities/bones/bones-dragon-grey.webp////Raise the dead.;;;24:::Lorax////https://c.tenor.com/BzpCcZbxOAIAAAAd/lorax-the-lorax.gif////Speak for the trees;;;");
	await game.settings.set('farchievements', 'achievementdataNEW',"");
	await game.settings.set('farchievements', 'clientdataSYNC',"");
	await game.settings.set('farchievements', 'clientdata', "");
}
window.farchievements_DEBUG_Reset_PlayerAchievements = async function resetPlayers(){
	if(!game.user.isGM) return;
	await game.settings.set('farchievements', 'clientdataSYNC',"");
	await game.settings.set('farchievements', 'clientdata', "");
	location.reload();
}

//PUBLICLY ACCESSIBLE FUNCTIONS		
window.Farchievements = class Farchievement{
	static Open (){
		$("#SettingsAchievementsButton").click()
	}
	static Render (){
		$("#SettingsAchievementsButton").click()
	}
	static async AddAchievement(AchievementName, PlayerName){
		if(!game.user.isGM) return;
		console.log(AchievementName);
		let data = game.settings.get('farchievements', 'achievementdata').split(';;;');
		let AchievementID, PlayerID;
		for(let i = 0; i < game.settings.get('farchievements', 'achievementdata').split(';;;').length; i++){
			if(AchievementName == game.settings.get('farchievements', 'achievementdata').split(';;;')[i].split('////')[0].split(":::")[1]){
				AchievementID = game.settings.get('farchievements', 'achievementdata').split(';;;')[i].split('////')[0].split(":::")[0] - 1;
			}
		}
		PlayerID = game.users.getName(PlayerName).id;

		if(PlayerID == null){
			ui.notifications.warn("Farchievements | Is the player name right?")
			return;
		}
		if(AchievementID == null){
			ui.notifications.warn("Farchievements | Is the achievement name right?")
			return;
		}
		addAchievementFromCommand(AchievementID, PlayerID);
	}
	static async RemoveAchievement(AchievementName, PlayerName){
		if(!game.user.isGM) return;
		console.log(AchievementName);
		let data = game.settings.get('farchievements', 'achievementdata').split(';;;');
		let AchievementID, PlayerID;
		for(let i = 0; i < game.settings.get('farchievements', 'achievementdata').split(';;;').length; i++){
			if(AchievementName == game.settings.get('farchievements', 'achievementdata').split(';;;')[i].split('////')[0].split(":::")[1]){
				AchievementID = game.settings.get('farchievements', 'achievementdata').split(';;;')[i].split('////')[0].split(":::")[0] - 1;
			}
		}
		PlayerID = game.users.getName(PlayerName).id;

		if(PlayerID == null){
			ui.notifications.warn("Farchievements | Is the player name right?")
			return;
		}
		if(AchievementID == null){
			ui.notifications.warn("Farchievements | Is the achievement name right?")
			return;
		}
		removeAchievementFromCommand(AchievementID, PlayerID);
	}
	static async MigrateAchievements(){
		await ui.notifications.notify("Farchievements | Beginning migration of old data...");
		//console.log(game.settings.get('farchievements', 'achievementdataNEW'));
		await game.settings.set('farchievements', 'currentPage', 1);
		let oldData = game.settings.get('farchievements', 'achievementdata');
		let oldDataArr = oldData.split(";;;");
		let oldClientData = game.settings.get('farchievements', 'clientdataSYNC');
		let oldClientDataArr = oldClientData.split("||");
		let newData = "";
		let AchievementList = [];
		//console.log(oldDataArr.length);
		for(let i = 0; i < oldDataArr.length -1; i++){//FOR EVERY OLD ACHIEVEMENT
			//console.log(oldDataArr[i]);
			//constructor: name, description, image, players
			let playerslist = [];
			if(oldClientData != ""){
				for(let j = 0; j < oldClientDataArr.length -1; j++){//FOR EVERY CLIENT
					if(oldClientDataArr[j] == "")continue;
					if(oldClientDataArr[j].split(":")[1] == "")continue;
					
					let clientAchArray = oldClientDataArr[j].split(":")[1].split(",");
					for(let k = 0; k < clientAchArray.length-1; k++){//FOR EVERY ENTRY IN THE CLIENT ACHIEVEMENTS LIST
						if(clientAchArray[k] == i){
							playerslist.push(oldClientDataArr[j].split(":")[0]);
						}
					}
				}
			}
			
			let newAch = new Achievement(oldDataArr[i].split(":::")[1].split("////")[0], oldDataArr[i].split("////")[2], oldDataArr[i].split("////")[1], playerslist);
			if(AchievementList.find(ach => ach.name == newAch.name)){
				var number = AchievementList.filter(ach => ach.name.includes(newAch.name)).length
				newAch.name += "("+number+")"
			}
			//console.log(newAch);
			AchievementList.push(newAch);
		}
		//console.log(game.settings.get('farchievements', 'achievementdataNEW'));
		let data = JSON.stringify(AchievementList);
		//console.log(data);
		//let TestData = JSON.parse(data);
		game.settings.set('farchievements', 'achievementdataNEW', data);
		await ui.notifications.notify("Farchievements | Migration Finished");

	}
	static async debugAchievements(){
		return JSON.parse(game.settings.get('farchievements', 'achievementdataNEW'));
	}
}

async function addAchievementFromCommand(achievementID, PID) {
			let cleanPlayerID = game.users.contents.indexOf(game.users.get(PID)) - 1;
			let dataPlayerID = cleanPlayerID; //++xathick
			let player = game.users.get(PID);
			let playerName = player.name;
			let clientdataSYNC = game.settings.get('farchievements', 'clientdataSYNC'); //GET DATA
			let dataArray = clientdataSYNC.split("||"); //DATA TO ARRAY
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
				if (document.getElementById('AchPlayerNav').className == "AchPlayerNav") //CHECK FOR EDITING WITHIN NORMAL WINDOW
				{
					await game.settings.set('farchievements', 'loadSettingsForPlayer', PID);
					$('#achsyncnormalmode').append('<i id="SyncAch2" onclick="SendSyncMessage()" class="fas fa-sync achievementsettings" title="Click to push changes right now"></i>');
					loadAchievements();
				}
				else
					loadAchievementsEditMode();
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
				let toReplace = achievementID + ",";//REPLACE FIRST ENTRY IN DATA
				var firstDataArray = dataArray[dataPlayerID].split(":")[1].split(",");
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
				if (document.getElementById('SyncAchUnsaved').value == toSYNC) {
					document.getElementById('SyncAchUnsaved').id = "SyncAch";
					document.getElementById('SyncAch').value = "";
				}
			}
			if (document.getElementById('SyncAch') != null) {
				document.getElementById('SyncAch').value = toSYNC;
				document.getElementById('SyncAch').id = "SyncAchUnsaved";
			}

			await game.settings.set('farchievements', 'clientdataSYNC', toSYNC);
			SendSyncMessage();
			//RELOAD ANY OPEN WINDOW
			if(document.getElementById('AchPlayerNav') == null) return;
			if (document.getElementById('AchPlayerNav').className == "AchPlayerNav") //CHECK FOR EDITING WITHIN NORMAL WINDOW
			{
				await game.settings.set('farchievements', 'loadSettingsForPlayer', PID);
				$('#achsyncnormalmode').append('<i id="SyncAch2" onclick="SendSyncMessage()" class="fas fa-sync achievementsettings" title="Click to push changes right now"></i>');
				window.loadAchievements();
			}
			else
				window.loadAchievementsEditMode();
}
async function removeAchievementFromCommand(achievementID, PID) {
			let cleanPlayerID = game.users.contents.indexOf(game.users.get(PID)) - 1;
			let dataPlayerID = cleanPlayerID; //++xathick
			let player = game.users.get(PID);
			let playerName = player.name;
			let clientdataSYNC = game.settings.get('farchievements', 'clientdataSYNC'); //GET DATA
			let dataArray = clientdataSYNC.split("||"); //DATA TO ARRAY
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
				if (document.getElementById('AchPlayerNav').className == "AchPlayerNav") //CHECK FOR EDITING WITHIN NORMAL WINDOW
				{
					await game.settings.set('farchievements', 'loadSettingsForPlayer', PID);
					$('#achsyncnormalmode').append('<i id="SyncAch2" onclick="SendSyncMessage()" class="fas fa-sync achievementsettings" title="Click to push changes right now"></i>');
					loadAchievements();
				}
				else
					loadAchievementsEditMode();
				return;
			}

			if (dataArray[dataPlayerID].split(":")[1].includes(',' + "" + achievementID + ',')) { //DETECT EXISTING ACHIEVEMENT, REMOVE IT
				let toReplace = achievementID + ",";//REPLACE FROM WITHIN DATA
				dataArrayPlayer = dataArray[dataPlayerID].split(":")[0] + ":" + dataArray[dataPlayerID].split(":")[1].replace(toReplace, "");
				dataArray[dataPlayerID] = dataArrayPlayer;
				toSYNC = dataArray.join("||");
				//console.log(toSYNC);
			}
			else if (dataArray[dataPlayerID].split(":")[1].split(",")[0] == "" + achievementID) { //FIRST ACHIEVEMENT IN DATA?
				let toReplace = achievementID + ",";//REPLACE FIRST ENTRY IN DATA
				var firstDataArray = dataArray[dataPlayerID].split(":")[1].split(",");
				firstDataArray.shift();
				dataArray[dataPlayerID] = dataArray[dataPlayerID].split(":")[0] + ":" + firstDataArray;
				toSYNC = dataArray.join("||");
				//console.log(toSYNC);
			}
			else if (dataArray[dataPlayerID].split(":")[1].split(",")[dataArray[dataPlayerID].split(":")[1].split(",")[0].length + 1] == "" + achievementID) { //LAST ACHIEVEMENT IN DATA?
				let toReplace = achievementID + ",";//REPLACE FIRST ENTRY IN DATA
				var firstDataArray = dataArray[dataPlayerID].split(":")[1].split(",");
				firstDataArray.pop();
				dataArray[dataPlayerID] = dataArray[dataPlayerID].split(":")[0] + ":" + firstDataArray;
				toSYNC = dataArray.join("||");
				//console.log(toSYNC);
			}
			if (document.getElementById('SyncAchUnsaved') != null) {
				if (document.getElementById('SyncAchUnsaved').value == toSYNC) {
					document.getElementById('SyncAchUnsaved').id = "SyncAch";
					document.getElementById('SyncAch').value = "";
				}
			}
			if (document.getElementById('SyncAch') != null) {
				document.getElementById('SyncAch').value = toSYNC;
				document.getElementById('SyncAch').id = "SyncAchUnsaved";
			}

			await game.settings.set('farchievements', 'clientdataSYNC', toSYNC);
			SendSyncMessage();
			//RELOAD ANY OPEN WINDOW
			if(document.getElementById('AchPlayerNav') == null) return;
			if (document.getElementById('AchPlayerNav').className == "AchPlayerNav") //CHECK FOR EDITING WITHIN NORMAL WINDOW
			{
				await game.settings.set('farchievements', 'loadSettingsForPlayer', PID);
				$('#achsyncnormalmode').append('<i id="SyncAch2" onclick="SendSyncMessage()" class="fas fa-sync achievementsettings" title="Click to push changes right now"></i>');
				window.loadAchievements();
			}
			else
				window.loadAchievementsEditMode();
}

async function SendSyncMessage() {
	ChatMessage.create({
		user: game.user._id,
		content: "Achievements Synced",
		blind: false,
		whisper: game.users.filter(u => u.isGM).map(u => u.id)
	});

	if(document.getElementById('achsyncnormalmode') != null)
		if (document.getElementById('achsyncnormalmode').innerHTML != "") 
			document.getElementById('achsyncnormalmode').innerHTML = "";
}

class Achievement{
	constructor(name, description, image, players){
		this.name = name;
		this.description = description;
		this.image = image;
		this.players = players;
	}
}