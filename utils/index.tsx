import { connect } from "mongoose"
const MONGO_URI = "mongodb://localhost:27017/next_test"
export const connectToDatabase = () => connect(MONGO_URI)