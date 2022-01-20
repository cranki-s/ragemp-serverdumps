{
  const localPlayer = mp.players.local,
    SEAT_DATA = [
      {
        objectHash: mp.game.joaat("v_corp_sidechair"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_ind_ss_chair01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.3, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_ind_ss_chair2"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_ilev_chair02_ped"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_ilev_hd_chair"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.7, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_ilev_leath_chr"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_res_m_armchair"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_res_mp_stripchair"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_DECKCHAIR",
            x: 0,
            y: -0.1,
            z: 0.4,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_res_tre_stool"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_CHAIR", x: 0, y: 0.2, z: 0.1, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_serv_bs_barbchair2"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.1,
            z: 0.8,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_serv_bs_barbchair3"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.1,
            z: 0.8,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_serv_bs_barbchair5"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.1,
            z: 0.8,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_serv_ct_chair02"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_off_chair_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_off_chair_03"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_off_chair_04"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_off_chair_04b"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_off_chair_04_s"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_off_chair_05"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.1,
            z: 0.45,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_corp_bk_chair3"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.05,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_corp_cd_chair"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.05,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_corp_offchair"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.05,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_cs_office_chair"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_rock_chair_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.1, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("p_yacht_chair_01_s"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_yacht_seat_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_yacht_seat_03"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.7,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("p_armchair_01_s"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.2,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("p_clb_officechair_s"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_CHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("p_dinechair_01_s"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_CHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("p_ilev_p_easychair_s"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_CHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("p_soloffchair_s"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: -0.1,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_chair_01a"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_chair_01b"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_chair_02"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_chair_03"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.05,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_chair_04a"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_chair_04b"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.05,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_chair_05"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.05,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_chair_06"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.05,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_chair_07"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.05,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_chair_08"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_chair_09"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_chair_10"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.05,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_chateau_chair_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_clown_chair"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0.25,
            y: 0.3,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_old_deck_chair"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0,
            z: -0.05,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_old_wood_chair"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.05,
            z: 0.1,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_table_01_chr_a"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0.05, z: 0, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_table_01_chr_b"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0.05, z: 0, h: -90 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_table_02_chr"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_table_03_chr"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.05,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_table_03b_chr"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_table_04_chr"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_table_05_chr"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_table_06_chr"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_club_barchair"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_club_cc_stool"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_club_ch_armchair"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_DECKCHAIR", x: 0, y: 0, z: 0.4, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_club_ch_briefchair"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_club_stagechair"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_club_vuarmchair"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_DECKCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_hobo_seat_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.3, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_rub_couch03"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.2,
            z: 0.45,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_skid_chair_01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.1,
            z: 0.1,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_skid_chair_02"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.05,
            z: 0.1,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_skid_chair_03"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.05,
            z: 0.1,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_bar_stool_01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_CHAIR_MP_PLAYER",
            x: 0,
            y: 0.1,
            z: 0.8,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_armchair_01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.05,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_din_chair_04"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_din_chair_08"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_din_chair_09"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.15,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_din_chair_12"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_din_stool_04"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0.1, z: 0.8, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_chairarm_01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_chairarm_02"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.5,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_chairarm_03"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.3,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_chairarm_09"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.3,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_chairarm_11"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.3,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_chairarm_12"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_chairarm_13"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.5,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_chairarm_23"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_DECKCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_chairarm_24"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_DECKCHAIR",
            x: 0,
            y: -0.4,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_chairarm_25"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_DECKCHAIR", x: 0, y: 0, z: 0.4, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_chairarm_26"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_DECKCHAIR",
            x: 0,
            y: -0.5,
            z: 0.4,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_yaught_chair_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("ba_prop_battle_club_chair_02"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: -0.1,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_sol_chair"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("ba_prop_battle_club_chair_03"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: -0.1, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_waiting_seat_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_ret_chair"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_ret_chair_white"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_res_m_l_chair1"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("cls_h4_int_04_desk_chair"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0,
            z: -0.05,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_chairstool_12"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_chairstrip_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_DECKCHAIR", x: 0, y: 0, z: 0.4, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_chairstrip_02"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_chairstrip_03"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_chairstrip_04"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_chairstrip_05"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_chairstrip_06"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_chairstrip_07"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_chairstrip_08"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_yacht_armchair_01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_yacht_armchair_03"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_yacht_armchair_04"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_yacht_barstool_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.8, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_yacht_stool_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.6, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_yacht_strip_chair_01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_DECKCHAIR",
            x: 0,
            y: -0.15,
            z: 0.4,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("bkr_prop_biker_barstool_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.8, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("bkr_prop_biker_barstool_02"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.8, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("bkr_prop_biker_barstool_03"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.2,
            z: 0.8,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("bkr_prop_biker_barstool_04"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.2,
            z: 0.8,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("bkr_prop_biker_boardchair01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: -0.1, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("bkr_prop_biker_chair_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("bkr_prop_biker_chairstrip_01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_DECKCHAIR",
            x: 0,
            y: -0.1,
            z: 0.4,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("bkr_prop_weed_chair_01a"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("bkr_prop_biker_chairstrip_02"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_DECKCHAIR", x: 0, y: 0, z: 0.4, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("bkr_prop_clubhouse_armchair_01a"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0.75,
            y: -0.2,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("bkr_prop_clubhouse_chair_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: -0.1, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("bkr_prop_clubhouse_offchair_01a"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: -0.1, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("xm_lab_chairarm_02"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.5,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("xm_lab_chairarm_03"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.3,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("xm_lab_chairarm_11"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.3,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("xm_lab_chairarm_12"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("xm_lab_chairarm_24"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.5,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("xm_lab_chairarm_25"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_DECKCHAIR", x: 0, y: 0, z: 0.4, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("xm_lab_chairarm_26"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_DECKCHAIR",
            x: 0,
            y: -0.6,
            z: 0.4,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("xm_mp_h_stn_chairarm_13"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.5,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_mp_h_din_chair_04"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_mp_h_din_chair_08"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_mp_h_din_chair_09"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.2,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_mp_h_din_chair_12"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.05,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_mp_h_din_stool_04"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.1,
            z: 0.8,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_mp_h_yacht_barstool_01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.1,
            z: 0.8,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_mp_h_off_chairstrip_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_mp_h_off_easychair_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_mp_h_stn_chairarm_03"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.3,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_mp_h_stn_chairarm_24"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.45,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_mp_h_stn_chairstrip_01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_DECKCHAIR",
            x: 0,
            y: -0.1,
            z: 0.4,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_mp_h_stn_chairstrip_010"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_mp_h_stn_chairstrip_011"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_mp_h_stn_chairstrip_05"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_mp_h_stn_chairstrip_07"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_prop_offchair_exec_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: -0.1, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_prop_offchair_exec_02"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: -0.1, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_prop_offchair_exec_03"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: -0.1, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_prop_offchair_exec_04"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: -0.1,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("gr_dlc_gr_yacht_props_seat_01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.7,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("gr_dlc_gr_yacht_props_seat_02"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.6,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("gr_prop_gr_offchair_01a"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: -0.1, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_prop_hei_skid_chair"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.1, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_prop_heist_off_chair"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_din_chair_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_din_chair_02"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_din_chair_03"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_din_chair_04"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_din_chair_05"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_din_chair_06"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_din_chair_08"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_din_chair_09"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_stn_chairarm_01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_stn_chairarm_03"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_stn_chairarm_04"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_stn_chairarm_06"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_stn_chairstrip_01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.05,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_prop_yah_seat_01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.7,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_prop_yah_seat_02"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.6,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("imp_prop_impexp_offchair_01a"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: -0.1, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("sm_prop_offchair_smug_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: -0.1, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("sm_prop_offchair_smug_02"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: -0.1,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("sum_mp_h_yacht_strip_chair_01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_DECKCHAIR",
            x: 0,
            y: -0.15,
            z: 0.4,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("h4_mp_h_yacht_strip_chair_01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.2,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office2b_stripchair1"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: -45 },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office2b_stripchair2"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: -135 },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office_03b_stripchair1"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office_03b_stripchair2"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office_03c_chairstrip_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office_03c_stripchair_02"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office_03c_recepchair_1"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office_03c_recepchair_2"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_ld_toilet_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.16, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_toilet_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_toilet_02"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("ap_m_bath_4"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.05, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("ap_m_bath_3"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: -0.1, z: 0.05, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("ap_m_bath_6"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.05, y: 0, z: 0.05, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_off01_taps02"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0.5,
            y: 0.5,
            z: 0,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office_01b_taps02"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0.5,
            y: 0.5,
            z: 0,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office_01c_taps02"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0.5,
            y: 0.5,
            z: 0,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office2c_sinks001"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0.85,
            y: 0.6,
            z: -0.65,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office_03a_toilet"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office_03b_toilet"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("cityhall_sudbench1"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1.65, y: 0, z: -0.05, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1, y: 0, z: -0.05, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.3, y: 0, z: -0.05, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.35, y: 0, z: -0.05, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -1.05, y: 0, z: -0.05, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -1.7, y: 0, z: -0.05, h: 0 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_ilev_ph_bench"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -1.25, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1.25, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_res_tt_sofa"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_CHAIR",
            x: -0.75,
            y: -0.1,
            z: -0.1,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_CHAIR",
            x: 0.75,
            y: -0.1,
            z: -0.1,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_yacht_seat_02"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_CHAIR",
            x: -0.35,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_CHAIR",
            x: 0.35,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_prop_yah_seat_03"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.35,
            y: -0.1,
            z: 0.55,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.35,
            y: -0.1,
            z: 0.55,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_bench_01a"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.75, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.75, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_bench_01b"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.75, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.75, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_bench_01c"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.75, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.75, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_bench_02"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.75, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.75, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_bench_03"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.4, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.4, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_bench_04"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.8,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: -0.1, z: 0.5, h: 180 },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.8,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_bench_05"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -1, y: 0, z: 0.4, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.4, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1, y: 0, z: 0.4, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_bench_06"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -1, y: 0, z: 0.45, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.45, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1, y: 0, z: 0.45, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_bench_08"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.8,
            y: 0.05,
            z: 0.45,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.8,
            y: 0.05,
            z: 0.45,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_bench_09"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.9, y: 0, z: 0.3, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.3, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.9, y: 0, z: 0.3, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_bench_10"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -1, y: -0.1, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: -0.1, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1, y: -0.1, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_bench_11"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -1, y: 0, z: 0.4, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.4, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1, y: 0, z: 0.4, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_table_08_chr"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.75,
            y: 0.05,
            z: 0.3,
            h: 180,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0.05, z: 0.3, h: 180 },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.75,
            y: 0.05,
            z: 0.3,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_rub_couch01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.6,
            y: 0.05,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.6,
            y: 0.05,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_busstop_02"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0.3, z: 0.5, h: 180 },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.75,
            y: 0.3,
            z: 0.5,
            h: 180,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1.5, y: 0.3, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_ind_meatbench"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.85, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.85, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_ind_rc_bench"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.85, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.85, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_res_fh_benchlong"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -1, y: 0.1, z: 0.3, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0.1, z: 0.3, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1, y: 0.1, z: 0.3, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_res_fh_benchshort"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.6, y: 0, z: 0.3, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.6, y: 0, z: 0.3, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_wait_bench_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -1, y: -0.1, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: -0.1, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1, y: -0.1, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_fib_3b_bench"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -1, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_ld_bench01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.8,
            y: 0.2,
            z: 0.5,
            h: 180,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0.2, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.8, y: 0.2, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_snow_bench_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -1, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_16_shitbench"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.6, y: 0, z: 0.3, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.6, y: 0, z: 0.3, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_air_bench_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1.2, y: 0.1, z: 0.5, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.4, y: 0.1, z: 0.5, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.4, y: 0.1, z: 0.5, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -1.2, y: 0.1, z: 0.5, h: 0 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_air_bench_02"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.8, y: 0, z: 0.5, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.5, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.8, y: 0, z: 0.5, h: 0 },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_stn_benchshort"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.6, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.6, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("dt1_03_benchirefm"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.6,
            y: -0.1,
            z: 0.15,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.6,
            y: -0.1,
            z: 0.15,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("bh1_15_bench_posh"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.6,
            y: -0.1,
            z: 0.15,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.6,
            y: -0.1,
            z: 0.15,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ch1_01_bench_for_chris"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.75,
            y: -0.1,
            z: -0.1,
            h: 190,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.75,
            y: 0.2,
            z: -0.1,
            h: 190,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_warel_officebench"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0.4, z: 0.5, h: -90 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: -0.4, z: 0.5, h: -90 },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_bench01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.9, y: -0.1, z: 0.2, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: -0.1, z: 0.2, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.9, y: -0.1, z: 0.2, h: 0 },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_bench02"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.9, y: -0.1, z: 0.2, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: -0.1, z: 0.2, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.9, y: -0.1, z: 0.2, h: 0 },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_bench03"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.7, y: -0.1, z: 0.2, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: -0.1, z: 0.2, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.7, y: -0.1, z: 0.2, h: 0 },
        ],
      },
      {
        objectHash: mp.game.joaat("h4_int_05_bench_2"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.4, y: 0, z: 0, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.4, y: 0, z: 0, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("h4_int_05_bench_3"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.4, y: 0, z: 0, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.4, y: 0, z: 0, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_yacht_seat_02"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.4, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.4, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_ilev_m_sofa"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.4,
            y: 0.4,
            z: 0.5,
            h: 180,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.5, y: 0.4, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1.5, y: 0.4, z: 0.5, h: 180 },
          {
            scenario: "PROP_HUMAN_SEAT_SUNLOUNGER",
            x: -1.6,
            y: 0.5,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_res_mp_sofa"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -1.4,
            y: -1.4,
            z: 0.5,
            h: -90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -1.4,
            y: -0.6,
            z: 0.5,
            h: -90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -1.4,
            y: 0.2,
            z: 0.5,
            h: -90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.6,
            y: 1.6,
            z: 0.5,
            h: 180,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.5, y: 1.6, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1.5, y: 1.6, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_16_low_lng_mesh_sofa1"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.2, y: 0.7, z: 0, h: 100 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: -0.7, z: 0, h: 100 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_16_study_sofa"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1.2, y: 0.4, z: 0, h: 90 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.3, y: -0.7, z: 0, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.8, y: -0.7, z: 0, h: 0 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_16_v_sofa"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -1.4,
            y: -1.5,
            z: -0.4,
            h: -90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -1.4,
            y: -0.5,
            z: -0.4,
            h: -90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -1.4,
            y: -0.5,
            z: -0.4,
            h: -90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -1.4,
            y: 0.5,
            z: -0.4,
            h: -90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.5,
            y: 1.6,
            z: -0.4,
            h: -180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.5,
            y: 1.6,
            z: -0.4,
            h: -180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 1.5,
            y: 1.6,
            z: -0.4,
            h: -180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_stn_sofa3seat_01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.7,
            y: -0.1,
            z: 0.5,
            h: -180,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: -0.1, z: 0.5, h: -180 },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.7,
            y: -0.1,
            z: 0.5,
            h: -180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_stn_sofacorn_05"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -1.5,
            y: 1.3,
            z: 0.5,
            h: -180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.5,
            y: 1.3,
            z: 0.5,
            h: -180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.5,
            y: 1.3,
            z: 0.5,
            h: -180,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1.3, y: 0, z: 0.5, h: 90 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1.3, y: -0.7, z: 0.5, h: 90 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1.3, y: -1.5, z: 0.5, h: 90 },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_sofa2seat_02"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.5,
            y: -0.6,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.5,
            y: -0.6,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_sofacorn_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.4, y: -2.5, z: 0.5, h: 90 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.4, y: -1.7, z: 0.5, h: 90 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.4, y: -0.9, z: 0.5, h: 90 },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.4,
            y: 0.4,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -1.2,
            y: 0.4,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_DECKCHAIR",
            x: -2.7,
            y: 0.25,
            z: 0.4,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_sofacorn_06"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_DECKCHAIR",
            x: -2.5,
            y: 0.5,
            z: 0.4,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_DECKCHAIR",
            x: -1.5,
            y: 0.5,
            z: 0.4,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.5,
            y: 0.4,
            z: 0.5,
            h: 180,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.4, y: -0.4, z: 0.5, h: 90 },
          {
            scenario: "PROP_HUMAN_SEAT_DECKCHAIR",
            x: 0.4,
            y: -1.4,
            z: 0.4,
            h: 90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_DECKCHAIR",
            x: 0.4,
            y: -2.4,
            z: 0.4,
            h: 90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_sofacorn_07"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.4, y: -2.4, z: 0.5, h: 90 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.4, y: -1.6, z: 0.5, h: 90 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.4, y: -0.7, z: 0.5, h: 90 },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.4,
            y: 0.4,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -1.4,
            y: 0.4,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -2.4,
            y: 0.4,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_sofacorn_08"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.4, y: -2.4, z: 0.5, h: 90 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.4, y: -1.6, z: 0.5, h: 90 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.4, y: -0.7, z: 0.5, h: 90 },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.4,
            y: 0.4,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -1.4,
            y: 0.4,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -2.4,
            y: 0.4,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_sofacorn_09"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.4, y: -2.4, z: 0.5, h: 90 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.4, y: -1.6, z: 0.5, h: 90 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.4, y: -0.7, z: 0.5, h: 90 },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.4,
            y: 0.4,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -1.4,
            y: 0.4,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -2.4,
            y: 0.4,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_sofacorn_10"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.4,
            y: -2.4,
            z: 0.55,
            h: 90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.4,
            y: -1.6,
            z: 0.55,
            h: 90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.4,
            y: -0.7,
            z: 0.55,
            h: 90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.4,
            y: 0.4,
            z: 0.55,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -1.4,
            y: 0.4,
            z: 0.55,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -2.4,
            y: 0.4,
            z: 0.55,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_yacht_sofa_01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -1.3,
            y: -0.2,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -0.45,
            y: -0.2,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0.6,
            y: -0.2,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 1.5,
            y: -0.2,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_yacht_sofa_02"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -0.6,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0.6,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("bkr_prop_clubhouse_sofa_01a"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -0.6,
            y: -0.2,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0.6,
            y: -0.2,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("gr_dlc_gr_yacht_props_seat_03"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.6,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_stn_sofa2seat_02"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -0.6,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0.6,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_stn_sofa2seat_03"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -0.6,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0.6,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_stn_sofacorn_06"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1.4, y: -1.2, z: 0.5, h: 90 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1.4, y: -0.2, z: 0.5, h: 90 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.5, y: 1.4, z: 0.5, h: 180 },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.4,
            y: 1.4,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -1.4,
            y: 1.4,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("p_lev_sofa_s"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.4,
            y: 0.4,
            z: 0.5,
            h: 180,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.5, y: 0.4, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1.5, y: 0.4, z: 0.5, h: 180 },
          {
            scenario: "PROP_HUMAN_SEAT_SUNLOUNGER",
            x: -1.6,
            y: 0.5,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("p_res_sofa_l_s"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.6,
            y: -0.2,
            z: 0.65,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.6,
            y: -0.2,
            z: 0.65,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("p_v_med_p_sofa_s"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.8,
            y: -0.05,
            z: 0.5,
            h: 180,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: -0.05, z: 0.5, h: 180 },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.8,
            y: -0.05,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_couch_01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.4,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.4,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_couch_03"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.15, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1.05, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1.95, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_couch_04"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 1.85,
            y: -0.15,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 1.05,
            y: -0.15,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.25,
            y: -0.15,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_couch_lg_02"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.1, y: 0.1, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.9, y: 0.1, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_couch_lg_05"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.5,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 1.5,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_couch_lg_06"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.8,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: -0.1, z: 0.5, h: 180 },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.8,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_couch_lg_07"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.2,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1, y: -0.1, z: 0.5, h: 180 },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 1.8,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_couch_lg_08"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.2,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1, y: -0.1, z: 0.5, h: 180 },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 1.8,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_couch_sm_06"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.4,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.4,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_rub_couch01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.5, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.5, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_rub_couch04"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.5, y: 0, z: 0.52, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.5, y: 0, z: 0.52, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_yaught_sofa_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.4, y: 0, z: 0, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.4, y: 0, z: 0, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_res_tre_sofa_s"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.5, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.5, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("xm_lab_sofa_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.8, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.8, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("xm_lab_sofa_02"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.8, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.8, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office_01a_sofa01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.85,
            z: 0.5,
            h: -90,
          },
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: -90 },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.85,
            z: 0.5,
            h: -90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office_01b_sofa02"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.85,
            z: 0.5,
            h: 90,
          },
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 90 },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.85,
            z: 0.5,
            h: 90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office_01c_sofa02"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.85,
            z: 0.5,
            h: 90,
          },
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 90 },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.85,
            z: 0.5,
            h: 90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office2a_sofa01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.85,
            z: 0.5,
            h: 90,
          },
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 90 },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.85,
            z: 0.5,
            h: 90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office2b_sofa01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -0.1,
            y: 0.85,
            z: 0.5,
            h: 90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -0.1,
            y: 0,
            z: 0.5,
            h: 90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -0.1,
            y: -0.85,
            z: 0.5,
            h: 90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office2c_sofa01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -0.1,
            y: 0.85,
            z: 0.5,
            h: 90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -0.1,
            y: 0,
            z: 0.5,
            h: 90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -0.1,
            y: -0.85,
            z: 0.5,
            h: 90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office01b_chairwhite002"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 1.2,
            y: -1.5,
            z: 0.1,
            h: 0,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -0.2,
            y: -1.5,
            z: 0.1,
            h: 0,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -1.2,
            y: -0.2,
            z: 0.1,
            h: -90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -1.2,
            y: 0.7,
            z: 0.1,
            h: -90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -1.2,
            y: 1.6,
            z: 0.1,
            h: -90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office_01c_chairwhite002"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 1.2,
            y: -1.5,
            z: 0.1,
            h: 0,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -0.2,
            y: -1.5,
            z: 0.1,
            h: 0,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -1.2,
            y: -0.2,
            z: 0.1,
            h: -90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -1.2,
            y: 0.7,
            z: 0.1,
            h: -90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -1.2,
            y: 1.6,
            z: 0.1,
            h: -90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office_02a_sofa2"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 1.4,
            y: -1.7,
            z: 0.1,
            h: 0,
          },
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: -1.7, z: 0.1, h: 0 },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -1.3,
            y: -0.2,
            z: 0.1,
            h: -90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -1.3,
            y: 0.7,
            z: 0.1,
            h: -90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -1.3,
            y: 1.6,
            z: 0.1,
            h: -90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office_02b_sofa2"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 1.4,
            y: -1.7,
            z: 0.1,
            h: 0,
          },
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: -1.7, z: 0.1, h: 0 },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -1.3,
            y: -0.2,
            z: 0.1,
            h: -90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -1.3,
            y: 0.7,
            z: 0.1,
            h: -90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -1.3,
            y: 1.6,
            z: 0.1,
            h: -90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office2c_sofa2"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 1.4,
            y: -1.7,
            z: 0.1,
            h: 0,
          },
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: -1.7, z: 0.1, h: 0 },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -1.3,
            y: -0.2,
            z: 0.1,
            h: -90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -1.3,
            y: 0.7,
            z: 0.1,
            h: -90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: -1.3,
            y: 1.6,
            z: 0.1,
            h: -90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office_01c_chairarm_white01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.6,
            z: 0.05,
            h: -90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: 0.6,
            z: 0.05,
            h: -90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office_03a_waitrmchairs"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 1.3,
            y: 0,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office_03b_waitrmchairs"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 1.3,
            y: 0,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_office_03c_waitrmchairs"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_ARMCHAIR", x: 0, y: 0, z: 0.5, h: 180 },
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 1.3,
            y: 0,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_sofa_daybed_01"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_SUNLOUNGER",
            x: 0,
            y: 0.25,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_stn_sofa_daybed_02"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_SUNLOUNGER",
            x: 0,
            y: 0.25,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("p_patio_lounger1_s"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_SUNLOUNGER",
            x: 0,
            y: -0.2,
            z: 0.4,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_yacht_lounger"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_SUNLOUNGER",
            x: 0,
            y: 0.3,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_patio_lounger1"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_SUNLOUNGER",
            x: 0,
            y: -0.2,
            z: 0.4,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_patio_lounger_2"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_SUNLOUNGER",
            x: 0,
            y: 0.2,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_patio_lounger_3"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_SUNLOUNGER",
            x: 0,
            y: 0.2,
            z: 0.4,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("gr_dlc_gr_yacht_props_lounger"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_SUNLOUNGER",
            x: 0,
            y: 0.3,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_prop_yah_lounger"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_SUNLOUNGER",
            x: 0,
            y: 0.3,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("bkr_prop_biker_campbed_01"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: 0,
            z: 2,
            h: -90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_res_msonbed_s"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: 0,
            z: 2,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("p_v_res_tt_bed_s"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: 0,
            z: 1.6,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("p_lestersbed_s"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: 0,
            z: 1,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("gr_prop_bunker_bed_01"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: 0,
            z: 2,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_yacht_bed_01"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.8,
            y: -1.5,
            z: 2,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: -1.5,
            z: 2,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.8,
            y: -1.5,
            z: 2,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_yacht_bed_02"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.8,
            y: -1.5,
            z: 2,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: -1.5,
            z: 2,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.8,
            y: -1.5,
            z: 2,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_bed_double_08"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.5,
            y: -1.5,
            z: 2,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.5,
            y: -1.5,
            z: 2,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_bed_double_09"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.5,
            y: -1.5,
            z: 2,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.5,
            y: -1.5,
            z: 2,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_bed_wide_05"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.8,
            y: -1.5,
            z: 2,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: -1.5,
            z: 2,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.8,
            y: -1.5,
            z: 2,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("apa_mp_h_bed_with_table_02"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.5,
            y: -1.5,
            z: 2,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.5,
            y: -1.5,
            z: 2,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_res_msonbed"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.5,
            y: 0,
            z: 2,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.5,
            y: 0,
            z: 2,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_res_mdbed"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.5,
            y: 0,
            z: 2,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.5,
            y: 0,
            z: 2,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_49_motelmp_bed"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: 0.6,
            z: 1.6,
            h: -90,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: -0.6,
            z: 1.6,
            h: -90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("p_mbbed_s"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.5,
            y: -0.2,
            z: 1.8,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.5,
            y: -0.2,
            z: 1.8,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_t_sofa"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_SUNLOUNGER",
            x: -0.5,
            y: 0.25,
            z: 0,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_SUNLOUNGER",
            x: 0.5,
            y: 0.25,
            z: 0,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_t_sofa_02"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_SUNLOUNGER",
            x: -0.5,
            y: 0.25,
            z: 0,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_SUNLOUNGER",
            x: 0.5,
            y: 0.25,
            z: 0,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_res_d_bed"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.5,
            y: -0.2,
            z: 0.7,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.5,
            y: -0.2,
            z: 0.7,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_res_lestersbed"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: -0.2,
            z: 1.7,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_res_mbbed"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.5,
            y: -0.2,
            z: 1.7,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.5,
            y: -0.2,
            z: 1.7,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_res_tre_bed1"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.5,
            y: -0.2,
            z: 1.7,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.5,
            y: -0.2,
            z: 1.7,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_res_tre_bed1_messy"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.5,
            y: -0.2,
            z: 1.7,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.5,
            y: -0.2,
            z: 1.7,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_res_tre_bed2"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.5,
            y: 0,
            z: 1.7,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.5,
            y: 0,
            z: 1.7,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_res_tt_bed"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: 0,
            z: 1.7,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_16_bdr_mesh_bed"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.3,
            y: 0.5,
            z: 0.8,
            h: -90,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.3,
            y: -0.5,
            z: 0.8,
            h: -90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_16_mid_bed_bed"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: -0.4,
            z: 1.05,
            h: 90,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: 0.4,
            z: 1.05,
            h: 90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_24_bdr_mesh_bed"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.2,
            y: -0.5,
            z: 0.85,
            h: 90,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.2,
            y: 0.5,
            z: 0.85,
            h: 90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_61_bd2_mesh_bed"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.5,
            y: 0,
            z: 0.7,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.5,
            y: 0,
            z: 0.7,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_8_bedrm4stuff"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.5,
            y: 0,
            z: 0.9,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.5,
            y: 0,
            z: 0.9,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_prop_exec_bed_01"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: 0,
            z: 1.7,
            h: -90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("gr_prop_gr_campbed_01"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: 0,
            z: 1.7,
            h: -90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_bed_double_08"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.6,
            y: -1.5,
            z: 1.4,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.6,
            y: -1.5,
            z: 1.4,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("imp_prop_impexp_campbed_01"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: 0,
            z: 1.7,
            h: -90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("imp_prop_impexp_sofabed_01a"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.2,
            y: 0,
            z: 1.2,
            h: 90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("sum_mp_h_yacht_bed_01"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.8,
            y: -1.5,
            z: 2,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: -1.5,
            z: 2,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.8,
            y: -1.5,
            z: 2,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("sum_mp_h_yacht_bed_02"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.8,
            y: -1.5,
            z: 2,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: -1.5,
            z: 2,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.8,
            y: -1.5,
            z: 2,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_int_heist_bdr_bed"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.1,
            y: 0.6,
            z: 0.85,
            h: -90,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.1,
            y: -0.6,
            z: 0.85,
            h: -90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_beds01"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: 0.1,
            z: 1.5,
            h: 90,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: 0.1,
            z: 0.75,
            h: 90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_beds02"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: 0.1,
            z: 1.5,
            h: 90,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: 0.1,
            z: 0.75,
            h: 90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_beds03"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: 0.1,
            z: 1.5,
            h: 90,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: 0.1,
            z: 0.75,
            h: 90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("h4_int_sub_bed"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: 0,
            z: 1.7,
            h: 90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("h4_mp_h_yacht_bed_01"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.8,
            y: -1.5,
            z: 1.7,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: -1.5,
            z: 1.7,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.8,
            y: -1.5,
            z: 1.7,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("h4_mp_h_yacht_bed_02"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: -0.8,
            y: -1.5,
            z: 1.7,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: -1.5,
            z: 1.7,
            h: 0,
          },
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0.8,
            y: -1.5,
            z: 1.7,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_wheelchair_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_wheelchair_01_s"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_direct_chair_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0.05, z: 0.2, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_direct_chair_02"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0.1, z: 0.2, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_gc_chair02"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0.05, z: 0, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_club_officechair"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_ilev_p_easychair"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: -0.05, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_ret_gc_chair03"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: -0.2, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_ld_farm_chair01"),
        seats: [{ scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0, h: 0 }],
      },
      {
        objectHash: mp.game.joaat("prop_torture_ch_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.1, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_ilev_fh_dineeamesa"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_ilev_tort_stool"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0.2, z: 0.1, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_ld_farm_couch01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.1, y: 0.8, z: 0, h: 90 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.1, y: 0, z: 0, h: 90 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.1, y: -0.8, z: 0, h: 90 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_ld_farm_couch02"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.1,
            y: -0.6,
            z: -0.02,
            h: -90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.1,
            y: 0.6,
            z: -0.02,
            h: -90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("p_yacht_sofa_01_s"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_tre_sofa_mess_a_s"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.4, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_tre_sofa_mess_b_s"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.5, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.5, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_tre_sofa_mess_c_s"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.5, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.5, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_med_bed1"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: 0,
            z: 1.3,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_med_bed2"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: 0,
            z: 1.3,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_med_emptybed"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: 0,
            z: 1.1,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_med_p_sofa"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.8,
            y: -0.05,
            z: 0.5,
            h: 180,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: -0.05, z: 0.5, h: 180 },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.8,
            y: -0.05,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_ilev_m_dinechair"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_busstop_04"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.6,
            y: 0.6,
            z: 0.5,
            h: 180,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0.6, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.6, y: 0.6, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_busstop_05"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0.4, z: 0.55, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1, y: 0.4, z: 0.55, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_bench_07"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: -0.2, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1, y: -0.2, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 2, y: -0.2, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_mp_h_off_sofa_01"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.8, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.5, h: 180 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.8, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_stn_sofa3seat_02"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.9,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: -0.1, z: 0.5, h: 180 },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.9,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_mp_h_off_sofa_02"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.9,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: -0.1, z: 0.5, h: 180 },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.9,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("ex_mp_h_off_sofa_003"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.9,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: -0.1, z: 0.5, h: 180 },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.9,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("hei_heist_stn_sofa3seat_06"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.9,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: -0.1, z: 0.5, h: 180 },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.9,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("cls_sheriff_seat_1a"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.4, y: -0.1, z: 0.5, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.4, y: -0.1, z: 0.5, h: 0 },
        ],
      },
      {
        objectHash: mp.game.joaat("cls_sheriff_seat_1b"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.4, y: -0.1, z: 0.5, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -0.4, y: -0.1, z: 0.5, h: 0 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_res_fa_chair02"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: 0.5, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("v_res_fh_sofa"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.2,
            y: -3.4,
            z: 0.5,
            h: -90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.2,
            y: -2.6,
            z: 0.5,
            h: -90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 0.2,
            y: -1.8,
            z: 0.5,
            h: -90,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.2, y: -1, z: 0.5, h: -90 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 1, y: -0.2, z: 0.5, h: 180 },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 1.8,
            y: -0.2,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 2.6,
            y: -0.2,
            z: 0.5,
            h: 180,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 3.4,
            y: -0.2,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("v_ret_ps_chair"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_ARMCHAIR",
            x: 0,
            y: -0.1,
            z: 0.5,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("dge_nag_marabunta_restroom_window"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -2,
            y: -0.2,
            z: -0.8,
            h: -90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -2,
            y: -1.2,
            z: -0.8,
            h: -90,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -3.4, y: -1, z: -0.8, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -4.2, y: -1, z: -0.8, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -4.9, y: -1, z: -0.8, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: -5.7, y: 0, z: -0.8, h: -90 },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -5.7,
            y: 0.8,
            z: -0.8,
            h: -90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 2.1,
            y: -0.2,
            z: -0.8,
            h: 90,
          },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 2.1,
            y: -1.2,
            z: -0.8,
            h: 90,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 3.4, y: -1, z: -0.8, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 4.2, y: -1, z: -0.8, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 4.9, y: -1, z: -0.8, h: 0 },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 5.8, y: 0, z: -0.8, h: -90 },
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: 5.8,
            y: 0.8,
            z: -0.8,
            h: -90,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("prop_patio_lounger1b"),
        seats: [
          {
            animDict: "amb@lo_res_idles@",
            animName: "lying_face_up_lo_res_base",
            x: 0,
            y: -0.3,
            z: 1.4,
            h: 0,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("h4_prop_h4_chair_01a"),
        seats: [
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0, y: 0, z: -0.03, h: 180 },
        ],
      },
      {
        objectHash: mp.game.joaat("h4_prop_h4_chair_02a"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.2,
            y: -0.18,
            z: 0.3,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("h4_prop_h4_chair_03a"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.2,
            y: -0.18,
            z: 0.15,
            h: 180,
          },
        ],
      },
      {
        objectHash: mp.game.joaat("h4_prop_h4_couch_01a"),
        seats: [
          {
            scenario: "PROP_HUMAN_SEAT_BENCH",
            x: -0.35,
            y: -0.1,
            z: 0,
            h: 180,
          },
          { scenario: "PROP_HUMAN_SEAT_BENCH", x: 0.35, y: -0.1, z: 0, h: 180 },
        ],
      },
    ];
  let isPlayerInScenario = !1,
    lastScenarioPos = new mp.Vector3(0, 0, 0),
    lastScenarioUsed = -1;
  global.binder.register({
    action: "MAP_OBJECT_USE",
    desc: "\u0421\u0435\u0441\u0442\u044C \\ \u0412\u0441\u0442\u0430\u0442\u044C",
    defaultKey: 69,
    defaultComb: { shift: !0 },
    func: async () => {
      const _ = Date.now();
      if (
        mp.gui.cursor.visible ||
        global.isChatOpen ||
        global.disableKeys ||
        global.isSmartphoneOpen ||
        global.disableAnimList ||
        localPlayer.vehicle ||
        2 < localPlayer.getSpeed() ||
        localPlayer.getIsTaskActive(167) ||
        lastScenarioUsed + 1e3 > _
      )
        return;
      const a = localPlayer.position,
        e = !mp.game.interior.areCoordsCollidingWithExterior(a.x, a.y, a.z);
      if (isPlayerInScenario)
        return (
          10 >
            mp.dist(
              a.x,
              a.y,
              a.z,
              lastScenarioPos.x,
              lastScenarioPos.y,
              lastScenarioPos.z
            ) && localPlayer.clearTasks(),
          (isPlayerInScenario = !1),
          void (lastScenarioUsed = _)
        );
      if (localPlayer.getVariable("cuffed")) return;
      const s = mp.game.object.getAllInRange(a, 15, !0, !0);
      if (!s || !Array.isArray(s) || 0 === s.length) return;
      let o = s[0],
        A = SEAT_DATA.find((_) => _.objectHash === o[0]);
      if (!A) {
        if (2 > s.length) return;
        if (
          ((o = s[1]), (A = SEAT_DATA.find((_) => _.objectHash === o[0])), !A)
        )
          return;
      }
      let t = null,
        c = null,
        H = 3;
      for (const _ of A.seats) {
        const e = mp.game.object.getObjectOffsetFromCoords(
            o[1].x,
            o[1].y,
            o[1].z,
            o[2].z,
            _.x,
            _.y,
            _.z
          ),
          s = mp.dist(a.x, a.y, a.z, e.x, e.y, e.z);
        s < H && ((H = s), (t = _), (c = e));
      }
      if (t && c) {
        const a = mp.players.streamed.filter((_) => _ !== localPlayer),
          s = a.map((_) => {
            const { x: a, y: e, z: s } = _.position;
            return { player: _, x: a, y: e, z: s };
          });
        for (const _ of s)
          if (
            0.5 > mp.dist(c.x, c.y, c.z, _.x, _.y, _.z) &&
            ((t.scenario && _.player.isUsingScenario(t.scenario)) ||
              (t.animDict && _.player.isPlayingAnim(t.animDict, t.animName, 3)))
          )
            return;
        if (t.scenario)
          localPlayer.taskStartScenarioAtPosition(
            t.scenario,
            c.x,
            c.y,
            c.z,
            o[2].z + t.h,
            0,
            !0,
            e
          );
        else if (t.animDict) {
          if (!mp.game.streaming.hasAnimDictLoaded(t.animDict)) {
            mp.game.streaming.requestAnimDict(t.animDict);
            do await mp.game.waitAsync(10);
            while (!mp.game.streaming.hasAnimDictLoaded(t.animDict));
          }
          localPlayer.setCoordsNoOffset(c.x, c.y, c.z, !0, !0, !0),
            localPlayer.setHeading(o[2].z + t.h),
            localPlayer.taskPlayAnimAdvanced(
              t.animDict,
              t.animName,
              c.x,
              c.y,
              c.z,
              0,
              0,
              o[2].z + t.h,
              8,
              -8,
              -1,
              513,
              0,
              0,
              0
            );
        }
        (isPlayerInScenario = !0),
          (lastScenarioPos = c),
          (lastScenarioUsed = _);
      }
    },
  });
}
