import React from 'react';
import { useAuth } from '../utils/loginAuth';
import './Ranking.css';
import { GrLinkPrevious } from "react-icons/gr";
import { usePollContext } from '../../context/pollContext';
import { useNavigate } from 'react-router-dom';
import { UPDATE__DISH__RATING } from '../../helper/actions.type';
import { DISHES } from '../../routes';

export default function Ranking() {
  const homeNavigation = useNavigate();
  const { state, dispatch } = usePollContext();
  const sortedDishes = state.data.sort((dish_x, dish_y) => dish_x.rating > dish_y.rating ? -1 : 1);
  const auth = useAuth();
  let selected_dishes = state.users_map.get(auth.user);
  const user_selected_dish_id = auth.user && selected_dishes.map((selected_dish) => selected_dish.dish_id);

  // Update dish rating
  const updateRating = (rating, current_dish_id, selected_dish_index) => {
    const previousRating = state.users_map.get(auth.user)[selected_dish_index].rating;
    const total_rating = state.data;
    if (previousRating === rating) {
      selected_dishes[selected_dish_index].rating = 0;
    } else {
      selected_dishes[selected_dish_index].rating = rating;
    }

    // Update dish global rating
    for (let index = 0; index < total_rating.length; index++) {
      const dish = total_rating[index];
      if (dish.id === current_dish_id) {
        // globalRating = (currentTotalRating - previousRating) + currentRatingByUser
        total_rating[index].rating = (total_rating[index].rating - previousRating) + (selected_dishes[selected_dish_index].rating);
        break;
      }
    }
    dispatch({ type: UPDATE__DISH__RATING, payload: { username: auth.user, selected_dishes, data: total_rating } });
  }

  // Get index of selected dish
  const getIndex = (id) => {
    for (let index = 0; index < selected_dishes.length; index++) {
      if (selected_dishes[index].dish_id === id) return index;
    }
  }

  return (
    <div className='ranking-wrapper'>
      <div className='ranking-container'>
        <div className='info-container'>
          <p className='info-text'>Ranking</p>
          {auth.user && <button className='goto-dish' onClick={() => homeNavigation(DISHES)}><GrLinkPrevious />Dish Selection</button>}
        </div>
        <div className='ranking-list-container'>
          <div className='dishes flex-column'>
            {
              sortedDishes && sortedDishes.map((dish, index) => {
                const selected_dish = state.data_map.get(dish.id);
                return (
                  <div className={`${user_selected_dish_id && user_selected_dish_id.includes(dish.id) ? 'dish-container no-cursor user-selected' : 'dish-container no-cursor'}`} key={index}>
                    <div className='dish-image-container'>
                      <img src={selected_dish.image} />
                    </div>
                    <div className='dish-details-container'>
                      <p className='dish-name rank'>{selected_dish.dishName}<span className=''>{index + 1}</span></p>
                      <p className='dish-description'>{selected_dish.description}</p>
                      {
                        auth.user && user_selected_dish_id.includes(dish.id) && (
                          <div className='rating-container'>
                            <div className='rating-wrapper'>
                              <span className={`rating ${selected_dishes[getIndex(dish.id)].rating === 1 ? 'active-points' : ''}`} onClick={() => updateRating(1, selected_dish.id, getIndex(dish.id))}>1</span>
                              <span className={`rating ${selected_dishes[getIndex(dish.id)].rating === 2 ? 'active-points' : ''}`} onClick={() => updateRating(2, selected_dish.id, getIndex(dish.id))}>2</span>
                              <span className={`rating ${selected_dishes[getIndex(dish.id)].rating === 3 ? 'active-points' : ''}`} onClick={() => updateRating(3, selected_dish.id, getIndex(dish.id))}>3</span>
                            </div>
                          </div>
                        )
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
