(function () {
    const display = document.getElementById('display');
    const toggleScientific = document.getElementById('toggle-scientific');
    const scientificKeys = document.getElementById('scientific-keys');
    const keys = document.querySelectorAll('button.key, button.scientific');

    let expression = '';

    let scientificVisible = false;
    toggleScientific.addEventListener('click', () => {
        scientificVisible = !scientificVisible;
        if (scientificVisible) {
            scientificKeys.classList.remove('hidden');
            toggleScientific.textContent = 'Hide Scientific Keys';
        } else {
            scientificKeys.classList.add('hidden');
            toggleScientific.textContent = 'Show Scientific Keys';
        }
    });

    keys.forEach(key => {
        key.addEventListener('click', () => {
            const value = key.getAttribute('data-value');
            animateButton(key);
            handleInput(value);
        });
    });

    function animateButton(button) {
        anime({
            targets: button,
            scale: [{
                    value: 0.9,
                    duration: 80
                },
                {
                    value: 1,
                    duration: 80
                }
            ],
            easing: 'easeInOutQuad'
        });
    }

    function handleInput(value) {
        if (value === 'C') {
            expression = '';
            updateDisplay('0');
        } else if (value === '=') {
            try {
                const result = evaluateExpression(expression);
                updateDisplay(result);
                expression = result.toString();
            } catch (error) {
                updateDisplay('Error');
                expression = '';
            }
        } else {

            if (value === '÷') {
                expression += '/';
            } else if (value === '×') {
                expression += '*';
            } else {
                expression += value;
            }
            updateDisplay(expression);
        }
    }

    function updateDisplay(content) {
        display.textContent = content;
    }

    function evaluateExpression(expr) {
        expr = expr.replace(/÷/g, '/').replace(/×/g, '*');

        expr = expr.replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/sqrt\(/g, 'Math.sqrt(')
            .replace(/log\(/g, 'Math.log10(');

        return Function('"use strict";return (' + expr + ')')();
    }

})();