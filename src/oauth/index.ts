import express, { Request, Response } from 'express';
import OAuthService from './OAuthService';
import MongoDBController from './Controller';
import Config from "../config/index";
import { Logger } from "tslog";

const app = express()
const port = Config.server.port;
const logger: Logger = new Logger({ name: "Line-OAuth", minLevel: "info" });

const myOAuthService = new OAuthService();
const DBController = new MongoDBController(Config.db.host, Config.db.port, Config.db.database);

app.get('/', (_, res) => {
    res.status(200).send("<h1>LINE OAuth Service</h1>")
})

app.get('/login', (_, res) => {
    const oauthUrl = `https://access.line.me/oauth2/v2.1/authorize?` +
        `response_type=code&` +
        `client_id=${Config.lineOauth.clientId}&` +
        `redirect_uri=${Config.lineOauth.redirectUri}&` +
        `state=${Config.lineOauth.state}&` +
        `scope=profile%20openid%20email`;

    logger.info("Redirect to OAuth Uri = ", oauthUrl);
    res.redirect(oauthUrl);
})
app.get('/callback', async (request: Request, response: Response) => {
    if (request.query.code == undefined || request.query.state == undefined) {
        response.status(400).send({ 'success': false, 'error': 'Invalid parameters. code and state is required.' });
        logger.error("code and state parameter is required.")
        return;
    }

    logger.debug("Code=" + request.query.code + " State=" + request.query.state);

    myOAuthService.getIdToken(request.query.code.toString()).then((response) => {
        logger.debug("Id_token response = ", response.data.id_token);
        return response.data.id_token;
    }).then(async (id_token) => {
        try {
            const userProfileRaw = await myOAuthService.getUserProfile(id_token);
            const user = {
                name: userProfileRaw.data.name,
                email: userProfileRaw.data.email,
                id: userProfileRaw.data.sub,
                avatar: userProfileRaw.data.picture,
            };

            logger.debug("Profile response = ", user);
            return user;
        } catch (error) {
            logger.error("Error when fetch id_token. msg = ", error);
            return error;
        }
    }).then(async user => {
        try {
            const savedDoc = await DBController.uploadToDatabase(user);
            logger.info("Successfuly update userProfile.");
            response.status(200).send({ 'success': true, 'data': user });
            return savedDoc;
        } catch (error) {
            logger.error("Error when fetch user profile. msg = ", error);
            response.status(500).send({ 'success': false, 'msg': error });
            return error;
        }

    }).then(savedDoc => {
        logger.debug("SavedDoc is ", savedDoc);
    })
        .catch(error => {
            logger.error("Error when fetch user profile. msg = ", error);
            response.status(500).send({ 'success': false, 'msg': error.message });
        })
})

app.listen(port, () => console.log(`Running on port ${port}`))