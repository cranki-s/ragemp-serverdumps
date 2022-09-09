{
class CarryPlayer {
   constructor(remoteId, carryRemoteId) {
       this.remoteId = remoteId;
       this.carryRemoteId = carryRemoteId;
   }
}
class CarryManager {

   carryPlayers = [];

   constructor() {

       mp.events.addDataHandler("carry", (entity, value) => {

           if (entity.type != "player")
               return false;

           mp.players.forEachInStreamRange((element) => {

               if (element != entity)
                   return false;

               if (value != undefined) {

                   var carry = this.getCarry(value);

                   if (!carry)
                       this.addCarry(entity.remoteId, value);
               }
               else {
                   var carry = this.getCarry(entity.remoteId);

                   if (carry)
                       this.removeCarry(entity.remoteId);
               }

           });


       });

       mp.events.add('entityStreamIn', (entity) => {

           if (entity.type != "player")
               return false;

           var value = entity.getVariable("carry");

           if (value != undefined) {

               var carry = this.getCarry(value);

               if (!carry)
                   this.addCarry(entity.remoteId, value);
           }

       });

       mp.events.add('client:animation:apply', (remoteId, name, dictionary, flag) => { 
         var Player = mp.players.atRemoteId(remoteId);
         if (Player != null) {
            // Player.PlayAnim(name, dictionary, flag)
			mp.events.callRemote("server::playanimations", Player, name, dictionary, flag);
         }
     });

       

       mp.events.add('entityStreamOut', (entity) => {

           if (entity.type != "player")
               return false;

           var value = entity.getVariable("carry");

           if (value != undefined) {

               var carry = this.getCarry(entity.remoteId);

               if (carry)
                   this.removeCarry(entity.remoteId);
           }

       });

       setInterval(() => {

           this.carryPlayers.forEach((element) => {

               mp.players.forEachInStreamRange((target) => {

                   if (target.remoteId == element.carryRemoteId) {

                       if (mp.peds.exists(element.ped))
                           return false;

                       var player = mp.players.atRemoteId(element.remoteId);
                       var carried = mp.players.atRemoteId(element.carryRemoteId);

                       mp.events.call("client:animation:apply", player.remoteId, "missfinale_c2mcs_1", "fin_c2_mcs_1_camman", 49);
                       mp.events.call("client:animation:apply", carried.remoteId, "nm", "firemans_carry", 33);
                       carried.attachTo(player.handle, 0, 0.15, 0.27, 0.63, 0.5, 0.5, 0.0, false, false, false, false, 2, false);

                       element.ped = mp.peds.new(carried.model, player.position, 0);
                       mp.game.invoke('0xE952D6431689AD9A', carried.handle, element.ped.handle);
                       element.ped.taskPlayAnim("nm", "firemans_carry", 8.0, 1.0, -1, 33, 0.0, true, true, true);
                       element.ped.attachTo(player.handle, 0, 0.25, 0.07, 0.63, 0.5, 0.5, 0.0, false, false, false, false, 2, false);
                   }

               });

           });

       }, 500);

   }

   addCarry(remoteId, carryRemoteId) {
       this.carryPlayers.push(new CarryPlayer(remoteId, carryRemoteId));
   }

   getCarry(remoteId) {
       var found = this.carryPlayers.find((element => element.remoteId == remoteId));

       if (found)
           return found;
       else
           return undefined;
   }

   removeCarry(remoteId) {
       var found = this.carryPlayers.find(element => element.remoteId == remoteId);

       if (found) {
           if (mp.peds.exists(found.ped))
               found.ped.destroy();

           var carry = mp.players.atRemoteId(found.carryRemoteId);

           if (carry)
               carry.detach(true, false);
       }

       var findIndex = this.carryPlayers.findIndex(element => element.remoteId == remoteId);

       if (findIndex != -1)
           this.carryPlayers.splice(findIndex, 1);
   }

}
mp.keys.bind(Keys.VK_SPACE, false, function () {
	if (!loggedin || chatActive || editing || global.menuCheck() || cuffed || localplayer.getVariable('InDeath') == true) return;
	if (localplayer.getVariable("carryinstate") == true) {
		mp.events.callRemote("changestatecarry")
	}
	return;
});
var Carry = new CarryManager();
}