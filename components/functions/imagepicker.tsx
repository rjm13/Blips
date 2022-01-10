import AWS, { EnvironmentCredentials } from 'aws-sdk';
import Base64Binary from 'base64-arraybuffer';
import fs from 'react-native-fs';
import * as mime from 'react-native-mime-types';
import env from '../config/environment';

const uploadImageOnS3 = async (file: any) => {
    return new Promise(async (resolve, reject) => {
        const s3bucket = new AWS.S3({
            accessKeyId: env.awsAcessKey,
            secretAccessKey: env.secretAccessKey,
            Bucket: env.awsBucket,
            signatureVersion: 'v4',
        });

        const base64 = await fs.readFile(file.path, 'base64');
        const contentType = mime.lookup(file.path);
        const fileName = file.name || String(Date.now());
        const contentDeposition = 'inline;filename="' + fileName + '"';

        const arrayBuffer = Base64Binary.decode(base64);
        s3bucket.createBucket(() => {
            const params = {
                Bucket: 'amplify-shortys-dev-151958-deployment',
                Key: fileName,
                Body: arrayBuffer,
                ContentDisposition: contentDeposition, 
                ContentType: contentType,
            };
            s3bucket.upload(params, (err: any, data: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.Location);
                }
            });
        });
    });
};

export default uploadImageOnS3;