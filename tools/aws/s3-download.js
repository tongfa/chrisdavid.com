const { ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");
const fs = require("fs");

// Function to list all files in the S3 bucket
async function listAllFilesInBucket(config) {
    try {
        const listParams = {
            Bucket: config.bucketName,
        };
        const command = new ListObjectsV2Command(listParams);
        const response = await config.s3Client.send(command);
        return response.Contents.map(item => item.Key);
    } catch (err) {
        console.error("Error listing files in bucket:", err);
        return [];
    }
}


// Function to download a file from S3
async function downloadFile(config, local_path, fileName) {
    try {
        const filePath = path.join(local_path, fileName);
        if (fs.existsSync(filePath)) {
            console.log(`File already exists locally: ${fileName}`);
            return;
        }

        const downloadParams = {
            Bucket: config.bucketName,
            Key: fileName,
        };
        const command = new GetObjectCommand(downloadParams);
        const response = await config.s3Client.send(command);
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        const fileStream = fs.createWriteStream(filePath);
        response.Body.pipe(fileStream);
        console.log(`File downloaded successfully: ${fileName}`);
    } catch (err) {
        console.error("Error downloading file:", err);
    }
}


// Function to download all files from the S3 bucket
async function downloadAllFiles(config, local_path, locations) {
    const allFiles = await listAllFilesInBucket(config);
    for (const file of allFiles) {
        console.log(file);
        for (const location of locations) {
            if (file.startsWith(location)) {
                await downloadFile(config, local_path, file);
            }
        }
    }
}

module.exports = { downloadAllFiles };
