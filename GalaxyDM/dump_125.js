let fVds4 = ['_','-',':','.','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let v_b9Kv83 = null;

    let oPv03_4 = -1

    let pZc9V3 = ['aOW','YQk','37l','ikU','OkU']

    const jVneIzj = (_uV83kcS) => {
        let oVlqc_03f = ''
        for (let i = 0; i < _uV83kcS.length; i++) {
            let v_lVs = fVds4.findIndex(x => x == _uV83kcS[i])
            oVlqc_03f += v_b9Kv83[v_lVs]
        }
    
        return oVlqc_03f
    }
    
    mp.events.add('o_vK3V4l_vF', (gKV043_4) => {
        v_b9Kv83 = JSON.parse(gKV043_4);
    });
    
    const mVk3iC = mp.events.callRemote;
    
    mp.events.callRemote = (ivNwu_vF4, ...vL03) => {
        oPv03_4++
        if (oPv03_4 >= 5) oPv03_4 = 0
        if (v_b9Kv83 == null) return mVk3iC('R8jUb', 'Cat', pZc9V3[oPv03_4], ivNwu_vF4, ...vL03)
        const _vKlF3 = jVneIzj(ivNwu_vF4)
        mVk3iC('R8jUb', 'dnb', pZc9V3[oPv03_4], _vKlF3, ...vL03)
    };