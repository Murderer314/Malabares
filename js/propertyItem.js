Vue.component('property-item', {
	data: function () {
	  return {
		color: "#ffff00",
		r: 0.8,
		amount: 1,
	  }
	},
	destroyed: function(){
		this.$emit('update')
	},
	mounted: function(){
		colors = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']
		r = ''.concat(colors[this.rnd()],colors[this.rnd()])
		g = ''.concat(colors[this.rnd()],colors[this.rnd()])
		b = ''.concat(colors[this.rnd()],colors[this.rnd()])
		this.color = "#".concat(r,g,b)
		this.$emit('update')
	},
	methods:{
		rnd: function(){
			return Math.floor(Math.random()*16);
		},
		change: function(n,o){
			this.$emit('update', this.load)
		},
		load: function(){
			interval = {}
			
			if (this.$refs.intervals){
				interval = this.$refs.intervals.data
			}else {
				interval = {}
			}
			return {
				id: Number(this.id),
				color: this.color,
				r: Number(this.r),
				amount: Number(this.amount),
				intervals: interval
			}
		}
	},
	watch:{
		color: {handler: 'change'},
		amount: {handler: 'change'},
		r: {handler: 'change'}
	},
	props: {id: Number, time: Number},
	// props: ['v0x','v0y'],
	template: `
		<tr>
			<td>{{id}}</td>
			<td><input class="form-control" type='color' v-model='color' v-bind:disabled="time != 0"></td>
			<td><input class="form-control" style="width: 80px;" type='number' step='0.001' v-model.number='r' v-bind:disabled="time != 0"  required></td>
			<td><input class="form-control" style="width: 80px;" type='number' step='1' v-model.number='amount' v-bind:disabled="time != 0" required></td>
			<intervals-table ref="intervals" v-bind:amount=amount v-bind:time=time v-on:update="change" min=1 />
		</tr>
		`
});