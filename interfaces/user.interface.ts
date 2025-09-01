import { $Enums } from "@prisma/client";

import { Checker, Host } from "@/interfaces";
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
