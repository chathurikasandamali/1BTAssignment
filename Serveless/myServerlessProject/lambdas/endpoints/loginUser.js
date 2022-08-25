const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableNameAuth = process.env.tableNameAuth;

exports.handler = async event => {
    console.log('event', event)

    // if( !event.pathParameters || !event.pathParameters.ID){
    //     //Failed without an ID
    //     return Responses._400({message: 'missing the ID from the path'});
    // }

    // let ID = event.pathParameters.ID;
    try{
        const loginBody = JSON.parse(event.body);
        const newUser = await Dynamo.logWrite(loginBody, tableNameAuth);
        return Responses._200( {message: newUser.body });
    }catch (error) {
        return Responses._400({message: error});
    }
}