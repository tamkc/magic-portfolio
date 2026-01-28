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
      { name: "TypeScript", level: "advanced" },
      { name: "Tailwind CSS", level: "advanced" },
      { name: "HTML/CSS", level: "expert" },
      { name: "JavaScript", level: "expert" },
    ],
  },
  {
    title: "Backend",
    icon: "server",
    skills: [
      { name: "Python", level: "expert" },
      { name: "Odoo", level: "expert" },
      { name: "PostgreSQL", level: "advanced" },
      { name: "Node.js", level: "intermediate" },
      { name: "REST APIs", level: "advanced" },
      { name: "GraphQL", level: "intermediate" },
    ],
  },
  {
    title: "AI & GenAI",
    icon: "sparkle",
    skills: [
      { name: "Prompt Engineering", level: "advanced" },
      { name: "LLM Integration", level: "advanced" },
      { name: "Image Generation", level: "intermediate" },
      { name: "RAG Systems", level: "intermediate" },
      { name: "AI/ML Workflows", level: "intermediate" },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: "settings",
    skills: [
      { name: "Git", level: "advanced" },
      { name: "Docker", level: "intermediate" },
      { name: "Figma", level: "advanced" },
      { name: "CI/CD", level: "intermediate" },
      { name: "Linux", level: "advanced" },
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
