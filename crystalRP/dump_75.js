{
let Ban = null;
let controlDisable = false;
mp.events.add('openBanMenu', (data) => {  
    menuOpen();
	Ban = mp.browsers.new('package://cef/System/ban/index.html');
    Ban.execute(`Ban.open(${data})`);
});
setTimeout(()=>{
    if (Ban != null && !controlDisable) {
        mp.game.controls.disableAllControlActions(0);
        mp.game.controls.disableAllControlActions(1);
        mp.game.controls.disableAllControlActions(2);
        mp.game.controls.disableAllControlActions(3);
        mp.game.controls.disableAllControlActions(4);
        mp.game.controls.disableAllControlActions(5);
        mp.game.controls.disableAllControlActions(6);
        mp.game.controls.disableAllControlActions(7);
        mp.game.controls.disableAllControlActions(8);
        mp.game.controls.disableAllControlActions(9);
        mp.game.controls.disableAllControlActions(10);
        mp.game.controls.disableAllControlActions(11);
        mp.game.controls.disableAllControlActions(12);
        mp.game.controls.disableAllControlActions(13);
        mp.game.controls.disableAllControlActions(14);
        mp.game.controls.disableAllControlActions(15);
        mp.game.controls.disableAllControlActions(16);
        mp.game.controls.disableAllControlActions(17);
        mp.game.controls.disableAllControlActions(18);
        mp.game.controls.disableAllControlActions(19);
        mp.game.controls.disableAllControlActions(20);
        mp.game.controls.disableAllControlActions(21);
        mp.game.controls.disableAllControlActions(22);
        mp.game.controls.disableAllControlActions(23);
        mp.game.controls.disableAllControlActions(24);
        mp.game.controls.disableAllControlActions(25);
        mp.game.controls.disableAllControlActions(26);
        mp.game.controls.disableAllControlActions(27);
        mp.game.controls.disableAllControlActions(28);
        mp.game.controls.disableAllControlActions(29);
        mp.game.controls.disableAllControlActions(30);
        mp.game.controls.disableAllControlActions(31);
        mp.game.controls.disableAllControlActions(32);
        mp.game.controls.disableAllControlActions(33);
        controlDisable = true;
    }
}, 250);
}