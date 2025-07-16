// // components/BottomNav.js
// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const navItems = [
//   { label: "Home", path: "/", icon: "🏠" },
//   { label: "Social", path: "/social-media", icon: "📱" },
//   { label: "Leads", path: "/leads", icon: "📋" },
//   { label: "Affiliates", path: "/affiliates", icon: "🤝" },
// ];

// export default function BottomNav() {
//   const pathname = usePathname();

//   return (
//     <nav className="bg-white shadow-md flex justify-around py-2 border-t">
//       {navItems.map(({ label, path, icon }) => (
//         <Link
//           key={label}
//           href={path}
//           className={`flex flex-col items-center text-xs ${
//             pathname === path ? "text-blue-600 font-bold" : "text-gray-500"
//           }`}
//         >
//           <span className="text-lg">{icon}</span>
//           {label}
//         </Link>
//       ))}
//     </nav>
//   );
// }
