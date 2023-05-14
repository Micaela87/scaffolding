import fs from 'fs';

export class ServiceGenerator {

    service;

    constructor(service) {
        this.service = service;
    }

    generateService(path, folder) {

        const serviceFolder = fs.mkdirSync(`${path}/${folder}/${this.service}`);
        const reader = fs.createReadStream('./templates/serviceTemplate.js', { encoding: 'binary' } );
        const writer = fs.createWriteStream(`${path}/${folder}/${this.service}/${this.service}.js`);

        reader.on("data", (chunk) => {
            const chunkCustomized = chunk.toString().replaceAll(/Service/gi, this.service);
            writer.write(Buffer.from(chunkCustomized));
        });
    }
}