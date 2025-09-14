// TypeScript interfaces für bessere Typsicherheit
interface HourWords {
  [key: number]: string;
}

// Konfiguration
const HOUR_WORDS: HourWords = {
  1: 'eins',
  2: 'zwei', 
  3: 'drei',
  4: 'vier',
  5: 'fuenf2',
  6: 'sechs',
  7: 'sieben',
  8: 'acht',
  9: 'neun',
  10: 'zehn2',
  11: 'elf',
  12: 'zwoelf'
};

/**
 * Aktualisiert die Wortuhr-Anzeige basierend auf der aktuellen Zeit
 */
function updateClock(): void {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Vorherige Highlights entfernen
  document.querySelectorAll('.word').forEach(word => {
    word.classList.remove('active');
  });

  // 'ES IST' immer anzeigen
  document.getElementById('es')?.classList.add('active');
  document.getElementById('ist')?.classList.add('active');

  // Minuten-Logik
  updateMinutes(minutes);

  // Stunden-Logik
  const displayHours = calculateDisplayHours(hours, minutes);
  updateHours(displayHours);
}

/**
 * Aktualisiert die Minuten-Anzeige
 */
function updateMinutes(minutes: number): void {
  if (minutes >= 0 && minutes < 5) {
    document.getElementById('uhr')?.classList.add('active');
  } else if (minutes >= 5 && minutes < 10) {
    document.getElementById('fuenf1')?.classList.add('active');
    document.getElementById('nach')?.classList.add('active');
  } else if (minutes >= 10 && minutes < 15) {
    document.getElementById('zehn1')?.classList.add('active');
    document.getElementById('nach')?.classList.add('active');
  } else if (minutes >= 15 && minutes < 20) {
    document.getElementById('viertel')?.classList.add('active');
    document.getElementById('nach')?.classList.add('active');
  } else if (minutes >= 20 && minutes < 25) {
    document.getElementById('zwanzig')?.classList.add('active');
    document.getElementById('nach')?.classList.add('active');
  } else if (minutes >= 25 && minutes < 30) {
    document.getElementById('fuenf1')?.classList.add('active');
    document.getElementById('vor')?.classList.add('active');
    document.getElementById('halb')?.classList.add('active');
  } else if (minutes >= 30 && minutes < 35) {
    document.getElementById('halb')?.classList.add('active');
  } else if (minutes >= 35 && minutes < 40) {
    document.getElementById('fuenf1')?.classList.add('active');
    document.getElementById('nach')?.classList.add('active');
    document.getElementById('halb')?.classList.add('active');
  } else if (minutes >= 40 && minutes < 45) {
    document.getElementById('zwanzig')?.classList.add('active');
    document.getElementById('vor')?.classList.add('active');
  } else if (minutes >= 45 && minutes < 50) {
    document.getElementById('viertel')?.classList.add('active');
    document.getElementById('vor')?.classList.add('active');
  } else if (minutes >= 50 && minutes < 55) {
    document.getElementById('zehn1')?.classList.add('active');
    document.getElementById('vor')?.classList.add('active');
  } else if (minutes >= 55) {
    document.getElementById('fuenf1')?.classList.add('active');
    document.getElementById('vor')?.classList.add('active');
  }
}

/**
 * Berechnet die anzuzeigende Stunde basierend auf Minuten
 */
function calculateDisplayHours(hours: number, minutes: number): number {
  let displayHours = hours;
  
  // Bei Minuten >= 25 wird die nächste Stunde angezeigt
  if (minutes >= 25) {
    displayHours += 1;
  }
  
  // 24h zu 12h Format konvertieren
  if (displayHours > 12) displayHours -= 12;
  if (displayHours === 0) displayHours = 12;
  
  return displayHours;
}

/**
 * Aktualisiert die Stunden-Anzeige
 */
function updateHours(hours: number): void {
  const hourWord = HOUR_WORDS[hours];
  if (hourWord) {
    document.getElementById(hourWord)?.classList.add('active');
  }
}

/**
 * Test-Funktion für spezifische Zeiten
 */
export function testTime(hours: number, minutes: number): void {
  // Vorherige Highlights entfernen
  document.querySelectorAll('.word').forEach(word => {
    word.classList.remove('active');
  });

  // 'ES IST' immer anzeigen
  document.getElementById('es')?.classList.add('active');
  document.getElementById('ist')?.classList.add('active');

  // Minuten und Stunden aktualisieren
  updateMinutes(minutes);
  const displayHours = calculateDisplayHours(hours, minutes);
  updateHours(displayHours);
  
  console.log(`Testing time: ${hours}:${minutes.toString().padStart(2, '0')}`);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Initiale Anzeige
  updateClock();
  
  // Alle 60 Sekunden aktualisieren
  setInterval(updateClock, 60000);
});

// Export für Tests
export { updateClock, updateMinutes, updateHours, calculateDisplayHours };
