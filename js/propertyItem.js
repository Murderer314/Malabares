Vue.component('property-item', {
	data: function () {
	  return {
		color: "#ffff00",
		vx: 1,
		vy: 1,
		t0: 0,
		r: 0.8,
		handsHeight: 2,
		x0: 0
	  }
	},
	mounted: function(){
		colors = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']
		r = ''.concat(colors[this.rnd()],colors[this.rnd()])
		g = ''.concat(colors[this.rnd()],colors[this.rnd()])
		b = ''.concat(colors[this.rnd()],colors[this.rnd()])
		this.color = "#".concat(r,g,b)
	},
	methods:{
		rnd: function(){
			return Math.floor(Math.random()*16);
		},
		change: function(n,o){
			this.$emit('update', {
				id: this.id,
				v0x: this.vx,
				v0y: this.vy,
				t0: this.t0,
				r: this.r,
				color: this.color,
				handsHeight: this.handsHeight,
				x0: this.x0
			})
		}
	},
	watch:{
		color: {handler: 'change',immediate: true},
		vx: {handler: 'change',immediate: true},
		vy: {handler: 'change',immediate: true},
		t0: {handler: 'change',immediate: true},
		r: {handler: 'change',immediate: true},
		handsHeight: {handler: 'change',immediate: true},
		x0: {handler: 'change',immediate: true}
	},
	props: {id: Number, time: Number},
	// props: ['v0x','v0y'],
	template: `
		<tr>
			<td>{{id}}</td>
			<td><input type='color' v-model='color' v-bind:disabled="time != 0"></td>
			<td><input class="form-control" style="width: 80px;" type='number' step='0.001' v-model.number='vx' v-bind:disabled="time != 0"></td>
			<td><input class="form-control" style="width: 80px;" type='number' step='0.001' v-model.number='vy' v-bind:disabled="time != 0"></td>
			<td><input class="form-control" style="width: 80px;" type='number' step='0.001' v-model.number='t0' v-bind:disabled="time != 0"></td>
			<td><input class="form-control" style="width: 80px;" type='number' step='0.001' v-model.number='r' v-bind:disabled="time != 0"></td>
			<td><input class="form-control" style="width: 80px;" type='number' step='0.001' v-model.number='handsHeight' v-bind:disabled="time != 0"></td>
			<td><input class="form-control" style="width: 80px;" type='number' step='0.001' v-model.number='x0' v-bind:disabled="time != 0"></td>
		</tr>
		`
});