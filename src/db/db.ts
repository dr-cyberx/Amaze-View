import mongoose from 'mongoose';

export const connectDB = (uri: string): Promise<any> => new Promise((resolve: any, reject: any) => {
  mongoose
    .connect(uri)
    .then(() => {
      resolve('successfully connected to DB');
    })
    .catch(() => {
      reject('DB connection failed');
    });
});
