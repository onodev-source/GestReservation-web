const initialState = {
    language: 'en',
    languageChange: false,
    languageName: 'English',
    refresh: 0,
};

function language(state = initialState, action) {
    let nextState;

    switch (action.type) {
        case "LANGUAGE":
            nextState = {
                ...state,
                languageChange: true,
                language: action.value.language,
                languageName: action.value.languageName,
            };

            return nextState || state;

        case "REFRESH":
            nextState = {
                ...state,
                refresh: state.refresh + action.value,
            };

            return nextState || state;
        default:
            return state;
    }
}

export default language
