import { describe, it, expect, beforeEach } from 'vitest'
import { calculateDisplayHours, updateMinutes, updateHours } from '../main'

const hasDom = typeof document !== 'undefined'

const setupWordClockDom = (): void => {
  if (!hasDom) return

  document.body.innerHTML = `
    <div class="clock">
      <div class="row">
        <span class="word" id="es">ES</span>
        <span class="word" id="ist">IST</span>
        <span class="word" id="zehn1">ZEHN</span>
        <span class="word" id="fuenf1">FÜNF</span>
      </div>
      <div class="row">
        <span class="word" id="viertel">VIERTEL</span>
        <span class="word" id="minuten">MINUTEN</span>
      </div>
      <div class="row">
        <span class="word" id="vor">VOR</span>
        <span class="word" id="nach">NACH</span>
        <span class="word" id="halb">HALB</span>
      </div>
      <div class="row">
        <span class="word" id="eins">EINS</span>
        <span class="word" id="sieben">SIEBEN</span>
        <span class="word" id="zwei">ZWEI</span>
      </div>
      <div class="row">
        <span class="word" id="drei">DREI</span>
        <span class="word" id="vier">VIER</span>
      </div>
      <div class="row">
        <span class="word" id="acht">ACHT</span>
        <span class="word" id="fuenf2">FÜNF</span>
        <span class="word" id="zwoelf">ZWÖLF</span>
      </div>
      <div class="row">
        <span class="word" id="zehn2">ZEHN</span>
        <span class="word" id="elf">ELF</span>
      </div>
      <div class="row">
        <span class="word" id="neun">NEUN</span>
        <span class="word" id="sechs">SECHS</span>
        <span class="word" id="zwanzig">ZWANZIG</span>
      </div>
      <div class="row">
        <span class="word" id="uhr">UHR</span>
      </div>
    </div>
  `
}

const isActive = (id: string): boolean => {
  if (!hasDom) return false
  return document.getElementById(id)?.classList.contains('active') ?? false
}

describe('Stunden-Berechnung', () => {
  it('sollte korrekte Stunden für verschiedene Zeiten berechnen', () => {
    expect(calculateDisplayHours(1, 0)).toBe(1)
    expect(calculateDisplayHours(12, 0)).toBe(12)
    expect(calculateDisplayHours(22, 20)).toBe(10) // 22:20 -> 10 Uhr
    expect(calculateDisplayHours(0, 30)).toBe(1) // 00:30 -> 1 Uhr (halb eins)
    expect(calculateDisplayHours(23, 30)).toBe(12) // 23:30 -> 12 Uhr
  })

  it('sollte nächste Stunde bei Minuten >= 25 anzeigen', () => {
    expect(calculateDisplayHours(10, 25)).toBe(11)
    expect(calculateDisplayHours(10, 30)).toBe(11)
    expect(calculateDisplayHours(10, 35)).toBe(11)
  })
})

const describeDom = hasDom ? describe : describe.skip

describeDom('Wortuhr DOM-Interaktionen', () => {
  beforeEach(() => {
    setupWordClockDom()
  })

  describe('Minuten-Logik', () => {
    it('sollte "uhr" für 0-4 Minuten anzeigen', () => {
      updateMinutes(2)
      expect(isActive('uhr')).toBe(true)
      expect(isActive('nach')).toBe(false)
      expect(isActive('vor')).toBe(false)
    })

    it('sollte "fünf nach" für 5-9 Minuten anzeigen', () => {
      updateMinutes(7)
      expect(isActive('fuenf1')).toBe(true)
      expect(isActive('nach')).toBe(true)
    })

    it('sollte "zehn nach" für 10-14 Minuten anzeigen', () => {
      updateMinutes(12)
      expect(isActive('zehn1')).toBe(true)
      expect(isActive('nach')).toBe(true)
    })

    it('sollte "viertel nach" für 15-19 Minuten anzeigen', () => {
      updateMinutes(17)
      expect(isActive('viertel')).toBe(true)
      expect(isActive('nach')).toBe(true)
    })

    it('sollte "zwanzig nach" für 20-24 Minuten anzeigen', () => {
      updateMinutes(22)
      expect(isActive('zwanzig')).toBe(true)
      expect(isActive('nach')).toBe(true)
    })

    it('sollte "halb" für 30-34 Minuten anzeigen', () => {
      updateMinutes(32)
      expect(isActive('halb')).toBe(true)
    })

    it('sollte "viertel vor" für 45-49 Minuten anzeigen', () => {
      updateMinutes(47)
      expect(isActive('viertel')).toBe(true)
      expect(isActive('vor')).toBe(true)
    })

    it('sollte "fünf vor" für 55-59 Minuten anzeigen', () => {
      updateMinutes(57)
      expect(isActive('fuenf1')).toBe(true)
      expect(isActive('vor')).toBe(true)
    })
  })

  describe('Stunden-Anzeige', () => {
    it('sollte korrekte Wort-IDs für Stunden verwenden', () => {
      updateHours(1)
      expect(isActive('eins')).toBe(true)

      updateHours(10)
      expect(isActive('zehn2')).toBe(true)

      updateHours(12)
      expect(isActive('zwoelf')).toBe(true)
    })
  })

  describe('Vollständige Zeit-Tests', () => {
    it('sollte 14:00 korrekt anzeigen', () => {
      updateMinutes(0)
      updateHours(2)
      
      expect(isActive('uhr')).toBe(true)
      expect(isActive('zwei')).toBe(true)
    })

    it('sollte 14:15 korrekt anzeigen', () => {
      updateMinutes(15)
      updateHours(2)
      
      expect(isActive('viertel')).toBe(true)
      expect(isActive('nach')).toBe(true)
      expect(isActive('zwei')).toBe(true)
    })

    it('sollte 14:30 korrekt anzeigen', () => {
      updateMinutes(30)
      updateHours(3) // 14:30 -> halb drei
      
      expect(isActive('halb')).toBe(true)
      expect(isActive('drei')).toBe(true)
    })

    it('sollte 22:20 korrekt anzeigen', () => {
      updateMinutes(20)
      updateHours(10) // 22:20 -> zwanzig nach zehn
      
      expect(isActive('zwanzig')).toBe(true)
      expect(isActive('nach')).toBe(true)
      expect(isActive('zehn2')).toBe(true)
    })
  })
})
