{
mp.events.add("setDiscordPresence", (top, bottom) => {
    mp.discord.update(top, bottom);
});
}