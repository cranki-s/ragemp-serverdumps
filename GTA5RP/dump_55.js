{
    const mp = global.mp;
    let started = !1,
        blip = -1;
    mp.events.add("client_events_hummerWars_start", () => {
        started || (blip = mp.game.ui.addBlipForRadius(2780.3, 1545, 1, 175), mp.game.invoke("0xDF735600A4696DAF", blip, 5), mp.game.invoke("0x45FF974EEE1C8734", blip, 90), mp.game.invoke("0x03D7FB09E75D6B7E", blip, 1), mp.game.invoke("0xB14552383D39CE3E", blip, !0), mp.events.add("render", renderEvents), started = !0, mp.gui.chat.push(`!{FC4822}Война за материалы началась, найди машину с материалами и доставь на респаун своей организации!`))
    }), mp.events.add("client_events_hummerWars_end", () => {
        started && (mp.events.remove("render", renderEvents), mp.game.ui.removeBlip(blip), started = !1)
    });
    const renderEvents = () => {
        started && mp.game.invoke("0xF87683CDF73C3F6E", blip, 90)
    };
}