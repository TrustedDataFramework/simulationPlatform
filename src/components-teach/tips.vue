<template>
	<div class="staDiv tipsDiv">
	  <div class="stabox">
	  	<h3 class="tipTitle">步骤提示</h3>
	  	<ul v-for="(item,index) in stepTips" :key="index" v-if="step==item.step && !singleStep">
	  		<li v-for="(item,index) in item.infolist" :key="index">{{item}}</li>
	  	</ul>
	  	
	  	<ul v-for="(item,index) in stepTips" :key="index" v-if="singleStep">
	  		<li v-for="(item,index) in item.infolist" :key="index">{{item}}</li>
	  	</ul>
	  	
	  	
	  	<!--<a class="btn_next"></a>-->
	  </div>
	  <div class="transbox" v-if="confirShow"></div>
	  <div class="confirmBox " :class="{'show':confirShow,'a-ma-confirmBox':pageName==54 && step==1}">
	  	
	  	<div class="c_box">
	  		<p class="title">{{tipTiltle}}</p>
	  		<p>{{confirmInfo}}</p>
	  		
	  	</div>
	  	<a class="sureBtn" @click="sureTip">我知道了</a>
	  	<div class="icon"></div>
	  </div>
	  
	  <template v-if="pageName==3">
	  <div class="transbox" v-if="isShowAttack">  	 
	  </div>
	  <div class="confirmBox fileConfirmBox" :class="{'show':isShowAttack}">
	 	  <div class="c_box">
  	 	  <p class="title">请注意!</p>
  	 	  <p>当前用户A正准备向用户B发送“文件A”，是否指派用户C对该文件发起攻击？</p>
  	 	  <div class="btnbox">
  	 	  	 <a class="chooseBtn" @click="attackMode(1)">攻击</a>
  	 	  	 <a class="chooseBtn" @click="attackMode(2)">不攻击</a>
  	 	  </div> 
	 	  </div>
	 	  <div class="icon"></div>
	 </div>
	  </template>
	  <!--椭圆线是否展示-->
	  <template v-if="pageName==5">
	  	 <div class="transbox" v-if="lineDrawShow">    
	     </div>
	     <div class="confirmBox fileConfirmBox eccConfirmBox n-eccConfirmBox_1" :class="{'show':lineDrawShow}">
			 	  <div class="c_box">
		  	 	  <p class="title">椭圆线方程曲线：y²=x²+ax+b</p>
		  	 	  <p class="c_mess">(通过下方输入不同的a，b值生成不同的椭圆线）</p>
		  	 	  <div class="ecc-in">
		  	 	  	 <div class="e-in"><label>a:</label><input placeholder="请输入1-3的值" v-model="a" maxlength="1" @input='showLine'/></div>
		  	 	  	 <div class="e-in e-in-last"><label>b:</label><input placeholder="请输入1-3的值" v-model="b" maxlength="1" @input='showLine'/></div>  	 
		  	 	  </div>
		  	 	  <div class="ec-img"><img :src="abimg"/></div>
		  	 	  <div class="btnbox">
		  	 	  	 <a class="chooseBtn" @click="sureLine">确定</a>	  	 	  	 
		  	 	  </div> 
			 	  </div>
			 	  <div class="icon"></div>
			 </div>
	  </template>
	  
	  <!--椭圆线划线成功-->
	  <template v-if="pageName==5">
	  	 <div class="transbox" v-if="lineFinsh">    
	     </div>
	     <div class="confirmBox fileConfirmBox eccConfirmBox n-eccConfirmBox_2" :class="{'show':lineFinsh}">
			 	  <div class="c_box">
		  	 	  <p class="title result_title">假设我们现在有个点为（3，4），我们通过点的加法计算对这个点进行10次相加计算获得新的点（9，6），如下图所示：</p>		  	 	  
		  	 	  <div class="ec-img result-img"><img src="../assets/ecc/result.jpg"/></div>
		  	 	  <p class="c_mess result_mess">通过点的加法计算，我们可以得知，相加的次数为私钥，获得的新点为公钥：</p>
		  	 	  <p class="c_mess result_mess">私钥：d2qwe3q1we25q1we3q2w12fas5f14dgf51wer2w1erew</p>
		  	 	  <p class="c_mess result_mess">公钥：21w32e1wq5r12f1s5ewr1w3er12ew3r1we5we1twe35q</p>
		  	 	  <div class="btnbox">
		  	 	  	 <a class="chooseBtn" @click="surePoint">确定</a>	  	 	  	 
		  	 	  </div> 
			 	  </div>
			 	  <div class="icon"></div>
			 </div>
	  </template>
	  
	  <!--椭圆线-->
    <template v-if="pageName==5">
		  <div class="transbox" v-if="isParse">  	 
		  </div>
		  <div class="confirmBox fileConfirmBox parseconfirmbox" :class="{'show':isParse}">
		 	  <div class="c_box">
	  	 	  <p class="title">请注意!</p>
	  	 	  <p class="pintro">
	  	 	  	 {{step==2?'加密数据正在传输中。C用户试图使用公开密钥破解数据。':'加密数据已传输成功。用户B使用自己保存的私钥对数据进行解析。'}}
	  	 	  </p>
	  	 	  <div class="progress" >
						<div class="curPro">
							<div class="proIcon" :style="{'width':wprogress+'%'}" v-if="wprogress!=100"></div>
							<p class="failtext" v-if="wprogress==100">{{step=='2'?'解析失败!':'解析成功！'}}</p>
						</div>
					</div>
					<p class="pintro functintro" v-if="wprogress==100">
						{{step==2?'公钥用于加密，私钥用于解密。且从公钥推算私钥，从计算难度上来说不可行。':'恭喜你解析成功，数据内容为：XXXXXXXXXXXXXXXXXXXXXXX'}}
					</p>
					<div class="btnbox">
	  	 	  	 <a class="chooseBtn" @click="sureParse" v-if="wprogress==100">确定</a>	  	 	  	 
	  	 	  </div>
		 	  </div>
		 	  <div class="icon"></div>
		 </div>
	  </template >
	  
	  <!--加密算法操作提示框异常篇52软分叉，56智能合约,57硬分叉-->
	  <template v-if="pageName==6 || pageName==4 || pageName==56 || pageName==52 || pageName==57">
	  	 <div class="transbox" v-if="isPrompt" ></div>
	  	 <div class="confirmBox promptBox" :class="{'show':isPrompt}">
	  	 	  <p class="pintro">
	  	 	  	 {{promptText}}
	  	 	  </p>
	  	 	  <div class="com-btnBox">
	  	 	  	<span class="com-btn" @click="surePrompt">确定</span>
	  	 	  </div>
	  	 	  <div class="icon"></div>
	  	 </div>
	  	 
	  </template>
	  
	  
	  <!--51%攻击转账-->
    <template v-if="pageName==51  && step==1">
      <div class="transbox" v-if="lineDraw51Show && step<=2" @click="hideLineDrawShow"></div>
      <div class="confirmBox fileConfirmBox confirmBox51"  :class="{'show':lineDraw51Show}" 
      	style="width:350px;height:380px;margin-left: -170px;margin-top: -200px;font-size: 18px">
        <div class="c_box">
          <div class="main_form">
            <div class="cr_din">
              <span class="lab">账户余额：</span>
              <div  class="lab_in">
                <span>￥{{balance}}</span>
              </div>
            </div>
           <div class="cr_din">
              <span class="lab">可用余额：</span>
              <div class="lab_in">
                <span>￥{{useBalance}}</span>
              </div>
            </div>
            <div class="cr_din" >
              <span class="lab">转账发起：</span>
              <div class="lab_in">
                <div style="margin: auto;padding: 0;width:150px">
                  <i-select v-model="tansferInfo.initiate" @on-change="selectUser">
                    <i-option v-for="(item,index) in userList" :value="item.userId" :key="index">{{item.name}}</i-option>
                  </i-select>
                </div>
              </div>
            </div>
            <div class="cr_din">
              <span class="lab">转账对象：</span>
              <div class="lab_in">
                <div style="margin: auto;padding: 0;width:150px">
                  <i-select v-model="tansferInfo.object">
                     <i-option v-for="(item,index) in toList" :value="item.userId" :key="index">{{item.name}}</i-option>
                  </i-select>
                </div>
              </div>
            </div>
            <div class="cr_din" >
              <span class="lab">转账金额：</span>
              <div class="lab_in">
                <div><i-input  placeholder="" v-model="tansferInfo.amount" style="width:150px"></i-input></div>
              </div>
            </div>
          </div>
          <div class="btnbox">
            <a class="chooseBtn" @click="sureTransfer(1)">确定转账</a>
          </div>
        </div>
        <div class="icon"></div>
      </div>
    </template>
    <!--提升算力-->
    <template v-if="pageName==51  && step==2">
      <div class="transbox" v-if="lineDraw51Show">
      </div>
      <div class="confirmBox fileConfirmBox confirmBox51" :class="{'show':lineDraw51Show}" style="width:340px;margin-left: -170px;margin-top: -200px;font-size: 18px">
        <div class="c_box">
          <div class="main_form">
            <div class="cr_din cr_din_obj" >
              <span class="lab" >提升对象：</span>
              <div class="lab_in">
                <i-select style="width:150px" v-model="upComputeUser">
                  <i-option v-for="(item,index) in userList" :value="item.userId" :key="index">{{item.name}}</i-option>
                </i-select>
              </div>
            </div>
            <div class="cr_din cr_din_value">
              <span style="margin: auto;color: white">{{computevalue}}%</span>
              <div class="block" style="width:80%;margin: auto;">
                <el-slider v-model="computevalue"></el-slider>
              </div>
              <span style="margin: auto;color: white">请提升算力值最低至51%</span>
            </div>
          </div>
          <div class="btnbox">
            <a class="chooseBtn" @click="sureUpCompute">确定</a>
          </div>
        </div>
        <div class="icon"></div>
      </div>
    </template>
    <!--打包-->
    <template v-if="pageName==51 && step == 3 &&　!isShowDelete">
      <div class="transbox" v-if="lineDraw51Show">
      </div>
      <div class="confirmBox fileConfirmBox parseconfirmbox a-51parseconfirmbox " :class="{'show':lineDraw51Show}">
        <div class="c_box">
          <p class="pintro">
            正在打包剩余事务
          </p>
          <div class="progress" >
            <div class="curPro">
              <div class="proIcon" :style="{'width':wprogress51+'%'}"></div>
            </div>
          </div>
          <!--<div class="btnbox">
            <a class="chooseBtn" @click="sureBale" v-if="wprogress51==100">确定</a>
          </div>-->
        </div>
        <div class="icon"></div>
      </div>
    </template >
    <!--删除提示-->
    <template v-if="pageName==51 && isShowDelete">
      <div class="transbox" v-if="lineDraw51Show ">
      </div>
      <div class="confirmBox fileConfirmBox eccConfirmBox block-51Confirmbox" :class="{'show':lineDraw51Show}">
        <div class="c_box">
          <p class="title">请注意</p>
          <p>是否删除该事务</p>
          <div class="btnbox">
            <a class="chooseBtn" @click="del">确认</a>
            <a class="chooseBtn" @click="canc">取消</a>
          </div>
        </div>
        <div class="icon"></div>
      </div>
    </template>
    
    <!--交易延展性转账-->
    <template v-if="pageName==54  && step<=2 && editNumber==0 &&　!D1">
      <div class="transbox" v-if="lineDrawMalleabilityShow && step==1" @click="hideLineDrawShow">
      </div>
      <div class="confirmBox fileConfirmBox confirmBox51 " :class="{'show':lineDrawMalleabilityShow}" style="width:340px;margin-left: -170px;margin-top: -200px;font-size: 18px">
        <div class="c_box">
          <div class="main_form">
            <div class="cr_din">
              <span class="lab">账户余额：</span>
              <div  class="lab_in">
                <span>￥{{balance}}</span>
              </div>
            </div>
            <div class="cr_din" >
              <span class="lab">转账发起：</span>
              <div class="lab_in">
                <div style="margin: auto;padding: 0;width:150px">
                  <i-select v-model="tansferInfo.initiate" @on-change="selectUser">
                    <i-option v-for="(item,index) in userList" :value="item.userId" :key="index">{{item.name}}</i-option>
                  </i-select>
                </div>
              </div>
            </div>
            <div class="cr_din">
              <span class="lab">转账对象：</span>
              <div class="lab_in">
                <div style="margin: auto;padding: 0;width:150px">
                  <i-select v-model="tansferInfo.object">
                     <i-option v-for="(item,index) in toList" :value="item.userId" :key="index">{{item.name}}</i-option>
                  </i-select>
                </div>
              </div>
            </div>
            <div class="cr_din" >
              <span class="lab">转账金额：</span>
              <div class="lab_in">
                <div><i-input  placeholder="" v-model="tansferInfo.amount" style="width:150px"></i-input></div>
              </div>
            </div>
          </div>
          <div class="btnbox">
            <a class="chooseBtn" @click="sureTransfer(2)">确定转账</a>
          </div>
        </div>
        <div class="icon"></div>
      </div>
    </template>
    <!--交易延展性修改-->
    <template v-if="pageName==54  && D1 &&　step<4">
      <div class="transbox" v-if="lineDrawMalleabilityShow && step==3" @click="hideLineDrawShow">
      </div>
      <div class="confirmBox fileConfirmBox eccConfirmBox am-affair-ConfirmBox" 
      	:class="{'show':lineDrawMalleabilityShow}" 
      	style="width:400px;margin-left: -170px;margin-top: -200px;font-size: 18px; height: 350px;">
        <div class="c_box">
          <div style="margin: auto;width:80%">
            <div class="cr_din" style="margin-top: 20px;color: white"> 已截获到未打包到链中的事务 </div>
            <div class="cr_din" style="display: flex;margin-top: 20px">
              <span class="lab" style="line-height: 32px;color:#fff">选择事务：</span>
              <div style="margin: auto;padding: 0">
                <div style="margin: auto;padding: 0;width:200px">
                  <i-select v-model="selectIndexData" @on-change="upToEditAmount">
                    <i-option v-for="(item,index) in selectIndexDataM" :value="item.id" :key="index" v-if="!item.isEdit">事务{{index+1}}</i-option>
                  </i-select>
                </div>
              </div>
            </div>
            <div class="cr_din" style="display: flex;margin-top: 20px">
              <span class="lab" style="line-height: 32px;color:#fff">修改金额：</span>
              <div style="margin: auto;padding: 0;width:200px">
                <input class="a-mallattack-input" :placeholder="'只能将金额修改为' + toEditAmount" style="width:100%;border-radius: 5px" type="" v-model="editAmount"/>
              </div>
            </div>
          </div>
          <div class="btnbox">
            <a class="chooseBtn" @click="sureEditAmount">确定修改</a>
          </div>
        </div>
        <div class="icon"></div>
      </div>
    </template>
    <!--打包-->
    <template v-if="pageName==54 && step == 4">
      <div class="transbox" v-if="lineDrawMalleabilityShow">
      </div>
      <div class="confirmBox fileConfirmBox parseconfirmbox" :class="{'show':lineDrawMalleabilityShow}"
      	 style="height: 280px;"
      	>
        <div class="c_box">
          <p class="pintro">原转账数据与修改过后的数据，正在竞争打包进入区块！</p>
          <div class="progress" >
            <div class="curPro">
              <div class="proIcon" :style="{'width':wprogressmalleability+'%'}"></div>
            </div>
          </div>
          <!--<div class="btnbox">
            <a class="chooseBtn" @click="sureBale" v-if="wprogress51==100">确定</a>
          </div>-->
        </div>
        <div class="icon"></div>
      </div>
    </template >
    
    <!--重放攻击广播-->
     <template v-if="pageName==53 && (broadcastNumber==1 &&　step==2)　||　(broadcastNumber==2 &&　step==4)">
      <div class="transbox" v-if="lineDraw53Show">
      </div>
      <div class="confirmBox fileConfirmBox parseconfirmbox replay-confirmBox " :class="{'show':lineDraw53Show}">
        <div class="c_box">
          <p class="pintro">{{step==2?'用户A给用户B的转账正在广播':'当前把黑客截取事务在B链中广播'}}</p>
          <div class="progress" >
            <div class="curPro">
              <div class="proIcon" :style="{'width':wprogress+'%'}"></div>
            </div>
          </div>
        </div>
        <div class="icon"></div>
      </div>
    </template >
    <!--重放攻击截获-->
    <template v-if="pageName==53 &&　step==3">
      <div class="transbox" v-if="lineDraw53Show">
      </div>
      <div class="confirmBox fileConfirmBox parseconfirmbox replay-confirmBox" :class="{'show':lineDraw53Show}">
        <div class="c_box">
          <p class="pintro">请注意，黑客正在截获未打包进链的事务</p>
          <div class="progress" >
            <div class="curPro">
              <div class="proIcon" :style="{'width':wprogress+'%'}"></div>
            </div>
          </div>
        </div>
        <div class="icon"></div>
      </div>
    </template >
    <!--重放攻击打包-->
    <template v-if="pageName==53 && step==5">
      <div class="transbox" v-if="lineDraw53Show">
      </div>
      <div class="confirmBox fileConfirmBox parseconfirmbox replay-confirmBox" :class="{'show':lineDraw53Show}">
        <div class="c_box">
          <p class="pintro">正在打包事务</p>
          <div class="progress" >
            <div class="curPro">
              <div class="proIcon" :style="{'width':wprogress+'%'}"></div>
            </div>
          </div>
        </div>
        <div class="icon"></div>
      </div>
    </template >
	  <!--重放攻击-->
		<template v-if="pageName==53">
		  <div class="transbox" v-if="D2"  @click="hideTrans">
		  </div>
		  <div class="confirmBox fileConfirmBox eccConfirmBox a-replay-attack" style="margin-top: -240px" :class="{'show':D2}">
		    <div class="c_box">
		      <div class="ecc-in">
		        <div class="e-in"><span>转账发起：用户1</span></div>
		      </div>
		      <div class="ecc-in">
		        <div class="e-in"><span>转账对象：用户2</span></div>
		      </div>
		      <div class="ecc-in">
		        <div class="e-in"><span>转账金额:</span><input placeholder="请输入转账金额"  maxlength="3" v-model="aa_vaule"  @change="validateNum($event)"/></div>
		      </div>
		      <div class="ecc-in">
		        <div class="e-in"><span>转账发起余额：∞</span></div>
		      </div>
		      <div class="btnbox">
		        <a class="chooseBtn" @click="D2click">确定转账</a>
		      </div>
		    </div>
		    <div class="icon"></div>
		  </div>
		</template>

		<!--合约漏洞提现金额-->
		<template v-if="pageName==56" >
			  <div class="transbox" v-if="D1" >
			  </div>
			  <div class="confirmBox fileConfirmBox eccConfirmBox" style="margin-top: -240px;height: 300px" :class="{'show':D1}">
			    <div class="c_box">
			      <div class="ecc-in" style="margin-top:40px;">
			        <div class="e-in"><label style="left: -60px;">提现金额:</label><input placeholder="请输入转账金额"  maxlength="10"  value="1" readonly="true"/></div>
			      </div>
			      <div class="btnbox">
			        <a class="chooseBtn" @click="D1click">确定提现</a>
			      </div>
			    </div>
			    <div class="icon"></div>
			  </div>
		</template>

	</div>
</template>

<script>
	export default{
		data(){
			return{				
				tipTiltle:'',//弹出确认框的标题
			  confirmInfo:'',
			  isAttack:0,
			  
			  a:'',//椭圆线a的值
			  b:'',//椭圆线b的值
			  abimg:require('../assets/ecc/11.jpg'),//根据a、b生成的椭圆线
			  lineFinsh:false,//椭圆线是否生成
			   /*51%攻击*/
        computevalue: 0, //算力值
        tansferInfo: {
          initiate: '',
          object: '',
          amount: ''
        },
        upComputeUser: '没有人', //提升算力对象
        editAmount: '', //异常篇-交易延展性攻击
        
        toList:[], //51%攻击可转对象list
        balance: 0,//账户余额
        useBalance:0, //可用余额
        selectIndexData:'',//交易延展性当前修改的事务
        aa_vaule:'',//重放攻击转账金额
			}
		},
		//pageName为1表示当前页面是节点操作   2发币  3hash算法 4keyStore模拟  5椭圆线密码  2-4区块链+版权  
		//confirShow:''是否展示提示框
		//winNum：表示胜出的节点
		props:{confirShow:Boolean,pageName:null,step:Number,stepTips:null,winNum:null,
			 isShowAttack:{
			 	type:Boolean,
			 	default:false
			 },
			 //椭圆线画图是否展示
			 lineDrawShow:{
			 	 type:Boolean,
			 	 default:false
			 },
			 //解析进度
			 wprogress:{
			 	type:null,
			 	default:0
			 },
			 //解析那个进度是否显示
			 isParse:{
			 	type:Boolean,
			 	default:false
			 },
			 //是否是操作提示款
			 isPrompt:{
			 	 	type:Boolean,
			   	default:false
			 },
			 //提示框输入的内容是否正确
			 isRight:{
			 		type:Boolean,
			   	default:false
			 },
			 //提示内容
			 promptText:{
			 	 	type:null,
			   	default:''
			 },
			 
			 //是否是一个步骤提示
			 singleStep:{
			   	type:Boolean,
			   	default:false
			 },
			toEditAmount: '',
			 // 51%攻击是否显示
       lineDraw51Show: {
         type:Boolean,
         default:false
       },
       //51攻击用户列表
       userList:{
       	type:Array,
		    default:function(){
            return []
        }
       },
      // 解析进度
       wprogress51:{
         type:null,
         default:0
       },
       isShowDelete:{
       	type:null,
        default:false
       },
      // 延展性攻击
      lineDrawMalleabilityShow: {
        type:Boolean,
        default:false
      },
      editNumber:{
      	type:null,
      	default:0
      },
      selectIndexDataM: {
		    type:Array,
		    default:function(){
            return []
        }
      },
      //合约提现
      D1:{
        type:Boolean,
        default:false
      },
      //重放攻击转账
      D2:{
        type:Boolean,
        default:false
      },
      lineDraw53Show: {
        type:Boolean,
        default:false
      },
      inputMoney: {
        type:null,
        default:false
      },
      wprogressmalleability:{
        type:null,
        default:0
      },
      //重放攻击广播次数
      broadcastNumber:{
        type:null,
        default:0
      },
      //是否截获
      
      isIntercept:{
        type:null,
        default:false
      }
      
			
		},
		
		watch:{
			 
		 'a': function(val){
				this.a = val.replace(/[^1-3]/g, '')
				
			},
      
      'b': function(val){
				this.b = val.replace(/[^1-3]/g, '')
			},
			
			//51%攻击	
			'lineDraw51Show':function(){
        this.tansferInfo.initiate='';
        this.tansferInfo.object='';
        this.tansferInfo.amount='';
        this.balance=0
        this.useBalance=0
		  },
		  //交易延展性
		  'lineDrawMalleabilityShow':function(){
        this.tansferInfo.initiate='';
        this.tansferInfo.object='';
        this.tansferInfo.amount='';
        this.balance=0
		  },
		  //重放攻击
		  'D2':function(){
		  	this.aa_vaule='';
		  },
			  

			'confirShow':function(){
				let that = this;	
				if(that.pageName=='1'){ 	 
				  that.confirmInfo = that.step==1?'节点已全部启动完成，请按照右侧步骤提示栏进行下一步操作。':that.step==2?'节点难度计算已完成，恭喜节点'+that.winNum+'获得胜利并出块成功！请按照右侧步骤'+
'提示栏进行下一步操作。':'获胜节点已完成区块打包并顺利广播。为了犒劳该节点的辛苦工作，系统将给予一定奖励！至此，节点模拟运行已结束，用户可点击右上角的重置进行重新操作，或返回主界面选择其他篇章。'	  
				   return;
				}
			  if(that.pageName=='2'){
			    switch(that.step){
				   case 1:
				   	that.confirmInfo = '当前网络中已有四名用户，请按照右侧步骤提示栏进行下一步操作'
				   	break;
				   case 2:
				   	that.confirmInfo = '币种的初始设置已完成，请按照右侧步骤提示栏进行下一步操作。'
				   	break;
				   case 3:
				   	that.confirmInfo = '一个转账智能合约已部署完毕，你可以和其他用户之间进行相互转账啦！'
				   	break;
			   }				
				   return;
				}
			 if(that.pageName=='2-multiple'){
			 	switch(that.step){
				   case 1:
				   	that.confirmInfo = '当前小组已有4人在线，请按照右侧步骤提示栏进行下一步操作'
				   	break;
				   case 2:
				   	that.confirmInfo = '币种的初始设置已完成，请按照右侧步骤提示栏进行下一步操作。'
				   	break;
				   case 3:
				   	that.confirmInfo = '一个转账智能合约已部署完毕，你可以和其他用户之间进行相互转账啦！'
				   	break;
			   }				
				   return;
			 }
			 if(that.pageName == '3'){
			 	   if(that.confirShow ==true){
				   switch(that.step){
					   case 0:
					    that.tipTiltle = '哈希算法的基本概念及特点'
					   	that.confirmInfo = '哈希算法是区块链中保证交易信息不被篡改的单向密码机制。哈希算法接收一段铭文后，以一种不可逆的方式将其转化成一段长度较短、'+
					   	'位数固定的散列数据。它有两个特点：一是加密过程不可逆，意味着我们无法通过输出的散列数据倒推原本的铭文是什么；'+
					   	'二是输入的铭文与输出的散列数据一一对应，任何一个输入信息的变化，都必将导致最终输出的散列数据的变化。'
					   	break;
					   case 1:
					    that.tipTiltle = '请注意';
					   	that.confirmInfo = '已通过哈希计算为“文件A”生成哈希值，请按照右侧步骤提示栏进行下一步操作'
					   	break;
					   case 2:
					    that.tipTiltle = '请注意'; 
					   	that.confirmInfo = this.isAttack==1?'“文件A”在传送的过程中遭到了来自用户C的攻击！':'“文件A”传输成功，中途没有遭受攻击！'
					   	break;
					   	case 3:
					    that.tipTiltle = '';
					    let tmp ='通过本场景的哈希算法模拟，我们可以了解到在区块链中，哈希值能够唯一而准确地标识一个区块，'+
					     '区块链中任意节点通过简单的哈希计算可以获得这个区块的哈希值，计算出的哈希值没有变化也就意味着区块中的信息没有被篡改，反之亦然。'+
                '哈希算法模拟已结束，点击右上方的重置按钮可进行再次体验哦。'
					    that.confirmInfo = this.isAttack==1?'由A输送过来的“文件A”已被篡改，hash值已产生变化！'+tmp:
					    '由A输送过来的“文件A”未被篡改，hash值未产生变化!'+tmp
					   	//that.confirmInfo = '哈希算法模拟已结束，大概概括模拟内容，并告知可通过右上方重置 按钮体验“攻击”时的模拟情况。'
					   	break;
				   }
					return;
					}
				}
			 if(that.pageName == '4'){
					that.confirmInfo = '通过本场景的Keystore模拟，我们可知这是通过对称加密将私钥进行加密保护的一种手段，而加密保护后生成的字符，即为Keystore。'+
            'Keysotre模拟已结束，点击右上方的重置按钮可再次体验哦。'
					return; 
				}
			 
			 if(that.pageName == '5'){
			 	if(that.confirShow == true){
				 	 switch(that.step){
					   case 1:
					    that.tipTiltle = '椭圆线密码学的基本概念和特点'
					   	that.confirmInfo = '椭圆曲线密码学是基于椭圆曲线数学的一种建立公开密钥加密的算法，属于非对称加密算法，'+
					   	  '需要两个密钥——公开密钥和私有密钥。在区块链中利用椭圆曲线生成公私钥较为方便，处理速度快，且安全性较高。'
					   	break;
					   case 2:
					      that.tipTiltle = '请注意'
					      that.confirmInfo = '用户B已成功通过椭圆线密码算法生成公钥与私钥，并将公钥公布出去。'
					    break;
					   	case 4:
					    that.tipTiltle = '';
					   	that.confirmInfo = '通过本场景的椭圆线算法模拟，我们可以直观了解到利用椭圆线生成公钥和私钥的过程，以及如何利用公钥和私钥对数据进行加解密。'+
	'椭圆线算法模拟已结束，点击右上方的重置按钮可再次体验哦。'
					   	break;
				   }
				 	 return; 
			  }
			 }
	     if(that.pageName == '6'){
			 	 switch(that.step){
				   case 0:
				    that.tipTiltle = '对称加密的基本概念及特点'
				   	that.confirmInfo = '对称加密的基本概念及特点：采用单钥密码的加密方法,同一个密钥可以同时用来加密和解密,这种加密方法称为对称加密。'+
                '其特点是算法公开、计算量小、加密速度快，但需要提前共享密钥，一旦密钥泄露，加密信息就会被破解。'
				   	break;
				   	case 3:
               that.tipTiltle = '';
				   	that.confirmInfo = '通过本场景的对称密钥算法模拟，我们利用简单的单钥实现了对数据的加解密。'+
               '对称密钥算法模拟已结束，点击右上方的重置按钮可再次体验哦。'
				   	break;
			   }
			 	 return; 
			 }
	     if(that.pageName == '2-1'){
					that.confirmInfo = '在这一场景中，我们变换了不同的角色（医院A/B/C和病人）来体验区块链在病历信息共享及病人隐私保护上的实际应用。'+
'至此，病例信息共享场景已模拟完毕，点击右上角重置按钮可再次体验哦。'
					return					
				}
	     if(that.pageName == '2-2'){
					that.confirmInfo = '在这一场景中，我们作为捐赠过程中的不同角色（捐赠人、红十字会、受益人）来体验了区块链在应对公益信任危机上的实际应用。'+
            '至此，捐赠数据确权场景已模拟完毕，点击右上角重置按钮可再次体验哦。'
					return					
				}
			 if(that.pageName == '2-3'){
					that.confirmInfo = '在这一场景中，我们作为版权登记过程中的不同角色（登记人、出版社、查证处）来体验了区块链在数据存证方面的实际应用。'+
            '至此，作品版权存证场景已模拟完毕，点击右上角的重置按钮可再次体验哦。'
					return					
				}
			 if(that.pageName == '2-4'){
					that.confirmInfo = '在这一场景中，我们作为物流过程中的不同角色（寄件人、代收点、物流、收件人）来体验了区块链在精确溯源上的实际应用。'+
             '至此，物流过程溯源场景已模拟完毕，点击右上角重置按钮可再次体验哦。'
					return					
				}
			 if(that.pageName == '2-5'){
					that.confirmInfo = '在这一场景中，我们作为供应链金融中的不同角色（供应商、核心企业、银行）来体验了区块链针对微小企业向银行贷款难问题所做的实际应用。'+
'至此，供应链金融审计场景已模拟完毕，点击右上角重置按钮可再次体验哦。'
					return					
				}
			 if(that.pageName == '2-6'){
					that.confirmInfo = '在这一场景中，我们作为航空延误险处理中的不同角色（投保人、航空公司、保险公司）来体验了区块链在简化理赔流程上的实际应用。'+
'至此，快速保单处理场景已模拟完毕，点击右上角重置按钮可再次体验哦。'
					return					
				}
			 
			 if(that.pageName == '51') {
			 	 //console.log(that.step)
          switch(that.step){
            case 1:
              //表示转账发起的弹出框
              //console.log(that.D1+'1233')
              if(that.D1){
              	that.tipTiltle = '请注意'
                that.confirmInfo = '转账交易已发起，区块正在等待被打包，尚未进入主链。'
              }else{
              	that.tipTiltle = '51%攻击的基本概念和危害'
                that.confirmInfo = '所谓51%算力攻击，是指当一笔交易已经发生但仍处于内存池中等待被打包，即尚未被记入到主链中去的时候，'+
               '攻击者利用自己的优势算力占据打包权并篡改区块链上的记录，从而达到撤销已付款交易的目的。'+
               '算力攻击一旦发生，人们对区块链网络的信心就会降至冰点，区块链货币的币值将受到重创。'
              }
              
              break;
            case 2:
              that.tipTiltle = '请注意'
              that.confirmInfo = '当前' + that.upComputeUser + '用户的算力值已达51%，已超过全网算力值的一半水平，即表明用户' + that.upComputeUser + '已具备攻击区块链网络安全的功能'
              break;
            case 4:
              
              break;
            case 12:
              that.tipTitle = ''
              that.confirmInfo = '51%攻击是可能发生的，但从经济收益的角度来说，占据优势算力是需要付出巨大代价的，'+
                '一旦发起攻击则会造成币值暴跌，最后很可能得不偿失。所以现实中发生的可能性并不高。'+
                '至此，51%攻击的攻击过程已模拟完毕，点击右上角重置按钮可再次体验哦。'
              break;
          }
          return;
        }
        if(that.pageName == '54') {
          switch(that.step){
            case 1:
              that.tipTiltle = '交易延展性的基本概念及危害性'
              that.confirmInfo = '交易延展性源于比特币源代码中的一个错误。这个错误，可以在不改变交易输出或交易内容的情况下更改交易ID。'+
              '这个错误意味着在交易被矿工写入区块之前，交易签名可以被更改。'+
              '换句话说，也就是一笔未被确认的比特币交易，有可能被黑客造出两笔合法的交易。'+
              '虽然，矿机最终只会确认一笔交易，而且交易的输出保持不变，你的比特币还是会转给预期的收款人。但是交易ID变动会导致后续的'+
              '哈希值都完全改变。黑客可利用交易延展性对交易所进行攻击。曾经最大的比特币交易所——Mt.Gox宣布倒闭的部分原因就是延展性攻击'
              break;
            case 2:
              that.tipTiltle = '请注意'
              that.confirmInfo = '转账已发起成功，但区块还未被打包到链中。'
              break;
            case 12:
              that.tipTitle = '请注意'
              that.confirmInfo = '打包结束，修改过后的数据代替原转账数据被打包进链，金额实际已到账。但由于交易ID发生'+
               '改变，所以被修改的交易事务无法查询到，交易结果显示为“交易未完成”。'
              break;
          }
          return;
        }
        //52软分叉
        if(that.pageName == '52'){
          if(that.confirShow == true){
            switch(that.step){
              case 1:
                that.tipTiltle = '软分叉的基本概念及特点'
                that.confirmInfo = '分叉指的是区块链在进行升级时发生了意见分歧，从而导致区块链分叉。根据分叉后新旧节点的相互兼容性，又分为硬分叉和软分叉。'+
                '若旧节点不能发现新协议的变化，从而继续接受新节点用新协议所挖出的区块，这种情况就称为软分叉。'
                break;
              default:
                that.tipTiltle = '请注意!'
                that.confirmInfo = '软分叉模拟已结束，可点击右上方的重置或者返回。'
                break;
             
            }
            return;
          }
        }
        //57硬分叉
        if(that.pageName == '57'){
          if(that.confirShow == true){
            switch(that.step){
              case 1:
                that.tipTiltle = '硬分叉的基本概念及特点'
                that.confirmInfo = '分叉指的是区块链在进行升级时发生了意见分歧，从而导致区块链分叉。根据分叉后新旧节点的相互兼容性，又分为硬分叉和软分叉。'+
                '当系统中出现了新版本的软件，并且和之前的版本软件不能兼容，旧节点无法接受新节点挖出的全部或部分区块，导致同时出现两条链，这种情况称为硬分叉。'
                break;
              default:
                that.tipTiltle = '请注意!'
                that.confirmInfo = '硬分叉模拟已结束，可点击右上方的重置或者返回。'
                break;
             
            }
            return;
          }
        }
        if(that.pageName == '53'){
          if(that.confirShow == true){
            switch(that.step){
              case 1:
                that.tipTiltle = '重放攻击的基本概念及特点'
                that.confirmInfo = '重放，顾名思义就是重复播放的意思。重放攻击又称重播攻击、回放攻击，指攻击者发送一个目的主机已接收过的数据包，'+
                '来达到欺骗系统的目的。在区块链技术中，重放攻击通常出现在区块链硬分叉的时候。由于硬分叉的两条链，'+
                '它们的地址和私钥生产的算法相同，交易格式也完全相同，因此导致在其中一条链上的交易在另一条链上很可能是完全合法的。'+
                '在其中一条链上发起的交易再到另一条链上去重新广播，可能也会得到确认，这就是区块链的重放攻击。'
                break;
              case 2:
                that.tipTiltle = '请注意!'
                that.confirmInfo = '转账发起已成功，请点击广播按钮进行广播。'
                break;
              case 3:
                that.tipTiltle = '请注意!'
                that.confirmInfo = '用户A给用户B的转账在A链中广播，但事务还未被打包到链中。'
                break;
              case 4:
                that.tipTiltle = '请注意!';
                that.confirmInfo = '黑客已成功截获用户A给B的转账事务！'
                break;
              case 5:
                that.tipTiltle = '请注意!';
                that.confirmInfo = '黑客已将用户A给用户B的转账事务截获并在B链中广播！'
                break;
              case 12:
                that.tipTiltle = '请注意!';
                that.confirmInfo = ' 由于B链是由A链硬分叉之后生成的，所以校验的方法是一致的，因为重放攻击的特性，'+
                '原转账事务与黑客截获到B链广播的事务都能被打包接收，这也导致了发起一笔转账事务由于重放攻击后，被转出了两笔钱。'
                break;
            }
            return;
          }
        }
        if(that.pageName == '55'){
     
          if(that.confirShow == true){
            switch(that.step){
              case 1:
                that.tipTiltle = '长程攻击的基本概念及危害性'
                that.confirmInfo = '长程攻击是指攻击者创建了一条从创世区块开始的长区块链分支，并试图替换掉当前的合法主'+
                  '链。该分支上可能存有和主链不同的交易和区块，所以这种攻击又被称替换历史攻击或历史覆写攻击。'+
                  '恶意攻击者可以购买大量代币余额私钥，这些代币余额已经在验证过程中被使用了。接下来，恶'+
                  '意攻击者可以使用这个代币余额生成一个区块链替代历史，从而基于权益证明让他们获得更多激励。'
                break;
              case 2:
                that.tipTiltle = '请注意!'
                that.confirmInfo = 'A链已出部分区块，可点击左侧工具箱的攻击按钮开始下一步的操作！'
                break;
              case 4:
                that.tipTiltle = '请注意!';
                that.confirmInfo = '由于B链的出块速度大于A链的出块速度，B链覆盖A链'
                break;
              case 5:
                that.tipTiltle = '请注意!';
                that.confirmInfo = '至此，长程攻击的模拟已结束'
                break;
                
            }
            return;
          }
        }
        if(that.pageName == '56'){
          if(that.confirShow == true){
            switch(that.step){
              case 1:
                that.tipTiltle = '合约漏洞的基本概念及危害性'
                that.confirmInfo = '智能合约本质是一段运行在区块链网络中的代码，它完成用户所赋予的业务逻辑。但是我们知道，'+
                  '只要是由人编写的程序，就一定会出现错误和缺陷。本场景以常见的编程陷阱——整数溢出漏洞为例。'+
                  '计算机中整数都有一个宽度，因此它有一个可以表示的最大值。当保存一个超过最大值的数时，'+
                  '就会发生整数溢出。如果不去解决溢出的情况，就会造成数据的不准确和智能合约的输出错误。'
                break;
              case 2:
                that.tipTiltle = '请注意!'
                that.confirmInfo = '余额为0，提现合约没有进行校验，A用户发起的提现1元的操作导致余额变成'+ that.inputMoney +'元。'
                break;
             /* case 5:
                that.tipTiltle = '请注意!';
                that.confirmInfo = '合约漏洞攻击已结束，可点击右上方的重置或者返回。'
                break;*/
            }
            return;
          }
        }
			 
			}
		},
		methods:{
			sureTip(){
				this.$emit('tipSure')
			},
			//hash算法的时候，点击攻击与不攻击
			attackMode(num){
				this.$emit('attackMode',num)
				this.isAttack = num;
			},
			
			//椭圆线密码学显示划线
			showLine(){
				let that = this;
				that.a =that.a.replace(/[^1-3]/g,'')
				that.b =that.b.replace(/[^1-3]/g,'')
				if(that.a!='' && that.b!=''){
					 that.abimg=require('@/assets/ecc/'+that.a+''+that.b+'.jpg')
				}
			},
			//椭圆线已经生产点击确定
			sureLine(){
				let that = this;
				if(that.a ==''){
					that.$toast('请输入a的值',2000)
					return;
				}
				if(that.b == ''){
					that.$toast('请输入b的值',2000)
					return;
				}
				that.lineFinsh = true;
				that.$emit('sureLine')
			},
			//椭圆线计算新点点击确认
			surePoint(){
				let that = this;
				that.lineFinsh = false;
				that.$emit('surePoint');
			},
			//用户c解析完成确定
			sureParse(){
				this.$emit('sureParse');
			},
		
			// 提升算力点击确定
      sureUpCompute() {
        let that = this;
        if(that.upComputeUser == '没有人'){
      	  that.$toast('请选择提升对象',3000)
      	  return;
        }
        if(that.computevalue < 51) {
          that.$toast('请提升算力值最少至51%！')
          return;
        }
        that.$emit('sureUpCompute', that.upComputeUser)
      },
      
      // 转账
      sureTransfer(num) {
      	
        let that = this;
        if (that.tansferInfo.initiate == '') {
          that.$toast('转账发起人不能为空！',3000)
          return;
        }
        if (that.tansferInfo.object == '') {
          that.$toast('转账对象不能为空！',3000)
          return;
        }
        if(that.tansferInfo.amount<0){
        	 that.$toast('请输入金额必须是正整数！',3000)
          return;
        }
         if (that.tansferInfo.amount == '' || that.tansferInfo.amount == 0) {
          that.$toast('请输入金额必须是正整数！',3000)
          return;
        }
        if (that.tansferInfo.amount.match(/^-?[0-9]+$/) == null){
					that.$toast('转账金额必须是正整数')
					return
				}
       
        if(num==1){
        	 if (that.tansferInfo.amount > that.useBalance) {
		          that.$toast('转账金额不能大于可用余额！',3000)
		          return;
		        }
          }else{
        	 if (that.tansferInfo.amount > that.balance) {
		          that.$toast('转账金额不能大于余额！',3000)
		          return;
		        }
        }
       
        that.$emit('sureTransfer',that.tansferInfo)
      },
      // 打包
      sureBale() {
        let that = this;
        that.$emit('sureBale')
      },
      del() {
        let that = this;
        that.$emit('del')
      },
      canc() {
        let that = this;
        that.$emit('canc')
      },
      // 确认修改金额
      sureEditAmount() {
        let that = this;
        if (this.selectIndexData==''){
          that.$toast('请选择要修改的事务！',3000)
          return;
        }
        if (that.toEditAmount !== that.editAmount) {
          that.$toast('金额请按要求修改！',3000)
          return;
        }
        that.$emit('sureEditAmount', that.selectIndexData)
      },
			//椭圆线计算新点点击确认
			surePoint(){
				let that = this;
				that.lineFinsh = false;
				that.$emit('surePoint');
			},
			//用户c解析完成确定
			sureParse(){
				this.$emit('sureParse');
			},
			surePrompt(){
				if(this.isRight){
					this.$emit('surePrompt',1);
				}else{
					this.$emit('surePrompt',0);	
				}
				
			},
			//重放攻击点击透明区域隐藏
			hideTrans(){
				this.$emit('hideTrans');
			},
			
			//重放攻击金额验证
			validateNum(value) { //验证只能填入数字
	    var reg = /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/
	     //验证警戒值
	    if(this.aa_vaule!='' && this.aa_vaule != undefined){
	    	if (!reg.test(this.aa_vaule)) {
	        this.$toast('请输入正整数',2000)
	        this.aa_vaule='';
	        return ;
	    	}
	  	}
     },
			
      D1click(){
        let that = this;
        // console.log(that.inputMoney)
        // if(that.inputMoney == '' || that.inputMoney == undefined){
        //   that.$toast('请输入提现金额',2000)
        //   return;
        // }
        that.$emit('D1clickfinish');
      },
      //重放攻击确认转账
      D2click(){
        let that = this;  
        if(this.aa_vaule==''){
        	 this.$toast('请输入转账金额',2000)
        	 return;
        }
        if(this.aa_vaule==0){
        	this.$toast('请输入3位正整数余额',2000)
        	return;
        }
        if(this.aa_vaule<0){
        	this.$toast('转账金额必须是正整数',2000)
        	return;
        }
        that.$emit('D2clickfinish',this.aa_vaule);
      },
      
      //点击转账对象下拉
      selectUser(val) {
			  let that = this;
			  that.toList=[];
			  for(var i = 0;i<that.userList.length;i++){
			  	if(val==that.userList[i].userId){
			  		that.balance = that.userList[i].balance
			  		that.useBalance = that.userList[i].useBalance
			  	}
			  	if(val!=that.userList[i].userId){
			  		that.toList.push(that.userList[i]);
			  	}
			  }
      },
      upToEditAmount(value) {
        let that = this;
        that.$emit('upToEditAmount',value);
        that.editAmount = '';
      },
      
      
      //51%转账点击透明隐藏
      hideLineDrawShow(){
      	this.$emit('hideLineDrawShow');
      },
      
			
		},
		mounted(){
			this.toList = this.userList
		}
		
		
		
	}
</script>

<style>
	.confirmBox51 .ivu-select{ vertical-align: top;}
	.confirmBox51 .ivu-input-wrapper{ vertical-align: top;}
</style>
<style scoped lang='less'>
	@import url("../assets/teachCss/tips.less");
  .a-mallattack-input{border:0 none; outline:none;font-size:14px;
  height: 30px;line-height: 30px; padding: 0 10px;}
</style>