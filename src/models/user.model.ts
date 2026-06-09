import mongoose, { Document } from "mongoose";
import { IUser } from "../types/user.types";
import bcrypt from "bcrypt";


interface UserDocument extends Omit<IUser, "_id">, Document {
  comparePassword(CandidatePassword: string): boolean;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    mobile: {
      type: String,
      minlength: [10, "Mobile number must be at least 10 digits"],
      maxlength: [10, "Mobile number must be at most 10 digits"],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", function (): void {
  if (!this.isModified("password")) return;
  this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePassword = function (CandidatePassword: string): boolean {
  return bcrypt.compareSync(CandidatePassword, this.password);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
