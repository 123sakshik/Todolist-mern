const constants = () => {
    return {
        DB_CONNECT: "mongodb+srv://sakshicode12345:SakshiCode12345@cluster0.tv2cjlv.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0 ",
        JWT_TOKEN_SECRET: "dguhjgkjdgdgujd",
        StatusCode: {
            SUCCESS: 200,
            VALIDATION_ERROR: 201,
            UNPROCESSABLE_ENTITY: 202,
            INTERNAL_SERVER_ERROR: 500
        },
    };
};

export default constants;
