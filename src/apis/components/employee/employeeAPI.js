import BaseAPI from '@/apis/base/baseAPI.js'
class employeeAPI extends BaseAPI {
  constructor() {
    super()
    this.controler = 'employees'
  }
}
export default new employeeAPI()
