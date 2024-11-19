// firebaseAuthUiConfig.ts
import { GoogleAuthProvider } from "firebase/auth";

const uiConfig: firebaseui.auth.Config = {
  signInFlow: "popup",
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    // Add other providers here
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

export default uiConfig;

// interface UiConfig {
//     signInFlow: string;
//     signInSuccessUrl: string;
//     tosUrl: string;
//     privacyPolicyUrl: string;
//     signInOptions: string[];
// }

// export const uiConfig = (firebase: any): UiConfig => {
//     return {
//         signInFlow: 'popup',
//         signInSuccessUrl: '/',
//         tosUrl: '/terms-of-service',
//         privacyPolicyUrl: '/privacy-policy',
//         signInOptions: [
//             firebase.auth.GoogleAuthProvider.PROVIDER_ID
//         ]
//     }
// }