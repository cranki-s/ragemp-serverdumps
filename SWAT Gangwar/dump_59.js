{
var ProgressCEF = null;

mp.events.add('Client:ProgressBar:create', (text, time) => {
    if (ProgressCEF == null) {
        ProgressCEF = mp.browsers.new('package://cef/progressbar/index.html');
        if (ProgressCEF != null) {
            ProgressCEF.execute("progress('" + text + "', " + time / 100 + ");");
        }
    }
});


mp.events.add("Client:ProgressBar:destroy", () => {
    if (ProgressCEF != null) {
        ProgressCEF.destroy();
        ProgressCEF = null;
    }
});
}