var t = 0;
var radius = 20;
var hands_separation = 1.5;
var hands_height = 1.05;
var intervalTime = 45;
var idInterval;
var g = 9.8;
function getX(t,Vx0=0) {
	return Vx0*t;
}
function getY(t,Vy0=0) {
	// return t;
	return hands_height+Vy0*t-(g*t*t/2);
}
function drawBallXY(X,Y) {
	$('#ball').css("left", X+"px");
	$('#ball').css("bottom", Y+"px");
	$('#time').text(t);
}
function drawBall(t,Vx0,Vy0){
	x = getX(t,Vx0);
	y = getY(t,Vy0);
	width = $('.content').width();
	height = $('.content').height();
	realX = ((width-radius)*x)/hands_separation
	realY = ((height-radius)*y)/10;
	drawBallXY(realX,realY);
	console.log(Vx0 + "-" + Vy0);
}
function interval(Vx0,Vy0) {
	idInterval = setInterval(() => {
		console.log(t);
		t += intervalTime/1000;
		console.log(Vx0 + "-" + Vy0);
		drawBall(t,Vx0,Vy0);
	}, intervalTime);
}
function start(){
	Vx0 = $('#Vx0').val();
	Vy0 = $('#Vy0').val();
	interval(Vx0,Vy0);
}
function stop(){
	clearInterval(idInterval);
}
function step(){
	Vx0 = $('#Vx0').val();
	Vy0 = $('#Vy0').val();
	t += intervalTime/1000;
	drawBall(t,Vx0,Vy0);
}
function reset(){
	Vx0 = $('#Vx0').val();
	Vy0 = $('#Vy0').val();
	t = 0;
	drawBall(t,Vx0,Vy0);
}
$(document).ready(function(){
	drawBall(0,1,1);	
	// $('#ball').css("bottom", (((height-radius)*hands_height)/10)+"px");
})