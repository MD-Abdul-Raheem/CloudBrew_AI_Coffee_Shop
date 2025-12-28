// CloudBrew Order System - Interactive JavaScript

// Order data object
const orderData = {
  category: '',
  size: 'medium',
  milk: 'whole',
  sweetness: 50,
  ice: 50,
  shots: 2,
  addons: [],
  mood: '',
  name: '',
  phone: '',
  pickupTime: '',
  basePrice: 5.99
};

// Current step
let currentStep = 1;
const totalSteps = 5;

// Elements
const progressFill = document.getElementById('progressFill');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const confirmBtn = document.getElementById('confirmBtn');
const steps = document.querySelectorAll('.step');
const stepContents = document.querySelectorAll('.step-content');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeStep1();
  initializeStep2();
  initializeStep3();
  initializeStep4();
  updateProgress();
});

// Step 1: Category Selection
function initializeStep1() {
  const categoryCards = document.querySelectorAll('.category-card');
  
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      categoryCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      orderData.category = card.dataset.category;
    });
  });
}

// Step 2: Customization
function initializeStep2() {
  // Size and Milk buttons
  const optionBtns = document.querySelectorAll('.option-btn');
  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const option = btn.dataset.option;
      const value = btn.dataset.value;
      
      // Remove active from siblings
      document.querySelectorAll(`[data-option="${option}"]`).forEach(b => {
        b.classList.remove('active');
      });
      
      btn.classList.add('active');
      orderData[option] = value;
    });
  });

  // Sweetness slider
  const sweetnessSlider = document.getElementById('sweetness');
  const sweetnessValue = document.getElementById('sweetnessValue');
  
  sweetnessSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    sweetnessValue.textContent = `${value}%`;
    orderData.sweetness = parseInt(value);
  });

  // Ice slider
  const iceSlider = document.getElementById('ice');
  const iceValue = document.getElementById('iceValue');
  
  iceSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    iceValue.textContent = `${value}%`;
    orderData.ice = parseInt(value);
  });

  // Espresso shots counter
  const decreaseBtn = document.getElementById('decreaseShots');
  const increaseBtn = document.getElementById('increaseShots');
  const shotsValue = document.getElementById('shotsValue');
  
  decreaseBtn.addEventListener('click', () => {
    if (orderData.shots > 0) {
      orderData.shots--;
      shotsValue.textContent = orderData.shots;
    }
  });
  
  increaseBtn.addEventListener('click', () => {
    if (orderData.shots < 5) {
      orderData.shots++;
      shotsValue.textContent = orderData.shots;
    }
  });

  // Add-ons checkboxes
  const addonCheckboxes = document.querySelectorAll('[data-addon]');
  addonCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const addon = e.target.dataset.addon;
      const price = parseFloat(e.target.dataset.price);
      
      if (e.target.checked) {
        orderData.addons.push({ name: addon, price: price });
      } else {
        orderData.addons = orderData.addons.filter(a => a.name !== addon);
      }
    });
  });
}

// Step 3: AI Mood Selection
function initializeStep3() {
  const moodCards = document.querySelectorAll('.mood-card');
  const aiRecommendation = document.getElementById('aiRecommendation');
  const recommendationContent = document.getElementById('recommendationContent');
  
  const recommendations = {
    energetic: {
      text: 'Extra espresso shot, less sweetness, and a hint of vanilla for sustained energy.',
      adjustments: { shots: 3, sweetness: 30 }
    },
    relaxing: {
      text: 'Reduced caffeine, extra sweetness, and caramel for a soothing experience.',
      adjustments: { shots: 1, sweetness: 70 }
    },
    focus: {
      text: 'Balanced caffeine, medium sweetness, and mocha for enhanced concentration.',
      adjustments: { shots: 2, sweetness: 50 }
    }
  };
  
  moodCards.forEach(card => {
    card.addEventListener('click', () => {
      moodCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      
      const mood = card.dataset.mood;
      orderData.mood = mood;
      
      // Show AI recommendation
      const rec = recommendations[mood];
      recommendationContent.innerHTML = `<p>${rec.text}</p>`;
      aiRecommendation.style.display = 'block';
      
      // Apply AI adjustments
      orderData.shots = rec.adjustments.shots;
      orderData.sweetness = rec.adjustments.sweetness;
      
      // Update UI
      document.getElementById('shotsValue').textContent = orderData.shots;
      document.getElementById('sweetness').value = orderData.sweetness;
      document.getElementById('sweetnessValue').textContent = `${orderData.sweetness}%`;
    });
  });
}

// Step 4: Customer Info
function initializeStep4() {
  const nameInput = document.getElementById('customerName');
  const phoneInput = document.getElementById('customerPhone');
  const pickupSelect = document.getElementById('pickupTime');
  
  nameInput.addEventListener('input', (e) => {
    orderData.name = e.target.value;
  });
  
  phoneInput.addEventListener('input', (e) => {
    orderData.phone = e.target.value;
  });
  
  pickupSelect.addEventListener('change', (e) => {
    orderData.pickupTime = e.target.value;
  });
}

// Validation
function validateStep(step) {
  const nameError = document.getElementById('nameError');
  const timeError = document.getElementById('timeError');
  
  // Clear errors
  if (nameError) nameError.textContent = '';
  if (timeError) timeError.textContent = '';
  
  switch(step) {
    case 1:
      if (!orderData.category) {
        alert('Please select a drink category');
        return false;
      }
      return true;
      
    case 2:
      return true; // All have defaults
      
    case 3:
      if (!orderData.mood) {
        alert('Please select your mood');
        return false;
      }
      return true;
      
    case 4:
      let valid = true;
      
      if (!orderData.name.trim()) {
        nameError.textContent = 'Name is required';
        valid = false;
      }
      
      if (!orderData.pickupTime) {
        timeError.textContent = 'Please select a pickup time';
        valid = false;
      }
      
      return valid;
      
    default:
      return true;
  }
}

// Navigation
nextBtn.addEventListener('click', () => {
  if (validateStep(currentStep)) {
    if (currentStep < totalSteps) {
      currentStep++;
      updateStep();
    }
  }
});

prevBtn.addEventListener('click', () => {
  if (currentStep > 1) {
    currentStep--;
    updateStep();
  }
});

confirmBtn.addEventListener('click', () => {
  confirmOrder();
});

// Update step display
function updateStep() {
  // Update step content
  stepContents.forEach((content, index) => {
    content.classList.remove('active');
    if (index + 1 === currentStep) {
      content.classList.add('active');
    }
  });
  
  // Update progress steps
  steps.forEach((step, index) => {
    step.classList.remove('active');
    if (index + 1 <= currentStep) {
      step.classList.add('active');
    }
  });
  
  // Update progress bar
  updateProgress();
  
  // Update buttons
  updateButtons();
  
  // Populate review if on step 5
  if (currentStep === 5) {
    populateReview();
  }
}

function updateProgress() {
  const progress = (currentStep / totalSteps) * 100;
  progressFill.style.width = `${progress}%`;
}

function updateButtons() {
  // Previous button
  if (currentStep === 1) {
    prevBtn.style.display = 'none';
  } else {
    prevBtn.style.display = 'inline-block';
  }
  
  // Next/Confirm buttons
  if (currentStep === totalSteps) {
    nextBtn.style.display = 'none';
    confirmBtn.style.display = 'inline-block';
  } else {
    nextBtn.style.display = 'inline-block';
    confirmBtn.style.display = 'none';
  }
}

// Populate review
function populateReview() {
  document.getElementById('reviewCategory').textContent = formatText(orderData.category);
  document.getElementById('reviewSize').textContent = formatText(orderData.size);
  document.getElementById('reviewMilk').textContent = formatText(orderData.milk);
  document.getElementById('reviewSweetness').textContent = `${orderData.sweetness}%`;
  document.getElementById('reviewIce').textContent = `${orderData.ice}%`;
  document.getElementById('reviewShots').textContent = orderData.shots;
  
  const addonsText = orderData.addons.length > 0 
    ? orderData.addons.map(a => formatText(a.name)).join(', ')
    : 'None';
  document.getElementById('reviewAddons').textContent = addonsText;
  
  document.getElementById('reviewMood').textContent = formatText(orderData.mood);
  document.getElementById('reviewName').textContent = orderData.name;
  document.getElementById('reviewPhone').textContent = orderData.phone || 'Not provided';
  document.getElementById('reviewPickup').textContent = formatPickupTime(orderData.pickupTime);
  
  // Calculate total
  let total = orderData.basePrice;
  
  // Size pricing
  if (orderData.size === 'medium') total += 1;
  if (orderData.size === 'large') total += 2;
  
  // Add-ons
  orderData.addons.forEach(addon => {
    total += addon.price;
  });
  
  document.getElementById('totalPrice').textContent = `$${total.toFixed(2)}`;
}

// Confirm order
async function confirmOrder() {
  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  
  // Prepare order payload for API
  const orderPayload = {
    name: orderData.name,
    phone: orderData.phone || 'Not provided',
    coffeeType: `${formatText(orderData.category)} - ${formatText(orderData.size)}`,
    customization: {
      milk: orderData.milk,
      sweetness: orderData.sweetness,
      ice: orderData.ice,
      shots: orderData.shots,
      addons: orderData.addons.map(a => a.name)
    },
    mood: orderData.mood,
    pickupTime: orderData.pickupTime,
    orderNumber: orderNumber
  };
  
  console.log('=== ORDER CONFIRMED ===');
  console.log(JSON.stringify(orderPayload, null, 2));
  
  try {
    // Call API Gateway
    const response = await fetch(
      'https://nh9mq2pqr2.execute-api.ap-south-1.amazonaws.com/order',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderPayload)
      }
    );
    
    const data = await response.json();
    console.log('API Response:', data);
    
    // Show success screen
    document.getElementById('step5').classList.remove('active');
    document.getElementById('stepSuccess').style.display = 'block';
    document.getElementById('orderNumber').textContent = data.orderId || orderNumber;
    document.querySelector('.nav-buttons').style.display = 'none';
    progressFill.style.width = '100%';
  } catch (error) {
    console.error('Order submission error:', error);
    // Still show success screen with local order number
    document.getElementById('step5').classList.remove('active');
    document.getElementById('stepSuccess').style.display = 'block';
    document.getElementById('orderNumber').textContent = orderNumber;
    document.querySelector('.nav-buttons').style.display = 'none';
    progressFill.style.width = '100%';
  }
}

// Helper functions
function formatText(text) {
  return text
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatPickupTime(time) {
  const times = {
    'asap': 'ASAP (15 min)',
    '30min': '30 minutes',
    '1hour': '1 hour',
    '2hours': '2 hours',
    'custom': 'Custom time'
  };
  return times[time] || time;
}

// Order System Functions
function openOrderSystem(category = null) {
  document.getElementById('orderOverlay').style.display = 'block';
  document.body.style.overflow = 'hidden';
  
  // Auto-select category if provided
  if (category) {
    orderData.category = category;
    setTimeout(() => {
      const categoryCard = document.querySelector(`[data-category="${category}"]`);
      if (categoryCard) {
        document.querySelectorAll('.category-card').forEach(c => c.classList.remove('selected'));
        categoryCard.classList.add('selected');
      }
    }, 100);
  }
}

function closeOrderSystem() {
  document.getElementById('orderOverlay').style.display = 'none';
  document.body.style.overflow = 'auto';
  location.reload();
}

window.closeOrderSystem = closeOrderSystem;

// Connect order buttons
setTimeout(() => {
  document.getElementById('closeOrder')?.addEventListener('click', closeOrderSystem);
  
  // Menu order buttons with category detection
  document.querySelectorAll('.btn-order').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const category = btn.dataset.drinkCategory;
      openOrderSystem(category);
    });
  });
  
  // Other order buttons without category
  document.querySelectorAll('.primary-cta, .nav-cta').forEach(btn => {
    if (!btn.classList.contains('btn-order')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openOrderSystem();
      });
    }
  });
}, 500);
