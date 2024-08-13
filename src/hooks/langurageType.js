import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import useMainStore from '@/store/modules/main'

export default function getLangurageType() {
  const useMain = useMainStore()
  const { textType } = storeToRefs(useMain)
  const langurageType = computed(() => {
    return (str) => {
      if (str) {
        return str + textType.value
      } else {
        return ''
      }
    }
  })

  return { langurageType }
}
