Vue.component('intervals-table', {
	data: function () {
	  return {
		data: []
	  }
	},
	methods:{
		update: function(){
			result=[]
			this.$refs.proper.forEach(
				function(item,index){
					result.push({
						bounce: item.bounce,
						delay: item.delay,
						time_first_bounce: item.time_first_bounce
					})
				}
			)
			this.data = result;
			this.$emit('update')
		}
	},
	mounted: function(){
		
		this.update()
	},
	props: {amount: Number, time: Number},
	// props: ['v0x','v0y'],
	template: `
		<td>
			<table>
				<intervals-item v-for='i in amount' :key=i v-bind:time=time ref=proper v-on:update="update" />
			</table>
		</td>
		`
});