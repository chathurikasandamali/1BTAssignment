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
  
    // const post = JSON.parse(event.body);
    // post.ID = ID;

    try{
        const newPost = await Dynamo.savePost((JSON.parse(event.body)), tableName);
        console.log("New post: ", newPost);
        return Responses._200( 'Post created successfully', newPost );
    }catch (err) {
        return Responses._400(err);
    }
}

const data = {
    1234: { name: 'Anna Jones', age: 25, job: 'journalist'},
    7893: { name: 'John Smith', age: 52, job: 'teacher'},
    1234: { name: 'Tom Smith', age: 25, job: 'doctor'},
};