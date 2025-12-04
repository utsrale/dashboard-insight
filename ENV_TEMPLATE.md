# Firebase Configuration Template
# Copy this file to .env.local and fill in your actual Firebase credentials
# DO NOT commit .env.local to version control!

# Get these values from Firebase Console > Project Settings > General
# Your apps > Web app > SDK setup and configuration

NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Optional: Firebase Measurement ID for Analytics
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Instructions:
# 1. Create a Firebase project at https://console.firebase.google.com/
# 2. Enable Firestore Database and Authentication (Email/Password)
# 3. Go to Project Settings > General
# 4. Scroll down to "Your apps" section
# 5. Click on the web icon (</>) to create a web app
# 6. Copy the config values and paste them above
# 7. Save this file as .env.local (WITHOUT .template)
# 8. Never commit .env.local to Git
