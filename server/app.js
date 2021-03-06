import express from 'express'
import helmet from 'helmet'
import hpp from 'hpp'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import config from './config'
import path from "path";

//Routes
import postRoutes from './routes/api/post'
import userRoutes from './routes/api/user'
import authRoutes from './routes/api/auth'
import searchRoutes from './routes/api/search'
import specialRoutes from './routes/api/special'

const app = express()
const { MONGO_URI} = config

const prod = process.env.NODE_ENV === "production";

app.use(hpp());
app.use(

	helmet({

	contentSecurityPolicy: false,

	})

	);

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
	app.use("/api/special", specialRoutes)

	if (prod) {
		app.use(express.static(path.join(__dirname, "../client/build")));
		app.get("*", (req, res) => {
			res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
		});
	}

export default app;
