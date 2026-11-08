const savedResult = localStorage.getItem('polecanyLinux');

if (savedResult) {
  document.getElementById('quiz-form').style.display = 'none';
  document.getElementById('saved-result-box').style.display = 'block';
  document.getElementById('saved-distro').textContent = savedResult;
}

// rozwiaz ponownie
document.getElementById('reset-quiz-btn').addEventListener('click', function() {
  localStorage.removeItem('polecanyLinux'); 
  location.reload(); 
});

document.getElementById('quiz-form').addEventListener('submit', function(event) {
  event.preventDefault(); //bez przeladowania strony
  
  const errorMsg = document.getElementById('quiz-error');
  errorMsg.textContent = ''; 

  const answer1 = document.querySelector('input[name="q1"]:checked');
  const answer2 = document.querySelector('input[name="q2"]:checked');
  const answer3 = document.querySelector('input[name="q3"]:checked');

  if (!answer1 || !answer2 || !answer3) {
    errorMsg.textContent = 'Odpowiedz na wszystkie 3 pytania!';
    return;
  }

  
  let points = {
    mint: 0,
    zorin: 0,
    ubuntu: 0,
    fedora: 0
  };

  points[answer1.value] += 1;
  points[answer2.value] += 1;
  points[answer3.value] += 1;

  let winner = '';
  let maxPoints = 0;

  for (let distro in points) {
    if (points[distro] > maxPoints) {
      maxPoints = points[distro];
      winner = distro;
    }
  }

  let Name = '';
  if (winner === 'mint') Name = 'Linux Mint';
  if (winner === 'zorin') Name = 'Zorin OS';
  if (winner === 'ubuntu') Name = 'Ubuntu';
  if (winner === 'fedora') Name = 'Fedora';

  localStorage.setItem('polecanyLinux', Name); //zapis wyniku

  document.getElementById('quiz-form').style.display = 'none'; //ukryj formularz
  document.getElementById('new-result-box').style.display = 'block'; //wynik
  document.getElementById('new-distro').textContent = Name;
});