import NextAuth from "next-auth";
import type { JWT } from "next-auth/jwt";

async function refreshAccessToken(token: JWT) {
    try {
        const response = await fetch("https://auth.mikandev.com/oidc/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                client_id: process.env.LOGTO_CLIENT_ID || "",
                client_secret: process.env.LOGTO_CLIENT_SECRET || "",
                grant_type: "refresh_token",
                refresh_token: token.refreshToken as string,
            }),
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
            throw refreshedTokens;
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        };
    } catch (error) {
        console.log(error);
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        maxAge: 14 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        {
            id: "logto",
            name: "MikanDev Account",
            type: "oidc",
            issuer: "https://auth.mikandev.com/oidc",
            authorization: {
                params: {
                    scope: "openid offline_access profile email identities",
                },
            },

            clientId: process.env.LOGTO_CLIENT_ID,
            clientSecret: process.env.LOGTO_CLIENT_SECRET,
            client: {
                id_token_signed_response_alg: "ES384",
            },
            token: true,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name ?? profile.username,
                    email: profile.email,
                    image: profile.picture,
                    discord: profile.identities?.discord?.userId,
                };
            },
        },
    ],
});
