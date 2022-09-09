{
let drawingHeader = "~h~~r~Empleados de la semana~h~~n~~u~hasta el sábado 23:59";
let drawingColor = [0, 0, 0, 255];
let drawingSize = [0.3, 0.3];
let drawingPos = [0.03, 0.2];
let nameSpace = 0.07;

let names = ["~h~Nombre", "Ryan Spell", "Poquetes Fukariotes","Ryan Spell", "Poquetes Fukariotes",
"Ryan Spell", "Poquetes Fukariotes","Ryan Spell", "Poquetes Fukariotes",
"Ryan Spell", "Poquetes Fukariotes"]
let points = ["~h~Puntos", "94", "75", "70", "55", "40", "33", "20", "12", "9", "5"];
let prizes = ["~h~Premio", "$25,000", "$20,000", "$17,000", "$15,000", "$10,000", "$7,000", "$5,000", "$3,000",
"$2,000", "$1,000"];

let boardsToShow = [];
let boardsQueue = [];

mp.rpc("board:update", (id, boardConfig) => {
    boardConfig = JSON.parse(boardConfig);

    let boardExists = boardsToShow.filter(it => it.id === id)
    if (!boardExists.length) {
        let newBoard = {
            id: id,
            name: boardConfig.name,
            model: boardConfig.model,
            handle: CreateRenderTarget(boardConfig.name, boardConfig.model),
            header: boardConfig.header,
            columns: boardConfig.columns,
        };
        boardsToShow.push(newBoard);
    } else {
        mp.events.call("board:hide", id);
        mp.events.call("board:update", id, JSON.stringify(boardConfig));
    }
});

mp.rpc("board:hide", (id) => {
    let boardToHide = boardsToShow.filter(board => board.id === id);
    if (boardToHide.length) {
        boardToHide = boardToHide[0];
        boardsToShow.splice(boardsToShow.indexOf(boardToHide), 1);
    }
});

function CreateRenderTarget(name, model) {
	if(!mp.game.ui.isNamedRendertargetRegistered(name))
		mp.game.ui.registerNamedRendertarget(name, false); //Register render target
	if(!mp.game.ui.isNamedRendertargetLinked(model))
		mp.game.ui.linkNamedRendertarget(model); //Link it to all models
	if(mp.game.ui.isNamedRendertargetRegistered(name))
		return mp.game.ui.getNamedRendertargetRenderId(name); //Get the handle
	return -1;
}

function drawHeader(header) {
    mp.game.ui.setTextEntry("STRING");
    mp.game.ui.addTextComponentSubstringPlayerName(header.headerText);
    mp.game.ui.setTextFont(header.headerFontType);
    mp.game.ui.setTextScale(header.headerFontSize, header.headerFontSize);
    mp.game.ui.setTextColour(drawingColor[0], drawingColor[1], drawingColor[2], drawingColor[3]);
    mp.game.ui.drawText(0.02, 0.02);
}

function drawColumns(columns) {
    let coordX = 0.05;
    let res = mp.game.graphics.getScreenActiveResolution(0, 0);
    for (let column of columns) {
        if (column.columnText && column.columnText.length) {
            for (let columnTextIdx in column.columnText) {
                let columnText = column.columnText[columnTextIdx];
                if (typeof columnText === "string" && columnText.length) {
                    drawingSize = [column.columnFontSize/res.y*720, column.columnFontSize/res.y*720];
                    mp.game.ui.setTextEntry("STRING");
                    mp.game.ui.addTextComponentSubstringPlayerName(columnText);
                    mp.game.ui.setTextFont(column.columnFontType);
                    mp.game.ui.setTextScale(drawingSize[0], drawingSize[1]);
                    mp.game.ui.setTextColour(drawingColor[0], drawingColor[1], drawingColor[2], drawingColor[3]);
                    mp.game.ui.drawText(coordX, drawingPos[1] + (nameSpace*columnTextIdx));
                }
            }
        }
        coordX += 0.15;
    }
}

function renderBoard(board) {
    if (board && board.handle) {
        mp.game.ui.setTextRenderId(board.handle);
        mp.game.graphics.set2dLayer(4);
        mp.game.graphics.drawRect(0.5, 0.5, 1, 1, 207, 216, 220, 255);

        drawHeader(board.header);
        drawColumns(board.columns);
        mp.game.ui.setTextRenderId(1);
    }
}

mp.events.add("render", () => {
    for (let board of boardsToShow) {
        renderBoard(board);
    }
});
}