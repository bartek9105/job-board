import { extend } from 'vee-validate'

extend('required', {
  validate(value) {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1
    }
  },
  message: 'This field is required',
  computesRequired: true
})

extend('maxTitle', {
  validate(value) {
    return value.length <= 50
  },
  message: 'Max length is 50 characters'
})

extend('maxDescription', {
  validate(value) {
    return value.length <= 10000
  },
  message: 'Max length is 10000 characters'
})

extend('arrayEmpty', {
  validate(value) {
    return value.length > 0
  },
  message: 'This field is required',
  computesRequired: true
})
