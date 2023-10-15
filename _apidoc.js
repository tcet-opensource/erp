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
 * @api {post} /infrastructure/update/:id Update infrastructure details
 * @apiName UpdateInfrastructure
 * @apiGroup Infrastructure
 * @apiDescription update Existing Infrastructure details
 *
 * @apiParam {String} id The infrastructure document to update.
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
 * @api {post} /accreditation/update/:id update accreditation details
 * @apiName UpdateAccreditation
 * @apiGroup Accreditation
 * @apiDescription update Existing accreditation
 *
 * @apiParam {String} id The accreditation document to update.
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
//------------------------------------------------------------------------------------------
// Tutorials.
// ------------------------------------------------------------------------------------------

/**
 * @api {post} /tutorial/add Add Tutorial
 * @apiName AddTutorial
 * @apiGroup Tutorial
 *
 * @apiBody {Number} no The number of tutorial.
 * @apiBody {String} title The title of tutorial.
 * @apiBody {Number} hours The hours required for tutorial.
 * @apiBody {String} cognitiveLevel The cognitiveLevel of tutorial.
 *
 * @apiSuccess {String} res Success message with the ID of the added tutorial.
 *
 * @apiError (Error 500) DatabaseError Error while inserting in the database.
 *
 * @apiDescription Adds a new tutorial to the system.
 */

/**
 * @api {get} tutorial/list Get Tutorial List
 * @apiName GetTutorial
 * @apiGroup Tutorial
 *
 * @apiQuery {Number} [no] Number of Tutorial.
 * @apiQuery {String} [title] Title of Tutorial.
 * @apiQuery {Number} [hours] Hours required for Tutorial
 * @apiQuery {String} [cognitiveLevel] Level of Tutorial.
 *
 * @apiSuccess {Tutorial[]} res Array of Filtered Tutorial Doc .
 * @apiSuccess {String} tutorial._id ID of document given by database.
 * @apiSuccess {Number} tutorial.no Number of Tutorial.
 * @apiSuccess {String} tutorial.title Title of Tutorial.
 * @apiSuccess {String} tutorial.hours Hours of Tutorial.
 * @apiSuccess {Number} tutorial.cognitiveLevel CognitiveLevel of Tutorial.
 */

/**
 * @api {delete} /tutorial/delete/:tutorialId Delete Tutorial
 * @apiName DeleteTutorial,
 * @apiGroup Tutorial
 *
 * @apiParam {String} tutorialId The ID of the tutorial document to delete.
 *
 * @apiSuccess {String} res Success message indicating the deletion.
 *
 * @apiError (Error 500) err Error message if there was an error during the deletion.
 *
* */
/**
 * @api {post} /tutorial/update/:id Update tutorial details
 * @apiName UpdateTutorial
 * @apiGroup Tutorial
 * @apiDescription update Existing Tutorial details
 *
 * @apiParam {String} id The tutorial document to update.
 * @apiBody {String} id Id of the tutorial to be updated
 * @apiBody {Number} [no] The no of tutorial.
 * @apiBody {String} [title] The title of tutorial.
 * @apiBody {String} [hours] The hours required for the tutorial.
 * @apiBody {Number} [cognitiveLevel] The cognitiveLevel of tutorial.

 *
 * @apiSuccess {String} res tutorial updated.
 * @apiError (Error 500) err Error in updating database
 *
 */

// ------------------------------------------------------------------------------------------
// Timetable.
// ------------------------------------------------------------------------------------------

/**
 * @api {post} /timetable/add Add Timetable
 * @apiName AddTimetable
 * @apiGroup Timetable
 * @apiDescription Add a new timetable entry.
 *
 * @apiBody {Date} startDate Start date of the timetable.
 * @apiBody {Date} endDate End date of the timetable.
 * @apiBody {ObjectId} classIncharge ID of the faculty in charge (ObjectId).
 * @apiBody {ObjectId} group ID of the group (ObjectId).
 * @apiBody {ObjectId} activityBlueprints ID of the activity blueprint (ObjectId).
 * @apiBody {String} lunchBreakStartTime Start time of the lunch break.
 * @apiBody {Number} lunchBreakDuration Duration of the lunch break (in minutes).
 * @apiBody {String} teaBreakStartTime Start time of the tea break.
 * @apiBody {Number} teaBreakDuration Duration of the tea break (in minutes).
 *
 * @apiSuccess {String} res Response message.
 * @apiError (Error 500) DatabaseError Error if there was an error inserting into the database.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "res": "Added timetable for <startDate> - <endDate>"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "err": "Error while inserting in DB"
 *     }
 */

// ------------------------------------------------------------------------------------------
// Department.
// ------------------------------------------------------------------------------------------

/**
 * @api {post} /department/create Create Deapartment
 * @apiName AddDepartment
 * @apiDescription Adds a new Department.
 * @apiGroup Department
 *
 * @apiBody {String} name The name of the Department.
 * @apiBody {String} acronym The acronym of the Department.
 * @apiBody {Date} yearOfStarting The year of establishment of the Department.
 * @apiBody {connector.Schema.Types.ObjectId} accreditations The accreditation which is associated.
 * @apiBody {connector.Schema.Types.ObjectId} infrastructure The infrastructure which is associated.
 *
 * @apiSuccess {String} res added Department successfully.
 *
 * @apiError (Error 500) DatabaseError Error while inserting in the DB.
 *
 */

/**
 * @api {get} Department/list Listdown Department
 * @apiName GetDepartment
 * @apiDescription Listdown the Department.
 * @apiGroup Department
 *
 * @apiBody {String} [name] The name of the Department.
 * @apiBody {String} [acronym] The acronym of the Department.
 * @apiBody {Date} [yearOfStarting] The year of establishment of the Department.
 * @apiBody {connector.Schema.Types.ObjectId} [accreditations]  Accreditation which is associated.
 * @apiBody {connector.Schema.Types.ObjectId} [infrastructure] Infrastructure which is associated.
 *
 * @apiSuccess {Department[]} res Array of Filtered Department Doc .
 * @apiSuccess {String} department._id ID of document given by database.
 * @apiSuccess {String} department.name Name of Infrastructure
 * @apiSuccess {String} department.acronym The acronym of the Department.
 * @apiSuccess {Date} department.yearOfStarting The year of establishment of the Department.
 * @apiSuccess {connector.Schema.Types.ObjectId} department.accreditations associated Accreditation.
 * @apiSuccess {connector.Schema.Types.ObjectId} department.infrastructure associatedInfrastructure.
 * @apiError (Error 500) err Error while fetching the data.
 */

/**
 * @api {delete} /department/delete/:departmentId Delete Department
 * @apiName DeleteDepartment
 * @apiDescription Remove the existing Department.
 * @apiGroup Department
 *
 * @apiParam {String} departmentId The ID of the department document to delete.
 *
 * @apiSuccess {String} res "Department deleted successfully.
 *
 * @apiError (Error 500) err Error while deleting from DB.
 *
* */

/**
 * @api {post} /department/update/:id Update department
 * @apiName UpdateDepartment
 * @apiGroup Department
 * @apiDescription Update Existing Department details except yearOfStarting, acronym
 *
 * @apiParam {String} id The department document to update.
 * @apiSuccess {String} department._id ID of document given by database.
 * @apiSuccess {String} department.name Name of Infrastructure
 * @apiSuccess {String} department.acronym The acronym of the Department.
 * @apiSuccess {Date} department.yearOfStarting The year of establishment of the Department.
 * @apiSuccess {connector.Schema.Types.ObjectId} department.accreditations associated Accreditation.
 * @apiSuccess {connector.Schema.Types.ObjectId} department.infrastructure associatedInfrastructure.
 *
 * @apiSuccess {String} res updated infrastructure with id.
 * @apiError (Error 500) err Error while inserting in DB
 */

// ------------------------------------------------------------------------------------------
// Coursework
// ------------------------------------------------------------------------------------------

/**
 * @api {post} /coursework/add Add Coursework
 * @apiName AddCoursework
 * @apiGroup Coursework
 * @apiDescription Add a new coursework entry.
 *
 * @apiBody {ObjectId} student ID of the student (ObjectId).
 * @apiBody {String} Coursework type that is either onCampus or offCampus.
 * @apiBody {ObjectId} course ID of the Course in Coursework (ObjectId).
 * @apiBody {ObjectId} task ID of the task in Coursework (ObjectId).
 * @apiBody {String} objectID either its practicals or tutorial or assignment .
 * @apiBody {ObjectId} activity Id of the activity in Coursework.
 * @apiBody {Number} Marks in the Coursework.
 *
 * @apiSuccess {String} res Response message.
 * @apiError (Error 500) DatabaseError Err message if there is an error inserting into the database.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "res": "Added coursework"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "err": "Error while inserting in DB"
 *     }
 */

/**
 * @api {delete} /timetable/delete/:timetableId Delete Timetable
 * @apiName DeleteTimetable
 * @apiGroup Timetable
 *
 * @apiParam {String} timetableId The ID of the timetable document to delete.
 *
 * @apiSuccess {String} res Success message indicating the deletion.
 *
 * @apiError (Error 500) DatabaseError Error message if there was an error during the deletion.
 */

/**
 * @api {delete} /coursework/delete/:courseworkId Delete Coursework
 * @apiName DeleteCoursework
 * @apiGroup Coursework
 *
 * @apiParam {String} courseworkId The ID of the Coursework document to delete.
 *
 * @apiSuccess {String} res Success message indicating the deletion.
 *
 * @apiError (Error 500) DatabaseError Error message if there was an error during the deletion.
 */

/**
 * @api {post} /timetable/update/:id Update Timetable
 * @apiName UpdateTimetable
 * @apiGroup Timetable
 * @apiDescription Update existing timetable data.
 *
 * @apiParam {String} id The timetable document to update.
 * @apiBody {String} id ID of the timetable to be updated.
 * @apiBody {Date} [startDate] Start date of the timetable.
 * @apiBody {Date} [endDate] End date of the timetable.
 * @apiBody {ObjectId} [classIncharge] ID of the faculty in charge (ObjectId).
 * @apiBody {ObjectId} [group] ID of the group (ObjectId).
 * @apiBody {ObjectId} [activityBlueprints] ID of activity blueprint (ObjectId).
 * @apiBody {String} [lunchBreakStartTime] Start time of the lunch break.
 * @apiBody {Number} [lunchBreakDuration] Duration of lunch break (in minutes).
 * @apiBody {String} [teaBreakStartTime] Start time of tea break.
 * @apiBody {Number} [teaBreakDuration] Duration of tea break (in minutes).
 *
 * @apiSuccess {String} res Timetable updated.
 */

/**
 * @api {post} /coursework/update/:id Update Coursework
 * @apiName UpdateCoursework
 * @apiGroup Coursework
 * @apiDescription Update existing coursework data.
 *
 * @apiParam {String} id The coursework document to update.
 * @apiBody {String} id ID of the Coursework to be updated.
 * @apiBody {ObjectId} student ID of the student (ObjectId).
 * @apiBody {String} Coursework type that is either onCampus or offCampus.
 * @apiBody {ObjectId} course ID of the Course in Coursework (ObjectId).
 * @apiBody {ObjectId} task ID of the task in Coursework (ObjectId).
 * @apiBody {String} objectID either its practicals or tutorial or assignment .
 * @apiBody {ObjectId} activity Id of the activity in Coursework.
 * @apiBody {Number} Marks in the Coursework.
 *
 * @apiSuccess {String} res Coursework updated.
 * @apiError (Error 500) DatabaseError Error in updating the database.
 */

/**
 * @api {get} /timetable/list Get Timetable List
 * @apiName GetTimetableList
 * @apiGroup Timetable
 *
 * @apiQuery {Date} [startDate] Start date of the timetable.
 * @apiQuery {Date} [endDate] End date of the timetable.
 * @apiQuery {ObjectId} [classIncharge] ID of the faculty in charge (ObjectId).
 * @apiQuery {ObjectId} [group] ID of the group (ObjectId).
 * @apiQuery {ObjectId} [activityBlueprints] ID of the activity blueprint (ObjectId).
 * @apiQuery {String} [lunchBreakStartTime] Start time of the lunch break.
 * @apiQuery {Number} [lunchBreakDuration] Duration of the lunch break (in minutes).
 * @apiQuery {String} [lunchBreakStartTime] Start time of the lunch break.
 * @apiQuery {Number} [lunchBreakDuration] Duration of the lunch break (in minutes).
 *
 * @apiSuccess {Timetable[]} res Array of filtered timetable documents.
 * @apiSuccess {String} timetable._id ID of the timetable document given by the database.
 * @apiSuccess {Date} timetable.startDate Start date of the timetable.
 * @apiSuccess {Date} timetable.endDate End date of the timetable.
 * @apiSuccess {ObjectId} timetable.classIncharge ID of the faculty in charge (ObjectId).
 * @apiSuccess {ObjectId} timetable.group ID of the group (ObjectId).
 * @apiSuccess {ObjectId} timetable.activityBlueprints ID of the activity blueprint (ObjectId).
 * @apiSuccess {String} timetable.lunchBreakStartTime Start time of the lunch break.
 * @apiSuccess {Number} timetable.lunchBreakDuration Duration of the lunch break (in minutes).
 * @apiSuccess {String} timetable.teaBreakStartTime Start time of the tea break.
 * @apiSuccess {Number} timetable.teaBreakDuration Duration of the tea break (in minutes).
 */

/**
 * @api {get} /coursework/list Get Coursework List
 * @apiName GetCourseworkList
 * @apiGroup Coursework
 *
 * @apiQuery {ObjectId} student ID of the student (ObjectId).
 * @apiQuery {String} Coursework type that is either onCampus or offCampus.
 * @apiQuery {ObjectId} course ID of the Course in Coursework (ObjectId).
 * @apiQuery {ObjectId} task ID of the task in Coursework (ObjectId).
 * @apiQuery {String} objectID either its practicals or tutorial or assignment .
 * @apiQuery {ObjectId} activity Id of the activity in Coursework.
 * @apiQuery {Number} Marks in the Coursework.
 *
 * @apiSuccess {Coursework[]} res Array of filtered coursework documents.
 * @apiSuccess {String} coursework._id ID of the coursework document given by the database.
 * @apiSuccess {ObjectId} coursework.student ID of the student (ObjectId).
 * @apiSuccess {String} coursework.type Coursework type that is either onCampus or offCampus.
 * @apiSuccess {ObjectId} coursework.course ID of the Course in Coursework (ObjectId).
 * @apiSuccess {ObjectId} coursework.task ID of the task in Coursework (ObjectId).
 * @apiSuccess {String} coursework.objectID objectID either Practicals or Tutorial or Assignment .
 * @apiSuccess {ObjectId} coursework.activity Id of the activity in Coursework.
 * @apiSuccess {Number} coursework.marks Marks in the Coursework.
 */

// ------------------------------------------------------------------------------------------
// Module.
// ------------------------------------------------------------------------------------------

/**
 * @api {get} module/list Get Module List
 * @apiName GetModule
 * @apiGroup Module
 *
 * @apiQuery {Number} [no] Module number.
 * @apiQuery {String} [name] Name of the module.
 * @apiQuery {String} [outcome] Module outcome.
 * @apiQuery {String[]} [contents] Array of contents of the module.
 * @apiQuery {Number} [hrsPerModule] Number of hours required per module.
 * @apiQuery {String[]} [cognitiveLevels] Array of cognitive levels
 * of attainment as per Bloom's Taxanomy (L1-L6).
 *
 * @apiSuccess {module[]} res Array of Filtered module Doc.
 * @apiSuccess {String} module._id ID of document given by database.
 * @apiSuccess {String} module.no Module number.
 * @apiSuccess {String} module.name Name of the module.
 * @apiSuccess {String} module.outcome Module outcome.
 * @apiSuccess {String[]} module.contents Array of contents of the module.
 * @apiSuccess {Number} module.hrsPerModule Number of hours required per module.
 * @apiSuccess {String[]} module.cognitiveLevels Array of cognitive levels of
 * attainment as per Bloom's Taxanomy (L1-L6).
 */

// ------------------------------------------------------------------------------------------
// Attendance.
// ------------------------------------------------------------------------------------------

/**
 * @api {post} /attendance/add Add Attendance
 * @apiName AddAttendance
 * @apiGroup Attendance
 * @apiDescription Add a new attendance.
 *
 * @apiBody {String} student Student name.
 * @apiBody {String} course Course name.
 * @apiBody {Number} monthlyAttended Monthly attendance of student.
 * @apiBody {Number} monthlyOccured Monthly occured.
 * @apiBody {Number} cumulativeAttended sum of attendance of student.
 * @apiBody {Number} cumulativeOccured sum of occured.
 * 
 * @apiSuccess {String} res Response message.
 * @apiError (Error 500) UserNotFound The  of the User was not found
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "res": "added attendance Example Attendance"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "err": "Error while inserting in DB"
 *     }
 */

// ------------------------------------------------------------------------------------------
// Exam.
// ------------------------------------------------------------------------------------------

/**
 * @api {post} /exam/add Add Exam
 * @apiName AddExam
 * @apiExam Exam
 * @apiDescription Add a new exam.
 *
 * @apiBody {String} title Exam title.
 * @apiBody {ObjectId[]} students Array of student ObjectIDs.
 *
 * @apiSuccess {String} res Response message.
 * @apiError (Error 500) ExamAddError Error while adding the exam
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "res": "added exam Example Exam"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "err": "Error while inserting in DB"
 *     }
 */

/**
 * @api {post} /module/add Add Module
 * @apiName AddModule
 * @apiGroup Module
 *
 * @apiBody {Number} [no] Module number.
 * @apiBody {String} [name] Name of the module.
 * @apiBody {String} [outcome] Module outcome.
 * @apiBody {String[]} [contents] Array of contents of the module.
 * @apiBody {Number} [hrsPerModule] Number of hours required per module.
 * @apiBody {String[]} [cognitiveLevels] Array of cognitive levels
 * of attainment as per Bloom's Taxanomy (L1-L6).
 *
 * @apiSuccess {String} res added Module
 * @apiError (Error 500) Error while inserting in DB
 */

/**
 * @api {delete} /module/delete/:moduleId Delete Module
 * @apiName DeleteModule
 * @apiGroup Module
 *
 * @apiParam {String} moduleId The ID of the Module document to delete.
 *
 * @apiSuccess {String} res Success message indicating the deletion.
 *
 * @apiError (Error 500) DatabaseError Error message if there was an error during the deletion.
 */

/**
 * @api {post} /module/update/:moduleId Update Module
 * @apiName UpdateModule
 * @apiGroup Module
 * @apiDescription Update existing module data.
 *
 * @apiParam {String} moduleId The ID of the Module document to update.
 * @apiBody {Number} [no] Module number.
 * @apiBody {String} [name] Name of the module.
 * @apiBody {String} [outcome] Module outcome.
 * @apiBody {String[]} [contents] Array of contents of the module.
 * @apiBody {Number} [hrsPerModule] Number of hours required per module.
 * @apiBody {String[]} [cognitiveLevels] Array of cognitive levels
 * of attainment as per Bloom's Taxanomy (L1-L6).
 *
 * @apiSuccess {String} res Module updated.
 * @apiError (Error 500) DatabaseError Error in updating the database.
 */

//-----------------------------------------------------------------------------
// Organization
//-----------------------------------------------------------------------------

/**
 * @api {get} /organization/list Get Organisation List
 * @apiName GetOrganizationList
 * @apiGroup Organization
 *
 * @apiQuery [parent] Id of the parent of the organization
 * @apiQuery [startDate] starting date of the organization
 * @apiQuery [name] name of the organization
 * @apiQuery [accreditations] accreditation Id of the organization
 *
 * @apiSuccess {Orgaization[]} res array of filtered organization Doc
 * @apiSuccess {ObjectId} organization.parent Id of the parent of the organization
 * @apiSuccess {Date} organization.startDate starting date of the organization
 * @apiSuccess {String} organization.name name of the organization
 * @apiSuccess {ObjectId} organization.accreditations accreditation Id of the organization
 */

/**
 * @api {post} /organization/add Add Organisation
 * @apiName AddOrganization
 * @apiGroup Organization
 *
 * @apiBody {ObjectId} [parent] Id of the parent of the organization
 * @apiBody {Date} [startDate] starting date of the organization
 * @apiBody {String} [name] name of the organization
 * @apiBody {ObjectId} [accreditations] accreditation Id of the organization
 *
 * @apiSuccess {String} res added organization
 * @apiError (Error 500) Error while inserting in DB
 */

/**
 * @api {delete} /organization/delete/:organizationId Delete Organization
 * @apiName DeleteOrganization
 * @apiGroup Organization
 *
 * @apiParam {String} organizationId The ID of the Organization document to delete.
 *
 * @apiSuccess {String} res Success message indicating the deletion.
 *
 * @apiError (Error 500) DatabaseError Error message if there was an error during the deletion.
 */

// ------------------------------------------------------------------------------------------
// Paper.
// ------------------------------------------------------------------------------------------
//
/**
 * @api {post} /paper/add Add Paper
 * @apiName AddPaper
 * @apiDescription Adds a new Paper.
 * @apiGroup Paper
 *
 * @apiBody {String} [answersheetID] The id of the Answersheet.
 * @apiBody {connector.Schema.Types.ObjectId} Exam The Exam which is associated.
 * @apiBody {connector.Schema.Types.ObjectId} Student The Student which is associated.
 * @apiBody {connector.Schema.Types.ObjectId} Faculty The Faculty which is associated.
 * @apiBody {Number} [marks] marks in the paper.
 *
 * @apiSuccess {String} res added Paper successfully.
 *
 * @apiError (Error 500) DatabaseError Error while inserting in the DB.
 *
 */

/**
 * @api {get} /paper/list Listdown Paper
 * @apiName GetPaper
 * @apiDescription Listdown the Paper.
 * @apiGroup Paper
 *
 * @apiQuery {String} [answersheetID] The id of the Answersheet.
 * @apiQuery {connector.Schema.Types.ObjectId} Exam The Exam which is associated.
 * @apiQuery {connector.Schema.Types.ObjectId} Student The Student which is associated.
 * @apiQuery {connector.Schema.Types.ObjectId} Faculty The Faculty which is associated.
 * @apiQuery {Number} [marks] marks in the paper.
 *
 * @apiSuccess {Paper[]} res Array of Filtered Paper Doc.
 * @apiSuccess {String} paper._id ID of paper given by database.
 * @apiSuccess {String} paper.answersheetID ID of answersheet.
 * @apiSuccess {connector.Schema.Types.ObjectId} paper.exam associated Exam.
 * @apiSuccess {connector.Schema.Types.ObjectId} paper.student associated Student.
 * @apiSuccess {connector.Schema.Types.ObjectId} paper.faculty associated Faculty.
 * @apiSuccess {Number} paper.marks The marks in the Paper.
 * @apiError (Error 500) err Error while fetching the data.
 */

/**
 * @api {delete} /paper/delete/:id Delete Paper
 * @apiName DeletePaper
 * @apiDescription Remove the existing Paper.
 * @apiGroup Paper
 *
 * @apiParam {String} id The ID of the Paper document to delete.
 *
 * @apiSuccess {String} res Paper deleted successfully.
 *
 * @apiError (Error 500) err Error while deleting from DB.
 *
* */

// ------------------------------------------------------------------------------------------
// Assignment.
// ------------------------------------------------------------------------------------------
/**
 * @api {post} /assignment/add Add assignment
 * @apiName Addassignment
 * @apiGroup Assignment
 * @apiDescription Add a new assignment.
 *
 * @apiBody {String} no Assignment number.
 * @apiBody {String} title assignment title.
 * @apiBody {String} type type of assignment.
 * @apiBody {Number} marks marks in assignment.
 *
 * @apiSuccess {String} res Response message.
 * @apiError (Error 500) UserNotFound The  of the User was not found
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "res": "added assignment Example Assignment"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "err": "Error while inserting in DB"
 *     }
 */

/**
 * @api {delete} /attendance/delete/:attendanceId To delete Attendance
 * @apiName DeleteAttendance
 * @apiGroup Attendance
 *
 * @apiParam {String} attendanceId The ID of the attendance document to delete.
 *
 * @apiSuccess {String} res Success message indicating the deletion.
 *
 * @apiError (Error 500) err Error message if there was an error during the deletion.
 *
* */

// ------------------------------------------------------------------------------------------
// Practical.
// ------------------------------------------------------------------------------------------

/**
 * @api {post} /practical/create Create Practical
 * @apiName CreatePractical
 * @apiGroup Practical
 *
 * @apiBody {Number} no Practical number.
 * @apiBody {String} title Title of the practical.
 * @apiBody {String} type Type of the practical.
 * @apiBody {Number} hours Number of hours required.
 * @apiBody {String[]} cognitiveLevels Array of cognitive levels (L1-L6).
 *
 * @apiSuccess {Object} res The created Practical entity.
 * @apiSuccess {String} res._id ID of the created entity.
 * @apiSuccess {Number} res.no Practical number.
 * @apiSuccess {String} res.title Title of the practical.
 * @apiSuccess {String} res.type Type of the practical.
 * @apiSuccess {Number} res.hours Number of hours required.
 * @apiSuccess {String[]} res.cognitiveLevels Array of cognitive levels (L1-L6).
 */

/**
 * @api {get} /practical/list List Practical
 * @apiName ListPractical
 * @apiGroup Practical
 *
 * @apiQuery {Number} [no] Filter by Practical number.
 * @apiQuery {String} [title] Filter by title.
 * @apiQuery {String} [type] Filter by type.
 * @apiQuery {Number} [hours] Filter by hours.
 * @apiQuery {String[]} [cognitiveLevels] Filter by cognitive levels (L1-L6).
 *
 * @apiSuccess {Object[]} res List of Practical entities.
 * @apiSuccess {String} res._id ID of the Practical entity.
 * @apiSuccess {Number} res.no Practical number.
 * @apiSuccess {String} res.title Title of the Practical.
 * @apiSuccess {String} res.type Type of the Practical.
 * @apiSuccess {Number} res.hours Number of hours required.
 * @apiSuccess {String[]} res.cognitiveLevels Array of cognitive levels (L1-L6).
 */

/**
 * @api {post} /practical/update/:id Update Practical
 * @apiName UpdatePractical
 * @apiGroup Practical
 *
 * @apiParam {String} id The ID of the Practical document to delete.
 * @apiBody {String} id ID of the Practical entity to update.
 * @apiBody {Number} [no] New Practical number.
 * @apiBody {String} [title] New title.
 * @apiBody {String} [type] New type.
 * @apiBody {Number} [hours] New hours.
 * @apiBody {String[]} [cognitiveLevels] New cognitive levels (L1-L6).
 *
 * @apiSuccess {Object} res The updated Practical entity.
 * @apiSuccess {String} res._id ID of the updated entity.
 * @apiSuccess {Number} res.no Updated Practical number.
 * @apiSuccess {String} res.title Updated title.
 * @apiSuccess {String} res.type Updated type.
 * @apiSuccess {Number} res.hours Updated hours.
 * @apiSuccess {String[]} res.cognitiveLevels Updated cognitive levels (L1-L6).
 */

/**
 * @api {delete} /practical/delete/:id Delete Practical
 * @apiName DeletePractical
 * @apiGroup Practical
 *
 * @apiParam {String} id ID of the Practical entity to delete.
 *
 * @apiSuccess {String} res Success message indicating the entity is deleted.
 */

/**
 * @api {error} 500 Internal Server Error
 * @apiName InternalServerError
 * @apiGroup Errors
 *
 * @apiError (Error 500) {String} err Error message for internal server errors.
 */

/**
 * @api {error} 404 Not Found
 * @apiName NotFoundError
 * @apiGroup Errors
 *
 * @apiError (Error 404) {String} err Error message for resource not found.
 */

/**
 * @api {error} 400 Bad Request
 * @apiName BadRequestError
 * @apiGroup Errors
 *
 * @apiError (Error 400) {String} err Error message for bad requests.
 */

// ------------------------------------------------------------------------------------------
// Group.
// ------------------------------------------------------------------------------------------

/**
 * @api {post} /group/add Add Group
 * @apiName AddGroup
 * @apiGroup Group
 * @apiDescription Add a new group.
 *
 * @apiBody {String} title Group title.
 * @apiBody {ObjectId[]} students Array of student ObjectIDs.
 *
 * @apiSuccess {String} res Response message.
 * @apiError (Error 500) GroupAddError Error while adding the group
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "res": "added group Example Group"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "err": "Error while inserting in DB"
 *     }
 */

/**
 * @api {delete} /exam/delete/:id Delete Exam
 * @apiName DeleteExam
 * @apiExam Exam
 *
 * @apiParam {ObjectId} id The ObjectID of the exam to delete.
 *
 * @apiSuccess {String} res Success message indicating the deletion.
 * @apiError (Error 500) ExamDeleteError Error while deleting the exam
 *
 */

/**
 * @api {delete} /assignment/delete/:assignmentId To delete Assignment
 * @apiName DeleteAssignment
 * @apiGroup Assignment
 *
 * @apiParam {String} assignmentId The ID of the assignment document to delete.
 *
 * @apiSuccess {String} res Success message indicating the deletion.
 *
 * @apiError (Error 500) err Error message if there was an error during the deletion.
 *
* */

/**
 * @api {post} /attendance/update update attendance details
 * @apiName UpdateAttendance
 * @apiGroup Attendance
 * @apiDescription update Existing attendance
 *
 * @apiBody {String} [student] Student name.
 * @apiBody {String} [course] Course name.
 * @apiBody {Number} [monthlyAttended] Monthly attendance of student.
 * @apiBody {Number} [monthlyOccured] Monthly occured.
 * @apiBody {Number} [cumulativeAttended] sum of attendance of student.
 * @apiBody {Number} [cumulativeOccured] sum of occured.
 *
 * @apiSuccess {String} res Attendance updated.
 * @apiError (Error 500) err Error in updating database
 *
 */

/**
 * @api {post} /paper/update/:id Update Paper
 * @apiName UpdatePaper
 * @apiGroup Paper
 * @apiDescription Update Existing Paper details except
 *
 * @apiParam {String} id The paper document to update.
 * @apiSuccess {Paper[]} res Array of Filtered Paper Doc .
 * @apiSuccess {String} paper._id ID of paper given by database.
 * @apiSuccess {String} paper.answersheetID Name of Infrastructure
 * @apiSuccess {connector.Schema.Types.ObjectId} paper.exam associated Exam.
 * @apiSuccess {connector.Schema.Types.ObjectId} paper.student associated Student.
 * @apiSuccess {connector.Schema.Types.ObjectId} paper.faculty associated Faculty.
 * @apiSuccess {Number} paper.marks The marks in the Paper.
 *
 * @apiSuccess {String} res Paper updated successfully.
 *
 * @apiError (Error 500) err Error while updating the data.s
 */

/**
 * @api {post} /assignment/update/:id update assignment details
 * @apiName UpdateAssignment
 * @apiGroup Assignment
 * @apiDescription update Existing assignment
 *
 * @apiParam {String} id The assignment document to update.
 * @apiBody {String} id Id of the assignment to be updated
 * @apiBody {String} [no] Assignment number.
 * @apiBody {String} [title] assignment title.
 * @apiBody {String} [type] type of assignment.
 * @apiBody {Number} [marks] marks in assignment.
 *
 * @apiSuccess {String} res Assignment updated.
 * @apiError (Error 500) err Error in updating database
 *
 */

/**
 * @api {get} attendance/list Get Attendance List
 * @apiName GetAttendance
 * @apiGroup Attendance
 *
 * @apiBody {String} [student] Student name.
 * @apiBody {String} [course] Course name.
 * @apiBody {Number} [monthlyAttended] Monthly attendance of student.
 * @apiBody {Number} [monthlyOccured] Monthly occured.
 * @apiBody {Number} [cumulativeAttended] sum of attendance of student.
 * @apiBody {Number} [cumulativeOccured] sum of occured.
 *
 * @apiSuccess {attendance[]} res Array of Filtered attendance Doc.
 * @apiSuccess {String} attendance._id ID of document given by database.
 * @apiSuccess {String} attendance.student Name of student.
 * @apiSuccess {String} attendance.course Name of course.
 * @apiSuccess {Number} attendance.monthlyAttended Monthly attendance of student.
 * @apiSuccess {Number} attendance.cumulativeAttended sum of attendance of student.
 * @apiSuccess {Number} attendance.cumulativeOccured sum of occured.
 */

/**
 * @api {post} /exam/update/:id Update Exam Details
 * @apiName UpdateExam
 * @apiExam Exam
 * @apiDescription Update existing exam details.
 *
 * @apiParam {ObjectId} id The ObjectID of the exam to update.
 * @apiBody {String} [title] Exam title.
 * @apiBody {ObjectId[]} [students] Array of student ObjectIDs.
 *
 * @apiSuccess {String} res Exam updated.
 * @apiError (Error 500) ExamUpdateError Error in updating database
 *
 */

/**
 * @api {get} assignment/list Get Assignment List
 * @apiName GetAssignment
 * @apiGroup Assignment
 *
 * @apiBody {String} [no] Number of assignment.
 * @apiBody {String} [title] Title of assignment.
 * @apiBody {String} [type] type of assignment.
 * @apiBody {Number} [marks] marks in assignment.
 *
 * @apiSuccess {assignment[]} res Array of Filtered assignment Doc.
 * @apiSuccess {String} assignment._id ID of document given by database.
 * @apiBody {String} [no] Number of assignment.
 * @apiBody {String} [title] Title of assignment.
 * @apiBody {String} [type] type of assignment.
 * @apiBody {Number} [marks] marks in assignment.
 */

// ------------------------------------------------------------------------------------------
// Semester
// ------------------------------------------------------------------------------------------
/**
 * @api {post} /semester/add Request to add Semester information
 * @apiName Addsemester
 * @apiGroup Semester
 *
 * @apiQuery {Number} [number] Number of semester
 * @apiQuery {String} [academicYear] To show the current academic year
 * @apiQuery {String} [type] Stores the enum ODD or EVEN for semester
 * @apiQuery {Date} [startDate] Start date of the semester
 * @apiQuery {Date} [endDate] End date of the semester
 *
 * @apiSuccess {String} res Response message .
 * @apiError (Error 500) DatabaseError Err message if there is an error inserting into the database.
 *
 */

/**
 * @api {get} /semester/list Request to list Semester information
 * @apiName semesterlist
 * @apiGroup Semester
 *
 * @apiQuery {Number} [number] Number of semester
 * @apiQuery {String} [academicYear] To show the current academic year
 * @apiQuery {String} [type] Stores the enum ODD or EVEN for semester
 * @apiQuery {Date} [startDate] Start date of the semester
 * @apiQuery {Date} [endDate] End date of the semester
 *
 * @apiSuccess {semester[]} res Array of Filtered semester Doc.
 * @apiSuccess {Number} semester.number Number of semester
 * @apiSuccess {String} semester.academicYear To show the current academic year of the semester
 * @apiSuccess {String} semester.type Stores the enum ODD or EVEN for semester
 * @apiSuccess {Date} semester.startDate Start date of the semester
 * @apiSuccess {Date} semester.endDate End date of the semester
 *
 */

/**
 * @api {update} /semester/update/:id Request to update Semester information
 * @apiName Updatesemester
 * @apiGroup Semester
 *
 * @apiParam {String} id The ID of the Semester document to update.
 * @apiBody {Number} [number] Number of semester
 * @apiBody {String} [academicYear] To show the current academic year
 * @apiBody {String} [type] Stores the enum ODD or EVEN for semester
 * @apiBody {Date} [startDate] Start date of the semester
 * @apiBody {Date} [endDate] End date of the semester
 *
 * @apiSuccess {String} res Semester updated.
 * @apiError (Error 500) DatabaseError Error in updating the database.
 *
 */

/**
* @api {delete} /semester/delete/:id Request to list Semester information
* @apiName Deletesemester
* @apiGroup Semester
*
* @apiParam {String} id The ID of the Semester document to delete.
*
* @apiSuccess {String} res Success message indicating the deletion.
*
* @apiError (Error 500) DatabaseError Error message if there was an error during the deletion.
*/


// ------------------------------------------------------------------------------------------
// Activity.
// ------------------------------------------------------------------------------------------

/**
 * @api {post} /activity/add Add Activty.
 * @apiName AddActivity
 * @apiGroup Activity
 *
 * @apiBody {Date} startTime The startTime of the activity.
 * @apiBody {Number} duration The duration of the activity (in minutes).
 * @apiBody {ObjectId} course The course of the activity (ObjectId).
 * @apiBody {ObjectId} faculty The faculty alloted for the activity(ObjectId).
 * @apiBody {String} type The type of activity.One of possible LECTURE, PRACTICAL, TUTORIAL.
 * @apiBody {ObjectId} task The task of the activity (ObjectId).One of possible Topic,Practical,Tutorial.
 * @apiBody {ObjectId} group The group of the activity (ObjectId).
 * @apiBody {ObjectId} students the students who gonna attend the activity(ObjectId).
 *
 * @apiSuccess {String} res Response message.
 *
 * @apiError (Error 500) DatabaseError Error while inserting in the database.
 *
 * @apiDescription Adds a new Activity to the system.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "res": "Added activity"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "err": "Error while inserting in DB"
 *     }
 */

/**
 * @api {delete} /group/delete/:id Delete Group
 * @apiName DeleteGroup
 * @apiGroup Group
 *
 * @apiParam {ObjectId} id The ObjectID of the group to delete.
 *
 * @apiSuccess {String} res Success message indicating the deletion.
 * @apiError (Error 500) GroupDeleteError Error while deleting the group
 *
 */

/**
 * @api {post} /group/update/:id Update Group Details
 * @apiName UpdateGroup
 * @apiGroup Group
 * @apiDescription Update existing group details.
 *
 * @apiParam {ObjectId} id The ObjectID of the group to update.
 * @apiBody {String} [title] Group title.
 * @apiBody {ObjectId[]} [students] Array of student ObjectIDs.
 *
 * @apiSuccess {String} res Group updated.
 * @apiError (Error 500) GroupUpdateError Error in updating database
 *
 */

/**
 * @api {get} /exam/list Get Exam List
 * @apiName GetExamList
 * @apiExam Exam
 *
 * @apiQuery {String} [title] Title of the exam.
 *
 * @apiSuccess {Exam[]} res Array of filtered exam documents.
 * @apiSuccess {ObjectId} exam._id ObjectID of the exam document in the database.
 * @apiSuccess {String} exam.title Title of the exam.
 * @apiSuccess {ObjectId[]} exam.students Array of student ObjectIDs in the exam.
 */

/**
 * @api {get} /group/list Get Group List
 * @apiName GetGroupList
 * @apiGroup Group
 *
 * @apiQuery {String} [title] Title of the group.
 *
 * @apiSuccess {Group[]} res Array of filtered group documents.
 * @apiSuccess {ObjectId} group._id ObjectID of the group document in the database.
 * @apiSuccess {String} group.title Title of the group.
 * @apiSuccess {ObjectId[]} group.students Array of student ObjectIDs in the group.
 */
/**
 * @api {delete} /timetable/delete/:timetableId Delete Timetable
 * @apiName DeleteTimetable
 * @apiGroup Timetable
 *
 * @apiParam {String} timetableId The ID of the timetable document to delete.
 *
 * @apiSuccess {String} res Success message indicating the deletion.
 *
 * @apiError (Error 500) DatabaseError Error message if there was an error during the deletion.
 */

/**
 * @api {post} /organization/update/:organizationId Update Organisation
 * @apiName UpdateOrganization
 * @apiGroup Organization
 *
 * @apiParam {String} organizationId The ID of the organization document to update.
 * @apiBody {ObjectId} [parent] Id of the parent of the organization
 * @apiBody {Date} [startDate] starting date of the organization
 * @apiBody {String} [name] name of the organization
 * @apiBody {ObjectId} [accreditations] accreditation Id of the organization
 *
 * @apiSuccess {String} res organization updated
 * @apiError (Error 500) Error while inserting in DB
 */

/**
 * @api {delete} /activity/delete/:activity Delete Activity.
 * @apiName DeleteActivity
 * @apiGroup Activity
 *
 * @apiParam {String} activity The activity document to delete.
 *
 * @apiSuccess {String} res Success message indicating the deletion.
 *
 * @apiError (Error 500) DatabaseError Error message if there was an error during the deletion.
 */

/**
 * @api {post} /activity/update/:id Update Activity
 * @apiName UpdateTimetable
 * @apiGroup Timetable
 * @apiDescription Update existing timetable data.
 *
 * @apiParam {String} id The timetable document to update.
 * @apiBody {Date} startTime The startTime of the activity.
 * @apiBody {Number} duration The duration of the activity (in minutes).
 * @apiBody {ObjectId} course The course of the activity (ObjectId).
 * @apiBody {ObjectId} faculty The faculty alloted for the activity(ObjectId).
 * @apiBody {String} type The type of activity.One of possible LECTURE, PRACTICAL, TUTORIAL.
 * @apiBody {ObjectId} task The task of the activity (ObjectId).One of possible Topic,Practical,Tutorial.
 * @apiBody {ObjectId} group The group of the activity (ObjectId).
 * @apiBody {ObjectId} students the students who gonna attend the activity(ObjectId).
 *
 * @apiSuccess {String} res Timetable updated.
 */

/**
 * @api {post} /activity/update/:id Update Activity.
 * @apiName UpdateActivity
 * @apiGroup Activity
 * @apiDescription Update existing activity data.
 *
 * @apiParam {String} id The activity document to update.
 * @apiBody {Date} startTime The startTime of the activity.
 * @apiBody {Number} duration The duration of the activity (in minutes).
 * @apiBody {ObjectId} course The course of the activity (ObjectId).
 * @apiBody {ObjectId} faculty The faculty alloted for the activity(ObjectId).
 * @apiBody {String} type The type of activity.One of possible LECTURE, PRACTICAL, TUTORIAL.
 * @apiBody {ObjectId} task The task of the activity (ObjectId).One of possible Topic,Practical,Tutorial.
 * @apiBody {ObjectId} group The group of the activity (ObjectId).
 * @apiBody {ObjectId} students the students who gonna attend the activity(ObjectId).
 *
 * @apiSuccess {String} res Activity updated.
 * @apiError (Error 500) DatabaseError Error in updating the database.
 */

/**
 * @api {get} /timetable/list Get Timetable List
 * @apiName GetTimetableList
 * @apiGroup Timetable
 *
 * @apiQuery {Date} startTime The startTime of the activity.
 * @apiQuery {Number} duration The duration of the activity (in minutes).
 * @apiQUERY {ObjectId} course The course of the activity (ObjectId).
 * @apiQuery {ObjectId} faculty The faculty alloted for the activity(ObjectId).
 * @apiQuery {String} type The type of activity.One of possible LECTURE, PRACTICAL, TUTORIAL.
 * @apiQuery {ObjectId} task The task of the activity (ObjectId).One of possible Topic,Practical,Tutorial.
 * @apiQuery {ObjectId} group The group of the activity (ObjectId).
 * @apiQuery {ObjectId} students the students who gonna attend the activity(ObjectId).
 *
 * @apiSuccess {Date} startTime The startTime of the activity.
 * @apiSuccess {Number} duration The duration of the activity (in minutes).
 * @apiSuccess {ObjectId} course The course of the activity (ObjectId).
 * @apiSuccess {ObjectId} faculty The faculty alloted for the activity(ObjectId).
 * @apiSuccess {String} type The type of activity.One of possible LECTURE, PRACTICAL, TUTORIAL.
 * @apiSuccess {ObjectId} task The task of the activity (ObjectId).One of possible Topic,Practical,Tutorial.
 * @apiSuccess {ObjectId} group The group of the activity (ObjectId).
 * @apiSuccess {ObjectId} students the students who gonna attend the activity(ObjectId).
 */

/**
 * @api {get} /activity/list Get Activity List
 * @apiName GetActivityList
 * @apiGroup Activity
 *
 * @apiQuery {Date} startTime The startTime of the activity.
 * @apiQuery {Number} duration The duration of the activity (in minutes).
 * @apiQUERY {ObjectId} course The course of the activity (ObjectId).
 * @apiQuery {ObjectId} faculty The faculty alloted for the activity(ObjectId).
 * @apiQuery {String} type The type of activity.One of possible LECTURE, PRACTICAL, TUTORIAL.
 * @apiQuery {ObjectId} task The task of the activity (ObjectId).One of possible Topic,Practical,Tutorial.
 * @apiQuery {ObjectId} group The group of the activity (ObjectId).
 * @apiQuery {ObjectId} students the students who gonna attend the activity(ObjectId).
 *
 * @apiSuccess {Date} startTime The startTime of the activity.
 * @apiSuccess {Number} duration The duration of the activity (in minutes).
 * @apiSuccess {ObjectId} course The course of the activity (ObjectId).
 * @apiSuccess {ObjectId} faculty The faculty alloted for the activity(ObjectId).
 * @apiSuccess {String} type The type of activity.One of possible LECTURE, PRACTICAL, TUTORIAL.
 * @apiSuccess {ObjectId} task The task of the activity (ObjectId).One of possible Topic,Practical,Tutorial.
 * @apiSuccess {ObjectId} group The group of the activity (ObjectId).
 * @apiSuccess {ObjectId} students the students who gonna attend the activity(ObjectId).
 */

// ------------------------------------------------------------------------------------------
// Student.
// ------------------------------------------------------------------------------------------

/**
 * @api {post} /student/add Add student
 * @apiName AddStudent
 * @apiGroup Student
 * @apiDescription Add a new Student.
 *
 * @apiBody {String} ERP ID of the student.
 * @apiBody {String} name of the student.
 * @apiBody {Number} joining year of the student.
 * @apiBody {ObjectId} branch of the student (ObjectId).
 * @apiBody {String} division of the student.
 * @apiBody {Number} roll no of the student.
 * @apiBody {ObjectId} coursesOpted by the student(ObjectId).
 *
 * @apiSuccess {String} res Response message.
 * @apiError (Error 500) DatabaseError Err message if there is an error inserting into the database.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "res": "Added student"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "err": "Error while inserting in DB"
 *     }
 */

/**
 * @api {delete} /student/delete/:studentId Delete Student
 * @apiName DeleteStudent
 * @apiGroup Student
 *
 * @apiParam {String} studentId The ID of the Student document to delete.
 *
 * @apiSuccess {String} res Success message indicating the deletion.
 *
 * @apiError (Error 500) DatabaseError Error message if there was an error during the deletion.
 */

/**
 * @api {post} /student/update/:id Update Student
 * @apiName UpdateStudent
 * @apiGroup Student
 * @apiDescription Update existing student data.
 *
 * @apiParam {String} id The student document to update.
 * @apiBody {String} ERP ID of the student.
 * @apiBody {String} name of the student.
 * @apiBody {Number} joining year of the student.
 * @apiBody {ObjectId} branch of the student (ObjectId).
 * @apiBody {String} division of the student.
 * @apiBody {Number} roll no of the student.
 * @apiBody {ObjectId} coursesOpted by the student(ObjectId).
 *
 * @apiSuccess {String} res Student updated.
 * @apiError (Error 500) DatabaseError Error in updating the database.
 */

/**
 * @api {get} /student/list Get Student List
 * @apiName GetStudentList
 * @apiGroup Student
 *
 * @apiQuery {String} ERP ID of the student.
 * @apiQuery {String} name of the student.
 * @apiQuery {Number} joining year of the student.
 * @apiQuery {ObjectId} branch of the student (ObjectId).
 * @apiQuery {String} division of the student.
 * @apiQuery {Number} roll no of the student.
 * @apiQuery {ObjectId} coursesOpted by the student(ObjectId).
 *
 * @apiSuccess {Student[]} res Array of filtered student documents.
 * @apiSuccess {String} student._id ID of the student document given by the database.
 * @apiSuccess {String} student.ERP ID of the student.
 * @apiSuccess {String} student.name of the student.
 * @apiSuccess {Number} student.joining year of the student.
 * @apiSuccess {ObjectId} student.branch of the student (ObjectId).
 * @apiSuccess {String} student.division of the student.
 * @apiSuccess {Number} student.roll no of the student.
 * @apiSuccess {ObjectId} student.coursesOpted by the student(ObjectId).
 */

// ------------------------------------------------------------------------------------------
// notification
// ------------------------------------------------------------------------------------------

/**
 * @api {post} /notification/add Add Notification
 * @apiName AddNotification
 * @apiGroup Notification
 * @apiDescription Adds a new notification to the system.
 *
 * @apiBody {String} data Notification data.
 * @apiBody {String} title Notification title.
 * @apiBody {String} from User ID of the sender (Faculty).
 * @apiBody {String} type Notification type (Student/Faculty).
 * @apiBody {String[]} filter Array of targeted User IDs.
 *
 * @apiSuccess {String} res Success message with the ID of the added notification.
 *
 * @apiError (Error 500) DatabaseError Error while inserting in the database.
 *
 */

/**
 * @api {get} /notification/list Get Notification List
 * @apiName GetNotification
 * @apiGroup Notification
 *
 * @apiQuery {String} [from] User ID of the sender (Faculty).
 * @apiQuery {String} [type] Notification type (Student/Faculty).
 * @apiQuery {String} [title] notification title.
 * @apiQuery {String} [data] notification data.
 * @apiQuery {String[]} [filter] array of targeted User IDs.
 *
 * @apiSuccess {Notification[]} res Array of filtered Notification documents.
 * @apiSuccess {String} notification._id ID of the document given by the database.
 * @apiSuccess {String} notification.data Notification data.
 * @apiSuccess {String} notification.title Notification title.
 * @apiSuccess {String} notification.from User ID of the sender (Faculty).
 * @apiSuccess {String} notification.type Notification type (Student/Faculty).
 * @apiSuccess {String[]} notification.filter Array of targeted User IDs.
 */

/**
 * @api {delete} /notification/delete/:notificationId Delete Notification
 * @apiName DeleteNotification
 * @apiGroup Notification
 *
 * @apiParam {String} notificationId The ID of the notification document to delete.
 *
 * @apiSuccess {String} res Success message indicating the deletion.
 *
 * @apiError (Error 500) err Error message if there was an error during the deletion.
 */

/**
 * @api {post} /notification/update Update Notification Details
 * @apiName UpdateNotification
 * @apiGroup Notification
 *
 * @apiBody {String} id ID of the notification to be updated.
 * @apiBody {String} [data] Updated notification data.
 * @apiBody {String} [title] Updated notification title.
 * @apiBody {String} [from] Updated User ID of the sender (Faculty).
 * @apiBody {String} [type] Updated notification type (Student/Faculty).
 * @apiBody {String[]} [filter] Updated array of targeted User IDs.
 *
 * @apiSuccess {String} res Notification updated.
 * @apiError (Error 500) err Error in updating the database.
 
// ------------------------------------------------------------------------------------------
// Topic.
// ------------------------------------------------------------------------------------------

/**
 * @api {post} /topic/add Add topic
 * @apiName AddTopic
 * @apiGroup Topic
 * @apiDescription Add a new Topic.
 *
 * @apiBody {String} Title of the content(topic).
 *
 * @apiSuccess {String} res Response message.
 * @apiError (Error 500) DatabaseError Err message if there is an error inserting into the database.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "res": "Added topic"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "err": "Error while inserting in DB"
 *     }
 */

// ------------------------------------------------------------------------------------------
// Faculty
// ------------------------------------------------------------------------------------------
/**
 * @api {post} /faculty/add Add Faculty
 * @apiName AddFaculty
 * @apiGroup Faculty
 * @apiDescription Add a new faculty member.
 *
 * @apiBody {String} ERPID Employee ID of the faculty.
 * @apiBody {Date} dateOfJoining Date of joining the institution.
 * @apiBody {Date} dateOfLeaving Date of leaving the institution.
 * @apiBody {String} profileLink Link to faculty member's profile.
 * @apiBody {String[]} qualifications List of qualifications.
 * @apiBody {Number} totalExperience Total years of experience.
 * @apiBody {String[]} achievements List of achievements.
 * @apiBody {String[]} areaOfSpecialization List of areas of specialization.
 * @apiBody {Number} papersPublishedPG Number of papers published at the PG level.
 * @apiBody {Number} papersPublishedUG Number of papers published at the UG level.
 * @apiBody {ObjectId} department ID of the department (ObjectId).
 * @apiBody {ObjectId[]} preferredSubjects List of preferred subjects (ObjectId).
 * @apiBody {String[]} designation Faculty member's designation (one of the possible values: "HOD", "Assistant Professor", "Associate Professor", "Activity Head").
 * @apiBody {String} natureOfAssociation Nature of association with the institution (one of the possible values: "Regular", "Contract", "Adjunct").
 * @apiBody {String} additionalResponsibilities Additional responsibilities of the faculty.
 *
 * @apiSuccess {String} res Response message.
 * @apiError (Error 500) DatabaseError Err message if there is an error inserting into the database.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "res": "Added faculty"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "err": "Error while inserting in DB"
 *     }
 */

/**
 * @api {delete} /topic/delete/:topicId Delete Topic
 * @apiName DeleteTopic
 * @apiGroup Topic
 *
 * @apiParam {String} topicId The ID of the Topic document to delete.
 *
 * @apiSuccess {String} res Success message indicating the deletion.
 *
 * @apiError (Error 500) DatabaseError Error message if there was an error during the deletion.
 */

/**
 * @api {delete} /faculty/delete/:facultyId Delete Faculty
 * @apiName DeleteFaculty
 * @apiGroup Faculty
 *
 * @apiParam {String} facultyId The ID of the faculty member to delete.
 *
 * @apiSuccess {String} res Success message indicating the deletion.
 *
 * @apiError (Error 500) DatabaseError Error message if there was an error during the deletion.
 */

/**
 * @api {post} /topic/update/:id Update Topic
 * @apiName UpdateTopic
 * @apiGroup Topic
 * @apiDescription Update existing topic data.
 *
 * @apiParam {String} id The topic document to update.
 *
 * @apiSuccess {String} res Topic updated.
 * @apiError (Error 500) DatabaseError Error in updating the database.
 */

/**
 * @api {post} /faculty/update/:id Update Faculty
 * @apiName UpdateFaculty
 * @apiGroup Faculty
 * @apiDescription Update existing faculty member's data.
 *
 * @apiParam {String} id The faculty member's document to update.
 * @apiBody {String} id ID of the faculty member to be updated.
 * @apiBody {String} ERPID Employee ID of the faculty.
 * @apiBody {Date} dateOfJoining Date of joining the institution.
 * @apiBody {Date} dateOfLeaving Date of leaving the institution.
 * @apiBody {String} profileLink Link to faculty member's profile.
 * @apiBody {String[]} qualifications List of qualifications.
 * @apiBody {Number} totalExperience Total years of experience.
 * @apiBody {String[]} achievements List of achievements.
 * @apiBody {String[]} areaOfSpecialization List of areas of specialization.
 * @apiBody {Number} papersPublishedPG Number of papers published at the PG level.
 * @apiBody {Number} papersPublishedUG Number of papers published at the UG level.
 * @apiBody {ObjectId} department ID of the department (ObjectId).
 * @apiBody {ObjectId[]} preferredSubjects List of preferred subjects (ObjectId).
 * @apiBody {String[]} designation Faculty member's designation (one of the possible values: "HOD", "Assistant Professor", "Associate Professor", "Activity Head").
 * @apiBody {String} natureOfAssociation Nature of association with the institution (one of the possible values: "Regular", "Contract", "Adjunct").
 * @apiBody {String} additionalResponsibilities Additional responsibilities of the faculty.
 *
 * @apiSuccess {String} res Faculty member's data updated.
 * @apiError (Error 500) DatabaseError Error in updating the database.
 */

/**
 * @api {get} /topic/list Get Topic List
 * @apiName GetTopicList
 * @apiGroup Topic
 *
 * @apiQuery {String} Title of the content(topic).
 *
 * @apiSuccess {Topic[]} res Array of filtered topic documents.
 * @apiSuccess {String} topic._id ID of the topic document given by the database.
 */

/**
 * @api {get} /faculty/list Get Faculty List
 * @apiName GetFacultyList
 * @apiGroup Faculty
 *
 * @apiQuery {String} ERPID Employee ID of the faculty.
 * @apiQuery {Date} dateOfJoining Date of joining the institution.
 * @apiQuery {Date} dateOfLeaving Date of leaving the institution.
 * @apiQuery {String} profileLink Link to faculty member's profile.
 * @apiQuery {String[]} qualifications List of qualifications.
 * @apiQuery {Number} totalExperience Total years of experience.
 * @apiQuery {String[]} achievements List of achievements.
 * @apiQuery {String[]} areaOfSpecialization List of areas of specialization.
 * @apiQuery {Number} papersPublishedPG Number of papers published at the PG level.
 * @apiQuery {Number} papersPublishedUG Number of papers published at the UG level.
 * @apiQuery {ObjectId} department ID of the department (ObjectId).
 * @apiQuery {ObjectId[]} preferredSubjects List of preferred subjects (ObjectId).
 * @apiQuery {String[]} designation Faculty member's designation (one of the possible values: "HOD", "Assistant Professor", "Associate Professor", "Activity Head").
 * @apiQuery {String} natureOfAssociation Nature of association with the institution (one of the possible values: "Regular", "Contract", "Adjunct").
 * @apiQuery {String} additionalResponsibilities Additional responsibilities of the faculty.
 *
 * @apiSuccess {Faculty[]} res Array of filtered faculty member documents.
 * @apiSuccess {String} faculty._id ID of the faculty member document given by the database.
 * @apiSuccess {String} faculty.ERPID Employee ID of the faculty.
 * @apiSuccess {Date} faculty.dateOfJoining Date of joining the institution.
 * @apiSuccess {Date} faculty.dateOfLeaving Date of leaving the institution.
 * @apiSuccess {String} faculty.profileLink Link to faculty member's profile.
 * @apiSuccess {String[]} faculty.qualifications List of qualifications.
 * @apiSuccess {Number} faculty.totalExperience Total years of experience.
 * @apiSuccess {String[]} faculty.achievements List of achievements.
 * @apiSuccess {String[]} faculty.areaOfSpecialization List of areas of specialization.
 * @apiSuccess {Number} faculty.papersPublishedPG Number of papers published at the PG level.
 * @apiSuccess {Number} faculty.papersPublishedUG Number of papers published at the UG level.
 * @apiSuccess {ObjectId} faculty.department ID of the department.
 * @apiSuccess {ObjectId[]} faculty.preferredSubjects List of preferred subjects.
 * @apiSuccess {String[]} faculty.designation Faculty member's designation.
 * @apiSuccess {String} faculty.natureOfAssociation Nature of association with the institution.
 * @apiSuccess {String} faculty.additionalResponsibilities Additional responsibilities of the faculty.
 */
