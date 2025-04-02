Hooks.once('init', function () {
    const debouncedReload = debounce(() => window.location.reload(), 100);
    game.settings.register('farchievements', 'EnableAchievementPopup', {
        name: game.i18n.localize('Farchievements.Settings.EnableAchievementPopup.Text'),
        hint: game.i18n.localize('Farchievements.Settings.EnableAchievementPopup.Hint'),
        scope: 'world',
        config: true,
        default: true,
        type: Boolean,
    });
    // New setting: Disable achievement banner
    game.settings.register('farchievements', 'DisableAchievementBanner', {
        name: game.i18n.localize('Farchievements.Settings.DisableAchievementBanner.Text'),
        hint: game.i18n.localize('Farchievements.Settings.DisableAchievementBanner.Hint'),
        scope: 'world',
        config: true,
        default: false,
        type: Boolean,
    });
    game.settings.register('farchievements', 'showAchOnStartup', {
        name: game.i18n.localize('Farchievements.Settings.showAchOnStartup.Text'),
        hint: game.i18n.localize('Farchievements.Settings.showAchOnStartup.Hint'),
        scope: 'client',
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
    game.settings.register('farchievements', 'chatMessage', {
        name: game.i18n.localize('Farchievements.Settings.ChatMessage.Text'),
        hint: game.i18n.localize('Farchievements.Settings.ChatMessage.Hint'),
        scope: 'world',
        config: true,
        default: true,
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
        config: false,
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
        default: "slidein",
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
        config: false,
        default: "1:::Mounted////icons/sundries/misc/horseshoe-iron.webp////Acquire a mount.;;;2:::Translator////icons/sundries/scrolls/scroll-bound-blue-white.webp////Act as the party translator.;;;3:::Argumenter////icons/commodities/bones/beak-orange-green.webp////Argue with the DM over a dice roll.;;;4:::Bitte, Bitte Papa////icons/sundries/lights/candle-pillar-lit-yellow.webp////Ask a deity for a favor.;;;5:::Hardmode////icons/skills/wounds/injury-eyes-blood-red-pink.webp////Be deaf and blind simultaneously.;;;6:::You have no power here////icons/skills/wounds/injury-eyes-blood-red-pink.webp////Be ignored by the DM when citing rules.;;;7:::Special////icons/magic/unholy/silhouette-light-fire-blue.webp////Be the only person to roll 20 at a session;;;8:::Actor////icons/environment/people/spearfighter.webp////Beat a performance check while in disguise;;;9:::Deiety////icons/magic/holy/barrier-shield-winged-blue.webp////Become deified.;;;10:::Brute////icons/magic/earth/barrier-stone-brown-green.webp////Burst through a wall.;;;11:::Ouch////icons/skills/wounds/bone-broken-marrow-red.webp////Reach 0 HP twice in 1 encounter.;;;12:::Amazing Roleplayer////icons/skills/social/diplomacy-peace-alliance.webp////Roleplay your character exceptionally.;;;13:::(Un)advantage////icons/magic/control/voodoo-doll-pain-damage-purple.webp////Roll 2 1’s on an advantaged roll.;;;14:::Lucky////icons/magic/light/projectile-flare-blue.webp////Roll 2 20’s in a row.;;;15:::Never tell me the odds////icons/magic/control/buff-luck-fortune-clover-green.webp////Roll 2 20’s on a disadvantaged roll.;;;16:::Strongest in the Land////icons/skills/melee/unarmed-punch-fist.webp////Have a strength score over 20.;;;17:::Fastest in the Land////icons/magic/lightning/bolt-strike-cloud-gray.webp////Have a dexterity score over 20.;;;18:::Toughest in the Land////icons/magic/earth/strike-fist-stone-light.webp////Have a constitution score over 20.;;;19:::Smartest in the Land////icons/magic/control/silhouette-hold-beam-blue.webp////Have a intelligence score over 20.;;;20:::Wisest in the Land////icons/magic/nature/tree-elm-roots-brown.webp////Have a wisdom score over 20.;;;21:::The most Charming in the Land////icons/magic/unholy/strike-body-explode-disintegrate.webp////Have a charisma score over 20.;;;22:::I have nothing left to lose...////icons/magic/death/undead-skeleton-deformed-red.webp////...so the only path to choose is twisted. Be the sole survivor of a TPK;;;23:::Necromancer////icons/commodities/bones/bones-dragon-grey.webp////Raise the dead.;;;24:::Lorax////https://c.tenor.com/BzpCcZbxOAIAAAAd/lorax-the-lorax.gif////Speak for the trees;;;",
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
    game.settings.register('farchievements', 'lastSearchTerm', {
        name: 'Farchievements.Settings.lastSearchTerm.Text',
        hint: 'this will hold the last searched term for the search functionality, this will reset when the screen is opened',
        scope: 'client',
        config: false,
        default: "",
        type: String,
    });

    game.settings.register('farchievements', 'lastSortType', {
        name: 'Farchievements.Settings.lastSortType.Text',
        hint: 'this will hold the sort type for the sort functionality',
        scope: 'client',
        config: false,
        default: "nameAsc",
        type: String,
    });


    // Discord intermediary (cannot use discord directly :( )
    console.log("My Achievement Notifier | Initializing");

    // Register settings
    game.settings.register("my-achievement-notifier", "discordBackendEnabled", {
        name: "Enable Discord Notifications",
        hint: "Send a notification to a Discord channel via a backend service when an achievement is granted.",
        scope: "world", // Or "client" if you prefer per-user config, "world" is usually best for URLs/secrets
        config: true, // Show in module settings
        type: Boolean,
        default: false,
    });

    game.settings.register("my-achievement-notifier", "discordBackendUrl", {
        name: "Backend Notification URL",
        hint: "The full URL of your backend service endpoint (e.g., https://your-backend.com/notify-achievement).",
        scope: "world",
        config: true,
        type: String,
        default: "",
    });

    // IMPORTANT: This secret authenticates Foundry to YOUR backend. It is NOT your Discord Bot Token.
    game.settings.register("my-achievement-notifier", "discordBackendSecret", {
        name: "Backend Shared Secret",
        hint: "A secret password shared between Foundry and your backend to verify requests.",
        scope: "world",
        config: true,
        type: String, // Consider using a custom editor or type:'password' if available/suitable
        default: "",
    });
    console.log("Initialised Farchievements");
});