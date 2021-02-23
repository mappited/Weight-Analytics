const readline = require("readline");
const meta = require("../package.json");
const fs = require("fs/promises");
const process = require("process");
const util = require("util");
const os = require("os");

const ENV = {
  PATH: `${__dirname}/../.env`,
  GOOGLE_APPLICATION_CREDENTIALS: "",
  DEBUG: "wcs:*",
  WCS_FIREBASE_URL: "",
  PORT: "3000",
  "SSL_DIR": `${__dirname}/../ssl`
};

const exportVariable = os.platform() === "win32"
  ? "$env:"
  : "export ";

const cmd = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = util.promisify(cmd.question).bind(cmd);

async function writeEnvFile() {
  ENV.GOOGLE_APPLICATION_CREDENTIALS = await question("GOOGLE_APPLICATION_CREDENTIALS: ");
  ENV.WCS_FIREBASE_URL = await question("WCS_FIREBASE_URL: ");
  PORT = (await question(`PORT (${ENV.PORT}): `)).trim() || ENV.PORT;
  if (/^\d{2,6}$/.test(PORT)) {
    ENV.PORT = PORT;
  }

  SSL_MODE = ((await question(`SSL_MODE (true): `)) || "true").trim();

  if (/^false$/i.test(SSL_MODE)) {
    ENV.SSL_MODE = false;
  } else {
    ENV.SSL_MODE = true;
    SSL_DIR = (await question(`SSL_DIR (${ENV.SSL_DIR}): `)).trim();
    ENV.SSL_DIR = SSL_DIR ? SSL_DIR : ENV.SSL_DIR;
  }

  if (await askQuestion({ questionText: "Do you want to rewrite env file?" })) {
    const data = [
      `${exportVariable}DEBUG="${ENV.DEBUG}"\n`,
      `${exportVariable}GOOGLE_APPLICATION_CREDENTIALS=${ENV.GOOGLE_APPLICATION_CREDENTIALS}\n`,
      `${exportVariable}WCS_FIREBASE_URL=${ENV.WCS_FIREBASE_URL}\n`,
      `${exportVariable}PORT=${ENV.PORT}\n`,
      ENV.SSL_MODE ? `${exportVariable}SSL_MODE=${ENV.SSL_MODE}\n` : "",
      ENV.SSL_MODE ? `${exportVariable}SSL_DIR=${ENV.SSL_DIR}\n` : "\n",
    ].join("");

    console.log("writing...");
    await fs.writeFile(ENV.PATH, data);
  }
}

const AnswerVariant = [{}, ["NO", "N"], ["YES", "Y"]].reduce((obj, key) => {
  obj[key[0]] = key[1];
  return obj
});

async function askQuestion(
  {
    questionText,
    defaultAnswer=AnswerVariant.NO,
    optionalText=""
  } = {
    defaultAnswer: AnswerVariant.NO
  }) {
  const tag = defaultAnswer === AnswerVariant.NO
    ? `[${AnswerVariant.YES.toLowerCase()}/${AnswerVariant.NO}]`
    : `[${AnswerVariant.YES}/${AnswerVariant.NO.toLowerCase()}]`
  let agree = defaultAnswer === AnswerVariant.YES
    ? false
    : false;

  const answer = await question(`${questionText} ${tag} ${optionalText}`);
  if ( /^n(o){0,1}$/i.test(answer) ) {
    agree = false;
  } else if ( /^y(es){0,1}$/i.test(answer) ) {
    agree = true;
  }

  return agree;
}

async function main() {
  let exists = false;
  try {
    await fs.stat(ENV.PATH);
    exists = true;
  } catch (error) {
    exists = false;
  };

  if (exists) {
    const data = await fs.readFile(ENV.PATH, "utf-8");
    console.log(`Found env file:\n\t${data.replace(/\n/g, "\n\t")}`);
    if (await askQuestion({ questionText: "Do you want to set new values?" })) {
      await writeEnvFile()
    }
  } else {
    await writeEnvFile()
  }

  console.log("exit!");
  return 0;
}


main().then(code => process.exit(code));

