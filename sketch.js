// Rudimentary Magits - Typographic Drawing Tool
// BPM Configuration
const BPM = 120;
const beatInterval = 60000 / BPM; // milliseconds per beat

// Words array - exactly as specified
const words = [
  // symbols — heavily weighted
  "†", "†", "†", "†", "✝", "✝", "✝", "+", "+", "+",
  "×", "×", "*", "*", "✦", "†", "✝", "+",

  // proper nouns + wordplay proper nouns
  "Lovecraft", "Cthulhu", "Nyarlathotep", "Shoggoth", "Arkham",
  "Providence", "Poe", "John Lydon", "Joe Strummer", "James Dean",
  "Pope Joan", "Abdul Alhazred", "Rudimentary Peni", "Magits",
  "Vatican't City", "Youthanasia", "Psychristiatric", "Christisatanic",
  "Radio Schizo", "Pogo Pope", "Regicide Chaz III", "Zenophobia",
  "Necronomicon", "Vampire State Building", "Arkham Hearse",
  "B-Ward", "Death Church", "Cosmic Hearse", "Alice",
  "Happy Farm", "Doodlebug", "Sonia", "Dunsany", "Memento Mori",

  // single words — highest frequency, weighted by repetition
  "death", "death", "death", "dead", "dead", "god", "god",
  "pain", "pain", "lies", "lies", "pope", "pope", "hearse", "hearse",
  "disconnect", "disconnect", "fragment", "conform",
  "empty", "void", "void", "decay", "despair", "dismay",
  "suffer", "suffer", "crime", "guilt", "lost", "tortured",
  "murdered", "fail", "die", "bleed", "mortality", "starving",
  "crosses", "bullshit", "sick", "perverted", "fleas", "blood",
  "poppies", "genocide", "opium", "meat", "apathy", "misery",
  "hatred", "hell", "grotesque", "crumbling", "blasphemy", "hate",
  "power", "insensitivity", "overdosed", "stifled", "tradition",
  "suckers", "crematorium", "acceptance", "tenacity", "wheelchair",
  "straitjacket", "punkoid", "devoid", "schizoid", "censored",
  "castrate", "isolate", "frustrate", "smeared", "weeds",
  "overqualified", "authority", "destroy", "factory", "distress",
  "nightmare", "fear", "grief", "tears", "silence", "stone",
  "ghost", "flame", "insanity", "dissolution", "oblivion",
  "atrophy", "repression", "rejection", "oppression", "exclusion",
  "fascistic", "apartheid", "clandestine", "sacrifice", "plague",
  "zombie", "madness", "sorrow", "anguish", "separation",
  "extinction", "disdain", "distortion", "inheritance", "tragedy",
  "womb", "scorn", "ruthless", "futility", "regret",
  "corruption", "slavery", "abbatoir", "carnivore", "tombstone",
  "severed", "jugular", "lung", "cancer", "coffin", "burial",
  "dust", "grave", "corpse", "skeleton", "flesh", "crucify",
  "revolution", "army", "insane", "mohawk", "bigotry",
  "nightgaunt", "sarcophagus", "bile", "periwig", "zenophobia",
  "eldritch", "squamous", "rugose", "amorphous", "gibbering",
  "somnambulistic", "tintinnabulation", "tympanum", "tinnitus",
  "lovecraftian", "shoggoth", "mythos",

  // short phrases — medium frequency
  "full of death", "full of lies", "so empty",
  "fragment reality", "I will not conform",
  "X-ray eyes", "don't defy authority",
  "we stop at destruction", "my body is a mess",
  "hiding from reality", "Blitzkrieg Zugzwang",
  "Avante Garde", "rebuild in the factory",
  "conception is a crime", "all will die",
  "the rest are dead", "crematorium flame",
  "you hate me", "i curse you",
  "rehearsal for mortality", "overdosed on insensitivity",
  "blissful myth", "smeared with lies",
  "psycho squat", "never gave a fuck",
  "poppy monopoly", "opium of the people",
  "cosmic hearse", "dead zen men",
  "black cloud smothers my brain", "eating into me",
  "personal hell", "tortured shell",
  "safety pin wounds", "warfare state",
  "thriving on hate", "death love god squad",
  "babies of christ", "burial mound",
  "never forget", "never ever forgive",
  "wash your mouth out with pope",
  "our troops are flowers choked by weeds",
  "farewell tomorrow", "ever was it so",
  "no other truth but power alone",
  "as nothing", "a true reflection",
  "i am alone and so are you",
  "flame of insanity", "ocean of misery",
  "only death", "no god no love no joy",
  "set against death", "fear of extinction",
  "i write no more but i still dream",
  "too much thinking doesn't pay",
  "come gentle death", "eyes of the dead",
  "in a handful of dust", "let us rest in oblivion",
  "being brave won't save you from the grave",
  "divine decay", "pure and infernal",
  "language of agony", "echo of anguish",
  "all my tears are but one drop",
  "void in human form", "from the void the womb is formed",
  "alice crucifies the paedophiles",
  "grind your bones to make their bombs",
  "smash cash smash trash",
  "drink their blood and eat their flesh",
  "hairy flesh impinges from all directions",
  "that is not dead which can eternal lie",
  "with strange aeons even death may die",
  "imprisoned with the pharaohs",
  "flesh consumers of the great house",
  "pills popes and potions",
  "the depixal dance of death",
  "all you need is death",
  "it was a crime before nick was born",
  "monday is a square box unfortunately locked",
  "communication crises converse with me",
  "we are overqualified to see right through the vacuum",

  // long phrases — lowest frequency, largest visual ruptures
  "three quarters of the world are starving",
  "vampire state building is crumbling",
  "the stelazine stomp modecate meander haloperidol hop",
  "that is not dead which can eternal lie and with strange aeons even death may die",
  "perhaps after all too much thinking doesn't pay",
  "hairy white mouse the rubber arch bish",
  "the oldest and strongest emotion of mankind is fear",
  "i am providence and providence is me",
  "we are the band playing in front of the funeral parlour",
  "things have learned to walk that ought to crawl",
  "to tread on a peni guitar is death",
  "call of cthulhu as i'm recording here in this studio"
];

// Global variables
let song;
let fontSize = 14;
let randomMode = false;
let chantMode = false;
let chantWord = "";
let chantCounter = 0;
let minDist = 15;
let speechEnabled = true;
let lastMouseX, lastMouseY;
let isMouseHeld = false;
let speechInterval;
let chantDroningInterval; // For repetitive chant droning
let lastStampedWord = "";
let lyricMode = true; // Primary mode: structured verse block mode
let verseBlocks = []; // Store verse block data
let nextBlockIndex = 0;
let onScreenWords = []; // Track words currently visible on screen
let audioContext; // Web Audio API context
let analyser; // Audio analyser for effects
let chaosWords = []; // Store chaos decoration words in verse mode
let showInitialOverlay = true; // Show explainer on first load

// Stamps buffer for word rendering
let stampsBuffer;

function preload() {
  song = loadSound('assets/audio/rudimagits.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 0);

  lastMouseX = mouseX;
  lastMouseY = mouseY;

  // Initialize graphics buffer for stamps
  stampsBuffer = createGraphics(width, height);
  stampsBuffer.background(0, 0, 0, 0); // Transparent background for stamps

  // Initialize verse blocks for lyric mode
  initializeVerseBlocks();

  // Set up speech synthesis
  if ('speechSynthesis' in window) {
    console.log('Speech synthesis available');
  } else {
    console.log('Speech synthesis not available');
    speechEnabled = false;
  }

  // Initialize Web Audio API for voice processing
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    console.log('Web Audio API available');
  } catch (e) {
    console.log('Web Audio API not available:', e);
  }
}

function draw() {
  // Clear main canvas
  background(0);

  // Draw persistent stamps buffer
  image(stampsBuffer, 0, 0);

  // Draw verse blocks if in lyric mode (directly to main canvas)
  drawVerseBlocks();

  // Draw chaos decoration around verse container (directly to main canvas)
  if (lyricMode) {
    drawChaosDecoration();
  }

  // HUD display (directly to main canvas)
  drawHUD();

  // Initial overlay
  if (showInitialOverlay) {
    drawInitialOverlay();
  }
}

function mouseMoved() {
  if (!isMouseHeld && song.isPlaying()) { // Require song to be playing
    let distance = dist(mouseX, mouseY, lastMouseX, lastMouseY);
    if (distance >= minDist) {

      // Only generate words from mouse movement in chaos mode
      // In lyric mode, words should only come from clicks, not mouse movement
      if (!lyricMode) {
        // In chaos mode, generate words anywhere
        stampWord();
        lastMouseX = mouseX;
        lastMouseY = mouseY;
      }
    }
  }
}

function mousePressed() {
  // Only generate words if song is playing and (if in lyric mode) inside verse box
  if (!song.isPlaying()) return;

  if (lyricMode && verseBlocks.length > 0) {
    let block = verseBlocks[0];
    let clickInsideVerseBox = (mouseX >= block.x && mouseX <= block.x + block.width &&
                               mouseY >= block.y && mouseY <= block.y + block.height);

    if (!clickInsideVerseBox) {
      // Click is outside verse box - don't generate words
      return;
    }
  }

  isMouseHeld = true;

  // Calculate time to next beat for quantization
  let currentTime = millis();
  let songTime = song.currentTime() * 1000; // convert to milliseconds
  let beatNumber = Math.floor(songTime / beatInterval);
  let nextBeatTime = (beatNumber + 1) * beatInterval;
  let timeToNextBeat = nextBeatTime - songTime;

  // Quantize stamp to next beat
  setTimeout(() => {
    stampWord();
    // Removed speakWord() - let scheduled voices handle speech
    isMouseHeld = false;
  }, timeToNextBeat);
}

function stampWord() {
  let word;

  // Always generate random words for visual stamping
  // Chant mode only affects the background voice, not the visual text
  word = random(words);
  lastStampedWord = word;

  // Track words for voice recitation in both modes
  onScreenWords.push(word);
  if (onScreenWords.length > 50) {
    onScreenWords.shift(); // Keep only recent words
  }

  if (lyricMode) {
    // In verse mode, only add to verse blocks - no chaos decoration outside
    addToVerseBlock(word);
  } else {
    // Pure chaos mode - original behavior
    drawChaosWord(word, mouseX, mouseY);
    // Reactive voice for chaos mode
    scheduleWordSpeech(word);
  }
}

function drawChaosWord(word, x, y) {
  // Draw to stamps buffer instead of main canvas
  stampsBuffer.push();

  // Color variation - inverted for white on black
  let brightness;
  if (random() < 0.8) {
    brightness = 255; // 80% chance full white
  } else {
    brightness = random(160, 220); // 20% chance light gray
  }

  let alpha = random(140, 255);

  // Font size calculation
  let currentFontSize = fontSize;
  if (randomMode) {
    currentFontSize = random(6, 60);
  } else if (word.length > 10) {
    currentFontSize *= random(1.0, 2.5);
  }

  // Drawing setup
  stampsBuffer.translate(x, y);
  stampsBuffer.rotate(random(-PI/4, PI/4));

  stampsBuffer.fill(brightness, brightness, brightness, alpha);
  stampsBuffer.stroke(brightness, brightness, brightness, alpha * 0.6);
  stampsBuffer.strokeWeight(0.3);
  stampsBuffer.textAlign(CENTER, CENTER);
  stampsBuffer.textSize(currentFontSize);

  stampsBuffer.text(word, 0, 0);
  stampsBuffer.pop();
}

// Add chaos decoration outside verse container
function addChaosDecoration(word, x, y) {
  if (!lyricMode || verseBlocks.length === 0) return;

  let block = verseBlocks[0];

  // Only add as decoration if position is outside the verse container
  if (x < block.x || x > block.x + block.width ||
      y < block.y || y > block.y + block.height) {

    chaosWords.push({
      word: word,
      x: x,
      y: y,
      rotation: random(-PI/4, PI/4),
      size: random(8, 16),
      alpha: random(100, 180),
      age: 0
    });

    // Limit chaos words to prevent memory issues
    if (chaosWords.length > 100) {
      chaosWords.shift();
    }
  }
}

// Draw chaos decoration around verse container
function drawChaosDecoration() {
  if (!lyricMode) return;

  push();

  // Draw each chaos decoration word
  for (let i = chaosWords.length - 1; i >= 0; i--) {
    let chaosWord = chaosWords[i];

    // Age the word (fade over time)
    chaosWord.age += 1;
    let fadeAlpha = map(chaosWord.age, 0, 300, chaosWord.alpha, 0);

    // Remove old words
    if (fadeAlpha <= 0) {
      chaosWords.splice(i, 1);
      continue;
    }

    // Draw the chaos word
    push();
    translate(chaosWord.x, chaosWord.y);
    rotate(chaosWord.rotation);

    fill(255, 255, 255, fadeAlpha);
    stroke(255, 255, 255, fadeAlpha * 0.6);
    strokeWeight(0.2);
    textAlign(CENTER, CENTER);
    textSize(chaosWord.size);

    text(chaosWord.word, 0, 0);
    pop();
  }

  pop();
}

function keyPressed() {
  switch(key.toLowerCase()) {
    case ' ':
      togglePlayback();
      break;
    case 'z':
      fontSize = max(6, fontSize - 2);
      randomMode = false;
      break;
    case 'x':
      fontSize = min(200, fontSize + 2);
      randomMode = false;
      break;
    case 'c':
      randomMode = !randomMode;
      break;
    case 'h':
      toggleChantMode();
      break;
    case 'v':
      speechEnabled = !speechEnabled;
      break;
    case 'l':
      toggleLyricMode();
      break;
    case 's':
      downloadCanvas();
      break;
  }

  // Handle bracket keys for minDist
  if (keyCode === 219) { // '['
    minDist = max(2, minDist - 5);
  } else if (keyCode === 221) { // ']'
    minDist = min(200, minDist + 5);
  }

  return false; // Prevent default behavior
}

function togglePlayback() {
  if (song.isPlaying()) {
    song.pause();
    // Stop chant droning when music stops
    stopChantDroning();
  } else {
    song.play(); // Single play, no loop
    startSpeechSchedule(); // Just logs that reactive voice is active
    // Hide initial overlay once user starts the experience
    showInitialOverlay = false;
    // Restart chant droning if in chant mode
    if (chantMode && chantWord) {
      startChantDroning();
    }

    // Add event listener to stop chanting when song ends
    song.onended(() => {
      stopChantDroning();
    });
  }
}

function toggleChantMode() {
  chantMode = !chantMode;
  if (chantMode && lastStampedWord) {
    chantWord = lastStampedWord;
    // No counter - chant will loop continuously until manually turned off

    // Start persistent droning voice for chant mode
    startChantDroning();
  } else {
    chantWord = "";

    // Stop droning voice
    stopChantDroning();
  }
}

function startChantDroning() {
  if (!speechEnabled || !chantWord) return;

  // Clear any existing droning interval
  if (chantDroningInterval) {
    clearInterval(chantDroningInterval);
  }

  // Start repetitive droning every 8 beats (more spaced for layering)
  chantDroningInterval = setInterval(() => {
    if (chantMode && chantWord) {
      speakChantWord();
    } else {
      stopChantDroning();
    }
  }, beatInterval * 4); // Every 4 beats for more frequent droning

  // Speak immediately when chant starts
  speakChantWord();
}

function stopChantDroning() {
  if (chantDroningInterval) {
    clearInterval(chantDroningInterval);
    chantDroningInterval = null;
  }
}

function speakChantWord() {
  if (!speechEnabled || !('speechSynthesis' in window) || !chantWord) return;

  let utterance = new SpeechSynthesisUtterance(chantWord);

  // Faster, quieter chant voice to allow layering with other speech
  utterance.rate = 0.8;      // Faster to finish quickly
  utterance.pitch = 0.3;     // Deep, resonant drone
  utterance.volume = 0.5;    // Quieter to not overpower other speech

  // Select natural voice
  if (speechSynthesis.getVoices().length > 0) {
    let voices = speechSynthesis.getVoices();
    let naturalVoice = voices.find(v =>
      v.name.includes('Natural') ||
      v.name.includes('Premium') ||
      v.name.includes('Enhanced') ||
      v.voiceURI.includes('premium')
    ) || voices[0];
    utterance.voice = naturalVoice;
  }

  // Apply enhanced reverb for droning effect
  applyChantVoiceEffects(utterance);

  speechSynthesis.speak(utterance);
}

function applyChantVoiceEffects(utterance) {
  // Even deeper cathedral reverb for chant droning
  utterance.onstart = () => {
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
  };

  // More pronounced reverb for hypnotic droning
  utterance.rate *= 0.8;   // Even slower
  utterance.pitch *= 0.7;  // Even deeper
}

function startSpeechSchedule() {
  // Voice is now reactive - no scheduled intervals needed
  // Words will be spoken as they appear on screen
  console.log('Reactive voice system active - words will be spoken as they appear');
}

function speakWord(customRate = 0.8, customVolume = 0.7, specificWord = null) {
  if (!speechEnabled || !('speechSynthesis' in window)) return;

  let word;

  // Use the specific word if provided, otherwise use reactive selection
  if (specificWord) {
    word = specificWord;
  } else if (lyricMode && onScreenWords.length > 0) {
    // Use most recent word for reactive speech
    word = onScreenWords[onScreenWords.length - 1];
  } else {
    word = random(words);
  }

  let utterance = new SpeechSynthesisUtterance(word);

  // Church-like voice characteristics - single consistent voice
  utterance.rate = 0.7;      // Slower, more ceremonial pace
  utterance.pitch = 0.4;     // Lower, more resonant
  utterance.volume = 0.6;    // Moderate, reverent volume

  // Select natural-sounding voice
  if (speechSynthesis.getVoices().length > 0) {
    let voices = speechSynthesis.getVoices();
    let naturalVoice = voices.find(v =>
      v.name.includes('Natural') ||
      v.name.includes('Premium') ||
      v.name.includes('Enhanced') ||
      v.voiceURI.includes('premium')
    ) || voices[0];
    utterance.voice = naturalVoice;
  }

  // Apply church-like reverb effects
  applyChurchVoiceEffects(utterance);

  speechSynthesis.speak(utterance);
}

// Apply church-like reverb and atmospheric effects to voice
function applyChurchVoiceEffects(utterance) {
  // Add event listeners for voice processing
  utterance.onstart = () => {
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
  };

  // Cathedral-like reverb characteristics - consistent for all words
  // Slightly slower and deeper for reverberant church quality
  utterance.rate *= 0.9;
  utterance.pitch *= 0.8;
}


function drawHUD() {
  // HUD background - expanded height for new controls
  push();
  fill(0, 0, 0, 180);
  stroke(255);
  strokeWeight(1);
  rect(10, 10, 450, 150); // Wider to accommodate longer text

  // HUD text
  fill(255);
  textAlign(LEFT, TOP);
  textFont('monospace');
  textSize(12);

  let y = 25;
  let lineHeight = 15;

  // Playing status and BPM
  let playStatus = song.isPlaying() ? "● playing" : "○ stopped";
  text(`${playStatus}  bpm: ${BPM}`, 20, y);
  y += lineHeight;

  // Font size and random mode
  let randomStatus = randomMode ? "on" : "off";
  text(`size: ${fontSize}  random: ${randomStatus}`, 20, y);
  y += lineHeight;

  // Spacing (minDist)
  text(`spacing: ${minDist}`, 20, y);
  y += lineHeight;

  // Voice status
  let voiceStatus = speechEnabled ? "on" : "off";
  text(`voice: ${voiceStatus}`, 20, y);
  y += lineHeight;

  // Lyric mode
  let lyricStatus = lyricMode ? "verse blocks" : "chaos";
  text(`mode: ${lyricStatus}`, 20, y);
  y += lineHeight;

  // Chant mode with better explanation
  if (chantMode && chantWord) {
    text(`chant: DRONING — "${chantWord}" (continuous loop)`, 20, y);
  } else {
    text(`chant: off (H: lock last word for repetitive droning)`, 20, y);
  }
  y += lineHeight;

  // Network status
  text(`network: on`, 20, y);
  y += lineHeight;

  // Controls
  text(`L: mode  S: save  H: chant`, 20, y);

  pop();
}

function drawInitialOverlay() {
  // Semi-transparent background
  push();
  fill(0, 0, 0, 200);
  rect(0, 0, width, height);

  // Central explanatory text
  fill(255);
  textAlign(CENTER, CENTER);
  textFont('serif');

  // Title
  textSize(32);
  text("RUDIMENTARY MAGITS", width/2, height/2 - 80);

  // Subtitle
  textSize(18);
  text("Interactive Poetry Experience", width/2, height/2 - 40);

  // Instructions
  textSize(14);
  text("Press SPACEBAR to begin the lyrical exploration", width/2, height/2 + 20);
  text("Move your mouse to interact with the verse blocks", width/2, height/2 + 40);
  text("Based on the works of Rudimentary Peni and Magits", width/2, height/2 + 80);

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Recreate stamps buffer at new size
  let oldStampsBuffer = stampsBuffer;
  stampsBuffer = createGraphics(width, height);
  stampsBuffer.background(0, 0, 0, 0);

  // Copy old stamps to new buffer if it exists
  if (oldStampsBuffer) {
    stampsBuffer.image(oldStampsBuffer, 0, 0);
  }

  if (lyricMode) {
    initializeVerseBlocks(); // Recalculate blocks on resize
  }
}

// Initialize verse block positions for structured lyric display
function initializeVerseBlocks() {
  verseBlocks = [];

  // Single center rectangle for lyrics - portrait orientation
  let blockWidth = width * 0.4;   // Narrower for portrait
  let blockHeight = height * 0.7;  // Taller for portrait
  let centerX = (width - blockWidth) / 2;
  let centerY = (height - blockHeight) / 2;

  verseBlocks.push({
    x: centerX,
    y: centerY,
    width: blockWidth,
    height: blockHeight,
    words: [],
    wordIndex: 0,
    lineHeight: fontSize + 8,
    maxWordsPerLine: 6,
    currentLine: 0
  });

  nextBlockIndex = 0;
}

// Toggle between chaos mode and verse block mode
function toggleLyricMode() {
  lyricMode = !lyricMode;
  if (lyricMode) {
    initializeVerseBlocks();
    background(0, 0, 0); // Clear canvas for clean verse layout
  }
}

// Download canvas as PNG
function downloadCanvas() {
  let timestamp = year() + "-" + nf(month(), 2) + "-" + nf(day(), 2) + "_" +
                  nf(hour(), 2) + "-" + nf(minute(), 2) + "-" + nf(second(), 2);
  save(`rudimentary-magits_${timestamp}.png`);
}

// Draw verse blocks when in lyric mode
function drawVerseBlocks() {
  if (!lyricMode || verseBlocks.length === 0) return;

  let block = verseBlocks[0]; // Single center block

  // Draw verse block with pure black background
  push();

  // Pure black background - nodes float around it due to physics
  fill(0, 0, 0, 255);
  noStroke();
  rect(block.x, block.y, block.width, block.height);

  // Block outline
  stroke(255, 255, 255, 80);
  strokeWeight(2);
  noFill();
  rect(block.x, block.y, block.width, block.height);

  // Draw title - clean, single rendering
  fill(255);
  noStroke(); // Remove stroke for clean title
  textAlign(CENTER, TOP);
  textSize(18);
  text("RUDIMENTARY MAGITS", width/2, block.y - 35);

  // Draw words with proper text wrapping
  fill(255);
  noStroke(); // Remove stroke for better legibility
  textAlign(LEFT, TOP);
  textSize(fontSize * 1.1);

  let startY = block.y + 40;
  let lineHeight = (fontSize * 1.1) + 8;
  let columnWidth = block.width / 3; // Three columns
  let columnPadding = 20; // Increased by 5px to prevent text overflow
  let availableColumnWidth = columnWidth - (columnPadding * 2);

  let currentColumn = 0;
  let currentY = startY;
  let maxY = block.y + block.height - 20; // Leave some bottom padding

  // Process each word with wrapping
  for (let i = 0; i < block.words.length && currentColumn < 3; i++) {
    let word = block.words[i];
    let wordWidth = textWidth(word);

    // Check if word needs to wrap to multiple lines
    if (wordWidth > availableColumnWidth) {
      // Split long phrases into multiple lines
      let words = word.split(' ');
      let currentLine = '';

      for (let w of words) {
        let testLine = currentLine + (currentLine ? ' ' : '') + w;
        if (textWidth(testLine) <= availableColumnWidth) {
          currentLine = testLine;
        } else {
          // Draw current line and start new line
          if (currentLine) {
            let columnX = block.x + (currentColumn * columnWidth) + columnPadding;
            text(currentLine, columnX, currentY);
            currentY += lineHeight;

            // Check if we need to move to next column
            if (currentY > maxY) {
              currentColumn++;
              currentY = startY;
            }
          }
          currentLine = w;
        }
      }

      // Draw remaining line
      if (currentLine && currentColumn < 3) {
        let columnX = block.x + (currentColumn * columnWidth) + columnPadding;
        text(currentLine, columnX, currentY);
        currentY += lineHeight;
      }
    } else {
      // Single word fits in column width
      let columnX = block.x + (currentColumn * columnWidth) + columnPadding;
      text(word, columnX, currentY);
      currentY += lineHeight;
    }

    // Check if we need to move to next column
    if (currentY > maxY) {
      currentColumn++;
      currentY = startY;
      if (currentColumn >= 3) break; // Stop if we've filled all 3 columns
    }
  }

  pop();
}

// Add word to verse blocks in lyric mode
function addToVerseBlock(word) {
  if (!lyricMode || verseBlocks.length === 0) return;

  // Filter out symbols in verse mode - only show actual words
  let symbols = ["†", "✝", "+", "×", "*", "✦"];
  if (symbols.includes(word)) {
    return; // Skip symbols in verse mode
  }

  let currentBlock = verseBlocks[0]; // Single center block
  currentBlock.words.push(word);

  // Add to on-screen words list for voice recitation
  onScreenWords.push(word);
  if (onScreenWords.length > 50) {
    onScreenWords.shift(); // Keep only recent words
  }

  // Limit total words in block - allow 3 full columns before removal
  if (currentBlock.words.length > 75) { // Enough for ~25 words per column × 3 columns
    currentBlock.words.shift(); // Remove oldest words only after 3 columns are full
  }

  // Reactive voice - speak this word on the next beat
  scheduleWordSpeech(word);
}

// Schedule word to be spoken on the next beat
function scheduleWordSpeech(word) {
  if (!speechEnabled || !song.isPlaying()) return;

  // Calculate time to next beat (4/4 time - every beat)
  let songTime = song.currentTime() * 1000;
  let currentBeat = Math.floor(songTime / beatInterval);
  let nextBeatTime = (currentBeat + 1) * beatInterval;
  let timeToNextBeat = nextBeatTime - songTime;

  // Ensure minimum delay
  if (timeToNextBeat < 100) {
    nextBeatTime += beatInterval; // Skip to next beat if too close
    timeToNextBeat += beatInterval;
  }

  // Schedule speech for the next beat
  setTimeout(() => {
    speakWord(null, null, word); // Pass the specific word
  }, timeToNextBeat);
}


// Web Audio API voice processing effects
function createVoiceEffects(category) {
  if (!audioContext) return null;

  let effectChain = {
    gain: audioContext.createGain(),
    filter: audioContext.createBiquadFilter(),
    delay: audioContext.createDelay(),
    feedback: audioContext.createGain()
  };

  // Configure effects based on category
  switch(category) {
    case 'death':
    case 'doom':
      // Low-pass filter for "underground" sound
      effectChain.filter.type = 'lowpass';
      effectChain.filter.frequency.setValueAtTime(800, audioContext.currentTime);
      effectChain.gain.gain.setValueAtTime(1.2, audioContext.currentTime);
      break;

    case 'punk':
      // Distortion effect (simulated with waveshaper)
      effectChain.filter.type = 'bandpass';
      effectChain.filter.frequency.setValueAtTime(2000, audioContext.currentTime);
      effectChain.filter.Q.setValueAtTime(10, audioContext.currentTime);
      break;

    case 'lovecraftian':
      // Deep reverb/echo
      effectChain.delay.delayTime.setValueAtTime(0.3, audioContext.currentTime);
      effectChain.feedback.gain.setValueAtTime(0.4, audioContext.currentTime);
      break;

    case 'whisper':
      // Subtle high-pass for ethereal quality
      effectChain.filter.type = 'highpass';
      effectChain.filter.frequency.setValueAtTime(300, audioContext.currentTime);
      effectChain.gain.gain.setValueAtTime(0.5, audioContext.currentTime);
      break;
  }

  return effectChain;
}

// Network visualization removed - focusing on core functionality