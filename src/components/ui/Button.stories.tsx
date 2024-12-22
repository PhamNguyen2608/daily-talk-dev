import { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "small", "medium", "large"],
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "danger"],
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "ghost", "text"],
    },
    isLoading: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    ripple: {
      control: { type: "boolean" },
    },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    size: "medium",
    color: "primary",
    variant: "primary",
    isLoading: false,
    disabled: false,
    ripple: true,
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    size: "medium",
    color: "secondary",
    variant: "secondary",
    isLoading: false,
    disabled: false,
    ripple: true,
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    size: "medium",
    color: "primary",
    variant: "ghost",
    isLoading: false,
    disabled: false,
    ripple: true,
  },
};

export const Text: Story = {
  args: {
    children: "Text Button",
    size: "medium",
    color: "primary",
    variant: "text",
    isLoading: false,
    disabled: false,
    ripple: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    size: "medium",
    color: "primary",
    variant: "primary",
    isLoading: false,
    disabled: true,
    ripple: false,
  },
};

export const Loading: Story = {
  args: {
    children: "Loading Button",
    size: "medium",
    color: "primary",
    variant: "primary",
    isLoading: true,
    disabled: false,
    ripple: false,
  },
};
