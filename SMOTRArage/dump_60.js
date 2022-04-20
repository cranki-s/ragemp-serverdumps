{
class CameraRotator {
	start(camera, basePosition, lookAtPosition, offsetVector, heading, fov = undefined) {
		this.camera = camera;
		this.basePosition = basePosition;
		this.lookAtPosition = lookAtPosition;
		this.offsetVector = offsetVector;
		this.heading = heading;
		this.baseHeading = heading;
		this.currentPoint = { x: 0, y: 0 };
		this.isPause = false;
		this.zUp = 0;
		this.zUpMultipler = 1;
		this.xBound = [ 0, 0 ];
		this.zBound = [ -0.01, 0.8 ];

		this.changePosition(); 
		camera.pointAtCoord(lookAtPosition.x, lookAtPosition.y, lookAtPosition.z); 
		if (fov) { camera.setFov(fov); } 
		this.activate(true);
	}
	onMouseMove(dX, dY) {
		this.heading = this.normilizeHeading(this.heading + dX * 100);
		let relativeHeading = this.getRelativeHeading();
		if (relativeHeading > this.xBound[0] && relativeHeading < this.xBound[1]) { relativeHeading = Math.abs(this.xBound[0] - relativeHeading) > Math.abs(this.xBound[1] - relativeHeading) ? this.xBound[1] : this.xBound[0]; }
		this.heading = this.normilizeHeading(-relativeHeading + this.baseHeading);
		this.zUp += dY * this.zUpMultipler * -1;
		if (this.zUp > this.zBound[1]) this.zUp = this.zBound[1];
		else if (this.zUp < this.zBound[0])  this.zUp = this.zBound[0]; 
		this.changePosition();
	}
	changePosition() {
		const position = mp.game.object.getObjectOffsetFromCoords(this.basePosition.x, this.basePosition.y, this.basePosition.z + this.zUp, this.heading, this.offsetVector.x, this.offsetVector.y, this.offsetVector.z);
		this.camera.setCoord(position.x, position.y, position.z);
	}

	pause(state) { this.isPause = state; }
	stop() { this.activate(false); }
	reset() { this.heading = this.baseHeading; this.zUp = 0; this.changePosition(); }
	getRelativeHeading() { return this.normilizeHeading(this.baseHeading - this.heading); }
	setXBound(min, max) { this.xBound = [ min, max ]; }
	setZBound(min, max) { this.zBound = [ min, max ]; }
	activate(state) { this.isActive = state; }
	isPointEmpty() { return this.currentPoint.x === 0 && this.currentPoint.y === 0; } 
	setPoint(x, y) { this.currentPoint = { x, y }; } 
	getPoint() { return this.currentPoint; } 
	normilizeHeading(heading) { if (heading > 360) heading = heading - 360; else if (heading < 0) heading = 360 + heading; return heading; }
}

const cameraRotator = new CameraRotator();
mp.events.add("render", () => {
	if (!cameraRotator.isActive || cameraRotator.isPause) return;
	mp.game.controls.disableAllControlActions(2);
	mp.game.controls.enableControlAction(2, 30, true);
	mp.game.controls.enableControlAction(2, 31, true);
	mp.game.controls.enableControlAction(2, 32, true);
	mp.game.controls.enableControlAction(2, 1, true);
	mp.game.controls.enableControlAction(2, 2, true);

	const x = mp.game.controls.getDisabledControlNormal(2, 239);
	const y = mp.game.controls.getDisabledControlNormal(2, 240);

	if (cameraRotator.isPointEmpty()) cameraRotator.setPoint(x, y);

	const currentPoint = cameraRotator.getPoint();
	const dX = currentPoint.x - x;
	const dY = currentPoint.y - y;
	
	cameraRotator.setPoint(x, y);
	if(mp.game.controls.isDisabledControlPressed(2, 237)) {
		//mp.gui.cursor.visible = false;
		cameraRotator.onMouseMove(dX, dY);
	}else{
		//mp.gui.cursor.visible = true;
	}
});

exports = cameraRotator;
}