// CloudBrew AI Coffee Shop - Interactive JavaScript

// ===== Mobile Navigation =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  
  // Animate hamburger
  const spans = hamburger.querySelectorAll('span');
  if (navMenu.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close menu when clicking nav link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 100;
    
    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// ===== AI Barista Chat =====
const moodInput = document.getElementById('moodInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');
const moodChips = document.querySelectorAll('.mood-chip');

// Coffee recommendations based on mood
const coffeeRecommendations = {
  tired: {
    drink: "Neural Espresso Double Shot",
    description: "High-caffeine boost with smooth finish. Perfect for energy restoration.",
    emoji: "⚡"
  },
  energetic: {
    drink: "Iced AI Brew",
    description: "Light and refreshing cold brew to maintain your momentum.",
    emoji: "🚀"
  },
  relaxed: {
    drink: "Cloud Cappuccino",
    description: "Smooth, velvety foam for peaceful moments. Perfectly balanced.",
    emoji: "😌"
  },
  focused: {
    drink: "Quantum Latte",
    description: "Balanced caffeine with L-theanine for sustained concentration.",
    emoji: "🎯"
  },
  stressed: {
    drink: "Matcha Cloud",
    description: "Calming matcha blend with adaptogens to ease tension.",
    emoji: "🧘"
  },
  happy: {
    drink: "Cloud Mocha",
    description: "Indulgent chocolate-coffee blend to celebrate good vibes.",
    emoji: "😊"
  },
  creative: {
    drink: "Quantum Latte with Vanilla",
    description: "Smooth, inspiring blend to fuel your imagination.",
    emoji: "🎨"
  },
  default: {
    drink: "Cloud Cappuccino",
    description: "Our signature drink - perfect for any mood!",
    emoji: "☕"
  }
};

// Add user message to chat
function addUserMessage(message) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'chat-message user';
  messageDiv.innerHTML = `
    <div class="message-avatar">👤</div>
    <div class="message-content">
      <p>${message}</p>
    </div>
  `;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add bot message to chat
function addBotMessage(message) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'chat-message bot';
  messageDiv.innerHTML = `
    <div class="message-avatar">🤖</div>
    <div class="message-content">
      <p>${message}</p>
    </div>
  `;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Get coffee recommendation
function getCoffeeRecommendation(mood) {
  const normalizedMood = mood.toLowerCase().trim();
  
  // Check for exact match
  if (coffeeRecommendations[normalizedMood]) {
    return coffeeRecommendations[normalizedMood];
  }
  
  // Check for partial matches
  for (const key in coffeeRecommendations) {
    if (normalizedMood.includes(key) || key.includes(normalizedMood)) {
      return coffeeRecommendations[key];
    }
  }
  
  // Default recommendation
  return coffeeRecommendations.default;
}

// Handle mood input
function handleMoodInput() {
  const mood = moodInput.value.trim();
  
  if (!mood) return;
  
  // Add user message
  addUserMessage(mood);
  
  // Clear input
  moodInput.value = '';
  
  // Simulate AI thinking
  setTimeout(() => {
    const recommendation = getCoffeeRecommendation(mood);
    const response = `${recommendation.emoji} Based on your mood, I recommend our <strong>${recommendation.drink}</strong>! ${recommendation.description}`;
    addBotMessage(response);
  }, 800);
}

// Send button click
sendBtn.addEventListener('click', handleMoodInput);

// Enter key press
moodInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleMoodInput();
  }
});

// Mood chip clicks
moodChips.forEach(chip => {
  chip.addEventListener('click', () => {
    const mood = chip.dataset.mood;
    moodInput.value = mood;
    handleMoodInput();
  });
});





// ===== CTA Button Actions =====
const ctaButtons = document.querySelectorAll('.hero-cta .btn');

ctaButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    if (button.textContent.includes('Menu')) {
      document.querySelector('#menu').scrollIntoView({ behavior: 'smooth' });
    } else if (button.textContent.includes('AI')) {
      document.querySelector('#ai-barista').scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => moodInput.focus(), 800);
    }
  });
});

// ===== Parallax Effect on Hero =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroVisual = document.querySelector('.hero-visual');
  
  if (heroVisual && scrolled < window.innerHeight) {
    heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// ===== Initialize =====
console.log('☁️ CloudBrew AI Coffee Shop - Initialized');
console.log('🤖 AI Barista ready to serve!');
