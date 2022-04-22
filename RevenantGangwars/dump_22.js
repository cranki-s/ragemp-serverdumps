{
const Scaleform = require("general/playerlist/Scaleform");

// Constants
const DEFAULT_PAGE = 1;
const PLAYERS_PER_PAGE = 16; // Anything higher than 16 won't show.
const CARD_SOUNDSET_NAME = "HUD_FRONTEND_DEFAULT_SOUNDSET";
const OPEN_SOUND_NAME = "LEADER_BOARD";
const CLOSE_SOUND_NAME = "BACK";
const NAV_SOUND_NAME = "NAV_UP_DOWN";
const SANITIZE_PATTERN = /[<>~]/g; // Removes <, > and ~ characters to prevent <font> or ~HUD_COLOUR_NAME~ usage.

// Keycodes
const KEYCODE_Z = 90;
const KEYCODE_PAGEUP = 33;
const KEYCODE_PAGEDOWN = 34;

// Natives
const SET_SCRIPT_GFX_ALIGN = "0xB8A850F20A067EB6";
const RESET_SCRIPT_GFX_ALIGN = "0xE3A3DB414A373DAB";

// Script variables
let cardScaleform = null;
let playerListOpen = false;
let playerListCurPage = DEFAULT_PAGE;
let playerListMaxPage = 0;
let playerList = [];

// Functions
function paginate(array, pageSize, pageNumber) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

function updateTitle() {
    if (!cardScaleform) {
        return;
    }

    cardScaleform.callFunction("SET_TITLE", `Players (${playerList.length})`, `Page ${playerListCurPage}/${playerListMaxPage}`);
}

function updateCard() {
    if (!cardScaleform) {
        return;
    }

    // Reset all indices first
    for (let i = 0; i < PLAYERS_PER_PAGE; i++) {
        cardScaleform.callFunction("SET_DATA_SLOT_EMPTY", i);
    }

    // Get players of the current page
    const players = paginate(playerList, PLAYERS_PER_PAGE, playerListCurPage);
    players.forEach((player, index) => {
        const color = player.getVariable("PlayerListColor") || 116; /* HUD_COLOUR_FREEMODE */
        const tag = player.getVariable("PlayerListTag") ? `   ${player.getVariable("PlayerListTag")}` : "";
        cardScaleform.callFunction("SET_DATA_SLOT", index, "", `${player.name.replace(SANITIZE_PATTERN, "")} (${player.remoteId})`, color, 0, "", "", tag, 2, "CHAR_DEFAULT", "CHAR_DEFAULT", "");
    });

    cardScaleform.callFunction("DISPLAY_VIEW");
}

// Key events
/**
 * Toggles player list visibility.
 */
mp.keys.bind(KEYCODE_Z, false, async () => {
    if (mp.players.local.isTypingInTextChat) {
        return;
    }

    playerListCurPage = DEFAULT_PAGE;

    if (playerListOpen) {
        if (cardScaleform) {
            cardScaleform.dispose();
            cardScaleform = null;
        }

        mp.gui.chat.show(true);
        mp.game.audio.playSoundFrontend(-1, CLOSE_SOUND_NAME, CARD_SOUNDSET_NAME, true);
    } else {
        mp.gui.chat.show(false);

        playerList = mp.players.toArray();
        playerList.sort((a, b) => a.remoteId - b.remoteId); // Not even sure if needed, just in case
        playerListMaxPage = Math.ceil(playerList.length / PLAYERS_PER_PAGE);

        // Load the scaleform
        cardScaleform = await Scaleform.request("mp_mm_card_freemode");

        // Update scaleform
        updateTitle();
        updateCard();

        // Play sound effect
        mp.game.audio.playSoundFrontend(-1, OPEN_SOUND_NAME, CARD_SOUNDSET_NAME, true);
    }

    playerListOpen = !playerListOpen;
});

/**
 * Moves up a page.
 */
mp.keys.bind(KEYCODE_PAGEUP, false, () => {
    if (!playerListOpen || mp.players.local.isTypingInTextChat) {
        return;
    }

    // Increase page
    playerListCurPage++;
    if (playerListCurPage > playerListMaxPage) {
        playerListCurPage = DEFAULT_PAGE;
    }

    // Update scaleform
    updateTitle();
    updateCard();

    // Play sound effect
    mp.game.audio.playSoundFrontend(-1, NAV_SOUND_NAME, CARD_SOUNDSET_NAME, true);
});

/**
 * Moves down a page.
 */
mp.keys.bind(KEYCODE_PAGEDOWN, false, () => {
    if (!playerListOpen || mp.players.local.isTypingInTextChat) {
        return;
    }

    // Decrease page
    playerListCurPage--;
    if (playerListCurPage <= 0) {
        playerListCurPage = playerListMaxPage;
    }

    // Update scaleform
    updateTitle();
    updateCard();

    // Play sound effect
    mp.game.audio.playSoundFrontend(-1, NAV_SOUND_NAME, CARD_SOUNDSET_NAME, true);
});

// Events
mp.events.add("render", () => {
    if (playerListOpen && cardScaleform) {
        mp.game.invoke(SET_SCRIPT_GFX_ALIGN, 76, 84);
        cardScaleform.render(0.122, 0.3, 0.28, 0.6);
        mp.game.invoke(RESET_SCRIPT_GFX_ALIGN);
    }
});
}