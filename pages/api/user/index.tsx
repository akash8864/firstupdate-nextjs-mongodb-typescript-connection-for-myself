import { IUser } from "interfaces/IUser";
import { User } from "models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "utils";
export default async function getPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await connectToDatabase();
      //const body: IUser = req.body;
      const body:IUser=
      {
           name:req.body.name,
           shortName:req.body.shortName,
           image:req.body.image,
           skills:req.body.skills,
           status:Array.isArray(req.body.status) ? req.body.status : [req.body.status],
           role:Array.isArray(req.body.role) ? req.body.role : [req.body.role],
           lastActivity:req.body.lastActivity,
           projects:req.body.projects,
           createdBy:req.body.createdBy,
           createdAt:req.body.createdAt,
           updatedBy:req.body.updatedBy,
           updatedAt:req.body.updatedAt
      }
      const newPost = new User(body);
      const saved = await newPost.save();
      res.send(saved);
    } catch (err) {
      console.log(err);
      res.status(500).send("error");
    }
  } else {
    res.status(405).json({ messagge: "Method not allowed" });
  }
}
