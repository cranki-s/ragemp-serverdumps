{
mp.events.add("updateKSDisplay", (amount) => {
    sharedVariables.killstreakText = `~HUD_COLOUR_MENU_YELLOW~Killstreak: ~w~${amount}`;
});
}