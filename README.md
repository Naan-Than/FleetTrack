🚚 FleetTrack – Real-Time Fleet Tracking & Geo-Clustering App

FleetTrack is a high-performance React Native application designed to simulate the behavior of production-grade fleet tracking platforms like Swiggy, Dunzo, Uber, etc.

The application displays 500+ delivery agents on a map, shows real-time driver movement, supports smart clustering, offline mode, and includes background location tracking using Android Headless JS

📦 Features
✅ Live Driver Simulation (Mock WebSocket)

Generates 500+ drivers

Updates positions every few seconds

Randomized active/idle/offline statuses

✅ Smart Geo-Clustering

High-performance region-based clustering

Smooth zoom-in to reveal individual markers

✅ Driver Details

Bottom sheet with:

Name

Status

Last location history

Simulated current speed

Polyline route drawing

Offline Mode

Detects network disconnection

Shows last-known driver positions from Redux + storage

Auto-resumes streaming when online

✅ Background Location Tracking (Android)

Kotlin foreground service

Headless JS task (BackgroundLocationTask)

Sends lat/long every 60 seconds.

🚀 Getting Started
📌 Prerequisite: React Native Environment Setup

Follow the official setup guide:
https://reactnative.dev/docs/set-up-your-environment
▶️ Step 1: Start Metro
npm start

📱 Step 2: Run the App
npm run android

🔧 Architecture Overview
Native Code (Android)
android/app/src/main/java/com/fleettrack/
├── LocationService.kt       # Foreground service for background tracking
├── LocationTask.kt          # Headless JS bridge
├── MainActivity.kt
└── MainApplication.kt

🌐 Real-Time Update Flow
MockWebSocket → useMockDriverSocket → MapView & Clusters → Redux Cache (Offline)

🛰 Background Tracking Flow (Android)
LocationService.kt (Foreground Service)
    ↓ sends location
LocationTask.kt (Headless JS)
    ↓ sends data to JS
BackgroundLocationTask.js


💡 Key Design Decisions
1️⃣ Manual Clustering Instead of Heavy Libraries

Better performance

More control over behavior

2️⃣ Offline-First Strategy

Store last-known drivers

Restore instantly during offline mode

3️⃣ Background Location in Kotlin

More reliable than JS-only solutions

Uses FusedLocationProviderClient

4️⃣ Clean Modular Structure

Easy for scaling and maintenance


📊 Performance Optimizations

Lightweight driver updates

Avoids unnecessary re-renders

Restricts location updates to 60s

🛠 Build a Release APK
cd android
./gradlew assembleRelease

🔮 Future Improvements

  Replace Mock WebSocket with Real Server
  
  Smooth Marker Animations
  
  Better Clustering
  
  SQLite Offline Storage
  
  Push Notifications
  
  iOS Background Tracking

 📷 Screenshots (Optional Section)
| ![login](https://github.com/user-attachments/assets/5a3570d2-51f2-4717-8696-1b3db8195c76) | ![home](https://github.com/user-attachments/assets/f95b4831-cc8b-409f-a82d-469a5580fce0) |
| --- | --- |
| ![mapview](https://github.com/user-attachments/assets/152ae801-dd32-4e1a-bc0b-c9901e1d853c) | ![drivers](https://github.com/user-attachments/assets/8dd88b9c-fc20-4176-8807-87c0b42f336b) |
| --- | --- |
| ![driverpolyline](https://github.com/user-attachments/assets/35d9440a-e479-4d0e-8482-fd4fc96b1f85) | ![offline](https://github.com/user-attachments/assets/48136d2a-d4c3-4011-9a1d-d3dffc662f2d) |
| --- | --- |






 

