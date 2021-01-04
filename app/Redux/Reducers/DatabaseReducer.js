const initialState = {
  allMembers: [],
  archiviedMembers: [],
};

const DatabaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'addNewMember':
      console.log('addNewMember');
      state.allMembers = state.allMembers
        ? [action.newMemeber, ...state.allMembers]
        : action.newMemeber;
      return {
        allMembers: state.allMembers,
        archiviedMembers: state.archiviedMembers,
      };

    case 'addNewMemberToArchive':
      console.log('addNewMemberToArchive');
      state.archiviedMembers = [action.newMemeber, ...state.archiviedMembers];

      // delete from old list
      let lookup = state.allMembers.find(
        (element) => element === action.newMemeber,
      );

      state.allMembers = state.allMembers.filter((item) => item !== lookup);

      return {
        allMembers: state.allMembers,
        archiviedMembers: state.archiviedMembers,
      };

    default:
      return state;
  }
};

export default DatabaseReducer;
