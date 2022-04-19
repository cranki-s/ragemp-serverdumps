{
let AutoSchool;
mp.events.add('OpenSchoolMenu', (lic) => {
	if (global.menuCheck() || AutoSchool != null) return;
    menuOpen();
	AutoSchool = mp.browsers.new('package://cef/System/school/index.html');
	AutoSchool.execute(`Autoschool.open(${lic});`);
});
mp.events.add('StartExam', (id) => {
	mp.events.call("CloseSchoolMenu");
	mp.events.callRemote("StartExam:Server", id);
});
mp.events.add('CloseSchoolMenu', () => {
	if (AutoSchool == null) return;
	AutoSchool.destroy();
	AutoSchool = null;
	menuClose();
});
}