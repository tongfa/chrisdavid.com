const { program } = require('commander');
const { downloadAllFiles } = require('./aws/s3-download');
const { uploadAllFiles } = require('./aws/s3-upload');
const { readConfig } = require('./aws/config');

const local_path = "static";
const locations = [
    'music',
    'videos',
]
program
  .name('publish')
  .description('Publish files to an S3 bucket');


program
    .command('push')
    .action(() => {
        config = readConfig();
        locations.forEach((location) => {
            uploadAllFiles(config, local_path, location);
        });
    });

program
    .command('pull')
    .action(() => {
        config = readConfig();
        downloadAllFiles(config, local_path, locations);
    });

program.parse(process.argv);