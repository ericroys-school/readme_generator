import inquirer from "inquirer";
import { getLicenseTypes } from "./license_options.js";
import { getTitle } from "./title_options.js";
import { QA_MAP } from "./model.js";


export async function getAnswers() {
  const licenseOptions = await getLicenseTypes();
  const answers = await inquirer.prompt([
    {
      type: "input",
      message: "Provide a project title...",
      name: QA_MAP.TITLE.name,
      default: getTitle,
    },
    {
      type: "input",
      message: "Provide a description of the project...",
      name: QA_MAP.DESC.name,
    },
    {
      type: "input",
      message: "Provide installation instructions...",
      name: QA_MAP.INST.name,
    },
    { type: "input", message: "Provide usage details...", name: QA_MAP.USAGE.name },
    {
      type: "input",
      message: "Provide contribution guidelines...",
      name: QA_MAP.CONT.name,
    },
    { type: "input", message: "Provide test information...", name: QA_MAP.TEST.name },
    {
      type: "list",
      message: "Select a license...",
      name: QA_MAP.LIC.name,
      choices: licenseOptions,
    },
    {
      type: "input",
      message: "Provide your Github username...",
      name: QA_MAP.ID.name,
      validate: (value) => value.length > 0 || "Github username is required",
    },
    {
      type: "input",
      message: "Provide your email...",
      name: QA_MAP.EMAIL.name,
      validate: (value) =>
        new RegExp(
          "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
        ).test(value) || "Enter a valid email address",
    },
  ]);
  return answers;
}
