# AGENTS.md — repozytorium WordPress (Webkor Slider)

Ten plik jest punktem startowym dla agentów AI (Cursor i podobnych) pracujących nad tym repo.

## Co to za projekt

- **Środowisko:** WordPress lokalnie przez `@wordpress/env` (plik `.wp-env.json` w katalogu głównym).
- **Wtyczka z blokiem:** katalog `slider/` — blok Gutenberg `webkor/slider` (Swiper.js, `@wordpress/scripts`).
- **Źródła bloku:** `slider/src/slider/` → zbudowane artefakty w `slider/build/`. WordPress ładuje metadane z `slider/build/blocks-manifest.php`.

## Konwencje dla agenta

- Odpowiadaj użytkownikowi **po polsku**, jeśli pisze po polsku.
- Po zmianach w `slider/src/**` (JS, SCSS, `block.json`) **uruchom build** w `slider/`: `CI=true npm run build` (szybsza kompilacja webpack) lub `npm run build`.
- Nie edytuj ręcznie minifikowanych plików w `slider/build/` poza sytuacjami awaryjnymi — źródłem prawdy jest `src/`.
- Zachowaj spójność **edytor ↔ frontend:** wspólne style podpisów w `caption-style.js` (`getCaptionInlineStyle`, `getCaptionPositionStyle`); `edit.js` i `save.js` powinny ustalać ten sam wygląd tam, gdzie to możliwe.

## Szybka mapa plików (blok)

| Plik | Rola |
|------|------|
| `slider/src/slider/block.json` | Atrybuty, wersja bloku, assety |
| `slider/src/slider/edit.js` | UI edytora, podgląd Swiper, `InspectorControls` |
| `slider/src/slider/save.js` | Statyczny HTML + `data-swiper-config` |
| `slider/src/slider/view.js` | Inicjalizacja Swiper na froncie |
| `slider/src/slider/caption-style.js` | Style inline podpisów (typografia + pozycja) |
| `slider/src/slider/style.scss` / `editor.scss` | Layout, Swiper CSS, fallbacki dla starych zapisów |
| `slider/slider.php` | Rejestracja bloków z `build/` |

## Model danych slajdu (skrót)

Obiekty w atrybucie `slides` zawierają m.in.: `id`, `content` (podpis), `imageId`, `imageUrl`, `imageAlt`, `captionPosition` (9 pozycji + domyślnie `bottom-center`). Ustawienia typografii podpisu są **na poziomie bloku**, nie per slajd.

## Skill projektowy

Szczegółowy workflow i checklisty: **skill** `webkor-slider-block` w `.cursor/skills/webkor-slider-block/SKILL.md` (użyj go przy rozbudowie bloku, nowych atrybutach, i18n, buildzie).

## Przydatne komendy

```bash
cd slider && npm install
cd slider && npm run start    # watch
cd slider && CI=true npm run build
```

Root: `npx wp-env start` (plugin `./slider` już w `.wp-env.json`).
