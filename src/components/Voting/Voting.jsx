import React from 'react';
import './Voting.css';
import { GrLinkNext } from "react-icons/gr";
import { useAuth } from '../utils/loginAuth';
import { usePollContext } from '../../context/pollContext';
import { UPDATE__DISH__RATING } from '../../helper/actions.type';
import { useNavigate } from 'react-router-dom';
import { RANKING } from '../../routes';

export default function Voting() {
	const { state, dispatch } = usePollContext();
	const auth = useAuth();
	const rankingNavigation = useNavigate();
	let selected_dishes = state.users_map.get(auth.user);

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

	return (
		<div className='voting-wrapper'>
			<div className='voting-container'>
				<div className='info-container'>
					<p className='info-text'>Selected Dishes</p>
					<button className='ranking-btn' onClick={() => rankingNavigation(RANKING)}>Ranking <GrLinkNext /></button>
				</div>
				<div className='voting-dishes-container'>
					<div className='dishes'>
						{
							state && state.users_map.get(auth.user).map((dish, index) => {
								const selected_dish = state.data_map.get(dish.dish_id);
								return (
									<div className={'dish-container no-cursor'} key={index}>
										<div className='dish-image-container'>
											<img src={selected_dish.image} />
										</div>
										<div className='dish-details-container'>
											<p className='dish-name'>{selected_dish.dishName}</p>
											<span></span>
											<p className='dish-description'>{selected_dish.description}</p>
											<div className='rating-container'>
												<div className='rating-wrapper'>
													<span className={`rating ${selected_dishes[index].rating === 1 ? 'active-points' : ''}`} onClick={() => updateRating(1, selected_dish.id, index)}>1</span>
													<span className={`rating ${selected_dishes[index].rating === 2 ? 'active-points' : ''}`} onClick={() => updateRating(2, selected_dish.id, index)}>2</span>
													<span className={`rating ${selected_dishes[index].rating === 3 ? 'active-points' : ''}`} onClick={() => updateRating(3, selected_dish.id, index)}>3</span>
												</div>
											</div>
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
