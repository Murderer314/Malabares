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
		audio: function(){
			const ac = new AudioContext();
			var real = new Float32Array(2);
			var imag = new Float32Array(2);
			// var ac = new AudioContext();
			// var osc = ac.createOscillator();
	
			real[0] = 0;
			imag[0] = 0;
			real[1] = 1;
			imag[1] = 0;
	
			var wave = ac.createPeriodicWave(real, imag, {disableNormalization: true});

			let osc = ac.createOscillator();
			osc.setPeriodicWave(wave);
			osc.frequency.value = 300;
			osc.connect(ac.destination);
			osc.start();
			osc.stop(ac.currentTime + 0.06);
		},
		llamar(){
			alert("jajaja");
		},
		validator: function (value) {
			// The value must match one of these strings
			val=Number(value);
			console.log(val)
			if(isNaN(val)){
				return 0;
			}else{
				return val;
			}
		}
	},
	watch: {
		// whenever question changes, this function will run
		t: function (newT, oldT) {
			if(this.t-this.t0>this.bounce[this.current_bounce+1]){
				this.audio()
				this.current_bounce = this.current_bounce+1
			}else if(this.t-this.t0 < this.bounce[1]){
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
			return Math.max(0,this.t-this.bounce[this.current_bounce]-this.t0)
		},
		x: function(){
			return this.dx(this.x0,this.v0x,Math.max(0,this.t-this.t0));
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
				return this.Vy(this.v0y,Math.max(0,this.t-this.t0))
			}else{
				return this.Vy(this.initial_velocity_after_bounce[this.current_bounce],this.current_t)
			}
		},
		vx: function(){
			val=Number(this.v0x);
			if(isNaN(val)){
				return 0;
			}else{
				return val;
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
		},
		myStyle: function(){
			return {
				"background-color": this.color,
				'bottom': this.height+'px',
				'border-radius': '100%',
				'width': 	'20px',
				'height': 	'20px',
				'position': 'absolute'
			} 
		}
	},
	props: {
		'id':{
			type: [String, Number],
			default: 0
		},
		't': {					//Instante de tiempo actual
			type: [String, Number],
			default: 0
		},
		'v0x': {				//Velocidad inicial en X
			type: [String, Number],
			default: 0
		},
		'v0y': {				//Velocidad inicial en Y
			type: [String, Number],
			default: 0
		},
		'handsHeight': {		//Distancia entre manos
			type: [String, Number],
			default: 2
		},
		'radius': {				//Radio de la pelota
			type: [String, Number],
			default: 20
		},
		'r': {					//Coeficiente de restitucion
			type: [String, Number],
			default: 0
		},
		't0': {					//Instante de tiempo en el que sale la pelota
			type: [String, Number],
			default: 0
		},
		'maxBounce': {			//Maxima cantidad de rebotes
			type: [String, Number],
			default: 5
		},
		'interval': {			//intervalo de los steps
			type: [String, Number],
			default: 0
		},
		'color': {
			type: String,
			default: 'yellow'},
		'height':{
			type: [String, Number],
			default: 2
		},
		'x0': {					//Posicion inicial de la pelota
			type: [String, Number],
			default: 0
		},
	},
	template: `
		<div v-bind:style="[myStyle,position]">
		</div>
	`
});