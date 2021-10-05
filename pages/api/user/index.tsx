import { IUser } from "interfaces/IUser";
import { User } from "models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "utils";
connectToDatabase();
export default async function postuser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        //const body: IUser = req.body;
        const body: IUser = {
          name: req.body.name,
          shortName: req.body.shortName,
          image: req.body.image,
          skills: req.body.skills,
          status: Array.isArray(req.body.status)
            ? req.body.status
            : [req.body.status],
          role: Array.isArray(req.body.role) ? req.body.role : [req.body.role],
          lastActivity: req.body.lastActivity,
          projects: req.body.projects,
          createdBy: req.body.createdBy,
          createdAt: req.body.createdAt,
          updatedBy: req.body.updatedBy,
          updatedAt: req.body.updatedAt,
        };
        const newPost = new User(body);
        const saved = await newPost.save();
        res.send(saved);
      } catch (err) {
        console.log(err);
        res.status(500).send("error");
      }
      break;
    case "GET":
      try {
        const user = await User.find({});
        res.status(201).json( user );
      } catch (err) {
        res.status(201).json({ success: false });
      }
      break;
    default:
      {
        res.status(201).json({  success: false });
      }
      break;
  }
}
