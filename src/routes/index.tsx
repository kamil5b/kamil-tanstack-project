import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/client/pages/HomePage";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return HomePage();
}
