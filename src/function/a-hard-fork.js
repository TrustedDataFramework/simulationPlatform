import comHeader from '@/components-teach/sheader';
import comFooter from '@/components-teach/footer';
import rightTips from '@/components-teach/tips';
import {visitCourse} from '@/API/api-teach'
export default{
	data(){
		return{
		  menuShow:false,//上方菜单按钮是否显示
		  showTool:false,//左侧工具箱是否显示
      confirShow:false,//右侧弹窗
		  funNum:0,//左侧点击判断工具箱
		  menuText:'软分叉与硬分叉',
		  category_id:'',//课程id
      iconUrl_1:require('../assets/teachImg/block_a.png'),//
		  step:1,//当前步骤
		  pageName:57,//
		  operaInfo:{mess:'暂无状态，请先按照右侧步骤提示操作~。',infolist:[]},//底部传递的信息
		  
      isPrompt:false,
	    promptText:'当前无工具可用！',
	    
	    isUpgrade:false,//是否点击升级
	    AchainList:[
	       {name:'创世区块',height:1}
	    ],//A链
	    singleStep:true,
	    AchainNumber:0,//当前区块数量
	    spaceTimer:null,//原区块定时器
	    showMess:false,
	    
	    attackSpaceTimer:null,//攻击区块定时器
	    
	    attack_number:0,//攻击number
	    
	    attackChainList:[]//攻击生成的新的链
		}
	},
	components:{
		comHeader,comFooter,rightTips
	},
	computed: {
		stepTips(){
			return this.$store.state.a_hardfork
		}
	},
	methods:{
		//知识点访问
	  getvisit(){  
		  let that = this
		  let obj = {}
		  obj.user_id = sessionStorage.getItem('stu_userId');
		  obj.category_id = that.category_id
		  visitCourse(obj).then(res=>{
        if(res.code==200){   
        }else{
        	 that.$toast(res.message,3000)
        }
      })
    },
		//点击菜单图标
	  clickMenu(){
	 	  this.menuShow = !this.menuShow
	  },
	  //点击弹出框我知道了方法
	  tipSure(){
	  	let that = this
	  	that.confirShow = false;
	  	if(that.step==1){
	  		that.step = that.step + 1;
	  	}
      
	  
	  },
    //当前无工具提示框
	  surePrompt(num){
	  	this.isPrompt = false;
	  },
   	//点击左侧工具箱
	  clickTool(){
	  	let that = this;
	  	that.menuShow = false;
	  	that.isPrompt = true;
	  },
    
    
    //点击升级    
    gotoStep(num){
      let that = this;
      /*
      that.step = that.step + 1;
      that.confirShow = true
      */
      that.isUpgrade=true;
      //定时器开启
      that.spaceTimer = setInterval(function(){
      	that.AchainNumber++;
      	let temp = that.AchainNumber+1
      	that.AchainList.push({'name:':'区块'+that.AchainNumber,height:temp})
      	//console.log(that.AchainNumber)
      	if(that.AchainNumber==5){
      		
      		clearInterval(that.spaceTimer)
      	}
      },5000)
      
     that.delayTimer = setTimeout(function(){
        //that.confirShow = true
        let temp = that.AchainNumber
        that.attackSpaceTimer =setInterval(function(){
        	that.attack_number++;	
        	that.attackChainList.push({name:'区块'+parseInt(temp+that.attack_number),height:parseInt(temp+that.attack_number)})
          if(that.attack_number==4){
          	clearInterval(that.attackSpaceTimer);
          	that.showMess=true;
          	that.step=that.step+1
          	that.delayTimer1 = setTimeout(function(){
          	 	that.confirShow = true
          	},1000)
          }
        },5000)
      },6000)
    },
    //提现金额提交完成
    D1clickfinish(){
      let that = this;
      that.step = that.step + 1;
      that.confirShow = true
    }
	},
  mounted(){
	  let that = this
	  this.menuText = '异常篇-'+this.$route.params.name
	 	that.category_id = this.$route.params.id;
	  that.$nextTick(() => {
	    that.confirShow = true
	    that.getvisit();
	  })
	},
  beforeDestroy() {
  	//页面关闭时清除定时器
  	if(this.spaceTimer){
  		 clearInterval(this.spaceTimer);
  	}
  	if(this.attackSpaceTimer){
  		clearInterval(this.spaceTimer);
  	}
	 
	  if(this.delaytimer){
	  	clearTimeout(this.delaytimer)
	  }
	  if(this.delayTimer1){
	  	clearTimeout(this.delaytimer)
	  }
	},
}
