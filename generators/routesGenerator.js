import fs from 'fs';

export class RoutesGenerator {

    service;

    constructor(service) {
        this.service = service;
    }

    generateRoutes(path, folder) {
        const reader = fs.createReadStream('./templates/routesTemplate.js', { encoding: 'binary'} );
        const writer = fs.createWriteStream(`${path}/${folder}/${this.service}/routes.js`);

        reader.on("data", (chunk) => {
            const chunkCustomized = chunk.toString().replaceAll(/service/gi, this.service);
            writer.write(Buffer.from(chunkCustomized));
        });
    }
}