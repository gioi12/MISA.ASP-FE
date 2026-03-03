import BaseAPI from '@/apis/base/baseAPI.js'
class codeCounterAPI extends BaseAPI {
  constructor() {
    super()
    this.controler = 'CodeCounters'
  }
  getCurrenCode() {
    return this.api.get(`${this.controler}/employeeCode`)
  }
}
export default new codeCounterAPI()
