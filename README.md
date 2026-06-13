# Калькулятор смет PRO

PWA-приложение для мастеров: расчёт смет на объекте, сохранение, отправка клиенту.
Работает офлайн. Не требует App Store.

## Возможности

- 25+ профилей профессий из коробки (электрик, сантехник, отделочник и др.)
- 5 готовых шаблонов смет (санузел, кухня, электрика в однушке, покраска, ламинат)
- Фото объекта + подпись клиента пальцем (PRO)
- Хранение фото в IndexedDB (5000+ смет, до 30 ГБ)
- PDF-экспорт через jsPDF + HTML-фолбэк
- Шаринг в Telegram/WhatsApp
- CRM: клиенты, воронка, напоминания
- Тёмная тема
- Поиск по работам
- Планировщик напоминаний о визитах

## Версии

- **v1.4.0** — Capacitor-обёртка для Android, Telegram-бот, 5 шаблонов смет
- v1.3.0 — IndexedDB для фото, подпись пальцем, PRO-ключи, тёмная тема
- v1.2.0 — PRO-монетизация (лимит 3 сметы, Pro 490 ₽/год)
- v1.1.0 — PWA: manifest, service worker, офлайн-кеш

## Запуск (PWA)

Откройте `index.html` в браузере — приложение готово к работе.

## Установка как PWA

- **iPhone/iPad:** Safari → Поделиться → На экран Домой
- **Android:** Chrome → меню → Добавить на главный экран

## Android-приложение (APK)

См. `apk-builder/BUILD.md` для сборки APK/AAB.

Готовый APK: соберите `./gradlew assembleDebug` в `apk-builder/android/`.
Будет в `apk-builder/android/app/build/outputs/apk/debug/app-debug.apk`.

## Telegram-бот для продажи PRO

См. `bot/README.md`. Бот выдаёт PRO-ключи, поддерживает ручную и автоматическую (ЮKassa) оплату.

## Деплой PWA на свой домен

### Вариант 1: Cloudflare Pages (рекомендую, бесплатно)
1. Залейте содержимое `Универсальный калькулятор/` в Git-репо
2. Cloudflare → Pages → Connect to Git → выберите репо
3. Build command: пусто, Output directory: `/`
4. Готово: получите URL вида `smetapro.pages.dev`
5. Custom domain: Pages → Custom domain → добавьте свой

### Вариант 2: Netlify Drop (без регистрации)
1. Откройте https://app.netlify.com/drop
2. Перетащите папку `Универсальный калькулятор/`
3. Получите URL

### Вариант 3: GitHub Pages
1. Создайте репо, залейте файлы
2. Settings → Pages → Source: main branch / root
3. Готово: `username.github.io/repo-name/`

## Структура

```
Универсальный калькулятор/
├── calculator-universal.html   # основное приложение (1 HTML = всё)
├── manifest.webmanifest        # PWA-манифест
├── sw.js                       # Service Worker
├── privacy.html                # Privacy Policy
├── version.json                # манифест обновлений
├── icon-{16,32,48,64,96,128,152,192,256,384,512}.png
├── icon-192-maskable.png
├── icon-512-maskable.png
├── apple-touch-icon.png
├── favicon.ico
├── !Инструкция.md              # инструкция для мастера
├── pro_keys.py                 # утилита генерации PRO-ключей
├── build_icons.py              # утилита генерации иконок
└── README.md                   # этот файл
```

## Технологии

- Vanilla JS (без фреймворков, без сборки)
- localStorage для метаданных смет
- IndexedDB для фото и подписей (Blob)
- Web Crypto API (HMAC-SHA256) для PRO-ключей
- Web Share API + Telegram fallback
- Service Worker + Cache API (PWA-режим)
- Capacitor 6 (для Android-обёртки)

## Лицензия

MIT. Делайте что хотите, но баги — ваши.
