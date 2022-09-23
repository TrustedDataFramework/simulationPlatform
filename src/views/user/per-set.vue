<template>
	<div class="pageWrap">
	  <comheader ref="header" :pageNum="pageNum"></comheader>
	  <div class="mainbox">
    		<div class="mmain mmain-set">
    			 <div class="left-nav">
    			 	 <div class="title">{{$t('personal_set_title')}}</div>
    			 	 <div class="ava">
    			 	   <div class="avabox"><img src="../../assets/img/ava.png"/></div>
    			 	   <p class="prole">{{$t('administrator')}}</p>
    			 	  
    			 	 </div>
    			 	  <ul class="nav-ul">
    			 	   	 <li class="active" @click="linkrouter('changePaw')"><span>{{$t('change_Password')}}</span></li>
    			 	   	 <li @click="linkrouter('function')"><span>{{$t('Other_functions')}}</span></li>
    			 	   	 <li @click="linkrouter('function')"><span>{{$t('Other_functions')}}</span></li> 
    			 	   	 <li @click="linkrouter('function')"><span>{{$t('Other_functions')}}</span></li> 
    			 	   </ul>
    			 	   
    			 </div>
    			 <router-view ></router-view>
    		</div>
    </div>
	</div>
</template>

<script>
	import comheader from '@/components/sheader';
	export default{
		data(){
			return{
				pageNum:4,
			}
		},
		components:{
			comheader
		},
		methods:{
			linkrouter(path){
				this.$router.push({name:path})
			}
		},
		mounted(){
			 document.getElementsByTagName("body")[0].className="admin-body";
		},
		beforeDestroy() {
		 	 document.body.removeAttribute("class","admin-body");
		}
		
	}
</script>

<style scoped lang="less">
@import url("../../assets/css/per-set.less");
</style>