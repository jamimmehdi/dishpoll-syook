import { LOAD__INITIAL__DATA, HANDLE__DISH__SELECTION, UPDATE__DISH__RATING } from './actions.type';

const pollReducer = (state, actions) => {
    switch (actions.type) {
        case LOAD__INITIAL__DATA:
            let data = [];
            const data_map = new Map();
            const users_map = new Map();
            actions.payload.data.forEach(dish => {
                data_map.set(dish.id, dish);
                data = [...data, { id: dish.id, rating: 0 }];
            });
            actions.payload.users.forEach(user => {
                users_map.set(user.username, []);
            })
            return {
                ...state,
                data_map,
                users_map,
                data,
            }

        case HANDLE__DISH__SELECTION:
            const selected_dish = actions.payload.selected_dishes;
            const username = actions.payload.username;
            return {
                ...state,
                users_map: state.users_map.set(username, selected_dish),
            }

        case UPDATE__DISH__RATING:
            return {
                ...state,
                users_map: state.users_map.set(actions.payload.username, actions.payload.selected_dishes),
                data: actions.payload.data,
            }

        default:
            return state;
    }
}

export default pollReducer;