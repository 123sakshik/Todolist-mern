import { json } from "express";
import { StatusCode } from "../utils/constants";

export const GetTodos = async(req,res) => {
    try {
        const list = await User.findById(req.userId)
        .select("-password")
        .populate('todos')
        .exec();

        return res.json(json(StatusCode.SUCCESS,"All todo list ",list))

    } catch (error) {
        return res.json(json(StatusCode.UNPROCESSABLE_ENTITY,"Error ",error))
    }

}