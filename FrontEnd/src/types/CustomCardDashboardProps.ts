import type {ComponentProps, ReactNode} from "react";
import {Card} from "@/components/ui/card.tsx";

type CustomCardDashboardProps = {
  title?: string;
  text?: string | ReactNode;
  color?: string;
  icon?: ReactNode;
} & ComponentProps<typeof Card>

export type {CustomCardDashboardProps}