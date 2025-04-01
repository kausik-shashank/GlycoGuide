# GlycoGuide

GlycoGuide is a diabetes management platform designed to help users monitor their food intake by analyzing ingredients and nutritional information. The platform provides recommendations on portion sizes and suitability, enabling users to make informed dietary decisions.

## Features

- **Food Item Scanning**: Users can scan food items using image recognition for quick dietary assessments.
- **Personalized Feedback**: Provides tailored recommendations based on nutritional analysis.
- **Blood Sugar Tracking**: Users can log and track their blood sugar levels over time with visual graphs.
- **Dietary Insights**: Suggests appropriate portion sizes and food choices based on dietary needs.

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: HTML, CSS, JavaScript
- **AI Integration**: Gemini API for image recognition and analysis
- **Authentication & Security**: JSON Web Tokens (JWT), Cookie Parser
- **File Handling**: Multer for image uploads

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/kausik-shashank/GlycoGuide.git
   cd GlycoGuide
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure the required environment variables.
4. Start the server:
   ```sh
   npm run dev
   ```

## Usage

- Open the application in your browser.
- Scan food items to receive dietary assessments.
- Log and track blood sugar levels.
- Receive personalized dietary feedback.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue.

## License

This project is licensed under the ISC License.
