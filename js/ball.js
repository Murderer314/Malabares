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
		}
	},
	watch: {
		t: function (newT, oldT) {
			that = this
			index = this.bounce.findIndex(function(currentValue){return currentValue>newT-that.delay})-1
			if(index<0) index=0
			if(index != this.current_bounce){
				if(index != 0 && this.x != this.handsSeparation && !this.catched) this.audio()
				this.current_bounce = index
			}
		}
	},
	computed:{
		v0x: function(){
			v0x = 1
			// v0x = this.handsSeparation/this.sumTiXr
			// v0x = this.handsHeight/(this.tb*Math.pow(this.r,this.maxBounce))
			return v0x
		},
		tb: function(){
			a=(-this.gravity)/2
			b=(-this.final_velocity_before_bounce)*Math.pow(this.r,this.maxBounce)
			c=-this.handsHeight
			D = Math.pow(b,2)-4*a*c
			S1=(-b+Math.sqrt(D))/(2*a)
			S2=(-b-Math.sqrt(D))/(2*a)
			S = Math.min(S1,S2)
			S = this.handsHeight/Math.pow(this.r,this.maxBounce)
			return S
		},
		time_to_max_height: function () {
			return this.v0y/this.gravity;
		},
		v0y: function(){
			return (this.gravity*(this.time_first_bounce)/2)-this.handsHeight/(this.time_first_bounce)
		},
		final_velocity_before_bounce: function(){
			t = this.time_first_bounce;
			return this.v0y - this.gravity*t;
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
			for (let i = 0; i <= this.maxBounce; i++) {
				bi = t0-(2*v01/this.gravity)*((this.r-Math.pow(this.r,i+1))/(1-this.r))
				result.push(bi);
			}
			return result;
		},
		x_for_bounce: function () {
			resultt = [0];
			currentVel = this.v0x;
			for (let i = 0; i <= this.maxBounce; i++) {
				vx = this.dx(resultt[i], currentVel, this.bounce[i+1]-this.bounce[i])
				resultt.push(vx);
				currentVel*=this.r
			}
			return resultt;	
		},
		current_t: function(){
			return Math.max(0,this.t-this.bounce[this.current_bounce]-this.delay)
		},
		x: function(){
			// dx = this.dx(this.hand*this.handsSeparation,this.vx*(1-(this.hand*2)),Math.max(0,this.t-this.delay));
			dx = this.dx(this.hand*this.handsSeparation+((1-(this.hand*2))*this.x_for_bounce[this.current_bounce]),this.vx*(1-(this.hand*2)),this.current_t);
			// return Math.max(0,Math.min(this.handsSeparation,dx));
			return dx
		},
		y: function(){
			if (this.current_bounce == 0){
				dy = this.dy(this.handsHeight,this.v0y,this.current_t)
			}else{
				dy = this.dy(0,this.initial_velocity_after_bounce[this.current_bounce-1],this.current_t)
			}
			// if(this.x >= this.handsSeparation){
			// 	return this.handsHeight
			// }else{
				return dy
			// }
		},
		vy: function(){
			if (this.current_bounce == 0){
				vy = this.Vy(this.v0y,this.current_t)
			}else{
				vy = this.Vy(this.initial_velocity_after_bounce[this.current_bounce],this.current_t)
			}
			// if(this.x > this.handsSeparation){
			// 	return 0
			// }else{
			// 	return vy
			// }
			return vy
		},
		vx: function(){
			return this.v0x*Math.pow(this.r,this.current_bounce)
		},
		catched: function(){
			return (this.x >= this.handsSeparation || this.x <= 0)
		},
		position: function(){
			dy = this.y
			dx = this.x
			// realY = dy;
			// realY = ((this.$parent.height-20)*dy)/100;		//20 es el radio de la pelota
			realX = ((this.$parent.width-20)*dx)/4;
			realY = ((this.$parent.height-20)*dy)/4;
			return {
				'bottom': realY+'px',
				'left': realX+'px'
			}
		},
		myStyle: function(){
			return {
				"background-color": this.color,
				'bottom': this.handsHeight+'px',
				'border-radius': '100%',
				'width': 	'20px',
				'height': 	'20px',
				'position': 'absolute'
			} 
		}
	},
	props: {
		'id':{//
			type: Number,
			default: 0
		},//
		't': {					//Instante de tiempo actual
			type: Number,
			default: 0
		},//
		'color': {
			type: String,
			default: 'yellow'
		},
		'r': {					//Coeficiente de restitucion
			type: Number,
			default: 0
		},
		'time_first_bounce': {	//t0+tfb = primer rebote
			type: Number,
			default: 1
		},
		'delay': {					//Instante de tiempo en el que sale la pelota
			type: Number,
			default: 0
		},
		'maxBounce': {			//Maxima cantidad de rebotes
			type: Number,
			default: 5
		},
		'hand': {
			type: Number,
			default: 0
		},
		'handsHeight': {		//Altura de las manos
			type: Number,
			default: 2
		},
		'handsSeparation': {	//Distancia entre manos
			type: Number,
			default: 2
		}
	},
	template: `
		<div v-bind:style="[myStyle,position]" v-if="t>=delay & !catched">
		</div>
	`
});
