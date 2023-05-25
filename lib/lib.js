export function formatDate(date) {
  date = date || new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function toBase62(num, length) {
  let str = "";
  do {
    str = BASE62[num % 62] + str;
    num = Math.floor(num / 62);
  } while (num > 0);

  // Pad the string with leading zeros if it's less than 6 characters long.
  while (str.length < length || 6) {
    str = "0" + str;
  }

  return str;
}

export function fromBase62(base62Number) {
  let result = 0;
  let power = 1;

  for (let i = base62Number.length - 1; i >= 0; i--) {
    const char = base62Number.charAt(i);
    const value = BASE62.indexOf(char);

    result += value * power;
    power *= 62;
  }

  return result;
}

export function getRandomBase62Number(length) {
  // The maximum number we can represent with 6 base62 characters is 62^6 - 1.
  const MAX_BASE62_VALUE = Math.pow(62, length || 6) - 1;

  // Generate a random number in the appropriate range.
  const randomNum = Math.floor(Math.random() * MAX_BASE62_VALUE);

  return randomNum;
}
