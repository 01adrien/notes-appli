import { faker } from "@faker-js/faker";

export function generateID() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

export function sortNotes(newNotesList) {
  for (let i = 0; i < newNotesList.length; i++) {
    for (let j = i + 1; j < newNotesList.length; j++) {
      if (parseFloat(newNotesList[j].rank) > parseFloat(newNotesList[i].rank)) {
        let temp = newNotesList[i];
        newNotesList[i] = newNotesList[j];
        newNotesList[j] = temp;
      }
    }
  }
  return newNotesList;
}

export const data = [];

for (let i = 0; i < 8; i++) {
  const note = {
    rank: 1,
    click: false,
    id: generateID(),
    title: faker.random.words(1),
    content: faker.random.words(100),
  };
  data.push(note);
}
