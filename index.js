const fs = require("fs");

function encrypt(text, key) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    let keyIndex = i % key.length;
    result += String.fromCharCode(
      text.charCodeAt(i) + key.charCodeAt(keyIndex)
    );
  }
  return result;
}

function decrypt(text, key) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    let keyIndex = i % key.length;
    result += String.fromCharCode(
      text.charCodeAt(i) - key.charCodeAt(keyIndex)
    );
  }
  return result;
}

const args = process.argv.slice(2);
const option = args[0];
const filename = args[1];
const key = args[2];

if (option === "encrypt") {
  let data = fs.readFileSync(filename, "utf8");
  let encryptedData = encrypt(data, key);
  fs.writeFileSync(filename + ".enc", encryptedData);
  console.log("File encrypted successfully!");
} else if (option === "decrypt") {
  let data = fs.readFileSync(filename, "utf8");
  let decryptedData = decrypt(data, key);
  fs.writeFileSync(filename + ".dec", decryptedData);
  console.log("File decrypted successfully!");
} else {
  console.log('Invalid option. Please use "encrypt" or "decrypt".');
}
