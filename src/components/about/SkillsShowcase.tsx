"use client";

import { Column, Flex, Text, Tag, Icon } from "@/once-ui/components";
import styles from "./SkillsShowcase.module.scss";

interface SkillCategory {
  title: string;
  icon: string;
  skills: {
    name: string;
    level: "expert" | "advanced" | "intermediate";
  }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "code",
    skills: [
      { name: "React", level: "expert" },
      { name: "Next.js", level: "expert" },
      { name: "Vue.js", level: "advanced" },
      { name: "TypeScript", level: "advanced" },
      { name: "JavaScript (ES6+)", level: "expert" },
      { name: "Tailwind CSS", level: "expert" },
      { name: "Nuxt.js", level: "intermediate" },
      { name: "Framer Motion", level: "advanced" },
    ],
  },
  {
    title: "Backend",
    icon: "server",
    skills: [
      { name: "Python", level: "expert" },
      { name: "Odoo", level: "expert" },
      { name: "Django", level: "advanced" },
      { name: "Flask", level: "advanced" },
      { name: "PHP", level: "intermediate" },
      { name: "REST APIs", level: "expert" },
      { name: "GraphQL", level: "intermediate" },
    ],
  },
  {
    title: "Databases",
    icon: "grid",
    skills: [
      { name: "PostgreSQL", level: "expert" },
      { name: "MySQL", level: "advanced" },
      { name: "MongoDB", level: "intermediate" },
      { name: "Oracle", level: "intermediate" },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: "settings",
    skills: [
      { name: "Git/GitHub", level: "expert" },
      { name: "Docker", level: "advanced" },
      { name: "Kubernetes", level: "intermediate" },
      { name: "CI/CD Pipelines", level: "advanced" },
      { name: "Figma", level: "advanced" },
      { name: "Agile/Scrum", level: "advanced" },
    ],
  },
];

const levelColors = {
  expert: "brand",
  advanced: "accent",
  intermediate: "neutral",
} as const;

const levelLabels = {
  expert: "Expert",
  advanced: "Advanced",
  intermediate: "Intermediate",
};

export default function SkillsShowcase() {
  return (
    <Column fillWidth gap="l" className={styles.container}>
      <Flex fillWidth gap="l" wrap>
        {skillCategories.map((category, categoryIndex) => (
          <Column
            key={category.title}
            className={styles.categoryCard}
            padding="l"
            radius="l"
            border="neutral-alpha-weak"
            background="surface"
            flex={1}
            minWidth={280}
            gap="m"
          >
            <Flex gap="s" vertical="center">
              <Icon name={category.icon} size="m" onBackground="brand-weak" />
              <Text variant="heading-strong-m">{category.title}</Text>
            </Flex>
            <Flex wrap gap="8">
              {category.skills.map((skill) => (
                <Tag
                  key={skill.name}
                  size="l"
                  className={styles.skillTag}
                  variant={skill.level === "expert" ? "brand" : skill.level === "advanced" ? "accent" : "neutral"}
                >
                  <Flex gap="4" vertical="center">
                    {skill.name}
                    {skill.level === "expert" && (
                      <Icon name="star" size="xs" />
                    )}
                  </Flex>
                </Tag>
              ))}
            </Flex>
          </Column>
        ))}
      </Flex>
      <Flex gap="l" horizontal="center" paddingTop="m">
        <Flex gap="8" vertical="center">
          <Icon name="star" size="xs" onBackground="brand-weak" />
          <Text variant="body-default-s" onBackground="neutral-weak">Expert</Text>
        </Flex>
        <Flex gap="8" vertical="center">
          <Tag size="s" variant="accent">Advanced</Tag>
        </Flex>
        <Flex gap="8" vertical="center">
          <Tag size="s" variant="neutral">Intermediate</Tag>
        </Flex>
      </Flex>
    </Column>
  );
}
