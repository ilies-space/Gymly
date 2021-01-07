const initialState = {
  allMembers: [],
  archiviedMembers: [],
  gymName: 'gymName',
};

const DatabaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setGymName':
      state.gymName = action.gymName;
      return {
        allMembers: state.allMembers,
        archiviedMembers: state.archiviedMembers,
        gymName: state.gymName,
      };

    case 'addNewMember':
      console.log('addNewMember');
      state.allMembers = state.allMembers
        ? [action.newMember, ...state.allMembers]
        : action.newMember;
      return {
        allMembers: state.allMembers,
        archiviedMembers: state.archiviedMembers,
        gymName: state.gymName,
      };

    case 'addNewMemberToArchive':
      console.log('addNewMemberToArchive');
      state.archiviedMembers = [action.newMember, ...state.archiviedMembers];

      // delete from old list
      let lookup = state.allMembers.find(
        (element) => element === action.newMember,
      );

      state.allMembers = state.allMembers.filter((item) => item !== lookup);

      return {
        allMembers: state.allMembers,
        archiviedMembers: state.archiviedMembers,
        gymName: state.gymName,
      };

    case 'EraceAllData':
      return {
        allMembers: [],
        archiviedMembers: [],
        gymName: 'gymName',
      };
    default:
      return state;
  }
};

export default DatabaseReducer;
