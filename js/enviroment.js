
Vue.component('enviroment', {
	data: function () {
	  return {
		v0y:2,
		v0x:1,
		idInterval: NaN,
		intervals: 10,
		time: 0,
		balls: [
			{
				id: 1,
				v0x: 1,
				v0y: -5,
				r  : 0.8,
				t0: 0.4,
				radius: 20,
				handsHeight: 2,
				ballStyle: {
					"background-color":"yellow",
					'bottom': '10px',
					'border-radius': '100%',
					'width': 	'20px',
					'height': 	'20px',
					'position': 'absolute'
				}
			},
			// {
			// 	id: 1,
			// 	v0x: 1,
			// 	v0y: 2,
			// 	r  : 0.8,
			// 	ballStyle: {"background-color":"green", bottom: '50px'}
			// },
			// {
			// 	id: 2,
			// 	v0x: 1,
			// 	v0y: 2,
			// 	r  : 0.8,
			// 	ballStyle: {"background-color":"yellow", bottom: '80px'}
			// }
		]
	  }
	},
	style: {color: '#000'},
	methods:{
		reset: function(){
			this.$refs.graph.reset()
			this.time=0
		},
		step: function(){
			this.doStep()
			this.$refs.graph.step()
		},
		start: function(){
			this.$refs.graph.start()
			if(isNaN(this.idInterval)){
				this.idInterval = setInterval(this.doStep,this.intervals);
			}else{
				clearInterval(this.idInterval);
				this.idInterval = setInterval(this.doStep,this.intervals);
			}
		},
		stop: function(){
			this.$refs.graph.stop()
			if(!isNaN(this.idInterval)){
				clearInterval(this.idInterval);
				this.idInterval = NaN
			}
		},
		doStep: function(){
			this.time += this.intervals/1000
		}
	},
	template: `
		<div class="container-fluid">
			<graph 
				v-bind:v0x="v0x"
				v-bind:v0y="v0y"
				v-on:v0x="v0x = $event"
				v-on:v0y="v0y = $event"
				v-bind:balls="balls"
				v-bind:time="time"
				ref="graph">
			</graph>
			<controls
				v-bind:time	= "time"
				v-bind:v0x	= "v0x"
				v-bind:v0y	= "v0y"
				v-on:v0x="v0x = $event"
				v-on:v0y="v0y = $event"
				v-on:start_event = "start"
				v-on:stop_event  = "stop"
				v-on:reset_event = "reset"
				v-on:step_event  = "step">
			</controls>
		</div>
		`
});
