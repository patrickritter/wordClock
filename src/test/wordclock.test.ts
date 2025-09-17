import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest'
import { calculateDisplayHours, updateMinutes, updateHours } from '../main'

// Mock DOM
const mockElements: { [key: string]: { classList: { add: Mock; remove: Mock } } } = {}

// Mock document.getElementById
global.document = {
  getElementById: vi.fn((id: string) => {
    if (!mockElements[id]) {
      mockElements[id] = {
        classList: {
          add: vi.fn(),
          remove: vi.fn()
        }
      }
    }
    return mockElements[id]
  }),
  querySelectorAll: vi.fn(() => [] as unknown as NodeListOf<Element>)
} as unknown as Document

describe('Wortuhr Tests', () => {
  beforeEach(() => {
    // Reset mocks vor jedem Test
    Object.values(mockElements).forEach(element => {
      element.classList.add.mockClear()
      element.classList.remove.mockClear()
    })
  })

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

  describe('Minuten-Logik', () => {
    it('sollte "uhr" für 0-4 Minuten anzeigen', () => {
      updateMinutes(2)
      expect(mockElements.uhr?.classList.add).toHaveBeenCalled()
    })

    it('sollte "fünf nach" für 5-9 Minuten anzeigen', () => {
      updateMinutes(7)
      expect(mockElements.fuenf1?.classList.add).toHaveBeenCalled()
      expect(mockElements.nach?.classList.add).toHaveBeenCalled()
    })

    it('sollte "zehn nach" für 10-14 Minuten anzeigen', () => {
      updateMinutes(12)
      expect(mockElements.zehn1?.classList.add).toHaveBeenCalled()
      expect(mockElements.nach?.classList.add).toHaveBeenCalled()
    })

    it('sollte "viertel nach" für 15-19 Minuten anzeigen', () => {
      updateMinutes(17)
      expect(mockElements.viertel?.classList.add).toHaveBeenCalled()
      expect(mockElements.nach?.classList.add).toHaveBeenCalled()
    })

    it('sollte "zwanzig nach" für 20-24 Minuten anzeigen', () => {
      updateMinutes(22)
      expect(mockElements.zwanzig?.classList.add).toHaveBeenCalled()
      expect(mockElements.nach?.classList.add).toHaveBeenCalled()
    })

    it('sollte "halb" für 30-34 Minuten anzeigen', () => {
      updateMinutes(32)
      expect(mockElements.halb?.classList.add).toHaveBeenCalled()
    })

    it('sollte "viertel vor" für 45-49 Minuten anzeigen', () => {
      updateMinutes(47)
      expect(mockElements.viertel?.classList.add).toHaveBeenCalled()
      expect(mockElements.vor?.classList.add).toHaveBeenCalled()
    })

    it('sollte "fünf vor" für 55-59 Minuten anzeigen', () => {
      updateMinutes(57)
      expect(mockElements.fuenf1?.classList.add).toHaveBeenCalled()
      expect(mockElements.vor?.classList.add).toHaveBeenCalled()
    })
  })

  describe('Stunden-Anzeige', () => {
    it('sollte korrekte Wort-IDs für Stunden verwenden', () => {
      updateHours(1)
      expect(mockElements.eins?.classList.add).toHaveBeenCalled()

      updateHours(10)
      expect(mockElements.zehn2?.classList.add).toHaveBeenCalled()

      updateHours(12)
      expect(mockElements.zwoelf?.classList.add).toHaveBeenCalled()
    })
  })

  describe('Vollständige Zeit-Tests', () => {
    it('sollte 14:00 korrekt anzeigen', () => {
      // Mock querySelectorAll für updateClock
      global.document.querySelectorAll = vi.fn(() => [] as unknown as NodeListOf<Element>)
      
      // Test 14:00
      updateMinutes(0)
      updateHours(2)
      
      expect(mockElements.uhr?.classList.add).toHaveBeenCalled()
      expect(mockElements.zwei?.classList.add).toHaveBeenCalled()
    })

    it('sollte 14:15 korrekt anzeigen', () => {
      updateMinutes(15)
      updateHours(2)
      
      expect(mockElements.viertel?.classList.add).toHaveBeenCalled()
      expect(mockElements.nach?.classList.add).toHaveBeenCalled()
      expect(mockElements.zwei?.classList.add).toHaveBeenCalled()
    })

    it('sollte 14:30 korrekt anzeigen', () => {
      updateMinutes(30)
      updateHours(3) // 14:30 -> halb drei
      
      expect(mockElements.halb?.classList.add).toHaveBeenCalled()
      expect(mockElements.drei?.classList.add).toHaveBeenCalled()
    })

    it('sollte 22:20 korrekt anzeigen', () => {
      updateMinutes(20)
      updateHours(10) // 22:20 -> zwanzig nach zehn
      
      expect(mockElements.zwanzig?.classList.add).toHaveBeenCalled()
      expect(mockElements.nach?.classList.add).toHaveBeenCalled()
      expect(mockElements.zehn2?.classList.add).toHaveBeenCalled()
    })
  })
})
