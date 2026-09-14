# Dicoding Forum App (React + Redux + Automation Testing + CI/CD)

Proyek submission akhir untuk kelas **"Menjadi React Web Developer Expert"** di Dicoding Academy. Aplikasi ini menerapkan arsitektur React modern, Redux Toolkit, Automation Testing komprehensif (Unit, Thunk, Component, dan E2E), integrasi CI/CD dengan GitHub Actions dan Vercel, serta React Ecosystem (Storybook).

---

## 🚀 Fitur & Pemenuhan Seluruh Kriteria Submission (Target: 5 Bintang ⭐⭐⭐⭐⭐)

### 1. Kriteria Utama 1: Automation Testing
- **Pengujian Fungsi Reducer (> 3 Reducer)**:
  - `authUserReducer` (`src/states/authUser/reducer.test.js`)
  - `threadsReducer` (`src/states/threads/reducer.test.js`)
  - `detailThreadReducer` (`src/states/detailThread/reducer.test.js`)
  - `leaderboardsReducer` (`src/states/leaderboards/reducer.test.js`)
  - `isPreloadReducer` (`src/states/isPreload/reducer.test.js`)
  - `filterCategoryReducer` (`src/states/filterCategory/reducer.test.js`)
  - `usersReducer` (`src/states/users/reducer.test.js`)
- **Pengujian Thunk Function (> 3 Thunks)**:
  - `asyncPopulateUsersAndThreads` (`src/states/shared/action.test.js`)
  - `asyncSetAuthUser`, `asyncUnsetAuthUser`, `asyncRegisterUser` (`src/states/authUser/action.test.js`)
  - `asyncReceiveThreads`, `asyncAddThread`, `asyncToggleUpVoteThread`, `asyncToggleDownVoteThread` (`src/states/threads/action.test.js`)
  - `asyncReceiveLeaderboards` (`src/states/leaderboards/action.test.js`)
  - `asyncPreloadProcess` (`src/states/isPreload/action.test.js`)
- **Pengujian React Component (> 3 Component Tests)**:
  - `LoginInput` (`src/components/auth/LoginInput.test.jsx`)
  - `RegisterInput` (`src/components/auth/RegisterInput.test.jsx`)
  - `ThreadItem` (`src/components/threads/ThreadItem.test.jsx`)
  - `CommentInput` (`src/components/comments/CommentInput.test.jsx`)
  - `LeaderboardItem` (`src/components/leaderboards/LeaderboardItem.test.jsx`)
  - `VoteButtons` (`src/components/votes/VoteButtons.test.jsx`)
- **Pengujian End-to-End (E2E)**:
  - Alur Login (`cypress/e2e/login.cy.js`)
  - Alur Beranda & Filter Kategori (`cypress/e2e/homepage.cy.js`)
- **Skenario Pengujian**: Setiap berkas pengujian wajib dan telah dilengkapi deskripsi skenario pengujian di bagian atas berkas.

---

### 2. Kriteria Utama 2: CI/CD & Deployment
- **Continuous Integration (CI)**: GitHub Actions workflow (`.github/workflows/ci.yml`) yang menjalankan:
  1. Pengecekan Linting (`npm run lint`)
  2. Pengujian Unit & Komponen (`npm run test:run`)
  3. Validasi Build Produksi (`npm run build`)
  4. Validasi Build Storybook (`npm run build-storybook`)
  5. Pengujian E2E Cypress
- **Continuous Deployment (CD)**: Terintegrasi dengan **Vercel** (`vercel.json`) untuk automated deployment setiap ada push/merge ke branch utama.
- **Branch Protection**: Proteksi branch `main` / `master` (Require pull request reviews & require status checks before merging).
- **Bukti Konfigurasi CI/CD & Branch Protection**:
  - `ci_cd_screenshots/1_ci_check_error.png`
  - `ci_cd_screenshots/2_ci_check_pass.png`
  - `ci_cd_screenshots/3_branch_protection.png`

---

### 3. Kriteria Utama 3 & Saran: React Ecosystem (Storybook)
Memanfaatkan **Storybook** (React Tools dari awesome-react-ecosystem) dengan lebih dari 2 stories komponen:
- `src/stories/LoginInput.stories.jsx`
- `src/stories/RegisterInput.stories.jsx`
- `src/stories/ThreadItem.stories.jsx`
- `src/stories/LeaderboardItem.stories.jsx`
- `src/stories/VoteButtons.stories.jsx`

---

### 4. Mempertahankan Kriteria Submission Sebelumnya
- **Fitur Votes (Optimistic UI)** pada Thread dan Komentar.
- **Halaman Leaderboard** dan ranking widget.
- **Filter Kategori Thread** dan pencarian instan.
- **Desain UI/UX Menarik, Modern, dan Responsif** dengan palet warna kontras dan navigasi yang mudah.

---

## 📁 Struktur Proyek

```text
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI Workflow
├── .storybook/                  # Storybook Configuration
│   ├── main.js
│   └── preview.jsx
├── ci_cd_screenshots/           # Bukti Screenshot CI & Branch Protection
├── cypress/                     # End-to-End Testing (Cypress)
│   ├── e2e/
│   │   ├── homepage.cy.js
│   │   └── login.cy.js
│   └── support/
├── src/
│   ├── components/              # Komponen UI modular
│   │   ├── auth/                # LoginInput, RegisterInput (+ tests)
│   │   ├── comments/            # CommentInput (+ test), CommentItem, CommentList
│   │   ├── common/              # LoadingBar
│   │   ├── layout/              # Header, Sidebar
│   │   ├── leaderboards/        # LeaderboardItem (+ test), LeaderboardList
│   │   ├── threads/             # ThreadItem (+ test), ThreadList, CategoryChips
│   │   └── votes/               # VoteButtons (+ test)
│   ├── hooks/                   # useInput
│   ├── pages/                   # Views (HomePage, DetailPage, LeaderboardsPage, dll.)
│   ├── states/                  # Redux States, Reducers, Actions, Thunks (+ tests)
│   ├── stories/                 # Storybook Component Stories
│   ├── utils/                   # api.js & helper utils
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── setupTests.js            # Testing library setup
├── cypress.config.js
├── package.json
├── vercel.json                  # Vercel SPA Routing Configuration
└── vite.config.js               # Vite & Vitest Configuration
```

---

## 🛠️ Perintah Menjalankan Proyek & Pengujian

1. **Instal Dependensi**:
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Jalankan Aplikasi (Development Server)**:
   ```bash
   npm run dev
   ```

3. **Jalankan Pengecekan Lint**:
   ```bash
   npm run lint
   ```

4. **Jalankan Pengujian Unit & Komponen (Vitest)**:
   ```bash
   npm test
   # Atau mode sekali jalan (CI):
   npm run test:run
   ```

5. **Jalankan Pengujian End-to-End (Cypress)**:
   ```bash
   npm run e2e
   # Atau buka UI Cypress:
   npm run e2e:open
   ```

6. **Jalankan Storybook**:
   ```bash
   npm run storybook
   # Atau build static storybook:
   npm run build-storybook
   ```

7. **Build Aplikasi untuk Produksi**:
   ```bash
   npm run build
   ```
