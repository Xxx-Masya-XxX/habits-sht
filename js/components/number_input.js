document.addEventListener('click', function(e) {
    if (e.target.classList.contains('increment')) {
        const input = e.target.previousElementSibling;
        input.value = parseInt(input.value) + 1;
    }
    if (e.target.classList.contains('decrement')) {
        const input = e.target.nextElementSibling;
        if (parseInt(input.value) > 0) {
            input.value = parseInt(input.value) - 1;
        }
    }
});