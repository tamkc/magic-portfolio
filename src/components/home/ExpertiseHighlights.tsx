"use client";

import { Column, Flex, Grid, Heading, Icon, Text } from "@/once-ui/components";

const expertiseAreas = [
  {
    icon: "sparkle",
    title: "GenAI Integration",
    description: "LLM-powered features for enterprise systems with robust validation and fallback paths",
  },
  {
    icon: "code",
    title: "Frontend Development",
    description: "Modern React & Next.js applications with TypeScript, Tailwind, and component libraries",
  },
  {
    icon: "server",
    title: "Backend & ERP",
    description: "Python/Odoo development with PostgreSQL, REST APIs, and scalable architectures",
  },
];

export default function ExpertiseHighlights() {
  return (
    <Grid columns="3" mobileColumns="1" tabletColumns="2" gap="l" fillWidth>
      {expertiseAreas.map((area) => (
        <Column
          key={area.title}
          padding="l"
          radius="l"
          border="neutral-alpha-weak"
          background="surface"
          gap="m"
        >
          <Flex gap="s" vertical="center">
            <Icon name={area.icon} size="m" onBackground="brand-weak" />
            <Heading as="h3" variant="heading-strong-s">
              {area.title}
            </Heading>
          </Flex>
          <Text variant="body-default-s" onBackground="neutral-weak">
            {area.description}
          </Text>
        </Column>
      ))}
    </Grid>
  );
}
