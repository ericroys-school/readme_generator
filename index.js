import { getAnswers } from "./lib/questions.js";
import { QA_MAP } from "./lib/model.js";
import { writer } from "./lib/writer.js";
import { getLicenseUrl } from "./lib/licenseOptions.js";

//clear screen of any residuals
console.clear();

//Output a message to the user about the program and
// where the output can be found
console.log(`${"*".repeat(60)}
The readme generator will automatically create
a readme.md file for you by asking questions and 
then utilizing your responses. The new readme.md 
file will be written into the output directory
${"*".repeat(60)}\n\n`);

//call Q & A because not all answers are 42
let answers = await getAnswers();
//fill the missing blanks with todo
addToDo(answers);
//clear screen of Q&A
console.clear();
// console.log(answers);

//destructure the key mapping from data model
let { TITLE, DESC, TOC, INST, USAGE, LIC, CONT, TEST, QA, EMAIL, ID } = QA_MAP;

//get the html url for adding license link
const lic_uri = await getLicenseUrl(answers[LIC.name].uri);

/* write all the content using the decorated writer
// not entirely happy with the design as might have been better to
// create a template file and do some iteration/replacement since
// it would have small file footprint. Maybe next time :-)
*/
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
  .write("")
  .write(
    `See this and other projects by stalking my [GitHub](https://github.com/${
      answers[ID.name]
    })`
  );

  console.log("Please review your new readme in the output directory");

//add the Todo to any missing vals
function addToDo(obj){
    
    Object.keys(obj).map(o => {
        let _t = obj[o];
        if(typeof _t == 'string' && _t.length === 0){
            console.log(_t.length);
            obj[o] = "TODO:Add content here";
        }
    })
}

//non words to space
function fixBadge(a) {
  return encodeURI(a.replace(/[\W]/g, " "));
}

//to lower and no spacing
function fixLink(a) {
  return a.toLowerCase().replace(/[\W]/g, "-");
}
