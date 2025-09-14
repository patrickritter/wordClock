// Test-Framework für die Wortuhr (TypeScript Version)
import { calculateDisplayHours } from '../main'

class TestFramework {
  private tests: Array<{ name: string; testFunction: () => void }> = []
  private passed = 0
  private failed = 0

  test(name: string, testFunction: () => void): void {
    this.tests.push({ name, testFunction })
  }

  assert(condition: boolean, message: string): void {
    if (!condition) {
      throw new Error(message)
    }
  }

  assertEquals(actual: any, expected: any, message: string): void {
    if (actual !== expected) {
      throw new Error(`${message} - Expected: ${expected}, Actual: ${actual}`)
    }
  }

  assertArrayEquals(actual: any[], expected: any[], message: string): void {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`${message} - Expected: ${JSON.stringify(expected)}, Actual: ${JSON.stringify(actual)}`)
    }
  }

  runTests(): void {
    console.log('🧪 Starting Wortuhr Tests...')
    
    this.tests.forEach(test => {
      try {
        test.testFunction()
        this.passed++
        this.addTestResult(test.name, true, 'Test passed')
      } catch (error) {
        this.failed++
        this.addTestResult(test.name, false, (error as Error).message)
      }
    })

    this.showSummary()
  }

  private addTestResult(testName: string, passed: boolean, message: string): void {
    const container = this.getTestContainer(testName)
    const testItem = document.createElement('div')
    testItem.className = `test-item ${passed ? 'pass' : 'fail'}`
    
    testItem.innerHTML = `
      <div class="test-name">${testName}</div>
      <div class="test-expected">${message}</div>
    `
    
    container.appendChild(testItem)
  }

  private getTestContainer(testName: string): HTMLElement {
    if (testName.includes('Stunde')) return document.getElementById('hour-tests')!
    if (testName.includes('Minute')) return document.getElementById('minute-tests')!
    return document.getElementById('time-tests')!
  }

  private showSummary(): void {
    const summary = document.getElementById('test-summary')!
    const total = this.passed + this.failed
    const successRate = ((this.passed / total) * 100).toFixed(1)
    
    summary.innerHTML = `
      <h3>Test-Zusammenfassung</h3>
      <p><strong>Gesamt:</strong> ${total} Tests</p>
      <p><strong>Bestanden:</strong> <span style="color: #28a745;">${this.passed}</span></p>
      <p><strong>Fehlgeschlagen:</strong> <span style="color: #dc3545;">${this.failed}</span></p>
      <p><strong>Erfolgsrate:</strong> ${successRate}%</p>
    `
    
    console.log(`✅ Tests completed: ${this.passed}/${total} passed (${successRate}%)`)
  }
}

// Hilfsfunktion um die aktiven Wörter zu bekommen
function getActiveWords(hours: number, minutes: number): string[] {
  const activeWords: string[] = []
  
  // ES IST immer aktiv
  activeWords.push('es', 'ist')

  // Minuten-Logik
  if (minutes >= 0 && minutes < 5) {
    activeWords.push('uhr')
  } else if (minutes >= 5 && minutes < 10) {
    activeWords.push('fuenf1', 'nach')
  } else if (minutes >= 10 && minutes < 15) {
    activeWords.push('zehn1', 'nach')
  } else if (minutes >= 15 && minutes < 20) {
    activeWords.push('viertel', 'nach')
  } else if (minutes >= 20 && minutes < 25) {
    activeWords.push('zwanzig', 'nach')
  } else if (minutes >= 25 && minutes < 30) {
    activeWords.push('fuenf1', 'vor', 'halb')
  } else if (minutes >= 30 && minutes < 35) {
    activeWords.push('halb')
  } else if (minutes >= 35 && minutes < 40) {
    activeWords.push('fuenf1', 'nach', 'halb')
  } else if (minutes >= 40 && minutes < 45) {
    activeWords.push('zwanzig', 'vor')
  } else if (minutes >= 45 && minutes < 50) {
    activeWords.push('viertel', 'vor')
  } else if (minutes >= 50 && minutes < 55) {
    activeWords.push('zehn1', 'vor')
  } else if (minutes >= 55) {
    activeWords.push('fuenf1', 'vor')
  }

  // Stunden-Logik
  const displayHours = calculateDisplayHours(hours, minutes)
  const hourWords: { [key: number]: string } = {
    1: 'eins', 2: 'zwei', 3: 'drei', 4: 'vier', 5: 'fuenf2',
    6: 'sechs', 7: 'sieben', 8: 'acht', 9: 'neun', 10: 'zehn2',
    11: 'elf', 12: 'zwoelf'
  }
  
  const hourWord = hourWords[displayHours]
  if (hourWord) {
    activeWords.push(hourWord)
  }
  
  return activeWords
}

// Test-Funktionen für die Wortuhr
function runWortuhrTests(): void {
  const testFramework = new TestFramework()

  // Stunden-Tests
  testFramework.test('Stunde 1 (01:00)', () => {
    const activeWords = getActiveWords(1, 0)
    testFramework.assert(activeWords.includes('eins'), 'Stunde 1 sollte "eins" enthalten')
    testFramework.assert(activeWords.includes('uhr'), 'Genau sollte "uhr" enthalten')
  })

  testFramework.test('Stunde 12 (12:00)', () => {
    const activeWords = getActiveWords(12, 0)
    testFramework.assert(activeWords.includes('zwoelf'), 'Stunde 12 sollte "zwoelf" enthalten')
  })

  testFramework.test('Stunde 22 → 10 (22:20)', () => {
    const activeWords = getActiveWords(22, 20)
    testFramework.assert(activeWords.includes('zehn2'), '22 Uhr sollte als "zehn" angezeigt werden')
  })

  testFramework.test('Stunde 0 → 12 (00:30)', () => {
    const activeWords = getActiveWords(0, 30)
    testFramework.assert(activeWords.includes('zwoelf'), '0 Uhr sollte als "zwoelf" angezeigt werden')
  })

  // Minuten-Tests
  testFramework.test('Minuten 0-4 (genau)', () => {
    const activeWords = getActiveWords(10, 2)
    testFramework.assert(activeWords.includes('uhr'), '0-4 Minuten sollte "uhr" enthalten')
    testFramework.assert(!activeWords.includes('nach'), '0-4 Minuten sollte nicht "nach" enthalten')
    testFramework.assert(!activeWords.includes('vor'), '0-4 Minuten sollte nicht "vor" enthalten')
  })

  testFramework.test('Minuten 5-9 (fünf nach)', () => {
    const activeWords = getActiveWords(10, 7)
    testFramework.assert(activeWords.includes('fuenf1'), '5-9 Minuten sollte "fuenf1" enthalten')
    testFramework.assert(activeWords.includes('nach'), '5-9 Minuten sollte "nach" enthalten')
  })

  testFramework.test('Minuten 15-19 (viertel nach)', () => {
    const activeWords = getActiveWords(10, 17)
    testFramework.assert(activeWords.includes('viertel'), '15-19 Minuten sollte "viertel" enthalten')
    testFramework.assert(activeWords.includes('nach'), '15-19 Minuten sollte "nach" enthalten')
  })

  testFramework.test('Minuten 20-24 (zwanzig nach)', () => {
    const activeWords = getActiveWords(10, 22)
    testFramework.assert(activeWords.includes('zwanzig'), '20-24 Minuten sollte "zwanzig" enthalten')
    testFramework.assert(activeWords.includes('nach'), '20-24 Minuten sollte "nach" enthalten')
  })

  testFramework.test('Minuten 30-34 (halb)', () => {
    const activeWords = getActiveWords(10, 32)
    testFramework.assert(activeWords.includes('halb'), '30-34 Minuten sollte "halb" enthalten')
    testFramework.assert(!activeWords.includes('nach'), '30-34 Minuten sollte nicht "nach" enthalten')
    testFramework.assert(!activeWords.includes('vor'), '30-34 Minuten sollte nicht "vor" enthalten')
  })

  testFramework.test('Minuten 45-49 (viertel vor)', () => {
    const activeWords = getActiveWords(10, 47)
    testFramework.assert(activeWords.includes('viertel'), '45-49 Minuten sollte "viertel" enthalten')
    testFramework.assert(activeWords.includes('vor'), '45-49 Minuten sollte "vor" enthalten')
  })

  testFramework.test('Minuten 55-59 (fünf vor)', () => {
    const activeWords = getActiveWords(10, 57)
    testFramework.assert(activeWords.includes('fuenf1'), '55-59 Minuten sollte "fuenf1" enthalten')
    testFramework.assert(activeWords.includes('vor'), '55-59 Minuten sollte "vor" enthalten')
  })

  // Vollständige Zeit-Tests
  testFramework.test('14:00 - ES IST ZWEI UHR', () => {
    const activeWords = getActiveWords(14, 0)
    const expected = ['es', 'ist', 'zwei', 'uhr']
    expected.forEach(word => {
      testFramework.assert(activeWords.includes(word), `14:00 sollte "${word}" enthalten`)
    })
  })

  testFramework.test('14:15 - ES IST VIERTEL NACH ZWEI', () => {
    const activeWords = getActiveWords(14, 15)
    const expected = ['es', 'ist', 'viertel', 'nach', 'zwei']
    expected.forEach(word => {
      testFramework.assert(activeWords.includes(word), `14:15 sollte "${word}" enthalten`)
    })
  })

  testFramework.test('14:30 - ES IST HALB DREI', () => {
    const activeWords = getActiveWords(14, 30)
    const expected = ['es', 'ist', 'halb', 'drei']
    expected.forEach(word => {
      testFramework.assert(activeWords.includes(word), `14:30 sollte "${word}" enthalten`)
    })
  })

  testFramework.test('14:45 - ES IST VIERTEL VOR DREI', () => {
    const activeWords = getActiveWords(14, 45)
    const expected = ['es', 'ist', 'viertel', 'vor', 'drei']
    expected.forEach(word => {
      testFramework.assert(activeWords.includes(word), `14:45 sollte "${word}" enthalten`)
    })
  })

  testFramework.test('22:20 - ES IST ZWANZIG NACH ZEHN', () => {
    const activeWords = getActiveWords(22, 20)
    const expected = ['es', 'ist', 'zwanzig', 'nach', 'zehn2']
    expected.forEach(word => {
      testFramework.assert(activeWords.includes(word), `22:20 sollte "${word}" enthalten`)
    })
  })

  testFramework.test('23:55 - ES IST FÜNF VOR ZWÖLF', () => {
    const activeWords = getActiveWords(23, 55)
    const expected = ['es', 'ist', 'fuenf1', 'vor', 'zwoelf']
    expected.forEach(word => {
      testFramework.assert(activeWords.includes(word), `23:55 sollte "${word}" enthalten`)
    })
  })

  // Führe Tests aus
  testFramework.runTests()

  // Live Preview
  updateLivePreview()
}

// Live Preview Funktion
function updateLivePreview(): void {
  const testTimes = [
    { time: '14:00', hours: 14, minutes: 0, expected: 'ES IST ZWEI UHR' },
    { time: '14:15', hours: 14, minutes: 15, expected: 'ES IST VIERTEL NACH ZWEI' },
    { time: '14:30', hours: 14, minutes: 30, expected: 'ES IST HALB DREI' },
    { time: '22:20', hours: 22, minutes: 20, expected: 'ES IST ZWANZIG NACH ZEHN' }
  ]

  let currentTest = 0
  
  function showNextTest(): void {
    const test = testTimes[currentTest]
    document.getElementById('test-time')!.textContent = test.time
    document.getElementById('display-text')!.textContent = test.expected
    
    // Simuliere die Anzeige
    const clockPreview = document.getElementById('clock-preview')!
    clockPreview.innerHTML = ''
    
    const activeWords = getActiveWords(test.hours, test.minutes)
    const allWords = ['ES', 'IST', 'ZEHN', 'FÜNF', 'VIERTEL', 'MINUTEN', 'VOR', 'NACH', 'HALB', 
                     'EINS', 'SIEBEN', 'ZWEI', 'DREI', 'VIER', 'ACHT', 'FÜNF', 'ZWÖLF', 
                     'ZEHN', 'ELF', 'NEUN', 'SECHS', 'ZWANZIG', 'UHR']
    
    allWords.forEach(word => {
      const wordElement = document.createElement('span')
      wordElement.className = 'word'
      wordElement.textContent = word
      
      // Vereinfachte Zuordnung für Preview
      const wordId = word.toLowerCase().replace('ä', 'ae').replace('ö', 'oe')
      if (activeWords.includes(wordId)) {
        wordElement.classList.add('active')
      }
      
      clockPreview.appendChild(wordElement)
    })
    
    currentTest = (currentTest + 1) % testTimes.length
  }
  
  showNextTest()
  setInterval(showNextTest, 3000) // Wechsle alle 3 Sekunden
}

// Starte Tests wenn Seite geladen ist
document.addEventListener('DOMContentLoaded', runWortuhrTests)
