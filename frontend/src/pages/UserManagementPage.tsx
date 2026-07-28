import { useEffect, useMemo, useState } from "react";
import { Search, Shield, Crown, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import userService, { User } from "../services/userService";
import {
  notifySuccess,
  notifyError,
} from "../services/notificationService";

const roles: User["role"][] = [
  "Owner",
  "Admin",
  "Manager",
  "Member",
  "Viewer",
];

const roleStyles: Record<User["role"], string> = {
  Owner:
    "bg-red-500/15 text-red-400 border border-red-500/30",
  Admin:
    "bg-purple-500/15 text-purple-400 border border-purple-500/30",
  Manager:
    "bg-blue-500/15 text-blue-400 border border-blue-500/30",
  Member:
    "bg-green-500/15 text-green-400 border border-green-500/30",
  Viewer:
    "bg-gray-500/15 text-gray-400 border border-gray-500/30",
};

export default function UserManagementPage() {
  const { user: currentUser } = useAuth();
  const canManageUsers = ["Owner", "Admin"].includes(
    currentUser?.role ?? ""
  );

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] =
    useState<number | null>(null);

  const [search, setSearch] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);

      const data = await userService.getUsers();

      setUsers(data);
    } catch (error) {
      console.error(error);

      notifyError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!canManageUsers) {
      setLoading(false);
      return;
    }

    loadUsers();
  }, [canManageUsers]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const text =
        `${u.name} ${u.email} ${u.role}`.toLowerCase();

      return text.includes(search.toLowerCase());
    });
  }, [users, search]);

  const assignableRoles = useMemo(() => {
    return currentUser?.role === "Admin"
      ? roles.filter((role) => role !== "Owner")
      : roles;
  }, [currentUser?.role]);

  const handleRoleChange = async (
    targetUser: User,
    newRole: User["role"]
  ) => {
    if (targetUser.role === newRole) return;

    if (targetUser.role === "Owner") {
      notifyError("Owner role cannot be modified.");
      return;
    }

    if (targetUser.id === currentUser?.id) {
      notifyError(
        "You cannot change your own role."
      );
      return;
    }

    const confirmed = window.confirm(
      `Change ${targetUser.name}'s role from ${targetUser.role} to ${newRole}?`
    );

    if (!confirmed) return;

    try {
      setUpdatingId(targetUser.id);

      await userService.updateRole(
        targetUser.id,
        newRole
      );

      setUsers((prev) =>
        prev.map((u) =>
          u.id === targetUser.id
            ? {
                ...u,
                role: newRole,
              }
            : u
        )
      );

      notifySuccess(
        `${targetUser.name} is now ${newRole}.`
      );
    } catch (error: any) {
      console.error(error);

      notifyError(
        error?.response?.data?.message ??
          "Unable to update role."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-12">

        <div className="flex flex-col items-center gap-4">

          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />

          <p className="text-secondary">
            Loading users...
          </p>

        </div>

      </div>
    );
  }

  if (!canManageUsers) {
    return (
      <div className="flex min-h-full items-center justify-center p-8">
        <div className="max-w-md rounded-2xl border border-default bg-surface p-8 text-center shadow-lg">
          <Shield size={40} className="mx-auto text-indigo-400" />
          <h1 className="mt-4 text-2xl font-black text-primary">
            User Management
          </h1>
          <p className="mt-3 text-secondary">
            Only workspace Owners and Admins can manage members and roles.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-black text-primary">
            User Management
          </h1>

          <p className="mt-2 text-secondary">
            Manage workspace members and roles.
          </p>

        </div>

        <div className="rounded-xl border border-default bg-surface px-5 py-3">

          <p className="text-xs uppercase tracking-wider text-secondary">
            Total Users
          </p>

          <h2 className="text-3xl font-bold text-primary">
            {users.length}
          </h2>

        </div>

      </div>

      <div className="relative mb-6">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search users..."
          className="w-full rounded-xl border border-default bg-surface py-3 pl-11 pr-4 outline-none focus:border-indigo-500"
        />

      </div>

      <div className="overflow-hidden rounded-2xl border border-default bg-surface shadow-lg">

        <table className="w-full">
            
            <thead className="border-b border-default bg-surface-2">

                <tr className="text-left">

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary">
                    User
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary">
                    Email
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary">
                    Role
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary">
                    Change Role
                </th>

                </tr>

            </thead>

            <tbody>

                {filteredUsers.length === 0 && (

                <tr>

                    <td
                    colSpan={4}
                    className="py-12 text-center text-secondary"
                    >
                    No users found.
                    </td>

                </tr>

                )}

                {filteredUsers.map((user) => {

                const disabled =
                    updatingId === user.id ||
                    user.role === "Owner" ||
                    currentUser?.id === user.id;

                return (

                    <tr
                    key={user.id}
                    className="border-b border-default transition hover:bg-surface-2"
                    >

                    <td className="px-6 py-5">

                        <div className="flex items-center gap-4">

                        {user.avatar ? (

                            <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-12 w-12 rounded-full object-cover"
                            />

                        ) : (

                            <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                user.name
                            )}&background=4f46e5&color=ffffff`}
                            alt={user.name}
                            className="h-12 w-12 rounded-full"
                            />

                        )}

                        <div>

                            <div className="flex items-center gap-2">

                            <p className="font-semibold text-primary">
                                {user.name}
                            </p>

                            {user.role === "Owner" && (

                                <Crown
                                size={16}
                                className="text-yellow-400"
                                />

                            )}

                            {user.role === "Admin" && (

                                <Shield
                                size={15}
                                className="text-purple-400"
                                />

                            )}

                            </div>

                            <p className="mt-1 text-xs text-secondary">

                            {user.created_at
                                ? new Date(
                                    user.created_at
                                ).toLocaleDateString()
                                : "Joined recently"}

                            </p>

                        </div>

                        </div>

                    </td>

                    <td className="px-6 py-5">

                        <span className="text-sm text-primary">

                        {user.email}

                        </span>

                    </td>

                    <td className="px-6 py-5">

                        <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${roleStyles[user.role]}`}
                        >

                        {user.role}

                        </span>

                    </td>

                    <td className="px-6 py-5">

                        <select
                        value={user.role}
                        disabled={disabled}
                        onChange={(e) =>
                            handleRoleChange(
                            user,
                            e.target.value as User["role"]
                            )
                        }
                        className={`rounded-lg border border-default bg-surface px-3 py-2 text-sm outline-none transition focus:border-indigo-500 ${
                            disabled
                            ? "cursor-not-allowed opacity-60"
                            : ""
                        }`}
                        >

                        {(user.role === "Owner"
                          ? roles
                          : assignableRoles
                        ).map((role) => (

                            <option
                            key={role}
                            value={role}
                            >
                            {role}
                            </option>

                        ))}

                        </select>

                        {updatingId === user.id && (

                        <div className="mt-2 flex items-center gap-2">

                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />

                            <span className="text-xs text-secondary">

                            Updating...

                            </span>

                        </div>

                        )}

                        {currentUser?.id === user.id && (

                        <p className="mt-2 text-xs text-yellow-400">

                            You cannot change your own role.

                        </p>

                        )}

                        {user.role === "Owner" && (

                        <p className="mt-2 text-xs text-red-400">

                            Owner role is protected.

                        </p>

                        )}

                    </td>

                    </tr>

                );

                })}

            </tbody>
            
        </table>

    </div>

    {/* Bottom Summary Cards */}

    <div className="mt-8 grid gap-6 md:grid-cols-5">

      <div className="rounded-2xl border border-default bg-surface p-5">

        <p className="text-xs uppercase tracking-wider text-secondary">
          Owners
        </p>

        <h2 className="mt-2 text-3xl font-black text-red-400">
          {users.filter((u) => u.role === "Owner").length}
        </h2>

      </div>

      <div className="rounded-2xl border border-default bg-surface p-5">

        <p className="text-xs uppercase tracking-wider text-secondary">
          Admins
        </p>

        <h2 className="mt-2 text-3xl font-black text-purple-400">
          {users.filter((u) => u.role === "Admin").length}
        </h2>

      </div>

      <div className="rounded-2xl border border-default bg-surface p-5">

        <p className="text-xs uppercase tracking-wider text-secondary">
          Managers
        </p>

        <h2 className="mt-2 text-3xl font-black text-blue-400">
          {users.filter((u) => u.role === "Manager").length}
        </h2>

      </div>

      <div className="rounded-2xl border border-default bg-surface p-5">

        <p className="text-xs uppercase tracking-wider text-secondary">
          Members
        </p>

        <h2 className="mt-2 text-3xl font-black text-green-400">
          {users.filter((u) => u.role === "Member").length}
        </h2>

      </div>

      <div className="rounded-2xl border border-default bg-surface p-5">

        <p className="text-xs uppercase tracking-wider text-secondary">
          Viewers
        </p>

        <h2 className="mt-2 text-3xl font-black text-gray-400">
          {users.filter((u) => u.role === "Viewer").length}
        </h2>

      </div>

    </div>

    {/* Info Banner */}

    <div className="mt-8 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-5">

      <div className="flex items-start gap-4">

        <UserCircle
          size={32}
          className="text-indigo-400"
        />

        <div>

          <h3 className="text-lg font-bold text-primary">
            Role Permissions
          </h3>

          <div className="mt-4 grid gap-3 md:grid-cols-2">

            <div>

              <p className="font-semibold text-red-400">
                👑 Owner
              </p>

              <p className="text-sm text-secondary">
                Full system access. Cannot be modified from
                the dashboard.
              </p>

            </div>

            <div>

              <p className="font-semibold text-purple-400">
                🛡 Admin
              </p>

              <p className="text-sm text-secondary">
                Manage users, projects and tasks.
              </p>

            </div>

            <div>

              <p className="font-semibold text-blue-400">
                📋 Manager
              </p>

              <p className="text-sm text-secondary">
                Create and manage projects and tasks.
              </p>

            </div>

            <div>

              <p className="font-semibold text-green-400">
                👤 Member
              </p>

              <p className="text-sm text-secondary">
                Can work on assigned tasks.
              </p>

            </div>

            <div>

              <p className="font-semibold text-gray-400">
                👀 Viewer
              </p>

              <p className="text-sm text-secondary">
                Read-only access.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

);
}
