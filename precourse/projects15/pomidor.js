const saveUser = (logger) => (user) => {
    logger(`Saving user with id: ${user.id}`);

    // many lines to save user
};

const saveAdmin = (logger) => (admin) => {
    logger(`Saving admin with id: ${admin.id}`);

    // many lines to save admin
};

const saveBook = (logger) => (book) => {
    logger(`Saving book with id: ${book.id}`);

    // many lines to save book
};

const logger = (message, fn) => {
    const date = new Date();
    const time = [date.getHours(), date.getMinutes(), date.getSeconds()].join(":");

    fn()
    console.info(`INFO [${time}]: ${message}`);
    console.log(`LOG [${time}]: ${message}`);
};

const userLogger=(message, fn)=>{
    logger(message, fn);
}

const main = () => {
    const userSaver = saveUser(logger);
    const adminSaver = saveAdmin(logger);
    const bookSaver = saveBook(logger);

    userSaver({ id: "1" });
    adminSaver({ id: "2" });
    bookSaver({ id: "3" });
};

main();
