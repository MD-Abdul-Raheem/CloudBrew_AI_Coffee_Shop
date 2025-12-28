# ☕ CloudBrew – Serverless Coffee Ordering Platform (AWS)

CloudBrew is a fully serverless web application built on AWS that allows users to place and retrieve coffee orders through a static frontend integrated with cloud-native backend services.  
The project demonstrates real-world frontend–backend interaction, serverless architecture design, and AWS service integration without managing any servers.

![CloudBrew](https://img.shields.io/badge/CloudBrew-AI%20Coffee-8B4513?style=for-the-badge)
![AWS](https://img.shields.io/badge/AWS-Serverless-FF9900?style=for-the-badge&logo=amazon-aws)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 🚀 Live Architecture Overview

```
User Browser  
→ Static Website (Amazon S3)  
→ API Gateway (HTTP API)  
→ AWS Lambda (Business Logic)  
→ DynamoDB (Persistent Storage)  
→ CloudWatch (Monitoring & Logs)
```

---

## 🧱 AWS Services Used (Implemented)

- **Amazon S3**
  - Hosts the static frontend website (HTML, CSS, JavaScript)
  - Public read-only access for assets

- **Amazon API Gateway (HTTP API)**
  - Exposes REST endpoints:
    - `POST /order` – Place a new coffee order
    - `GET /order/{orderId}` – Fetch order details
  - Handles CORS configuration for browser-based requests

- **AWS Lambda**
  - `cloudbrew-create-order`: Processes incoming orders and stores them in DynamoDB
  - `cloudbrew-get-order`: Retrieves order details using orderId
  - Stateless, event-driven compute

- **Amazon DynamoDB**
  - Stores order records with attributes like:
    - orderId
    - item
    - quantity
    - status
    - createdAt
  - Low-latency, fully managed NoSQL database

- **Amazon CloudWatch**
  - Centralized logging for Lambda executions
  - Used for debugging, monitoring, and validation

- **AWS IAM**
  - Fine-grained permissions between Lambda, DynamoDB, and API Gateway

- **AWS Budgets**
  - Cost monitoring and alerts to stay within AWS Free Tier

---

## 🔄 Application Workflow

1. User opens the CloudBrew website hosted on Amazon S3
2. User selects coffee options and confirms the order
3. Frontend sends a `POST` request to API Gateway
4. API Gateway invokes the Lambda function
5. Lambda validates input and stores the order in DynamoDB
6. DynamoDB returns confirmation
7. Lambda responds with a unique `orderId`
8. User can retrieve order details via `GET /order/{orderId}`

---

## 📦 API Contract

### Place Order
**POST** `/order`

```json
{
  "name": "Abdul",
  "coffeeType": "Latte",
  "quantity": 1
}
```

**Response:**
```json
{
  "orderId": "abc123",
  "status": "confirmed",
  "message": "Order placed successfully"
}
```

### Get Order
**GET** `/order/{orderId}`

**Response:**
```json
{
  "orderId": "abc123",
  "name": "Abdul",
  "coffeeType": "Latte",
  "quantity": 1,
  "status": "confirmed",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

## 🚀 Features

### Landing Page
- **Premium Design** - Modern, futuristic UI with coffee-themed gradients
- **Responsive Layout** - Mobile-first design, works on all devices
- **Smooth Animations** - Scroll reveals, hover effects, parallax
- **Interactive AI Chatbot** - Mood-based coffee recommendations
- **Menu Showcase** - 6 premium coffee items with images

### Multi-Step Order System
- **5-Step Wizard** - Category → Customize → AI Mood → Info → Review
- **Smart Customization** - Size, milk type, sweetness, ice, espresso shots, add-ons
- **AI Personalization** - Mood-based drink optimization
- **Auto-Category Detection** - Pre-selects category when ordering from menu
- **Real-time Validation** - Form validation at each step
- **AWS Integration** - Orders sent to API Gateway + Lambda

## 🛠️ Tech Stack

**Frontend:**
- HTML5
- CSS3 (Custom design system with CSS variables)
- Vanilla JavaScript (ES6+)

**Backend:**
- AWS API Gateway
- AWS Lambda
- AWS DynamoDB (for order storage)

**Fonts:**
- Playfair Display (Display font)
- Inter (Body font)
- Orbitron (Tech/futuristic font)

## 📁 Project Structure

```
CloudBrew AI Coffee Shop/
├── index.html          # Main landing page
├── style.css           # Landing page styles
├── script.js           # Landing page interactions
├── order.css           # Order system styles
├── order.js            # Order system logic + API integration
├── assets/             # Images
│   ├── cappuccino.webp.webp
│   ├── espresso.webp.webp
│   ├── latte.webp.webp
│   ├── Mocha.webp.webp
│   ├── Iced.webp.webp
│   └── Matcha.webp.webp
└── README.md
```

## 🎨 Design System

### Colors
- **Primary:** `#8B4513` (Coffee Brown)
- **Accent:** `#D4AF37` (Gold)
- **Background:** `#1A1410` (Dark Brown)
- **Text:** `#FFFFFF` (White)

### Typography Scale
- Display: 2.4rem - 3.5rem
- Headings: 1.375rem - 2rem
- Body: 1rem - 1.125rem

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- AWS Account (for backend)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/cloudbrew-ai-coffee.git
cd cloudbrew-ai-coffee
```

2. **Open locally**
```bash
# Simply open index.html in your browser
# Or use a local server:
python -m http.server 8000
# Visit: http://localhost:8000
```

3. **Deploy to AWS S3 (Optional)**
```bash
# Create S3 bucket
aws s3 mb s3://cloudbrew-coffee-shop

# Upload files
aws s3 sync . s3://cloudbrew-coffee-shop --exclude ".git/*"

# Enable static website hosting
aws s3 website s3://cloudbrew-coffee-shop --index-document index.html
```

## 🔌 API Integration

The order system connects to AWS API Gateway:

**Endpoint:** `https://nh9mq2pqr2.execute-api.ap-south-1.amazonaws.com/order`

**Full Request Format:**
```json
{
  "name": "Customer Name",
  "phone": "123-456-7890",
  "coffeeType": "Latte - Medium",
  "customization": {
    "milk": "oat",
    "sweetness": 50,
    "ice": 30,
    "shots": 2,
    "addons": ["vanilla", "caramel"]
  },
  "mood": "energetic",
  "pickupTime": "30min",
  "orderNumber": 123456
}
```

## 📱 Features Breakdown

### Landing Page Sections
1. **Hero** - Animated coffee cup with steam effect
2. **Features** - 4 AI-powered features
3. **Menu** - 6 coffee items with hover effects
4. **AI Barista** - Interactive mood-based chatbot
5. **About** - Brand story
6. **Footer** - Links and social media

### Order System Steps
1. **Category Selection** - Coffee, Cold Brew, Latte, Tea, AI Signature
2. **Customization** - Full drink customization options
3. **AI Mood** - Energetic, Relaxing, Focus Mode
4. **Customer Info** - Name, phone, pickup time
5. **Review & Confirm** - Order summary with total price

## 🎯 Key Interactions

- **Mobile Navigation** - Hamburger menu with smooth transitions
- **Scroll Animations** - Elements reveal on scroll
- **AI Recommendations** - Dynamic suggestions based on mood
- **Order Validation** - Step-by-step form validation
- **Category Auto-Select** - Pre-fills category when ordering from menu
- **Success Animation** - Animated checkmark on order confirmation

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Coffee images from [Unsplash](https://unsplash.com)
- Fonts from [Google Fonts](https://fonts.google.com)
- Icons: Unicode emojis

## 🔮 Future Enhancements

- [ ] Payment integration (Stripe)
- [ ] User authentication
- [ ] Order history
- [ ] Real-time order tracking
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Multiple locations support

---

Made with ☕ and ☁️ by CloudBrew Team
