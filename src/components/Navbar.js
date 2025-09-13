"use client";

import Link from "next/link";
import routes from "@/constants/routes";

export default function Navbar() {
  return (
    <nav className="flex gap-6 p-4 bg-gray-900 text-white">
      <Link href={routes.home}>Home</Link>
      <Link href={routes.dashboard}>Dashboard</Link>
      <Link href={routes.viewAllProducts}>View All Products</Link>
      <Link href={routes.checkout}>Checkout</Link>
      <Link href={routes.checkoutPayment}>Payment</Link>
      <Link href={routes.loanApply}>Apply Loan</Link>
      <Link href={routes.rechargeHistory}>Recharge History</Link>
      <Link href={routes.login}>Login</Link>
    </nav>
  );
}
