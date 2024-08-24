function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  // Clear previous highlights
  document.querySelectorAll('.word').forEach(word => word.classList.remove('active'));

  // Display 'ES IST'
  document.getElementById('es').classList.add('active');
  document.getElementById('ist').classList.add('active');

  // Minutes handling
  if (minutes >= 0 && minutes < 5) {
    document.getElementById('uhr').classList.add('active');
  } else if (minutes >= 5 && minutes < 10) {
    document.getElementById('fuenf1').classList.add('active');
    document.getElementById('nach').classList.add('active');
  } else if (minutes >= 10 && minutes < 15) {
    document.getElementById('zehn1').classList.add('active');
    document.getElementById('nach').classList.add('active');
  } else if (minutes >= 15 && minutes < 20) {
    document.getElementById('viertel').classList.add('active');
    document.getElementById('nach').classList.add('active');
  } else if (minutes >= 20 && minutes < 25) {
    document.getElementById('zwanzig').classList.add('active');
    document.getElementById('nach').classList.add('active');
  } else if (minutes >= 25 && minutes < 30) {
    document.getElementById('fuenf1').classList.add('active');
    document.getElementById('vor').classList.add('active');
    document.getElementById('halb').classList.add('active');
  } else if (minutes >= 30 && minutes < 35) {
    document.getElementById('halb').classList.add('active');
  } else if (minutes >= 35 && minutes < 40) {
    document.getElementById('fuenf1').classList.add('active');
    document.getElementById('nach').classList.add('active');
    document.getElementById('halb').classList.add('active');
  } else if (minutes >= 40 && minutes < 45) {
    document.getElementById('zwanzig').classList.add('active');
    document.getElementById('vor').classList.add('active');
  } else if (minutes >= 45 && minutes < 50) {
    document.getElementById('viertel').classList.add('active');
    document.getElementById('vor').classList.add('active');
  } else if (minutes >= 50 && minutes < 55) {
    document.getElementById('zehn1').classList.add('active');
    document.getElementById('vor').classList.add('active');
  } else if (minutes >= 55) {
    document.getElementById('fuenf1').classList.add('active');
    document.getElementById('vor').classList.add('active');
  }

  // Adjust hour for minutes after 30
  if (minutes >= 25) {
    hours += 1;
  }

  // Hours handling
  const hourWords = ['zwoelf', 'eins', 'zwei', 'drei', 'vier', 'fuenf2', 'sechs', 'sieben', 'acht', 'neun', 'zehn2', 'elf'];
  if (hours > 12) hours -= 12;
  document.getElementById(hourWords[hours % 12]).classList.add('active');
}

// Update clock every minute
setInterval(updateClock, 60000);
updateClock(); // Initial call to set the time on page load
