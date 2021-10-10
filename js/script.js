$(document).ready(function () {
    // Global variables
    var deatails;

	// show modal method
    function showCalculatorDetailsModal() {
        // Get calculator details from localstorage
        const calculatorDetails = localStorage.getItem('calculatorDetails');
        if (!calculatorDetails) {
            $('.calculator-modal').modal({ backdrop: 'static', keyboard: false });
        } else {
            deatails = JSON.parse(calculatorDetails)
        }
    }
    
    

	showCalculatorDetailsModal();
});
