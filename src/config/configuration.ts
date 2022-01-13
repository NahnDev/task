export function configuration() {
  return {
    server: {
      port: Number(process.env.PORT) || 8080,
      host: process.env.HOST || 'localhost:8080',
    },
    database: {
      default: {
        uri: process.env.DATABASE_DEFAULT || '',
      },
    },
    security: {
      accessToken: {
        secret: process.env.ACCESS_TOKEN_SECRET || 'accessToken',
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || 30 * 60,
      },
      refreshToken: {
        secret: process.env.REFRESH_TOKEN_SECRET || 'refreshToken',
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || 48 * 60 * 60,
      },
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  };
}
