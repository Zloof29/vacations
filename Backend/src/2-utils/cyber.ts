import jwt, { SignOptions } from "jsonwebtoken";
import { UserModel } from "../3-models/user-model";
import { Role } from "../3-models/enums";
import crypto from "crypto";

class Cyber {

    // Secret key: 
    private secretKey = "TheAmazing4578-99Students!";

    private hashingSalt = "MakeThingsGoRight!!!";

    public hash(plainText: string): string {

        // Hash without salt: 
        // return crypto.createHash("sha512").update(plainText).digest("hex"); // Returns 128 chars string.

        // Hash with salt: 
        return crypto.createHmac("sha512", this.hashingSalt).update(plainText).digest("hex"); // Returns 128 chars string.
    }

    // Generate new JWT token:
    public generateNewToken(user: UserModel): string {

        // Remove password: 
        delete user.password;

        // User container:
        const container = { user };

        // Expires: 
        const options: SignOptions = { expiresIn: "3h" };

        // Generate: 
        const token = jwt.sign(container, this.secretKey, options);

        // Return:
        return token;
    }

    // Is token valid: 
    public isTokenValid(token: string): boolean {

        try {
            // If no token: 
            if (!token) return false;

            // Verify token: 
            jwt.verify(token, this.secretKey);

            // Token valid: 
            return true;
        }
        catch (err: any) { // Token not valid
            return false;
        }
    }

    // Is user admin: 
    public isAdmin(token: string): boolean {

        try {
            // Extract container object from token: 
            const container = jwt.decode(token) as { user: UserModel };

            // Extract user from container: 
            const user = container.user;

            // Return true if user is admin, or false if not:
            return user.roleId === Role.Admin;
        }
        catch (err: any) {
            return false;
        }
    }

}

export const cyber = new Cyber();
