const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
    this.validateInput(message, key);

    const encryptedText = this.processText(message, key, true);
    return this.isDirect ? encryptedText.join('') : encryptedText.reverse().join('');
  }

  decrypt(encryptedMessage, key) {
    this.validateInput(encryptedMessage, key);

    const decryptedText = this.processText(encryptedMessage, key, false);
    return this.isDirect ? decryptedText.join('') : decryptedText.reverse().join('');
  }

  validateInput(message, key) {
    if (!message || !key) {
      throw new Error('Message and key are required.');
    }
  }

  processText(text, key, isEncrypt) {
    const alphabetSize = 26;
    const result = [];
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i].toUpperCase();
      if (/[A-Z]/.test(char)) {
        const shift = key[keyIndex % key.length].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
        const modifier = isEncrypt ? 1 : -1;
        let newChar = String.fromCharCode(((char.charCodeAt(0) - 'A'.charCodeAt(0) + modifier * shift + alphabetSize) % alphabetSize) + 'A'.charCodeAt(0));
        result.push(newChar);
        keyIndex++;
      } else {
        result.push(char);
      }
    }

    return result;
  }
}

module.exports = {
  VigenereCipheringMachine
};
