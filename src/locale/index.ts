import ZH from './ZH'
import EN from './EN'
import {createI18n} from "vue-i18n";

const locale = localStorage.getItem("locale");
const i18n = createI18n({
    locale: locale ? locale : 'ZH', // 设置语言类型
    legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
    globalInjection: true, // 全局注册$t方法
    messages: {
        ZH,
        EN
    }
})

export default i18n