Vue.component('properties-table', {
	data: function () {
	  return {
		count: 0,
		balls: {},
		handsHeight: 1,
		handsSeparation: 3
	  }
	},
	methods:{
		updateItem: function(event=NaN){
			// this.balls[event.id] = event
			that = this
			this.balls={}
			// for (let index = 0; index < this.count; index++) {
			// 	balls = this.$refs.balls
			// 	element = balls[index]
			// 	this.balls[index] = element.load()
			// }
			if (this.$refs.balls){
				this.$refs.balls.forEach((element,index) => {
					if(index<this.count){
						that.balls[element.id] = element.load()
					}
				});
			}
			this.$emit('update')
			// console.log(event)
		}
	},
	watch:{
		count: function(){
			// this.$emit('update')
			// this.updateItem()
		},
		handsHeight: function(){
			this.$emit('update')
		},
		handsSeparation: function(){
			this.$emit('update')
		}
	},
	props: ['time'],
	template: `
		<div class="table-responsive">	
			<label> Amount of balls: <input class="form-control" v-model.number="count" v-on:input="updateItem" type="number" min=0></label>
			<table class='table table-bordered table-striped table-condensed' style='color: black'>
				<tr>
					<th>Id</th>
					<th>Color</th>
					<th>r</th>
					<th>Amount</th>
					<th>Delay:Time_first_bounce</th>
				</tr>
				<property-item v-for='i in count' :key='i' :id='i' ref="balls" v-on:update="updateItem($event)" v-bind:time="time"/>
			</table>
			<label> Hands Heigth: 
				<input class="form-control"
					style="width: 80px;"
					type='number'
					step='0.001'
					min=0
					v-model.number='handsHeight'
					v-bind:disabled="time != 0" required>
			</label>
			<label> Hands Separation: 
				<input class="form-control"
					style="width: 80px;"
					type='number'
					step='0.001'
					min=0
					v-model.number='handsSeparation'
					v-bind:disabled="time != 0" required>
			</label>
		</div>
		`
});
