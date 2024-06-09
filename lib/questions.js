import inquirer from "inquirer";
import { getLicenseTypes, getLicenseTypesLocal } from "./license_options.js";
import { getTitle } from "./title_options.js";

export async function getAnswers() {
  const licenseOptions = await getLicenseTypesLocal();
  const answers = await inquirer.prompt([
    {
      type: "input",
      message: "What is the project title?",
      name: "title",
      default: getTitle,
    },
    {
      type: "input",
      message: "Provide a description of the project",
      name: "description",
    },
    {
      type: "input",
      message: "Provide installation instructions",
      name: "install",
    },
    { type: "input", message: "Provide usage details", name: "usage" },
    {
      type: "input",
      message: "Provide contribution guidelines",
      name: "guidelines",
    },
    { type: "input", message: "Provide test information", name: "tests" },
    {
      type: "list",
      message: "Select a license",
      name: "license",
      choices: licenseOptions,
    },
    {
      type: "input",
      message: "Provide your Github username",
      name: "ghubid",
      validate: (value) => value.length > 0 || "Github username is required",
    },
    {
      type: "input",
      message: "Provide your email",
      name: "email",
      validate: (value) =>
        new RegExp(
          "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
        ).test(value) || "Enter a valid email address",
    },
  ]);
  return answers;
}
