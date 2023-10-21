import 'dotenv/config';

const config = {
  port: process.env.PORT,
  uriMongoDB: process.env.URIMONGODB,
};

export default config;
