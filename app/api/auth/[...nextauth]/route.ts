// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth";

// v5 requires exporting the GET/POST from handlers
export const { GET, POST } = handlers;
