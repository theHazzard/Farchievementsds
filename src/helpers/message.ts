import { Achievement } from "../classes/achievement";

export async function SendSyncMessage() {
	ChatMessage.create({
		user: game.user._id,
		content: "Achievements Synced",
		blind: false,
		whisper: game.users.filter((u: { isGM: boolean }) => u.isGM).map((u: { id: string }) => u.id)
	});

	if (document.getElementById('achsyncnormalmode') != null)
		if (document.getElementById('achsyncnormalmode')!.innerHTML != "")
			document.getElementById('achsyncnormalmode')!.innerHTML = "";
}

export async function sendAchievementNotification(user: string, achievementData: Achievement) {
	const enabled = game.settings.get("elhazzy-ds-achievement-award", "discordBackendEnabled");
	const backendUrl = game.settings.get("elhazzy-ds-achievement-award", "discordBackendUrl");
	const secret = game.settings.get("elhazzy-ds-achievement-award", "discordBackendSecret");

	// Only proceed if enabled and configured
	if (!enabled || !backendUrl || !secret) {
		if (enabled) {
			console.warn("El Hazzy Discord Achievement Award  | Discord notifications enabled but URL or Secret is missing.");
		}
		return;
	}

	// --- Extract relevant data ---
	// Adjust these based on the actual structure of achievementData
	const userName = user;
	const achievementName = achievementData.name || "Unknown Achievement";
	const achievementDescription = achievementData.description || "";
	const achievementIcon = achievementData.image || ""; // URL to the icon maybe?
	// Add any other data you want to send
	// ---

	const payload = {
		userName: userName,
		achievementName: achievementName,
		achievementDescription: achievementDescription,
		achievementIcon: achievementIcon,
		timestamp: new Date().toISOString(),
		// Add world/game name if useful context? game.world.title
	};

	console.log(`El Hazzy Discord Achievement Award  | Sending notification for ${userName} - ${achievementName}`);

	try {
		const response = await fetch(backendUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// Send the shared secret for backend authentication
				'Authorization': `Bearer ${secret}`
			},
			body: JSON.stringify(payload)
		});

		if (!response.ok) {
			// Log error if backend responded unfavorably
			const errorBody = await response.text();
			console.error(`El Hazzy Discord Achievement Award  | Error sending notification: ${response.status} ${response.statusText}`, errorBody);
			ui.notifications.error(`Failed to send Discord achievement notification (${response.status}). Check console (F12).`);
		} else {
			console.log("El Hazzy Discord Achievement Award  | Notification sent successfully.");
			// Optional: ui.notifications.info("Discord achievement notification sent.");
		}
	} catch (error) {
		// Log error if fetch itself failed (network issue, etc.)
		console.error("El Hazzy Discord Achievement Award  | Failed to send notification request:", error);
		ui.notifications.error("Failed to send Discord achievement notification request. Check console (F12).");
	}
}