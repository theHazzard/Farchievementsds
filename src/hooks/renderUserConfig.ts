Hooks.on('renderUserConfig', (app: App, html: HTMLElement) => {
    // Only add the field for GMs
    if (!game.user?.isGM) {
        return;
    }

    // Get the user being configured by this sheet
    const targetUser = app.document as User;
    if (!targetUser) return;

    const currentDiscordId = targetUser.getFlag("farchievements", 'discordId') ?? '';

    const parser = new DOMParser();
    const inputHtml = `
    <fieldset>
        <legend>El Hazzy Discrod notifcations!</legend>
        <div class="form-group">
            <label>Discord User ID</label>
            <div class="form-fields">
                <input id="elhazzy-ds-achievement-award-discordid" type="text" value="${currentDiscordId}" placeholder="Enter 17-20 digit Discord User ID" pattern="^\\d{17,20}$" title="Discord User ID must be 17-20 digits."/>
            </div>
            <p class="hint">Needed for Discord achievement notification mentions. User must enable Developer Mode in Discord, right-click their name, and Copy User ID.</p>
        </div>
    </fieldset>
    `;
    const element = parser.parseFromString(inputHtml, 'text/html');
    const elementHTML = element.body.firstElementChild;


    // Find a good place to inject the field, e.g., before the Player Color input
    const formFooter = html.getElementsByClassName('form-footer');
    formFooter[0].before(elementHTML as Node);

    // Adjust window height to make sure the new field fits
    app.setPosition({ height: 'auto' });

    html.addEventListener('submit', async () => {
        // No preventDefault needed generally

        if (!game.user?.isGM) return;

        // Find our input field within the form
        const discordIdInput = html.querySelector('#elhazzy-ds-achievement-award-discordid') as HTMLInputElement | null;

        if (discordIdInput) {
            const discordIdValue = discordIdInput.value?.trim() || "";
            const userIdRegex = /^\d{17,20}$/;

            // Only save if value changed and is valid (or empty)
            if (discordIdValue === "" || userIdRegex.test(discordIdValue)) {
                console.log(`El Hazzy Discord Achievement Award | Intercepting submit for ${targetUser.name}. Setting discordId flag to: '${discordIdValue}'`);
                try {
                    // Manually set the flag
                    await targetUser.setFlag("farchievements", 'discordId', discordIdValue);
                } catch (err) {
                    console.error("El Hazzy Discord Achievement Award | Error setting flag during form submit:", err);
                    ui.notifications.error(`Failed to save Discord ID flag for ${targetUser.name}.`);
                }
            } else if (discordIdValue !== "") { // No need to check currentFlagValue here
                // Warn if changed to an invalid value
                console.warn(`El Hazzy Discord Achievement Award | Invalid Discord ID format submitted for ${targetUser.name}: '${discordIdValue}'. Flag not saved.`);
                ui.notifications.warn(`Invalid Discord ID format for ${targetUser.name}. It was not saved. Please use the 17-20 digit ID.`);
                // Consider preventing submit if invalid?
                // event.preventDefault(); // Uncomment ONLY if blocking save is desired for invalid input
            }
        } else {
            console.warn("El Hazzy Discord Achievement Award | Could not find Discord ID input field on form submit listener.");
        }
        // Allow default submission to proceed
    });
});
