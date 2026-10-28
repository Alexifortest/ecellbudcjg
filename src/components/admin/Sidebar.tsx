import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  Users,
  Image,
  Phone,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: CalendarDays, label: "Events" },
  { icon: FileText, label: "Blogs" },
  { icon: Users, label: "Team Members" },
  { icon: Image, label: "Gallery" },
  { icon: Phone, label: "Contact" },
  { icon: Settings, label: "Settings" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen p-6 flex flex-col">
      <h1 className="text-2xl font-bold text-primary mb-10">
        E-Cell Admin
      </h1>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition"
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-500/10 transition">
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;