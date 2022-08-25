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
        const posts = JSON.parse(event.body);
        console.log('posts', posts);

        const res = await Dynamo.updatePost(posts.ID, posts.updateKey, posts.updateValue, tableName);

        return Responses._200('Successfully updated the post', res);
    }catch (err) {
        return Responses._400({message: 'Failed to update the post'}, err);
    }
}

const data = {
    1234: { name: 'Anna Jones', age: 25, job: 'journalist'},
    7893: { name: 'John Smith', age: 52, job: 'teacher'},
    1234: { name: 'Tom Smith', age: 25, job: 'doctor'},
};