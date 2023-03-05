import cors from "cors";
import express from "express";
import morgan from "morgan";
import platformRoutes from "../routes/platform.routes";
import gameGenreRoutes from "../routes/gameGenre.routes";
import typeUserRoutes from "../routes/typeUser.routes";
import stateRoutes from "../routes/state.routes";
import cityRoutes from "../routes/city.routes";
import gameRoutes from "../routes/games.routes";
import profileRoutes from "../routes/profile.routes";
import userRoutes from "../routes/user.routes";
import 'dotenv/config';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


app.use("/platform", platformRoutes)
app.use("/gameGenre", gameGenreRoutes)
app.use("/typeUser", typeUserRoutes)
app.use("/state", stateRoutes)
app.use("/city", cityRoutes)
app.use("/game", gameRoutes)
app.use("/profile", profileRoutes)
app.use("/user", userRoutes)


export default app;

