Vue.component('intervals-item', {
	data: function () {
	  return {
		delay: 0,
		time_first_bounce: 1,
		bounce: 5
	  }
	},
	methods:{
		change: function(n,o){
			this.$emit('update')
		}
	},
	mounted(){
		this.$nextTick(function () {
		this.change(0,0)
		})
	},
	watch:{
		// time: {handler: 'change'},
		bounce: {handler: 'change'},
		delay: {handler: 'change'},
		time_first_bounce: {handler: 'change',inmediate: true}
	},
	props: {time: Number},
	// props: ['v0x','v0y'],
	template: `
		<tr>
			<td><input class="form-control" style="width: 80px;" type='number' step='0.001' v-model.number='delay' v-bind:disabled="time != 0"  required></td>
			<td><input class="form-control" style="width: 80px;" type='number' step='0.001' v-model.number='time_first_bounce' v-bind:disabled="time != 0"  required></td>
			<td><input class="form-control" style="width: 80px;" type='number' step='1' v-model.number='bounce' v-bind:disabled="time != 0"  required></td>
		</tr>
		`
});