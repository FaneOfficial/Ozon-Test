const progressComponent = (targetElement) => {
    targetElement.innerHTML =
    `
    <div class="progress-block">
        <div class="progress-bar">
            <svg class="progress-ring" width="120" height="120">
                <circle class="progress-ring-circle-back" cx="60" cy="60" r="50"></circle>
                <circle class="progress-ring-circle" cx="60" cy="60" r="50"></circle>
            </svg>
        </div>
        <div class="menu">
            <label for="value-input" class="percents">
                <input id="value-input" min="0" max="100" value="100">
                Value
            </label>
            <label for="animate-checkbox" class="switcher">
                <input type="checkbox" id="animate-checkbox">
                <i></i>
                Animate
            </label>
            <label for="hide-checkbox" class="switcher">
                <input type="checkbox" id="hide-checkbox">
                <i></i>
                Hide
            </label>
        </div>
    </div>
    `;
    const circle = document.querySelector('.progress-ring-circle');
    const valueInput = document.getElementById('value-input');
    const animateCheckbox = document.getElementById('animate-checkbox');
    const hideCheckbox = document.getElementById('hide-checkbox');

    const changeInput = () => {
        const { value } = valueInput;
        if (value > 100) {
            valueInput.value = 100;
        }
        if (value < 0) {
            valueInput.value = 0;
        }
        const progress = (314 * (100 - value)) / 100;
        circle.style.strokeDashoffset = progress;
    }
    const animateCheckboxChange = () => {
        if (animateCheckbox.checked) {
            circle.classList.add('animate');
        } else {
            circle.classList.remove('animate');
        }
    }

    const hideCheckboxChange = () => {
        const isHidden = hideCheckbox.checked;
        if (isHidden) {
            document.querySelector('.progress-bar').style.display = 'none';
            animateCheckbox.removeEventListener('change', animateCheckboxChange);
            valueInput.disabled = true;
        } else {
            animateCheckbox.addEventListener('change', animateCheckboxChange);
            document.querySelector('.progress-bar').style.display = 'flex';
            valueInput.disabled = false;
        }
        
    }

    valueInput.addEventListener('change', changeInput);
    animateCheckbox.addEventListener('change', animateCheckboxChange);
    hideCheckbox.addEventListener('change', hideCheckboxChange);

    valueInput.removeEventListener('onmouseover', changeInput);
}

const targetElement = document.getElementById('targetElement');
progressComponent(targetElement);