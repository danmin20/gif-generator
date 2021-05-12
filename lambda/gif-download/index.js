const aws = require('aws-sdk');
const s3 = new aws.S3();

exports.handler = async (event) => {
    if(!event['queryStringParameters'] || !event['queryStringParameters']['id']) {
        return {
            statusCode: 400
        }
    }
    
    const id = event['queryStringParameters']['id'];
    const data = await download(id);
    
    return {
        statusCode: 200,
        headers:{
            "Content-Type":"image/gif"
        },
        isBase64Encoded:true,
        body: data.Body.toString("base64")
    }
};

const download = (id) => {
    const bucket = 'gif-generator';
    const path = `/gif/${id}.gif`;
    const params = {
        Bucket: bucket,
        Key: path
    }
    return new Promise((resolve, reject) => {
        s3.getObject(params, (err, data) => {
            if(err){
                console.log("download err");
                console.log(err);
                reject(err);
            }else{
                console.log("download success");
                console.log(data);
                resolve(data);
            }
        });
    });
}