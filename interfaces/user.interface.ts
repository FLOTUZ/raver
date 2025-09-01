import { Checker, Host } from "@/interfaces";
import { $Enums } from "@prisma/client";
export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: $Enums.Role;
  host: Host;
  host_id: string;
  checkers: Checker[];
}
