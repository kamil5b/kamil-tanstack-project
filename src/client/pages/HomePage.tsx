"use client";

import { Link } from "@tanstack/react-router";
import { Card } from "@/client/components/ui/card";
import { navData } from "../lib/nav";

export default function ProductFormTemplate() {
  return navData.map((item) => (
    <Link key={item.title} to={item.url}>
      <Card className="p-4">
        <h2 className="text-lg font-semibold">{item.title}</h2>
      </Card>
    </Link>
  ));
}
