import mongoose from "mongoose";

const options: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const ConnectionDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN! || '');
    console.log("Database connect");
  } catch (error) {
    console.log(error);
    throw new Error("Please check your DataBase");
  }
};

export { ConnectionDataBase };
