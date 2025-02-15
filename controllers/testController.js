const testUserController = (req, res) => {
    try {
        res.status(200).send("<h1>Emily Ratajkowsky<h1/>");
    } catch (error) {
        console.log(`Test API error: ${error}`);
    }
};

module.exports = { testUserController }