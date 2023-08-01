import svgCaptcha from 'svg-captcha'
import { getValue, setValue } from '../config/Redis'

class PublicController {
  constructor() {}

  async getCaptcha(ctx) {
    const body = ctx.request.query
    console.log(body)
    const newCaptcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1il',
      color: true,
      noise: Math.floor(Math.random() * 5),
      width: 150,
      height: 38
    })
    // 设置超时时间，单位为 s
    setValue(body.sid, newCaptcha.text, 10 * 60)
    getValue(body.sid).then((res) => {
      console.log(res)
    })
    ctx.body = {
      code: 200,
      data: newCaptcha.data
    }
  }
}

export default new PublicController()
