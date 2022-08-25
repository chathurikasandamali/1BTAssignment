const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {
    console.log('event', event)

    // if( !event.pathParameters || !event.pathParameters.ID){
    //     //Failed without an ID
    //     return Responses._400({message: 'missing the ID from the path'});
    // }

    // let ID = event.pathParameters.ID;

    try{
        const post = await Dynamo.deletePost(JSON.parse(event.body).ID, tableName);
        console.log('post', post);
        return Responses._200('Deleted Successfully', post);
    }catch (err) {
        return Responses._400({message: 'Failed to delete the post'}, err);
    }

    // if (!post){
    //     return Responses._400({message: 'Failed to delete post by ID'});
    // }

    return Responses._200({post})
}