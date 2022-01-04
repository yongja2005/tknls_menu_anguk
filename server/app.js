import express from 'express'
import helmet from 'helmet'
import hpp from 'hpp'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import config from './config'

//Routes
import postRoutes from './routes/api/post'
import userRoutes from './routes/api/user'
import authRoutes from './routes/api/auth'
import searchRoutes from './routes/api/search'

const app = express()
const { MONGO_URI} = config

app.use(hpp());
app.use(helmet());

// origin: true => 모두 허용
app.use(cors({origin: true, Credential: true}));
app.use(morgan("dev"));

app.use(express.json());

mongoose.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(()=> console.log("MongoDB conneting..."))
	.catch((e)=> console.log("MongoDB error"))

	// Use routes
	app.use("/api/post", postRoutes);
	app.use("/api/user", userRoutes);
	app.use("/api/auth", authRoutes);
	app.use("/api/search", searchRoutes);

export default app;
