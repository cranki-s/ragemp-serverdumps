{
require("ui.js");

let colors = [
    "~b~",
    "~w~",
    "~g~",
    "~y~",
    "~p~",
    "~o~"
]

mp.rpc("license:create", (licenseDataJSON) => {
    let licenseData = JSON.parse(licenseDataJSON);

    for (let color of colors) {
        if (licenseData.address.includes(color)) licenseData.address = licenseData.address.replaceAll(color, "");
    }

    browserSet("licenseVM", "licenseData", licenseData);
    browserCall("licenseVM", "toggle", true);
});

mp.rpc("license:destroy", () => {
    browserCall("licenseVM", "toggle", false)
});
}