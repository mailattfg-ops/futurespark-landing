import {
  Wallet,
  Sparkles,
  BookOpen,
  PieChart,
  CreditCard,
  TrendingUp,
  Award,
  Building2,
  ShieldCheck,
  Coins,
  BarChart2,
} from "lucide-react";

interface IconProps {
  name: string;
  className?: string;
}

export function PlanIcon({ name, className = "w-5 h-5" }: IconProps) {
  switch (name) {
    case "wallet":
      return <Wallet className={className} />;
    case "sparkles":
      return <Sparkles className={className} />;
    case "book":
      return <BookOpen className={className} />;
    case "pie-chart":
      return <PieChart className={className} />;
    case "credit-card":
      return <CreditCard className={className} />;
    case "trending-up":
      return <TrendingUp className={className} />;
    case "award":
      return <Award className={className} />;
    case "building":
      return <Building2 className={className} />;
    case "shield":
      return <ShieldCheck className={className} />;
    case "coins":
      return <Coins className={className} />;
    case "bar-chart":
      return <BarChart2 className={className} />;
    default:
      return <BookOpen className={className} />;
  }
}
