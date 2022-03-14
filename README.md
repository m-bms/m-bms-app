# m-bms (Mermaid Battery Management System)

This is a cross-platform mobile app for the `m-bms`.

## Development

1. Install `npm` dependencies

   ```
   npm i
   ```

1. Run web development server

   ```
   npm run dev:web
   ```

   The app will be served on `localhost:3000`.

1. Develop on Android device (optional)

   ```
   npm run dev:android
   ```

   Then, select the device you want to install the APK to. Make sure to have your Android device connected via USB, and Debugging mode enabled. To set up environment requirements, please refer to https://capacitorjs.com/docs/getting-started/environment-setup.

   Normally, you only need to install the APK once, then it will listen to the host served via development server and reload on change. The host's url is auto-resolved in `capacitor.config.ts`; to use a custom one, set it with the environment variable `URL` (ex: `URL="192.168.0.123:1234"`) and manually run Capacitor (ex: `npx cap run android`).
