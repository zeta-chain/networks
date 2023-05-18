import Ajv from "ajv";
import fs from "fs";
import path from "path";

// Determine the paths to the schema and data files
const schemaFilePath = path.resolve(__dirname, "..", "networks.schema.json");
const dataFilePath = path.resolve(__dirname, "..", "data", "networks.json");

// Load the schema and data from the files
const jsonSchema = JSON.parse(fs.readFileSync(schemaFilePath, "utf8"));
const jsonData = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));

const ajv = new Ajv();

const validate = ajv.compile(jsonSchema);
const valid = validate(jsonData);

if (valid) {
  console.log("JSON data is valid");
} else {
  console.log("JSON data is invalid. Errors:", validate.errors);
}
