// src/constants/routes.js
// Centralized route paths for your app
import React from "react";
import Link from "next/link";
import LoginScreen from "@/app/auth/login/page";

const routes = {
  home: "/",
  dashboard: "/pages/dashboard",   
  viewAllProducts: "/viewall-product",
  checkout: "/checkout",
  checkoutPayment: "/shopping/payment",
  loanApply: "/loan/apply",
  rechargeHistory: "/recharge/history",
  login: "/auth/login", 



};

export default routes;
