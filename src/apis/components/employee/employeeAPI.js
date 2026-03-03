import BaseAPI from '@/apis/base/baseAPI.js'
class employeeAPI extends BaseAPI {
  constructor() {
    super()
    this.controler = 'employees'
  }
  filter(params) {
    return this.api.get(`${this.controler}/filter`, { params })
  }
  masterDataForm() {
    return this.api.get(`${this.controler}/masterDataForm`)
  }
}
export default new employeeAPI()
