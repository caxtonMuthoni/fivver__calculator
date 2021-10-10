$(document).ready(function() {
	// Global variables
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
        
        // store form data to local storage
        localStorage.setItem('calculatorDetails', JSON.stringify(formDataObject))

        // clear form and close modal
        $('.calculator-detail-form')[0].reset()
        $('.calculator-modal').modal('hide');

	});

	// Get calculator form data
	function getFormData() {}

	showCalculatorDetailsModal();
});
