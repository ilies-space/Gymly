const initialState = {
  allMembers: [],
  archiviedMembers: [],
  gymName: 'gymName',
  codePin: '0000',
  AuthState: true, //true mean user is logedin else is logedOut
  firstTimeUse: true,
  Language: 'EN',
};

const DatabaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setGymName':
      state.gymName = action.gymName;
      return {
        allMembers: state.allMembers,
        archiviedMembers: state.archiviedMembers,
        gymName: state.gymName,
        codePin: state.codePin,
        AuthState: state.AuthState,
        firstTimeUse: state.firstTimeUse,
        Language: state.Language,
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
        codePin: state.codePin,
        AuthState: state.AuthState,
        firstTimeUse: state.firstTimeUse,
        Language: state.Language,
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
        codePin: state.codePin,
        AuthState: state.AuthState,
        firstTimeUse: state.firstTimeUse,
        Language: state.Language,
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
        codePin: state.codePin,
        AuthState: state.AuthState,
        firstTimeUse: state.firstTimeUse,
        Language: state.Language,
      };

    case 'EraceAllData':
      return {
        allMembers: [],
        archiviedMembers: [],
        gymName: 'gymName',
        codePin: '0000',
        AuthState: true,
        firstTimeUse: true,
        Language: 'EN',
      };

    case 'lock':
      state.AuthState = false;
      return {
        allMembers: state.allMembers,
        archiviedMembers: state.archiviedMembers,
        gymName: state.gymName,
        codePin: state.codePin,
        AuthState: state.AuthState,
        firstTimeUse: state.firstTimeUse,
        Language: state.Language,
      };

    case 'login':
      console.log(action.codePin);
      if (action.codePin === state.codePin) {
        state.AuthState = true;
      } else {
        alert('wrong password , pleas try again');
      }
      return {
        allMembers: state.allMembers,
        archiviedMembers: state.archiviedMembers,
        gymName: state.gymName,
        codePin: state.codePin,
        AuthState: state.AuthState,
        firstTimeUse: state.firstTimeUse,
        Language: state.Language,
      };

    case 'changePin':
      state.codePin = action.newPin;
      return {
        allMembers: state.allMembers,
        archiviedMembers: state.archiviedMembers,
        gymName: state.gymName,
        codePin: state.codePin,
        AuthState: state.AuthState,
        firstTimeUse: state.firstTimeUse,
        Language: state.Language,
      };

    case 'disableOnBoarding':
      state.firstTimeUse = false;
      return {
        allMembers: state.allMembers,
        archiviedMembers: state.archiviedMembers,
        gymName: state.gymName,
        codePin: state.codePin,
        AuthState: state.AuthState,
        firstTimeUse: state.firstTimeUse,
        Language: state.Language,
      };
    case 'changeLanguage':
      state.Language = action.selectedLanguage;
      return {
        allMembers: state.allMembers,
        archiviedMembers: state.archiviedMembers,
        gymName: state.gymName,
        codePin: state.codePin,
        AuthState: state.AuthState,
        firstTimeUse: state.firstTimeUse,
        Language: state.Language,
      };
    default:
      return state;
  }
};

export default DatabaseReducer;
