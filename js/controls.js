

Vue.component('controls', {
	data: function () {
	  return {
		count: 0
	  }
	},
	methods:{
		reset: function(){
			this.$emit('reset_event')
		},
		step: function(){
			this.$emit('step_event',1)
		},
		stepBack: function(){
			this.$emit('step_event',-1)
		},
		start: function(){
			this.$emit('start_event')
			// if(isNaN(this.idInterval)){
			// 	this.idInterval = setInterval(this.step,this.interval);
			// }else{
			// 	clearInterval(this.idInterval);
			// 	this.start();
			// }
		},
		stop: function(){
			this.$emit('stop_event')
			// if(!isNaN(this.idInterval)){
			// 	clearInterval(this.idInterval);
			// }
		},
	},
	props: {time:Number, interval: Number},
	// props: ['v0x','v0y'],
	style: {color: '#000'},
	template: `
	<div class="row">
		<div class="col-sm-3">
		</div>
		<div class="col-sm-6">
			<div class="col-sm-3">
			</div>
			<div class="col-sm-4">
				<div class="center controls">
					<button id='start-btn' class='btn btn-primary' @click="start">Start</button>
					<button id='stop-btn' class='btn btn-primary' @click="stop">Stop</button>
					<button id='reset-btn' class='btn btn-primary' @click="reset">Reset</button>
					<button id='step-btn' class='btn btn-primary' @click="step">Step</button>
					<button id='step-btn' class='btn btn-primary' @click="stepBack">StepBack</button>
				</div>
			</div>
			<div class="col-sm-3">
				<p>t={{time}}</p>
			</div>
		</div>
	</div>
		`
});
