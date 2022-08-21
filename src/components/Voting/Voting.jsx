import React from 'react';
import './Voting.css';
import { GrLinkNext } from "react-icons/gr";
import { useAuth } from '../utils/loginAuth';
import { usePollContext } from '../../context/pollContext';
import { UPDATE__DISH__RATING } from '../../helper/actions.type';

export default function Voting() {
	const { state, dispatch } = usePollContext();
	const auth = useAuth();
	let selected_dishes = state.users_map.get(auth.user);

	// Update dish rating
	const updateRating = (rating, index) => {
		const previousRating = state.users_map.get(auth.user)[index].rating;
		if (previousRating === rating) {
			selected_dishes[index].rating = 0;
		} else {
			selected_dishes[index].rating = rating;
		}
		dispatch({ type: UPDATE__DISH__RATING, payload: { username: auth.user, selected_dishes } });
		console.log(selected_dishes);
	}

	return (
		<div className='voting-wrapper'>
			<div className='voting-container'>
				<div className='info-container'>
					<p className='info-text'>Rate Dishes</p>
					<button className='ranking-btn' >Ranking <GrLinkNext /></button>
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
													<span className={`rating ${selected_dishes[index].rating === 1 ? 'active-points' : ''}`} onClick={() => updateRating(1, index)}>1</span>
													<span className={`rating ${selected_dishes[index].rating === 2 ? 'active-points' : ''}`} onClick={() => updateRating(2, index)}>2</span>
													<span className={`rating ${selected_dishes[index].rating === 3 ? 'active-points' : ''}`} onClick={() => updateRating(3, index)}>3</span>
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
