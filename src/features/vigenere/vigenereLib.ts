const baseArray = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
const vigenereTable = baseArray.map((_, valId) => {
  const startTable = baseArray.slice(valId);
  const endTable = baseArray.slice(0, valId);
  return [...startTable, ...endTable];
});

function getCharId(char: string) {
  return char.charCodeAt(0) - 65;
}

function getCharFromCharId(charId: number) {
  return String.fromCharCode(charId + 65);
}

function normalizeKey(message: string, key: string) {
  if (message.length < key.length) {
    return key;
  }

  const lengthFactor = Math.ceil(message.length / key.length);

  return key.repeat(lengthFactor).slice(0, message.length);
}

export function encode(message: string, key: string) {
  const upperCasedMessage = message.toUpperCase();
  const normalizedKey = normalizeKey(upperCasedMessage, key.toUpperCase());

  return upperCasedMessage.split('').reduce((cur, char, charId) => {
    const charCode = getCharId(char);
    const keyChar = normalizedKey.charAt(charId);
    const keyCode = getCharId(keyChar);
    return cur + vigenereTable[charCode][keyCode];
  }, '');
}

export function decode(encoded: string, key: string) {
  const upperCasedEncoded = encoded.toUpperCase();
  const normalizedKey = normalizeKey(upperCasedEncoded, key.toUpperCase());

  return upperCasedEncoded
    .split('')
    .reduce((cur, char, charId) => {
      const keyChar = normalizedKey.charAt(charId);
      const keyCode = getCharId(keyChar);
      const charCode = vigenereTable[keyCode].indexOf(char);
      return cur + getCharFromCharId(charCode);
    }, '')
    .toLowerCase();
}
