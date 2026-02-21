import AsyncHandler from "../utils/async-handler.js";

/**
 * @route GET /user/profile
 * @desc get user profile controller
 * @access private
 */
export const getUserProfile = AsyncHandler(async (req: any, res: any) => {
  /*
1. get userId from req.user.id
2. check user exists or not
3. send user info.
  */
});

/**
 * @route PATCH /user/profile
 * @desc update user profile controller
 * @access private
 */
export const updateUserProfile = AsyncHandler(async (req: any, res: any) => {
  /*
1. get userId from req.user.id
2. get data from req.body
3. validate data
4. update data in db
5. send response
  */
});

/**
 * @route PUT /user/password
 * @desc update user profile controller
 * @access private
 */
export const changePassword = AsyncHandler(async (req: any, res: any) => {
  /*
1. get data from req.body
2. check for all required fields
3. validate data
4. update password in db
5. send response
  */
});

export const deleteUser = AsyncHandler(async (req: any, res: any) => {
  /*
1. get userId from req.user.id
2. delete user from db 
3. send response
 */
});
