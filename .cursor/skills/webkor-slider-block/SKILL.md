---
name: webkor-slider-block
description: >-
  Rozwój wtyczki WordPress z blokiem Gutenberg webkor/slider (Swiper): atrybuty,
  edit/save, caption-style, SCSS, build, i18n. Użyj przy zmianach w slider/src
  lub gdy użytkownik prosi o funkcje slidera, podpisy, responsywność, efekty.
---

# Webkor Slider — skill dla agenta

## Zakres

Wtyczka w katalogu **`slider/`**. Źródła bloku: **`slider/src/slider/`**. WordPress ładuje **`slider/build/`** (generowane przez `npm run build`).

## Workflow przy zmianie funkcji

1. **Zbierz wymagania:** edytor vs frontend muszą być spójne (podgląd ≈ zapis).
2. **`block.json`:** nowe/zmienione `attributes`, ewentualnie `version`.
3. **`edit.js`:** `InspectorControls`, stan, podgląd; nie duplikuj logiki stylów podpisów — użyj `caption-style.js`.
4. **`save.js`:** ten sam markup/styl co na froncie; `data-swiper-config` tylko dla opcji Swiper.
5. **`view.js`:** wyłącznie inicjalizacja Swiper (bez UI).
6. **SCSS:** layout, importy Swiper, **fallbacki** dla starych postów (np. podpis bez pełnych inline). Szczegółowe kolory/typografia podpisów — preferuj inline z atrybutów.
7. **Build:** `cd slider && CI=true npm run build` (webpack bywa wolny bez `CI=true`).
8. **Wersjonowanie:** przy większej zmianie zsynchronizuj wersję w `block.json`, `slider.php`, `package.json`.

## Pliki kluczowe

| Plik | Odpowiedzialność |
|------|------------------|
| `caption-style.js` | `getCaptionInlineStyle`, `getCaptionPositionStyle`, `CAPTION_POSITION_DEFAULT` |
| `edit.js` | UI slajdów, ukrywanie kontrolek gdy brak treści (np. pozycja podpisu przy pustym `content`) |
| `save.js` | HTML + style inline na `<p class="slider-slide-caption">` |
| `style.scss` / `editor.scss` | Kontener slajdu, obrazek `object-fit`, z-index podpisu |

## Slajd (kształt danych)

Pola m.in.: `id`, `content`, `imageId`, `imageUrl`, `imageAlt`, `captionPosition`. Nowy slajd w `handleAddSlide` musi ustawiać domyślne pola (np. `captionPosition`).

## Checklist przed oddaniem

- [ ] Brak błędów lint (`npm run lint:js`, `npm run lint:css` w `slider/`).
- [ ] `npm run build` przechodzi.
- [ ] Podpis: zmiana w globalnych ustawieniach widać w edytorze i po zapisie strony.
- [ ] Pozycja podpisu per slajd działa w podglądzie i na froncie.

## Odniesienia w repo

- `AGENTS.md` — mapa projektu i komendy.
- `.cursor/rules/slider-gutenberg-block.mdc` — skrót konwencji przy otwartych plikach `slider/src/slider/`.
