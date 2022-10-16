import { Schema, model, connect } from 'mongoose';
import { userProfile } from '../schema';

class MongoDBController {
    readonly connectString: string;

    //Not inplemented connect method with user and password.
    //How can I pass variables with type, not using "any".
    constructor(host: any, port: any, db: any, user?: any, password?: any) {
        this.connectString = `mongodb://${host}:${port}/${db}`;
    };

    public async uploadToDatabase(userProfile: any) {
        await connect(this.connectString, {
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 30000, // Close sockets after 45 seconds of inactivity
        });
        await userProfile.save();
    }
}

export = MongoDBController;