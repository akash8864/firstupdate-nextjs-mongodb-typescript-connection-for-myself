import { IUser } from "interfaces/IUser";
import { User } from "models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "utils";
connectToDatabase();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET":
      try {
        const user = await User.findById(id);
        if (!user) {
          return res.status(400).json({ success: false });
        }
        res.status(201).json(user);
      } catch (err) {
        return res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!user) {
          return res.status(400).json({ success: false });
        }
        res.status(201).json(user);
      } catch (err) {
        return res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const user = await User.deleteOne({ _id: id });
        if (!user) {
          return res.status(400).json({ success: false });
        }
        res.status(201).json(user);
      } catch (err) {
        return res.status(400).json({ success: false });
      }
      break;
    default:
      return res.status(400).json({ success: false });
  }
};
