declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_DOMAIN: string;
      NEXT_PUBLIC_API_DOMAIN: string;
      MONGODB_URI: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      NEXTAUTH_URL: string;
      NEXTAUTH_URL_INTERNAL: string;
      NEXTAUTH_SECRET: string;
      CLOUDINARY_CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      NEXT_PUBLIC_MAPBOX_TOKEN: string;
      NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY: string;
    }
  }
}

export {};
