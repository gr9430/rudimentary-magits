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

  let word = random(words);
  let utterance = new SpeechSynthesisUtterance(word);
  utterance.rate = customRate;
  utterance.pitch = 0.5;
  utterance.volume = customVolume;

  speechSynthesis.speak(utterance);
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
  let blockWidth = width * 0.35;
  let blockHeight = height * 0.2;
  let margin = 50;

  // Create 4 verse block areas
  verseBlocks.push({
    x: margin,
    y: margin,
    width: blockWidth,
    height: blockHeight,
    words: [],
    wordIndex: 0
  });

  verseBlocks.push({
    x: width - blockWidth - margin,
    y: margin,
    width: blockWidth,
    height: blockHeight,
    words: [],
    wordIndex: 0
  });

  verseBlocks.push({
    x: margin,
    y: height - blockHeight - margin,
    width: blockWidth,
    height: blockHeight,
    words: [],
    wordIndex: 0
  });

  verseBlocks.push({
    x: width - blockWidth - margin,
    y: height - blockHeight - margin,
    width: blockWidth,
    height: blockHeight,
    words: [],
    wordIndex: 0
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
  if (!lyricMode) return;

  // Draw block outlines
  push();
  stroke(255, 255, 255, 100);
  strokeWeight(1);
  noFill();

  for (let block of verseBlocks) {
    rect(block.x, block.y, block.width, block.height);
  }

  // Draw words in each block
  fill(255);
  textAlign(LEFT, TOP);
  textSize(fontSize);

  for (let block of verseBlocks) {
    let y = block.y + 20;
    let lineHeight = fontSize + 5;

    for (let i = 0; i < block.words.length; i++) {
      if (y + lineHeight < block.y + block.height - 10) {
        text(block.words[i], block.x + 10, y);
        y += lineHeight;
      }
    }
  }

  pop();
}

// Add word to verse blocks in lyric mode
function addToVerseBlock(word) {
  if (!lyricMode || verseBlocks.length === 0) return;

  let currentBlock = verseBlocks[nextBlockIndex];
  currentBlock.words.push(word);

  // Move to next block when current one has enough words
  if (currentBlock.words.length >= 8) {
    nextBlockIndex = (nextBlockIndex + 1) % verseBlocks.length;
  }
}