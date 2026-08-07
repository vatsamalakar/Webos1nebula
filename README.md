# NebulaOS X

NebulaOS X is a browser-based desktop environment. It runs entirely in the client as static HTML, CSS, and JavaScript 

Open it in a browser and you get a desktop with a top bar, app launcher list, draggable windows, and a bottom dock that tracks open apps.


## Quick start

### Option 1 - open the file

Open `index.html` directly in a modern browser.

### Option 2 — local server (recommended)

From the project root:

```bash
python3 -m http.server 5173
```

Then visit [http://localhost:5173](http://localhost:5173).


## What’s included

### Shell UI

| Piece | Behavior |
|--------|----------|
| **Top bar** | Shows the OS name and a live clock |
| **Desktop** | Text list of installed apps (left side) |
| **Windows** | Draggable, focusable, minimizable, maximizable, closable |
| **Dock** | Always shows **System** and **Settings**. A `\|` divider appears when other apps are open; those apps show as text buttons to the right |

### Applications

| App | What it does |
|-----|----------------|
| **Notes** | Scratch pad; content is saved to `localStorage` |
| **Terminal** | Command-line UI with built-in commands (see below) |
| **System** | Version / status / runtime info |
| **Files** | Virtual file explorer with sidebar list + editor pane |
| **Calculator** | Basic arithmetic calculator |
| **Tasks** | Lists open windows and simple usage metrics |
| **Settings** | Light/dark theme toggle and accent color swatches |
| **Quotes** | Quote of the day (date-seeded) plus random quotes and copy |
| **Jokes** | Local joke library with setup → reveal punchline flow |
| **Calendar** | Month grid with per-day notes stored in `localStorage` |


## Using the desktop

1. Launch apps from the **desktop list** on the left, or from the **dock** (System / Settings, plus any currently open apps).
2. Drag a window by its title bar.
3. Use the title-bar controls:
   - `×` close  
   - `–` minimize (app stays in the dock running section)  
   - `+` maximize / restore  
4. Click a dock button for an open app to bring it back into focus.

Pinned dock apps stay on the left. Everything else only appears after the divider while that app is open or minimized.


## Files app

Layout:

- **Left sidebar** : search, New File / New Folder, scrollable list  
- **Right pane** : selected item title, Delete, editor, Save  

Details:

- Folders and files are listed together (folders first, then A–Z)
- Selecting a **file** enables the editor and Save
- Selecting a **folder** shows a non-editable state; Delete still works
- Data persists in `localStorage` under `nebula_files`


## Terminal commands

| Command | Description |
|---------|-------------|
| `help` | List available commands |
| `about` | Short OS blurb |
| `apps` | List installed applications |
| `open <app>` | Open an app (`notes`, `terminal`, `explorer` / `files`, `system`, `calculator` / `calc`, `tasks`, `settings`, `quotes` / `quote`, `jokes` / `joke`, `calendar` / `cal`) |
| `ls` | Show sample listing text |
| `time` | Current time |
| `date` | Current date |
| `neofetch` | Styled system summary |
| `theme` | Toggle light / dark theme |
| `clear` | Clear terminal output |


## Settings & persistence

Preferences and app data are stored in the browser via `localStorage`:

| Key | Purpose |
|-----|---------|
| `nebula_settings` | Theme (`lightMode`) and accent color |
| `nebula_notes` | Notes app text |
| `nebula_files` | Virtual filesystem for the Files app |
| `nebulaos-calendar-notes` | Per-day calendar notes |




## Project structure

```text
Webos1nebula/
├── index.html          # Shell markup + all app windows
├── vercel.json         # Static deploy config
├── README.md
├── css/
│   ├── main.css        # Desktop, dock, app surfaces, theme
│   ├── windows.css     # Window chrome and layout
│   └── animations.css  # Minimal open/close motion
└── js/
    ├── system.js       # Clock + system helpers
    ├── windows.js      # Drag / focus / window geometry
    ├── apps.js         # App registry, open/close, desktop + dock
    ├── notes.js
    ├── terminal.js
    ├── fileexplorer.js
    ├── calculator.js
    ├── tasks.js
    ├── settings.js
    ├── quotes.js
    ├── jokes.js
    └── calendar.js
```


## Design notes

The UI is intentionally minimal:

- Flat surfaces and hairline borders (no glass / heavy shadows)
- Text-first desktop and dock (no emoji icons in the chrome)
- Primary action buttons use a dark fill with white label text for contrast
- Light and dark themes are toggled in Settings (or via `theme` in the Terminal)


## Extending

To add an app:

1. Add a `.window` block in `index.html` with a unique `id`
2. Register it in the `apps` object in `js/apps.js`
3. Add it to `trackedApps` in `js/tasks.js`
4. Optionally wire `open <name>` in `js/terminal.js`
5. Add a script file and include it at the bottom of `index.html`

Open/close automatically updates the dock’s running section for any non-pinned app.
