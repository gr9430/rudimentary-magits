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

function preload() {
  song = loadSound('assets/audio/rudimagits.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 0);

  lastMouseX = mouseX;
  lastMouseY = mouseY;

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
  // Draw verse blocks if in lyric mode
  drawVerseBlocks();

  // HUD display
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
    speakWord();
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
    // Add to verse blocks
    addToVerseBlock(word);
  } else {
    // Chaos mode - original behavior
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
    push();
    translate(mouseX, mouseY);
    rotate(random(-PI/4, PI/4));

    fill(brightness, brightness, brightness, alpha);
    stroke(brightness, brightness, brightness, alpha * 0.6);
    strokeWeight(0.3);
    textAlign(CENTER, CENTER);
    textSize(currentFontSize);

    text(word, 0, 0);
    pop();
  }
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
    clearInterval(speechInterval);
    clearInterval(speechInterval2);
    clearInterval(speechInterval3);
  } else {
    song.loop();
    startSpeechSchedule();
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
  if (speechEnabled) {
    // Primary voice - every 8 beats (2 bars)
    speechInterval = setInterval(() => {
      speakWord();
    }, beatInterval * 8);

    // Secondary voice - offset by 4 beats, every 16 beats
    speechInterval2 = setInterval(() => {
      speakWord(0.6, 0.4); // Lower pitch, quieter
    }, beatInterval * 16);

    // Tertiary voice - offset by 12 beats, every 24 beats
    speechInterval3 = setInterval(() => {
      speakWord(0.9, 0.3); // Higher rate, quieter
    }, beatInterval * 24);
  }
}

function speakWord(customRate = 0.8, customVolume = 0.7) {
  if (!speechEnabled || !('speechSynthesis' in window)) return;

  let word;

  // Use on-screen words in lyric mode, random words in chaos mode
  if (lyricMode && onScreenWords.length > 0) {
    // Recite from visible words
    word = random(onScreenWords.slice(-20)); // Use recent visible words
  } else {
    word = random(words);
  }

  // Apply content-aware speech characteristics
  let category = categorizeWord(word);
  let speechParams = getSpeechParams(category);

  let utterance = new SpeechSynthesisUtterance(word);
  utterance.rate = speechParams.rate || customRate;
  utterance.pitch = speechParams.pitch || 0.5;
  utterance.volume = speechParams.volume || customVolume;

  // Add voice selection based on category
  if (speechParams.voice && speechSynthesis.getVoices().length > 0) {
    let voices = speechSynthesis.getVoices();
    let selectedVoice = voices.find(v => v.name.includes(speechParams.voice)) || voices[0];
    utterance.voice = selectedVoice;
  }

  speechSynthesis.speak(utterance);
}

// Get speech parameters based on word category
function getSpeechParams(category) {
  switch(category) {
    case 'death':
    case 'doom':
      return {
        rate: 0.4,      // Slow, deep
        pitch: 0.2,     // Low pitch
        volume: 0.8,    // Louder
        voice: 'bass'   // Prefer deeper voice
      };

    case 'symbols':
      return {
        rate: 1.2,      // Fast, sharp
        pitch: 0.8,     // Higher pitch
        volume: 0.6,    // Sharp but not overwhelming
        voice: 'default'
      };

    case 'whisper':
      return {
        rate: 0.6,      // Slow whisper
        pitch: 0.3,     // Low whisper
        volume: 0.3,    // Quiet
        voice: 'whisper'
      };

    case 'religious':
      return {
        rate: 0.7,      // Chanted delivery
        pitch: 0.4,     // Deep, reverent
        volume: 0.7,
        voice: 'chant'
      };

    case 'punk':
      return {
        rate: 1.0,      // Aggressive pace
        pitch: 0.6,     // Mid-range aggression
        volume: 0.9,    // Loud
        voice: 'aggressive'
      };

    case 'lovecraftian':
      return {
        rate: 0.5,      // Ominous slow
        pitch: 0.1,     // Very deep
        volume: 0.8,    // Commanding presence
        voice: 'deep'
      };

    default:
      return {
        rate: 0.8,
        pitch: 0.5,
        volume: 0.7
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

  // Controls
  text(`L: mode  S: save  H: chant`, 20, y);

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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

  // Draw title
  fill(255);
  textAlign(CENTER, TOP);
  textSize(16);
  text("RUDIMENTARY MAGITS", width/2, block.y - 30);

  // Draw words in flowing verse format
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(fontSize);

  let currentY = block.y + 30;
  let lineHeight = fontSize + 10;
  let wordsPerLine = block.maxWordsPerLine;
  let currentX = block.x + block.width/2;

  for (let i = 0; i < block.words.length; i += wordsPerLine) {
    if (currentY + lineHeight < block.y + block.height - 20) {
      let lineWords = block.words.slice(i, i + wordsPerLine);
      let lineText = lineWords.join("  ·  ");
      text(lineText, currentX, currentY);
      currentY += lineHeight;
    }
  }

  pop();
}

// Add word to verse blocks in lyric mode
function addToVerseBlock(word) {
  if (!lyricMode || verseBlocks.length === 0) return;

  let currentBlock = verseBlocks[0]; // Single center block
  currentBlock.words.push(word);

  // Add to on-screen words list for voice recitation
  onScreenWords.push(word);
  if (onScreenWords.length > 50) {
    onScreenWords.shift(); // Keep only recent words
  }

  // Limit total words in block
  if (currentBlock.words.length > 60) {
    currentBlock.words.shift(); // Remove oldest words
  }
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