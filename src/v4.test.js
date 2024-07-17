const { v4 } = require('./helpers');

const millionUids = new Array(1000000).fill(0).map(() => v4());

const findDuplicates = (arr) => {
  const sortedArr = arr.slice().sort();
  const duplicates = [];

  for (let i = 0; i < sortedArr.length - 1; i++) {
    if (sortedArr[i + 1] === sortedArr[i]) {
      duplicates.push(sortedArr[i]);
    }
  }

  return duplicates;
}


const duplicates = findDuplicates(millionUids);

const uuidV4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe('v4 Generator', () => {
    test('generates a valid UUID v4', () => {
      millionUids.forEach((uuid) => {
        expect(uuid).toMatch(uuidV4Pattern);
      })
    });

    test('generates unique UUIDs', () => {
        expect(duplicates.length).toBe(0);
    });

    test('generates UUID of correct length', () => {
        const uuid = v4();
        expect(uuid.length).toBe(36);
    });
});