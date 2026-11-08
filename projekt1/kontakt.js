document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // bez przeladowania strony

    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    const status = document.getElementById('form-status');

    if (email === '' || subject === '' || message === '') {
        status.textContent = 'Wypełnij wszystkie pola formularza!';
        status.style.color = 'red';
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        status.textContent = 'Podaj poprawny adres e-mail (musi zawierać @ i kropkę).';
        status.style.color = 'red';
        return;
    }

    if (message.length < 10) {
        status.textContent = 'Wiadomość jest za krótka (minimum 10 znaków).';
        status.style.color = 'red';
        return;
    }

    status.textContent = 'Wysyłanie wiadomości';
    status.style.color = '#728E6D';

    const botToken = '9022764394:AAEUjguf47ZLOFvLBXSJPZs4YujmMIzJVDA';
    const chatId = '7093466997';
    
    const textToSend = 'Nowa wiadomość ze strony!\n\nOd: ' + email + '\nTemat: ' + subject + '\nTreść: ' + message;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: textToSend
        })
    })
    .then(function(response) {
        if (response.ok) {
            status.textContent = 'Wiadomość została wysłana';
            status.style.color = 'green';
            document.getElementById('contactForm').reset();
        } else {
            status.textContent = 'Wystąpił błąd po stronie serwera';
            status.style.color = 'red';
        }
    })
    .catch(function(error) {
        status.textContent = 'Błąd połączenia.';
        status.style.color = 'red';
    });
});