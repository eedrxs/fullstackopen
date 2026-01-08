import 'dotenv/config';

export default {
  expo: {
    name: "rate-repository-app",
    slug: "rate-repository-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    assetBundlePatterns: ["**/*"],
    extra: {
      env: process.env.ENV,
      apolloUri: process.env.APOLLO_URI
    },
  },
};
