# HeartSync - Relationship Management Application

HeartSync is a comprehensive relationship management application that helps users track, analyze, and improve their relationships through AI-powered insights, compatibility testing, and goal tracking.

## Features

- **User Authentication**
  - Secure login and signup
  - Profile management with customizable settings
  - Dark mode support

- **Relationship Management**
  - Add and track multiple relationships
  - Categorize relationships (Romantic, Friendship, Family, Professional)
  - Attach files and notes to relationship entries
  - Track relationship timeline and milestones

- **AI Insights**
  - Get AI-powered relationship analysis
  - Receive personalized advice and recommendations
  - Track relationship health metrics
  - Identify potential issues early

- **Compatibility Testing**
  - Take comprehensive compatibility tests
  - Compare personality traits and preferences
  - Get detailed compatibility scores and analysis
  - Receive suggestions for improvement

- **Reports & Analytics**
  - Generate detailed relationship reports
  - Export data in CSV or PDF format
  - Track relationship patterns and trends
  - View success metrics and statistics

- **Goal Tracking**
  - Set relationship improvement goals
  - Track progress towards goals
  - Get reminders and notifications
  - Celebrate achievements

## Technology Stack

- **Frontend**
  - React.js
  - Material-UI (MUI)
  - React Router
  - Axios
  - React-Toastify
  - Date-fns
  - Tailwind CSS

## Getting Started

1. **Prerequisites**
   - Node.js (v14 or higher)
   - npm (v6 or higher)

2. **Installation**
   ```bash
   # Clone the repository
   git clone https://github.com/yourusername/heartsync.git

   # Navigate to the client directory
   cd HeartSync/client

   # Install dependencies
   npm install

   # Start the development server
   npm start
   ```

3. **Environment Variables**
   Create a `.env` file in the client directory with the following variables:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

## Project Structure

```
HeartSync/client/
├── public/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   └── SignUp.js
│   │   ├── Relationships/
│   │   │   ├── AddRelationship.js
│   │   │   ├── EditRelationship.js
│   │   │   └── RelationshipList.js
│   │   ├── Insights/
│   │   │   └── AIInsights.js
│   │   ├── Compatibility/
│   │   │   └── CompatibilityTest.js
│   │   ├── Reports/
│   │   │   └── RelationshipReport.js
│   │   ├── Goals/
│   │   │   └── GoalTracker.js
│   │   ├── Dashboard.js
│   │   ├── NavBar.js
│   │   └── ProfileSettings.js
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── ErrorBoundary.js
│   ├── App.js
│   ├── index.js
│   └── theme.js
└── package.json
```

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the component library
- React team for the amazing framework
- All contributors who help improve HeartSync

## Support

For support, email lironbrown162@gmail.com or join our Slack channel.

## Donations

If you find this project helpful and would like to support its development, please consider making a donation. Your support is greatly appreciated!

- **PayPal**: [Donate via PayPal](https://www.paypal.com/donate?hosted_button_id=XXXXXX)

