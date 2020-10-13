/** @format */

const { constants } = require('@ylz/common')
const { utilities } = require('@ylz/data-access')

const validations = Object.freeze({
  id: {
    custom: {
      options: (value) => {
        if(value) {
          return value.length >= 1}
      },
      errorMessage: 'Wrong id format!',
    },
  },
  firstName(locationType = constants.HttpRequestLocation.query, isRequired = true) {
    return {
      in: [locationType],
      optional: !isRequired,
      custom: {
        options: (value) => {
          if(value) {
            return value.length >= 1}
        },
        errorMessage: `First name is required!`
      }
  }},
  lastName(locationType = constants.HttpRequestLocation.query, isRequired = true) {
    return {
      in: [locationType],
      optional: !isRequired,
      custom: {
        options: (value) => {
          if(value) {
            return value.length >= 1}
        },
        errorMessage: `Last name is required!`
      }
  }},
  email(locationType = constants.HttpRequestLocation.query, isRequired = true) {
    return {
      in: [locationType],
      optional: !isRequired,
      custom: {
        options: (value) => {
          if(value !== null && value.length !== 0 ) {
            return new RegExp("[a-zA-Z0-9_]+.[a-zA-Z0-9_]+@[a-zA-Z0-9]+.[a-z]{1,8}").test(value)
        }
        else {
          return true
        }
      },
        errorMessage: `Please check your email!`
      }
  }},
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
    firstName: validations.firstName('body', true),
    lastName: validations.lastName('body', true),
    email: validations.email('body', true),
    branch: validations.branch('body', true)
  },
  update: {
    id: validations.id,
    firstName: validations.firstName('body', false),
    lastName: validations.lastName('body', false),
    email: validations.email('body', false),
    branch: validations.branch('body', false)
  },
  delete: {
    id: validations.id
  }
});

module.exports = validator