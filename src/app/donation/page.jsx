import React from 'react'
import DonationCard from '@/components/donation/DonationMatter'
import NewFacelites from '@/components/donation/NewFacelites'
import Research from '@/components/donation/Research'
import ScholarShip from '@/components/donation/ScholarShip'
import Support from '@/components/donation//Support';
function Page() {
  return (
    <div>
      <Support />
      <DonationCard />
      <ScholarShip />
      <Research />
      <NewFacelites />

    </div>
  )
}

export default Page
