import CTASection from '@/layout/Homepage/CTASection';
import FounderSection from '@/layout/Homepage/FounderSection';
import HeroSection from '@/layout/Homepage/HeroSection';
import InvestorSection from '@/layout/Homepage/InvestorSection';
import StartupCategories from '@/layout/Homepage/StartupCategories';
import TrustedCompanies from '@/layout/Homepage/TrustedCompanies';
import React from 'react'

const page = () => {
  return (
    <>
    <HeroSection/>
    <TrustedCompanies/>
    <StartupCategories/>
    <InvestorSection/>
    <FounderSection/>
    <CTASection/>
    </>
  )
}

export default page