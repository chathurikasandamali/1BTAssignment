const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event)

    if( !event.pathParameters || !event.pathParameters.ID){
        //Failed without an ID
        return Responses._400({message: 'missing the ID from the path'});
    }

    let ID = event.pathParameters.ID;

    const post = await Dynamo.get(ID, tableName).catch(err => {
        console.log("error in Dynamo Get ", err);
        return null;
    });

    if (!post){
        return Responses._400({message: 'Failed to get post by ID'});
    }

    return Responses._200({post})
}

const data = {
    1234: { name: 'Anna Jones', age: 25, job: 'journalist'},
    7893: { name: 'John Smith', age: 52, job: 'teacher'},
    1234: { name: 'Tom Smith', age: 25, job: 'doctor'},
};