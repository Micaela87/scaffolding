import fs from 'fs';
import childProcess from 'child_process';
import { EntryPointGenerator } from "./entryPointGenerator.js";
import { JsonGenerator } from "./generatePackageJson.js";
import { RoutesGenerator } from "./routesGenerator.js";
import { ServiceGenerator } from "./serviceGenerator.js";

export class Generator {

    dependencies = [];

    generateProject(config) {

        const folder = fs.mkdirSync(`${config['path']}/${config['folder']}`, { recursive: true });
        Object.keys(config).forEach((key) => {

            switch(key) {

                case 'package.json':
                    const packageJson = new JsonGenerator(config['package.json']);
                    packageJson.generatePackageJson(config['path'], config['folder']);
                    const entryPoint = new EntryPointGenerator();
                    entryPoint.generateEntryPoint(config['path'], config['folder']);
                break;

                case 'service':
                    Object.keys(config['service']).forEach((key) => {
                        const service = new ServiceGenerator(config['service'][key].name);
                        service.generateService(config['path'], config['folder']);

                        if (config['service'][key]["withRoutes"]) {
                            const routes = new RoutesGenerator(config['service'][key].name);
                            routes.generateRoutes(config['path'], config['folder']);
                        }
                    }); 
                break;

                case 'dependencies':
                    Object.keys(config['dependencies']).forEach((dependency) => {
                        this.dependencies.push(`${dependency}@${config['dependencies'][dependency]}`);
                    });

                break;
            }

        });

        this.installDependencies(this.dependencies);
        
    }

    installDependencies(dependenciesArray) {
    
        childProcess.exec("npm install " +  dependenciesArray.join(" "));

    }

}