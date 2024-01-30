export function resolveStatusColor(status: string): string {
  if (status === "on-going") return "#00ADF0";
  if (status === "in review") return "#F90";
  if (status === "cancelled") return "#F62525";
  if (status === "draft") return "#9C9C9C";
  if (status === "done") return "#3ED556";
  return "";
}
