import axios, { AxiosRequestConfig } from 'axios';
import Config from "../config/index";

const qs = require('qs');

class OAuthService {
    public async getIdToken(code: string): Promise<AxiosRequestConfig> {
        return axios.post('https://api.line.me/oauth2/v2.1/token', qs.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: Config.lineOauth.redirectUri,
            client_id: Config.lineOauth.clientId,
            client_secret: Config.lineOauth.clientSecret
        }))
    }

    public async getUserProfile(idToken: string): Promise<AxiosRequestConfig>{
        return axios.post('https://api.line.me/oauth2/v2.1/verify', qs.stringify({
            id_token: idToken,
            client_id: Config.lineOauth.clientId
        }))
    }

    public async uploadToDatabase(userProfile: any){
        console.log("INTO DATABASE", userProfile);
    }
}

export = OAuthService;;