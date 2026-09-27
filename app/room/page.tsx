import { redirect } from "next/navigation";

// The room is now the home page; keep old links working.
export default function RoomRedirect() {
  redirect("/");
}
