{
/*
 * Autor: rootcause
 */

let midsizedMessageScaleform = null;
let msgInit = 0;
let msgDuration = 5000;
let msgAnimatedOut = false;
let msgBgColor = 0;

mp.events.add("ShowMidsizedMessage", (title, message, time = 3000) => {
    if (midsizedMessageScaleform == null) midsizedMessageScaleform = new messageScaleform("midsized_message");
    midsizedMessageScaleform.callFunction("SHOW_MIDSIZED_MESSAGE", title, message);

    msgInit = Date.now();
    msgDuration = time;
    msgAnimatedOut = false;
});

mp.events.add("ShowMidsizedShardMessage", (title, message, bgColor, useDarkerShard, condensed, time = 3000, playSound = true) => {
    if (midsizedMessageScaleform == null) midsizedMessageScaleform = new messageScaleform("midsized_message");
    midsizedMessageScaleform.callFunction("SHOW_SHARD_MIDSIZED_MESSAGE", title, message, bgColor, useDarkerShard, condensed);
    if (playSound) mp.game.audio.playSoundFrontend(-1, "LOSER", "HUD_AWARDS", true);

    msgInit = Date.now();
    msgDuration = time;
    msgAnimatedOut = false;
    msgBgColor = bgColor;
});

mp.events.add("render", () => {
    if (midsizedMessageScaleform != null) {
        midsizedMessageScaleform.renderFullscreen();

        if (msgInit > 0 && Date.now() - msgInit > msgDuration) {
            if (!msgAnimatedOut) {
                midsizedMessageScaleform.callFunction("SHARD_ANIM_OUT", msgBgColor);
                msgAnimatedOut = true;
                msgDuration += 750;
            } else {
                msgInit = 0;
                midsizedMessageScaleform.dispose();
                midsizedMessageScaleform = null;
            }
        }
    }
});
}