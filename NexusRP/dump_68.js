{

global.familypad = global.ConstrolsBrowser;;
mp.events.add('Constrols:FamilyOpenFractionPad', (members, count, pages, names, padtype) => {            
        familypad.execute(`window.locale='${global.Language}'`);
        familypad.execute(`openInterface('organization')`);
        familypad.execute(`controls.setData('${padtype}','${names}')`);
        global.OpenedType = padtype;
        global.menuOpen();
        familypad.execute(`controls.openMembers(${members},${Number(count)},${Number(pages)})`)
});

mp.events.add('Constrols:FamilyopenMemberEditor',(editableMember,shortRanks)=>{
    if (familypad != null) {
        if (global.OpenedType == "family") {
            familypad.execute(`controls.openMemberEditor(${editableMember},${shortRanks})`);
        }
    }
})

let showfracplayers = false;
mp.events.add('Controls:FamilySetNavigationTabCallBack',(route,a,b,c)=>{
    if(familypad != null)
    {
        if (global.OpenedType == "family") 
        {
            if (route === 'logs') {
                familypad.execute(`controls.openLogs(${a},${b},${c})`);
            }
            else if (route === 'ranks') {
                familypad.execute(`controls.openRanks(${a},${b})`);
            }
            else if (route === 'vehicles') {
                familypad.execute(`controls.openVehicles(${a})`);            
            } else if (route == 'actions') {
                let t = showfracplayers ? global.GetText("включено") : global.GetText("выключено");
                a = JSON.parse(a);
                a.find(x => x.id == "showMembers").value = t;
                a = JSON.stringify(a);
                familypad.execute(`controls.openActions(${a},${b})`);
            }
        }
    }
})
mp.events.add('Constrols:FamilyopenVehicleEditor',(editableVehicle,shortRanks)=>{
    if(familypad != null && global.OpenedType == "family"){
        familypad.execute(`controls.openVehicleEditor(${editableVehicle},${shortRanks})`);
    }
})
mp.events.add('Controls:FamilyUpdateVehicle',(vehicle,types)=>{
    if(familypad != null && global.OpenedType == "family"){
        familypad.execute(`controls.updateVehicle(${vehicle})`);        
        if(types){
            familypad.execute(`controls.route='vehicles'`);
        }
    }
})
mp.events.add('Controls:FamilyrankChangePermissionsCallBack',(rank)=>{
    if(familypad != null && global.OpenedType == "family"){
        familypad.execute(`controls.openRanksEdit(${rank})`);
    }
})



mp.events.add('Controls:FamilyEditRankNameCallback', (rankId) => {
    if (familypad != null && global.OpenedType == "family") {
        familypad.execute(`controls.openRankNameEditor(${rankId})`);
    }
})

mp.events.add('Controls:FamilysetRankNameCallBack', (rankId, rankname, date, time) => {
    if (familypad != null && global.OpenedType == "family") {
        familypad.execute(`controls.updateRankName(${rankId},'${rankname}','${date}','${time}')`);
    }
})



mp.events.add('Controls:FamilyDeleteRankCallBack',(rankId)=>{
    if(familypad != null && global.OpenedType == "family"){
        familypad.execute(`controls.deleteRank(${rankId})`);
    }    
})
mp.events.add('Controls:FamilyAddRankCallBack',(newRank)=>{
    if(familypad != null && global.OpenedType == "family"){
        familypad.execute(`controls.addRank(${newRank})`);
    }
})


mp.events.add('Controls:FamilyUpdateMember', (member, types) => {
    if (familypad != null && global.OpenedType == "family") {
        familypad.execute(`controls.updateMember(${member})`);
        if (types) {
            familypad.execute(`controls.route='members'`);
        }
    }
})

mp.events.add('Controls:FamilyDeleteMemberCallBack',(members,count)=>{
    if (familypad != null && global.OpenedType == "family") {
        familypad.execute(`controls.members = ${members}`);
        familypad.execute(`controls.membersCount = ${count}`);
    }
})
}"an":"respect","af":1},{"id":14,"name":"Хлопать в ладоши №1","ad":"anim@mp_player_intupperslow_clap","an":"idle_a","af":49},{"id":15,"name":"Хлопать в ладоши №2","ad":"amb@world_human_cheering@female_d","an":"base","af":49},{"id":16,"name":"Аплодировать","ad":"amb@world_human_cheering@male_a","an":"base","af":1},{"id":17,"name":"Отдать честь","ad":"mp_player_int_uppersalute","an":"mp_player_int_salute_enter","af":50},{"id":18,"name":"Отдать честь №2","ad":"mp_player_intsalute","an":"mp_player_int_salute","af":1},{"id":19,"name":"Объяснять что-то","ad":"misscarsteal4@actor","an":"actor_berating_loop","af":49},{"id":20,"name":"Грозить пальцем","ad":"anim@mp_player_intincarno_waybodhi@ps@","an":"idle_a_fp","af":49},{"id":21,"name":"Facepalm(Рукалицо)","ad":"anim@mp_player_intcelebrationfemale@face_palm","an":"face_palm","af":49},{"id":22,"name":"Держаться за грудь","ad":"amb@code_human_in_car_mp_actions@tit_squeeze@std@ps@base","an":"idle_a","af":49},{"id":23,"name":"Показать козу","ad":"amb@code_human_in_car_mp_actions@rock@bodhi@rps@base","an":"idle_a","af":49},{"id":24,"name":"Крутить пальцем возле головы","ad":"anim@mp_player_intincaryou_locobodhi@ds@","an":"idle_a_fp","af":1},{"id":25,"name":"Воздушный поцелуй","ad":"anim@mp_player_intselfieblow_kiss","an":"exit","af":49},{"id":26,"name":"Воздушный поцелуй №2","ad":"anim@mp_player_intcelebrationmale@blow_kiss","an":"blow_kiss","af":1},{"id":27,"name":"Воздушный поцелуй №3","ad":"anim@mp_player_intcelebrationfemale@finger_kiss","an":"finger_kiss","af":1},{"id":28,"name":"Держаться за сердце","ad":"misscarsteal4@director_grip","an":"end_loop_director","af":49},{"id":29,"name":"Показывать всем пис","ad":"anim@mp_player_intupperpeace","an":"idle_a","af":49},{"id":30,"name":"Показывать лайк","ad":"anim@mp_player_intupperthumbs_up","an":"idle_a_fp","af":49},{"id":31,"name":"Показывать головокружение","ad":"anim@mp_player_intupperyou_loco","an":"idle_a","af":49},{"id":32,"name":"Флиртовать у машины","ad":"random@street_race","an":"_car_a_flirt_girl","af":1},{"id":33,"name":"Плакать","ad":"random@robbery","an":"f_cower_01","af":49},{"id":34,"name":"Угрожать убить","ad":"anim@mp_player_intcelebrationmale@cut_throat","an":"cut_throat","af":1},{"id":35,"name":"Выстрел из пальца","ad":"anim@mp_player_intcelebrationmale@bang_bang","an":"bang_bang","af":1},{"id":36,"name":"На созвоне","ad":"anim@mp_player_intcelebrationmale@call_me","an":"call_me","af":1},{"id":37,"name":"Подеремся?","ad":"switch@franklin@gang_taunt_p3","an":"gang_taunt_with_lamar_loop_g2","af":1},{"id":38,"name":"Охрана останавливать","ad":"anim@amb@casino@peds@","an":"mini_strip_club_idles_bouncer_stop_stop","af":1},{"id":39,"name":"Хвастаться мускулами","ad":"amb@world_human_muscle_flex@arms_in_front@idle_a","an":"idle_b","af":1},{"id":40,"name":"Хвастаться мускулами №2","ad":"amb@world_human_muscle_flex@arms_in_front@idle_a","an":"idle_c","af":49},{"id":41,"name":"Заигрывающе поднять что-то","ad":"amb@world_human_prostitute@cokehead@idle_a","an":"idle_a","af":1},{"id":42,"name":"Стоять кокетливо","ad":"mini@strip_club@idles@stripper","an":"stripper_idle_01","af":1},{"id":43,"name":"Кокетливо махать","ad":"mini@strip_club@idles@stripper","an":"stripper_idle_02","af":1},{"id":44,"name":"Сохраняйте спокойствие","ad":"amb@code_human_police_crowd_control@idle_a","an":"idle_c","af":1},{"id":45,"name":"Проверять запах изо рта","ad":"mp_move@prostitute@m@cokehead","an":"idle","af":1},{"id":46,"name":"Испуганно трясти руками","ad":"anim@mp_player_intupperjazz_hands","an":"idle_a","af":49},{"id":47,"name":"Слабо махать рукой","ad":"anim@mp_player_intupperwave","an":"idle_a","af":49},{"id":48,"name":"Прикрывать лицо рукой","ad":"anim@mp_player_intupperface_palm","an":"enter_fp","af":49}]
    },
    {
        id:3,
        name:'Стойки',
        img:'racks',
        special:false,
        animations:
        [{"id":0,"name":"Стоять как охранник №1","ad":"amb@world_human_stand_guard@male@base","an":"base","af":1},{"id":1,"name":"Стоять как охранник №2","ad":"amb@world_human_stand_impatient@female@no_sign@base","an":"base","af":1},{"id":2,"name":"Стоять задумчиво","ad":"anim@amb@casino@hangout@ped_male@stand@02b@base","an":"base","af":1},{"id":3,"name":"Стойка с рукой на поясе","ad":"amb@world_human_prostitute@hooker@base","an":"base","af":1},{"id":4,"name":"Сложить руки","ad":"switch@franklin@lamar_tagging_wall","an":"lamar_tagging_wall_loop_franklin","af":49},{"id":5,"name":"Сложить руки №2","ad":"amb@world_human_hang_out_street@female_arms_crossed@base","an":"base","af":1},{"id":6,"name":"Стоять сложа руки №3","ad":"mp_corona@single_team","an":"single_team_intro_boss","af":1},{"id":7,"name":"Стоять сложа руки №4","ad":"mp_corona@single_team","an":"single_team_loop_boss","af":1},{"id":8,"name":"Стоять облоктившись","ad":"amb@world_human_leaning@male@wall@back@legs_crossed@base","an":"base","af":1},{"id":9,"name":"Стоять облокотившись №2","ad":"anim@amb@nightclub@gt_idle@","an":"base","af":1},{"id":10,"name":"Стоять облокотившись №3","ad":"amb@world_human_leaning@male@wall@back@foot_up@base","an":"base","af":1},{"id":11,"name":"Стоять облокотившись №4","ad":"mp_cp_welcome_tutleaning","an":"idle_a","af":1},{"id":12,"name":"Руки сложены сзади","ad":"anim@miss@low@fin@vagos@","an":"idle_ped06","af":49},{"id":13,"name":"Стойка Старка","ad":"missfam5_yoga","an":"c1_pose","af":49},{"id":14,"name":"Стоять как супергерой","ad":"rcmbarry","an":"base","af":1},{"id":15,"name":"Руки на поясе","ad":"timetable@amanda@ig_2","an":"ig_2_base_amanda","af":49},{"id":16,"name":"Стоять застенчиво","ad":"amb@world_human_hang_out_street@female_hold_arm@base","an":"base","af":1},{"id":17,"name":"Стоять застенчиво №2","ad":"amb@world_human_prostitute@cokehead@base","an":"base","af":1},{"id":18,"name":"Стоять пьяным","ad":"amb@world_human_prostitute@crackhooker@base","an":"base","af":1},{"id":19,"name":"Осматриваться по сторонам","ad":"amb@world_human_guard_patrol@male@base","an":"base","af":1},{"id":20,"name":"Стоять с ногой на возвышении","ad":"missfbi4leadinoutfbi_4_int","an":"agents_idle_b_andreas","af":1},{"id":21,"name":"Стоять устало","ad":"amb@world_human_hang_out_street@female_arm_side@base","an":"base","af":1},{"id":22,"name":"Стоять неуверенно","ad":"switch@michael@parkbench_smoke_ranger","an":"ranger_nervous_loop","af":1},{"id":23,"name":"Скрестить руки","ad":"oddjobs@assassinate@guard","an":"unarmed_fold_arms","af":1},{"id":24,"name":"Неодобрительно оглядываться","ad":"friends@frl@ig_1","an":"look_lamar","af":1},{"id":25,"name":"Оглядываться недоумевая","ad":"missarmenian1ig_13","an":"lamar_idle_01","af":1},{"id":26,"name":"Переминаться с ноги на ногу","ad":"mpcas6_int-18","an":"mp_m_freemode_01_dual-18","af":1},{"id":27,"name":"Стоять переминаясь","ad":"anim@amb@casino@hangout@ped_female@stand@01a@idles","an":"idle_d","af":1},{"id":28,"name":"Стоять держа себя за руку","ad":"anim@amb@casino@hangout@ped_female@stand@02a@base","an":"base","af":1},{"id":29,"name":"Стоять облокотившись к стене","ad":"amb@world_human_leaning@male@wall@back@foot_up@idle_a","an":"idle_a","af":1},{"id":30,"name":"Стоять перебирая руками","ad":"mpcas6_ext-14","an":"csb_agatha_dual-14","af":17},{"id":31,"name":"Задуматься оперевшись на что-то","ad":"anim@amb@business@bgen@bgen_no_work@","an":"stand_phone_phoneputdown_sleeping_nowork","af":1},{"id":32,"name":"Скучать облокотившись","ad":"anim@amb@business@bgen@bgen_no_work@","an":"stand_phone_phoneputdown_stretching-noworkfemale","af":1},{"id":33,"name":"Облокотившись скрестив руки","ad":"anim@amb@business@bgen@bgen_no_work@","an":"stand_phone_phoneputdown_idle_nowork","af":1},{"id":34,"name":"Смотреть по сторонам болтая руками","ad":"random@street_race","an":"_streetracer_start_loop","af":1},{"id":35,"name":"Облокотившись скрестив ноги","ad":"amb@world_human_leaning@female@wall@back@holding_elbow@base","an":"base","af":1},{"id":36,"name":"Оглядываться переминаясь","ad":"anim@arena@celeb@podium@no_prop@","an":"cocky_a_2nd","af":1},{"id":37,"name":"Ждать почесываясь","ad":"friends@frt@ig_1","an":"trevor_impatient_wait_4","af":1},{"id":38,"name":"Слушать переминаясь","ad":"missheistdockssetup1ig_2_p1@end_idle","an":"supervisor_exitdoor_endidle_supervisor","af":1},{"id":39,"name":"Стоять облокотившись вбок","ad":"missheistdockssetup1ig_10@idle_d","an":"talk_pipe_d_worker2","af":1},{"id":40,"name":"Стоять понуро","ad":"amb@world_human_bum_standing@depressed@base","an":"base","af":1},{"id":41,"name":"Качаться пьяным","ad":"amb@world_human_bum_standing@drunk@base","an":"base","af":1},{"id":42,"name":"Стоять засыпая","ad":"mini@hookers_spcrackhead","an":"idle_reject_loop_c","af":1},{"id":43,"name":"Стоять надменно","ad":"mp_move@prostitute@m@french","an":"idle","af":1}]
    },
    {
        id:4,
        name:'Танцы',
        img:'dancing',
        special:false,
        animations:
        [
            {
              "id": 0,
              "name": "Лезгинка",
              "ad": "special_ped@mountain_dancer@monologue_3@monologue_3a",
              "an": "mnt_dnc_buttwag",
              "af": 1
            },
            {
              "id": 1,
              "name": "Танец руками",
              "ad": "misschinese2_crystalmazemcs1_ig",
              "an": "dance_loop_tao",
              "af": 1
            },
            {
              "id": 2,
              "name": "Нереально флексить",
              "ad": "anim@amb@casino@mini@dance@dance_solo@female@var_a@",
              "an": "high_center",
              "af": 1
            },
            {
              "id": 3,
              "name": "Стриптиз №1",
              "ad": "mini@strip_club@private_dance@part2",
              "an": "priv_dance_p2",
              "af": 1
            },
            {
              "id": 4,
              "name": "Стриптиз №2",
              "ad": "mp_safehouse",
              "an": "lap_dance_girl",
              "af": 1
            },
            {
              "id": 5,
              "name": "Cтриптиз №3",
              "ad": "mini@strip_Club@private_dance@part3",
              "an": "priv_dance_p3",
              "af": 1
            },
            {
              "id": 6,
              "name": "Cтриптиз №4",
              "ad": "mini@strip_club@lap_dance_2g@ld_2g_p2",
              "an": "ld_2g_p2_s1",
              "af": 1
            },
            {
              "id": 7,
              "name": "Стриптиз №5",
              "ad": "mini@strip_club@lap_dance@ld_girl_a_song_a_p1",
              "an": "ld_girl_a_song_a_p1_f",
              "af": 1
            },
            {
              "id": 8,
              "name": "Лэпдэнс",
              "ad": "mini@strip_club@lap_dance@ld_girl_a_song_a_p2",
              "an": "ld_girl_a_song_a_p2_f",
              "af": 1
            },
            {
              "id": 9,
              "name": "Пьяный стриптиз",
              "ad": "amb@world_human_prostitute@crackhooker@idle_a",
              "an": "idle_c",
              "af": 1
            },
            {
              "id": 10,
              "name": "Эротический танец",
              "ad": "mini@strip_club@idles@stripper",
              "an": "stripper_idle_04",
              "af": 1
            },
            {
              "id": 11,
              "name": "Сексуально завлекать",
              "ad": "mini@strip_club@idles@stripper",
              "an": "stripper_idle_05",
              "af": 1
            },
            {
              "id": 12,
              "name": "Сексуально пританцовывать",
              "ad": "mini@strip_club@idles@stripper",
              "an": "stripper_idle_06",
              "af": 1
            },
            {
              "id": 13,
              "name": "Завлекающий танец",
              "ad": "mini@strip_club@lap_dance_2g@ld_2g_p2",
              "an": "ld_2g_p2_s2",
              "af": 1
            },
            {
              "id": 14,
              "name": "Двигать тазом",
              "ad": "mini@strip_club@private_dance@idle",
              "an": "priv_dance_idle",
              "af": 1
            },
            {
              "id": 15,
              "name": "Слушать музыку",
              "ad": "amb@world_human_strip_watch_stand@male_a@base",
              "an": "base",
              "af": 1
            },
            {
              "id": 16,
              "name": "Скромный танец",
              "ad": "amb@world_human_strip_watch_stand@male_a@idle_a",
              "an": "idle_c",
              "af": 1
            },
            {
              "id": 17,
              "name": "Кивать под музыку",
              "ad": "amb@world_human_strip_watch_stand@male_b@base",
              "an": "base",
              "af": 1
            },
            {
              "id": 18,
              "name": "Пританцовывать под музыку",
              "ad": "amb@world_human_strip_watch_stand@male_c@base",
              "an": "base",
              "af": 1
            },
            {
              "id": 19,
              "name": "Танец с похлопованием попки",
              "ad": "anim@amb@nightclub@lazlow@hi_podium@",
              "an": "danceidle_hi_11_buttwiggle_f_laz",
              "af": 1
            },
            {
              "id": 20,
              "name": "Танец с оборотами",
              "ad": "anim@amb@nightclub@lazlow@hi_podium@",
              "an": "danceidle_hi_11_turnaround_laz",
              "af": 1
            },
            {
              "id": 21,
              "name": "Танец робота",
              "ad": "anim@amb@nightclub@lazlow@hi_podium@",
              "an": "danceidle_hi_15_crazyrobot_laz",
              "af": 1
            },
            {
              "id": 22,
              "name": "Танец робота №2",
              "ad": "anim@amb@nightclub@lazlow@hi_podium@",
              "an": "danceidle_mi_15_robot_laz",
              "af": 1
            },
            {
              "id": 23,
              "name": "Танцевать как паучок",
              "ad": "anim@amb@nightclub@lazlow@hi_podium@",
              "an": "danceidle_hi_17_spiderman_laz",
              "af": 1
            },
            {
              "id": 24,
              "name": "Произвольный танец",
              "ad": "anim@amb@nightclub@lazlow@hi_podium@",
              "an": "danceidle_hi_17_smackthat_laz",
              "af": 1
            },
            {
              "id": 25,
              "name": "Легкий танец",
              "ad": "anim@amb@nightclub@lazlow@hi_podium@",
              "an": "danceidle_li_17_ethereal_laz",
              "af": 1
            },
            {
              "id": 26,
              "name": "Танец мачо",
              "ad": "anim@amb@nightclub@lazlow@hi_podium@",
              "an": "danceidle_mi_17_crotchgrab_laz",
              "af": 1
            },
            {
              "id": 27,
              "name": "Танец мачо №2",
              "ad": "anim@amb@nightclub@lazlow@hi_railing@",
              "an": "ambclub_10_mi_hi_crotchhold_laz",
              "af": 1
            },
            {
              "id": 28,
              "name": "Танец пингвина",
              "ad": "move_clown@p_m_two_idles@",
              "an": "fidget_short_dance",
              "af": 1
            },
            {
              "id": 29,
              "name": "Танец Диджея",
              "ad": "mini@strip_club@idles@dj@idle_04",
              "an": "idle_04",
              "af": 1
            },
            {
              "id": 30,
              "name": "Танец Диджея №2",
              "ad": "anim@mp_player_intcelebrationmale@dj",
              "an": "dj",
              "af": 1
            },
            {
              "id": 31,
              "name": "Танцевать как курочка",
              "ad": "anim@mp_player_intupperchicken_taunt",
              "an": "idle_a",
              "af": 49
            },
            {
              "id": 32,
              "name": "Флексить как репер",
              "ad": "missfbi3_sniping",
              "an": "dance_m_default",
              "af": 1
            },
            {
              "id": 33,
              "name": "Аккуратный танец",
              "ad": "anim@amb@casino@mini@dance@dance_solo@female@var_a@",
              "an": "low_center_up",
              "af": 1
            },
            {
              "id": 34,
              "name": "Современный танец",
              "ad": "anim@amb@casino@mini@dance@dance_solo@female@var_b@",
              "an": "high_center",
              "af": 1
            },
            {
              "id": 35,
              "name": "Танец забвения",
              "ad": "anim@amb@casino@mini@dance@dance_solo@female@var_b@",
              "an": "med_center_down",
              "af": 1
            },
            {
              "id": 36,
              "name": "Танец на месте",
              "ad": "anim@amb@nightclub@dancers@black_madonna_entourage@",
              "an": "hi_dance_facedj_09_v2_male^5",
              "af": 1
            },
            {
              "id": 37,
              "name": "Танец на месте №2",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj@",
              "an": "hi_dance_facedj_09_v1_female^6",
              "af": 1
            },
            {
              "id": 38,
              "name": "Танец на месте №3",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj@",
              "an": "hi_dance_facedj_09_v1_male^2",
              "af": 1
            },
            {
              "id": 39,
              "name": "Танец зумбы",
              "ad": "timetable@tracy@ig_5@idle_a",
              "an": "idle_a",
              "af": 1
            },
            {
              "id": 40,
              "name": "Танец зумбы №2",
              "ad": "timetable@tracy@ig_5@idle_a",
              "an": "idle_b",
              "af": 1
            },
            {
              "id": 41,
              "name": "Танец зумбы №3",
              "ad": "timetable@tracy@ig_5@idle_a",
              "an": "idle_c",
              "af": 1
            },
            {
              "id": 42,
              "name": "Клубный танец",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj@",
              "an": "hi_dance_facedj_15_v2_male^6",
              "af": 1
            },
            {
              "id": 43,
              "name": "Клубный танец №2",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj@",
              "an": "hi_dance_facedj_17_v2_male^6",
              "af": 1
            },
            {
              "id": 44,
              "name": "Клубный танец №3",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj@",
              "an": "mi_dance_facedj_15_v2_female^6",
              "af": 1
            },
            {
              "id": 45,
              "name": "Клубный танец №4",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj@hi_intensity",
              "an": "hi_dance_facedj_09_v1_male^1",
              "af": 1
            },
            {
              "id": 46,
              "name": "Клубный танец №5",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj@hi_intensity",
              "an": "hi_dance_facedj_15_v1_female^6",
              "af": 1
            },
            {
              "id": 47,
              "name": "Клубный танец №6",
              "ad": "anim@amb@nightclub@mini@dance@dance_solo@female@var_a@",
              "an": "high_center_down",
              "af": 1
            },
            {
              "id": 48,
              "name": "Клубный танец №7",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj_transitions@",
              "an": "trans_dance_facedj_mi_to_hi_08_v1_male^1",
              "af": 1
            },
            {
              "id": 49,
              "name": "Клубный танец №8",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_17_v1_female^6",
              "af": 1
            },
            {
              "id": 50,
              "name": "Танец лепестка",
              "ad": "anim@amb@casino@mini@dance@dance_solo@female@var_a@",
              "an": "med_center_up",
              "af": 1
            },
            {
              "id": 51,
              "name": "Танец пожилого человека",
              "ad": "anim@amb@casino@mini@dance@dance_solo@female@var_b@",
              "an": "high_right_down",
              "af": 1
            },
            {
              "id": 52,
              "name": "Танец заводной",
              "ad": "anim@amb@nightclub@lazlow@hi_podium@",
              "an": "danceidle_hi_13_flyingv_laz",
              "af": 1
            },
            {
              "id": 53,
              "name": "Танец диско",
              "ad": "anim@amb@nightclub@lazlow@hi_podium@",
              "an": "danceidle_mi_11_pointthrust_laz",
              "af": 1
            },
            {
              "id": 54,
              "name": "Танец бедрами",
              "ad": "anim@amb@nightclub@lazlow@hi_podium@",
              "an": "danceidle_mi_15_shimmy_laz",
              "af": 1
            },
            {
              "id": 55,
              "name": "Танец индийский",
              "ad": "anim@amb@nightclub@lazlow@hi_podium@",
              "an": "danceidle_mi_17_teapotthrust_laz",
              "af": 1
            },
            {
              "id": 56,
              "name": "Танец счастливый",
              "ad": "anim@amb@nightclub@mini@dance@dance_solo@female@var_a@",
              "an": "med_center_up",
              "af": 1
            },
            {
              "id": 57,
              "name": "Танец шафл руками",
              "ad": "anim@amb@nightclub@mini@dance@dance_solo@male@var_b@",
              "an": "high_center_down",
              "af": 1
            },
            {
              "id": 58,
              "name": "Танец Skibidi",
              "ad": "anim@amb@nightclub@mini@dance@dance_solo@male@var_b@",
              "an": "high_center",
              "af": 49
            },
            {
              "id": 59,
              "name": "Танец c хлопаками",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj_transitions@",
              "an": "trans_dance_facedj_li_to_mi_11_v1_male^4",
              "af": 1
            },
            {
              "id": 60,
              "name": "Танец улётный",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj@",
              "an": "hi_dance_facedj_15_v2_male^2",
              "af": 1
            },
            {
              "id": 61,
              "name": "Танец чилловый",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj@",
              "an": "hi_dance_facedj_17_v1_male^3",
              "af": 1
            },
            {
              "id": 62,
              "name": "Танец лейла",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj@",
              "an": "hi_dance_facedj_17_v2_female^3",
              "af": 1
            },
            {
              "id": 63,
              "name": "Танец Dj",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj@hi_intensity",
              "an": "hi_dance_facedj_17_v2_male^2",
              "af": 1
            },
            {
              "id": 64,
              "name": "Танец Электро",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj_transitions@",
              "an": "trans_dance_facedj_hi_to_mi_09_v1_male^4",
              "af": 1
            },
            {
              "id": 65,
              "name": "Танец Загадочный",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj_transitions@",
              "an": "trans_dance_facedj_li_to_mi_11_v1_female^3",
              "af": 1
            },
            {
              "id": 66,
              "name": "Танец Игривый",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj_transitions@",
              "an": "trans_dance_facedj_mi_to_hi_09_v1_female^3",
              "af": 1
            },
            {
              "id": 67,
              "name": "Танец Игривый №2",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj_transitions@from_hi_intensity",
              "an": "trans_dance_facedj_hi_to_li_09_v1_female^3",
              "af": 1
            },
            {
              "id": 68,
              "name": "Танец Руки Вверх",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj_transitions@from_low_intensity",
              "an": "trans_dance_facedj_li_to_hi_09_v1_female^2",
              "af": 1
            },
            {
              "id": 69,
              "name": "Танец Руки Вверх №2",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj_transitions@from_med_intensity",
              "an": "trans_dance_facedj_mi_to_hi_08_v1_female^3",
              "af": 1
            },
            {
              "id": 70,
              "name": "Танец Лапули",
              "ad": "anim@amb@nightclub@dancers@crowddance_facedj_transitions@",
              "an": "trans_dance_facedj_mi_to_li_09_v1_female^3",
              "af": 1
            },
            {
              "id": 71,
              "name": "Танец Зазывающий",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_09_v1_female^3",
              "af": 1
            },
            {
              "id": 72,
              "name": "Танец Манящий",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_09_v2_female^1",
              "af": 1
            },
            {
              "id": 73,
              "name": "Танец Раскрепощенный",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_09_v2_female^3",
              "af": 1
            },
            {
              "id": 74,
              "name": "Танец Зайки",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_09_v2_female^5",
              "af": 1
            },
            {
              "id": 75,
              "name": "Танец Вальяжный ",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_11_v1_female^3",
              "af": 1
            },
            {
              "id": 76,
              "name": "Танец Игривый",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_11_v1_female^1",
              "af": 1
            },
            {
              "id": 77,
              "name": "Танец с наклоном",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_11_v1_male^4",
              "af": 1
            },
            {
              "id": 78,
              "name": "Танец Кокетки",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_13_v2_female^1",
              "af": 1
            },
            {
              "id": 79,
              "name": "Танец Динамичный",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_15_v2_female^1",
              "af": 1
            },
            {
              "id": 80,
              "name": "Танец Лапули №2",
              "ad": "anim@amb@nightclub@dancers@crowddance_groups@",
              "an": "hi_dance_crowd_15_v2_female^3",
              "af": 1
            },
            {
              "id": 81,
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