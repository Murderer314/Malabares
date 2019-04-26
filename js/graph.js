Vue.component('graph', {
	data: function () {
	  return {
		amount: 0,
		width: 900,
		height: 400,
		values: {},
		table: {},
		handsHeight: 1,
		handsSeparation: 1
	  }
	},
	methods:{
		a(){
			console.log(this.$refs.ball1);
			alert(this.$refs.balll.length);
		},
		updateTable: function(){
			// this.table = this.$refs.table.balls
			// for (let key in this.table){
			// 	delete this.table.key
			// }
			this.table={}
			for (let key in this.$refs.table.balls){
				Vue.set(this.table, key, this.$refs.table.balls[key]);
				if(this.table[key].amount != this.table[key].intervals.length && this.table[key].amount>0){
					this.table[key].intervals = this.table[key].intervals.slice(0,this.table[key].amount)
				}
			}
			this.amount = Object.keys(this.table).length
			// this.$refs.table.balls.forEach(function(item, i) {
			// 	this.table[]
			// })
			this.$nextTick(function () {
				table = this.$refs.table
				ball = table.$refs.balls[0]
				interval = ball.$refs.intervals
				interval.$refs.proper[0].delay=interval.$refs.proper[0].delay+1
				interval.$refs.proper[0].delay=interval.$refs.proper[0].delay-1
			})
			this.$nextTick(function () {
			this.$forceUpdate(); 
			})
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
		balls_hands: function(){
			d = {}
			current=-1
			for (key in this.table){
				ball=this.table[key]
				id = ball.id
				d[id]={}
				intervalIndex=0
				for (key1 in ball.intervals){
					d[id][intervalIndex] = (current+1)/2
					intervalIndex +=1
					current*=-1
				}
			}
			return d
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
		this.$watch(
				() => {
					handsHeight = v.$refs.table.handsHeight
					v.handsHeight = (380*handsHeight)/4+'px';

					handsSeparation = v.$refs.table.handsSeparation
					v.handsSeparation = (880*handsSeparation)/4+'px';
					// realY = ((v.height-20)*dy)/4;
				}
		)
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
		'time': Number
	},
	template: `
	<div class="row">
		<div class="col-md-4">
			<properties-table v-bind:time='time' ref="table" v-on:update="updateTable"/>
		</div>
		<div class="col-md-6">
			<div class="content" v-bind:style="dimensions">
				<i class='far fa-hand-paper fa-rotate-180' 
					v-bind:style="{color:'white', 'font-size': '36px', bottom: handsHeight, position:'absolute'}">
				</i>
				<i class='far fa-hand-paper fa-flip-vertical' 
					v-bind:style="{color:'white', 'font-size': '36px', bottom: handsHeight,left: handsSeparation, position:'absolute'}">
				</i>
				<template v-for="item in table">
				<ball v-for="(interval,index) in item.intervals"
					:key='item.id+" "+index'
					ref="balls"
					v-bind:id=item.id
					v-bind:t="time"
					v-bind:color=item.color
					v-bind:r=item.r
					v-bind:time_first_bounce=interval.time_first_bounce
					v-bind:delay=interval.delay
					v-bind:hand=balls_hands[item.id][index]
					v-bind:maxBounce=interval.bounce
					v-bind:intervals=item.intervals
					v-bind:handsHeight=$refs.table.handsHeight
					v-bind:handsSeparation=$refs.table.handsSeparation
				/>
				</template>
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