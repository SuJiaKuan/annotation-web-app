const initialState = {
  /*
  projectList: [],
  */
  projectList: [
    {
      id: 'jill1',
      name: 'Jill Project 1',
      description: 'This is Jill Project 1\n HAHA gg kerker\n yoyo',
    },
    {
      id: 'cool',
      name: 'Coooooooool',
      description: 'Very cool project',
    },
    {
      id: 'jill2',
      name: 'Jill Project 2',
      description: 'This is Jill Project 2',
    },
  ],
}

export default function data(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
