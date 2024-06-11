"use client";

import { Button, Link, ButtonProps } from "@nextui-org/react";

export const ButtonLink = ({children, ...props}: Omit<ButtonProps, 'as'>) => {
  return (
    <Button as={Link} {...props}>{children}</Button>
  );
};