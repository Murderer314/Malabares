Vue.component('graph', {
	data: function () {
	  return {
		amount: 1,
		width: 900,
		height: 400,
		values: {},
	  }
	},
	// props: {'v0y': Number,'v0x': Number},
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
		},
		// values: function(){
		// 	// return {
		// 	// 	// x: this.$children[0].x
		// 	// }
		// 	// return 1
		// }
	},
	mounted() {
		v = this
		this.$refs.balls.forEach(function(ball,index){ v.values[index] = {x:0,y:0}})
        this.$watch(
				() => {
					v = this;
					this.$refs.balls.forEach(
						function(ball,index){
							v.values[index] = {
								x: ball.x,
								y: ball.y,
								vx: ball.v0x,
								vy: ball.vy
							}
						}
					)
				},
				{
					'immediate': false
				}
			)
    },
	props: {
		'balls': Array,
		'time': Number
	},
	template: `
	<div class="row">
		<div class="col-md-1"></div>
		<div class="col-md-6">
			<div class="content" v-bind:style="dimensions">
				<ball v-for="item in balls"
					:key=item.id
					ref="balls"
					v-bind:t="time"
					v-bind:v0x=item.v0x
					v-bind:v0y=item.v0y
					v-bind:handsHeight=item.handsHeight
					v-bind:radius=item.radius
					v-bind:r=item.r
					v-bind:ballStyle=item.ballStyle
					v-bind:maxBounce=4
				/>
			</div>
		
			<label> Amount of balls: <input v-model.number="amount" type="number"></label>
		</div>
		<div class="col-md-5">
		<div class="table-responsive">
			<table class='table table-bordered table-striped table-condensed' style='background-color: black; color: white'>
				<tr>
					<th style="width: 30px">Id</th>
					<th style="width: 25px"></th>
					<th style="width: 175px">X</th>
					<th style="width: 175px">Y</th>
					<th style="width: 175px">Vx</th>
					<th style="width: 175px">Vy</th>
				</tr>
				<tr v-for='ball in balls'>
					<td>{{ball.id}}</td>
					<td><div v-bind:style="[ball.ballStyle,{position: 'static'}]"></div></td>
					<td v-if="values[ball.id]">{{values[ball.id].x.toPrecision(6)}}</td>
					<td v-if="values[ball.id]">{{values[ball.id].y.toPrecision(6)}}</td>
					<td v-if="values[ball.id]">{{values[ball.id].vx.toPrecision(6)}}</td>
					<td v-if="values[ball.id]">{{values[ball.id].vy.toPrecision(6)}}</td>
				</tr>
			</table>
			</div>
		</div>
	</div>
		
		`
});