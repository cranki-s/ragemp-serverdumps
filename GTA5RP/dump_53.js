{
const mp=global.mp,localPlayer=mp.players.local;var isWorkStart=!1;mp.events.add("client_jobs_skinDiver_start",function(){return isWorkStart?void resetObjects():void(isWorkStart=!0,localPlayer.setDiesInWater(!1),resetObjects())}),mp.events.add("client_jobs_skinDiver_end",function(){isWorkStart=!1,deleteAllObject(),localPlayer.setDiesInWater(!0)});const diverObjectList=new Set;class DiverObject{constructor(a,b,c){this.blip=mp.blips.new(456,c,{name:"???",scale:1.2}),this.object=mp.objects.new(mp.game.joaat(b),c,{rotation:new mp.Vector3(getRandomInt(0,180),getRandomInt(0,180),getRandomInt(0,180))}),this.colshape=new global.TriggerColshape(c,0,2,()=>{2<Math.abs(localPlayer.position.z-c.z)||(mp.events.callRemote(mp.clientEvCrypt("server_jobs_skinDiver_take"),a),this.destroy(),0==diverObjectList.size?global.rpc.triggerClient("clientFunc_notifySuccess","\u0412\u0441\u043F\u043B\u044B\u0432\u0430\u0439\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0441\u0434\u0430\u0442\u044C \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u044B"):global.rpc.triggerClient("clientFunc_notifySuccess","\u0412\u044B \u043F\u043E\u0434\u043E\u0431\u0440\u0430\u043B\u0438 \u043F\u0440\u0435\u0434\u043C\u0435\u0442"))},()=>{}),diverObjectList.add(this)}destroy(){this.blip.destroy(),this.object.destroy(),this.colshape.destroy(),diverObjectList.delete(this)}}function resetObjects(){deleteAllObject();const a=[new mp.Vector3(1717.65,-28.01,150.92),new mp.Vector3(1830.67,33.87,146.91),new mp.Vector3(1748.61,6.47,144.84),new mp.Vector3(1738.49,-36.25,152.09),new mp.Vector3(1787.02,56,146.46),new mp.Vector3(1802.82,-21.17,152.25),new mp.Vector3(1734,24.19,147.21),new mp.Vector3(1757.49,-39.5,153.45),new mp.Vector3(1839.12,13.61,151.39),new mp.Vector3(1780.39,-28.34,152.37),new mp.Vector3(1803.64,47.39,146.92),new mp.Vector3(1780.5,.12,144.14),new mp.Vector3(1759.85,-1.52,143.66),new mp.Vector3(1814.41,44.62,145.7),new mp.Vector3(1728.93,41.48,152.02),new mp.Vector3(1794.2,19.75,142.47),new mp.Vector3(1801.78,67.92,148.79),new mp.Vector3(1806.48,5.4,145.36),new mp.Vector3(1776.75,33.84,146.27),new mp.Vector3(1698.76,-19.46,146.61),new mp.Vector3(1700.45,4,144.79),new mp.Vector3(1843.11,-5.52,153.7),new mp.Vector3(1847.51,-26.68,154.93),new mp.Vector3(1870.64,-32.6,155.49),new mp.Vector3(1869.16,-5.92,154.58),new mp.Vector3(1861.17,4.26,152.59),new mp.Vector3(2023.7,101.62,152.91),new mp.Vector3(1850.6,22.14,149.59),new mp.Vector3(1874.61,102.48,150.9),new mp.Vector3(1890.13,76.21,144.64),new mp.Vector3(1885.55,102.73,150.2),new mp.Vector3(1908.02,166.77,155.58),new mp.Vector3(1855.02,52.8,146.95),new mp.Vector3(1863.15,86.06,146.66),new mp.Vector3(1917.13,104.87,148.87),new mp.Vector3(1936.06,125.66,148.14),new mp.Vector3(1919.81,176.85,153.96),new mp.Vector3(1875.47,71.85,146.27),new mp.Vector3(2009.48,105.52,152.36),new mp.Vector3(1985.56,127.69,146.95),new mp.Vector3(1958.96,152.77,149.11),new mp.Vector3(1945.47,144.8,147.9),new mp.Vector3(1889.09,127.89,151.54),new mp.Vector3(1976.45,141.66,146.21),new mp.Vector3(1914.11,121.53,148.26),new mp.Vector3(1943.73,169.93,152.48),new mp.Vector3(1931.65,144.46,151.86),new mp.Vector3(1882.26,105.34,148.66),new mp.Vector3(1908.26,105.02,147.26),new mp.Vector3(1868.53,73.25,146.4),new mp.Vector3(2030.16,101.41,153.9),new mp.Vector3(2017.97,121.52,151.63),new mp.Vector3(2007.19,146.51,154.66),new mp.Vector3(2013.64,180.53,154.49),new mp.Vector3(2008.47,211.07,153.36),new mp.Vector3(2017.56,232.42,153.75),new mp.Vector3(2014.46,251.66,154.7),new mp.Vector3(1996.18,266.73,152.26),new mp.Vector3(1964.46,284.46,149.87),new mp.Vector3(1964.04,301.72,149.76),new mp.Vector3(1949.74,263.57,147.56),new mp.Vector3(1957.66,255.5,148.46),new mp.Vector3(1921.09,235.92,152.61),new mp.Vector3(1900.2,206.41,154.53),new mp.Vector3(1935.09,197.87,149.81),new mp.Vector3(1961.62,195.52,147.76),new mp.Vector3(1903.84,229.75,153.58),new mp.Vector3(1981.41,221.57,149.26),new mp.Vector3(2004.02,218.44,152.11),new mp.Vector3(2005.63,188.01,153.36),new mp.Vector3(1985.71,185.28,147.04),new mp.Vector3(1974.72,198.71,148.6),new mp.Vector3(1951.12,210.83,149.98),new mp.Vector3(1939.97,223.64,150.68),new mp.Vector3(1909.12,240.68,154.87),new mp.Vector3(1912.8,232.1,151.65),new mp.Vector3(1909.04,212.98,151.76),new mp.Vector3(1938.27,186.76,150.75),new mp.Vector3(1955.2,183.64,148.37),new mp.Vector3(1968.29,183.48,146.78),new mp.Vector3(1988.79,183.19,148.32),new mp.Vector3(2001.34,185.5,151.81),new mp.Vector3(2013.06,176.79,154.57),new mp.Vector3(2014.27,121.12,151.28),new mp.Vector3(2021.41,103.83,151.02)],b=["imp_prop_axel_stand_01a","bkr_prop_coke_doll","bkr_prop_coke_powderbottle_01","bkr_prop_meth_openbag_02","ex_mp_h_acc_bowl_ceramic_01","ex_mp_h_acc_candles_01","ex_mp_h_acc_dec_sculpt_03","ex_prop_exec_award_plastic","hei_heist_acc_jar_01","p_mr_raspberry_01_s","prop_air_conelight","prop_air_lights_05a"];for(let c=0;5>c;c++){const c=getRandomInt(0,a.length);new DiverObject(c,b[getRandomInt(0,b.length)],a[c])}}function deleteAllObject(){diverObjectList.forEach(a=>a.destroy())}function getRandomInt(a,b){return Math.floor(Math.random()*(b-a))+a}
}