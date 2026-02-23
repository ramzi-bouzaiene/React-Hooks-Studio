# React Hook Studio

A modern, interactive React Hooks learning and debugging playground built with React 18, TypeScript, and TailwindCSS.

![React Hook Studio Screenshot](./screenshots/preview.png)

## 🚀 Features

- **Interactive Hook Examples**: Hands-on learning with live, editable code examples
- **Monaco Editor Integration**: Full-featured code editor with TypeScript support
- **Render Counter**: Visualize component re-renders in real-time
- **Dark/Light Theme**: Beautiful UI with theme persistence
- **Strict Mode Toggle**: Test your hooks with React Strict Mode
- **Dependency Visualizer**: Understand useEffect dependencies
- **Memoization Demos**: See useMemo and useCallback in action
- **Context API Examples**: Learn state management with Context
- **Custom Hooks**: Build your own reusable hooks
- **Responsive Design**: Works on desktop and mobile devices

## 📸 Screenshots

| Light Mode | Dark Mode |
|------------|-----------|
| ![Light](./screenshots/light.png) | ![Dark](./screenshots/dark.png) |

## 🛠️ Tech Stack

- **Framework**: React 18+
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Editor**: Monaco Editor (@monaco-editor/react)
- **Routing**: React Router v6
- **Architecture**: Clean, modular component structure

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/react-hook-studio/react-hook-studio.git
cd react-hook-studio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
react-hook-studio/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── README.md
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── router.tsx
    ├── types/
    │   └── index.ts
    ├── data/
    │   └── hooksList.ts
    ├── components/
    │   ├── Layout.tsx
    │   ├── Sidebar.tsx
    │   ├── HookCard.tsx
    │   ├── CodeEditor.tsx
    │   ├── Preview.tsx
    │   └── RenderCounter.tsx
    ├── hooks/
    │   ├── useStatePlayground.tsx
    │   ├── useEffectPlayground.tsx
    │   ├── useReducerPlayground.tsx
    │   ├── useRefPlayground.tsx
    │   ├── useMemoPlayground.tsx
    │   ├── useCallbackPlayground.tsx
    │   └── useContextPlayground.tsx
    ├── context/
    │   └── ThemeContext.tsx
    └── styles/
        └── index.css
```

## 🎮 Available Hooks

| Hook | Description |
|------|-------------|
| useState | State management fundamentals |
| useEffect | Side effects and cleanup |
| useReducer | Complex state logic |
| useRef | DOM references and mutable values |
| useMemo | Expensive computation memoization |
| useCallback | Function memoization |
| useContext | Context consumption |

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📝 Code Style

- TypeScript strict mode enabled
- No `any` types
- ESLint configuration included
- Prettier-compatible formatting
- TailwindCSS for styling (no inline styles)

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)
- Environment details

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 React Hooks Studio Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- React Team for the amazing hooks API
- Monaco Editor team for the powerful editor
- TailwindCSS team for the utility-first CSS framework
- All contributors who help improve this project

---

Made with ❤️ by the React Hooks Studio community
