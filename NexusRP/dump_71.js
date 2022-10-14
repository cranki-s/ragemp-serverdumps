{
let electrical;
mp.events.add('Electric.StartGame', () => {
	globalThis.browser.open();
    globalThis.browser.execute(`App.$router.push(${JSON.stringify({ path: `/electrician` })})`);
	global.menuOpen();
});
mp.events.add('Electrician.GameResult', (status)=>{	
	global.menuClose();
	NewEvent.callRemote('Electric.EndGame', status);
	globalThis.browser.close();
});
mp.events.add('Electrician.GameResult.September', (time)=>{	
	global.menuClose();
	NewEvent.callRemote('September.StartElectricGame.Finish', time);
	globalThis.browser.close();
});

mp.events.add('Drawer.GameResult', (time)=>{	
	global.menuClose();
	NewEvent.callRemote('September.Paint.Finish', time);
	globalThis.browser.close();
});

mp.events.add('September.Paint.StartGame',()=>{
	globalThis.browser.open();
    globalThis.browser.execute(`App.$router.push(${JSON.stringify({ path: `/school` })})`);
	global.menuOpen();
});


mp.events.add('September.StartElectricGame',()=>{
	globalThis.browser.open();
    globalThis.browser.execute(`App.$router.push(${JSON.stringify({ path: `/electrician2` })})`);
});
global.loadAnim("stungun@standing");


mp.events.add('Electric.Sound', ()=>{	
	mp.gui.execute(`sound.sound='package://sound/shot.mp3'`);	
});

mp.events.add('Electric.Shot', (time)=>{
	try{
	mp.players.local.setToRagdoll(parseInt(time), parseInt(time), 0, true, true, true);
	}catch{}
});












let ElectricBlip = null;
let ElectricShape = null;
let ElectricMarker = null;

mp.events.add('ElectricUprage.NewPoint', (position)=>{
    mp.events.call('ElectricUprage.DeletePoint');
    ElectricBlip = mp.blips.new(0, position,
        {
            name: global.GetText("Заказ"),
            scale: 1,
            color: 49,
            alpha: 255,
            drawDistance: 100,
            shortRange: false,
            rotation: 0,
            dimension: 0,
        });

	mp.events.call('createWaypoint', position.x, position.y);

	ElectricShape = mp.colshapes.newSphere(position.x, position.y, position.z, 1); 
    ElectricShape.elecrticUpgrade = true; 

	ElectricMarker = mp.markers.new(44, position, 0.6,
        {
            visible: true,
            dimension: 0,
            color: [255, 255, 0, 180]
        });
});

/*let arr = [];

mp.events.add('ElectricUprage.TestDelete', (pos)=>{
	arr.forEach(function(item, index, object){
		if(item!=null){
			let vector1 = new mp.Vector3(pos.x, pos.y, pos.z);
			let vector2 = new mp.Vector3(item.location.x, item.location.y, item.location.z);
			if(vector1.subtract(vector2).length()<=10){
				object.splice(index, 1);
				if(item.obj!=null) item.obj.destroy();
				item.obj = null;
			}
		}
	});
})

mp.events.add('ElectricUprage.AddTest', (position)=>{
	arr.push(
		{
			location : position,
			obj: mp.markers.new(44, position, 0.6,
        {
            visible: true,
            dimension: 0,
            color: [255, 255, 0, 180]
        })
	 	} );
})*/

mp.events.add('ElectricUprage.DeletePoint', ()=>{
    if(ElectricMarker!=null){
        ElectricMarker.destroy();
        ElectricMarker = null;
    }
	if(ElectricShape!=null){
        ElectricShape.destroy();
        ElectricShape = null;
    }
	if(ElectricBlip!=null){
        ElectricBlip.destroy();
        ElectricBlip = null;
    }
});


mp.events.add('playerEnterColshape', (shape)=>{
    if(shape.elecrticUpgrade!=null){
		
		NewEvent.callRemote('ElectricUpgrade.Game');
		
    }
});
}id": 81,
              "name": "Танец Цыганочка",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_17_v1_female^2",
              "af": 1
            },
            {
              "id": 82,
              "name": "Танец Шейк",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_17_v2_female^2",
              "af": 1
            },
            {
              "id": 83,
              "name": "Танец Мачо №3",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_17_v2_male^4",
              "af": 1
            },
            {
              "id": 84,
              "name": "Развязный танец",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "li_dance_crowd_09_v2_female^3",
              "af": 1
            },
            {
              "id": 85,
              "name": "Танец Извивающийся",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "mi_dance_crowd_13_v2_female^1",
              "af": 1
            },
            {
              "id": 86,
              "name": "Милый танец",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "mi_dance_crowd_13_v2_female^5",
              "af": 1
            },
            {
              "id": 87,
              "name": "Уличный танец",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "mi_dance_crowd_10_v2_female^5",
              "af": 1
            },
            {
              "id": 88,
              "name": "Танец Кокетки №2",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "mi_dance_crowd_17_v2_female^1",
              "af": 1
            },
            {
              "id": 89,
              "name": "Танец Заигрывающий",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "mi_dance_crowd_17_v2_female^6",
              "af": 1
            },
            {
              "id": 90,
              "name": "Танец с оборотами №2",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@hi_intensity",
              "an": "hi_dance_crowd_09_v2_female^3",
              "af": 1
            },
            {
              "id": 91,
              "name": "Танец Удачи",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@hi_intensity",
              "an": "hi_dance_crowd_11_v1_female^1",
              "af": 1
            },
            {
              "id": 92,
              "name": "Бодрый танец",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@hi_intensity",
              "an": "hi_dance_crowd_17_v2_female^2",
              "af": 1
            },
            {
              "id": 93,
              "name": "Танец с вилянием бедрами",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj_transitions@",
              "an": "trans_dance_facedj_hi_to_mi_09_v1_female^1",
              "af": 1
            },
            {
              "id": 94,
              "name": "Танец кулачками легкий",
              "ad": "anim@amb@casino@mini@dance@dance_solo@female@var_a@",
              "an": "low_center",
              "af": 1
            },
            {
              "id": 95,
              "name": "Танцевать локтями",
              "ad": "anim@mp_player_intupperuncle_disco",
              "an": "idle_a",
              "af": 49
            },
            {
              "id": 96,
              "name": "Расслабленный танец",
              "ad": "anim@mp_player_intuppersalsa_roll",
              "an": "idle_a",
              "af": 49
            },
            {
              "id": 97,
              "name": "Танец качающий",
              "ad": "anim@mp_player_intupperraise_the_roof",
              "an": "idle_a",
              "af": 49
            },
            {
              "id": 98,
              "name": "Стучать пальцами о пальцы",
              "ad": "anim@mp_player_intupperoh_snap",
              "an": "idle_a",
              "af": 49
            },
            {
              "id": 99,
              "name": "Танец сумасшедшего",
              "ad": "anim@mp_player_intuppercats_cradle",
              "an": "idle_a",
              "af": 49
            },
            {
              "id": 100,
              "name": "Танец жизнерадостный",
              "ad": "anim@mp_player_intupperbanging_tunes",
              "an": "idle_a",
              "af": 49
            },
            {
              "id": 101,
              "name": "Танец активный",
              "ad": "anim@mp_player_intcelebrationmale@heart_pumping",
              "an": "heart_pumping",
              "af": 1
            },
            {
              "id": 102,
              "name": "Победный танец",
              "ad": "anim@mp_player_intcelebrationmale@the_woogie",
              "an": "the_woogie",
              "af": 1
            },
            {
              "id": 103,
              "name": "Танец волна",
              "ad": "anim@mp_player_intupperfind_the_fish",
              "an": "idle_a",
              "af": 49
            }
          ]
    },
    {
        id:5,
        name:'Физ.упражнения',
        img:'physical_exercise',
        special:false,
        animations:
        [{"id":0,"name":"Качать пресс","ad":"amb@world_human_sit_ups@male@base","an":"base","af":1},{"id":1,"name":"Отжиматься","ad":"amb@world_human_push_ups@male@base","an":"base","af":1},{"id":2,"name":"Глубокие отжимания","ad":"switch@franklin@press_ups","an":"pressups_loop","af":1},{"id":3,"name":"Сальто назад","ad":"anim@arena@celeb@flat@solo@no_props@","an":"flip_a_player_a","af":1},{"id":4,"name":"Разминать кулаки","ad":"anim@mp_player_intupperknuckle_crunch","an":"idle_a","af":1},{"id":5,"name":"Занимается йогой","ad":"amb@world_human_yoga@female@base","an":"base_b","af":1},{"id":6,"name":"Занимается йогой №2","ad":"amb@world_human_yoga@female@base","an":"base_c","af":1},{"id":7,"name":"Занимается йогой №3","ad":"missfam5_yoga","an":"f_yogapose_b","af":1},{"id":8,"name":"Элемент йоги №1","ad":"missfam5_yoga","an":"f_yogapose_b","af":1},{"id":9,"name":"Элемент йоги №2","ad":"missfam5_yoga","an":"a3_pose","af":1},{"id":10,"name":"Элемент йоги №3","ad":"missfam5_yoga","an":"a2_pose","af":1},{"id":11,"name":"Бег на месте","ad":"rcmfanatic1","an":"jogging_on_spot","af":1},{"id":12,"name":"Позировать","ad":"amb@world_human_muscle_flex@arms_in_front@base","an":"base","af":1},{"id":13,"name":"Сделать ласточку","ad":"rcmfanatic1maryann_stretchidle_b","an":"idle_e","af":1},{"id":14,"name":"Медитация","ad":"rcmcollect_paperleadinout@","an":"meditiate_idle","af":1},{"id":15,"name":"Пробежка на месте (Ж)","ad":"amb@world_human_jog_standing@female@idle_a","an":"idle_a","af":1},{"id":16,"name":"Пробежка на месте (М)","ad":"amb@world_human_jog_standing@male@fitidle_a","an":"idle_a","af":1},{"id":17,"name":"Карате","ad":"anim@mp_player_intcelebrationmale@karate_chops","an":"karate_chops","af":1},{"id":18,"name":"Бокс с тенью","ad":"anim@mp_player_intcelebrationmale@shadow_boxing","an":"shadow_boxing","af":1}]
    },
    {
        id:6,
        name:'Эмоции',
        img:'emotion',
        special:false,
        animations:
        [{"id":0,"name":"Соглашаться","ad":"gestures@m@sitting@generic@casual","an":"gesture_pleased","af":1},{"id":1,"name":"Отказываться","ad":"gestures@m@sitting@generic@casual","an":"gesture_head_no","af":1},{"id":2,"name":"Отказываться с жестами","ad":"gestures@m@sitting@generic@casual","an":"gesture_no_way","af":1},{"id":3,"name":"Отрицательно махать головой","ad":"mp_player_int_upper_nod","an":"mp_player_int_nod_no","af":49},{"id":4,"name":"Пожимать плечами","ad":"gestures@m@sitting@generic@casual","an":"gesture_shrug_hard","af":1},{"id":5,"name":"Схватиться за сердце","ad":"rcmfanatic1out_of_breath","an":"p_zero_tired_01","af":49},{"id":6,"name":"Итальянское одобрение","ad":"anim@mp_player_intcelebrationmale@finger_kiss","an":"finger_kiss","af":1},{"id":7,"name":"Плохо пахнет","ad":"anim@mp_player_intcelebrationmale@stinker","an":"stinker","af":1},{"id":8,"name":"Я слежу за вами","ad":"anim@mp_player_intupperv_sign","an":"idle_a","af":49},{"id":9,"name":"Выкуси","ad":"mp_player_int_upperv_sign","an":"mp_player_int_v_sign","af":1},{"id":10,"name":"Вот как это делается","ad":"mp_player_introck","an":"mp_player_int_rock","af":1},{"id":11,"name":"Хватит","ad":"anim@heists@ornate_bank@chat_manager","an":"fail","af":1},{"id":12,"name":"Расстроиться","ad":"friends@frl@ig_1","an":"idle_a_lamar","af":1},{"id":13,"name":"Взрыв мозга","ad":"anim@mp_player_intcelebrationmale@mind_blown","an":"mind_blown","af":1},{"id":14,"name":"Одобрительно покивать","ad":"mp_cp_welcome_tutgreet","an":"greet","af":1},{"id":15,"name":"Неодобрительно покивать","ad":"anim@arena@celeb@podium@no_prop@","an":"dance_b_3rd","af":1},{"id":16,"name":"Недоумевание","ad":"mpcas6_int-18","an":"mp_m_freemode_01^3_dual-18","af":1},{"id":17,"name":"Недовольно согласиться","ad":"missheistpaletoscoresetup","an":"trevor_arrival_2","af":1},{"id":18,"name":"Разводить руками","ad":"anim@mp_celebration@draw@male","an":"draw_react_male_a","af":1},{"id":19,"name":"Удивленно посмотреть вниз","ad":"hs3f_int1-0","an":"hc_driver_dual-0","af":1},{"id":20,"name":"Трясти руками удивленно","ad":"random@arrests","an":"thanks_male_05","af":1}]
    },
    {
        id:7,
        name:'Стили походки',
        img:'racks',
        special:true,
        animations:
        [
            {
                id: 0,
                name: 'Стандартная',
                style: ''
            },
            {
                id: 1,
                name: 'Уставшая',
                style: 'ANIM_GROUP_MOVE_LEMAR_ALLEY'
            },
            {
                id: 2,
                name: 'С кулаком',
                style: 'clipset@move@trash_fast_turn'
            },
            {
                id: 3,
                name: 'С предметом в руке',
                style: 'missfbi4prepp1_garbageman'
            },
            {
                id: 4,
                name: 'С бодуна',
                style: 'move_characters@franklin@fire'
            },
            {
                id: 5,
                name: 'Неспешная',
                style: 'move_characters@Jimmy@slow@'
            },
            {
                id: 6,
                name: 'Напряжная',
                style: 'move_characters@michael@fire'
            },
            {
                id: 7,
                name: 'Дамская №1',
                style: 'FEMALE_FAST_RUNNER'
            },
            {
                id: 8,
                name: 'Дамская №2',
                style: 'move_f@flee@a'
            },
            {
                id: 9,
                name: 'Нервная',
                style: 'move_f@scared'
            },
            {
                id: 10,
                name: 'Сексуальная',
                style: 'move_f@sexy@a'
            },
            {
                id: 11,
                name: 'Похрамывать',
                style: 'move_heist_lester'
            },
            {
                id: 12,
                name: 'Слегка похрамывать',
                style: 'move_injured_generic'
            },
            {
                id: 13,
                name: 'Похрамывать с тростью',
                style: 'move_lester_CaneUp'
            },
            {
                id: 14,
                name: 'Вальяжно',
                style: 'move_m@bag'
            },
            {
                id: 15,
                name: 'Нахальная',
                style: 'move_m@brave'
            },
            {
                id: 16,
                name: 'Нахальная (медленная)',
                style: 'move_m@casual@d'
            },
            {
                id: 17,
                name: 'Упоротый',
                style: 'MOVE_M@BAIL_BOND_NOT_TAZERED'
            },
            {
                id: 18,
                name: 'Сильно упоротый',
                style: 'MOVE_M@BAIL_BOND_TAZERED'
            },
            {
                id: 19,
                name: 'С просони',
                style: 'move_m@fire'
            },
            {
                id: 20,
                name: 'Гангстерская',
                style: 'move_m@gangster@var_e'
            },
            {
                id: 21,
                name: 'Сонная',
                style: 'move_m@gangster@var_f'
            },
            {
                id: 22,
                name: 'Бандитская',
                style: 'move_m@gangster@var_i'
            },
            {
                id: 23,
                name: 'Расслабленная',
                style: 'move_m@JOG@'
            },
            {
                id: 24,
                name: 'Деловая',
                style: 'MOVE_P_M_ONE'
            },
            {
                id: 25,
                name: 'Злая',
                style: 'move_p_m_zero_janitor'
            },
            {
                id: 26,
                name: 'Вальяжная (медленная)',
                style: 'move_p_m_zero_slow'
            },
            {
                id: 27,
                name: 'Стильная',
                style: 'MOVE_M@FEMME@'
            },
            {
                id: 28,
                name: 'Мафиозная',
                style: 'MOVE_M@GANGSTER@NG'
            },
            {
                id: 29,
                name: 'Шикарная',
                style: 'MOVE_M@POSH@'
            },
            {
                id: 30,
                name: 'Крутая',
                style: 'MOVE_M@TOUGH_GUY@'
            },
            {
              id: 31,
              name: 'Пьяная',
              style: 'move_m@drunk@verydrunk'
            }
        ]
    }
]
}