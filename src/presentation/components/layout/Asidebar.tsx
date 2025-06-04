import { useState, useRef, useMemo, useCallback, type JSX, memo } from "react";
import { useLocation } from "react-router";
import {
  LuBox,
  LuLaptop
} from "react-icons/lu";
import logo from "./../../assets/logo-white.svg";
import { NavLink } from "react-router";
import { TbLayoutDashboard } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { RiUserVoiceLine } from "react-icons/ri";

interface Props {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  color: string;
}
interface SubRoute {
  name: string;
  path: string;
  isActive?: boolean;
}
interface Route {
  name: string;
  path: string;
  icon: JSX.Element;
  badge?: number;
  subRoutes?: SubRoute[];
  isExpandable?: boolean;
}

// Memoiza rutas
const routes: Route[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <TbLayoutDashboard className="w-6 h-6 stroke-[1.5] text-inherit " />,
    isExpandable: true,
    subRoutes: [
      { name: "Reporte Gerencial", path: "dashboard/reporte" },
    ],
  },
  {
    name: "Recursos Humanos",
    path: "/recursos-humanos",
    icon: <FaRegUser className="w-4 h-5 stroke-[1.5] text-inherit" />,
    isExpandable: true,
    subRoutes: [
      { name: "Areas", path: "recursos/alta-area" },
      { name: "Empleados", path: "recursos/empleados" },
      { name: "Sedes", path: "recursos/sedes" },
      { name: "Productividad", path: "recursos/productividad" },
    ],
  },
  {
    name: "Recursos Materiales",
    path: "/recursos-materiales",
    icon: <LuBox className="w-6 h-6 stroke-[1.5] text-inherit" />,
    isExpandable: true,
    subRoutes: [{ name: "Alta Areas", path: "/recursos/alta-area" }],
  },
  {
    name: "Saga",
    path: "/saga",
    icon: <LuLaptop className="w-6 h-6 stroke-[1.5] text-inherit" />,
    isExpandable: true,
    subRoutes: [{ name: "Alta Areas", path: "/recursos/alta-area" }],
  },
  {
    name: "Marketing",
    path: "/marketing",
    icon: <RiUserVoiceLine className="w-4 h-4 stroke-[.5] text-inherit" />,
    isExpandable: true,
    subRoutes: [{ name: "Comunicado", path: "/recursos/alta-area" }],
  },
];

// COMPONENTES ATÓMICOS

const SidebarHeader = memo(function SidebarHeader({ collapsed, toggleCollapse }: { collapsed: boolean; toggleCollapse: () => void }) {
  return (
    <div
      className={`p-4 border-b border-white/20 flex ${collapsed ? "justify-center" : "justify-between"} items-center overflow-hidden mb-3`}
    >
      {!collapsed ? (
        <>
          <div className="flex items-center space-x-2">
            <img className="h-8.5 filter grayscale contrast-125 brightness-110" src={logo} alt="" />
          </div>
          <button onClick={toggleCollapse} className="p-1 rounded-md hover:bg-gray-900" title="Colapsar menú">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </>
      ) : (
        <button
          onClick={toggleCollapse}
          className="p-1.5 rounded-md hover:bg-gray-900 rotate-180"
          title="Expandir menú"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
    </div>
  );
});

const SidebarUser = memo(function SidebarUser({ collapsed }: { collapsed: boolean }) {
  return (
    <div className={`p-4 border-t border-white/20 flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
      <div className="relative group bg-yellow-500 p-2 rounded-full text-white w-10 h-10 flex items-center justify-center text-sm font-medium">
        JC
        {collapsed && (
          <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50 pointer-events-none">
            Carlos Medina
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>
        )}
      </div>
      {!collapsed && (
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Carlos Medina</p>
          <p className="text-xs text-blue-200">carlos.medina@gmail.com</p>
        </div>
      )}
    </div>
  );
});

const SidebarPopover = memo(function SidebarPopover({
  collapsed,
  hoveredSubmenu,
  popoverStyle,
  handleMouseLeave,
  setHoveredSubmenu,
  routes,
  handleRouteClick,
}: {
  collapsed: boolean;
  hoveredSubmenu: string | null;
  popoverStyle: React.CSSProperties;
  handleMouseLeave: () => void;
  setHoveredSubmenu: (submenu: string | null) => void;
  routes: Route[];
  handleRouteClick: (path: string) => void;
}) {
  return (
    <>
      {collapsed && hoveredSubmenu && (
        <div
          className="fixed border border-white/20 rounded-lg shadow-xl py-2 z-[9999] min-w-[200px]"
          style={popoverStyle}
          onMouseEnter={() => setHoveredSubmenu(hoveredSubmenu)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="px-3 py-2 border-b border-white/20">
            <span className="text-sm font-medium">{routes.find((r) => r.path === hoveredSubmenu)?.name}</span>
          </div>
          <div className="py-1">
            {routes
              .find((r) => r.path === hoveredSubmenu)
              ?.subRoutes?.map((subRoute) => (
                <NavLink
                  key={subRoute.path}
                  to={subRoute.path}
                  onClick={() => handleRouteClick(subRoute.path)}
                  className={({ isActive }) =>
                    `w-full block text-left px-3 py-2 text-sm transition-all duration-200 hover:bg-white/20
                    ${isActive || subRoute.isActive
                      ? "bg-white/20 text-blue-300 border-r-2 border-white"
                      : "text-white hover:text-white/20"
                    }`
                  }
                  style={{ color: "#fff" }}
                  end
                >
                  {subRoute.name}
                </NavLink>
              ))}
          </div>
        </div>
      )}
    </>
  );
});

const SidebarNav = memo(function SidebarNav({
  collapsed,
  routes,
  activeRoute,
  expandedRoutes,
  menuItemRefs,
  handleMouseEnter,
  handleMouseLeave,
  handleRouteClick,
  toggleSubMenu,
}: {
  collapsed: boolean;
  routes: Route[];
  activeRoute: string;
  expandedRoutes: string[];
  menuItemRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  handleMouseEnter: (routePath: string) => void;
  handleMouseLeave: () => void;
  handleRouteClick: (path: string) => void;
  toggleSubMenu: (routePath: string) => void;
}) {
  return (
    <nav className="flex-1 overflow-y-auto p-4 overflow-hidden">
      <ul className="space-y-2">
        {routes.map((route) => (
          <li key={route.path} className="relative group">
            <div
              ref={(el) => { menuItemRefs.current[route.path] = el; }}
              className={`
                flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200
                ${collapsed ? "justify-center" : ""}
                ${activeRoute === route.path ? "bg-white/20 text-blue-300" : "hover:bg-white/20"}
              `}
              onClick={() => {
                if (route.isExpandable && !collapsed) {
                  toggleSubMenu(route.path);
                }
              }}
              onMouseEnter={() => handleMouseEnter(route.path)}
              onMouseLeave={handleMouseLeave}
              style={{ color: "#fff" }}
            >
              <div className={`flex items-center ${collapsed ? "" : "space-x-3"}`}>
                <div className="w-6 h-6 flex items-center justify-center">{route.icon}</div>
                {!collapsed && !route.isExpandable && (
                  <NavLink
                    to={route.path}
                    className={({ isActive }) =>
                      `text-xs ${isActive ? "font-bold text-blue-300" : ""}`
                    }
                    onClick={() => handleRouteClick(route.path)}
                    style={{ color: "#fff" }}
                    end
                  >
                    {route.name}
                  </NavLink>
                )}
                {!collapsed && route.isExpandable && (
                  <span className="text-xs">{route.name}</span>
                )}
              </div>
              {!collapsed && route.isExpandable && (
                <div className="flex items-center space-x-2">
                  {route.badge && (
                    <span className="bg-blue-900 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                      {route.badge}
                    </span>
                  )}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${expandedRoutes.includes(route.path) ? "rotate-180" : ""} text-white`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 20 20"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    />
                  </svg>
                </div>
              )}
              {/* Tooltip para modo colapsado (solo para elementos sin submenús) */}
              {collapsed && !route.subRoutes && (
                <div className="absolute left-full ml-2 px-2 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50 pointer-events-none">
                  {route.name}
                  <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-1 h-1 bg-gray-900 rotate-45"></div>
                </div>
              )}
            </div>
            {/* Submenú (solo en modo expandido) */}
            {!collapsed && route.subRoutes && (
              <div
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${expandedRoutes.includes(route.path) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                `}
              >
                <ul className="mt-2 ml-9 space-y-1 border-l border-white/20 pl-3">
                  {route.subRoutes.map((subRoute) => (
                    <li key={subRoute.path}>
                      <NavLink
                        to={subRoute.path}
                        onClick={() => handleRouteClick(subRoute.path)}
                        className={({ isActive }) =>
                          `w-full block text-left p-2 rounded-md text-xs transition-all duration-200
                          ${isActive || subRoute.isActive
                            ? "bg-white/20 text-white"
                            : "text-white hover:bg-white/20 hover:text-blue-200"
                          }`
                        }
                        style={{ color: "#fff" }}
                        end
                      >
                        {subRoute.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default function Sidebar({ collapsed, setCollapsed, color }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedRoutes, setExpandedRoutes] = useState<string[]>([]);
  const [hoveredSubmenu, setHoveredSubmenu] = useState<string | null>(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const menuItemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const location = useLocation();

  // Memoiza estilos
  const asideStyle = useMemo(() => ({
    backgroundColor: color,
    color: "#fff"
  }), [color]);

  const popoverStyle = useMemo(() => ({
    backgroundColor: color,
    color: "#fff",
    top: `${popoverPosition.top}px`,
    left: `${popoverPosition.left}px`
  }), [color, popoverPosition]);

  // Memoiza handlers
  const toggleSidebar = useCallback(() => setIsOpen(v => !v), []);
  const toggleCollapse = useCallback(() => setCollapsed(v => !v), [setCollapsed]);
  const toggleSubMenu = useCallback((routePath: string) => {
    setExpandedRoutes(prev =>
      prev.includes(routePath) ? prev.filter(path => path !== routePath) : [...prev, routePath]
    );
  }, []);
  const handleRouteClick = useCallback(() => {
    setIsOpen(false);
    setHoveredSubmenu(null);
  }, []);
  const handleMouseEnter = useCallback((routePath: string) => {
    if (collapsed && routes.find((r) => r.path === routePath)?.subRoutes) {
      const element = menuItemRefs.current[routePath];
      if (element) {
        const rect = element.getBoundingClientRect();
        setPopoverPosition({
          top: rect.top,
          left: rect.right,
        });
        setHoveredSubmenu(routePath);
      }
    }
  }, [collapsed]);
  const handleMouseLeave = useCallback(() => {
    if (collapsed) setHoveredSubmenu(null);
  }, [collapsed]);

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && <div className="fixed inset-0 z-40 lg:hidden" onClick={toggleSidebar} />}

      {/* Botón hamburguesa para móvil */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white rounded-md p-2 shadow-lg border border-gray-100"
      >
        <div className="w-5 h-5 flex flex-col justify-center items-center">
          <span
            className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-600 mt-1 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-600 mt-1 transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1" : ""}`}
          />
        </div>
      </button>

      {/* Popover de submenú */}
      <SidebarPopover
        collapsed={collapsed}
        hoveredSubmenu={hoveredSubmenu}
        popoverStyle={popoverStyle}
        handleMouseLeave={handleMouseLeave}
        setHoveredSubmenu={setHoveredSubmenu}
        routes={routes}
        handleRouteClick={handleRouteClick}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full transition-all duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto flex flex-col overflow-hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          ${collapsed ? "w-20" : "w-64"}
        `}
        style={asideStyle}
      >
        <SidebarHeader collapsed={collapsed} toggleCollapse={toggleCollapse} />
        <SidebarNav
          collapsed={collapsed}
          routes={routes}
          activeRoute={location.pathname}
          expandedRoutes={expandedRoutes}
          menuItemRefs={menuItemRefs}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          handleRouteClick={handleRouteClick}
          toggleSubMenu={toggleSubMenu}
        />
        <SidebarUser collapsed={collapsed} />
      </aside>
    </>
  );
}