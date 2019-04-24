var t = 0;
var radius = 20;
var hands_separation = 1.5;
var hands_height = 1.05;
var intervalTime = 10;//45;
var idInterval;
var g = 9.8;

function calculate_rebote(Vy0,r,n){
	t0 = tiempo_primer_rebote(Vy0);
	Vy01 = Vy0-g*t0;
	arr = [];
	for (let i = 0; i < n; i++) {
		current = t0-2*Vy01/g*((r-Math.pow(r,i+1))/(1-r));
		arr.push(current);
	}
	console.log(arr);
	return arr;
}
function tiempo_primer_rebote(Vy0) {
	D = Math.pow(Vy0,2)+4*4.9*hands_height;
	S1 = (Vy0 + Math.sqrt(D))/9.8;
	S2 = (Vy0 - Math.sqrt(D))/9.8;
	S = Math.max(S1,S2);
	return S;
}
function velocidad_primer_rebote(Vy0) {
	t = tiempo_primer_rebote(Vy0);
	Vy01 = Vy0-g*t;
	return Vy01;
}
function velocidad_salida_i(Vy0,r,i) {
	Vy01 = velocidad_primer_rebote(Vy0);
	return Vy01*Math.pow(r,i);
}
function getCurrentRebote(Vy0,r) {
	T0 = tiempo_primer_rebote(Vy0);
	Vy01 = Vy0-g*T0;
	if (t<T0) {
		return 0;
	} else {
		return (Math.log(r+((t-T0)*g/(2*Vy01))*(1-r))/Math.log(r))-1
	}
}
function getYrebotes(Vy0,r) {
	i = getCurrentRebote(Vy0,r);
	if (i<1) {
		return getY(t,Vy0);
	} else {
		Vy = velocidad_salida_i(Vy0,r,i);
		return Vy*t-(g*t*t/2);
	}
}
function getX(t,Vx0=0) {
	return Vx0*t;
}
function getY(t,Vy0=0) {
	// return t;
	return hands_height+Vy0*t-(g*t*t/2);
}
function drawBallXY(X,Y) {
	$('.ball').css("left", X+"px");
	$('.ball').css("bottom", Y+"px");
	$('#time').text(t);
}
function drawBall(t,Vx0,Vy0){
	x = getX(t,Vx0);
	// y = getY(t,Vy0);
	y = getYrebotes(Vy0,0.8);
	$('#x').text(x);
	$('#y').text(y);
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
// function start(){
// 	Vx0 = $('#Vx0').val();
// 	Vy0 = $('#Vy0').val();
// 	interval(Vx0,Vy0);
// }
// function stop(){
// 	clearInterval(idInterval);
// }
// function step(){
// 	Vx0 = $('#Vx0').val();
// 	Vy0 = $('#Vy0').val();
// 	t += intervalTime/1000;
// 	drawBall(t,Vx0,Vy0);
// }
// function reset(){
// 	Vx0 = $('#Vx0').val();
// 	Vy0 = $('#Vy0').val();
// 	t = 0;
// 	drawBall(t,Vx0,Vy0);
// }
var vm;
$(document).ready(function(){
	vm = new Vue({ el: '#app' })
	// drawBall(0,1,1);
	// $('.ball').css("bottom", (((height-radius)*hands_height)/10)+"px");
	// reset();
});