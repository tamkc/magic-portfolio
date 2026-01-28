"use client";

import { Column, Flex, Heading, Icon, SmartImage, SmartLink, Tag, Text } from "@/once-ui/components";
import styles from "./Posts.module.scss";
import { formatDate } from "@/app/utils/formatDate";
import { calculateReadingTime } from "@/app/utils/readingTime";

interface PostProps {
  post: any;
  thumbnail: boolean;
}

export default function Post({ post, thumbnail }: PostProps) {
  return (
    <SmartLink
      fillWidth
      className={styles.hover}
      unstyled
      key={post.slug}
      href={`/blog/${post.slug}`}
    >
      <Flex
        position="relative"
        mobileDirection="column"
        fillWidth
        paddingY="12"
        paddingX="16"
        gap="32"
      >
        {post.metadata.image && thumbnail && (
          <SmartImage
            priority
            maxWidth={20}
            className={styles.image}
            sizes="640px"
            border="neutral-alpha-weak"
            cursor="interactive"
            radius="m"
            src={post.metadata.image}
            alt={"Thumbnail of " + post.metadata.title}
            aspectRatio="16 / 9"
          />
        )}
        <Column position="relative" fillWidth gap="8" vertical="center">
          <Heading as="h2" variant="heading-strong-l" wrap="balance">
            {post.metadata.title}
          </Heading>
          <Flex gap="16" vertical="center">
            <Text variant="label-default-s" onBackground="neutral-weak">
              {formatDate(post.metadata.publishedAt, false)}
            </Text>
            <Flex gap="4" vertical="center">
              <Icon name="clock" size="xs" onBackground="neutral-weak" />
              <Text variant="label-default-s" onBackground="neutral-weak">
                {calculateReadingTime(post.content)}
              </Text>
            </Flex>
          </Flex>
          {post.metadata.tag && (
            <Tag className="mt-8" label={post.metadata.tag} variant="neutral" />
          )}
        </Column>
      </Flex>
    </SmartLink>
  );
}
