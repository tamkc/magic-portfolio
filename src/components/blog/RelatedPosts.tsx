import { getPosts } from "@/app/utils/utils";
import { Column, Flex, Heading, SmartLink, Tag, Text } from "@/once-ui/components";
import { formatDate } from "@/app/utils/formatDate";
import { calculateReadingTime } from "@/app/utils/readingTime";

interface RelatedPostsProps {
  currentSlug: string;
  currentTag?: string;
  limit?: number;
}

export default function RelatedPosts({ currentSlug, currentTag, limit = 3 }: RelatedPostsProps) {
  const allPosts = getPosts(["src", "app", "blog", "posts"]);

  // Filter out current post and find related posts by tag
  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => !currentTag || post.metadata.tag === currentTag)
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
    .slice(0, limit);

  // If no related posts with same tag, show recent posts
  const postsToShow = relatedPosts.length > 0
    ? relatedPosts
    : allPosts
        .filter((post) => post.slug !== currentSlug)
        .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
        .slice(0, limit);

  if (postsToShow.length === 0) {
    return null;
  }

  return (
    <Column fillWidth gap="l" marginTop="xl" paddingTop="xl" borderTop="neutral-alpha-weak">
      <Heading as="h3" variant="heading-strong-l">
        Related Posts
      </Heading>
      <Column gap="m">
        {postsToShow.map((post) => (
          <SmartLink
            key={post.slug}
            href={`/blog/${post.slug}`}
            unstyled
          >
            <Flex
              fillWidth
              padding="m"
              radius="m"
              border="neutral-alpha-weak"
              direction="column"
              gap="8"
              style={{ transition: "all 0.2s ease" }}
              className="hover-lift"
            >
              <Text variant="heading-strong-m">{post.metadata.title}</Text>
              <Flex gap="12" vertical="center">
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  {formatDate(post.metadata.publishedAt, false)}
                </Text>
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  {calculateReadingTime(post.content)}
                </Text>
                {post.metadata.tag && (
                  <Tag size="s" variant="neutral" label={post.metadata.tag} />
                )}
              </Flex>
            </Flex>
          </SmartLink>
        ))}
      </Column>
    </Column>
  );
}
