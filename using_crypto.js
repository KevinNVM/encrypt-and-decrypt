const crypto = require("crypto");
const algorithm = "aes-256-cbc";

function encrypt(text) {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return {
    encryptedData: encrypted.toString("hex"),
    iv: iv.toString("hex"),
    key: key.toString("hex"),
  };
}

function decrypt(encryptedData, inputIv, inputKey) {
  let iv = Buffer.from(inputIv, "hex");
  let encryptedText = Buffer.from(encryptedData, "hex");
  let decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(inputKey, "hex"),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

module.exports = {
  encrypt,
  decrypt,
};

// I don't have the knowledge to use these, sorry
