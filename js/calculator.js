$(document).ready(function() {
	// Global variables
	var equation = '';
	// Number clicked event handler
	$('.calculator__item').on('click', (e) => {
		const number = $(e.target).text();
		setEquation(number);
	});

	// set the equation
	function setEquation(val) {
		const operations = [ '*', '/', '-', '+' ];

		switch (val) {
			case 'AC':
                equation = '';
                $('.calculator__output').text(`0`)
				break;
			case '=':
				calculateTheEquation();
				break;

			default:
				if (operations.includes(val)) {
					equation = equation + ' ' + val + ' ';
				} else {
					equation = equation + val;
				}

				break;
		}

		$('.calculator__equation').text(equation);
    }
    
    // calculate the equation and show the output
    function calculateTheEquation() {
        const answer = eval(equation)
        
        $('.calculator__output').text(`= ${answer.toFixed(2)}`)
    }
});
