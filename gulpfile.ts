import glob from "glob";
import { resolve } from "path";
import SwaggerParser from "swagger-parser";

/**
 * Validates OpenAPI Specification YAML documents
 */
async function validateOASDocs(): Promise<void> {
  const oasDocsGlob = resolve(__dirname, "./src/apis/**/*.yml");
  const files = glob.sync(oasDocsGlob);

  files.forEach(async function validateFile(value) {
    try {
      const api = await SwaggerParser.validate(value);
      console.log(`${value} > ${api.info.title} is valid.`);
    } catch (err) {
      Promise.reject(err);
    }
  });
}

export default async function defaultTask() {
  try {
    return await validateOASDocs();
  } catch (err) {
    Promise.reject(err);
  }
}
