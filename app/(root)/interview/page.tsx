import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <h3>Interview generation</h3>

      <Agent
        userName={user?.name!}
        userId={user?.id ?? ""}
        profileURL={user?.profileURL} // ✅ Corrected here
        type="generate"
      />
    </>
  );
};

export default Page;