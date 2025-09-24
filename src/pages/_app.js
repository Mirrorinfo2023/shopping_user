import "@/styles/globals.css";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pathname = router.pathname;

  // Hide header/nav on login/signup pages
  const hideHeaderNav = pathname === "/" || pathname.startsWith("/auth");

  return (
    <div className={`${montserrat.variable} font-montserrat bg-white text-black`}>
      {!hideHeaderNav && <Header cartCount={3} />}

      <main className="font-sans min-h-screen">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
