import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/app/utils/utils";
import { AvatarGroup, Button, Column, Flex, Heading, Icon, Row, SmartImage, Tag, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { person } from "@/app/resources/content";
import { formatDate } from "@/app/utils/formatDate";
import { calculateReadingTime } from "@/app/utils/readingTime";
import ScrollToHash from "@/components/ScrollToHash";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedPosts from "@/components/blog/RelatedPosts";

interface BlogParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "blog", "posts"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: BlogParams) {
  const params = await props.params;

  const {
    slug
  } = params;

  let post = getPosts(["src", "app", "blog", "posts"]).find((post) => post.slug === slug);

  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    images,
    image,
    team,
  } = post.metadata;
  let ogImage = image ? `https://${baseURL}${image}` : `https://${baseURL}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://${baseURL}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog(props: BlogParams) {
  const params = await props.params;
  let post = getPosts(["src", "app", "blog", "posts"]).find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="xs" gap="l">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `https://${baseURL}${post.metadata.image}`
              : `https://${baseURL}/og?title=${post.metadata.title}`,
            url: `https://${baseURL}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: person.name,
            },
          }),
        }}
      />
      <Button href="/blog" weight="default" variant="tertiary" size="s" prefixIcon="chevronLeft">
        Posts
      </Button>
      <Heading variant="display-strong-s">{post.metadata.title}</Heading>
      <Flex gap="12" vertical="center" wrap>
        {avatars.length > 0 && <AvatarGroup size="s" avatars={avatars} />}
        <Text variant="body-default-s" onBackground="neutral-weak">
          {formatDate(post.metadata.publishedAt)}
        </Text>
        <Flex gap="4" vertical="center">
          <Icon name="clock" size="xs" onBackground="neutral-weak" />
          <Text variant="body-default-s" onBackground="neutral-weak">
            {calculateReadingTime(post.content)}
          </Text>
        </Flex>
        {post.metadata.tag && (
          <Tag label={post.metadata.tag} variant="neutral" size="s" />
        )}
      </Flex>
      <ShareButtons
        title={post.metadata.title}
        slug={post.slug}
      />
      {(post.metadata.images?.[0] || post.metadata.image) && (
        <SmartImage
          priority
          aspectRatio="16 / 9"
          radius="m"
          alt={post.metadata.title}
          src={(post.metadata.images?.[0] || post.metadata.image) as string}
        />
      )}
      <Column as="article" fillWidth>
        <CustomMDX source={post.content} />
      </Column>
      <RelatedPosts currentSlug={post.slug} currentTag={post.metadata.tag} />
      <ScrollToHash />
    </Column>
  );
}
