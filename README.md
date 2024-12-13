# EvenTNi Web App

Welcome to the **EvenTNi Event Management Web App** repository! This application is designed to streamline event organization and participation, offering features similar to Eventbrite and Meetup, with advanced tools for event creation, management, and discovery.

## 🚀 Features

- **User Authentication**: Secure user authentication with Clerk.
- **Event Creation and Management**: Create, edit, and manage events effortlessly.
- **Advanced Search and Filtering**: Easily discover events using filters and categories.
- **Categorized Events**: Browse events organized into categories for better user experience.
- **File Uploads**: Seamlessly upload files and media using Uploadthing.
- **Secure Payments**: Handle event ticket payments securely using Stripe.

## 🛠️ Tech Stack

The application leverages modern technologies:

- **Frontend**: Next.js 14, Tailwind CSS, Shadcn
- **Backend**: Node.js
- **Forms and Validation**: React Hook Form, Zod
- **File Uploads**: Uploadthing
- **Database**: Mongoose (MongoDB)
- **Authentication**: Clerk
- **Payments**: Stripe

## 🚧 Project Status

This project is **work in progress**:
- Currently redesigning the frontend for an improved user interface.
- Adding new functionalities, including advanced filtering options, event recommendations & AI 😉.

## 🛠️ Installation

1. Clone the repository:

```bash
$ git clone https://github.com/AmineZhioua/eventni.git
```

2. Navigate to the project directory:

```bash
$ cd event-management-app
```

3. Install dependencies:

```bash
$ npm install
```

4. Configure environment variables in ````bash
NEXT_PUBLIC_SERVER_URL=

#CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_CLERK_WEBHOOK_SECRET=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

#MONGODB
MONGODB_URI=

#UPLOADTHING
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

#STRIPE
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY```

5. Start the development server:

```bash
$ npm run dev
```

Thank you for checking out the Event Management Web App repository! 🎉
