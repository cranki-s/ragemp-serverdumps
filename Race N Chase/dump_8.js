{
let FirstEndPosition = null;
let StingerPreviewObject = null;
let PlacingStingers = false;

const STINGER_OBJECT = 3420629148; // pd_ld_stinger_s

mp.events.add("Spikes_BeginPlacing", () => {
    PlacingStingers = true;
    FirstEndPosition = mp.players.local.position;

    StingerPreviewObject = mp.objects.new(STINGER_OBJECT, FirstEndPosition, {
        alpha: 255,
        dimension: mp.players.local.dimension
    });
    StingerPreviewObject.setRotation(5, 12, 69, 1, true);
    pushMessageToChat(`STINGER ROT: ${StingerPreviewObject.rotation.z}`);
});
/*
mp.events.add('render', () => {
    if(!PlacingStingers) return;
    if(StingerPreviewObject == null) return;
    if(mp.players.local == null || !mp.players.exists(mp.players.local)) return;

    StingerPreviewObject.destroy();
    StingerPreviewObject = mp.objects.new(STINGER_OBJECT, FirstEndPosition, {
        rotation: getStingerFacePlayerRotation(),
        alpha: 128,
        dimension: mp.players.local.dimension
    });
});*/
}