try {
    // hack for resolve problem with first timeout
    setTimeout(() => {}, 3600*24*1000);

    global.rp = {};
    require("client/index");
    try {
        require('nativeui');
        require('vspawner');
        require('./thin_client');
    }catch (e) {
        // ignore for prod
    }
    require('./static-attachments')
} catch (e) {
    console.error(e);
}
