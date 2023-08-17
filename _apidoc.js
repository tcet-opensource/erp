// ------------------------------------------------------------------------------------------
// General apiDoc documentation blocks and old history blocks.
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// Current Success.
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// Current Errors.
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// Current Permissions.
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// History.
// ------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------
// Index.
// ------------------------------------------------------------------------------------------

/**
 * @api {get} / Retrieve Home Information
 * @apiName GetIndex
 * @apiGroup Index
 *
 * @apiSuccess {String} res server working.
 */

// ------------------------------------------------------------------------------------------
// User.
// ------------------------------------------------------------------------------------------

/**
 * @api {post} /add Add new User
 * @apiName AddUser
 * @apiGroup User
 *
 * @apiBody {String} name Name and surname of user
 * @apiBody {String} password Password of the user
 * @apiBody {String} emailId EmailID of the user. It would be the college assosiated emailID
 * @apiBody {String} uid This will be their ERPID
 * @apiBody {String="Student", "Faculty"} userType This will be type of user.
 * currently we support only 2
 *
 * @apiSuccess {String} res returns success message "added user with \<ID\>".
 *
 * @apiError (Error 500) err Error while inserting in Database.
 */

// ------------------------------------------------------------------------------------------
// Auth.
// ------------------------------------------------------------------------------------------

/**
 * @api {post} /auth Login User
 * @apiName LoginUser
 * @apiGroup Authentication
 *
 * @apiBody {String} id User ID.
 * @apiBody {String} password User password.
 *
 * @apiSuccess {String} res Response message.
 * @apiSuccess {Object} user User details.
 * @apiSuccess {String} user.uid User ID.
 * @apiSuccess {String} user.name User name.
 * @apiSuccess {String} user.emailId User email ID.
 * @apiSuccess {String} user.type User type.
 * @apiSuccess {String} user.token User token.
 *
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "res": "welcome",
 *       "user": {
 *         "uid": "123",
 *         "name": "Some User",
 *         "emailId": "someuser@example.com",
 *         "type": "user",
 *         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       }
 *     }
 *
 * @apiError (Error 403) UserDoesNotExist Incorrect ID or password.
 * @apiError (Error 500) ServerError Something is wrong on our side. Try again.
 */

/**
 * @api {post} /auth/validateUser Validate User
 * @apiName ValidateUser
 * @apiGroup Authentication
 * @apiDescription Validates the user's authentication token.
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object} res User object.
 * @apiSuccess {Object} res.user User details.
 * @apiSuccess {String} res.user.uid User ID.
 * @apiSuccess {String} res.user.name User name.
 * @apiSuccess {String} res.user.emailId User email ID.
 * @apiSuccess {String} res.user.type User type.
 *
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "res": {
 *         "user": {
 *           "uid": "123",
 *           "name": "Some User",
 *           "emailId": "someuser@example.com",
 *           "type": "user"
 *         },
 *         "msg": "user validated",
 *         "err": null
 *       }
 *     }
 */

/**
 * @api {post} /auth/sendOTP Send OTP
 * @apiName SendOTP
 * @apiGroup Authentication
 * @apiDescription Sends an OTP (One-Time Password) to the user's email ID.
 *
 * @apiBody {String} uid User ID.
 * @apiBody {String} emailId User email ID.
 *
 * @apiSuccess {String} res Response message.
 *
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "res": "otp sent to emailID"
 *     }
 *
 * @apiError (Error) IncorrectUidOrEmail Incorrect UID or emailId.
 */

/**
 * @api {post} /auth/resetPassword Reset Password
 * @apiName ResetPassword
 * @apiGroup Authentication
 * @apiDescription Resets the user's password using the provided OTP (One-Time Password).
 *
 * @apiBody {String} uid User ID.
 * @apiBody {String} otp One-Time Password received by the user.
 * @apiBody {String} password New password.
 *
 * @apiSuccess {String} res Response message.
 *
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "res": "successfully updated password"
 *     }
 *
 * @apiError (Error) IncorrectOtp Incorrect OTP.
 * @apiError (Error 500) UpdateError Something went wrong while updating password.
 * @apiError (Error 500) ServerError Something went wrong.
 */

// ------------------------------------------------------------------------------------------
// Infrastructure.
// ------------------------------------------------------------------------------------------

/**
 * @api {post} /infrastructure/add Add Infrastructure
 * @apiName AddInfrastructure
 * @apiGroup Infrastructure
 *
 * @apiBody {String} name The name of the infrastructure.
 * @apiBody {String} type The type of the infrastructure.
 * @apiBody {String} wing The wing where the infrastructure is located.
 * @apiBody {Number} floor The floor where the infrastructure is located.
 * @apiBody {Number} capacity The capacity of the infrastructure.
 *
 * @apiSuccess {String} res Success message with the ID of the added infrastructure.
 *
 * @apiError (Error 500) DatabaseError Error while inserting in the database.
 *
 * @apiDescription Adds a new infrastructure to the system.
 */

/**
 * @api {get} infrastructure/list Get Infrastructure List
 * @apiName GetInfrastructure
 * @apiGroup Infrastructure
 *
 * @apiQuery {String} [name] Name of Infrastructure .
 * @apiQuery {String} [type] Type of Infrastructure. One of possible Lab, Classroom.
 * @apiQuery {String} [wing] Wing of Infrastructure. One of possible A,B,C.
 * @apiQuery {Number} [floor] Floor of Infrastructure.
 * @apiQuery {Number} [capacity] Capacity of Infrastructure.
 *
 * @apiSuccess {Infrastructure[]} res Array of Filtered Infrastructure Doc .
 * @apiSuccess {String} infrastructure._id ID of document given by database.
 * @apiSuccess {String} infrastructure.name Name of Infrastructure
 * @apiSuccess {String} infrastructure.type Type of Infrastructure. One of possible Lab, Classroom.
 * @apiSuccess {String} infrastructure.wing Wing of Infrastructure. One of possible A,B,C.
 * @apiSuccess {Number} infrastructure.floor Floor of Infrastructure.
 * @apiSuccess {Number} infrastructure.capacity Capacity of Infrastructure.
 */

/**
 * @api {delete} /infrastructure/delete/:infrastructureId Delete Infrastructure
 * @apiName DeleteInfrastructure
 * @apiGroup Infrastructure
 *
 * @apiParam {String} infrastructureId The ID of the infrastructure document to delete.
 *
 * @apiSuccess {String} res Success message indicating the deletion.
 *
 * @apiError (Error 500) err Error message if there was an error during the deletion.
 *
* */

/**
 * @api {post} /infrastructure/update Update infrastructure details
 * @apiName UpdateInfrastructure
 * @apiGroup Infrastructure
 * @apiDescription update Existing Infrastructure details
 *
 * @apiBody {String} id Id of the infrastructure to be updated
 * @apiBody {String} [name] The name of the infrastructure.
 * @apiBody {String} [type] The type of the infrastructure.
 * @apiBody {String} [wing] The wing where the infrastructure is located.
 * @apiBody {Number} [floor] The floor where the infrastructure is located.
 * @apiBody {Number} [capacity] The capacity of the infrastructure.
 *
 * @apiSuccess {String} res infrastructure updated.
 * @apiError (Error 500) err Error in updating database
 *
 */

// ------------------------------------------------------------------------------------------
// Accreditation.
// ------------------------------------------------------------------------------------------

/**
 * @api {post} /accreditation/add Add Accreditation
 * @apiName AddAccreditation
 * @apiGroup Accreditation
 * @apiDescription Add a new accreditation.
 *
 * @apiBody {String} name Accreditation name.
 * @apiBody {String} agencyName Agency name.
 * @apiBody {Date} dateofAccreditation Date of accreditation.
 * @apiBody {Date} dateofExpiry Date of expiry.
 *
 * @apiSuccess {String} res Response message.
 * @apiError (Error 500) UserNotFound The  of the User was not found
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "res": "added accreditation Example Accreditation"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "err": "Error while inserting in DB"
 *     }
 */

/**
 * @api {delete} /accreditation/delete/:accreditationId To delete Accreditation
 * @apiName DeleteAccreditation
 * @apiGroup Accreditation
 *
 * @apiParam {String} accreditationId The ID of the accreditation document to delete.
 *
 * @apiSuccess {String} res Success message indicating the deletion.
 *
 * @apiError (Error 500) err Error message if there was an error during the deletion.
 *
* */

/**
 * @api {post} /accreditation/update update accreditation details
 * @apiName UpdateAccreditation
 * @apiGroup Accreditation
 * @apiDescription update Existing accreditation
 *
 * @apiBody {String} id Id of the accreditation to be updated
 * @apiBody {String} [name] Accreditation name.
 * @apiBody {String} [agencyName] Agency name.
 * @apiBody {Date} [dateofAccreditation] Date of accreditation.
 * @apiBody {Date} [dateofExpiry] Date of expiry.
 *
 * @apiSuccess {String} res Accreditation updated.
 * @apiError (Error 500) err Error in updating database
 *
 */

/**
 * @api {get} accreditation/list Get Accreditation List
 * @apiName GetAccreditation
 * @apiGroup Accreditation
 *
 * @apiQuery {String} [name] Name of accreditation .
 * @apiQuery {String} [agencyName] Name of agency that issued the accreditation.
 * @apiQuery {Date} [dateofAccreditation] Date on which accreditation was issued.
 * @apiQuery {Date} [dateofExpiry] Date till which accreditation is valid.
 *
 * @apiSuccess {accreditation[]} res Array of Filtered accreditation Doc.
 * @apiSuccess {String} accreditation._id ID of document given by database.
 * @apiSuccess {String} accreditation.name Name of accreditation.
 * @apiSuccess {String} accreditation.agencyName Name of agency that issued the accreditation.
 * @apiSuccess {Date} accreditation.dateofAccreditation Date on which accreditation was issued.
 * @apiSuccess {Date} accreditation.dateofExpiry Date till which accreditation is valid.
 */
