import {
  BadgeQuestionMarkIcon,
  BookOpenTextIcon,
  BrainIcon,
  BugIcon,
  ClipboardListIcon,
  CodeXmlIcon,
  FileTextIcon,
  GalleryVerticalEndIcon,
  HandshakeIcon,
  MailIcon,
  PencilRulerIcon,
  ShieldUserIcon,
  ShoppingBagIcon,
} from "lucide-react";

export const navigationLinks = [
  { href: "/", label: "Home" },

  { href: "/store", label: "Store" },

  {
    label: "Explore",
    submenu: true,
    type: "icon",
    items: [
      { href: "/intelligence", label: "Intelligence", icon: BrainIcon },
      { href: "/community", label: "Community", icon: GalleryVerticalEndIcon },
    ],
  },

  {
    label: "Developer",
    submenu: true,
    type: "icon",
    items: [
      {
        href: "/developer/icreator",
        label: "Imago Creator",
        icon: PencilRulerIcon,
      },
      { href: "/developer/ieditor", label: "Imago Editor", icon: CodeXmlIcon },
      {
        href: "/developer/docs",
        label: "Documentation",
        icon: BookOpenTextIcon,
      },
    ],
  },

  {
    label: "Support",
    submenu: true,
    type: "icon",
    items: [
      { href: "/support/contact", label: "Contact Us", icon: MailIcon },
      { href: "/support/faq", label: "FAQs", icon: BadgeQuestionMarkIcon },
      { href: "/support/report", label: "Report a Bug", icon: BugIcon },
    ],
  },

  {
    label: "Legal",
    submenu: true,
    type: "icon",
    items: [
      {
        href: "/policy/privacy",
        label: "Privacy Policy",
        icon: ShieldUserIcon,
      },
      { href: "/policy/terms", label: "Terms of Service", icon: FileTextIcon },
      {
        href: "/policy/submission",
        label: "Submission Guidelines",
        icon: ClipboardListIcon,
      },
      {
        href: "/policy/developer",
        label: "Developer Agreement",
        icon: HandshakeIcon,
      },
    ],
  },

  {
    label: "About",
    submenu: true,
    type: "simple",
    items: [
      { href: "/about/vision", label: "Our Vision" },
      { href: "/about/brand", label: "Brand Assets" },
    ],
  },
];

export const quickLinks = [
  { label: "Intelligence", href: "/intelligence", icon: BrainIcon },
  { label: "iStore", href: "/apps", icon: ShoppingBagIcon },
  { label: "Community", href: "/community", icon: GalleryVerticalEndIcon },
];

export const exploreRoutes = [
  { label: "Home", href: "/" },
  { label: "Store", href: "/store" },
  { label: "Intelligence", href: "/intelligence" },
  { label: "Community", href: "/community" },
];

export const accountRoutes = [
  { label: "Manage Your Imago Account", href: "/" }, // Replace href when account page exists
];

export const developerRoutes = [
  { label: "Imago Creator", href: "/developer/icreator" },
  { label: "Imago Editor", href: "/developer/ieditor" },
  { label: "Documentation", href: "/developer/docs" },
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

export const bottomLinks = [
  { label: "Terms of Service", href: "/policy/terms" },
  { label: "Privacy Policy", href: "/policy/privacy" },
  { label: "Sitemap", href: "/sitemap" },
];

export const navigationSections = [
  { label: "Explore Imago", routes: exploreRoutes },
  { label: "Account", routes: accountRoutes },
  { label: "Developer", routes: developerRoutes },
  { label: "Support", routes: supportRoutes },
  { label: "Legal", routes: legalRoutes },
  { label: "About", routes: aboutRoutes },
];
