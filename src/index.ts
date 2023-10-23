import connectDB from "./db/connect";
import app from "./app";

const port = process.env.PORT || 5000;

const main = async () => {
  try {
    const isConnected = await connectDB();

    const server = app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });

    if (isConnected != undefined) {
      console.log("Database connected");
      server;
    } else {
      console.log("Database not connected");
      server.close(() => {
        process.exit(1);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

main();
