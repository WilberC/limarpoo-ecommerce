import { formatPrice } from "@/lib/utils";

export function PriceDisplay({
  price,
  className = "",
}: {
  price: string | number;
  className?: string;
}) {
  return <span className={className}>{formatPrice(price)}</span>;
}
