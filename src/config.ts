export const config = () => ({
    MONGO_URI: process.env.MONGO_URI,
    MAIL_HOST: process.env.MAIL_HOST,
    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD
})