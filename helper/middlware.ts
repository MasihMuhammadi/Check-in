// helper/middleware.ts
import Cookies from "js-cookie";
export default function Middleware() {
  console.log(Cookies.get("teacher_access"));

  // Perform server-side checks or operations
}
