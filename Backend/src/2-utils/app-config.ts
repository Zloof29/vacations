import dotenv from "dotenv";

// Load .env file to process.env object
dotenv.config();

class AppConfig {
    public readonly environment = process.env.ENVIRONMENT;
    public readonly isDevelopment = process.env.ENVIRONMENT === "development";
    public readonly isProduction = process.env.ENVIRONMENT === "production";
    public readonly port = process.env.PORT;
    public readonly mySqlHost = process.env.MYSQL_HOST;
    public readonly mySqlUser = process.env.MYSQL_USER;
    public readonly mySqlPassword = process.env.MYSQL_PASSWORD;
    public readonly mySqlDatabase = process.env.MYSQL_DATABASE;
}

export const appConfig = new AppConfig();
