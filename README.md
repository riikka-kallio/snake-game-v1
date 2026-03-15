# Snake Game (v1)

A classic **Snake** game built with **vanilla JavaScript, HTML, and CSS**. Control the snake with your arrow keys, eat apples to grow longer, and try to beat your **high score**, which is saved in **localStorage**.

Repository: `riikka-kallio/snake-game-v1`

## Features
- Grid-based snake movement (default grid: **30 × 30**)
- Arrow key controls (⬆️ ⬇️ ⬅️ ➡️)
- Random apple spawning
- Score tracking
- **High score persistence** using `localStorage` (`high-score`)
- Increasing difficulty: the snake speeds up after each apple
- Replay button to restart after game over

## How to Play
1. Open the game in the browser
2. Use your keyboard arrow keys to move the snake:
   - Right: `→`
   - Left: `←`
   - Up: `↑`
   - Down: `↓`
3. Eat apples to gain points and grow
4. Avoid:
   - Hitting the walls
   - Crashing into your own body

When you lose, you’ll see a “Game Over” alert—press **Replay** to start again.

## Running Locally

### Option A: Open the HTML file
You can open the main HTML file directly in the browser.

### Option B (recommended): Use a local server
Running via a local server is usually smoother and avoids browser restrictions.

Then open:
- `http://localhost:5500/`

Or using VS Code:
- Install **Live Server**
- Right click your HTML file → **Open with Live Server**

## Project Structure (typical)
Your repo may differ, but based on the HTML/JS provided:

- `index.html` (or similar) — game UI
- `snake_game.js` — game logic (movement, collisions, scoring, apple spawning)
- `styles/styles.css` — styling
- `scripts/index.js` — entry script loaded by HTML  
  > Note: your HTML loads `/scripts/index.js`. Make sure `index.js` imports/loads `snake_game.js`, or update the script tag to point directly to `snake_game.js`.

## Game Logic Notes
- Grid size is controlled by:
  - `width = 30`
  - The board contains `width * width` squares
- Snake state is tracked as an array of square indices:
  - `currentSnake = [2, 1, 0]`
- Speed increases by decreasing `intervalTime` after each apple:
  - `intervalTime = intervalTime - speed`
- High score is stored under:
  - `localStorage.getItem("high-score")`

## Customization Ideas
- Add mobile controls (on-screen buttons / swipe)
- Add pause/resume
- Add difficulty modes (different starting speeds)
- Add obstacles
- Add sound effects and animations
- Prevent the speed from becoming too fast (minimum interval time)

## License
Add a license if you want others to reuse it (MIT is a common choice).
