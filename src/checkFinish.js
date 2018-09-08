export const checkFinish = (no_of_moves) => {
	let check = document.getElementsByClassName('active')
	if(check.length === 0){
		let game_complete = window.confirm("You have finished the game in "+ no_of_moves + " moves.");
		if (game_complete === true){
			window.location.reload()
		}
	}
}