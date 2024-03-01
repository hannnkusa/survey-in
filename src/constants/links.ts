export const NAV_URLS = [
  {
    text: "My Questionnaire",
    url: "/questionnaire",
  },
  {
    text: "Company",
    url: "/company",
  },
  {
    text: "Support",
    url: "#",
  },
  {
    text: "Notification",
    url: "/notification",
  },
  {
    text: "My Account",
    url: "/register",
  },
];

export const SIDEBAR_URLS = [
  {
    title: "User",
    sidebarItems: [
      {
        title: "Customer",
        link: "user/customer",
      },
      {
        title: "Rating",
        link: "user/rating",
      },
    ],
  },
  {
    title: "Transaction",
    sidebarItems: [
      {
        title: "Order",
        link: "transaction/order",
      },
    ],
  },
  {
    title: "Master Data",
    sidebarItems: [
      { title: "Agama", link: "master-data/religion" },
      { title: "Lokasi", link: "master-data/location" },
      { title: "Kesibukan", link: "master-data/busyness" },
      { title: "Tingkat pendidikan", link: "master-data/education" },
      {
        title: "Pengeluaran per bulan",
        link: "master-data/expenditure",
      },
      { title: "Pengguna sosial media", link: "master-data/social-media" },
      { title: "Pengguna e-commerce", link: "master-data/ecommerce" },
      { title: "Olahraga", link: "master-data/sport" },
      { title: "Hobi", link: "master-data/hobby" },
      {
        title: "Genre film / buku",
        link: "master-data/genre",
      },
      {
        title: "Genre musik",
        link: "master-data/music-genre",
      },
      {
        title: "Makanan / minuman",
        link: "master-data/food",
      },
      {
        title: "Hewan peliharaan",
        link: "master-data/pet",
      },
    ],
  },
];
