export function mapOption(list, field) {
  if (!Array.isArray(list)) return []

  const idKey = `${field}Id`
  const nameKey = `${field}Name`
  const codeKey = `${field}Code`

  return list.map((item) => ({
    value: item[idKey],
    label: item[nameKey],
    code: item[codeKey],
  }))
}

export function mapOptions(data, fields) {
  if (!data) return data

  const model = { ...data }

  fields.forEach((field) => {
    model[field] = {
      value: data[`${field}Id`] ?? null,
      label: data[`${field}Name`] ?? '',
      code: data[`${field}Code`] ?? '',
    }
  })

  return model
}

export function demapToAPI(model, fields) {
  if (!model) return model

  const payload = { ...model }

  fields.forEach((field) => {
    payload[`${field}Id`] = model[field]?.value ?? null

    delete payload[field]
    delete payload[`${field}Name`]
    delete payload[`${field}Code`]
  })

  return payload
}
