const { S3Client, PutObjectCommand, HeadObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");

// Read the config file
const config = JSON.parse(fs.readFileSync(".site-config", "utf-8"));
const s3PublishDestination = config["s3-publish-destination"];
const REGION = config["s3-publish-region"];

// Extract the bucket name from the s3PublishDestination
const BUCKET_NAME = s3PublishDestination.replace("s3://", "").split("/")[0];

// Configure the AWS SDK
const s3Client = new S3Client({ region: REGION });

// Function to check if a file exists in S3
async function fileExistsInS3(fileName) {
    try {
        const headParams = {
            Bucket: BUCKET_NAME,
            Key: fileName,
        };
        const command = new HeadObjectCommand(headParams);
        await s3Client.send(command);
        return true;
    } catch (err) {
        if (err.name === 'NotFound') {
            return false;
        }
        throw err;
    }
}

// Function to upload a file to S3
async function uploadFile(filePath) {
    try {
        const fileName = path.relative("static", filePath);

        // Check if the file already exists in S3
        const exists = await fileExistsInS3(fileName);
        if (exists) {
            console.log(`File already exists in S3: ${fileName}`);
            return;
        }

        if (filePath.endsWith(".md")) {
            const fileContent = fs.readFileSync(filePath, "utf-8");
            const jsonContent = JSON.stringify({ md: fileContent });
            const jsonFileName = `{fileName}.json`;

            // Upload the JSON-wrapped version
            const jsonUploadParams = {
                Bucket: BUCKET_NAME,
                Key: jsonFileName,
                Body: Buffer.from(jsonContent, "utf-8"),
            };
            const jsonCommand = new PutObjectCommand(jsonUploadParams);
            await s3Client.send(jsonCommand);
            console.log(`File uploaded successfully: ${jsonFileName}`);
        }

        const fileStream = fs.createReadStream(filePath);

        const uploadParams = {
            Bucket: BUCKET_NAME,
            Key: fileName,
            Body: fileStream,
        };

        const command = new PutObjectCommand(uploadParams);
        const response = await s3Client.send(command);
        console.log(`File uploaded successfully: ${fileName}`);
    } catch (err) {
        console.error("Error uploading file:", err);
    }
}

// Function to recursively get all file paths in a directory
function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach((file) => {
        if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
            arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, file));
        }
    });

    return arrayOfFiles;
}

// Function to upload all files in the 'static' folder
async function uploadAllFilesInStatic() {
    const allFiles = getAllFiles("static");
    for (const file of allFiles) {
        await uploadFile(file);
    }
}

// Example usage
uploadAllFilesInStatic();