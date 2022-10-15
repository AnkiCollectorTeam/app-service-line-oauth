import express, { Request, Response } from 'express';
import OAuthService from './OAuthService';
import Config from "../config/index";

const app = express()
const port = Config.server.port;

const myOAuthService = new OAuthService();

app.get('/', (_, res) => {
    res.status(200).send()
})

app.get('/login', (_, res) => {
    const oauthUrl = `https://access.line.me/oauth2/v2.1/authorize?`+
                `response_type=code&`+
                `client_id=${Config.lineOauth.clientId}&`+
                `redirect_uri=${Config.lineOauth.redirectUri}&`+
                `state=${Config.lineOauth.state}&`+
                `scope=profile%20openid%20email`;

    console.log("OAuth Uri = ", oauthUrl);
    res.redirect(oauthUrl);
})
app.get('/callback', async (request: Request, response: Response) => {
    if (request.query.code == undefined || request.query.state == undefined) {
        response.status(400).send({'success': false, 'error': 'Invalid parameters'});
        return;
    }

    console.log("Code=" + request.query.code + " State=" + request.query.state);

    myOAuthService.getIdToken(request.query.code.toString()).then((response) => {
        console.log(response.data.id_token);
        return response.data.id_token;
    }).then(async (id_token) => {
        try {
            const userProfileRaw = await myOAuthService.getUserProfile(id_token);
            const userProfile = {
                name: userProfileRaw.data.name,
                email: userProfileRaw.data.email,
                id: userProfileRaw.data.sub,
                picture: userProfileRaw.data.picture
            };

            console.log(userProfile);
            return userProfile;
        } catch (error) {
            return error;
        }
    }).then(userProfile => {
        myOAuthService.uploadToDatabase(userProfile);
        response.status(200).send({'success': true, 'data': userProfile});
    }).catch(error => {
        console.log(error.message);
        response.status(500).send({'success': false, 'msg': error.message});
    })
})

app.listen(port, () => console.log(`Running on port ${port}`))