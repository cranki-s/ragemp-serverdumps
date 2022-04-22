{
mp.events.add("setTurfInfo", (name, currentProgress, maxProgress) => {
    sharedVariables.drawTurfUI = true;
    sharedVariables.turfText = `Capturing ${name} - ${Math.floor(currentProgress / maxProgress * 100)}%`;
});

mp.events.add("hideTurfInfo", () => {
    sharedVariables.drawTurfUI = false;
});
}