/** @format */
const axios = require('axios')

const { debug } = require('@ylz/logger');
const { responses } = require('@ylz/common');
const User = require('../../repositories/users')

class ReceivedByController {
  static getInstance() {
    if (!ReceivedByController.instance) {
      ReceivedByController.instance = new ReceivedByController();
    }

    return ReceivedByController.instance;
  }
  async list({ query, locals }) {
    debug('ReceivedByController - list:', JSON.stringify(query,locals));

    const { curBranch, groups } = locals
    
    let data =[]
    try {
      const url = process.env.OKTA_API_URL ;
      const token = process.env.OKTA_API_TOKEN
      let users
      users = await axios.get(url+ "groups/" + process.env.OKTA_MANAGER_GROUP_ID + '/users', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'SSWS' + token,
        },
      });
      
      if(!groups.includes('Admin')) {
        users.data = users.data.filter(manager => manager.profile.branch === curBranch)
      }
      
      users.data.map(manager => {
        const user = {
          id: manager.id,
          firstName: manager.profile.firstName,
          lastName: manager.profile.lastName,
          email: manager.profile.email, 
          mobilePhone: manager.profile.mobilePhone,
          branch: manager.profile.branch,
          status: manager.status
        }
        data = [...data, user]
      })
    } catch (err) {
      return new responses.NotFoundResponse(null, err);
    }

    return new responses.OkResponse(data);
  }

  async create({ body }) {
    debug('ReceivedByController - create:', JSON.stringify(body));
    const managerGroupId = process.env.OKTA_MANAGER_GROUP_ID
    const url = process.env.OKTA_API_URL ;
    const token = process.env.OKTA_API_TOKEN
    const bodyKeys = Object.keys(body);
    const allowedKeys = [
      'firstName',
      'lastName',
      'mobilePhone',
      'email',
      'branch'
    ];
    const isValidOperation = bodyKeys.every((key) => allowedKeys.includes(key));

    if (!isValidOperation) {
      return new responses.BadRequestResponse(undefined, 'Invalid keys!.');
    }

    const userBody = {
      profile: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        login: body.email,
        mobilePhone: body.mobilePhone,
        branch: body.branch
      },
      groupIds: [managerGroupId]
    }
    const res = await axios.post(url + 'users?activate=true', userBody, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'SSWS' + token,
      },
    });
    const user = {
      id: res.data.id,
      firstName: res.data.profile.firstName,
      lastName: res.data.profile.lastName,
      email: res.data.profile.email,
      status: res.data.status,
      mobilePhone: res.data.profile.mobilePhone,
      branch: res.data.profile.branch
    }
    return new responses.CreatedResponse(user);
  }               

  async update({ query, params, body }) {
    debug('ReceivedByController - update:', JSON.stringify(query, params, body))
    const _id = params.id
    const url = process.env.OKTA_API_URL ;
    const token = process.env.OKTA_API_TOKEN

    const userBody = {
      profile: {}
    }
    if(body.firstName) userBody.profile.firstName = body.firstName
    if(body.lastName) userBody.profile.lastName = body.lastName
    if(body.email) {
      userBody.profile.email = body.email
      userBody.profile.login = body.email    
    }
    if(body.mobilePhone) userBody.profile.mobilePhone = body.mobilePhone
    if(body.branch) userBody.profile.branch = body.branch
    // const user = new User(userBody)
    const res = await axios.post(url + 'users/' + _id, userBody, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'SSWS' + token,
      },
    });

    const user = {
      id: res.data.id,
      firstName: res.data.profile.firstName,
      lastName: res.data.profile.lastName,
      email: res.data.profile.email,
      status: res.data.status,
      mobilePhone: res.data.profile.mobilePhone,
      branch: res.data.profile.branch
    }

    return new responses.OkResponse(user)
  }

  async delete({ params }) {
    debug('ReceivedByController - delete:', JSON.stringify(params));
    const _id = params.id
    const url = process.env.OKTA_API_URL ;
    const token = process.env.OKTA_API_TOKEN

    const res = await axios.post(url + 'users/' + _id + "/lifecycle/deactivate", null, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'SSWS' + token,
      },
    });
    const getUser = await axios.get(url + 'users/' + _id, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'SSWS' + token,
      },
    })
    
    const user = {
      id: getUser.data.id,
      firstName: getUser.data.profile.firstName,
      lastName: getUser.data.profile.lastName,
      email: getUser.data.profile.email,
      status: getUser.data.status,
      mobilePhone: getUser.data.profile.mobilePhone,
      branch: getUser.data.profile.branch
    }

    return new responses.OkResponse(user);
}
}

module.exports = ReceivedByController.getInstance();
