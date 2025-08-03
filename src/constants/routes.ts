export const routes = [
  { label: "Home", href: "/" },
  { label: "iStore", href: "/store" },
  { label: "Intelligence", href: "/intelligence" },
  { label: "Community", href: "/community" },
  {
    label: "Developer",
    href: "/developer",
    children: [
      { label: "Imago Creator", href: "/developer/icreator" },
      { label: "Imago Editor", href: "/developer/ieditor" },
      { label: "Documentation", href: "/developer/docs" },
    ],
  },

  {
    label: "Support",
    href: "/support",
    children: [
      { label: "Contact Us", href: "/support/contact" },
      { label: "FAQs", href: "/support/faq" },
      { label: "Report a Bug", href: "/support/report" },
    ],
  },

  {
    label: "Legal",
    href: "/policy",
    children: [
      { label: "Privacy Policy", href: "/policy/privacy" },
      { label: "Terms of Service", href: "/policy/terms" },
      { label: "Submission Guidelines", href: "/policy/submission" },
      { label: "Developer Agreement", href: "/policy/developer" },
    ],
  },

  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Vision", href: "/about/vision" },
      { label: "Brand Assets", href: "/about/brand" },
    ],
  },
];

export const quickLinks = [
  { label: "iStore", href: "/apps" },
  { label: "Intelligence", href: "/intelligence" },
  { label: "Community", href: "/community" },
];

export const exploreRoutes = [
  { label: "Home", href: "/" },
  { label: "iStore", href: "/apps" },
  { label: "webStore", href: "/websites" },
  { label: "Intelligence", href: "/intelligence" },
  { label: "Community", href: "/community" },
];

export const accountRoutes = [
  { label: "Manage Your Imago Account", href: "/" },
  { label: "Imago Creator Account", href: "/apps" },
];

export const developerRoutes = [
  { label: "Overview", href: "/developer" },
  { label: "iCreator", href: "/developer/icreator" },
  { label: "iEditor", href: "/developer/ieditor" },
  { label: "Docs", href: "/developer/docs" },
];

export const supportRoutes = [
  { label: "Contact Us", href: "/support/contact" },
  { label: "FAQs", href: "/support/faq" },
  { label: "Report a Bug", href: "/support/report" },
];

export const legalRoutes = [
  { label: "Privacy Policy", href: "/policy/privacy" },
  { label: "Terms of Service", href: "/policy/terms" },
  { label: "Submission Guidelines", href: "/policy/submission" },
  { label: "Developer Agreement", href: "/policy/developer" },
];

export const aboutRoutes = [
  { label: "Our Vision", href: "/about/vision" },
  { label: "Brand Assets", href: "/about/brand" },
];

export const navigationSections = [
  { label: "Explore Imago", routes: exploreRoutes },
  { label: "Account", routes: accountRoutes },
  { label: "Developer", routes: developerRoutes },
  { label: "Support", routes: supportRoutes },
  { label: "Legal", routes: legalRoutes },
  { label: "About", routes: aboutRoutes },
];
