export const configCors = {
    origin: process.env.URL_PERMISSION?.split(","),
    // origin: "*",
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}