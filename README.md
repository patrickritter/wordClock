# 🕐 Wortuhr (Word Clock)

Eine elegante, responsive Wortuhr, die die Zeit in deutscher Sprache anzeigt. Perfekt für Desktop, Tablet und mobile Geräte.

![Wortuhr Preview](https://img.shields.io/badge/Status-Funktional-brightgreen) ![Responsive](https://img.shields.io/badge/Responsive-✓-blue) ![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-yellow)

## ✨ Features

- 🕐 **Deutsche Zeitanzeige** - Zeigt die Zeit in natürlicher deutscher Sprache
- 📱 **Vollständig responsive** - Optimiert für alle Bildschirmgrößen
- ⚡ **Modern Stack** - Vite, TypeScript, Vitest
- 🎨 **Modernes Design** - Elegante, minimalistische Benutzeroberfläche
- 🔄 **Live-Update** - Aktualisiert sich automatisch jede Minute
- 🌙 **Dunkles Theme** - Schonend für die Augen
- 🧪 **Umfassende Tests** - Unit Tests mit Vitest
- 🚀 **CI/CD Pipeline** - Automatische Tests und Deployment
- 📦 **TypeScript** - Typsicherheit und bessere IDE-Unterstützung

## 🚀 Live Demo

### Development Server (Empfohlen)
```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev
```
Öffne `http://localhost:3000` in deinem Browser.

### Alternative Methoden
```bash
# Mit Python
python -m http.server 8000

# Mit Node.js (falls npx installiert ist)
npx serve .

# Mit PHP
php -S localhost:8000
```

## 🧪 Tests

Das Projekt enthält umfassende Tests für alle Funktionen:

### Tests ausführen
```bash
# Unit Tests (Vitest)
npm run test:run

# Tests mit UI
npm run test:ui

# Tests im Watch-Modus
npm run test

# Browser-basierte Tests
npm run dev
# dann http://localhost:3000/test.html
```

### Test-Abdeckung
- ✅ **Stunden-Zuordnung** - Alle 12 Stunden werden korrekt zugeordnet
- ✅ **Minuten-Logik** - Alle Minuten-Bereiche (genau, nach, vor, halb)
- ✅ **Vollständige Zeiten** - Komplexe Zeitkombinationen
- ✅ **Edge Cases** - Mitternacht, 24h-Format, etc.
- ✅ **Live Preview** - Visuelle Darstellung der Tests

### Test-Ergebnisse
Die Tests prüfen 15+ verschiedene Szenarien und zeigen eine Live-Vorschau der Wortuhr-Anzeige.

## 📁 Projektstruktur

```
wordClock/
├── src/
│   ├── main.ts              # TypeScript Haupt-Logik
│   ├── styles.css           # Responsive CSS-Styles
│   └── test/
│       ├── setup.ts         # Test-Setup
│       ├── wordclock.test.ts # Vitest Unit Tests
│       └── test-framework.ts # Browser Test-Framework
├── index.html               # HTML-Struktur der Wortuhr
├── test.html               # Test-Interface
├── vite.config.ts          # Vite-Konfiguration
├── tsconfig.json           # TypeScript-Konfiguration
├── package.json            # Dependencies & Scripts
├── .github/workflows/      # GitHub Actions CI/CD
└── README.md               # Diese Datei
```

## 🛠️ Installation

1. **Repository klonen oder herunterladen**
   ```bash
   git clone [repository-url]
   cd wordClock
   ```

2. **Dependencies installieren**
   ```bash
   npm install
   ```

3. **Development Server starten**
   ```bash
   npm run dev
   ```

4. **Fertig!** 🎉

## 🎯 Verwendung

Die Wortuhr funktioniert vollautomatisch:

- **Zeit wird automatisch erkannt** - Basierend auf der Systemzeit
- **Live-Updates** - Aktualisiert sich jede Minute
- **Responsive Design** - Passt sich automatisch der Bildschirmgröße an

## 🛠️ Development

### Verfügbare Scripts
```bash
# Development Server starten
npm run dev

# Projekt bauen
npm run build

# Preview des Builds
npm run preview

# Tests ausführen
npm run test

# Tests einmal ausführen
npm run test:run

# Tests mit UI
npm run test:ui

# Linting
npm run lint

# Type Checking
npm run type-check
```

### Beispiel-Zeitanzeigen

| Zeit | Anzeige |
|------|---------|
| 14:00 | ES IST ZWEI UHR |
| 14:15 | ES IST VIERTEL NACH ZWEI |
| 14:30 | ES IST HALB DREI |
| 14:45 | ES IST VIERTEL VOR DREI |
| 22:20 | ES IST ZWANZIG NACH ZEHN |

## 📱 Responsive Breakpoints

| Gerätetyp | Bildschirmbreite | Spalten | Schriftgröße |
|-----------|------------------|---------|--------------|
| Mobile | bis 480px | 2 | 0.8rem |
| Kleine Tablets | 481-768px | 4 | 1rem |
| Große Tablets | 769-1024px | 6 | 1.2rem |
| Desktop | 1025px+ | 10 | 1.5rem |
| Große Bildschirme | 1400px+ | 10 | 1.8rem |

## 🔧 Anpassungen

### Zeit testen
Um eine bestimmte Zeit zu testen, kommentiere in `script.js` die Test-Funktion aus:

```javascript
// Test 22:20 (uncomment to test)
testTime(22, 20);
```

### Design anpassen
Die Farben und Styles können in `styles.css` angepasst werden:

```css
.word {
  background-color: #444;  /* Hintergrundfarbe der Wörter */
  color: #fff;             /* Textfarbe */
  opacity: 0.2;            /* Inaktive Wörter */
}

.word.active {
  opacity: 1;              /* Aktive Wörter */
}
```

## 🐛 Bekannte Probleme

- Keine bekannten Probleme! 🎉

## 🤝 Beitragen

Verbesserungsvorschläge und Bug-Reports sind willkommen! 

### Mögliche Erweiterungen:
- [ ] Mehrsprachige Unterstützung
- [ ] Verschiedene Themes
- [ ] Animationen
- [ ] Sound-Effekte
- [ ] Einstellungsmenü

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe `LICENSE` Datei für Details.

## 👨‍💻 Autor

Erstellt mit ❤️ für eine bessere Zeitanzeige.

---

**Tipp:** Die Wortuhr eignet sich perfekt als Desktop-Widget oder für digitale Displays! 🖥️
