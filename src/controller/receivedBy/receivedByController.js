/** @format */
const axios = require('axios')

const { debug } = require('@ylz/logger');
const { responses } = require('@ylz/common');

class ReceivedByController {
  static getInstance() {
    if (!ReceivedByController.instance) {
      ReceivedByController.instance = new ReceivedByController();
    }

    return ReceivedByController.instance;
  }
  async list({ query }) {
    debug('ReceivedByController - list:', JSON.stringify(query, null, 2));

    const { limit, skip } = query;
    let data =[]
    try {
      const url = process.env.OKTA_API_URL ;
      const token = process.env.OKTA_API_TOKEN
      
     const managers = await axios.get(url + process.env.OKTA_MANAGER_GROUP_ID + '/users', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'SSWS' + token,
        },
      });

      console.log(managers.data,'managers')
      
      managers.data.map(manager => {
        const id = manager.id
        const name = `${manager.profile.firstName} ${manager.profile.lastName}`
        data = [...data, {id, name}]
      })
    } catch (err) {
      console.log(err)
      return new responses.NotFoundResponse(null, err);
    }

    return new responses.OkResponse(data);
  }
}

module.exports = ReceivedByController.getInstance();
