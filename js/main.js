var t = 0;
var radius = 20;
var hands_separation = 100;
var hands_height = 100;
var idInterval;
function getX(t) {
	return t/15.0;
}
function getY(t) {
	// return t;
	return (Math.sin(2*Math.PI*(t/360))+1)*hands_separation;
}
function drawBallXY(X,Y) {
	$('#ball').css("left", X+"px");
	$('#ball').css("bottom", Y+"px");
}
function drawBall(t){
	x = getX(t);
	y = getY(t);
	width = $('.content').width();
	height = $('.content').height();
	realX = ((width-radius)*x)/hands_separation
	realY = y;
	drawBallXY(realX,realY);
	console.log(x + " " + y);
}
function interval(params) {
	idInterval = setInterval(() => {
		console.log(t);
		drawBall(t);
		t += 1;
	}, 5);
}
function start(){
	interval();
}
function stop(){
	clearInterval(idInterval);
}
$(document).ready(function(){
	$('#ball').css("bottom", hands_height+"px");
})