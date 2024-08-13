import axios from 'axios'
import cache from '@/utils/cache'
let loading

function loadStrat() {
  loading = ElLoading.service({
    lock: false,
    text: 'Loading',
    customClass: 'osloading'
  })

  document.body.addEventListener('wheel', preventDefault, { passive: false })
}

function preventDefault(event) {
  event.preventDefault()
}

function endLoad() {
  loading.close()
  document.body.removeEventListener('wheel', preventDefault, { passive: false })
}
class CRequest {
  constructor(baseURL) {
    this.instance = axios.create({
      baseURL,
      timeout: 30000
    })
    this.countNum = 0
    this.loading = null
    this.instance.interceptors.request.use(
      (config) => {
        loadStrat()
        console.log(config, 'config')
        const token = cache.getCache('course_token') ?? ''
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        } else {
          config.headers.Authorization = `Bearer`
        }
        return config
      },
      (err) => {
        // console.log(err, 'config')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        endLoad()
        return res
      },
      (err) => {
        endLoad()

        console.log(err, 'err')
        // const { status } = err.response
        // // 任何超出 2xx 的响应码都会进入这里
        // if (status === 401) {
        //   // 跳转到登录页面
        //   // 清除本地存储中的用户登录状态
        // } else if (status === 403) {
        //   // token 未携带或已过期
        //   console.log('token 未携带或已过期')
        // } else if (status === 400) {
        //   // 客户端参数错误
        //   console.log('参数错误，请检查请求参数')
        // } else if (status >= 500) {
        //   //服务端内部异常，请稍后重试
        //   console.log('服务端内部异常，请稍后重试')
        // }
        return err
      }
    )
  }

  request(config) {
    // this.countNum++
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          // console.log(data)

          resolve(res.data)
        })
        .catch((err) => {
          // console.log(err)
          reject(err)
        })
    })
  }

  get(config) {
    return this.request({ ...config, method: 'get' })
  }

  post(config) {
    return this.request({ ...config, method: 'post' })
  }

  delete(config) {
    return this.request({ ...config, method: 'delete' })
  }
}

// export default new CRequest('http://192.168.3.8:8088/api')
// export default new CRequest('https://asiansport-backend.apexteamfencing.com/api')
// export default new CRequest('https://backend.sportsfay.com/api')
// export default new CRequest('http://192.168.3.107:4029/api')
export default new CRequest('https://backend.fencinghall.net/api')
// export default new CRequest('http://192.168.3.107:4035/api')
// export default new CRequest('http://fencingback//api')
