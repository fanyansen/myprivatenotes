"use client";
import { useLogoutMutation } from "@/generated/graphql";
import { clearToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [submitLogout, { client: logoutClient, error }] = useLogoutMutation();
  const router = useRouter();
  const onLogoutHandler = async () => {
    if (!error) {
      await submitLogout().then(() => {
        logoutClient.stop();
      });
      await logoutClient.resetStore();
      clearToken();
    }

    router.push("/login");
    // return navigateToLoginPage();
  };

  return (
    <>
      {children}
      <button onClick={onLogoutHandler}>Log Out</button>
    </>
  );
}
