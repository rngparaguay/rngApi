import "reflect-metadata"
import app from "./app/server/app";
import { AppDataSource } from "./app/database/db";

async function main() {
    try {
        await AppDataSource.initialize();
        console.log("Database Connected");
        app.listen(3000);
        console.log(`Server listening on port ${3000}`);
    } catch (error) {
        console.log(error);
    }
}

main();
