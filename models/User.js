import { model, models, Schema } from "mongoose";

/*  
    user schema : it represents a user in the system
    ref         : reference to the Property model -> it is the list of bookmarked properties by the user
*/
const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    bookmarks: [{ type: Schema.Types.ObjectId, ref: "Property" }],
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;