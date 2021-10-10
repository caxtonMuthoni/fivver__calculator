$(document).ready(function() {
	var deatails;

	// show modal method
	function showCalculatorDetailsModal() {
		// Get calculator details from localstorage
		const calculatorDetails = localStorage.getItem('calculatorDetails');
		if (!calculatorDetails) {
			$('.calculator-modal').modal({ backdrop: 'static', keyboard: false });
		} else {
			deatails = JSON.parse(calculatorDetails);
		}
	}

	// handle form subumit
	$('.calculator-detail-form').on('submit', (e) => {
		e.preventDefault();

		// get and prepare form data
		const formData = $('.calculator-detail-form').serializeArray();
		const formDataObject = formData.reduce(function(obj, item) {
			obj[item.name] = item.value;
			return obj;
		}, {});

		deatails = formDataObject;
		location.reload()

		// store form data to local storage
		localStorage.setItem('calculatorDetails', JSON.stringify(formDataObject));

		// clear form and close modal
		$('.calculator-detail-form')[0].reset();
		$('.calculator-modal').modal('hide');
	});

	// Setup calculator numbers
	function setupCalculatorNumbers() {
		const dob = deatails.dob.split('-');
		const numbers = dob[2] + dob[1];
		const year = dob[0];
		const yearNumbers = year.split('');
		const uniqueNumbers = Array.from(new Set(numbers.split('')));

		if (uniqueNumbers.length < 4) {
			for (let i = 0; i < yearNumbers.length; i++) {
				if (uniqueNumbers.includes(yearNumbers[i])) {
					continue;
				} else {
					if (uniqueNumbers.length < 4) {
						uniqueNumbers.push(yearNumbers[i]);
					} else {
						break;
					}
				}
			}
		}

		if (uniqueNumbers.length < 4) {
			for (let i = 0; i < 10; i++) {
				if (uniqueNumbers.includes(`${i}`)) {
					continue;
				} else {
					if (uniqueNumbers.length < 4) {
						uniqueNumbers.push(`${i}`);
					} else {
						break;
					}
				}
			}
		}

		// sort numbers
		const sortedNumbers = uniqueNumbers.sort((a, b) => a - b);

		// add numbers to the dom
		const domElements = sortedNumbers.map((num) => `<div class="calculator__number calculator__item">${num}</div>`);
		$('.calculator__body').html(domElements);
	}

	// Set up operations
	function setupOperations() {
		var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
		const indexOfM = 12;
		const firstCharacter = deatails.username.charAt(0);
		const index = alphabet.indexOf(firstCharacter);
		let operations = [ 'AC', '+', '/', '=' ];

		if (index > indexOfM) {
			operations = [ 'AC', '-', '*', '=' ];
		}

		const operationElements = operations.map(
			(operation) => `<div class="calculator__operation calculator__item">${operation}</div>`
		);
		$('.calculator__operations').html(operationElements);
	}

	function setUserDetails() {
		$('.calulator__username').text(deatails.username);
		$('.calulator__dob').text(deatails.dob);
    }
    
    $('.btn-clear').on('click', e => {
        e.preventDefault()
        localStorage.clear('calculatorDetails')
        location.reload()
    })

	showCalculatorDetailsModal();
	if (deatails) {
		setupCalculatorNumbers();
		setupOperations();
		setUserDetails();
	}
});
