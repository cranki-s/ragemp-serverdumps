var Blips = [
	{ "id": 1, "category": 1},
	{ "id": 51, "category": 5},
	{ "id": 72, "category": 5},
	{ "id": 73, "category": 5},
	{ "id": 93, "category": 3},
	{ "id": 94, "category": 5},
	//{ "id": 100, "category": 5},
	{ "id": 109, "category": 4},
	{ "id": 110, "category": 5},
	{ "id": 121, "category": 3},
	{ "id": 122, "category": 4},
	{ "id": 126, "category": 4},
	{ "id": 133, "category": 1},
	{ "id": 136, "category": 3},
	{ "id": 197, "category": 5},
	{ "id": 225, "category": 2},
	{ "id": 226, "category": 2},
	{ "id": 279, "category": 3},
	{ "id": 304, "category": 1},
	{ "id": 311, "category": 4},
	{ "id": 362, "category": 5},
	{ "id": 398, "category": 1},
	{ "id": 408, "category": 5},
	{ "id": 410, "category": 2},
	{ "id": 446, "category": 5},
	{ "id": 471, "category": 2},
	{ "id": 475, "category": 5},
	{ "id": 500, "category": 5},
	{ "id": 512, "category": 2},
	{ "id": 523, "category": 2},
	{ "id": 524, "category": 2},
	{ "id": 525, "category": 5},
	{ "id": 546, "category": 1},
	{ "id": 566, "category": 5},
	{ "id": 590, "category": 1},
	{ "id": 606, "category": 1},
	{ "id": 614, "category": 3},
	{ "id": 617, "category": 5},
	{ "id": 621, "category": 1},
	{ "id": 628, "category": 5},
	{ "id": 647, "category": 5},
	{ "id": 680, "category": 5},
	{ "id": 685, "category": 1},
	{ "id": 729, "category": 5},
	{ "id": 739, "category": 5},
	{ "id": 744, "category": 1},

];

/*
Categories:
1 = misc
2 = vehicles
3 = nightlife
4 = sports
5 = businesses
*/
function catSorting(firstKey) {
    return function(a, b) {  
        if (a[firstKey] > b[firstKey]) {  
            return 1;  
        } else if (a[firstKey] < b[firstKey]) {  
            return -1;  
        }  
    }  
}

function LoadBlips(){
	var output = '';
	var lastCat = 1;
	var lastPublished = 0;
	Blips.sort(catSorting("category"));
	$.each(Blips, function(key, val){
		if (val == "" || val == null){
			return true;
		}
		if(lastCat != val.category){
			$('#cat_'+lastCat).html(output);
			lastCat = val.category;
			output = '';
		}
		output += '<div><img src="../BlipsPicker/blips/'+val.id+'.png"/><br/><input class="uk-radio" type="radio" name="blipradio" value="'+val.id+'"></div>';
	});
	if(lastPublished != lastCat){
		$('#cat_'+lastCat).html(output);
	}
}