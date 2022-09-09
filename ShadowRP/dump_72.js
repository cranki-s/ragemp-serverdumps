{
setInterval(function () {
    let label = 'Shadow Roleplay';
    try {
        if (localplayer.getVariable('REMOTE_ID') == undefined) {
            label = 'В меню авторизации';
        }
        else
			{
			if (localplayer.getVariable('ON_WORK'))
                label = 'Работает где-то на';
			else if (localplayer.getVariable('CARROOMID'))
                label = 'Просматривает список машин';
			else if (localplayer.getVariable('ON_PLAYER_POLIGON'))
                label = 'Стреляет на полигоне';
			else if (localplayer.getVariable('PLAYER_IN_CASINO'))
                label = 'Находиться в казино';
			else if (localplayer.getVariable('PLAYER_IN_METRO'))
                label = 'Едет в метро';
			else if (localplayer.getVariable('PLAYER_HAS_DILDO'))
                label = 'Играется с дилдо';
			else if (localplayer.getVariable('INSNOWBOARD'))
                label = 'Катается на сноуборде';
            else if (mp.players.local.isDiving())
                label = 'Занимается дайвингом во';
            else if (mp.players.local.isSwimming() || mp.players.local.isSwimmingUnderWater())
                label = 'Плавает в штате';
            else if (mp.players.local.isFalling())
                label = 'Падает с высоты в штате';
            else if (mp.players.local.isRagdoll())
                label = 'Лежит на земле в штате';
            else if (mp.players.local.isDead())
                label = 'Умирает в штате';
            else if (mp.players.local.isInAnyVehicle(false))
                label = 'Ездит по штату';
            else if (mp.players.local.isRunning() || mp.players.local.isSprinting())
                label = 'Бегает по штату';
            else if (mp.players.local.isShooting())
                label = 'Стреляется в штате';
            else if (mp.players.local.isWalking())
                label = 'Бродит по штату';
            else
                label = 'Проводит время на';
        }    
    }
    catch (e) {
    }
    mp.discord.update(label, 'Shadow Roleplay');

}, 10000);	
}