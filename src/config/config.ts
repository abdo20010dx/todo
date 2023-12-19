import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

export const serverConfig = {
  'NODE_ENV': process.env.NODE_ENV,
  'jwt_secret': process.env.jwt_secret || "myjsonwbtoken",
  'MQ_URL': process.env.MQ_URL || "104.248.47.7",
  'MQ_USER': process.env.MQ_USER || "app",
  'MQ_PASS': process.env.MQ_PASS || "pos",
  'port': parseInt(process.env.port) || 5001,
}