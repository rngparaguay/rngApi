import "reflect-metadata"
import app from "./app/server/app";
import { AppDataSource } from "./app/database/db";

async function main() {
    try {
        await AppDataSource.initialize();
        console.log("Database Connected");
        app.listen(process.env.PORT);
        console.log(`Server listening on port ${process.env.PORT}`);
    } catch (error) {
        console.log(error);
    }
}

main();
