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
  checkExist(payload) {
    return this.api.post(`${this.controler}/exist`, payload)
  }
  addEmployeeForm(payload) {
    return this.api.post(`${this.controler}/form`, payload)
  }
  updateEmployeeForm(payload) {
    return this.api.put(`${this.controler}/form`, payload)
  }
  delete(id) {
    return this.api.delete(`${this.controler}/${id}`)
  }
  deleteMany(ids) {
    return this.api.delete(`${this.controler}/delete-many`, {
      data: ids,
    })
  }
  updateStatus(payload) {
    return this.api.put(`${this.controler}/update-status`, payload)
  }
}
export default new employeeAPI()
