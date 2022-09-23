import Vue from 'vue'
import VueI18n from "vue-i18n";
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import en from "../assets/locales/en"
import zh from "../assets/locales/zn"


Vue.use(VueI18n);

//The following is the scenario of setting language package separately. When setting language package separately, it needs to be introduced separately
//{{$t('toolbar.supply')}}
const messages = {
  en: {...enLocale,...en}, 
  zn: {...zhLocale,...zh},
};

var lang = navigator.language||navigator.userLanguage;//General browser language and IE browser


lang = lang.substr(0, 2);



export default new VueI18n({
  locale: localStorage.getItem('p_lang_locale')?localStorage.getItem('p_lang_locale'):'en', // set locale  The default is English
  messages: messages, // set locale messages
  silentTranslationWarn: true,
});
