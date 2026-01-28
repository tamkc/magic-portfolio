"use client";

import { useState, FormEvent } from "react";
import {
  Button,
  Column,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
} from "@/once-ui/components";
import { person } from "@/app/resources/content";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  type: "idle" | "submitting" | "success" | "error";
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ type: "submitting" });

    // Create mailto link as fallback (since we don't have a backend)
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:tamkcatwork@gmail.com?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    setStatus({
      type: "success",
      message: "Opening your email client...",
    });

    // Reset form after delay
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setStatus({ type: "idle" });
    }, 3000);
  };

  const isValid = formData.name && formData.email && formData.message;

  return (
    <Column
      fillWidth
      gap="l"
      padding="l"
      radius="l"
      border="neutral-alpha-weak"
      background="surface"
    >
      <Column gap="s">
        <Heading as="h3" variant="heading-strong-l">
          Get in Touch
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          Have a project in mind or want to discuss opportunities? Send me a message.
        </Text>
      </Column>

      <form onSubmit={handleSubmit}>
        <Column gap="m">
          <Input
            id="contact-name"
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            aria-required="true"
          />

          <Input
            id="contact-email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            aria-required="true"
          />

          <Textarea
            id="contact-message"
            label="Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={5}
            required
            aria-required="true"
          />

          <Flex gap="m" vertical="center">
            <Button
              type="submit"
              variant="primary"
              size="m"
              disabled={!isValid || status.type === "submitting"}
              arrowIcon
            >
              {status.type === "submitting" ? "Sending..." : "Send Message"}
            </Button>

            {status.type === "success" && (
              <Text variant="body-default-s" onBackground="accent-weak">
                {status.message}
              </Text>
            )}

            {status.type === "error" && (
              <Text variant="body-default-s" onBackground="danger-weak">
                {status.message}
              </Text>
            )}
          </Flex>
        </Column>
      </form>
    </Column>
  );
}
