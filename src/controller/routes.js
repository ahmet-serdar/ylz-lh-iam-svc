const express = require('express')
const { controllerAdapter, auth } = require('../middlewares')
const {
  receivedByControllerInstance
} = require('./index')


const router = new express.Router()


//#region [swagger: /receivedBy - GET]
/**
 * @swagger
 * /receivedBy:
 *   get:
 *     tags:
 *       - references
 *     summary: Get all receivedBys
 *     description: Returns all receivedBys
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         description: Bearer Authentication Token (It will be written as "Bearer + space + idToken" )
 *         in: header
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: An array of all receivedBys
 *       401:
 *         description: Unauthorized Error
 *         schema: 
 *           type: string
 *           example: "Authentication failed! Try again."    
 *            
 */
//#endregion
router.get('/receivedBy', auth, controllerAdapter(receivedByControllerInstance, 'list'))


module.exports = router;
