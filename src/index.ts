import { prompt } from 'inquirer';
import { encrypt } from './crypto/encrypt';
import { decrypt } from './crypto/decrypt';

(async () => {
  const goingToEncrypt = await prompt([
    {
      name: 'command',
      choices: ['encrypt', 'decrypt'],
      type: 'list',
    }
  ]).then(answers => answers.command === 'encrypt');

  prompt([
    {
      name: 'input',
      message: `Input message to be ${goingToEncrypt ? 'en' : 'de'}crypted`,
      type: 'input',
    },
    {
      name: 'password',
      message: 'Enter password',
      type: 'password',
    }
  ]).then(async answers => {
    const { input, password } = answers;
    const message = await (goingToEncrypt ? encrypt(input, password) : decrypt(input, password));
    console.log(message);
  })
})()