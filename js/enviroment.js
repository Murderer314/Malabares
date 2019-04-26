
Vue.component('enviroment', {
	data: function () {
	  return {
		v0y:2,
		v0x:1,
		idInterval: NaN,
		intervals: 10,
		time: 0,
	  }
	},
	style: {color: '#000'},
	methods:{
		reset: function(){
			this.time=0
		},
		step: function(event){
			this.doStep(event)
		},
		start: function(){
			if(isNaN(this.idInterval)){
				this.idInterval = setInterval(this.doStep,this.intervals);
			}else{
				clearInterval(this.idInterval);
				this.idInterval = setInterval(this.doStep,this.intervals);
			}
		},
		stop: function(){
			if(!isNaN(this.idInterval)){
				clearInterval(this.idInterval);
				this.idInterval = NaN
			}
		},
		doStep: function(step=1){
			this.time += this.intervals*step/1000
		}
	},
	template: `
		<div class="container-fluid">
			<graph 
				v-bind:time="time"
				ref="graph">
			</graph>
			<controls
				v-bind:time	= "time"
				v-on:start_event = "start"
				v-on:stop_event  = "stop"
				v-on:reset_event = "reset"
				v-on:step_event  = "step">
			</controls>
		</div>
		`
});
