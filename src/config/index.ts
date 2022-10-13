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
        port: process.env.SERVER_PORT
    }
};

export default Config;