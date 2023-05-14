import fs from 'fs';

export class EntryPointGenerator {
    
    generateEntryPoint(path, folder) {

        const reader = fs.createReadStream('./templates/serverTemplate.js', { encoding: 'binary' } );
        const writer = fs.createWriteStream(`${path}/${folder}/server.js`);

        reader.on("data", (chunk) => {
            writer.write(chunk);
        });

    }
}