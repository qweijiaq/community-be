import send from '../config/MailConfig'
import moment from 'moment'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config/index'
import { checkCode } from '../common/utils'
import UserModel from '../models/User'

class LoginController {
  constructor() {}
  async forget(ctx) {
    const { body } = ctx.request
    try {
      // body.username -> database -> email
      let result = await send({
        code: '1234',
        expire: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
        email: body.email,
        user: 'Pony Wei'
      })
      ctx.body = {
        code: 200,
        data: result,
        msg: '邮件发送成功'
      }
    } catch (e) {
      console.log(e)
    }
  }

  async login(ctx) {
    // 返回 token
    // 接收用户的数据
    const { body } = ctx.request
    let sid = body.sid
    let code = body.code
    // 验证图片验证码的时效性和正确性
    const flag = await checkCode(sid, code)
    if (flag) {
      // 验证用户账号密码是否正确
      let checkUserPassword = false
      let user = await UserModel.findOne({ email: body.email })
      if (user.password === body.password) {
        checkUserPassword = true
      }
      if (checkUserPassword) {
        let token = jsonwebtoken.sign({ _id: 'weijia' }, config.JWT_SECRET, {
          expiresIn: '7d'
        })

        ctx.body = {
          code: 200,
          token
        }
      } else {
        ctx.body = {
          code: 404,
          msg: '用户名或密码错误'
        }
      }
    } else {
      ctx.body = {
        code: 401,
        msg: '图片验证码错误'
      }
    }
  }
}

export default new LoginController()
