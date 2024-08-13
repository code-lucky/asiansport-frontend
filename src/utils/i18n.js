import { createI18n } from 'vue-i18n'
import en from '../language/en'
import zh from '../language/zh'
import sc from '../language/sc'

// 组合语言包对象
const messages = {
  en,
  zh,
  sc
}

// 创建实例对象
const i18n = createI18n({
  legacy: false, // 设置为 false，启用 composition API 模式
  messages,
  locale: 'zh'
})

export default i18n
