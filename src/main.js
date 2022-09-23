// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue'
import App from './App'
import 'es6-promise/auto'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import store from './store/store'
import $ from 'jquery'
import i18n from '@/utils/language.js'


import 'ie-placeholder'
import toastRegistry from './components/toast/index'
Vue.config.productionTip = false




Vue.use(toastRegistry)
Vue.use(ViewUI)
Vue.use(ElementUI,{
	i18n:(key,value) => {
		return i18n.t(key,value)
	}
})

import router from './router'

/* // Global route interception
router.beforeEach((to, from, next) => {	  
  if (to.path === '/login') { // Jump directly to the login page
    next()
  } else { 
  	// other page paths
	  if(to.meta.direction==0){
	   	 let userId = sessionStorage.getItem('user_id') 
		   if (userId == null || userId == '') { 
		    next({ path: '/login' }) 
		   }else{
		   	next()
		   }
	  }else{	   
	  	let userId = sessionStorage.getItem('stu_userId') 	
		   if (userId == null) { 
		    next({ path: '/login' }) 
		   }else{
		   	next()
		   }
		  

	  }
  }
}) */


// Routing exclusive navigation interception
beforeEnter: (to, from, next) => {
  // Determine if the user is logged
  if(to.meta.direction==0){  
	  let userId = sessionStorage.getItem('user_id')
	  if (userId == null || userId == '') {
	    next({ path: '/login' })
	  } else {
	  	console.log(token);
	    next()
	  }
  }else{
  	
  	let userId = sessionStorage.getItem('stu_userId')
	  if (userId == null || userId == '') {
	    next({ path: '/login' })
	  } else {
	  	console.log(token);
	    next()
	  }
	
  }
}



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})


