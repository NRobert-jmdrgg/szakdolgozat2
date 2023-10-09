export default function socialMediaNumberFormatter(n: number) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(n);
}
