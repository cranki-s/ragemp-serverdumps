{
const maxDistance = 200 * 200;
const width = 0.03;
const height = 0.0065;
const border = 0.001;
const color = [255, 255, 255, 255];

mp.nametags.enabled = false;
let localPlayer = mp.players.local,
    groupId = 0;

let adminNametags = false;
mp.events.add("Client:Admin:toggleNametag", (bool) => {
    adminNametags = bool;
});

mp.events.add("Client:Admin:setNametag", (state) => {
    adminNametags = state;
});

mp.events.addDataHandler("groupId", (entity, value, oldValue) => {
    if (entity == undefined || entity.type != "player" || entity != localPlayer) return;
    groupId = parseInt(value);
});

mp.events.add('render', (nametags) => {
    if (groupId > 0 || adminNametags == true) {
        const graphics = mp.game.graphics;
        const screenRes = graphics.getScreenResolution(0, 0);

        nametags.forEach(nametag => {
            let [player, x, y, distance] = nametag;
            if (player != undefined && (player.getVariable("groupId") == groupId || adminNametags == true)) {

                if (distance <= maxDistance) {
                    let scale = (distance / maxDistance);
                    if (scale < 0.6) scale = 0.6;

                    var health = player.getHealth();
                    health = health < 100 ? 0 : ((health - 100) / 100);

                    var armour = player.getArmour() / 100;

                    y -= scale * (0.005 * (screenRes.y / 1080));

                   // var text = player.name.replace('_', ' ');
		    var text = player.name;
                    if (adminNametags == true)
                        text = `${text}`;
                        hp = `${parseInt(player.getHealth())}`;
                        armor =	`${parseInt(player.getArmour())}`
                    mp.game.graphics.drawText(hp, [x-0.01, y+0.03], {
                        font: 4,
                        color: [45, 185, 60, 255],
                        scale: [0.4, 0.4],
                        outline: true
                    });
                    mp.game.graphics.drawText(armor, [x+0.01, y+0.03], {
                        font: 4,
                        color: [4, 0, 255, 255],
                        scale: [0.4, 0.4],
                        outline: true
                    });
                    mp.game.graphics.drawText(text, [x, y], {
                        font: 4,
                        color: [255, 255, 255, 255],
                        scale: [0.4, 0.4],
                        outline: true
                    });

                    if (mp.game.player.isFreeAimingAtEntity(player.handle)) {
                        let y2 = y + 0.042;

                        if (armour > 0) {
                            let x2 = x - width / 2 - border / 2;

                            graphics.drawRect(x2, y2+0.03, width + border * 2, 0.0085, 0, 0, 0, 200);
                            graphics.drawRect(x2, y2+0.03, width, height, 92, 184, 74, 255);
                            graphics.drawRect(x2 - width / 2 * (1 - health), y2+0.03, width * health, height, 255, 255, 255, 200);

                            x2 = x + width / 2 + border / 2;

                            graphics.drawRect(x2, y2+0.03, width + border * 2, height + border * 2, 0, 0, 0, 200);
                            graphics.drawRect(x2, y2+0.03, width, height, 41, 66, 78, 255);
                            graphics.drawRect(x2 - width / 2 * (1 - armour), y2+0.03, width * armour, height, 48, 108, 135, 200);
                        } else {
                            graphics.drawRect(x, y2+0.03, width + border * 2, height + border * 2, 0, 0, 0, 200);
                            graphics.drawRect(x, y2+0.03, width, height, 92, 184, 74, 255);
                            graphics.drawRect(x - width+0.03 / 2 * (1 - health), y2+0.03, width * health, height, 255, 255, 255, 200);
                        }
                    }
                }
            }
        })
    }
})
}