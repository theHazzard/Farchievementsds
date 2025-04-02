Hooks.on("renderChatMessage", (chatMessage: unknown, html: JQuery, data: unknown) => {
    console.log(data);
    if (html.find(".achGainedChatText").length) {
        html.addClass("achievementChatDisplayMessage");
    }
});
