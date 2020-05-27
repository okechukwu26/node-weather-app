const form = document.querySelector('form');
const error = document.querySelector('#error');
const message = document.querySelector('#data');


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const value = document.querySelector('.location').value;
    error.textContent = 'Loading.....'
    message.textContent = ''


    fetch(`/weather?address=${value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return error.innerHTML = data.error
            }
            message.textContent = data.location
            error.textContent = data.forcast;

        })
    })
    document.querySelector('input').value = '';

})
