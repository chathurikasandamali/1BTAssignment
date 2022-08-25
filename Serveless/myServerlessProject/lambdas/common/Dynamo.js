const AWS = require('aws-sdk');
const Responses = require('../common/API_Responses');
const auth = require('../helpers/auth');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const documentClient = new AWS.DynamoDB.DocumentClient();//DocumentClient->Interact with Dynamo Db tables

const Dynamo = {
    async get (ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID
            }
        };

        const data = await documentClient.get(params).promise()

        if(!data || !data.Item){
            throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`)
        }

        console.log(data);

        return data.Item;
    },

    async scanDynamoRecords (TableName, itemArray) {
        try{
            const params = {
                TableName,
            };
    
            const data = await documentClient.scan(params).promise();
            console.log(data);
            itemArray = itemArray.concat(data.Items);
            console.log('itemArray' , itemArray);
            if(data.LastEvaluatedKey){
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                return await scanDynamoRecords(params, itemArray);
            }
    
            return itemArray;
        }catch(err) {
            throw Error('Getting data error', err);
        }
    },

    async savePost(data, TableName) {
        
            const params = {
                TableName,
                Item: data
            };

            return await documentClient.put(params).promise();
            
        
        
    },

    async deletePost (ID, TableName) {
        const params = {
            TableName,
            Key: {
                'ID': ID
            },
            ReturnValues: 'ALL_OLD'
        };

        return await documentClient.delete(params).promise();

        // if(!data || !data.Item){
        //     throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`)
        // }

        // console.log(data);

        // return data.Item;
    },

    updatePost: async (id, updateKey, updateValue, tableName) => {
        const params = {
            TableName: tableName,
            Key: { 
                'ID': id
             },
            updateExpresion: `set ${updateKey} = :value`,
            ExpressionAttributeValues: {
                'value': updateValue,
            },
            ReturnValues: 'UPDATED_NEW'
        }
        console.log('params', params)
            return await documentClient.update(params).promise();
            
        
    },

    async regUser(data, TableName) {
        console.log('data', data);
        const ID = data.ID;
        const FirstName = data.FirstName;
        const LastName = data.LastName;
        const Email = data.Email;
        const Password = data.Password;
        //console.log('FirstName', FirstName);
        if(!FirstName || !LastName || !Email || !Password){
            return Responses._400('All fields are required');
        }

        const dynamoUser = await documentClient.get(Email, TableName);
        console.log('dynamoUser', dynamoUser.params)
        if(dynamoUser && dynamoUser.params){
            return Responses._400('User already registered');
        }
        
        const encryptedPw = bcrypt.hashSync(Password, 8);
        console.log('encryptedPw', ID);
        const user = { 
            ID: uuid.v1(),
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            Password: encryptedPw
        }
        console.log('user', user.ID);

        const params = {
            TableName: TableName,
            Item: user
        };

        const saveUserResponse = await documentClient.put(params).promise();
        if( !saveUserResponse ){
            return Responses._503('Server error. Please try again later');
        }

        return Responses._200('User registered successfully');
        
    },

    async getUser(Email, TableName){
        console.log('getUser Email', Email);
        const params = {
            TableName: TableName,
            Key: {
                Email: Email
            }
        };

        return await documentClient.get(params).promise().then(response => {
            return response.Item;
        }, error => {
            console.error('This is an eror getting user: ', error);
        })
    },

    async saveUser(user, TableName){
        console.log('Save User');
        const params = {
            TableName: TableName,
            Item: user
        };

        return await documentClient.put(params).promise().then( () => {
            return true;
        }, error => {
            console.error('This is an eror aving user: ', error);
        })
        return await documentClient.put(params).promise();
    },

    async logWrite(user, TableName) {
        console.log('user', user)
        const ID = user.ID;
        const email = user.Email;
        const password = user.Password;
        //console.log('dynamoUser', password)
        if(!user || !email || !password){
            return Responses._400({message: 'All fields are required'});
        }

        // const params = {
        //     TableName: TableName,
        //     Key: {
        //         'ID': ID
        //     }
        // };

        // documentClient.get(params, function(err, data) {
        //     if (err) {
        //       console.log("Error", err);
        //     } else {
        //       console.log("Success", data.Item);
        //     }
        //   });

        // const dynamoUser = await documentClient.get(params, TableName).promise();
        // console.log('dynamoUser', dynamoUser)
        // if(!dynamoUser.params){
        //     return Responses._400({ message: 'User does not exist'});
        // }

        // const dynamoUser = await getUserLogin(email, TableName);
        // console.log('dynamoUser', dynamoUser);
        // if(!dynamoUser || !dynamoUser.params){
        //     return Responses._400({ message: 'User does not exist'});
        // }

        // if(!bcrypt.compareSync(password, dynamoUser.Password)) {
        //     return Responses._400({ message: 'Email or password is incorrect'});
        // }

        // const userInfo= {
        //     email: dynamoUser.Email,
        //     firstName: dynamoUser.FirstName
        // }

        // const token = auth.generateToken(userInfo);
        // const response = {
        //     user: userInfo,
        //     token: token
        // }

        // return Responses._200(response);

        // const params = {
        //     TableName,
        //     Item: data
        // };

        // const res = await documentClient.put(params).promise();

        // if(!res){
        //     throw Error(`There was an error inserting ID of ${data.ID} in the table ${TableName}`);
        // }

        // return data;
    },

    async getUserLogin(Email, TableName){
        console.log('getUser Email', Email);
        const params = {
            TableName: TableName,
            Key: {
                Email: Email
            }
        };

        return await documentClient.get(params).promise().then(response => {
            return response.Item;
        }, error => {
            console.error('This is an eror getting user: ', error);
        })
    },

};

module.exports = Dynamo;