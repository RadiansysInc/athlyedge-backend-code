export const formatBytes = (bytes?: number) => {
  if (!bytes) return null;
  if (bytes < 1024) {
    return bytes + ' B';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }
};

export const getRequestId = (characters = 3) =>
  [
    Math.random()
      .toString(36)
      .replace(/[^a-z]/g, '')
      .substring(0, characters),
    Date.now(),
  ].join('');



export const validateISBN = (isbn: string): boolean => {

  let sum,
    weight,
    digit,
    check,
    i;

  isbn = isbn.replace(/[^0-9X]/gi, '');

  if (isbn.length != 10 && isbn.length != 13) {
    return false;
  }

  if (isbn.length == 13) {
    sum = 0;
    for (i = 0; i < 12; i++) {
      digit = parseInt(isbn[i]);
      if (i % 2 == 1) {
        sum += 3 * digit;
      } else {
        sum += digit;
      }
    }
    check = (10 - (sum % 10)) % 10;
    return (check == isbn[isbn.length - 1]);
  }

  if (isbn.length == 10) {
    weight = 10;
    sum = 0;
    for (i = 0; i < 9; i++) {
      digit = parseInt(isbn[i]);
      sum += weight * digit;
      weight--;
    }
    check = (11 - (sum % 11)) % 11
    if (check == 10) {
      check = 'X';
    }
    return (check == isbn[isbn.length - 1].toUpperCase());
  }

}