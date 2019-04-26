Vue.component('graph', {
	data: function () {
	  return {
		amount: 0,
		width: 900,
		height: 400,
		values: {},
		table:{}
	  }
	},
	methods:{
		a(){
			console.log(this.$refs.ball1);
			alert(this.$refs.balll.length);
		},
		start: function(){
			// this.$refs.balls.forEach(function(item){item.start()})
		},
		stop: function(){
			// this.$refs.balls.forEach(function(item){item.stop()})
		},
		reset: function(){
			// this.$refs.balls.forEach(function(item){item.reset()})
		},
		step: function(){
			// this.$refs.balls.forEach(function(item){item.step()})
		},
		updateTable: function(){
			// this.table = this.$refs.table.balls
			for (let key in this.$refs.table.balls){
				Vue.set(this.table, key, this.$refs.table.balls[key]);
			}
			this.amount = Object.keys(this.table).length
			// this.$refs.table.balls.forEach(function(item, i) {
			// 	this.table[]
			// })
		}
	},
	computed:{
		dimensions: function(){
			return {
				'position': 'relative',
				'width': this.width+'px',
				'height': this.height+'px',
				'background-color': 'black'
			}
		}
		// table: function(){
		// 	// return this.$refs.table[0].balls
		// }
		// values: function(){
		// 	// return {
		// 	// 	// x: this.$children[0].x
		// 	// }
		// 	// return 1
		// }
	},
	mounted() {
		v = this
		// if(this.$refs.balls){
		// this.$refs.balls.forEach(function(ball,index){ v.values[index] = {x:0,y:0}})
        // this.$watch(
		// 		() => {
		// 			v = this;
		// 			this.$refs.balls.forEach(
		// 				function(ball,index){
		// 					v.values[index] = {
		// 						x: ball.x,
		// 						y: ball.y,
		// 						vx: ball.v0x,
		// 						vy: ball.vy
		// 					}
		// 				}
		// 			)
		// 		},
		// 		{
		// 			'immediate': false
		// 		}
		// 	)
		// }
	},
	watch:{
		// table: function(newVal,oldVal){
		// 	this.amount = Object.keys(this.table).length
		// 	if(this.values.length>newVal){
		// 		this.values.splice(newVal,this.values.length-newVal)
		// 	}else if(this.values.length<newVal){
		// 		diff = newVal-this.values.length
		// 		for (let i = 0; i < diff; i++) {
		// 			this.values.push({id: this.values.length+i})
		// 		}
		// 	}
		// }
	},
	props: {
		'balls': Array,
		'time': Number
	},
	template: `
	<div class="row">
		<div class="col-md-4">
			<properties-table v-bind:time='time' ref="table" v-on:update="updateTable"/>
		</div>
		<div class="col-md-6">
			<div class="content" v-bind:style="dimensions">
				<ball v-for="(item,index) in table"
					:key=table[index].id
					ref="balls"
					v-bind:id="Number(index)"
					v-bind:t="time"
					v-bind:v0x=table[index].v0x
					v-bind:v0y=table[index].v0y
					v-bind:r=table[index].r
					v-bind:t0=table[index].t0
					v-bind:color=table[index].color
					v-bind:handsHeight=table[index].handsHeight
					v-bind:x0=table[index].x0
					v-bind:maxBounce=200
				/>
			</div>
		</div>
		<div class="col-md-2">
		<div class="table-responsive">
			<table class='table table-bordered table-striped' style='background-color: black; color: white'>
				<tr>
					<th style="width: 15px">Id</th>
					<th style="width: 15px"></th>
					<th style="width: 55px">X</th>
					<th style="width: 55px">Y</th>
					<th style="width: 55px">Vx</th>
					<th style="width: 55px">Vy</th>
				</tr>
				<tr v-for='(ball,index) in $refs.balls'>
					<td>{{ball.id}}</td>
					<td>
						<div v-bind:style="{
								'background-color': ball.color,
								position: 'static',
								width: '20px',
								height: '20px',
								'border-radius':'100%'}"
						>
						</div>
					</td>
					<td v-if="ball">
						{{ball.x.toPrecision(6)}}
					</td>
					<td v-if="ball">
						{{ball.y.toPrecision(6)}}
					</td>
					<td v-if="ball">
						{{ball.vx.toPrecision(6)}}
					</td>
					<td v-if="ball">
						{{ball.vy.toPrecision(6)}}
					</td>
				</tr>
			</table>
		</div>
		</div>
	</div>
		
		`
});