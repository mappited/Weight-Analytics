let  modalWin = document.getElementById('modalId'),
	 buttonModal = document.getElementById('modalOpen');
var span = document.getElementsByClassName('modalClose')[0];

buttonModal.onclick = function() {
	modalWin.style.display = "block";
}
span.onclick = function()  {
	modalWin.style.display = "none";
}
window.onclick = function(event) {
	if (event.target == modalWin){
		modalWin.style.display = "none";
	}
}





