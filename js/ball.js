Vue.component('ball', {
	data: function () {
	  return {
		count: 0,
		gravity: 9.8,
		current_bounce: 0
	  }
	},
	methods: {
		Vy: function(v0y,t){
			return v0y - this.gravity*t;
		},
		dy: function(y0, v0y, t){
			return y0 + v0y*t - this.gravity*t*t/2;
		},
		dx: function(x0, v0x, t){
			return x0 + v0x*t;
		},
		tHeightMax: function(v0y) {
			return v0y/this.gravity;
		},
		llamar(){
			alert("jajaja");
		}
	},
	watch: {
		// whenever question changes, this function will run
		t: function (newT, oldT) {
			if(this.t>this.bounce[this.current_bounce+1]){
				this.current_bounce = this.current_bounce+1
			}else if(this.t < this.bounce[1]){
				this.current_bounce = 0
			}
		}
	},
	computed:{
		time_to_max_height: function () {
			return v0y/this.gravity;
		},
		time_first_bounce: function(){
			D = Math.pow(this.v0y,2)+2*(this.gravity)*this.handsHeight;
			S1 = (-this.v0y+ Math.sqrt(D))/(this.gravity);
			S2 = (-this.v0y- Math.sqrt(D))/(this.gravity);
			return -Math.min(S1,S2);
		},
		final_velocity_before_bounce: function(){
			t0 = this.time_first_bounce;
			return this.v0y - this.gravity*t0;
		},
		initial_velocity_after_bounce: function(){
			result = [];
			v01 = -this.final_velocity_before_bounce;
			for (let i = 0; i <= this.maxBounce; i++) {
				vi = v01*Math.pow(this.r,i+1)
				result.push(vi);
			}
			return result;
		},
		bounce: function(){
			result = [0];
			t0 = this.time_first_bounce;
			v01 = this.final_velocity_before_bounce;
			for (let i = 0; i < this.maxBounce; i++) {
				bi = t0-(2*v01/this.gravity)*((this.r-Math.pow(this.r,i+1))/(1-this.r))
				result.push(bi);
			}
			return result;
		},
		current_t: function(){
			return this.t-this.bounce[this.current_bounce]
		},
		x: function(){
			return this.dx(0,this.v0x,this.t);
		},
		y: function(){
			if (this.current_bounce == 0){
				return this.dy(this.handsHeight,this.v0y,this.current_t)
			}else{
				return this.dy(0,this.initial_velocity_after_bounce[this.current_bounce-1],this.current_t)
			}
		},
		vy: function(){
			if (this.current_bounce == 0){
				return this.Vy(this.v0y,this.t)
			}else{
				return this.Vy(this.initial_velocity_after_bounce[this.current_bounce],this.current_t)
			}
		},
		position: function(){
			dy = this.y
			dx = this.x
			// realY = dy;
			// realY = ((this.$parent.height-20)*dy)/100;
			realX = ((this.$parent.width-this.radius)*dx)/4;
			realY = ((this.$parent.height-this.radius)*dy)/4;
			return {
				'bottom': realY+'px',
				'left': realX+'px'
			}
		}
	},
	props: {
		't': {					//Instante de tiempo actual
			type: Number,
			default: 0},
		'v0x': {				//Velocidad inicial en X
			type: Number,
			default: 0},
		'v0y': {				//Velocidad inicial en Y
			type: Number,
			default: 0},
		'handsHeight': {		//Distancia entre manos
			type: Number,
			default: 0},
		'radius': {				//Radio de la pelota
			type: Number,
			default: 20},
		'r': {					//Coeficiente de restitucion
			type: Number,
			default: 0},
		't0': {					//Instante de tiempo en el que sale la pelota
			type: Number,
			default: 0},
		'maxBounce': {			//Maxima cantidad de rebotes
			type: Number,
			default: 5},
		'interval': {			//intervalo de los steps
			type: Number,
			default: 0},
		'ballStyle': {
			type: Object,
			default: {}
		}
	},
	template: `
		<div v-bind:style="[ballStyle,position]">
		</div>
	`
});