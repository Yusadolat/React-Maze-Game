export const scoreCard = (no_of_moves, max_mushroom) => {
	let score_achived  = document.getElementById('score_achieved')
	let no_of_moves_score = document.getElementById('no_of_moves')
	let mashrooms_remaining = document.getElementById('mashrooms_remaining')
	no_of_moves_score.innerHTML = no_of_moves
	mashrooms_remaining.innerHTML = document.getElementsByClassName('active').length
	score_achived.innerHTML = max_mushroom - document.getElementsByClassName('active').length
}