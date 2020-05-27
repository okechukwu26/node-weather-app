const form = document.querySelector('form');
const error = document.querySelector('#error');
const message = document.querySelector('#data');


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const value = document.querySelector('.location').value;
    error.textContent = 'Loading.....'
    message.textContent = ''


    fetch(`http://localhost:3000/weather?address=${value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return error.innerHTML = data.error
            }
            error.textContent = data.forcast;
            message.textContent = data.location


        })
    })
    document.querySelector('input').value = '';

})
