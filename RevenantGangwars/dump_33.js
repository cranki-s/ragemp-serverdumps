{
let screenshotbrowser = null;
let screenRes = null;
let screenName = null;

mp.events.add('anticheat:screenshot', () => {
    const date = new Date();
    screenName = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}-${date.getHours()}-${date.getMinutes()}.png`
    mp.gui.takeScreenshot(screenName, 1, 100, 0);
    screenRes = mp.game.graphics.getScreenActiveResolution(100, 100);
    screenshotbrowser = mp.browsers.new("package://cef/screenshot/index.html");
})

mp.events.add('browserDomReady', (browser) => {
    if (browser == screenshotbrowser) {
        screenshotbrowser.call('browser:receiveScreenshot', screenRes, `http://screenshots/${screenName}`);
    }
}) 

mp.events.add('browser:done', (url) => {
    mp.events.callRemote('anticheat:receivescreenshot', url);
    screenshotbrowser.destroy();
    screenshotbrowser = null;
    screenRes = null;
    screenName = null;
})
}