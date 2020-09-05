/** @format */

const { constants } = require('@ylz/common')
const { utilities } = require('@ylz/data-access')
const { isBoolean } = require('@ylz/common/dist/src/libs/validations')

const validations = Object.freeze({
  id: {
    custom: {
      options: (id) => utilities.isValidObjectId(id),
      errorMessage: 'Wrong id format!',
    },
  },
  branch(locationType = constants.HttpRequestLocation.query, isRequired = true) {
    return {
      in: [locationType],
      optional: !isRequired,
      custom: {
        options: (value) => {
          if(value) {
            return value.length >= 1}
        },
        errorMessage: `Branch is required!`
      }
        
      
  }},
  paymentType(locationType = constants.HttpRequestLocation.query, isRequired = true) {
    return {
      in: [locationType],
      optional: !isRequired,
      custom: {
        options: (value) => {
          if(value) {
            return value.length >= 1}
        },
        errorMessage: `Payment type is required!`
      }
      
  }},
  paymentReason(locationType = constants.HttpRequestLocation.query, isRequired = true) {
    return {
      in: [locationType],
      optional: !isRequired,
      custom: {
        options: (value) => {
          if(value) {
            return value.length >= 1}
        },
        errorMessage: `Payment Reason is required!`
      }
      
  }},
  phoneType(locationType = constants.HttpRequestLocation.query, isRequired = true) {
    return {
      in: [locationType],
      optional: !isRequired,
      custom: {
        options: (value) => {
          if(value) {
            return value.length >= 1}
        },
        errorMessage: `Phone Type  is required!`
      }
      
  }}
});

/*
 * The location of the field, can be one or more of [body, cookies, headers, params, query].
 * If omitted, all request locations will be checked
 * */
const validator = Object.freeze({
  list: {
    limit: {
      in: [constants.HttpRequestLocation.query],
      isInt: true,
      optional: true,
      toInt: true,
      errorMessage: 'Wrong format',
    },
    skip: {
      in: [constants.HttpRequestLocation.query],
      isInt: true,
      optional: true,
      toInt: true,
      errorMessage: 'Wrong format',
    },
  },
  create: {    
    branch: validations.branch('body', false),
    // paymentReason: validations.paymentReason('body', false),
    // paymentType: validations.paymentType('body', false),
    // phoneType: validations.phoneType('body', false)
  },
  update: {
    // id: validations.id,
    // branch: validations.branch('body', false),
    // paymentReason: validations.paymentReason('body', false),
    // paymentType: validations.paymentType('body', false),
    // phoneType: validations.phoneType('body', false)
  }
});

module.exports = validator