const express = require('express')
const { controllerAdapter, auth, schemaErrorHandler } = require('../middlewares')
const { checkSchema } = require("express-validator")
const {
  receivedByControllerInstance
} = require('./index')
const { validations } = require("./validations")


const router = new express.Router()


//#region [swagger: /receivedBy - GET]
/**
 * @swagger
 * /receivedBy:
 *   get:
 *     tags:
 *       - receivedBy
 *     summary: Get all users
 *     description: Returns all users
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
 *         description: An array of all users
 *       401:
 *         description: Unauthorized Error
 *         schema: 
 *           type: string
 *           example: "Authentication failed! Try again."    
 *            
 */
//#endregion
router.get('/', auth, controllerAdapter(receivedByControllerInstance, 'list'))


//#region [swagger: /receivedBy - POST]
/**
 * @swagger
 * path:
 *  /receivedBy:
 *    post:
 *     tags:
 *       - receivedBy
 *     summary: "Add a new user"
 *     description: 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         description: Bearer Authentication Token (It will be written as "Bearer + space + idToken" )
 *         in: header
 *         type: string
 *         required: true
 *       - name: receipt 
 *         in: body
 *         description: Create a new user
 *         required: true
 *         example: {   
 *                  "firstName": "string",
 *                  "lastName": "string",
 *                  "email": "string",
 *                  "mobilePhone": "string"
 *                  }         
 *     responses:
 *       201:
 *         description: Successfull response
 *         schema:
 *            type: object
 *            example: {
 *                       "id": ObjectId,
 *                       "code": "201",
 *                       "message": "Created",
 *                       "timestamp": date
 *                      }
 *       401:
 *         description: Unauthorized Error
 *         schema: 
 *           type: string
 *           example: "Authentication failed! Try again." 
 *       400: 
 *          description: BAD_REQUEST
 *          schema:
 *            type: string
 *            example: "Something went wrong! Check required inputs!"
 *       500:
 *         description: Error
 *         schema: 
 *           type: string
 *           example: "Couldn`t add user"            
             
 */
//#endregion
router.post("/", auth, controllerAdapter(receivedByControllerInstance, 'create'))

//#region [swagger: /receivedBy/{id} - PATCH]
/**
 * @swagger
 * /receivedBy/{id}:
 *   patch:
 *     tags:
 *       - receivedBy
 *     summary: Update a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         description: Bearer Authentication Token (It will be written as "Bearer + space + idToken" )
 *         in: header
 *         type: string
 *         required: true
 *       - id: id
 *         description: Enter valid ID
 *         name: id
 *         type: string
 *         format: hexadecimal
 *         in: path
 *         required: true
 *      
 *       - name: update body
 *         description: update users values
 *         in: body
 *         type: object
 *         required: true
 *         example: {                    
 *                	"firstName": "string",
 *                  "lastName": "string",
 *                  "email": "string@email.com",
 *                  "mobilePhone": "string"
 *                  }
 *     responses:
 *       200:
 *         description: Succesfull response
 *       401:
 *         description: Unauthorized Error
 *         schema: 
 *           type: string
 *           example: "Authentication failed! Try again." 
 *         
 *       404:
 *         description: User Not Found
 *         
 *       400:
 *         description: Bad Request
 *         
 */
//#endregion
router.patch("/:id", auth, controllerAdapter(receivedByControllerInstance, 'update'))

//#region [swagger: /receivedBy/{id} - DELETE]
/**
 * @swagger
 * /receivedBy/{id}:
 *   delete:
 *     tags:
 *       - receivedBy
 *     summary: Delete a user
 *     description: Soft delete a user.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         description: Bearer Authentication Token (It will be written as "Bearer + space + idToken" )
 *         in: header
 *         type: string
 *         required: true
 *       - id: id
 *         description: Enter valid ID
 *         name: id
 *         type: string
 *         format: string
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Succesfull response
 *       401:
 *         description: Unauthorized Error
 *         schema: 
 *           type: string
 *           example: "Authentication failed! Try again." 
 *       404:
 *         description: User not found.
 *         
 *       400:
 *         description: Bad Request
 *
 */
//#endregion
router.delete("/:id", auth, controllerAdapter(receivedByControllerInstance, 'delete'))

module.exports = router;
