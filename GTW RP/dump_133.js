{
let flashlightDistance = 20;
let flashlightBrightness = 5;
let flashlightRoundness = 0.1;
let flashlightRadius = 30;
let flashlightFalloff = 2;

const IS_FLASH_LIGHT_ON = '0x4B7620C47217126C';
const GET_CURRENT_PED_WEAPON_ENTITY_INDEX = '0x3B390A939AF0B5FC';
const GET_ENTITY_COORDS = '0x3FEF770D40960D5A';
const GET_ENTITY_ROTATION = '0xAFBD61CC738D9EB9';

mp.events.add('render', () =>
{
    mp.players.forEachInStreamRange((p) =>
    {
        if (p == null || p === undefined || !p.doesExist())
        {
            return;
        }

        if (p.weapon != 0x8BB05FD7 || (p == mp.players.local &&
            mp.game.invoke(IS_FLASH_LIGHT_ON, mp.players.local.handle) == 1))
        {
            return;
        }
        const entity = mp.game.invoke(GET_CURRENT_PED_WEAPON_ENTITY_INDEX,
            p.handle);
        if (!entity)
        {
            return;
        }
        const coords = mp.game.invokeVector3(GET_ENTITY_COORDS, entity, false);
        const rotation = mp.game.invokeVector3(GET_ENTITY_ROTATION, entity, 2);
        const fwdVector = getWeaponForwarwdVector(rotation.x, rotation.y,
            rotation.z);
        mp.game.graphics.drawSpotLightWithShadow(coords.x + (fwdVector.x * 0.3),
            coords.y + (fwdVector.y * 0.3), coords.z + (fwdVector.z * 0.3),
            fwdVector.x, fwdVector.y, fwdVector.z, 255, 255, 230,
            flashlightDistance, flashlightBrightness, flashlightRoundness,
            flashlightRadius, flashlightFalloff, p.remoteId + 1);
    });
});

function getWeaponForwarwdVector(x, y, z)
{
    x *= Math.PI / 180;
    y *= Math.PI / 180;
    z *= Math.PI / 180;

    const cosx = Math.cos(x);
    const sinx = Math.sin(x);
    const cosy = Math.cos(y);
    const siny = Math.sin(y);
    const cosz = Math.cos(z);
    const sinz = Math.sin(z);

    const m20 = cosz * siny + cosy * sinz * sinx;
    const m21 = sinz * siny - cosz * cosy * sinx;
    const m22 = cosx * cosy;

    return new mp.Vector3(m20, m21, m22);
}
}