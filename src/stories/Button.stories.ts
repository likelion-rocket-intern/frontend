import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { fn } from "storybook/test";

import { Button } from "@/components/ui/button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default_primary",
        "default",
        "white",
        "outline_primary",
        "outline_default",
        "link_primary",
        "link_default",
      ],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    disabled: { control: "boolean" },
    asChild: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    children: "Button",
    variant: "default_primary",
    size: "small",
  },
};
