import { readFileSync } from "fs";
import yaml from "js-yaml";
import { join } from "path";

const YAML_CONFIG = `config.${process.env.NODE_ENV}.yaml`;
const filePath = join(`${process.env.PWD}`, `/libs/config/yaml/${YAML_CONFIG}`);

export default () => {
  return yaml.load(readFileSync(filePath, "utf8")) as Record<string, string | number>;
};
