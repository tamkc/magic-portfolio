# **Peter Tam's Portfolio**

My personal portfolio website showcasing my work as a Fullstack Developer & GenAI Specialist.

Built with [Once UI](https://once-ui.com) Magic Portfolio for [Next.js](https://nextjs.org).

# **Tech Stack**

- **Framework:** Next.js 15 with React 19 and TypeScript
- **UI:** Once UI design system, Tailwind CSS, SCSS
- **Content:** MDX for blog posts and project pages
- **Animations:** Motion library, tsparticles
- **Forms:** Formspree integration for newsletter and contact
- **Deployment:** Static export via GitHub Pages (GitHub Actions CI/CD)

# **Sections**

| Page | Description |
|------|-------------|
| **Home** | Hero section, expertise highlights, featured projects, latest blog posts |
| **About** | Introduction, work experience, education, skills, and contact form |
| **Work** | Project showcases with detailed case studies |
| **Blog** | Articles on React, Next.js, GenAI, and more |
| **Gallery** | Masonry photo gallery with lightbox viewer |

# **Getting Started**

Requires Node.js v18.17+.

**1. Install dependencies**
```
npm install
```

**2. Run dev server**
```
npm run dev
```

**3. Build for production**
```
npm run build
```

# **Project Structure**

```
src/
├── app/
│   ├── resources/
│   │   ├── config.js        # Site configuration (routes, theme, effects)
│   │   └── content.js       # Personal info, social links, page content
│   ├── blog/posts/          # MDX blog posts
│   ├── work/projects/       # MDX project pages
│   ├── about/               # About page
│   └── gallery/             # Photo gallery page
├── components/              # React components
│   ├── home/                # Home page components
│   ├── blog/                # Blog components
│   ├── work/                # Work/project components
│   ├── about/               # About page components
│   └── gallery/             # Gallery components (masonry, lightbox)
└── once-ui/                 # Once UI design system
```

# **Configuration**

**Site settings** — `src/app/resources/config.js`
- Theme (dark/light), color scheme, visual effects
- Route visibility, password-protected pages

**Content** — `src/app/resources/content.js`
- Personal details, social links, work experience, education
- Newsletter and gallery settings

**Blog posts** — add `.mdx` files to `src/app/blog/posts/`

**Projects** — add `.mdx` files to `src/app/work/projects/`

# **Connect**

- GitHub: [tamkc](https://github.com/tamkc)
- LinkedIn: [Kam Chuen Tam](https://www.linkedin.com/in/kam-chuen-tam/)
- Email: tamkcatwork@gmail.com

# **Credits**

Built on [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) by [Once UI](https://once-ui.com).

# **License**

Distributed under the CC BY-NC 4.0 License. See `LICENSE.txt` for more information.