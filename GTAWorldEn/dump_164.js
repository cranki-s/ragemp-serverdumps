{
let player = {
    selfieMode: false,
    selfieAnim: 1,
    handCamera: undefined,
    fov: 60,
    pRotate: 0.0,
    rotateCount: 0,
    angleCount: 0,
    camX: 0.0,
    camY: 0.0,
    obj: undefined,
    hand: 41
}

mp.events.add('setCameraForSelfie', (playerPos, playerRotate, selfieAnim) => {

    player.handCamera = mp.cameras.new('selfieCam', new mp.Vector3(0,  0,  0), new mp.Vector3(0,0,0), 40);
    player.pRotate = playerRotate.z;

    player.selfieAnim = selfieAnim;
    recreatePhone(player);
    CalculCameraPos(player, playerPos, player.pRotate, selfieAnim);


    disableActionsForSelfie(true);
    mp.game.ui.displayHud(false);
    mp.game.ui.displayRadar(false);
    mp.gui.chat.activate(false);

    displaySelfieHelp();

    player.selfieMode = true;
});

mp.events.add('endSelfieMode', () => {
    player.handCamera.setActive(false);
    disableActionsForSelfie(false);
    mp.game.ui.displayHud(true);
    mp.game.ui.displayRadar(true);
    mp.gui.chat.activate(true);
    mp.game.cam.renderScriptCams(false, false, 0, false, false);
    player.selfieMode = false;

    //Disable until RageMP fixes it.
    //player.obj.detach(false, true);
    
    player.obj.destroy();
    player.obj = undefined;

    mp.events.callRemote("endSelfieMode");  
});


mp.events.add('entityStreamIn', (ob) => {
    if(ob === player.obj)
    {
        switch(player.hand)
        {
            case 42:
                ob.attachTo(mp.players.local.handle, player.hand, 0.13, 0.030, 0.020, 230, 70, 40, true, false, false, false, 2, true);  //Right hand
                break;
            
            case 71: 
                ob.attachTo(mp.players.local.handle, player.hand, 0.13, 0.030, -0.022, 120, 70, 40, true, false, false, false, 2, true);  //Left hand
                break;
        }
    }
});


setInterval(() => {
    if(player.selfieMode)
    {
        if(mp.game.controls.isControlPressed(3, 177)) //End selfieMode
        { 
            mp.events.call('endSelfieMode');
        }

        if(mp.game.controls.isControlPressed(0, 32)) //Vertical angle Up
        {
            if(player.angleCount < 20)
            {
                player.angleCount++;
                player.handCamera.setRot(player.angleCount, 0, player.pRotate, 2);
            }
        }
        if(mp.game.controls.isControlPressed(0, 33)) //Vertial angle down
        {
            if(player.angleCount > -20)
            {
                player.angleCount--;
                player.handCamera.setRot(player.angleCount, 0, player.pRotate, 2);
            }
        }
        if(mp.game.controls.isControlPressed(0, 34)) //Horizontal angle to left
        {
            if(player.rotateCount > -30)
            {
                player.rotateCount--;
                player.pRotate++;
                player.handCamera.setRot(player.angleCount, 0, player.pRotate, 2);
            }
        }
        if(mp.game.controls.isControlPressed(0, 35)) //Horizontal angle to right
        {
            if(player.rotateCount < 30)
            {
                player.pRotate--;
                player.rotateCount++;
                player.handCamera.setRot(player.angleCount, 0, player.pRotate, 2);
            }
        }
        if(mp.game.controls.isControlPressed(0, 44)) //FOV-
        {
            if(player.fov < 80)
            {
                player.fov++;
            }
            player.handCamera.setFov(player.fov);   
        }
        if(mp.game.controls.isControlPressed(0, 38)) //FOV+
        {
            if(player.fov > 40)
            {
                player.fov--;
            }
            player.handCamera.setFov(player.fov);   
        }
        if(mp.game.controls.isControlPressed(32, 169)) //F8. Take photo
        {
            takeSelfie();
        }
    }
}, 50);


setInterval(() => {
    if(player.selfieMode)
    {
        if(mp.game.controls.isControlPressed(0, 26)) //C. Camera change
        {
            mp.game.cam.renderScriptCams(false, false, 0, true, false);
            player.selfieAnim++;
            if(player.selfieAnim > 5)
            {
                player.selfieAnim = 1;
            }
            mp.events.callRemote("changeSelfieAnimation", player.selfieAnim);
        }
    }
}, 100);




}