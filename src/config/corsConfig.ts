export const configCors = {
    origin: process.env.URL_PERMISSION?.split(","),
    methods: ["GET","POST","UPDATE","DELETE"],
    credentials: true
}