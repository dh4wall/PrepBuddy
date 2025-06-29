import { getUserDetails } from '@/lib/actions/auth.action'

import UserDashboard from '@/components/UserDashboard'

export default async function ProfilePage() {
  const user = await getUserDetails()

  if (!user) return <div className="text-white text-center mt-20">Please log in to view your profile</div>

  return <UserDashboard user={user} />
}
