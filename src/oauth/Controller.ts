import { connect } from 'mongoose';
import { userModel } from '../schema';
import { Logger } from "tslog";

const logger: Logger = new Logger({ name: "Line-OAuth", minLevel: "info" });

class MongoDBController {
    readonly connectString: string;

    //Not inplemented connect method with user and password.
    //How can I pass variables with type, not using "any".
    constructor(host: any, port: any, db: any, user?: any, password?: any) {
        this.connectString = `mongodb://${host}:${port}/${db}`;
    };

    public async uploadToDatabase(userDict: any) {
        await connect(this.connectString, {
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 30000, // Close sockets after 45 seconds of inactivity
        });

        const userId = userDict.id;
        const user = new userModel({
            name: userDict.name,
            email: userDict.email,
            id: userDict.id,
            avatar: userDict.avatar
        });

        console.log(userId);
        const existingId = await userModel.findOne({ id: userId });

        if (existingId) {
            logger.info(userId, "is existed. Doc will not be saved.");
            return;
        }

        const res = await user.save();
        logger.info("doc is saved. ", res);
        return res;
    }
}

export = MongoDBController;