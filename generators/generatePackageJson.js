import fs from 'fs';

export class JsonGenerator {

    config;

    constructor(config) {
        this.config = config;
    }

    generatePackageJson(path, folder) {

        const writer = fs.createWriteStream(`${path}/${folder}/package.json`);
        writer.write(JSON.stringify(this.config));

    }
}