const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableNameAuth = process.env.tableNameAuth;

exports.handler = async event => {
    console.log('event', event)

    try{
        const registerBody = JSON.parse(event.body);
        console.log("Registered body", registerBody);
        const newUser = await Dynamo.regUser(registerBody, tableNameAuth);
        console.log("New post: ", newUser);
        return Responses._200( {message: newUser.body });
    }catch (err) {
        return Responses._400(err);
    }
}