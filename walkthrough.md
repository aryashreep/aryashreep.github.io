# Walkthrough - Terminal Prompt, Custom Blinking Block Cursor & SEO Integration

This walkthrough summarizes the recent layout, cursor behavior, text contrast, and SEO upgrades implemented for the portfolio website.

---

## 1. Terminal Shell & Cursor Customization

### Terminal Shell Markup
In [index.html](index.html):
- Renamed the header title to `bash - arya@platform`.
- Updated the shell input prompt line prefix to `arya@platform:~$`.
- Wrapped the input text fields in a `.shell-input-wrapper` container to manage typing, selection, and rendering offsets:
  ```html
  <div class="shell-input-wrapper">
    <span class="shell-visible-text-before"></span><span class="shell-cursor"></span><span class="shell-visible-text-after"></span>
    <input type="text" id="shell-input" class="shell-input" autocomplete="off" aria-label="Terminal Shell Input">
  </div>
  ```

### Styling the Blinking Block Caret
In [css/main.css](css/main.css):
- Styled the custom cursor as a filled block using the accent color.
- Configured a blinking keyframe animation (`shell-cursor-blink`) that swaps the foreground and background colors (inverting the text under the block cursor).
- Created a non-focused state (`:not(:focus-within)`) where the block becomes a static outline and stops blinking, mimicking standard terminal window focus states.
- Set the native browser `<input>` transparent, absolute, and hidden its default caret (`caret-color: transparent`) so typing interactions visually happen through our custom text and cursor elements.

### Syncing Cursor Positions
In [js/app.js](js/app.js):
- Created `updateCustomCursor` to split input values around the caret (`selectionStart`) to render text before, under, and after the cursor block.
- Registered listeners (`input`, `keydown`, `keyup`, `click`, `focus`, `blur`) to sync offsets instantly as users type or use arrow keys.
- Renamed history print strings and USER properties to `arya@platform`.

---

## 2. Text Color & Contrast Optimizations
In [css/main.css](css/main.css):
- Updated `--color-text-primary` in `:root` to `#FFFFFF` (pure white).
- Updated `--color-text-secondary` in `:root` to `#FFFFFF` (pure white).
- Modified `.shell-output p` to use `var(--color-text-primary)` instead of secondary.
- This ensures all description paragraphs, stats panels, logs, and footer notes are rendered in high-contrast bright white.

---

## 3. LinkedIn Link Mapping
In [index.html](index.html) and [css/main.css](css/main.css):
- Wrapped all article items in the **Latest Writing** section in a block link (`.writing-item-wrapper`) redirecting to the operator's LinkedIn activity feed in a new tab:
  `https://www.linkedin.com/in/aryashreepritikrishna/recent-activity/all/`
- Converted internal interactive `<a href="#" class="writing-action-link">` tags to `<div>` elements to preserve styling and guarantee markup validity (anchors cannot contain other anchors).

---

## 4. Search Engine Optimization (SEO)
In [index.html](index.html):
- Refined the title tag to: `Aryashree Pritikrishna | Principal Cloud & Platform Architect Portfolio`.
- Added Google robot crawl indexation commands: `<meta name="robots" content="index, follow">`.
- Implemented **Open Graph** (`og:*`) and **Twitter Card** (`twitter:*`) tags for rich previews when shared on LinkedIn, GitHub, etc.
- Added a structured **JSON-LD Schema** configuration (`Person` schema) to map the operator's profile metadata, social links, and tech skills to search engine indexing algorithms.
- Replaced the Go tech tag with **Python** in the tag listing and neofetch, and explicitly mapped databases to **MySQL // MongoDB** in tags, skills, and schema structures.
