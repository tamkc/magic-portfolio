"use client";

import { newsletterConfig } from "@/app/resources";
import { Button, Flex, Heading, Input, Text, Background, Column } from "@/once-ui/components";
import { useState, type JSX } from "react";

function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timeout: ReturnType<typeof setTimeout>;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  }) as T;
}

type NewsletterProps = {
  display: boolean;
  title: string | JSX.Element;
  description: string | JSX.Element;
};

export const Newsletter = ({ newsletter }: { newsletter: NewsletterProps }) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const validateEmail = (email: string): boolean => {
    if (email === "") {
      return true;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateAndSetError = (value: string) => {
    if (!validateEmail(value)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
  };

  const debouncedValidate = debounce(validateAndSetError, 2000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (error) {
      validateAndSetError(value);
    } else {
      debouncedValidate(value);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    validateAndSetError(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email) || !email) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Thank you for subscribing!");
        setEmail("");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Column
      overflow="hidden"
      position="relative"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-medium"
    >
      <Background
        mask={{
          cursor: newsletterConfig.effects.mask.cursor,
          x: newsletterConfig.effects.mask.x,
          y: newsletterConfig.effects.mask.y,
          radius: newsletterConfig.effects.mask.radius,
        }}
        gradient={{
          display: newsletterConfig.effects.gradient.display,
          x: newsletterConfig.effects.gradient.x,
          y: newsletterConfig.effects.gradient.y,
          width: newsletterConfig.effects.gradient.width,
          height: newsletterConfig.effects.gradient.height,
          tilt: newsletterConfig.effects.gradient.tilt,
          colorStart: newsletterConfig.effects.gradient.colorStart,
          colorEnd: newsletterConfig.effects.gradient.colorEnd,
          opacity: newsletterConfig.effects.gradient.opacity as
            | 0
            | 10
            | 20
            | 30
            | 40
            | 50
            | 60
            | 70
            | 80
            | 90
            | 100,
        }}
        dots={{
          display: newsletterConfig.effects.dots.display,
          color: newsletterConfig.effects.dots.color,
          size: newsletterConfig.effects.dots.size as any,
          opacity: newsletterConfig.effects.dots.opacity as any,
        }}
        grid={{
          display: newsletterConfig.effects.grid.display,
          color: newsletterConfig.effects.grid.color,
          width: newsletterConfig.effects.grid.width as any,
          height: newsletterConfig.effects.grid.height as any,
          opacity: newsletterConfig.effects.grid.opacity as any,
        }}
        lines={{
          display: newsletterConfig.effects.lines.display,
          opacity: newsletterConfig.effects.lines.opacity as any,
        }}
      />
      <Heading style={{ position: "relative" }} marginBottom="s" variant="display-strong-xs">
        {newsletter.title}
      </Heading>
      <Text
        style={{
          position: "relative",
          maxWidth: "var(--responsive-width-xs)",
        }}
        wrap="balance"
        marginBottom="l"
        onBackground="neutral-medium"
      >
        {newsletter.description}
      </Text>
      {successMessage ? (
        <Text style={{ position: "relative" }} onBackground="success-medium">
          {successMessage}
        </Text>
      ) : (
        <form
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <Flex fillWidth maxWidth={24} gap="8">
            <Input
              formNoValidate
              labelAsPlaceholder
              id="newsletter-email"
              name="email"
              type="email"
              label="Email"
              required
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={error}
            />
            <div className="clear">
              <Flex height="48" vertical="center">
                <Button type="submit" size="m" fillWidth disabled={isSubmitting}>
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </Flex>
            </div>
          </Flex>
        </form>
      )}
    </Column>
  );
};
