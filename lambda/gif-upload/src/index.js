const imports = require('./import')['import'];

const Busboy = imports.Busboy;
const UUID = imports.UUID;
const aws = require('aws-sdk');
const s3 = new aws.S3();

exports.handler = async (event, context) => {
    if(!event.body || !/^multipart\/form\-data/.test(event.headers['content-type'])) {
        return {
            statusCode: 400
        }
    }
    
	const formData = await parse(event);
	
	if(!formData['gif']) {
	    return {
	        statusCode: 400
	    }
	}
    
    const id = await upload(formData['gif']);
    return {
        statusCode: 200,
        headers:{
            "Content-Type":"json"
        },
        body: JSON.stringify({
            id
        }),
    }
}

const parse = (event) => new Promise((resolve, reject) => {
    const bodyBuffer = new Buffer(event.body.toString(), "base64");
    
    const busboy = new Busboy({
        headers: {
            'content-type': event.headers['content-type']
        }
    });
    const formData = {};

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        console.log('File [%s]: filename=%j; encoding=%j; mimetype=%j', fieldname, filename, encoding, mimetype);
        const chunks = [];

        file.on('data', data => {
            chunks.push(data);
        }).on('end', () => {
            formData[fieldname] = {
                name:filename,
                data:Buffer.concat(chunks),
                mimetype:mimetype
            };
            console.log("File [%s] finished.", filename);
        });
    });

    busboy.on('field', (fieldname, value) => {
        console.log("[" + fieldname + "] >> " + value);
        formData[fieldname] = value;
    });

    busboy.on('error', error => {
        reject(error);
    });

    busboy.on('finish', () => {
        resolve(formData);
    });

    busboy.write(bodyBuffer, event.isBase64Encoded ? 'base64' : 'binary');
    busboy.end();
});

const upload = ({data, mimetype}) => new Promise((resolve, reject) => {
    const bucket = 'gif-generator';
    const path = '/gif';
    const id = UUID().replace(/\-/g, '');
    const fileFullName = path + '/' + id + '.gif';
    const params = {
        Bucket: bucket, 
        Key: fileFullName, 
        Body: data, 
        ContentType: mimetype
    };
    
    s3.upload(params, (err, data) => {
       if(err){
           console.log("upload err");
           console.log(err);
           reject(err);
       }else{
           console.log("upload success");
           console.log(data);
           resolve(id);
       }
   });
});