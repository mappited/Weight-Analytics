let  modalReg = document.getElementById('modalid-registration');
let	 buttonReg = document.getElementById('modalOpen-registration');
	 
	 

buttonReg.onclick = ()=> {
	modalReg.style.display = "block";
}

modalReg.onclick = function(event) {
	if (event.target == modalReg){
		modalReg.style.display = "none";
	}
}


document.body.addEventListener('keyup', function (event) {
    var key = event.keyCode;

    if (key == 27) {
        modalReg.style.display = "none";
    };
}, false);