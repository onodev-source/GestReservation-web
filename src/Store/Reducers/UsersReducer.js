const initialState = {
    authenticated: false,
    access_token: '',
    users: {}
}

function users(state = initialState, action) {
    let nextState;

    switch (action.type) {
        case "USERS":
            nextState = {
                ...state,
                users: action.value
            };

            return nextState || state;
            
        case "LOGIN":
            nextState = {
                ...state,
                authenticated: true,
                users: action.value.users,
                access_token: action.value.access_token
            };

            return nextState || state;

        case "LOGOUT":
            nextState = {
                ...state,
                users: {},
                authenticated: false,
                access_token: '',
            };

            return nextState || state;

        default:
            return state;
    }
}

export default users