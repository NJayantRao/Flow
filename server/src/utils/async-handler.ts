import ApiError from "./api-error.js";

const AsyncHandler = (fn: any) => {
  return async function (req: any, res: any, next: any) {
    try {
      const result = await fn(req, res, next);
      return result;
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(new ApiError(500, "❌❌ Internal Server Error..."));
    }
  };
};

export default AsyncHandler;
