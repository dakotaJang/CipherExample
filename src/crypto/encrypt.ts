import { scrypt, createCipheriv } from 'crypto';
import { algorithm, iv, salt } from "./constants";

export const encrypt = async (input: string, password: string): Promise<string> => {
  const key = await new Promise<Buffer>(
    (resolve, reject) => scrypt(password, salt, 24, (err, key) => err ? reject(err) : resolve(key))
  );

  const cipher = createCipheriv(algorithm, key, iv);

  return new Promise((resolve, reject) => {
    let encrypted = '';
    cipher.setEncoding('hex');

    cipher.on('data', (chunk) => encrypted += chunk);
    cipher.on('end', () => resolve(encrypted));

    cipher.write(input);
    cipher.end();
  })
}