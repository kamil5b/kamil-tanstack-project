export const navData: {
  title: string;
  url: string;
  isActive?: boolean;
  items?: { title: string; url: string }[];
}[] = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Products",
    url: "/product",
  },
  {
    title: "Tags",
    url: "/tag",
  },
];
