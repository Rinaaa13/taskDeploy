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