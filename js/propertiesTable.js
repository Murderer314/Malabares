Vue.component('properties-table', {
	data: function () {
	  return {
		count: 0,
		balls: {}
	  }
	},
	methods:{
		updateItem: function(event){
			this.balls[event.id] = event
			this.$emit('update')
			// console.log(event)
		}
	},
	props: ['time'],
	template: `
		<div class="table-responsive">	
			<label> Amount of balls: <input v-model.number="count" type="number"></label>
			<table class='table table-bordered table-striped table-condensed' style='color: black'>
				<tr>
					<th>Id</th>
					<th></th>
					<th>vX</th>
					<th>vY</th>
					<th>t0</th>
					<th>r</th>
					<th>Height</th>
					<th>x0</th>
				</tr>
				<property-item v-for='i in count' :key='i' :id='i' v-on:update="updateItem($event)" v-bind:time="time"/>
			</table>
		</div>
		`
});
