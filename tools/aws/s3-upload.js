const { PutObjectCommand, HeadObjectCommand, CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand } = require("@aws-sdk/client-s3");
const path = require("path");
const fs = require("fs");

// Function to check if a file exists in S3
async function fileExistsInS3(config, keyName) {
    try {
        const headParams = {
            Bucket: config.bucketName,
            Key: keyName,
        };
        const command = new HeadObjectCommand(headParams);
        await config.s3Client.send(command);
        return true;
    } catch (err) {
        if (err.name === 'NotFound') {
            return false;
        }
        throw err;
    }
}

// Function to upload a file to S3
async function uploadFile(config, localPrefix, filePath) {
    try {
        const keyName = path.relative(localPrefix, filePath);

        // Check if the file already exists in S3
        const exists = await fileExistsInS3(config, keyName);
        if (exists) {
            console.log(`File already exists in S3: ${keyName}`);
            return;
        }

        if (filePath.endsWith(".md")) {
            const fileContent = fs.readFileSync(filePath, "utf-8");
            const jsonContent = JSON.stringify({ md: fileContent });
            const jsonkeyName = `{keyName}.json`;

            // Upload the JSON-wrapped version
            const jsonUploadParams = {
                Bucket: config.bucketName,
                Key: jsonkeyName,
                Body: Buffer.from(jsonContent, "utf-8"),
            };
            const jsonCommand = new PutObjectCommand(jsonUploadParams);
            await s3Client.send(jsonCommand);
            console.log(`File uploaded successfully: ${jsonkeyName}`);
        }

        const fileStream = fs.createReadStream(filePath);

        const uploadParams = {
            Bucket: config.bucketName,
            Key: keyName,
            Body: fileStream,
        };

        const command = new PutObjectCommand(uploadParams);
        const response = await s3Client.send(command);
        console.log(`File uploaded successfully: ${keyName}`);
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

async function uploadFileMultipart(config, localPrefix, filePath) {
    const MIN_PART_SIZE = 5 * 1024 * 1024; // 5 MB
    console.log(localPrefix, filePath);
    const keyName = path.relative(localPrefix, filePath);

    // Check if the file already exists in S3
    const exists = await fileExistsInS3(config, keyName);
    if (exists) {
        console.log(`File already exists in S3: ${keyName}`);
        return;
    }

    try {
      // 1. Create Multipart Upload
      const createMultipartUploadCommand = new CreateMultipartUploadCommand({
        Bucket: config.bucketName,
        Key: keyName,
      });
      const createMultipartUploadResult = await config.s3Client.send(createMultipartUploadCommand);
      const uploadId = createMultipartUploadResult.UploadId;

      // 2. Calculate Part Size and Chunk the File
      const fileStats = fs.statSync(filePath);
      const totalBytes = fileStats.size;
      const parts = [];

      let partNumber = 1;
      let partBytes = 0;
      let start = 0;

      while (start < totalBytes) {
        const end = Math.min(start + MIN_PART_SIZE - 1, totalBytes - 1);
        partBytes = end - start + 1;

        const fileStream = fs.createReadStream(filePath, { start, end });

        const uploadPartCommand = new UploadPartCommand({
          Bucket: config.bucketName,
          Key: keyName,
          UploadId: uploadId,
          PartNumber: partNumber,
          Body: fileStream,
        });

        const uploadPartResult = await config.s3Client.send(uploadPartCommand);
        parts.push({
          ETag: uploadPartResult.ETag,
          PartNumber: partNumber,
        });

        process.stdout.write('.');
        start += partBytes;
        partNumber++;
      }

      // 3. Complete Multipart Upload
      const completeMultipartUploadCommand = new CompleteMultipartUploadCommand({
        Bucket: config.bucketName,
        Key: keyName,
        UploadId: uploadId,
        MultipartUpload: { Parts: parts },
      });

      await config.s3Client.send(completeMultipartUploadCommand);

      console.log(`File uploaded successfully to S3: s3://${config.bucketName}/${keyName}`);

    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw error;
    }
  }


async function uploadAllFiles(config, localPrefix, location) {
    const local_keyName = path.join(localPrefix, location);
    const allFiles = getAllFiles(local_keyName);
    for (const file of allFiles) {
        await uploadFileMultipart(config, localPrefix, file);
    }
}

module.exports = { uploadAllFiles };
