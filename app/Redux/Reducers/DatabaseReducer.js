const initialState = {
  allMembers: [],
  archiviedMembers: [],
  gymName: 'gymName',
  codePin: '',
};

const DatabaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setGymName':
      state.gymName = action.gymName;
      return {
        allMembers: state.allMembers,
        archiviedMembers: state.archiviedMembers,
        gymName: state.gymName,
        codePin: '',
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
        codePin: '',
      };

    case 'deleteMember':
      let _lookup = state.archiviedMembers.find(
        (element) => element === action.member,
      );

      state.archiviedMembers = state.archiviedMembers.filter(
        (item) => item !== _lookup,
      );
      return {
        allMembers: state.allMembers,
        archiviedMembers: state.archiviedMembers,
        gymName: state.gymName,
        codePin: '',
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
        codePin: '',
      };

    case 'EraceAllData':
      return {
        allMembers: [],
        archiviedMembers: [],
        gymName: 'gymName',
        codePin: '',
      };
    default:
      return state;
  }
};

export default DatabaseReducer;
