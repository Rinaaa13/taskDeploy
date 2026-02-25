let notes = [
    {
      id: 1,
      title: 'first note',
      content: 'My first note is here.'
    }
  ];
  
export const list = () => {
    return notes.map(({ id, title }) => ({
      id,
      title
    }));
 };

exports.get = (id) => {
    const note = notes.find(
    (note) => note.id === id
    );
    if (!Inote) {
        throw new Error('Note not found');
    }
    return note;
}

export const create = (title, content) => {
    const lastId = notes.length > 0 ? notes[notes.length - 1].id : 0;
    const newNote = {
      id: lastId + 1,
      title,
      content
    };
    notes.push(newNote);
    return newNote;
};

exports.update = (id, title, content) => {
    const index = notes. findIndex(
      (note) => note.id === id
    );
    if (index < 0) {
        throw new Error('Note not found for update');
    }
    const note = notes [index];
    note.title = title;
    note.content = content;
    notes[index] = note;
    return note;
}

exports.delete = (id) => {
    if (!notes.some((note) => note.id === id)) {
        throw new Error(
        'Note not found for delete'
        );
    }
    notes = notes.filter(note => note.id!== id);
    return 
}