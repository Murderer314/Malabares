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
	watch:{
		amount: function(newVal,oldVal){
			if(this.values.length>newVal){
				this.values.splice(newVal,this.values.length-newVal)
			}else if(this.values.length<newVal){
				diff = newVal-this.values.length
				for (let i = 0; i < diff; i++) {
					this.values.push({id: this.values.length+i})
				}
			}
		}
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
					v-bind:maxBounce=200
					v-bind:t0=item.t0
				/>
			</div>
		
			<label> Amount of balls: <input v-model.number="amount" type="number"></label>
		</div>
		<div class="col-md-5">
			<div class="table-responsive">
				<table class='table table-bordered table-striped table-condensed' style='background-color: black; color: white'>
					<tr>
						<th style="width: 15px">Id</th>
						<th style="width: 15px"></th>
						<th style="width: 75px">X</th>
						<th style="width: 75px">Y</th>
						<th style="width: 100px">Vx</th>
						<th style="width: 100px">Vy</th>
					</tr>
					<tr v-for='ball in amount'>
						<td>{{ball}}</td>
						<td><div v-bind:style="[balls[ball-1].ballStyle,{position: 'static'}]"></div></td>
						<td v-if="values[ball-1]">{{values[ball-1].x.toPrecision(6)}}</td>
						<td v-if="values[ball-1]">{{values[ball-1].y.toPrecision(6)}}</td>
						<td v-if="values[ball-1]">{{values[ball-1].vx.toPrecision(6)}}</td>
						<td v-if="values[ball-1]">{{values[ball-1].vy.toPrecision(6)}}</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
		
		`
});