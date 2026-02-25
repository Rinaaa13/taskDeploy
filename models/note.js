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