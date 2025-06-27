import { useSelector } from "react-redux";
import { selectCurrentToken } from "../services/authSlice";
import { jwtDecode } from "jwt-decode";

interface UserInfo {
  id: string;
  email: string;
  roles: string[];
  firstName: string;
  lastName: string;
  userPermissions: string[];
}

interface DecodedToken {
  UserInfo: UserInfo;
}

interface AuthResult {
  id: string;
  email: string;
  roles: string[];
  status: "Employee" | "Admin" | "SuperAdmin";
  isEmployee: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  firstName: string;
  lastName: string;
  permissions: string[];
}

const useAuth = (): AuthResult => {
  const token = useSelector(selectCurrentToken);

  // Default fallback values
  const defaultAuth: AuthResult = {
    id: "",
    email: "",
    roles: [],
    status: "Employee",
    isEmployee: true,
    isAdmin: false,
    isSuperAdmin: false,
    firstName: "",
    lastName: "",
    permissions: [],
  };

  if (!token) return defaultAuth;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const { id, email, roles, firstName, lastName, userPermissions } =
      decoded.UserInfo;

    const isEmployee = roles.includes("Employee");
    const isAdmin = roles.includes("Admin");
    const isSuperAdmin = roles.includes("SuperAdmin");
    const permissions = userPermissions || [];

    // Determine status
    let status: AuthResult["status"] = "Employee";
    if (isSuperAdmin) status = "SuperAdmin";
    else if (isAdmin) status = "Admin";

    return {
      id,
      email,
      roles,
      status,
      isEmployee,
      isAdmin,
      isSuperAdmin,
      firstName,
      lastName,
      permissions,
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return defaultAuth;
  }
};

export default useAuth;
