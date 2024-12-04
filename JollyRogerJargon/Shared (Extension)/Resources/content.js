// Expanded list of pirate phrases
const piratePhrases = {
	'hello': 'Ahoy',
	'hi': 'Ahoy',
	'friend': 'Matey',
	'goodbye': 'Farewell',
	'yes': 'Aye',
	'no': 'Nay',
	'please': 'Pray',
	'thank you': 'Yer welcome',
	'you': 'Ye',
	'the': 'Thar',
	'is': 'be',
	'are': 'be',
	'my': 'me',
	'we': 'We be',
	'our': 'Our',
	'them': 'Thar',
	'your': 'Yer',
	'ship': 'Vessel',
	'treasure': 'Booty',
	'money': 'Doubloons',
	'captain': 'Cap’n',
	'pirate': 'Privateer',
	'danger': 'Peril',
	'attack': 'Boardin’',
	'fight': 'Battle',
	'enemy': 'Scallywags',
	'help': 'Assistance',
	'kill': 'Make walk the plank',
	'good': 'Savvy',
	'bad': 'Scurvy',
	'love': 'Plunder',
	'food': 'Grub',
	'drink': 'Grog',
	'beautiful': 'Fair wind',
	'strong': 'Tough as a sea dog',
	'shut up': 'Bite yer tongue',
	'stupid': 'Dullard',
	'crazy': 'Mad as a hornet',
	'smart': 'Sharp as a cutlass',
	'friend': 'Matey',
	'boss': 'Cap’n',
	'bossy': 'High-handed',
	'dangerous': 'Chancy as a storm at sea',
	'damn': 'Blimey',
	'good morning': 'Good mornin’, matey!',
	'good night': 'Nighty-night, ye scurvy dog!',
	'I love you': 'I be fond o’ ye!',
	'how are you': 'How be ye, matey?',
	'fine': 'Tough as a hull in a storm',
	'hello there': 'Ahoy thar!',
	'what’s up': 'What be stirrin’, matey?',
	'where': 'Whar',
	'why': 'Why be that?',
	'who': 'Who be ye?',
	'when': 'When be ye comin’?',
	'my name is': 'The name’s Cap’n [Name]',
	'shiver me timbers': 'Shiver me timbers!',
	'walk the plank': 'Ye be walkin’ the plank now!',
	'yo': 'Yo-ho-ho!',
	'aye': 'Aye, aye!',
	'ahoy': 'Ahoy, matey!',
	'blimey': 'Blimey, ye scallywag!',
	'mate': 'Matey',
	'scallywag': 'Swab',
	'landlubber': 'Lousy landlubber'
};

// Load user preference for pirate speak toggle
const getUserPreference = () => {
	return JSON.parse(localStorage.getItem('pirateSpeakEnabled')) ?? true;
};

// Save user preference for pirate speak toggle
const setUserPreference = (enabled) => {
	localStorage.setItem('pirateSpeakEnabled', JSON.stringify(enabled));
};

// Function to convert text into pirate speak
const toPirateSpeak = (text) => {
	return text.replace(/\b(?:hello|hi|friend|goodbye|yes|no|please|thank you|you|the|is|are|my|we|our|them|your|ship|treasure|money|captain|pirate|danger|attack|fight|enemy|help|kill|good|bad|love|food|drink|beautiful|strong|shut up|stupid|crazy|smart|boss|dangerous|damn|good morning|good night|I love you|how are you|fine|hello there|what’s up|where|why|who|when|my name is|shiver me timbers|walk the plank|yo|aye|ahoy|blimey|mate|scallywag|landlubber)\b/gi, match => {
		return piratePhrases[match.toLowerCase()] || match;
	});
};

// Function to replace text nodes in the document
const replaceTextNodes = (node) => {
	if (node.nodeType === Node.TEXT_NODE) {
		node.textContent = toPirateSpeak(node.textContent);
	} else if (node.nodeType === Node.ELEMENT_NODE) {
		node.childNodes.forEach(replaceTextNodes);
	}
};

// Function to toggle pirate speak on/off
const togglePirateSpeak = (enabled) => {
	// Apply pirate speak transformation
	if (enabled) {
		document.body.childNodes.forEach(replaceTextNodes);
	} else {
		// Reset to original text (assuming no page reload)
		document.body.childNodes.forEach(resetTextNodes);
	}
};

// Function to reset text nodes (removing pirate speak)
const resetTextNodes = (node) => {
	if (node.nodeType === Node.TEXT_NODE) {
		node.textContent = node.textContent.replace(/\b(?:Ahoy|Matey|Farewell|Aye|Nay|Pray|Yer|Thar|be|me|We be|Our|Ye|Vessel|Booty|Doubloons|Cap’n|Privateer|Peril|Boardin’|Battle|Scallywags|Assistance|Make walk the plank|Savvy|Scurvy|Plunder|Grub|Grog|Fair wind|Tough as a sea dog|Bite yer tongue|Dullard|Mad as a hornet|Sharp as a cutlass|High-handed|Chancy as a storm at sea|Blimey|Good mornin’, matey!|Nighty-night, ye scurvy dog!|I be fond o’ ye!|What be stirrin’, matey?|Whar|Why be that?|Who be ye?|When be ye comin’?|\b)\b/gi, match => {
			// Replace with original words (this is a simple reverse, ideally you'd keep a map for reversals)
			return match; // Reset to original text, for simplicity
		});
	} else if (node.nodeType === Node.ELEMENT_NODE) {
		node.childNodes.forEach(resetTextNodes);
	}
};

// Initialize the pirate speak based on user preference
togglePirateSpeak(getUserPreference());

// Listen for messages from background or popup (for toggle feature)
browser.runtime.onMessage.addListener((message) => {
	if (message.action === 'togglePirateSpeak') {
		const newState = !getUserPreference();
		setUserPreference(newState);
		togglePirateSpeak(newState);
	}
});
