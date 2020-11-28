import { CipherCCMTypes, CipherGCMTypes } from 'crypto'

/**
 * The algorithm is dependent on OpenSSL, examples are 'aes192', etc.
 * Following commands will display the available cipher algorithms
 * On recent OpenSSL releases,
 * `openssl list -cipher-algorithms`
 * for older versions of OpenSSL
 * `openssl list-cipher-algorithms`
 */
export const algorithm: CipherCCMTypes | CipherGCMTypes | string = 'aes-192-cbc';

/**
 * Initialization vector
 * Ideally should generate a random initialization vector
 * for each cipher to be unique
 * ```ts
 * randomFill(new Uint8Array(16), (err, iv) => {})
 * ```
 */
export const iv = Buffer.alloc(16, 0);

export const salt = 'salt';