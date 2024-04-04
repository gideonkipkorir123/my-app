"use client";
import React from "react";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import Card from "./components/card";
import FeaturesSection from "./components/Feature";
import ApplySection from "./components/ApplySection";
import Footer from "./components/Footer";
import Benefits from "./components/Benefits";
import RegisterForm from "./components/Register";

export default function Homepage() {
  const user = { name: "John Doe", email: "john@example.com" };

  return (
    <div>
      <Navigation user={user} />
      <HeroSection />
      <Card>
        <FeaturesSection />
        <Benefits />

        <RegisterForm />
      </Card>

      <Footer />
    </div>
  );
}
