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
let speechInterval2; // Secondary voice
let speechInterval3; // Tertiary voice
let lastStampedWord = "";
let lyricMode = false; // New: structured verse block mode
let verseBlocks = []; // Store verse block data
let nextBlockIndex = 0;
let onScreenWords = []; // Track words currently visible on screen
let audioContext; // Web Audio API context
let analyser; // Audio analyser for effects
let chaosWords = []; // Store chaos decoration words in verse mode

// Network graph background
let networkBuffer;
let stampsBuffer;
let nodes = [];
let edges = [];

function preload() {
  song = loadSound('assets/audio/rudimagits.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 0);

  lastMouseX = mouseX;
  lastMouseY = mouseY;

  // Initialize graphics buffers
  networkBuffer = createGraphics(width, height);
  stampsBuffer = createGraphics(width, height);
  stampsBuffer.background(0, 0, 0, 0); // Transparent background for stamps

  // Initialize network graph
  initializeNetwork();

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

  // Update and render network background
  updateNetwork();
  renderNetwork();

  // Draw network buffer to main canvas
  image(networkBuffer, 0, 0);

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
}

function mouseMoved() {
  if (!lyricMode && !isMouseHeld) {
    let distance = dist(mouseX, mouseY, lastMouseX, lastMouseY);
    if (distance >= minDist) {
      stampWord();
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    }
  }
}

function mousePressed() {
  if (!song.isPlaying()) return;

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

  if (chantMode && chantWord && chantCounter > 0) {
    word = chantWord;
    chantCounter--;
    if (chantCounter <= 0) {
      chantMode = false;
      chantWord = "";
    }
  } else {
    word = random(words);
    lastStampedWord = word;
  }

  // Track words for voice recitation in both modes
  onScreenWords.push(word);
  if (onScreenWords.length > 50) {
    onScreenWords.shift(); // Keep only recent words
  }

  if (lyricMode) {
    // In verse mode, add to verse blocks AND create chaos decoration
    addToVerseBlock(word);
    addChaosDecoration(word, mouseX, mouseY);
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
    // No more scheduled intervals to clear - voice is now reactive
  } else {
    song.loop();
    startSpeechSchedule(); // Just logs that reactive voice is active
  }
}

function toggleChantMode() {
  chantMode = !chantMode;
  if (chantMode && lastStampedWord) {
    chantWord = lastStampedWord;
    chantCounter = 8; // Repeat for 8 beats
  } else {
    chantWord = "";
    chantCounter = 0;
  }
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

  // Apply content-aware speech characteristics with more natural settings
  let category = categorizeWord(word);
  let speechParams = getSpeechParams(category);

  let utterance = new SpeechSynthesisUtterance(word);
  utterance.rate = speechParams.rate || customRate;
  utterance.pitch = speechParams.pitch || 0.5;
  utterance.volume = (speechParams.volume || customVolume) * 0.8; // Reduce overall volume

  // Select more natural voices and add reverb effect
  if (speechSynthesis.getVoices().length > 0) {
    let voices = speechSynthesis.getVoices();

    // Prefer more natural-sounding voices
    let naturalVoice = voices.find(v =>
      v.name.includes('Natural') ||
      v.name.includes('Premium') ||
      v.name.includes('Enhanced') ||
      v.voiceURI.includes('premium')
    ) || voices[0];

    utterance.voice = naturalVoice;
  }

  // Apply reverb effect using the word category
  applyVoiceEffects(utterance, category);

  speechSynthesis.speak(utterance);
}

// Apply reverb and atmospheric effects to voice
function applyVoiceEffects(utterance, category) {
  // Add event listeners for voice processing
  utterance.onstart = () => {
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
  };

  // Simulate reverb by adjusting voice characteristics
  switch(category) {
    case 'death':
    case 'doom':
    case 'lovecraftian':
      // Deep, cavernous reverb for dark words
      utterance.rate *= 0.8; // Slower for more echo-like effect
      utterance.pitch *= 0.7; // Deeper
      break;

    case 'religious':
      // Cathedral-like reverb for religious terms
      utterance.rate *= 0.9;
      utterance.pitch *= 0.8;
      break;

    case 'punk':
      // Distorted reverb for punk terms
      utterance.rate *= 1.1;
      utterance.pitch *= 1.2;
      break;

    default:
      // Subtle ambient reverb for other words
      utterance.rate *= 0.95;
      break;
  }
}

// Get speech parameters based on word category - all with natural reverb
function getSpeechParams(category) {
  switch(category) {
    case 'death':
    case 'doom':
      return {
        rate: 0.7,      // Slower but not robotic
        pitch: 0.4,     // Lower but natural
        volume: 0.6     // Moderate volume
      };

    case 'symbols':
      return {
        rate: 0.9,      // Slightly fast but natural
        pitch: 0.7,     // Higher but not robotic
        volume: 0.5     // Moderate
      };

    case 'whisper':
    case 'phrase':
      return {
        rate: 0.8,      // Natural pace
        pitch: 0.5,     // Natural pitch
        volume: 0.4     // Quiet but clear
      };

    case 'religious':
      return {
        rate: 0.8,      // Natural chanted pace
        pitch: 0.5,     // Natural reverent tone
        volume: 0.6
      };

    case 'punk':
      return {
        rate: 0.9,      // Slightly aggressive but natural
        pitch: 0.6,     // Mid-range
        volume: 0.7
      };

    case 'lovecraftian':
      return {
        rate: 0.7,      // Slow and ominous but natural
        pitch: 0.4,     // Deep but not robotic
        volume: 0.6
      };

    default:
      return {
        rate: 0.8,      // Natural default
        pitch: 0.5,     // Natural pitch
        volume: 0.6     // Moderate volume
      };
  }
}

function drawHUD() {
  // HUD background - expanded height for new controls
  push();
  fill(0, 0, 0, 180);
  stroke(255);
  strokeWeight(1);
  rect(10, 10, 320, 150);

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

  // Chant mode
  if (chantMode && chantWord) {
    text(`chant: LOCKED — "${chantWord}"`, 20, y);
  } else {
    text(`chant: off`, 20, y);
  }
  y += lineHeight;

  // Network status
  text(`network: on`, 20, y);
  y += lineHeight;

  // Controls
  text(`L: mode  S: save  H: chant`, 20, y);

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Recreate graphics buffers at new size
  networkBuffer = createGraphics(width, height);
  let oldStampsBuffer = stampsBuffer;
  stampsBuffer = createGraphics(width, height);
  stampsBuffer.background(0, 0, 0, 0);

  // Copy old stamps to new buffer if it exists
  if (oldStampsBuffer) {
    stampsBuffer.image(oldStampsBuffer, 0, 0);
  }

  // Reinitialize network with proportional positions
  reinitializeNetworkPositions();

  if (lyricMode) {
    initializeVerseBlocks(); // Recalculate blocks on resize
  }
}

// Initialize verse block positions for structured lyric display
function initializeVerseBlocks() {
  verseBlocks = [];

  // Single center rectangle for lyrics
  let blockWidth = width * 0.6;
  let blockHeight = height * 0.5;
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

  // Draw block outline
  push();
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

  // Draw words in columns when needed
  fill(255);
  noStroke(); // Remove stroke for better legibility
  textAlign(CENTER, TOP);
  textSize(fontSize * 1.1);

  let startY = block.y + 40;
  let lineHeight = (fontSize * 1.1) + 18;
  let wordsPerColumn = Math.floor((block.height - 80) / lineHeight);
  let columnWidth = block.width / 3; // Three columns
  let totalColumns = Math.ceil(block.words.length / wordsPerColumn);

  // Draw words in columns
  for (let i = 0; i < block.words.length; i++) {
    let columnIndex = Math.floor(i / wordsPerColumn);
    let rowIndex = i % wordsPerColumn;

    if (columnIndex >= 3) break; // Max 3 columns

    let columnX = block.x + (columnIndex * columnWidth) + (columnWidth / 2);
    let wordY = startY + (rowIndex * lineHeight);

    // Draw each word in its column position
    text(block.words[i], columnX, wordY);
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

  // Limit total words in block
  if (currentBlock.words.length > 20) {
    currentBlock.words.shift(); // Remove oldest words
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

// Word categorization for content-aware speech
const wordCategories = {
  symbols: ["†", "✝", "+", "×", "*", "✦"],
  death: ["death", "dead", "die", "bleed", "mortality", "murdered", "grave", "corpse", "skeleton", "coffin", "burial", "dust", "flesh", "severed", "jugular", "lung", "cancer"],
  doom: ["pain", "suffer", "void", "decay", "despair", "dismay", "crime", "guilt", "tortured", "empty", "hatred", "hell", "grotesque", "crumbling", "nightmare", "fear", "grief", "tears", "ghost", "insanity", "oblivion", "madness", "sorrow", "anguish", "extinction", "tragedy", "scorn", "futility", "regret", "corruption"],
  religious: ["god", "pope", "crosses", "crucify", "Vatican't City", "Psychristiatric", "Christisatanic", "Pope Joan", "babies of christ", "wash your mouth out with pope", "pills popes and potions"],
  punk: ["bullshit", "never gave a fuck", "smash cash smash trash", "revolution", "army", "mohawk", "punkoid", "authority", "destroy", "factory", "warfare state", "thriving on hate"],
  lovecraftian: ["Lovecraft", "Cthulhu", "Nyarlathotep", "Shoggoth", "Arkham", "Necronomicon", "nightgaunt", "eldritch", "squamous", "rugose", "amorphous", "gibbering", "somnambulistic", "tintinnabulation", "lovecraftian", "mythos", "that is not dead which can eternal lie", "with strange aeons even death may die"]
};

// Determine word category for content-aware speech
function categorizeWord(word) {
  word = word.toLowerCase();

  for (let category in wordCategories) {
    if (wordCategories[category].some(w => word.includes(w.toLowerCase()))) {
      return category;
    }
  }

  // Check for long phrases
  if (word.length > 30) return 'whisper';
  if (word.length > 15) return 'phrase';

  return 'default';
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

// ============ NETWORK GRAPH SYSTEM ============

// Network node and cluster definitions
const clusterData = [
  {
    // Cluster 0 — religion/pope
    words: ["pope", "christ", "blasphemy", "sacrifice", "Vatican't City", "babies of christ", "wash your mouth out with pope", "Pogo Pope", "Army of Jesus", "death love god squad"],
    songs: ["Blasphemy Squad", "Army Of Jesus", "Sacrifice"],
    album: "Pope Adrian 37th Psychristiatric"
  },
  {
    // Cluster 1 — asylum/illness
    words: ["straitjacket", "wheelchair", "schizoid", "punkoid", "devoid", "pills popes and potions", "the depixal dance of death", "Radio Schizo", "B-Ward", "flame of insanity"],
    songs: ["B-Ward", "Crazy Chain", "The Cloud Song"],
    album: "Death Church"
  },
  {
    // Cluster 2 — Lovecraft/mythos
    words: ["Lovecraft", "Cthulhu", "Shoggoth", "Nyarlathotep", "Arkham", "nightgaunt", "eldritch", "squamous", "somnambulistic", "Providence"],
    songs: ["Nightgaunts", "Arkham Hearse", "Cacophony"],
    album: "Cacophony"
  },
  {
    // Cluster 3 — political punk
    words: ["genocide", "slavery", "poppies", "John Lydon", "Joe Strummer", "abbatoir", "grind your bones to make their bombs", "three quarters of the world are starving"],
    songs: ["Poppycock", "Rotten To The Core", "Dutchmen"],
    album: "Death Church"
  },
  {
    // Cluster 4 — Magits abstraction
    words: ["fragment", "disconnect", "conform", "Blitzkrieg Zugzwang", "Avante Garde", "overqualified", "X-ray eyes", "monday is a square box unfortunately locked"],
    songs: ["Fragmented", "Disconnect", "Disjointed", "Detached"],
    album: "Magits"
  },
  {
    // Cluster 5 — mortality/void
    words: ["death", "void", "dust", "grave", "oblivion", "crematorium", "only death", "in a handful of dust", "rehearsal for mortality", "farewell tomorrow"],
    songs: ["No More Pain", "Only Death", "Annihilation"],
    album: "No More Pain"
  }
];

function initializeNetwork() {
  nodes = [];
  edges = [];

  // Create nodes for each cluster
  for (let clusterIndex = 0; clusterIndex < clusterData.length; clusterIndex++) {
    const cluster = clusterData[clusterIndex];

    // Add word nodes
    cluster.words.forEach(word => {
      nodes.push({
        word: word,
        x: random(40, width - 40),
        y: random(40, height - 40),
        vx: random(-0.1, 0.1),
        vy: random(-0.1, 0.1),
        size: 6,
        cluster: clusterIndex,
        opacity: random(0.12, 0.22),
        type: 'word'
      });
    });

    // Add song nodes
    cluster.songs.forEach(song => {
      nodes.push({
        word: song,
        x: random(40, width - 40),
        y: random(40, height - 40),
        vx: random(-0.1, 0.1),
        vy: random(-0.1, 0.1),
        size: 10,
        cluster: clusterIndex,
        opacity: random(0.12, 0.22),
        type: 'song'
      });
    });

    // Add album node
    nodes.push({
      word: cluster.album,
      x: random(40, width - 40),
      y: random(40, height - 40),
      vx: random(-0.1, 0.1),
      vy: random(-0.1, 0.1),
      size: 18,
      cluster: clusterIndex,
      opacity: random(0.12, 0.22),
      type: 'album'
    });
  }

  // Create edges between nodes in the same cluster
  createEdges();
}

function createEdges() {
  // For each cluster, connect nodes to 2-4 nearest neighbors within cluster
  for (let clusterIndex = 0; clusterIndex < clusterData.length; clusterIndex++) {
    let clusterNodes = nodes.filter(node => node.cluster === clusterIndex);

    clusterNodes.forEach((node, nodeIndex) => {
      let distances = [];

      // Calculate distances to other nodes in the same cluster
      clusterNodes.forEach((otherNode, otherIndex) => {
        if (nodeIndex !== otherIndex) {
          let d = dist(node.x, node.y, otherNode.x, otherNode.y);
          distances.push({
            distance: d,
            nodeIndex: nodes.indexOf(node),
            otherNodeIndex: nodes.indexOf(otherNode)
          });
        }
      });

      // Sort by distance and connect to 2-4 nearest
      distances.sort((a, b) => a.distance - b.distance);
      let connectionsToMake = Math.floor(random(2, 5));

      for (let i = 0; i < Math.min(connectionsToMake, distances.length); i++) {
        let edge = [distances[i].nodeIndex, distances[i].otherNodeIndex];

        // Check if edge already exists
        let edgeExists = edges.some(existingEdge =>
          (existingEdge[0] === edge[0] && existingEdge[1] === edge[1]) ||
          (existingEdge[0] === edge[1] && existingEdge[1] === edge[0])
        );

        if (!edgeExists) {
          edges.push(edge);
        }
      }
    });
  }
}

function updateNetwork() {
  // Calculate cluster centroids
  let clusterCentroids = [];
  for (let clusterIndex = 0; clusterIndex < clusterData.length; clusterIndex++) {
    let clusterNodes = nodes.filter(node => node.cluster === clusterIndex);
    let centroidX = 0, centroidY = 0;

    clusterNodes.forEach(node => {
      centroidX += node.x;
      centroidY += node.y;
    });

    if (clusterNodes.length > 0) {
      centroidX /= clusterNodes.length;
      centroidY /= clusterNodes.length;
    }

    clusterCentroids.push({x: centroidX, y: centroidY});
  }

  // Update physics for each node
  nodes.forEach((node, nodeIndex) => {
    let forceX = 0, forceY = 0;

    // Spring attraction toward cluster centroid (very weak)
    let centroid = clusterCentroids[node.cluster];
    let centroidDx = centroid.x - node.x;
    let centroidDy = centroid.y - node.y;
    forceX += centroidDx * 0.0003;
    forceY += centroidDy * 0.0003;

    // Repulsion between all nodes (inverse square)
    nodes.forEach((otherNode, otherIndex) => {
      if (nodeIndex !== otherIndex) {
        let dx = node.x - otherNode.x;
        let dy = node.y - otherNode.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
          let force = 400 / (distance * distance);
          forceX += (dx / distance) * force;
          forceY += (dy / distance) * force;
        }
      }
    });

    // Edge spring attraction
    edges.forEach(edge => {
      if (edge[0] === nodeIndex) {
        let otherNode = nodes[edge[1]];
        let dx = otherNode.x - node.x;
        let dy = otherNode.y - node.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let springForce = (distance - 120) * 0.004;

        forceX += (dx / distance) * springForce;
        forceY += (dy / distance) * springForce;
      } else if (edge[1] === nodeIndex) {
        let otherNode = nodes[edge[0]];
        let dx = otherNode.x - node.x;
        let dy = otherNode.y - node.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let springForce = (distance - 120) * 0.004;

        forceX += (dx / distance) * springForce;
        forceY += (dy / distance) * springForce;
      }
    });

    // Apply forces to velocity
    node.vx += forceX;
    node.vy += forceY;

    // Velocity damping
    node.vx *= 0.97;
    node.vy *= 0.97;

    // Clamp velocity
    let speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
    if (speed > 0.8) {
      node.vx = (node.vx / speed) * 0.8;
      node.vy = (node.vy / speed) * 0.8;
    }

    // Update position
    node.x += node.vx;
    node.y += node.vy;

    // Boundary bounce
    if (node.x < 40) {
      node.x = 40;
      node.vx *= -1;
    } else if (node.x > width - 40) {
      node.x = width - 40;
      node.vx *= -1;
    }

    if (node.y < 40) {
      node.y = 40;
      node.vy *= -1;
    } else if (node.y > height - 40) {
      node.y = height - 40;
      node.vy *= -1;
    }
  });
}

function renderNetwork() {
  // Clear network buffer
  networkBuffer.background(0);

  // Draw edges
  networkBuffer.stroke(255, 255, 255, 255 * 0.08);
  networkBuffer.strokeWeight(0.3);

  edges.forEach(edge => {
    let node1 = nodes[edge[0]];
    let node2 = nodes[edge[1]];
    networkBuffer.line(node1.x, node1.y, node2.x, node2.y);
  });

  // Draw nodes
  networkBuffer.noStroke();

  nodes.forEach(node => {
    // Draw node circle
    networkBuffer.fill(255, 255, 255, 255 * node.opacity);
    networkBuffer.circle(node.x, node.y, node.size);

    // Draw node text (flat, not rotated)
    networkBuffer.fill(255, 255, 255, 255 * (node.opacity + 0.04));
    networkBuffer.textAlign(CENTER, CENTER);
    networkBuffer.textSize(node.size * 0.9);
    networkBuffer.text(node.word, node.x, node.y);
  });
}

function reinitializeNetworkPositions() {
  // Reinitialize node positions proportionally for window resize
  nodes.forEach(node => {
    node.x = constrain(node.x, 40, width - 40);
    node.y = constrain(node.y, 40, height - 40);
  });
}