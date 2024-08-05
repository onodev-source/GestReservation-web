const initialState = {
    language: 'en',
    languageName: 'English',
  };
  
  const languageReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LANGUAGE':
        return {
          ...state,
          language: action.value.language,
          languageName: action.value.languageName,
        };
      default:
        return state;
    }
  };
  
  export default languageReducer;
  