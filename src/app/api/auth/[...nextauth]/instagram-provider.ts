import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";

interface InstagramProfile {
  id: string;
  username: string;
  account_type?: string;
  name?: string;
}

export default function CustomInstagramProvider(
  options: OAuthUserConfig<InstagramProfile>
): OAuthConfig<InstagramProfile> {
  return {
    id: "instagram",
    name: "Instagram",
    type: "oauth",
    authorization: {
      url: "https://www.instagram.com/oauth/authorize",
      params: {
        scope:
          "instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights",
      },
    },
    token: {
      url: "https://api.instagram.com/oauth/access_token",
      async request({ client, params, provider }) {
        /**use the url if you prefer */
        const tokenUrl =
          typeof provider.token === "string"
            ? provider.token
            : provider.token?.url;

        if (!tokenUrl) throw new Error("No token URL found on provider");

        if (!params.code) {
          throw new Error("Missing authorization code in token request");
        }

        try {
          const response = await fetch(tokenUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              client_id: client.client_id as string,
              client_secret: client.client_secret as string,
              grant_type: "authorization_code",
              redirect_uri: provider.callbackUrl,
              code: params.code,
            }),
          });

          const data = await response.json();

          if (data.error_type) {
            throw new Error(`Instagram OAuth error: ${data.error_message}`);
          }

          return {
            tokens: {
              access_token: data.access_token,
            },
          };
        } catch (error) {
          throw error;
        }
      },
    },
    userinfo: {
      url: "https://graph.instagram.com/me?fields=id,username",
      async request({ tokens, provider }) {
        /**use the url if you prefer */
        const userinfoUrl =
          typeof provider.userinfo === "string"
            ? provider.userinfo
            : provider.userinfo?.url;

        if (!userinfoUrl) {
          throw new Error("No userinfo URL found on provider");
        }

        const res = await fetch(userinfoUrl, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            `Instagram userinfo request failed with status ${
              res.status
            }: ${JSON.stringify(errorData)}`
          );
        }

        return await res.json();
      },
    },
    client: {
      token_endpoint_auth_method: "client_secret_post",
    },
    profile(profile) {
      return {
        id: profile.id,
        name: profile.username,
        email: null,
        image: null,
      };
    },
    style: {
      logo: "/instagram.svg",
      bg: "#fff",
      text: "#000",
    },
    options,
  };
}
