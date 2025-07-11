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

export const DefaultPrimary: Story = {
  args: {
    children: "Default Primary",
    variant: "default_primary",
    size: "small",
  },
};

export const Default: Story = {
  args: {
    children: "Default",
    variant: "default",
    size: "small",
  },
};

export const OutlinePrimary: Story = {
  args: {
    children: "Outline Primary",
    variant: "outline_primary",
    size: "small",
  },
};

export const OutlineDefault: Story = {
  args: {
    children: "Outline Default",
    variant: "outline_default",
    size: "small",
  },
};

export const LinkPrimary: Story = {
  args: {
    children: "Link Primary",
    variant: "link_primary",
    size: "small",
  },
};

export const LinkDefault: Story = {
  args: {
    children: "Link Default",
    variant: "link_default",
    size: "small",
  },
};
