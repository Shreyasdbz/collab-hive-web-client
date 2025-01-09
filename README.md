# CollabHive Web Client

Welcome to the **CollabHive Web Client** repository! This project powers the front-end of the CollabHive platform, enabling users to discover and collaborate on exciting projects with developers, designers, and other roles in the tech community.

## 🚀 **About the Project**

CollabHive Web Client is a modern, responsive, and intuitive web application built with cutting-edge technologies. It allows creators to post their projects, manage collaborations, and interact with contributors. Collaborators can discover projects, join teams, and grow their skills by working on real-world ideas.

## 🛠️ **Technologies Used**

- **Framework**: [Next.js](https://nextjs.org/) (React Framework for Server-Side Rendering and Static Site Generation)
- **Authentication**: [Supabase Auth](https://supabase.com/)
- **UI Components**: [ShadCN UI](https://shadcn.dev/) (based on Tailwind CSS)
- **Data Fetching**: [@tanstack/react-query](https://tanstack.com/query) (for efficient API queries and caching)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **State Management**: React Context for lightweight state handling

---

## 📂 **Folder Structure**

Here's an overview of the main folders and their purpose:

```
src/
├── app/                 # Application routes
│   ├── about/           # About page
│   ├── api/             # API-related pages
│   ├── dashboard/       # User dashboard pages
│   ├── profile/         # Profile-related pages
│   │   ├── [profileId]/ # Dynamic profile routing
│   │   ├── edit/        # Profile editing functionality
│   ├── projects/        # Project-related pages
│   │   ├── [projectId]/ # Dynamic project details routing
│   │   ├── edit-details/ # Editing project details
│   ├── sign-in/         # User sign-in page
│   └── page.tsx         # Main app entry point
├── components/          # Reusable React components
│   ├── common/          # Shared/common UI elements
│   ├── layout/          # Layout components
│   ├── pages/           # Page-specific components
│   ├── ui/              # UI components (ShadCN-based)
├── hooks/               # Custom React hooks
│   ├── mutations/       # React-query mutations
│   ├── queries/         # React-query queries
│   └── use-toast.ts     # Toast notifications
├── lib/                 # Library utilities and configurations
│   ├── supabase/        # Supabase client and helpers
│   └── axios.ts         # Axios instance for HTTP requests
├── models/              # TypeScript models and interfaces
├── providers/           # React Context providers
│   ├── projects-search-provider.tsx # Project search context
│   ├── QueryProvider.tsx  # React-query setup provider
│   └── UserProvider.tsx   # User authentication context
├── utils/               # Utility functions
├── globals.css          # Global styles
├── layout.tsx           # App-wide layout configuration
├── theme-switcher.client.tsx # Theme toggler for dark/light mode
```

---

## ✨ **Features**

### 🌟 For Creators

- Post projects with detailed specifications like required skills, roles, and complexity.
- Manage collaboration requests and active team members.
- Update project details with a streamlined editing interface.

### 🌟 For Collaborators

- Browse projects by technology stack, role, or popularity.
- Join projects with personalized messages.
- Favorite projects and revisit them anytime.

### 🔧 Core Functionalities

- **Dynamic Routing**: View profiles and projects using dynamic Next.js routes.
- **Efficient Data Fetching**: React Query ensures smooth, performant interactions.
- **Authentication**: Secure and seamless user authentication powered by Supabase.
- **Responsive Design**: Built with Tailwind CSS for a beautiful and consistent UI across devices.
- **State Management**: Context providers simplify managing user and project state.

---

## 📦 **Installation and Setup**

1. Clone the repository:

   ```bash
   git clone https://github.com/Shreyasdbz/collab-hive-web-client.git
   cd collab-hive-web-client
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Create a `.env` file using the provided `.env.example` file. Fill in the required variables, such as:

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Run the development server:

   ```bash
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

---

## 🛡️ **Code Quality and Linting**

- ESLint is configured for code quality checks:

  ```bash
  yarn lint
  ```

- Prettier is used for code formatting:
  ```bash
  yarn format
  ```

---

## 🤝 **Contributing**

We welcome contributions to improve the CollabHive Web Client! Here's how you can get involved:

- Report issues and suggest features using the [Issues tab](https://github.com/Shreyasdbz/collab-hive-web-client/issues).
- Fork the repository and submit pull requests for bug fixes or enhancements.
- Check out the [roadmap](https://github.com/users/Shreyasdbz/projects/6) for planned features.

---

## 📜 **License**

This project is licensed under the [MIT License](LICENSE).

---

## 📧 **Contact**

Follow the creator, Shreyas Sane:

- **GitHub**: [@shreyasdbz](https://github.com/shreyasdbz)
- **LinkedIn**: [shreyassane](https://www.linkedin.com/in/shreyassane)
- **Instagram**: [itShreyas](https://instagram.com/itShreyas)
- **YouTube**: [shreyasdbz](https://www.youtube.com/shreyasdbz)

Let’s collaborate and bring amazing ideas to life with CollabHive! 🎉
