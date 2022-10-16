import * as dotenv from "dotenv";

dotenv.config();

const Config = {
    lineOauth: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI,
        state: process.env.STATE,
    },
    server: {
        port: process.env.SERVER_PORT,
        debug: process.env.DEBUG_FLAG,
    },
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        collection: process.env.DB_COLLECTION_NAME,
    }
};

export default Config;