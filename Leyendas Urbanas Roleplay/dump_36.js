{
/* --------------------------------------------------------------------------------
 * alerta.js
 *
 * Autor: Kenshin
 *
 * Descripción: Sistema de alertas
 *
 * -------------------------------------------------------------------------------- */

var cef_purga = require("/LURP/cef.js");
var navegadorPurga = null;
let fase1 = false;
let fase2 = false;
let fase3 = false;
let sceneryCamera = null;
var alertapurga_cef1 = -1
var alertapurga_cef2 = -1
var alertapurga_cef3 = -1
var alertapurga_cef4 = -1
var tiendaMascarasTextlabel = null;
var tiendaMascarasTextlabel1 = null;
var tiendaMascarasTextlabel2 = null;
// var tiendaMascarasBlip = null;
// var tiendaMascarasBlip1 = null;
// var tiendaMascarasBlip2 = null;
var ammunation1 = null;
var ammunation2 = null;
var ammunation3 = null;
var ammunation4 = null;
var ammunation5 = null;
var ammunation6 = null;
var ammunation7 = null;
var ammunation8 = null;
var ammunation9 = null;

var ammunation1Blip = null;
var ammunation2Blip = null;
var ammunation3Blip = null;
var ammunation4Blip = null;
var ammunation5Blip = null;
// var ammunation6Blip = null;
// var ammunation7Blip = null;
// var ammunation8Blip = null;
// var ammunation9Blip = null;
// let ammunation10Blip = null;
// let ammunation11Blip = null;

var esfammunation1 = null;
var esfammunation2 = null;
var esfammunation3 = null;
var esfammunation4 = null;
var esfammunation5 = null;
// var esfammunation6 = null;
// var esfammunation7 = null;
// var esfammunation8 = null;
// var esfammunation9 = null;
// let esfammunation10 = null;
// let esfammunation11 = null;

let Ped;
var pedsAmmu = [];
var pedsAmmuEscenarios = [];

var ammu1TextlabelMed = null;
var ammu1TextlabelAmmu = null;
var ammu1TextlabelRopa = null;
var ammu2TextlabelMed = null;
var ammu2TextlabelAmmu = null;
var ammu2TextlabelRopa = null;
var ammu3TextlabelMed = null;
var ammu3TextlabelAmmu = null;
var ammu3TextlabelRopa = null;
var ammu4TextlabelMed = null;
var ammu4TextlabelAmmu = null;
var ammu4TextlabelRopa = null;
var ammu5TextlabelMed = null;
var ammu5TextlabelAmmu = null;
var ammu5TextlabelRopa = null;

var esfHospital1 = null;
var esfHospital2 = null;
var esfHospital3 = null;
let esfHospital4 = null;
let esfHospital5 = null;

var esfSquidGame = null;
var esfSquidGameBlip = null;

var esfammunation1Blip = null;
var esfammunation2Blip = null;
var esfammunation3Blip = null;
var esfammunation4Blip = null;
var esfammunation5Blip = null;
// var esfammunation6Blip = null;
// var esfammunation7Blip = null;
// var esfammunation8Blip = null;
// var esfammunation9Blip = null;
// let esfammunation10Blip = null;
// let esfammunation11Blip = null;

var esfHospital1Blip = null;
var esfHospital2Blip = null;
var esfHospital3Blip = null;
let esfHospital4Blip = null;
let esfHospital5Blip = null;

var ammunation = [];
var mascaras = [];
var modopurga = false;
var enZonaSegura = false;

mp.events.add('iniciar_purga', function () {

    if(!logueado) return;

    crearIntervaloPurga();

    mp.game.invoke("0xEA16670E7BA4743C"); //RESET_AI_WEAPON_DAMAGE_MODIFIER
    mp.game.invoke("0x46E56A7CD1D63C3F"); //RESET_AI_MELEE_WEAPON_DAMAGE_MODIFIER

    mp.events.call("sound:play", "LU-RP_Purga", false);

    mp.events.call("alertapurga2:inicio");
    setTimeout(function () {
        mp.events.call("alertapurga1:inicio");
    }, 6000);

    for (let i = 0; i <= 16; i++) mp.game.graphics.setLightsState(i, true);
    mp.game.graphics.setLightsState(7, false);

    modopurga = true;
    purga = true;
    fase1 = false; fase2 = false; fase3 = false;

    mp.game.time.setClockTime(0, 0, 0);
    mp.game.time.setClockDate(02, 04, 2021);

    mp.game.gameplay.setWeatherTypePersist("HALLOWEEN");

    tiendaMascarasTextlabel = mp.labels.new("Tienda Mascaras\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(-1337.08, -1277.913, 4.872756), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    tiendaMascarasTextlabel1 = mp.labels.new("Tienda Mascaras\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(1698.7848, 3758.133, 34.705353), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    tiendaMascarasTextlabel2 = mp.labels.new("Tienda Mascaras\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(-325.3113, 6082.2666, 31.454765), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    // tiendaMascarasBlip = mp.blips.new(671, new mp.Vector3(-1337.08, -1277.913, 4.872756), { name: "Tienda mascaras", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    // tiendaMascarasBlip1 = mp.blips.new(671, new mp.Vector3(1698.7999, 3761.9382, 34.501167), { name: "Tienda mascaras", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    // tiendaMascarasBlip2 = mp.blips.new(671, new mp.Vector3(-320.04468, 6080.7905, 31.292088), { name: "Tienda mascaras", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    ammu1TextlabelMed = mp.labels.new("Medicamentos\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(308.21854, -1003.4811, 29.317635), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    ammu1TextlabelAmmu = mp.labels.new("Armas\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(312.8873, -1003.6975, 29.311502), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    ammu1TextlabelRopa = mp.labels.new("Ropa\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(300.47382, -1003.9423, 29.327621), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    
    ammu2TextlabelMed = mp.labels.new("Medicamentos\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(-154.08633, -1308.6785, 31.309383), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    ammu2TextlabelAmmu = mp.labels.new("Armas\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(-164.36293, -1308.9047, 31.321835), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    ammu2TextlabelRopa = mp.labels.new("Ropa\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(-169.11797, -1308.8752, 31.310343), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    
    ammu3TextlabelMed = mp.labels.new("Medicamentos\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(-1276.2034, -805.80237, 17.304289), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    ammu3TextlabelAmmu = mp.labels.new("Armas\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(-1271.3212, -811.9394, 17.115644), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    ammu3TextlabelRopa = mp.labels.new("Ropa\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(-1265.9401, -818.18994, 17.099028), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
 
    ammu4TextlabelMed = mp.labels.new("Medicamentos\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(1563.2083, 3575.3774, 33.74667), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    ammu4TextlabelAmmu = mp.labels.new("Armas\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(1561.3988, 3567.5737, 34.132187), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    ammu4TextlabelRopa = mp.labels.new("Ropa\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(1569.2933, 3573.3599, 33.15769), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
 
    ammu5TextlabelMed = mp.labels.new("Medicamentos\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(14.408886, 6504.474, 31.492159), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    ammu5TextlabelAmmu = mp.labels.new("Armas\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(17.276636, 6507.9194, 31.492159), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    ammu5TextlabelRopa = mp.labels.new("Ropa\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(21.302479, 6511.38, 31.492159), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });

    ammunation1Blip = mp.blips.new(110, new mp.Vector3(313.204, -998.87836, 29.191923), { name: "Ammunation", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    ammunation2Blip = mp.blips.new(110, new mp.Vector3(-171.95802, -1302.4631, 31.311943), { name: "Ammunation", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    ammunation3Blip = mp.blips.new(110, new mp.Vector3(-1279.3022, -817.7964, 17.116768), { name: "Ammunation", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    ammunation4Blip = mp.blips.new(110, new mp.Vector3(1555.6619, 3569.0564, 35.436672), { name: "Ammunation", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    ammunation5Blip = mp.blips.new(110, new mp.Vector3(16.703579, 6510.404, 31.667284), { name: "Ammunation", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    // ammunation6Blip = mp.blips.new(110, new mp.Vector3(-1118.142, 2698.353, 18.55413), { name: "Ammunation", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    // ammunation7Blip = mp.blips.new(110, new mp.Vector3(1693.435, 3759.874, 34.70531), { name: "Ammunation", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    // ammunation8Blip = mp.blips.new(110, new mp.Vector3(2568.212, 294.2726, 108.7349), { name: "Ammunation", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    // ammunation9Blip = mp.blips.new(110, new mp.Vector3(16.703579, 6510.404, 31.667284), { name: "Ammunation", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    // ammunation10Blip = mp.blips.new(110, new mp.Vector3(-662.2412, -935.2114, 21.82922), { name: "Ammunation", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    // ammunation11Blip = mp.blips.new(110, new mp.Vector3(252.2426, -50.07045, 69.94109), { name: "Ammunation", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });

    //esfmascaras = mp.colshapes.newCircle(-1337.08, -1277.913, 50, 0);
    esfammunation1 = mp.colshapes.newCircle(313.204, -998.87836, 80, 0);
    esfammunation2 = mp.colshapes.newCircle(-171.95802, -1302.4631, 80, 0);
    esfammunation3 = mp.colshapes.newCircle(-1279.3022, -817.7964, 80, 0);
    esfammunation4 = mp.colshapes.newCircle(1555.6619, 3569.0564, 80, 0);
    esfammunation5 = mp.colshapes.newCircle(16.703579, 6510.404, 50, 0);
    // esfammunation6 = mp.colshapes.newCircle(-1118.142, 2698.353, 50, 0);
    // esfammunation7 = mp.colshapes.newCircle(1693.435, 3759.874, 50, 0);
    // esfammunation8 = mp.colshapes.newCircle(2568.212, 294.2726, 50, 0);
    // esfammunation9 = mp.colshapes.newCircle(16.703579, 6510.404, 50, 0);
    // esfammunation10 = mp.colshapes.newCircle(-662.2412, -935.2114, 50, 0);
    // esfammunation11 = mp.colshapes.newCircle(252.2426, -50.07045, 50, 0);

    esfHospital1 = mp.colshapes.newCircle(1838.8082, 3673.644, 100, 0);
    esfHospital2 = mp.colshapes.newCircle(-249.69379, 6323.5312, 100, 0);
    esfHospital3 = mp.colshapes.newCircle(329.4422, -590.4075, 100, 0);
    esfHospital4 = mp.colshapes.newCircle(294.9677, -1447.873, 100, 0);
    esfHospital5 = mp.colshapes.newCircle(-458.69684, -339.23392, 100, 0);

    esfSquidGame = mp.colshapes.newCircle(690.2549, 601.61206, 128.91113, 0);
    esfSquidGameBlip = mp.game.ui.addBlipForRadius(690.2549, 601.61206, 128.91113, 100.0);
    mp.game.invoke("0xDF735600A4696DAF", esfSquidGameBlip, 9);
    mp.game.invoke("0x45FF974EEE1C8734", esfSquidGameBlip, 70);
    mp.game.invoke("0x03D7FB09E75D6B7E", esfSquidGameBlip, 2);
    mp.game.invoke("0xF87683CDF73C3F6E", esfSquidGameBlip, 0);

    esfammunation1Blip = mp.game.ui.addBlipForRadius(313.204, -998.87836, 0, 80.0);
    mp.game.invoke("0xDF735600A4696DAF", esfammunation1Blip, 9);
    mp.game.invoke("0x45FF974EEE1C8734", esfammunation1Blip, 70);
    mp.game.invoke("0x03D7FB09E75D6B7E", esfammunation1Blip, 2);
    mp.game.invoke("0xF87683CDF73C3F6E", esfammunation1Blip, 0);

    esfammunation2Blip = mp.game.ui.addBlipForRadius(-171.95802, -1302.4631, 0, 80.0);
    mp.game.invoke("0xDF735600A4696DAF", esfammunation2Blip, 9);
    mp.game.invoke("0x45FF974EEE1C8734", esfammunation2Blip, 70);
    mp.game.invoke("0x03D7FB09E75D6B7E", esfammunation2Blip, 2);
    mp.game.invoke("0xF87683CDF73C3F6E", esfammunation2Blip, 0);

    esfammunation3Blip = mp.game.ui.addBlipForRadius(-1279.3022, -817.7964, 0, 80.0);
    mp.game.invoke("0xDF735600A4696DAF", esfammunation3Blip, 9);
    mp.game.invoke("0x45FF974EEE1C8734", esfammunation3Blip, 70);
    mp.game.invoke("0x03D7FB09E75D6B7E", esfammunation3Blip, 2);
    mp.game.invoke("0xF87683CDF73C3F6E", esfammunation3Blip, 0);

    esfammunation4Blip = mp.game.ui.addBlipForRadius(1555.6619, 3569.0564, 0, 80.0);
    mp.game.invoke("0xDF735600A4696DAF", esfammunation4Blip, 9);
    mp.game.invoke("0x45FF974EEE1C8734", esfammunation4Blip, 70);
    mp.game.invoke("0x03D7FB09E75D6B7E", esfammunation4Blip, 2);
    mp.game.invoke("0xF87683CDF73C3F6E", esfammunation4Blip, 0);

    esfammunation5Blip = mp.game.ui.addBlipForRadius(16.703579, 6510.404, 0, 50.0);
    mp.game.invoke("0xDF735600A4696DAF", esfammunation5Blip, 9);
    mp.game.invoke("0x45FF974EEE1C8734", esfammunation5Blip, 70);
    mp.game.invoke("0x03D7FB09E75D6B7E", esfammunation5Blip, 2);
    mp.game.invoke("0xF87683CDF73C3F6E", esfammunation5Blip, 0);

    // esfammunation6Blip = mp.game.ui.addBlipForRadius(-1118.142, 2698.353, 0, 50.0);
    // mp.game.invoke("0xDF735600A4696DAF", esfammunation6Blip, 9);
    // mp.game.invoke("0x45FF974EEE1C8734", esfammunation6Blip, 70);
    // mp.game.invoke("0x03D7FB09E75D6B7E", esfammunation6Blip, 2);
    // mp.game.invoke("0xF87683CDF73C3F6E", esfammunation6Blip, 0);

    // esfammunation7Blip = mp.game.ui.addBlipForRadius(1693.435, 3759.874, 0, 50.0);
    // mp.game.invoke("0xDF735600A4696DAF", esfammunation7Blip, 9);
    // mp.game.invoke("0x45FF974EEE1C8734", esfammunation7Blip, 70);
    // mp.game.invoke("0x03D7FB09E75D6B7E", esfammunation7Blip, 2);
    // mp.game.invoke("0xF87683CDF73C3F6E", esfammunation7Blip, 0);

    // esfammunation8Blip = mp.game.ui.addBlipForRadius(2568.212, 294.2726, 0, 50.0);
    // mp.game.invoke("0xDF735600A4696DAF", esfammunation8Blip, 9);
    // mp.game.invoke("0x45FF974EEE1C8734", esfammunation8Blip, 70);
    // mp.game.invoke("0x03D7FB09E75D6B7E", esfammunation8Blip, 2);
    // mp.game.invoke("0xF87683CDF73C3F6E", esfammunation8Blip, 0);

    // esfammunation9Blip = mp.game.ui.addBlipForRadius(16.703579, 6510.404, 0, 50.0);
    // mp.game.invoke("0xDF735600A4696DAF", esfammunation9Blip, 9);
    // mp.game.invoke("0x45FF974EEE1C8734", esfammunation9Blip, 70);
    // mp.game.invoke("0x03D7FB09E75D6B7E", esfammunation9Blip, 2);
    // mp.game.invoke("0xF87683CDF73C3F6E", esfammunation9Blip, 0);

    // esfammunation10Blip = mp.game.ui.addBlipForRadius(-662.2412, -935.2114, 0, 50.0);
    // mp.game.invoke("0xDF735600A4696DAF", esfammunation10Blip, 9);
    // mp.game.invoke("0x45FF974EEE1C8734", esfammunation10Blip, 70);
    // mp.game.invoke("0x03D7FB09E75D6B7E", esfammunation10Blip, 2);
    // mp.game.invoke("0xF87683CDF73C3F6E", esfammunation10Blip, 0);

    // esfammunation11Blip = mp.game.ui.addBlipForRadius(252.2426, -50.07045, 0, 50.0);
    // mp.game.invoke("0xDF735600A4696DAF", esfammunation11Blip, 9);
    // mp.game.invoke("0x45FF974EEE1C8734", esfammunation11Blip, 70);
    // mp.game.invoke("0x03D7FB09E75D6B7E", esfammunation11Blip, 2);
    // mp.game.invoke("0xF87683CDF73C3F6E", esfammunation11Blip, 0);

    esfHospital1Blip = mp.game.ui.addBlipForRadius(1838.8082, 3673.644, 0, 100.0);
    mp.game.invoke("0xDF735600A4696DAF", esfHospital1Blip, 9);
    mp.game.invoke("0x45FF974EEE1C8734", esfHospital1Blip, 70);
    mp.game.invoke("0x03D7FB09E75D6B7E", esfHospital1Blip, 2);
    mp.game.invoke("0xF87683CDF73C3F6E", esfHospital1Blip, 0);

    esfHospital2Blip = mp.game.ui.addBlipForRadius(-249.69379, 6323.5312, 0, 100.0);
    mp.game.invoke("0xDF735600A4696DAF", esfHospital2Blip, 9);
    mp.game.invoke("0x45FF974EEE1C8734", esfHospital2Blip, 70);
    mp.game.invoke("0x03D7FB09E75D6B7E", esfHospital2Blip, 2);
    mp.game.invoke("0xF87683CDF73C3F6E", esfHospital2Blip, 0);

    esfHospital3Blip = mp.game.ui.addBlipForRadius(329.4422, -590.4075, 0, 100.0);
    mp.game.invoke("0xDF735600A4696DAF", esfHospital3Blip, 9);
    mp.game.invoke("0x45FF974EEE1C8734", esfHospital3Blip, 70);
    mp.game.invoke("0x03D7FB09E75D6B7E", esfHospital3Blip, 2);
    mp.game.invoke("0xF87683CDF73C3F6E", esfHospital3Blip, 0);

    esfHospital4Blip = mp.game.ui.addBlipForRadius(294.9677, -1447.873, 0, 100.0);
    mp.game.invoke("0xDF735600A4696DAF", esfHospital4Blip, 9);
    mp.game.invoke("0x45FF974EEE1C8734", esfHospital4Blip, 70);
    mp.game.invoke("0x03D7FB09E75D6B7E", esfHospital4Blip, 2);
    mp.game.invoke("0xF87683CDF73C3F6E", esfHospital4Blip, 0);

    esfHospital5Blip = mp.game.ui.addBlipForRadius(-458.69684, -339.23392, 0, 100.0);
    mp.game.invoke("0xDF735600A4696DAF", esfHospital5Blip, 9);
    mp.game.invoke("0x45FF974EEE1C8734", esfHospital5Blip, 70);
    mp.game.invoke("0x03D7FB09E75D6B7E", esfHospital5Blip, 2);
    mp.game.invoke("0xF87683CDF73C3F6E", esfHospital5Blip, 0);

    //Del perro
    Ped = mp.peds.new(mp.game.joaat("s_m_y_ammucity_01"), new mp.Vector3(-1271.0637, -811.02844, 17.117561), 167.51035, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);
    
    Ped = mp.peds.new(mp.game.joaat("s_m_m_doctor_01"), new mp.Vector3(-1275.5465, -805.1228, 17.315748), 133.25894, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    Ped = mp.peds.new(mp.game.joaat("u_m_m_streetart_01"), new mp.Vector3(-1265.1356, -817.54065, 17.099035), 126.35479, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    //Chamberlain
    Ped = mp.peds.new(mp.game.joaat("s_m_m_doctor_01"), new mp.Vector3(-153.33862, -1308.8866, 31.31405), 79.41809, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    Ped = mp.peds.new(mp.game.joaat("s_m_y_ammucity_01"), new mp.Vector3(-164.49074, -1309.9661, 31.374899), -6.5599456, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    Ped = mp.peds.new(mp.game.joaat("u_m_m_streetart_01"), new mp.Vector3(-169.13464, -1309.7722, 31.351404), 1.8625242, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    //Legion
    Ped = mp.peds.new(mp.game.joaat("s_m_y_ammucity_01"), new mp.Vector3(312.83405, -1004.63446, 29.311558), -12.398391, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);
    
    Ped = mp.peds.new(mp.game.joaat("s_m_m_doctor_01"), new mp.Vector3(308.1686, -1004.59784, 29.317808), -9.556513, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    Ped = mp.peds.new(mp.game.joaat("u_m_m_streetart_01"), new mp.Vector3(300.4874, -1004.77563, 29.32761), -0.11991079, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    //Sandy
    Ped = mp.peds.new(mp.game.joaat("s_m_m_doctor_01"), new mp.Vector3(1563.0851, 3576.2314, 33.758293), -165.52708, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    Ped = mp.peds.new(mp.game.joaat("s_m_y_ammucity_01"), new mp.Vector3(1570.3676, 3572.7642, 33.188152), 45.264084, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    Ped = mp.peds.new(mp.game.joaat("u_m_m_streetart_01"), new mp.Vector3(1560.7125, 3566.742, 34.131046), -32.096684, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    //Paleto
    Ped = mp.peds.new(mp.game.joaat("s_m_m_doctor_01"), new mp.Vector3(13.755912, 6505.145, 31.492306), -138.61525, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    Ped = mp.peds.new(mp.game.joaat("s_m_y_ammucity_01"), new mp.Vector3(16.843267, 6508.5146, 31.492256), -138.98767, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    Ped = mp.peds.new(mp.game.joaat("u_m_m_streetart_01"), new mp.Vector3(20.767271, 6512.1934, 31.492155), -147.12941, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    // sistemas/purga/purga.js
    cargarDisparos();

    setTimeout(function () {
        mp.events.call("alertapurga3:inicio");
    }, 54000);

    mp.events.call("hud:purga_inicio");
});

mp.events.add('cargar_purga', function () {

    crearIntervaloPurga();

    mp.game.invoke("0xEA16670E7BA4743C");
    mp.game.invoke("0x46E56A7CD1D63C3F");

    for (let i = 0; i <= 16; i++) mp.game.graphics.setLightsState(i, true);
    mp.game.graphics.setLightsState(7, false);

    mp.game.time.setClockTime(0, 0, 0);
    mp.game.time.setClockDate(02, 04, 2021);

    mp.game.gameplay.setWeatherTypePersist("HALLOWEEN");

    modopurga = true;
    purga = true;
    tiendaMascarasTextlabel = mp.labels.new("Tienda Mascaras\n~b~Utiliza la tecla ~b~E~b~ para usar", new mp.Vector3(-1337.08, -1277.913, 4.872756), { los: true, font: 6, drawDistance: 20.0, color: [255, 255, 255, 255], dimension: 0 });
    tiendaMascarasTextlabel1 = mp.labels.new("Tienda Mascaras\n~b~Utiliza la tecla ~b~E~b~ para usar", new mp.Vector3(1698.7848, 3758.133, 34.705353), { los: true, font: 6, drawDistance: 20.0, color: [255, 255, 255, 255], dimension: 0 });
    tiendaMascarasTextlabel2 = mp.labels.new("Tienda Mascaras\n~b~Utiliza la tecla ~b~E~b~ para usar", new mp.Vector3(-325.3113, 6082.2666, 31.454765), { los: true, font: 6, drawDistance: 20.0, color: [255, 255, 255, 255], dimension: 0 });
    // tiendaMascarasBlip = mp.blips.new(671, new mp.Vector3(-1337.08, -1277.913, 4.872756), { name: "Tienda mascaras", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    // tiendaMascarasBlip1 = mp.blips.new(671, new mp.Vector3(1698.7999, 3761.9382, 34.501167), { name: "Tienda mascaras", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    // tiendaMascarasBlip2 = mp.blips.new(671, new mp.Vector3(-320.04468, 6080.7905, 31.292088), { name: "Tienda mascaras", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });

    ammu1TextlabelMed = mp.labels.new("Medicamentos\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(308.21854, -1003.4811, 29.317635), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    ammu1TextlabelAmmu = mp.labels.new("Armas\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(312.8873, -1003.6975, 29.311502), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    ammu1TextlabelRopa = mp.labels.new("Ropa\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(300.47382, -1003.9423, 29.327621), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    
    ammu2TextlabelMed = mp.labels.new("Medicamentos\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(-154.08633, -1308.6785, 31.309383), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    ammu2TextlabelAmmu = mp.labels.new("Armas\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(-164.36293, -1308.9047, 31.321835), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    ammu2TextlabelRopa = mp.labels.new("Ropa\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(-169.11797, -1308.8752, 31.310343), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    
    ammu3TextlabelMed = mp.labels.new("Medicamentos\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(-1276.2034, -805.80237, 17.304289), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    ammu3TextlabelAmmu = mp.labels.new("Armas\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(-1271.3212, -811.9394, 17.115644), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    ammu3TextlabelRopa = mp.labels.new("Ropa\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(-1265.9401, -818.18994, 17.099028), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
 
    ammu4TextlabelMed = mp.labels.new("Medicamentos\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(1563.2083, 3575.3774, 33.74667), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    ammu4TextlabelAmmu = mp.labels.new("Armas\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(1561.3988, 3567.5737, 34.132187), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    ammu4TextlabelRopa = mp.labels.new("Ropa\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(1569.2933, 3573.3599, 33.15769), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
 
    ammu5TextlabelMed = mp.labels.new("Medicamentos\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(14.408886, 6504.474, 31.492159), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    ammu5TextlabelAmmu = mp.labels.new("Armas\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(17.276636, 6507.9194, 31.492159), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });
    ammu5TextlabelRopa = mp.labels.new("Ropa\n~b~Utiliza la tecla ~y~E~b~ para usar", new mp.Vector3(21.302479, 6511.38, 31.492159), { los: true, font: 6, drawDistance: 2.0, color: [255, 255, 255, 255], dimension: 0 });


    ammunation1Blip = mp.blips.new(110, new mp.Vector3(313.204, -998.87836, 29.191923), { name: "Ammunation", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    ammunation2Blip = mp.blips.new(110, new mp.Vector3(-171.95802, -1302.4631, 31.311943), { name: "Ammunation", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    ammunation3Blip = mp.blips.new(110, new mp.Vector3(-1279.3022, -817.7964, 17.116768), { name: "Ammunation", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    ammunation4Blip = mp.blips.new(110, new mp.Vector3(1555.6619, 3569.0564, 35.436672), { name: "Ammunation", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    ammunation5Blip = mp.blips.new(110, new mp.Vector3(16.703579, 6510.404, 31.667284), { name: "Ammunation", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    // ammunation6Blip = mp.blips.new(110, new mp.Vector3(-1118.142, 2698.353, 18.55413), { name: "Ammunation", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    // ammunation7Blip = mp.blips.new(110, new mp.Vector3(1693.435, 3759.874, 34.70531), { name: "Ammunation", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    // ammunation8Blip = mp.blips.new(110, new mp.Vector3(2568.212, 294.2726, 108.7349), { name: "Ammunation", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    // ammunation9Blip = mp.blips.new(110, new mp.Vector3(16.703579, 6510.404, 31.667284), { name: "Ammunation", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    // ammunation10Blip = mp.blips.new(110, new mp.Vector3(-662.2412, -935.2114, 21.82922), { name: "Ammunation", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });
    // ammunation11Blip = mp.blips.new(110, new mp.Vector3(252.2426, -50.07045, 69.94109), { name: "Ammunation", scale: 0.8, color: 8, alpha: 255, drawDistance: 0, shortRange: true, rotation: 0, dimension: 0, });

    //esfmascaras = mp.colshapes.newCircle(-1337.08, -1277.913, 50, 0);
    esfammunation1 = mp.colshapes.newCircle(313.204, -998.87836, 80, 0);
    esfammunation2 = mp.colshapes.newCircle(-171.95802, -1302.4631, 80, 0);
    esfammunation3 = mp.colshapes.newCircle(-1279.3022, -817.7964, 80, 0);
    esfammunation4 = mp.colshapes.newCircle(1555.6619, 3569.0564, 80, 0);
    esfammunation5 = mp.colshapes.newCircle(16.703579, 6510.404, 50, 0);
    // esfammunation6 = mp.colshapes.newCircle(-1118.142, 2698.353, 50, 0);
    // esfammunation7 = mp.colshapes.newCircle(1693.435, 3759.874, 50, 0);
    // esfammunation8 = mp.colshapes.newCircle(2568.212, 294.2726, 50, 0);
    // esfammunation9 = mp.colshapes.newCircle(-330.6808, 6083.538, 50, 0);
    // esfammunation10 = mp.colshapes.newCircle(-662.2412, -935.2114, 50, 0);
    // esfammunation11 = mp.colshapes.newCircle(252.2426, -50.07045, 50, 0);

    esfHospital1 = mp.colshapes.newCircle(1838.8082, 3673.644, 100, 0);
    esfHospital2 = mp.colshapes.newCircle(-249.69379, 6323.5312, 100, 0);
    esfHospital3 = mp.colshapes.newCircle(329.4422, -590.4075, 100, 0);
    esfHospital4 = mp.colshapes.newCircle(294.9677, -1447.873, 100, 0);
    esfHospital5 = mp.colshapes.newCircle(-458.69684, -339.23392, 100, 0);

    esfSquidGame = mp.colshapes.newCircle(690.2549, 601.61206, 128.91113, 0);
    esfSquidGameBlip = mp.game.ui.addBlipForRadius(690.2549, 601.61206, 128.91113, 100.0);
    mp.game.invoke("0xDF735600A4696DAF", esfSquidGameBlip, 9);
    mp.game.invoke("0x45FF974EEE1C8734", esfSquidGameBlip, 70);
    mp.game.invoke("0x03D7FB09E75D6B7E", esfSquidGameBlip, 2);
    mp.game.invoke("0xF87683CDF73C3F6E", esfSquidGameBlip, 0);
    
    esfammunation1Blip = mp.game.ui.addBlipForRadius(313.204, -998.87836, 0, 80.0);
    mp.game.invoke("0xDF735600A4696DAF", esfammunation1Blip, 9);
    mp.game.invoke("0x45FF974EEE1C8734", esfammunation1Blip, 70);
    mp.game.invoke("0x03D7FB09E75D6B7E", esfammunation1Blip, 2);
    mp.game.invoke("0xF87683CDF73C3F6E", esfammunation1Blip, 0);

    esfammunation2Blip = mp.game.ui.addBlipForRadius(-171.95802, -1302.4631, 0, 80.0);
    mp.game.invoke("0xDF735600A4696DAF", esfammunation2Blip, 9);
    mp.game.invoke("0x45FF974EEE1C8734", esfammunation2Blip, 70);
    mp.game.invoke("0x03D7FB09E75D6B7E", esfammunation2Blip, 2);
    mp.game.invoke("0xF87683CDF73C3F6E", esfammunation2Blip, 0);

    esfammunation3Blip = mp.game.ui.addBlipForRadius(-1279.3022, -817.7964, 0, 80.0);
    mp.game.invoke("0xDF735600A4696DAF", esfammunation3Blip, 9);
    mp.game.invoke("0x45FF974EEE1C8734", esfammunation3Blip, 70);
    mp.game.invoke("0x03D7FB09E75D6B7E", esfammunation3Blip, 2);
    mp.game.invoke("0xF87683CDF73C3F6E", esfammunation3Blip, 0);

    esfammunation4Blip = mp.game.ui.addBlipForRadius(1555.6619, 3569.0564, 0, 80.0);
    mp.game.invoke("0xDF735600A4696DAF", esfammunation4Blip, 9);
    mp.game.invoke("0x45FF974EEE1C8734", esfammunation4Blip, 70);
    mp.game.invoke("0x03D7FB09E75D6B7E", esfammunation4Blip, 2);
    mp.game.invoke("0xF87683CDF73C3F6E", esfammunation4Blip, 0);

    esfammunation5Blip = mp.game.ui.addBlipForRadius(16.703579, 6510.404, 0, 50.0);
    mp.game.invoke("0xDF735600A4696DAF", esfammunation5Blip, 9);
    mp.game.invoke("0x45FF974EEE1C8734", esfammunation5Blip, 70);
    mp.game.invoke("0x03D7FB09E75D6B7E", esfammunation5Blip, 2);
    mp.game.invoke("0xF87683CDF73C3F6E", esfammunation5Blip, 0);

    // esfammunation6Blip = mp.game.ui.addBlipForRadius(-1118.142, 2698.353, 0, 50.0);
    // mp.game.invoke("0xDF735600A4696DAF", esfammunation6Blip, 9);
    // mp.game.invoke("0x45FF974EEE1C8734", esfammunation6Blip, 70);
    // mp.game.invoke("0x03D7FB09E75D6B7E", esfammunation6Blip, 2);
    // mp.game.invoke("0xF87683CDF73C3F6E", esfammunation6Blip, 0);

    // esfammunation7Blip = mp.game.ui.addBlipForRadius(1693.435, 3759.874, 0, 50.0);
    // mp.game.invoke("0xDF735600A4696DAF", esfammunation7Blip, 9);
    // mp.game.invoke("0x45FF974EEE1C8734", esfammunation7Blip, 70);
    // mp.game.invoke("0x03D7FB09E75D6B7E", esfammunation7Blip, 2);
    // mp.game.invoke("0xF87683CDF73C3F6E", esfammunation7Blip, 0);

    // esfammunation8Blip = mp.game.ui.addBlipForRadius(2568.212, 294.2726, 0, 50.0);
    // mp.game.invoke("0xDF735600A4696DAF", esfammunation8Blip, 9);
    // mp.game.invoke("0x45FF974EEE1C8734", esfammunation8Blip, 70);
    // mp.game.invoke("0x03D7FB09E75D6B7E", esfammunation8Blip, 2);
    // mp.game.invoke("0xF87683CDF73C3F6E", esfammunation8Blip, 0);

    // esfammunation9Blip = mp.game.ui.addBlipForRadius(-330.6808, 6083.538, 0, 50.0);
    // mp.game.invoke("0xDF735600A4696DAF", esfammunation9Blip, 9);
    // mp.game.invoke("0x45FF974EEE1C8734", esfammunation9Blip, 70);
    // mp.game.invoke("0x03D7FB09E75D6B7E", esfammunation9Blip, 2);
    // mp.game.invoke("0xF87683CDF73C3F6E", esfammunation9Blip, 0);

    // esfammunation10Blip = mp.game.ui.addBlipForRadius(-662.2412, -935.2114, 0, 50.0);
    // mp.game.invoke("0xDF735600A4696DAF", esfammunation10Blip, 9);
    // mp.game.invoke("0x45FF974EEE1C8734", esfammunation10Blip, 70);
    // mp.game.invoke("0x03D7FB09E75D6B7E", esfammunation10Blip, 2);
    // mp.game.invoke("0xF87683CDF73C3F6E", esfammunation10Blip, 0);

    // esfammunation11Blip = mp.game.ui.addBlipForRadius(252.2426, -50.07045, 0, 50.0);
    // mp.game.invoke("0xDF735600A4696DAF", esfammunation11Blip, 9);
    // mp.game.invoke("0x45FF974EEE1C8734", esfammunation11Blip, 70);
    // mp.game.invoke("0x03D7FB09E75D6B7E", esfammunation11Blip, 2);
    // mp.game.invoke("0xF87683CDF73C3F6E", esfammunation11Blip, 0);

    esfHospital1Blip = mp.game.ui.addBlipForRadius(1838.8082, 3673.644, 0, 100.0);
    mp.game.invoke("0xDF735600A4696DAF", esfHospital1Blip, 9);
    mp.game.invoke("0x45FF974EEE1C8734", esfHospital1Blip, 70);
    mp.game.invoke("0x03D7FB09E75D6B7E", esfHospital1Blip, 2);
    mp.game.invoke("0xF87683CDF73C3F6E", esfHospital1Blip, 0);

    esfHospital2Blip = mp.game.ui.addBlipForRadius(-249.69379, 6323.5312, 0, 100.0);
    mp.game.invoke("0xDF735600A4696DAF", esfHospital2Blip, 9);
    mp.game.invoke("0x45FF974EEE1C8734", esfHospital2Blip, 70);
    mp.game.invoke("0x03D7FB09E75D6B7E", esfHospital2Blip, 2);
    mp.game.invoke("0xF87683CDF73C3F6E", esfHospital2Blip, 0);

    esfHospital3Blip = mp.game.ui.addBlipForRadius(329.4422, -590.4075, 0, 100.0);
    mp.game.invoke("0xDF735600A4696DAF", esfHospital3Blip, 9);
    mp.game.invoke("0x45FF974EEE1C8734", esfHospital3Blip, 70);
    mp.game.invoke("0x03D7FB09E75D6B7E", esfHospital3Blip, 2);
    mp.game.invoke("0xF87683CDF73C3F6E", esfHospital3Blip, 0);

    esfHospital4Blip = mp.game.ui.addBlipForRadius(294.9677, -1447.873, 0, 100.0);
    mp.game.invoke("0xDF735600A4696DAF", esfHospital4Blip, 9);
    mp.game.invoke("0x45FF974EEE1C8734", esfHospital4Blip, 70);
    mp.game.invoke("0x03D7FB09E75D6B7E", esfHospital4Blip, 2);
    mp.game.invoke("0xF87683CDF73C3F6E", esfHospital4Blip, 0);

    esfHospital5Blip = mp.game.ui.addBlipForRadius(-458.69684, -339.23392, 0, 100.0);
    mp.game.invoke("0xDF735600A4696DAF", esfHospital5Blip, 9);
    mp.game.invoke("0x45FF974EEE1C8734", esfHospital5Blip, 70);
    mp.game.invoke("0x03D7FB09E75D6B7E", esfHospital5Blip, 2);
    mp.game.invoke("0xF87683CDF73C3F6E", esfHospital5Blip, 0);

    //Del perro
    Ped = mp.peds.new(mp.game.joaat("s_m_m_doctor_01"), new mp.Vector3(-1271.0637, -811.02844, 17.117561), 167.51035, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    Ped = mp.peds.new(mp.game.joaat("s_m_y_ammucity_01"), new mp.Vector3(-1275.5465, -805.1228, 17.315748), 133.25894, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    Ped = mp.peds.new(mp.game.joaat("u_m_m_streetart_01"), new mp.Vector3(-1265.1356, -817.54065, 17.099035), 126.35479, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    //Chamberlain
    Ped = mp.peds.new(mp.game.joaat("s_m_m_doctor_01"), new mp.Vector3(-153.33862, -1308.8866, 31.31405), 79.41809, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    Ped = mp.peds.new(mp.game.joaat("s_m_y_ammucity_01"), new mp.Vector3(-164.49074, -1309.9661, 31.374899), -6.5599456, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    Ped = mp.peds.new(mp.game.joaat("u_m_m_streetart_01"), new mp.Vector3(-169.13464, -1309.7722, 31.351404), 1.8625242, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    //Legion
    Ped = mp.peds.new(mp.game.joaat("s_m_m_doctor_01"), new mp.Vector3(312.83405, -1004.63446, 29.311558), -12.398391, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    Ped = mp.peds.new(mp.game.joaat("s_m_y_ammucity_01"), new mp.Vector3(308.1686, -1004.59784, 29.317808), -9.556513, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    Ped = mp.peds.new(mp.game.joaat("u_m_m_streetart_01"), new mp.Vector3(300.4874, -1004.77563, 29.32761), -0.11991079, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    //Sandy
    Ped = mp.peds.new(mp.game.joaat("s_m_m_doctor_01"), new mp.Vector3(1563.0851, 3576.2314, 33.758293), -165.52708, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    Ped = mp.peds.new(mp.game.joaat("s_m_y_ammucity_01"), new mp.Vector3(1570.3676, 3572.7642, 33.188152), 45.264084, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    Ped = mp.peds.new(mp.game.joaat("u_m_m_streetart_01"), new mp.Vector3(1560.7125, 3566.742, 34.131046), -32.096684, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    //Paleto
    Ped = mp.peds.new(mp.game.joaat("s_m_m_doctor_01"), new mp.Vector3(13.755912, 6505.145, 31.492306), -138.61525, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    Ped = mp.peds.new(mp.game.joaat("s_m_y_ammucity_01"), new mp.Vector3(16.843267, 6508.5146, 31.492256), -138.98767, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    Ped = mp.peds.new(mp.game.joaat("u_m_m_streetart_01"), new mp.Vector3(20.767271, 6512.1934, 31.492155), -147.12941, 0);
    obj = { ped: Ped, id: 0, escenario: "WORLD_HUMAN_CLIPBOARD" };
    pedsAmmuEscenarios.push(obj);

    // sistemas/purga/purga.js
    cargarDisparos();

    mp.events.call("hud:purga_inicio");
});

mp.events.add("playerEnterColshape", (colshape) => {
    if (modopurga) {
        switch (colshape) {
            case esfSquidGame:
                enZonaSegura = true;

                mp.events.call("hud:faccion", "ZONA SEGURA", "https://files.lu-rp.ovh/v/purga/safezone.png", "#15DB95");
                mp.events.call("hud:mostrar_faccion", true);

                mp.game.invoke("0x2E8AABFA40A84F8C", player_local.handle, true);
                break;
            case esfammunation1:
                enZonaSegura = true;

                mp.events.call("hud:faccion", "ZONA SEGURA", "https://files.lu-rp.ovh/v/purga/safezone.png", "#15DB95");
                mp.events.call("hud:mostrar_faccion", true);

                mp.game.invoke("0x2E8AABFA40A84F8C", player_local.handle, true);
                break;
            case esfammunation2:
                enZonaSegura = true;
                
                mp.events.call("hud:faccion", "ZONA SEGURA", "https://files.lu-rp.ovh/v/purga/safezone.png", "#15DB95");
                mp.events.call("hud:mostrar_faccion", true);

                mp.game.invoke("0x2E8AABFA40A84F8C", player_local.handle, true);
                break;
            case esfammunation3:
                enZonaSegura = true;
                
                mp.events.call("hud:faccion", "ZONA SEGURA", "https://files.lu-rp.ovh/v/purga/safezone.png", "#15DB95");
                mp.events.call("hud:mostrar_faccion", true);

                mp.game.invoke("0x2E8AABFA40A84F8C", player_local.handle, true);
                break;
            case esfammunation4:
                enZonaSegura = true;
                
                mp.events.call("hud:faccion", "ZONA SEGURA", "https://files.lu-rp.ovh/v/purga/safezone.png", "#15DB95");
                mp.events.call("hud:mostrar_faccion", true);

                mp.game.invoke("0x2E8AABFA40A84F8C", player_local.handle, true);
                break;
            case esfammunation5:
                enZonaSegura = true;
                
                mp.events.call("hud:faccion", "ZONA SEGURA", "https://files.lu-rp.ovh/v/purga/safezone.png", "#15DB95");
                mp.events.call("hud:mostrar_faccion", true);

                mp.game.invoke("0x2E8AABFA40A84F8C", player_local.handle, true);
                break;
            // case esfammunation6:
            //     enZonaSegura = true;
                
            //     mp.events.call("hud:faccion", "ZONA SEGURA", "https://files.lu-rp.ovh/v/purga/safezone.png", "#15DB95");
            //     mp.events.call("hud:mostrar_faccion", true);

            //     mp.game.invoke("0x2E8AABFA40A84F8C", player_local, true);
            //     break;
            // case esfammunation7:
            //     enZonaSegura = true;

            //     mp.events.call("hud:faccion", "ZONA SEGURA", "https://files.lu-rp.ovh/v/purga/safezone.png", "#15DB95");
            //     mp.events.call("hud:mostrar_faccion", true);

            //     mp.game.invoke("0x2E8AABFA40A84F8C", player_local, true);
            //     break;
            // case esfammunation8:
            //     enZonaSegura = true;
                
            //     mp.events.call("hud:faccion", "ZONA SEGURA", "https://files.lu-rp.ovh/v/purga/safezone.png", "#15DB95");
            //     mp.events.call("hud:mostrar_faccion", true);

            //     mp.game.invoke("0x2E8AABFA40A84F8C", player_local, true);
            //     break;
            // case esfammunation9:
            //     enZonaSegura = true;
                
            //     mp.events.call("hud:faccion", "ZONA SEGURA", "https://files.lu-rp.ovh/v/purga/safezone.png", "#15DB95");
            //     mp.events.call("hud:mostrar_faccion", true);

            //     mp.game.invoke("0x2E8AABFA40A84F8C", player_local, true);
            //     break;
            // case esfammunation10:
            //     enZonaSegura = true;
                
            //     mp.events.call("hud:faccion", "ZONA SEGURA", "https://files.lu-rp.ovh/v/purga/safezone.png", "#15DB95");
            //     mp.events.call("hud:mostrar_faccion", true);

            //     mp.game.invoke("0x2E8AABFA40A84F8C", player_local, true);
            //     break;
            // case esfammunation11:
            //     enZonaSegura = true;
                
            //     mp.events.call("hud:faccion", "ZONA SEGURA", "https://files.lu-rp.ovh/v/purga/safezone.png", "#15DB95");
            //     mp.events.call("hud:mostrar_faccion", true);

            //     mp.game.invoke("0x2E8AABFA40A84F8C", player_local, true);
            //     break;
            case esfHospital1:
                enZonaSegura = true;
                
                mp.events.call("hud:faccion", "ZONA SEGURA", "https://files.lu-rp.ovh/v/purga/safezone.png", "#15DB95");
                mp.events.call("hud:mostrar_faccion", true);

                mp.game.invoke("0x2E8AABFA40A84F8C", player_local.handle, true);
                break;
            case esfHospital2:
                enZonaSegura = true;
                
                mp.events.call("hud:faccion", "ZONA SEGURA", "https://files.lu-rp.ovh/v/purga/safezone.png", "#15DB95");
                mp.events.call("hud:mostrar_faccion", true);

                mp.game.invoke("0x2E8AABFA40A84F8C", player_local.handle, true);
                break;
            case esfHospital3:
                enZonaSegura = true;
                
                mp.events.call("hud:faccion", "ZONA SEGURA", "https://files.lu-rp.ovh/v/purga/safezone.png", "#15DB95");
                mp.events.call("hud:mostrar_faccion", true);

                mp.game.invoke("0x2E8AABFA40A84F8C", player_local.handle, true);
                break;
            case esfHospital4:
                enZonaSegura = true;
               
                mp.events.call("hud:faccion", "ZONA SEGURA", "https://files.lu-rp.ovh/v/purga/safezone.png", "#15DB95");
                mp.events.call("hud:mostrar_faccion", true);

                mp.game.invoke("0x2E8AABFA40A84F8C", player_local.handle, true);
                break;
            case esfHospital5:
                enZonaSegura = true;
                
                mp.events.call("hud:faccion", "ZONA SEGURA", "https://files.lu-rp.ovh/v/purga/safezone.png", "#15DB95");
                mp.events.call("hud:mostrar_faccion", true);

                mp.game.invoke("0x2E8AABFA40A84F8C", player_local.handle, true);
                break;
        }
    }
});

mp.events.add("playerExitColshape", (colshape) => {
    if (modopurga) {
        switch (colshape) {
            case esfSquidGame:
                enZonaSegura = false;
                
                mp.events.call("hud:mostrar_faccion", false);

                mp.game.invoke("0x2E8AABFA40A84F8C", player_local.handle, false);
                break;
            case esfammunation1:
                enZonaSegura = false;
                
                mp.events.call("hud:mostrar_faccion", false);

                mp.game.invoke("0x2E8AABFA40A84F8C", player_local.handle, false);
                break;
            case esfammunation2:
                enZonaSegura = false;
                
                mp.events.call("hud:mostrar_faccion", false);

                mp.game.invoke("0x2E8AABFA40A84F8C", player_local.handle, false);
                break;
            case esfammunation3:
                enZonaSegura = false;
                
                mp.events.call("hud:mostrar_faccion", false);

                mp.game.invoke("0x2E8AABFA40A84F8C", player_local.handle, false);
                break;
            case esfammunation4:
                enZonaSegura = false;
                
                mp.events.call("hud:mostrar_faccion", false);
                
                mp.game.invoke("0x2E8AABFA40A84F8C", player_local.handle, false);
                break;
            case esfammunation5:
                enZonaSegura = false;
                
                mp.events.call("hud:mostrar_faccion", false);

                mp.game.invoke("0x2E8AABFA40A84F8C", player_local.handle, false);
                break;
            // case esfammunation6:
            //     enZonaSegura = false;
                
            //     mp.events.call("hud:mostrar_faccion", false);

            //     mp.game.invoke("0x2E8AABFA40A84F8C", player_local, false);
            //     break;
            // case esfammunation7:
            //     enZonaSegura = false;
                
            //     mp.events.call("hud:mostrar_faccion", false);

            //     mp.game.invoke("0x2E8AABFA40A84F8C", player_local, false);
            //     break;
            // case esfammunation8:
            //     enZonaSegura = false;

            //     mp.events.call("hud:mostrar_faccion", false);

            //     mp.game.invoke("0x2E8AABFA40A84F8C", player_local, false);
            //     break;
            // case esfammunation9:
            //     enZonaSegura = false;

            //     mp.events.call("hud:mostrar_faccion", false);

            //     mp.game.invoke("0x2E8AABFA40A84F8C", player_local, false);
            //     break;
            // case esfammunation10:
            //     enZonaSegura = false;

            //     mp.events.call("hud:mostrar_faccion", false);

            //     mp.game.invoke("0x2E8AABFA40A84F8C", player_local, false);
            //     break;
            // case esfammunation11:
            //     enZonaSegura = false;

            //     mp.events.call("hud:mostrar_faccion", false);

            //     mp.game.invoke("0x2E8AABFA40A84F8C", player_local, false);
            //     break;
            case esfHospital1:
                enZonaSegura = false;

                mp.events.call("hud:mostrar_faccion", false);

                mp.game.invoke("0x2E8AABFA40A84F8C", player_local.handle, false);
                break;
            case esfHospital2:
                enZonaSegura = false;

                mp.events.call("hud:mostrar_faccion", false);

                mp.game.invoke("0x2E8AABFA40A84F8C", player_local.handle, false);
                break;
            case esfHospital3:
                enZonaSegura = false;
                
                mp.events.call("hud:mostrar_faccion", false);

                mp.game.invoke("0x2E8AABFA40A84F8C", player_local.handle, false);
                break;
            case esfHospital4:
                enZonaSegura = false;
                
                mp.events.call("hud:mostrar_faccion", false);

                mp.game.invoke("0x2E8AABFA40A84F8C", player_local.handle, false);
                break;
            case esfHospital5:
                enZonaSegura = false;
                
                mp.events.call("hud:mostrar_faccion", false);

                mp.game.invoke("0x2E8AABFA40A84F8C", player_local.handle, false);
                break;  
        }
    }
});

mp.events.add("displayAward", function (name, description, txdLib, txdName, color) {
    mostrarAviso("reward", 10000, "<h1>" + name + "</h1><p>" + description + "</p>");
});

//Daño entrante, con este evento cancelamos el daño para un tipo de arma y aplicamos otros efectos.
mp.events.add("incomingDamage", (sourceEntity, sourcePlayer, targetEntity, weapon, boneIndex, damage) => {
    if (modopurga) {
        if (targetEntity && targetEntity.type === "player") {
            if (enZonaSegura)
                return true;

        }
        if (sourceEntity && sourceEntity.type === "player") {
            if (enZonaSegura)
                return true;
        }
    }
});
//Daño saliente, con este evento quien genera el daño le muestra la info a el a quien disparo
mp.events.add("outgoingDamage", (sourceEntity, targetEntity, targetPlayer, weapon, boneIndex, damage) => {
    if (modopurga) {
        if (targetEntity && targetEntity.type === "player") {
            if (enZonaSegura)
                return true;
        }
        if (sourceEntity && sourceEntity.type === "player") {
            if (enZonaSegura)
                return true;
        }
    }
});

mp.events.add('finalizar_purga', function () {

    if(!logueado) return;

    if (intervalo_purga != null) {
        clearInterval(intervalo_purga);
    }

    mp.events.call("sound:play", "findepurga", false);
    //reseteamos el clima default
    mp.game.gameplay.setOverrideWeather("CLEAR");
    mp.game.gameplay.setWeatherTypeNow("CLEAR");
    mp.game.gameplay.setWeatherTypePersist("CLEAR");
    mp.game.gameplay.setRainFxIntensity(0.0);
    for (let i = 0; i <= 16; i++) mp.game.graphics.setLightsState(i, false);
    //cerramos todos los cefs relacionados con la purga
    mp.events.call("cerrarCefs:Purga");
    mp.events.call("hud:cerrar_aviso_fijo");

    modopurga = false;
    purga = false;
    fase1 = true;
    /* if (fase1 == true) {  //Llamamos a la funcion last warning para aplicar efectos tanto en camara como congelar etc al usuario para que escuche el audio detenidamente.
        last_warning(player_local);
    } */
    if (esfammunation1 != null && mp.colshapes.exists(esfammunation1))
        esfammunation1.destroy();
    if (esfammunation2 != null && mp.colshapes.exists(esfammunation2))
        esfammunation2.destroy();
    if (esfammunation3 != null && mp.colshapes.exists(esfammunation3))
        esfammunation3.destroy();
    if (esfammunation4 != null && mp.colshapes.exists(esfammunation4))
        esfammunation4.destroy();
    if (esfammunation5 != null && mp.colshapes.exists(esfammunation5))
        esfammunation5.destroy();
    // if (esfammunation6 != null && mp.colshapes.exists(esfammunation6))
    //     esfammunation6.destroy();
    // if (esfammunation7 != null && mp.colshapes.exists(esfammunation7))
    //     esfammunation7.destroy();
    // if (esfammunation8 != null && mp.colshapes.exists(esfammunation8))
    //     esfammunation8.destroy();
    // if (esfammunation9 != null && mp.colshapes.exists(esfammunation9))
    //     esfammunation9.destroy();
    // if (esfammunation10 != null && mp.colshapes.exists(esfammunation10))
    //     esfammunation10.destroy();
    // if (esfammunation11 != null && mp.colshapes.exists(esfammunation11))
    //     esfammunation11.destroy();

    if (esfHospital1 != null && mp.colshapes.exists(esfHospital1))
        esfHospital1.destroy();
    if (esfHospital2 != null && mp.colshapes.exists(esfHospital2))
        esfHospital2.destroy();
    if (esfHospital3 != null && mp.colshapes.exists(esfHospital3))
        esfHospital3.destroy();
    if (esfHospital4 != null && mp.colshapes.exists(esfHospital4))
        esfHospital4.destroy();
    if (esfHospital5 != null && mp.colshapes.exists(esfHospital5))
        esfHospital5.destroy();

    if(esfammunation1Blip != null)
        mp.game.ui.removeBlip(esfammunation1Blip);
    if(esfammunation2Blip != null)
        mp.game.ui.removeBlip(esfammunation2Blip);
    if(esfammunation3Blip != null)
        mp.game.ui.removeBlip(esfammunation3Blip);
    if(esfammunation4Blip != null)
        mp.game.ui.removeBlip(esfammunation4Blip);
    if(esfammunation5Blip != null)
        mp.game.ui.removeBlip(esfammunation5Blip);


    if (tiendaMascarasTextlabel != null && mp.labels.exists(tiendaMascarasTextlabel))
        tiendaMascarasTextlabel.destroy();
    if (tiendaMascarasTextlabel1 != null && mp.labels.exists(tiendaMascarasTextlabel1))
        tiendaMascarasTextlabel1.destroy();
    if (tiendaMascarasTextlabel2 != null && mp.labels.exists(tiendaMascarasTextlabel2))
        tiendaMascarasTextlabel2.destroy();

    // if (tiendaMascarasBlip != null && mp.blips.exists(tiendaMascarasBlip))
    //     tiendaMascarasBlip.destroy();
    // if (tiendaMascarasBlip1 != null && mp.blips.exists(tiendaMascarasBlip1))
    //     tiendaMascarasBlip1.destroy();
    // if (tiendaMascarasBlip2 != null && mp.blips.exists(tiendaMascarasBlip2))
    //     tiendaMascarasBlip2.destroy();

    if (ammunation1Blip != null && mp.blips.exists(ammunation1Blip))
        ammunation1Blip.destroy();

    if (ammunation2Blip != null && mp.blips.exists(ammunation2Blip))
        ammunation2Blip.destroy();

    if (ammunation3Blip != null && mp.blips.exists(ammunation3Blip))
        ammunation3Blip.destroy();

    if (ammunation4Blip != null && mp.blips.exists(ammunation4Blip))
        ammunation4Blip.destroy();

    if (ammunation5Blip != null && mp.blips.exists(ammunation5Blip))
        ammunation5Blip.destroy();

    // if (ammunation6Blip != null && mp.blips.exists(ammunation6Blip))
    //     ammunation6Blip.destroy();

    // if (ammunation7Blip != null && mp.blips.exists(ammunation7Blip))
    //     ammunation7Blip.destroy();

    // if (ammunation8Blip != null && mp.blips.exists(ammunation8Blip))
    //     ammunation8Blip.destroy();

    // if (ammunation9Blip != null && mp.blips.exists(ammunation9Blip))
    //     ammunation9Blip.destroy();

    // if (ammunation10Blip != null && mp.blips.exists(ammunation10Blip))
    //     ammunation10Blip.destroy();

    // if (ammunation11Blip != null && mp.blips.exists(ammunation11Blip))
    //     ammunation11Blip.destroy();

    if (esfHospital1Blip != null && mp.blips.exists(esfHospital1Blip))
        esfHospital1Blip.destroy();

    if (esfSquidGameBlip != null && mp.blips.exists(esfSquidGameBlip))
        esfSquidGameBlip.destroy();

    if (esfHospital2Blip != null && mp.blips.exists(esfHospital2Blip))
        esfHospital2Blip.destroy();

    if (esfHospital3Blip != null && mp.blips.exists(esfHospital3Blip))
        esfHospital3Blip.destroy();

    if (esfHospital4Blip != null && mp.blips.exists(esfHospital4Blip))
        esfHospital4Blip.destroy();

    if (esfHospital5Blip != null && mp.blips.exists(esfHospital5Blip))
        esfHospital5Blip.destroy();   

    mp.game.invoke("0x4A3DC7ECCC321032", player_local.handle, 0.1, false); // PETA setPlayerMeleeWeaponDamageModifier (he añadido el 0 al final por probar, 0 documentacion)
    mp.game.invoke("0xAE540335B4ABC4E2", player_local.handle, 0.1);
    mp.game.invoke("0xCE07B9F7817AADA3", player_local.handle, 0.3);

    // sistemas/purga/purga.js
    clearTimeout(purgaTimeout);
    purgaTimeout = null;

    mp.events.call("hud:purga_fin");
    
    let jug = mp.controladorJugadores._jugadores[player_local.id];
    if (jug) {
        mp.events.call("hud:modificar_parametro", "nivel", jug.nivel_pj);
    }

    mostrarAviso("info", 10000, "La Purga ha finalizado, los servicios de emergencia vuelven a estar operativos");
});

var zonas_purga = [];
mp.events.add("alerta:purga:zonas", function (array) {
    try {
        var pos_array = JSON.parse(array);

        if(pos_array.length == 0)
        {
            zonas_purga = [];
        }
        else
        {
            var _loop_1 = function () {
                var objeto_existe = false;
                zonas_purga.forEach(function (obj) {
                    if (obj.id == pos_array[i].id)
                    {
                        obj.estado = parseInt(pos_array[i].estado); 
                        objeto_existe = true;
                    }
                });
                if (!objeto_existe) {
                    var obj = { 
                        id: parseInt(pos_array[i].id), 
                        nombre: pos_array[i].nombre, 
                        estado: parseInt(pos_array[i].estado), 
                        posx1: parseFloat(pos_array[i].posx1),
                        posy1: parseFloat(pos_array[i].posy1),
                        posz1: parseFloat(pos_array[i].posz1),
                        posx2: parseFloat(pos_array[i].posx2),
                        posy2: parseFloat(pos_array[i].posy2),
                        posz2: parseFloat(pos_array[i].posz2),
                    }; 
                    zonas_purga.push(obj);
                }
            };
            for (var i = 0; i < pos_array.length; i++) {
                _loop_1();
            }
        }

    } 
    catch (e) 
    {
    }
});

var enZonaPurgaMuerte = false;
var enZonaPurgaBonificada = false;
var intervalo_purga = null;
var tiempoIntervaloPurga = 2000;
function crearIntervaloPurga() {
    if (intervalo_purga != null) {
        clearInterval(intervalo_purga);
    }
    intervalo_purga = setInterval(async() => {
        try {
            sincronizarZonasPurga();
        } catch (e) 
        {

        }
    }, tiempoIntervaloPurga);
}
async function sincronizarZonasPurga() {
    // Zonas de muerte o bonificacion
    try {
        for (let i = 0, n = zonas_purga.length; i < n; i++) 
        {
            if(player_local.position.x >= zonas_purga[i].posx1 && player_local.position.x <= zonas_purga[i].posx2 && player_local.position.y >= zonas_purga[i].posy1 && player_local.position.y <= zonas_purga[i].posy2)
            {
                if(zonas_purga[i].estado == 2)
                {
                    if(!enZonaPurgaMuerte)
                    {
                        enZonaPurgaMuerte = true;
                        
                        mp.events.call("hud:faccion", "ZONA DE MUERTE", "https://files.lu-rp.ovh/v/purga/calavera.png", "#FF0000");
                        mp.events.call("hud:mostrar_faccion", true);

                        //mp.events.call("efectoShake", "DEATH_FAIL_IN_EFFECT_SHAKE", 1.0);
                        mp.events.call("efectoScreenfx", "DeathFailNeutralIn", 3000, false);
                        mp.events.call("sound:play", "sonidoscaleform", false);
                    }
                }

                if(zonas_purga[i].estado == 3)
                {
                    if(!enZonaPurgaBonificada)
                    {
                        mp.events.callRemote('purga:zonaBonificada', true);
                        enZonaPurgaBonificada = true;
                        
                        mp.events.call("hud:faccion", "ZONA BONIFICADA", "https://files.lu-rp.ovh/v/purga/bonificado.png", "#8860D0");
                        mp.events.call("hud:mostrar_faccion", true);
                    }
                }
            }
            else
            {
                if(enZonaPurgaMuerte)
                {
                    if(!enZonaSegura)
                    {
                        var vida = player_local.getHealth();
                        if(vida > 0) mp.events.callRemote("cracking_nuevoHP", (vida - 1));
                    }

                    var enOtra = false;
                    for (let i2 = 0, nz = zonas_purga.length; i2 < nz; i2++) {
                        if(player_local.position.x >= zonas_purga[i2].posx1 && player_local.position.x <= zonas_purga[i2].posx2 && player_local.position.y >= zonas_purga[i2].posy1 && player_local.position.y <= zonas_purga[i2].posy2)
                        {
                            if(zonas_purga[i2].estado == 2)
                            {
                                enOtra = true;
                                break;
                            }
                        }
                    }

                    if(!enOtra)
                    {
                        mp.events.call("hud:mostrar_faccion", false);

                        //mp.events.call("efectoShake", "DEATH_FAIL_IN_EFFECT_SHAKE", 1.0);
                        mp.events.call("efectoScreenfx", "DeathFailNeutralIn", 3000, false);
                        mp.events.call("sound:play", "sonidoscaleform", false);
                        enZonaPurgaMuerte = false;
                    }
                }

                if(enZonaPurgaBonificada)
                {
                    var enOtra = false;
                    for (let i2 = 0, nz = zonas_purga.length; i2 < nz; i2++) {
                        if(player_local.position.x >= zonas_purga[i2].posx1 && player_local.position.x <= zonas_purga[i2].posx2 && player_local.position.y >= zonas_purga[i2].posy1 && player_local.position.y <= zonas_purga[i2].posy2)
                        {
                            if(zonas_purga[i2].estado == 3)
                            {
                                enOtra = true;
                                break;
                            }
                        }
                    }

                    if(!enOtra)
                    {
                        mp.events.callRemote('purga:zonaBonificada', false);

                        mp.events.call("hud:mostrar_faccion", false);
                        enZonaPurgaBonificada = false;
                    }
                }
            }

        }
    } 
    catch (e) 
    {
    }

}

mp.events.add("render", function () {

    if (purga) {
        if (enZonaSegura) {
            mp.game.invoke("0x5E6CC07646BBEAB8", player_local.handle, true);
            mp.game.invoke("0xAE540335B4ABC4E2", player_local.handle, 0);

            //Si está muerto, no le permitimos atacar R (cancela la animacion)

            let weaponHash = mp.game.invoke(`0x0A6DB4965674D243`, mp.players.local.handle); //GET_SELECTED_PED_WEAPON
            //MELEE ATTACK con la R bloqueado si no estas con los puños o armas melee
            let isMelee = weaponIsMelee(weaponHash);
            if (!isMelee)//Si el grupo del arma actual es diferente al grupo melee, bloqueo los ataques cuerpo a cuerpo
            {
                mp.game.controls.disableControlAction(32, 140, true);
                mp.game.controls.disableControlAction(32, 141, true);
                mp.game.controls.disableControlAction(32, 142, true);
                mp.game.controls.disableControlAction(32, 143, true);
                mp.game.controls.disableControlAction(32, 263, true);
                mp.game.controls.disableControlAction(32, 264, true);
            }
        }
    }
});

mp.events.add('alertapurga1:inicio', function () {
    if (alertapurga_cef1 < 0) {
        alertapurga_cef1 = cef_purga.crearCef("package://LURP/cef/alerta/purga_mensaje.html", {
            puedeCerrar: false
        });
    }
    if (alertapurga_cef1 >= 0) {
        setTimeout(function () {
            cef_purga.cerrarCef(alertapurga_cef1, false);
            alertapurga_cef1 = -1;
        }, 48000);
    }
});
mp.events.add('alertapurga2:inicio', function () {
    if (alertapurga_cef2 < 0) {
        alertapurga_cef2 = cef_purga.crearCef("package://LURP/cef/alerta/purga.html", {
            puedeCerrar: false
        });
    }
    if (alertapurga_cef2 >= 0) {
        setTimeout(function () {
            cef_purga.cerrarCef(alertapurga_cef2, false);
            alertapurga_cef2 = -1;
        }, 6000);
    }
});
mp.events.add('alertapurga3:inicio', function () {
    if (alertapurga_cef3 < 0) {
        alertapurga_cef3 = cef_purga.crearCef("package://LURP/cef/alerta/purga.html", {
            puedeCerrar: false
        });
    }
    if (alertapurga_cef3 >= 0) {
        setTimeout(function () {
            cef_purga.cerrarCef(alertapurga_cef3, false);
            alertapurga_cef3 = -1;
/*             mp.game.ui.messages.showMidsizedShard("~g~PURGA 2021 INICIADA~g~", "La purga ha dado inicio, ya puedes ir preparándote", 2, false, false, 10000, false);
            mp.events.call("efectoShake", "DEATH_FAIL_IN_EFFECT_SHAKE", 1.0);
            mp.events.call("efectoScreenfx", "DeathFailNeutralIn", 10000, false);
            mp.events.call("sound:play", "sonidoscaleform", false); */
        }, 13500);
    }
});
mp.events.add('alertapurga:weazels', function () {
    if (alertapurga_cef4 < 0) {
        alertapurga_cef4 = cef_purga.crearCef("package://LURP/cef/alerta/weazel.html", {
            puedeCerrar: false
        });
    }
    if (alertapurga_cef4 >= 0) {
        setTimeout(function () {
            cef_purga.cerrarCef(alertapurga_cef4, false);
            alertapurga_cef4 = -1;
        }, 10000);

    }
});
mp.events.add('cerrarCefs:Purga', function () {

    if (alertapurga_cef2 >= 0 && alertapurga_cef1 >= 0 && alertapurga_cef3 >= 0) {
        cef_purga.cerrarCef(alertapurga_cef3, false); alertapurga_cef3 = -1;
        cef_purga.cerrarCef(alertapurga_cef2, false); alertapurga_cef2 = -1;
        cef_purga.cerrarCef(alertapurga_cef1, false); alertapurga_cef1 = -1;
    }
})
function last_warning() {
    if (fase1 == true) { //Fase 1 : primera transición mostrando el cef de weazel news. 
        // Ocultamos todo el hud y lo que vemos en la pantalla y le ponemos la pantalla en negra
        mp.game.cam.doScreenFadeOut(300)
        mp.events.call("hud:estado_hud");
        mp.game.ui.displayRadar(false);
        mp.game.ui.displayHud(false);
        mp.gui.chat.show(false);
        player_local.freezePosition(true);
        player_local.setInvincible(true);
        player_local.setCollision(false, false);


        // Después de diez segundos de audio le volvemos a mostrar todo y le notificamos
        setTimeout(function () {
            mp.events.call("alertapurga:weazels")
            mp.game.cam.doScreenFadeIn(2500);
            mp.events.call("efectoScreenfx", "DeathFailNeutralIn", 5000, false);
            mp.events.call("hud:estado_hud");
            if(tipoMapa != 2) mp.game.ui.displayRadar(true);
            mp.game.ui.displayHud(true);
            mp.gui.chat.show(true);
            player_local.freezePosition(false);
            player_local.setInvincible(false);
            player_local.setCollision(true, false);
            fase2 = true;
            fase1 = false;
            last_warning(player_local)
        }, 15000);
    } else if (fase2 == true) { //Fase 2 : segunda transición para volver a la pantalla de carga normal
        mp.game.cam.doScreenFadeOut(300)
        mp.events.call("hud:estado_hud");
        mp.game.ui.displayRadar(false);
        mp.game.ui.displayHud(false);
        mp.gui.chat.show(false);
        player_local.freezePosition(true);
        player_local.setInvincible(true);
        player_local.setCollision(false, false);

        setTimeout(function () {
            mp.game.fire.addExplosion(-330.34796, 6154.449, 32.313293, 3, 10, true, false, true); //Creamos los fuegos visuales para cuando estén en la cámara
            mp.game.fire.addExplosion(-336.95544, 6168.894, 32.427147, 3, 10, true, false, true);
            mp.game.fire.addExplosion(-350.84952, 6143.89, 31.47075, 3, 10, true, false, true);
            mp.game.ui.messages.showMidsized("~r~WEAZEL NEWS~r~", "Nos proporcionan fotografias del estado actual de la iglesia de Paleto Bay", 20000);
            mp.game.cam.doScreenFadeIn(2500);
            sceneryCamera = mp.cameras.new('iglesiaPurga', new mp.Vector3(-379.0098, 6174.112, 42.7287), new mp.Vector3(-9.7321, 0, -107.7), 40) //Creamos la cámara estática
            sceneryCamera.shake("ROAD_VIBRATION_SHAKE", 2.25);
            sceneryCamera.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 0, true, false);
            fase2 = false;
            fase3 = true;
            last_warning(player_local)
        }, 20000);
    }
    else if (fase3 == true) //Fase 3, al recibir el booleano en true borramos todo lo relacionado con la cámara y devolvemos los estados a la normalidad
    {

        setTimeout(function () {
            sceneryCamera.setActive(false);
            sceneryCamera.destroy();
            mp.game.cam.renderScriptCams(false, false, 0, false, false);
            if(tipoMapa != 2) mp.game.ui.displayRadar(true);
            mp.game.ui.displayHud(true);
            mp.events.call("hud:estado_hud");
            mp.gui.chat.show(true);
            player_local.freezePosition(false);
            player_local.setInvincible(false);
            player_local.setCollision(true, false);
            mp.events.call("efectoShake", "DEATH_FAIL_IN_EFFECT_SHAKE", 1.0);
            mp.events.call("efectoScreenfx", "DeathFailNeutralIn", 5000, false);
            mp.game.ui.messages.showMidsized("~r~INFORMATIVO URGENTE WEAZEL NEWS~r~", "Escucha con atención el comunicado que está lanzando weazel news", 15000);
            mp.events.call("sound:play", "sonidoscaleform", false);
            fase3 = false;
        }, 15000);
    }

}


var disparosFallados = 0;
var disparosEfectivos = 0;

var purgaTimeout = null;

const cargarDisparos = () => {
    disparosFallados = typeof mp.storage.data.disparosFallados !== 'undefined' ? mp.storage.data.disparosFallados : 0;

    purgaTimeout = setTimeout(() => {
        //mp.storage.flush();
    }, 10*1000);
};

mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
    if (!targetEntity) {
        disparosFallados++;

        if (disparosFallados >= 100) {
            mp.events.callRemote('purga:logro:cegato');
            //mp.storage.flush();
        }
    } else {
        disparosEfectivos++;

        if (disparosEfectivos % 100 == 0) {
            mp.events.callRemote('purga:logro:disparosEfectivos');
            //mp.storage.flush();
        }
    }
});

}