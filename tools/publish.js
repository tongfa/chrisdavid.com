const { S3Client, PutObjectCommand, HeadObjectCommand, ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");
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
async function uploadFile(local_path, filePath) {
    try {
        const fileName = path.relative(local_path, filePath);

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


async function uploadAllFiles(local_path, location) {
    const local_filename = path.join(local_path, location);
    const allFiles = getAllFiles(local_filename);
    for (const file of allFiles) {
        await uploadFile(local_path, file);
    }
}


// Function to list all files in the S3 bucket
async function listAllFilesInBucket() {
    try {
        const listParams = {
            Bucket: BUCKET_NAME,
        };
        const command = new ListObjectsV2Command(listParams);
        const response = await s3Client.send(command);
        return response.Contents.map(item => item.Key);
    } catch (err) {
        console.error("Error listing files in bucket:", err);
        return [];
    }
}


// Function to download a file from S3
async function downloadFile(local_path, fileName) {
    try {
        const filePath = path.join(local_path, fileName);
        if (fs.existsSync(filePath)) {
            console.log(`File already exists locally: ${fileName}`);
            return;
        }

        const downloadParams = {
            Bucket: BUCKET_NAME,
            Key: fileName,
        };
        const command = new GetObjectCommand(downloadParams);
        const response = await s3Client.send(command);
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
async function downloadAllFiles(local_path, locations) {
    const allFiles = await listAllFilesInBucket();
    for (const file of allFiles) {
        console.log(file);
        for (const location of locations) {
            if (file.startsWith(location)) {
                await downloadFile(local_path, file);
            }
        }
    }
}

const { program } = require('commander');

program
  .name('publish')
  .description('Publish files to an S3 bucket');

const local_path = "static";
const locations = [
    'music',
    'videos',
]

program
    .command('push')
    .action(() => {
        locations.forEach((location) => {
            uploadAllFiles(local_path, location);
        });
    });

program
    .command('pull')
    .action(() => {

        downloadAllFiles(local_path, locations);
    });

program.parse(process.argv);