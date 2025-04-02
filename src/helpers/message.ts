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