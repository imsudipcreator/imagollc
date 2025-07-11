import { BadgeQuestionMarkIcon, BookOpenTextIcon, BrainIcon, BugIcon, ClipboardListIcon, CodeXmlIcon, FileTextIcon, GalleryVerticalEndIcon, HandshakeIcon, MailIcon, PencilRulerIcon, ShieldUserIcon } from "lucide-react";

export const navigationLinks = [
  { href: "/", label: "Home" },

  { href: '/store', label: "Store"},

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
      { href: "/developer/icreator", label: "Imago Creator", icon: PencilRulerIcon },
      { href: "/developer/ieditor", label: "Imago Editor", icon: CodeXmlIcon },
      { href: "/developer/docs", label: "Documentation", icon: BookOpenTextIcon },
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
      { href: "/policy/privacy", label: "Privacy Policy", icon: ShieldUserIcon },
      { href: "/policy/terms", label: "Terms of Service", icon: FileTextIcon },
      { href: "/policy/submission", label: "Submission Guidelines", icon : ClipboardListIcon },
      { href: "/policy/developer", label: "Developer Agreement", icon: HandshakeIcon },
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


export const QuickLinks = [
  { id: 1, name: "iStore", href: "/apps" },
  { id: 2, name: "Intelligence", href: "/intelligence"},
  { id: 3, name: "Community", href: "/community" },
];

export const ExploreRoutes = [
  { name: "Home", href: "/" },
  { name: "iStore", href: "/apps" },
  { name: "webStore", href: "/websites" },
  { name: "Intelligence", href: "/intelligence" },
  { name: "Community", href: "/community" },
];

export const AccountRoutes = [
  { name: "Manage Your Imago Account", href: "/" }, // You can update this href later
  { name: "Imago Creator Account", href: "/apps" }, // Placeholder
];

export const DeveloperRoutes = [
  { name: "Overview", href: "/developer" },
  { name: "iCreator", href: "/developer/icreator" },
  { name: "iEditor", href: "/developer/ieditor" },
  { name: "Docs", href: "/developer/docs" },
];

export const SupportRoutes = [
  { name: "Contact Us", href: "/support/contact" },
  { name: "FAQs", href: "/support/faq" },
  { name: "Report a Bug", href: "/support/report" },
];

export const LegalRoutes = [
  { name: "Privacy Policy", href: "/policy/privacy" },
  { name: "Terms of Service", href: "/policy/terms" },
  { name: "Submission Guidelines", href: "/policy/submission" },
  { name: "Developer Agreement", href: "/policy/developer" },
];

export const AboutRoutes = [
  { name: "Our Vision", href: "/about/vision" },
  { name: "Brand Assets", href: "/about/brand" },
];

export const NavigationSections = [
  { title: "Explore Imago", routes: ExploreRoutes },
  { title: "Account", routes: AccountRoutes },
  { title: "Developer", routes: DeveloperRoutes },
  { title: "Support", routes: SupportRoutes },
  { title: "Legal", routes: LegalRoutes },
  { title: "About", routes: AboutRoutes },
];