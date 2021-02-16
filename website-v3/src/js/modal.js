let  modal = document.getElementById('modalid');
let	 button = document.getElementById('modalOpen');
let  span = document.getElementsByClassName('modalClose')[0];


button.onclick = ()=> {
	modal.style.display = "block";
}

window.onclick = function(event) {
	if (event.target == modal){
		modal.style.display = "none";
	}
}
document.body.addEventListener('keyup', function (event) {
    var key = event.keyCode;

    if (key == 27) {
        modal.style.display = "none";
    }
}, false);
