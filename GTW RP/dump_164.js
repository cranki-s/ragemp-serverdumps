{
function recreatePhone(player)
{
    if(player.obj)
    {
        player.obj.detach(false, true);
        player.obj.destroy();
        player.obj = undefined;
    }
    player.obj = mp.objects.new(1407197773, mp.players.local.position, {
        rotation: new mp.Vector3(0, 0, 0),
        alpha: 255,
        dimension: mp.players.local.dimension
        });
    player.obj.notifyStreaming = true;
}


function CalculCameraPos(player, playerPos, playerRotate, selfieAnim)
{
    player.camX = playerPos.x;
    player.camY = playerPos.y;
    player.fov = 60;
    player.rotateCount = 0;
    player.angleCount = 0;
    let distance = 3;

    player.camX += (distance * Math.sin(-playerRotate*(Math.PI/180)));
    player.camY += (distance * Math.cos(-playerRotate*(Math.PI/180)));

    if(player.selfieAnim === 3 || player.selfieAnim === 4) //Animation. Phone is in right hand
        playerRotate -= 190 //Right hand
    else
        playerRotate -= 170; //Left hand
    
    if(playerRotate > 360.0) playerRotate -= 360.0;

    player.pRotate = playerRotate;

    player.handCamera.setActive(true);
    
    if(selfieAnim === 3)
    {
        player.handCamera.attachToPedBone(mp.players.local.handle, 57005, 0.1, 0.1, 0.1, true); //Right hand
        player.hand = 71;
    }
    else if(selfieAnim === 4)
    {
        player.handCamera.attachToPedBone(mp.players.local.handle, 57005, 0, 0, 0.1, true); //Right hand  
        player.hand = 71;
    }
    else
    {
        player.handCamera.attachToPedBone(mp.players.local.handle, 18905, 0.1, 0.1, 0.1, true); //Left hand
        player.hand = 42;
    }
    
    player.handCamera.setRot(0, 0, playerRotate, 2);
    player.handCamera.setFov(player.fov);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
}

function displaySelfieHelp()
{
    mp.game.ui.setTextComponentFormat('THREESTRINGS');
    //mp.game.ui.addTextComponentSubstringPlayerName("Camera: ~INPUT_MOVE_UP_ONLY~ ~INPUT_MOVE_DOWN_ONLY~ ~INPUT_MOVE_LEFT_ONLY~ ~INPUT_MOVE_RIGHT_ONLY~");
    //mp.game.ui.addTextComponentSubstringPlayerName("\nFOV: ~INPUT_COVER~ ~INPUT_PICKUP~, Changer animation: ~INPUT_LOOK_BEHIND~");
    //mp.game.ui.addTextComponentSubstringPlayerName("\nPrendre selfie: ~INPUT_SELECT_CHARACTER_MULTIPLAYER~, Fermer: ~INPUT_CELLPHONE_CANCEL~");

    mp.game.ui.addTextComponentSubstringPlayerName("Camera: ~INPUT_MOVE_UP_ONLY~ ~INPUT_MOVE_DOWN_ONLY~ ~INPUT_MOVE_LEFT_ONLY~ ~INPUT_MOVE_RIGHT_ONLY~");
    mp.game.ui.addTextComponentSubstringPlayerName("\nFOV: ~INPUT_COVER~ ~INPUT_PICKUP~, Change animation: ~INPUT_LOOK_BEHIND~");
    mp.game.ui.addTextComponentSubstringPlayerName("\nTake selfie: ~INPUT_SELECT_CHARACTER_MULTIPLAYER~, Close mode: ~INPUT_CELLPHONE_CANCEL~");

    mp.game.ui.displayHelpTextFromStringLabel(0, false, true, -1);
}

function takeSelfie()
{
    /*let date = new Date();
    let selfieName = "selfie_"+date.getDate()+"."+date.getMonth()+"."+date.getFullYear()+"_"+date.getHours()+"-"+date.getMinutes()+"-"+date.getSeconds()+".png";
    mp.gui.takeScreenshot(selfieName, 1, 100, 0);

    mp.game.graphics.setFlash(0.0, 0.0, 2.0, 3.0, 2.0);
    mp.game.audio.playSoundFrontend(-1, "Camera_Shoot", "Phone_Soundset_Franklin", true);

    const str = "Selfie saved as: "+selfieName;
    //const str = "Enregistrement selfie: "+selfieName;
    mp.gui.chat.push(str);*/

    mp.game.graphics.setFlash(0.0, 0.0, 2.0, 3.0, 2.0);
    mp.game.audio.playSoundFrontend(-1, "Camera_Shoot", "Phone_Soundset_Franklin", true);
}


function disableActionsForSelfie(disable)
{
    mp.game.controls.disableControlAction(0, 32, disable); 
    mp.game.controls.disableControlAction(0, 33, disable); 
    mp.game.controls.disableControlAction(0, 34, disable); 
    mp.game.controls.disableControlAction(0, 35, disable); 
    mp.game.controls.disableControlAction(0, 44, disable); 
    mp.game.controls.disableControlAction(0, 38, disable); 
    mp.game.controls.disableControlAction(0, 26, disable); 
    mp.game.controls.disableControlAction(3, 177, disable); 
    mp.game.controls.disableControlAction(32, 169, disable);  
}
}