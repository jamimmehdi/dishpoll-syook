import React from 'react';
import { usePollContext } from '../../context/pollContext';
import { useAuth } from '../utils/loginAuth';
import './Dishes.css';
import { HANDLE__DISH__SELECTION } from '../../helper/actions.type';
import { GrLinkNext } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { VOTE } from '../../routes';


export default function Dishes() {
  const { state, dispatch } = usePollContext();
  const votingNavigation = useNavigate();
  const auth = useAuth();
  let current_user_selection = state.users_map.get(auth.user);
  const user_selected_dish_id = auth.user && current_user_selection.map((selected_dish) => selected_dish.dish_id);

  // Handle card selection
  const handleCardSelection = (event, dish_id, username) => {
    event.stopPropagation();

    if (username) {
      // Check if dish is already selected
      for (let index = 0; index < current_user_selection.length; index++) {
        const id = current_user_selection[index].dish_id;
        if (id === dish_id) {
          current_user_selection.splice(index, 1);
          dispatch({ type: HANDLE__DISH__SELECTION, payload: { selected_dishes: current_user_selection, username } });
          return;
        }
      }

      // Max selection of 3 items
      if (current_user_selection.length >= 3) {
        alert('Cannot select more than 3 dishes!');
        return;
      }
      current_user_selection = [...current_user_selection, { dish_id, rating: 0 }];
      dispatch({ type: HANDLE__DISH__SELECTION, payload: { selected_dishes: current_user_selection, username } });
    } else {
      alert('Please login to continue!');
    }
  }

  // Handle voting
  const handleVoting = () => {
    if (!auth.user) {
      alert('Please login to vote!');
    }

    if (auth.user) {
      const current_user_selection = state.users_map.get(auth.user);
      if (current_user_selection.length < 3) {
        alert('Please select upto 3 dishes to start voting!');
        return;
      }
    }
    votingNavigation(VOTE);
  }

  return (
    <div className='dishes-wrapper'>
      <div className='dishes-container'>
        <div className='more-container'>
          <p className='vote-text'>Select upto 3 dishes to vote</p>
          <button className='vote-btn' onClick={handleVoting}>Vote <GrLinkNext /></button>
        </div>
        <div className='dishes'>
          {
            state && state.data.map((dish, index) => {
              const current_dish = state.data_map.get(dish.id);
              return (
                <div className={`dish-container ${user_selected_dish_id && user_selected_dish_id.includes(current_dish.id) ? 'selected' : ''}`}
                  key={index}
                  onClick={(event) => handleCardSelection(event, current_dish.id, auth.user)}>
                  <div className='dish-image-container'>
                    <img src={current_dish.image} />
                  </div>
                  <div className='dish-details-container'>
                    <p className='dish-name'>{current_dish.dishName}</p>
                    <span></span>
                    <p className='dish-description'>{current_dish.description}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
