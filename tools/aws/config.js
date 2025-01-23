const { S3Client } = require("@aws-sdk/client-s3");
const fs = require("fs");


function readConfig() {
    // Read the config file
    const config = JSON.parse(fs.readFileSync(".site-config", "utf-8"));
    const s3PublishDestination = config["s3-publish-destination"];
    const REGION = config["s3-publish-region"];

    // Extract the bucket name from the s3PublishDestination
    const bucketName = s3PublishDestination.replace("s3://", "").split("/")[0];

    // Configure the AWS SDK
    const s3Client = new S3Client({ region: REGION });

    return { bucketName, s3Client };
}

module.exports = { readConfig };
