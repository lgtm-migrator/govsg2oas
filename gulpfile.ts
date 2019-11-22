import { Glob } from 'glob';
import { resolve } from 'path';
import SwaggerParser from 'swagger-parser';
import fs from 'fs';


async function validateOASDocs() {
    const oasDocsGlob = resolve(__dirname, './src/apis/**/*.yml');

    return new Glob(oasDocsGlob, async (err, files) => {
        if (err) throw new Error('Error reading files OpenAPI Specification documents.');

        files.forEach(async (value, _) => {
            console.log(value);
            console.log("------------------------------------DANNY");

            try {
                const api = await SwaggerParser.validate(value);
                console.log(`${value} > ${api.info.title} is valid.`);
            }
            catch(err) {
                console.error(err);
                return err;
            }
        });
    });
}

export default async () => {
    return await validateOASDocs();
}
