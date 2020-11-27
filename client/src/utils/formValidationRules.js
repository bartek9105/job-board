import { extend } from 'vee-validate'

extend('required', {
  validate (value) {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1
    }
  },
  message: 'This field is required',
  computesRequired: true
})

extend('max', {
  validate (value) {
    return value.length <= 30
  },
  message: 'Max length is 30 characters'
})
