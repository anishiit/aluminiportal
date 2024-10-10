import React from 'react'
import DonationCard from '@/components/donation/DonationMatter'
import NewFacelites from '@/components/donation/NewFacelites'
import Research from '@/components/donation/Research'
import ScholarShip from '@/components/donation/ScholarShip'
import Support from '@/components/donation//Support';
import Navbar2 from '@/components/header/Navbar2'
function Page() {
  return (
    <div>
    <Navbar2/>
      <Support />
      <DonationCard />
      <ScholarShip />
      <Research />
      <NewFacelites />

    </div>
  )
}

export default Page
