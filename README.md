# Secure Shell - Microservice

A plug-and-play authentication microservice built with Supabase and OAuth, supporting multiple providers, custom theming, and project-based access control. Easily integrable into other apps for secure, scalable user login and signup functionality.

## Key Features

- **Intuitive Interface**: Using `ShadCN/UI` with Next.js `15.3.2` to build a mobile-friendly and visually appealing user interface that enhances usability and user engagement.

- **Toast Notifications**: Real-time feedback powered by `react-hot-toast` enhances UX with clear and elegant messaging.

- **Iconography**: Enhances UI clarity and visual appeal using `lucide-react` Icons for consistent, modern icon design.

- **Secure Authentication Flow**: Powered by Supabase Authentication for seamless and secure login/signup experiences.

- **Session Management**: Handles user sessions effectively through Supabase, with secure logout and `localStorage` for persistent state.

- **Magic Link Login**: Passwordless login using Supabase Magic Links.

- **Email Verification**: Ensures onboarding integrity with email confirmation flow.

- **Modular & Reusable**: Designed as a microservice for seamless integration in other projects.

## SCREENSHOTS

1. Signup
   ![Signup-Page-Screenshot](https://ccoxmajldrrpzqgsgufo.supabase.co/storage/v1/object/public/readme-assets//signup-page.png)
2. Verify-Email
   ![Verify-Email-Screenshot](https://ccoxmajldrrpzqgsgufo.supabase.co/storage/v1/object/public/readme-assets//verify-email-page.png)
3. Login
   ![Login-Page-Screenshot](https://ccoxmajldrrpzqgsgufo.supabase.co/storage/v1/object/public/readme-assets//login-page.png)
4. Password-Recovery
   ![Password-Recovery-Screenshot](https://ccoxmajldrrpzqgsgufo.supabase.co/storage/v1/object/public/readme-assets//password-recovery.png)
5. Signup Error
   ![Signup Error](https://ccoxmajldrrpzqgsgufo.supabase.co/storage/v1/object/public/readme-assets//signup-page-error.png)

## Installation

To get started with Secure Shell, follow these steps:

1. Clone the repository:
   ```bash
   git clone git@github.com:eddyseed/Secure-Shell.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Secure-Shell
   ```
3. Install dependencies:
   ```bash
   yarn install
   ```
4. Set up environment variables: - Edit the `.env.sample` file in the root directory. - Add the required Supabase and OAuth credentials as specified in the documentation. 
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
PUBLIC_BASE_URI=

NEXT_DISABLE_DEVTOOLS=true


NEXT_PUBLIC_APP_NAME=

#eg github,google
NEXT_PUBLIC_AUTH_PROVIDERS=

NEXT_SIGNUP_PAGE_IMAGELINK=
```

5. Run the development server:
`bash
    yarn run dev
    ` 6. Open your browser and navigate to `http://localhost:3000` to view the app.

For production deployment, refer to the [Next.js Deployment Documentation](https://nextjs.org/docs/deployment).

## Tech Stack & References

- **Framework**: `Next.js`
  https://nextjs.org/docs/app/getting-started/installation
- **Auth Provider**: `Supabase Auth`
  https://supabase.com/auth
- **UI Library**: `ShadCN/UI`
  https://ui.shadcn.com/docs/installation/next
- **Icons**: `Lucide React`
  https://lucide.dev/icons/
- **Notifications**: `react-hot-toast`
  https://react-hot-toast.com/
