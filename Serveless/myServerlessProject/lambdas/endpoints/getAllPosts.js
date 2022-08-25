const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event)

    // if( !event ){
    //     //Failed without an ID
    //     return Responses._400({message: 'missing the ID from the path'});
    // }

    //let ID = event.pathParameters.ID;
    try{
        const post = await Dynamo.scanDynamoRecords(tableName, []);
        console.log("post ", post);
        //return null;

        const body = {
            posts: post
        }
        console.log('Body', body);
        return Responses._200(body);
    }catch (err){
        return Responses._400({message: 'Failed to get posts'}, err);
    }
    //return Responses._200({post.items})
}
