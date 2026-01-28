import { InlineCode } from "@/once-ui/components";
import Link from "next/link";

const person = {
  firstName: "Peter",
  lastName: "Tam",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "FullStack Developer",
  avatar: "/images/avatar.avif",
  location: "Canada/Toronto",
  languages: ["English", "Cantonese", "Mandarin"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: false, // Disabled for static export (GitHub Pages)
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the
      intersection of creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/tamkc",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/kam-chuen-tam/",
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:tamkcatwork@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Fullstack Engineer & GenAI Specialist</>,
  subline: (
    <>
      I'm Peter Tam, a Full Stack Developer at{" "}
      <InlineCode>
        <Link
          href="https://www.doglastrading.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Doglas Trading Inc.
        </Link>
      </InlineCode>
      I specialize in integrating{" "}
      <strong>Generative AI into enterprise systems</strong>, building
      production-ready LLM features for ERP workflows, and creating modern web
      applications with React, Next.js, and Python, Node.js.
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Peter is a Canada-based Full Stack Developer with extensive experience
        in building modern web applications using JavaScript, TypeScript, React,
        and Next.js, with strong backend integration in Python and PHP. Proven
        ability to design, implement, and deliver robust, user-centric solutions
        in Agile/Scrum environments. Adept at working with large-scale codebases
        and mentoring junior developers.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Doglas Trading Inc.",
        timeframe: "Apr 2025 - Present",
        role: "Full Stack Developer",
        achievements: [
          <>
            Designed and delivered a full-stack ERP system using
            JavaScript/TypeScript and Python-based backend services.
          </>,
          <>
            Built and integrated REST APIs to support frontend workflows,
            reporting, and third-party services.
          </>,
          <>
            Implemented CI/CD pipelines using GitHub, enabling automated
            testing, build, and deployment.
          </>,
          <>Deployed containerized applications using Docker and Kubernetes.</>,
        ],
        images: [],
      },
      {
        company: "Hung Hing Printing Group Limited",
        timeframe: "Jul 2023 - Apr 2025",
        role: "Senior Programmer",
        achievements: [
          <>
            Designed and implemented complex ERP modules using Python (Odoo),
            including Estimation, Quotation, and Delivery workflows.
          </>,
          <>
            Built a full-stack Payroll system with modern frontend (React /
            Next.js) and Python backend.
          </>,
          <>
            Worked in an Agile environment, collaborating closely with
            stakeholders to iterate features from design to production.
          </>,
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-01.png",
            alt: "ERP Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "AT-Vibe Technology Limited",
        timeframe: "Jun 2022 - Jul 2023",
        role: "Software Engineer (Part-Time)",
        achievements: [
          <>
            Developed frontend modules and enhanced integrations between the
            Booking System, Webex, and Microsoft Calendar using PHP and REST
            APIs.
          </>,
          <>
            Led client-facing prototype development, pre-sales demos, and
            authored comprehensive API documentation.
          </>,
        ],
        images: [],
      },
      {
        company: "K.KS Marketing Group",
        timeframe: "Mar 2022 - Jun 2022",
        role: "Web Developer (Part-Time)",
        achievements: [
          <>
            Built responsive websites from UI design to deployment using HTML5,
            CSS3, JavaScript, and PHP.
          </>,
          <>
            Implemented SEO best practices to enhance search engine rankings and
            site visibility.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "The Hong Kong Polytechnic University",
        description: (
          <>
            Bachelor of Engineering (Honours) in Industrial and Systems
            Engineering
          </>
        ),
      },
      {
        name: "Hong Kong Community College",
        description: <>Associate in Engineering</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: (
          <>Able to prototype in Figma with Once UI with unnatural speed.</>
        ),
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.png",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.png",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: (
          <>Building next gen apps with Next.js + Once UI + Supabase.</>
        ),
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog = {
  label: "Blog",
  title: "Writing about some tech stuff...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Work",
  title: "My projects",
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: "Gallery",
  title: "My photo gallery",
  description: `A photo collection by ${person.name}`,
  // Images from https://pexels.com
  images: [
    {
      src: "/images/gallery/img-01.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/hunghing-01.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-03.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-04.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-05.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-06.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-07.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-08.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-09.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-10.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-11.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-12.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-13.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-14.jpg",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

const skill = {
  label: "Skill",
  title: "My Skills",
  description: `Skills of ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const contact = {
  label: "Contact",
  title: "Contact Me",
  description: `Contact ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

export {
  person,
  social,
  newsletter,
  home,
  about,
  blog,
  work,
  gallery,
  skill,
  contact,
};
