{
let banScreenBrowser = undefined;

mp.events.add("openBanScreen", (baninfo1, baninfo2, baninfo3, baninfo4) => {
    banScreenBrowser = mp.browsers.new("package://cef/banScreen/index.html");
    banScreenBrowser.execute(`setBanInfo("${baninfo1}", "${baninfo2}", "${baninfo3}", "${baninfo4}");`);
});
}