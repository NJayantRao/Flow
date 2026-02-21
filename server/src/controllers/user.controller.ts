import AsyncHandler from "../utils/async-handler.js";

/**
 * @route POST /user/
 * @desc Register user controller
 * @access public
 */
export const registerUser = AsyncHandler(async (req: any, res: any) => {
  /*
1.get data from req.body
2.check for all required fields
3.check user already exists using email
4.validate user details
5.send verification mail
6.save user details to DB
7.generate tokens
8.send response
9.welcome mail
*/
});

export const loginUser = AsyncHandler(async (req: any, res: any) => {});

export const verifyEmail = AsyncHandler(async (req: any, res: any) => {});

export const logoutUser = AsyncHandler(async (req: any, res: any) => {});

export const refreshToken = AsyncHandler(async (req: any, res: any) => {});

export const getUserProfile = AsyncHandler(async (req: any, res: any) => {});

export const updateUserProfile = AsyncHandler(async (req: any, res: any) => {});

export const changePassword = AsyncHandler(async (req: any, res: any) => {});

export const forgotPassword = AsyncHandler(async (req: any, res: any) => {});

export const resetPassword = AsyncHandler(async (req: any, res: any) => {});
export const deleteUser = AsyncHandler(async (req: any, res: any) => {});
