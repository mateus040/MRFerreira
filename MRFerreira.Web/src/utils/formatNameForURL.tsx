export const formatNameForURL = (name: string) => {
  const normalize = (text: string) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  return normalize(name)
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};
