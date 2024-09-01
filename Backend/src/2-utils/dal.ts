import mysql2, { PoolOptions, QueryError, QueryResult } from "mysql2";
import { appConfig } from "./app-config";

// DAL: Data Access Layer
class Dal {

    // Database options: 
    private options: PoolOptions = {
        host: appConfig.mySqlHost, // The computer name or ip address containing the database
        user: appConfig.mySqlUser, // Database username
        password: appConfig.mySqlPassword, // Database password
        database: appConfig.mySqlDatabase // Database name
    };

    // Connection object to the database:
    private readonly connection = mysql2.createPool(this.options);

    // Executing query to MySQL:
    public execute(sql: string, values?: any[]) {
        return new Promise<any>((resolve, reject) => { // To Promisify
            this.connection.query(sql, values, (err: QueryError, result: any) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}

export const dal = new Dal();
