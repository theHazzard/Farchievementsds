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
			console.warn("El Hazzy Discord Achievement Award | Discord notifications enabled but URL or Secret is missing.");
		}
		return;
	}

	// --- Extract relevant data ---
	// Adjust these based on the actual structure of achievementData
	const userName = user;
	const achievementName = achievementData.name || "Unknown Achievement";
	const achievementDescription = achievementData.description || "";
	const achievementIconSource = achievementData.image || ""; // URL to the icon maybe?
	// Add any other data you want to send
	// ---

	const jsonDataPayload = {
		userName: userName,
		achievementName: achievementName,
		achievementDescription: achievementDescription,
		// We will send the icon source URL/path for reference if needed,
		// but the actual file data will be separate.
		iconSource: achievementIconSource,
		timestamp: new Date().toISOString(),
	};

	console.log(`El Hazzy Discord Achievement Award | Preparing notification for ${userName} - ${achievementName}`);

	// --- Prepare FormData ---
	const formData = new FormData();
	formData.append('jsonData', JSON.stringify(jsonDataPayload)); // Send metadata as JSON string

	// --- Handle Image ---
	let imageBlob: Blob | null = null;
	let filename = 'achievement-icon'; // Default filename

	if (achievementIconSource) {
		try {
			// Attempt to fetch the icon source (works for URLs, might work for relative paths in some setups)
			const imageResponse = await fetch(achievementIconSource);
			if (imageResponse.ok) {
				imageBlob = await imageResponse.blob();
				// Try to get a filename from the URL
				try {
					const urlParts = new URL(achievementIconSource);
					const pathParts = urlParts.pathname.split('/');
					filename = pathParts[pathParts.length - 1] || filename;
				} catch (e) { console.error('') }

			} else {
				console.warn(`El Hazzy Discord Achievement Award | Could not fetch image source: ${achievementIconSource} - Status: ${imageResponse.status}`);
			}
		} catch (error) {
			console.error(`El Hazzy Discord Achievement Award | Error fetching image source ${achievementIconSource}:`, error);
			// Handle cases where fetch fails (e.g., local paths not fetchable directly by browser fetch)
			// If achievementIconSource is a guaranteed local path accessible via server-side Node API
			// in Foundry (less common for client-side hooks), you'd need a different approach here,
			// possibly involving game.socket or server-side fetch if running in Node context.
			// For now, we assume fetch might work or we skip the image.
		}
	}

	// Append image blob if successfully fetched
	if (imageBlob) {
		// Ensure filename has an extension based on mime type if possible
		const extension = imageBlob.type.split('/')[1] || 'png'; // Default to png if type unknown
		if (!filename.includes('.')) {
			filename = `${filename}.${extension}`;
		} else {
			// Optional: update extension if filename has wrong one?
		}
		formData.append('achievementImageFile', imageBlob, filename); // The field name 'achievementImageFile' must match backend
		console.log(`El Hazzy Discord Achievement Award | Appending image <span class="math-inline">\{filename\} \(</span>{imageBlob.type}) to form data.`);
	} else {
		console.log("El Hazzy Discord Achievement Award | No image blob fetched or available to send.");
	}


	// --- Send FormData ---
	try {
		const response = await fetch(backendUrl, {
			method: 'POST',
			headers: {
				// 'Content-Type' is set automatically by browser when body is FormData
				'Authorization': `Bearer ${secret}`
			},
			body: formData // Send the FormData object
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