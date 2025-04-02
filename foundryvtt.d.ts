// src/types/foundry.d.ts

declare global {
    const game: Game; // Foundry's game object
    const Hooks: Hooks; // Foundry's Hooks object
    const ui: UI;
    const Dialog: Dialog;
    const AudioHelper: AudioHelper;
    const Application: Application;
    const ChatMessage: ChatMessage;
    const renderTemplate: (path: string, data: unknown) => Promise<unknown>;
    const displayMyNewAchievementInChat: (name: string) => void;
    const debounce: (fn: () => void, number) => void;
    interface Window {
        confetti: Confetti;
        loadAchievements: () => void;
        loadAchievementsEditMode: () => void;
        loadAchievementsList: () => void;
        sendAchievementNotification: sendAchievementNotification;
        getAchievementByName: getAchievementByName;
        farchievements_DEBUG_Reset_EVERYTHING: () => void;
        farchievements_DEBUG_Reset_PlayerAchievements: () => void;
        Farchievements: Farchievements;
    }

    // You can also declare other globals like "CONFIG", "canvas", etc. depending on what you're using.
    // For example:
    // var canvas: Canvas;

    // Declare the types for these globals as per your need.
}

// Make sure to export something to prevent an error in TypeScript
export { };