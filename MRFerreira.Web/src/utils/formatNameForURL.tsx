const formatNameForURL = (name: string) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

export default formatNameForURL;
