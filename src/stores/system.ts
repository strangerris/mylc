
import i18n from '@/locale';
import KnightUrl from '/Knight_lg.png'

export const useSystemStore = defineStore('system', () => {
  const locale = i18n.global.locale
  const theme = ref(localStorage.getItem('theme') ? localStorage.getItem('theme') : '')
  const pageSize = ref(localStorage.getItem('pageSize') ? localStorage.getItem('pageSize') : 15)
  const lcTitle = ref(localStorage.getItem('lcTitle') ? localStorage.getItem('lcTitle') : KnightUrl)

  document.body.setAttribute('arco-theme', theme.value)

  function switchLang(locale) {
    this.locale = locale
    localStorage.setItem('locale',this.locale)
  }

  function switchTheme() {
    if (this.theme === 'dark') {
      this.theme = ''
    }else {
      this.theme = 'dark'
    }
    document.body.setAttribute('arco-theme', this.theme)
    localStorage.setItem('theme',this.theme)
  }

  return {locale, theme, pageSize, lcTitle, switchLang, switchTheme}
})