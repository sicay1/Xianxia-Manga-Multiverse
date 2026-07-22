**URL:** https://manga-multiverse.netlify.app/  

---

## 1. Framework & Technologies Used

### Frontend Framework
- **Tailwind CSS** (via CDN): `https://cdn.tailwindcss.com`
- **Font Awesome 6.4.2** (via CDN): Font icons

### Core Technologies
- **Pure Vanilla JavaScript** - No frontend framework
- **HTML5** - Standard markup
- **CSS3** - Custom animations and styling

### Local Storage
```javascript
const SAVE_KEY = 'mangaMultiverseSaveData';
localStorage.setItem(SAVE_KEY, JSON.stringify(gameData));
```

### Architecture
- **Single Page Application (SPA)**
- **Component-based structure** using JavaScript functions
- **No build tools required** - runs directly in browser
- **Static hosting** on Netlify

---

## 2. Commands to Clone
```bash
# Create project structure
mkdir manga-multiverse-clone
cd manga-multiverse-clone
mkdir data

# Download files
curl -o index.html https://manga-multiverse.netlify.app/
curl -o data/characters.js https://manga-multiverse.netlify.app/data/characters.js
curl -o data/equips.js https://manga-multiverse.netlify.app/data/equips.js
curl -o data/enemies.js https://manga-multiverse.netlify.app/data/enemies.js
curl -o data/dungeons.js https://manga-multiverse.netlify.app/data/dungeons.js
curl -o data/tower.js https://manga-multiverse.netlify.app/data/tower.js

# Open in browser
open index.html
```

## 3. What You Can Learn From This Game

#### JavaScript Concepts
- ✅ Object-oriented data structures
- ✅ LocalStorage API
- ✅ File reading/writing (JSON)
- ✅ Array manipulation
- ✅ Object destructuring
- ✅ Event handling
- ✅ DOM manipulation
- ✅ Modal management
- ✅ State management patterns

#### Game Development Concepts
- ✅ Turn-based combat systems
- ✅ Character stat calculations
- ✅ Damage formulas
- ✅ Gacha/loot systems
- ✅ Progress tracking
- ✅ Save/load systems
- ✅ Collection mechanics

#### CSS/UI Concepts
- ✅ Tailwind CSS utility classes
- ✅ CSS animations
- ✅ Responsive design
- ✅ Modal overlays
- ✅ Card-based layouts
- ✅ Toast notifications

#### Software Engineering
- ✅ Code organization
- ✅ Data-driven design
- ✅ Separation of concerns
- ✅ Configuration files
- ✅ No-backend architecture


## 4. Technical Advantages

### Why This Architecture Works

#### Pros
✅ **Zero hosting costs** (static files)  
✅ **No server maintenance**  
✅ **Instant loading** (no API calls)  
✅ **Offline capable** (after first load)  
✅ **Easy to modify** (no build process)  
✅ **Cross-platform** (runs anywhere)  
✅ **Privacy-friendly** (no data collection)  
✅ **Simple deployment** (drag & drop)

#### Cons
❌ Can't prevent cheating (client-side only)  
❌ No cloud sync without backend  
❌ Save files can be lost (browser cache clear)  
❌ Limited to single player  
❌ No real-time updates  
❌ Large HTML file (maintenance)

## 5. Resources

- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **LocalStorage API**: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- **File API**: https://developer.mozilla.org/en-US/docs/Web/API/File_API