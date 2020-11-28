import { scrypt, createDecipheriv } from 'crypto';
import { algorithm, iv, salt } from "./constants";

export const decrypt = async (encrypted: string, password: string): Promise<string> => {
  const key = await new Promise<Buffer>(
    (resolve, reject) => scrypt(password, salt, 24, (err, key) => err ? reject(err) : resolve(key))
  );

  const decipher = createDecipheriv(algorithm, key, iv);

  return new Promise(resolve => {
    let decrypted = '';
    decipher.on('readable', () => {
      let chunk;
      while (null !== (chunk = decipher.read())) {
        decrypted += chunk.toString('utf8');
      }
    });
    decipher.on('end', () => resolve(decrypted));

    decipher.write(encrypted, 'hex');
    decipher.end();
  })
}