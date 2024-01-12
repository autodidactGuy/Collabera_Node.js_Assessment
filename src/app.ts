import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB, disconnectDB } from './data/mongodbClient';
import router from './routes';
import { errorHandler } from './utils/helper';

const app = express();

app.use(cors({
    methods: ['GET','POST','DELETE','PUT']
}));

app.use(express.json());

app.use("/api", router);

app.use(errorHandler);

app.listen(process.env.PORT, async () => {
    console.log(`${process.env.PORT_MESSAGE} ${process.env.PORT}`);
    await connectDB();
});

process.on('SIGINT', async () => {
    await disconnectDB();
    process.exit(0);
});

process.on("SIGUSR2", async () => {
    await disconnectDB();
    process.exit(0);
});

export default app;