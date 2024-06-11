import { getAnswers } from "./lib/questions.js";
import { QA_MAP } from "./lib/model.js";
import { writer } from "./lib/writer.js";
import { getLicenseUrl } from "./lib/license_options.js";

//Output a message to the user about the progtam and
// where the output can be found
const initMsg = `${"*".repeat(60)}
The readme generator will automatically create
a readme.md file for you by asking questions and 
then utilizing your responses. The new readme.md 
file will be written into the output directory
${"*".repeat(60)}\n\n`;

//clear screen of any residuals
console.clear();
//output the message
console.log(initMsg);
//call Q & A because not all answers are 42
let answers = await getAnswers();
//clear screen of Q&A
console.clear();
// console.log(answers);

//destructure the key mapping from data model
let { TITLE, DESC, TOC, INST, USAGE, LIC, CONT, TEST, QA, EMAIL, ID } = QA_MAP;

//get the html url for adding license link
const lic_uri = await getLicenseUrl(answers[LIC.name].uri);

//write all the content using the decorated writer
const r = writer();
r.write(`# ${answers[TITLE.name]}`)
  .write(
    `![Static Badge](https://img.shields.io/badge/license-${fixBadge(
      answers[LIC.name].name
    )}-blue)`
  )
  .write("")
  .write(`## ${DESC.label}`)
  .write("")
  .write(answers[DESC.name])
  .write("")
  .write(`## ${TOC.label}`)
  .write("")
  .write(`- [${INST.label}](#${fixLink(INST.label)})`)
  .write(`- [${USAGE.label}](#${fixLink(USAGE.label)})`)
  .write(`- [${CONT.label}](#${fixLink(CONT.label)})`)
  .write(`- [${TEST.label}](#${fixLink(TEST.label)})`)
  .write(`- [${LIC.label}](#${fixLink(LIC.label)})`)
  .write(`- [${QA.label}](#${fixLink(QA.label)})`)
  .write("")
  .write(`##  ${INST.label}`)
  .write("")
  .write(answers[INST.name])
  .write("")
  .write(`## ${USAGE.label}`)
  .write("")
  .write(answers[USAGE.name])
  .write("")
  .write(`## ${CONT.label}`)
  .write("")
  .write(answers[CONT.name])
  .write("")
  .write(`## ${TEST.label}`)
  .write("")
  .write(answers[TEST.name])
  .write("")
  .write(`## ${LIC.label}`)
  .write("")
  .write(
    `This repo is licensed according to the license
  [${answers[LIC.name].name}](${lic_uri})`
  )
  .write("")
  .write(`## ${QA.label}`)
  .write("")
  .write(`[Contact via Email](mailto:${answers[EMAIL.name]})`)
  .write(
    `See this an other projects by stalking my [GitHub]("https://github.com/${
      answers[ID.name]
    })`
  );

//non words to space
function fixBadge(a) {
  return encodeURI(a.replace(/[\W]/g, " "));
}

//to lower and no spacing
function fixLink(a) {
  return a.toLowerCase().replace(/[\W]/g, "-");
}
