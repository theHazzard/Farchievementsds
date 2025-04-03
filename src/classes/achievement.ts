import { SendSyncMessage } from "../helpers/message";

export class Achievement {
    name: string;
    description: string;
    image: string;
    points: number;
    glowing: boolean;
    color: string;
    players: string[];
    seenBy: unknown[];
    playerDates: Record<string, unknown>;
    progressRequired: string | number;
    progressType: string;
    playerProgress: Record<string, number>;
    diceType: string;
    chainLength: number;

    constructor(
        name: string,
        description: string,
        image: string,
        players: string[],
        seenBy: unknown[] = [],
        playerDates = {},
        progressRequired = 0,
        progressType = "standard",
        playerProgress = {},
        chainLength = 2,
        diceType = "d20",
        points = 1,
        glowing = false,
        color = "#f7ff9e",
    ) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.points = points;
        this.glowing = glowing;
        this.color = color;
        this.players = players;
        this.seenBy = seenBy;
        this.playerDates = playerDates;
        this.progressRequired = progressRequired;
        this.progressType = progressType;
        this.playerProgress = playerProgress; // Track player progress, used for both standard and chain
        this.diceType = diceType;
        this.chainLength = chainLength; //The Amount of times a player needs to roll the value required for a chain
    }

    // Method to add progress for a player
    addProgress(playerId: string, progress: boolean, isChain = false) {
        if (!this.playerProgress[playerId]) {
            this.playerProgress[playerId] = 0; // Initialize player's progress if it doesn't exist
        }

        if (isChain) {
            // Handle chain progress
            if (progress) {
                this.playerProgress[playerId] += 1; // Increment chain on success
                console.log(`Farchievements | Chain progress for player ${playerId}: ${this.playerProgress[playerId]}`);

                if (this.playerProgress[playerId] >= Number(this.progressRequired)) {
                    this.addPlayer(playerId); // Award achievement if chain is complete
                    this.playerProgress[playerId] = 0; // Reset chain after achievement
                }
            } else {
                this.playerProgress[playerId] = 0; // Reset chain on failure
                console.log(`Farchievements | Chain reset for player ${playerId}`);
            }
        } else {
            // Standard progress
            this.playerProgress[playerId] = Math.max(0, Math.min(this.playerProgress[playerId] + 1, Number(this.progressRequired)));

            // Check if the progress is equal to or greater than the required progress
            if (this.playerProgress[playerId] >= Number(this.progressRequired)) {
                this.addPlayer(playerId);
                SendSyncMessage();
            } else if (this.playerProgress[playerId] < Number(this.progressRequired)) {
                // If the progress is below the required progress, remove the player from the achievement
                this.removePlayer(playerId);
            }

            console.log(`Farchievements | Updated progress for player: ${playerId}, new progress: ${this.playerProgress[playerId]}`);
        }
    }

    // Method to check progress for a player
    getProgress(playerId: string) {
        return this.playerProgress[playerId] || 0;
    }

    // Method to add a player to the achievement
    addPlayer(playerId: string) {
        // Ensure the players array is defined
        if (!Array.isArray(this.players)) {
            this.players = [];
        }

        const dateAchieved: string = new Date().toISOString();
        if (!this.players.includes(playerId)) {
            this.players.push(playerId);
            this.playerDates[playerId] = dateAchieved; // Store the date the player obtained the achievement
            console.log("Farchievements | Added Achievement to: " + playerId);
            if (this.progressType === "diceChain") {
                this.playerProgress[playerId] = Number(this.progressRequired);
            }
        }
    }
    // Method to remove a player from the achievement
    removePlayer(playerId: string) {
        const playerIndex = this.players.indexOf(playerId);
        if (playerIndex > -1) {
            this.players.splice(playerIndex, 1); // Remove the player from the players array
            delete this.playerDates[playerId]; // Remove the associated date from playerDates
            console.log("Farchievements | Removed Achievement from: " + playerId);
        }

        const seenByIndex = this.seenBy.indexOf(playerId);
        if (seenByIndex > -1) {
            this.seenBy.splice(seenByIndex, 1); // Remove the player from the seenBy array if present
            console.log("Farchievements | Removed Achievement from: " + playerId);
        }
        if (this.progressType == "diceChain")
            this.playerProgress[playerId] = 0;
    }

    // Method to mark that a player has seen the achievement animation
    markSeen(playerId: string) {
        if (!this.seenBy.includes(playerId)) {
            this.seenBy.push(playerId); // Add player to seenBy array if they haven't seen it yet
            console.log("Farchievements | Achievement was seen by: " + playerId);
        }
    }
}