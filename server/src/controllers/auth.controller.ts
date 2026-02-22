import {ENV} from "../lib/env.js";
import {prisma} from "../lib/prisma.js";
import {client} from "../lib/redis.js";
import {generateAccessToken} from "../middlewares/jwt.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import AsyncHandler from "../utils/async-handler.js";
import {hashPassword} from "../utils/bcrypt.js";
import crypto from "crypto";
import {sendRegistrationEmail} from "../utils/userMail.js";

/**
 * @route POST /auth/register
 * @desc Register user controller
 * @access public

1. get data from req.body
2. check for all required fields
3. validate user details
4. check user already exists using email
5. save verification in Redis
6. save user details to DB
7. generate tokens
8. send verification mail
9. send response
10. welcome mail
*/
export const registerUser = AsyncHandler(async (req: any, res: any) => {
  const {username, email, password} = req.body;

  if (!username || !email || !password) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  const existingUser = await prisma.user.findUnique({
    where: {email},
  });

  if (existingUser) {
    return res.status(400).json(new ApiError(400, "User already exists"));
  }

  const existingUsername = await prisma.user.findUnique({
    where: {username},
  });
  if (existingUsername) {
    return res.status(400).json(new ApiError(400, "Username already exists"));
  }

  //hash password
  const hashedPassword = await hashPassword(password);
  const avatarUrl = `https://api.dicebear.com/9.x/bottts/svg?seed=${username}`;

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      avatarUrl,
    },
  });

  //access & refresh token
  const payload = {
    id: user.id,
    email: user.email,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateAccessToken(payload);

  const options = {
    httpOnly: true,
    sameSite: "lax",
    secure: ENV.NODE_ENV === "PRODUCTION",
  };

  res.cookie("accessToken", accessToken, options);
  res.cookie("refreshToken", refreshToken, options);

  //generate verify email
  const verificationToken = crypto.randomBytes(32).toString("hex");
  await client.set(`verify-token:${user.id}`, verificationToken, {EX: 10 * 60});
  const verificationLink = `${req.protocol}://${req.get("host")}/api/v1/verify-email?verify=${verificationToken}`;
  await sendRegistrationEmail(user.email, user.username, verificationLink);

  return res.status(201).json(
    new ApiResponse(201, "User created successfully...", {
      accessToken,
      refreshToken,
    })
  );
});

/**
 * @route POST /auth/login
 * @desc Login user controller
 * @access public
 */
export const loginUser = AsyncHandler(async (req: any, res: any) => {
  /*
1. get email & password from req.body
2. check for all required fields
3. check user already exists using email
4. check for email verification
5. verify credentials
6. generate access & refresh tokens
7. save refresh token in redis
8. send response
*/
});

/**
 * @route GET /auth/verify-email
 * @desc Verify email controller
 * @access public
 */
export const verifyEmail = AsyncHandler(async (req: any, res: any) => {
  /*
1. get verification token from the query 
2. get verify-email token from redis
3. check whether they are matched or not 
4. if matched then update user info. as isVerified= true
5. send response
*/
});

/**
 * @route POST /auth/logout
 * @desc logout user controller
 * @access public
 */
export const logoutUser = AsyncHandler(async (req: any, res: any) => {
  /*
1. clear all cookies of the user
2. clear refresh token from redis also
3. send response
  */
});

/**
 * @route POST /auth/refresh-token
 * @desc Refresh access token controller
 * @access public
 */
export const refreshAccessToken = AsyncHandler(async (req: any, res: any) => {
  /*
1. get refresh token from cookies
2. check for token expiry
3. verify the refresh token matching with token in Redis
4. call generateToken() for access token
5. send token in cookies
  */
});

/**
 * @route POST /auth/forgot-password
 * @desc forgot password controller
 * @access public
 */
export const forgotPassword = AsyncHandler(async (req: any, res: any) => {
  /*
1. get email from req.body
2. find user from db
3. generate 6-digit otp
4. store the otp & email in redis for 10 min
5. send otp in email
6. send response
  */
});

/**
 * @route POST /auth/reset-password
 * @desc reset password controller
 * @access public
 */
export const resetPassword = AsyncHandler(async (req: any, res: any) => {
  /*
1. get data from req.body
2. get otp from redis 
3. verify otp
4. update password in db
5. delete otp
6. send response
 */
});
