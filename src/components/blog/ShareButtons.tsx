"use client";

import { useState } from "react";
import { Flex, IconButton, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `https://${baseURL}/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Flex gap="8" vertical="center">
      <Text variant="body-default-s" onBackground="neutral-weak">
        Share:
      </Text>
      <IconButton
        href={shareLinks.twitter}
        icon="x"
        size="s"
        variant="ghost"
        tooltip="Share on X"
        aria-label="Share on X"
      />
      <IconButton
        href={shareLinks.linkedin}
        icon="linkedin"
        size="s"
        variant="ghost"
        tooltip="Share on LinkedIn"
        aria-label="Share on LinkedIn"
      />
      <IconButton
        onClick={copyToClipboard}
        icon={copied ? "check" : "link"}
        size="s"
        variant="ghost"
        tooltip={copied ? "Copied!" : "Copy link"}
        aria-label="Copy link"
      />
    </Flex>
  );
}
