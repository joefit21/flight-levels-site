// Single list of the online practice tools, used by the nav, the footer and the
// homepage tools section so a new tool only has to be added here.
export const PRODUCTS = [
  {
    id: 'adm_trainer',
    label: 'ADM Trainer',
    href: 'https://adm.flight-levels.com',
    demoHref: 'https://adm.flight-levels.com/demo',
    icon: '🧭',
    badge: 'New',
    blurb: 'Decision-making scenarios in your own airplane',
    bestFor: 'Any pilot who wants to rehearse the call before they ever have to make it.',
    description:
      'Pick your aircraft and something goes wrong: an engine, electrical, fuel or control problem, or sometimes nothing at all. Answer in your own words, turn by turn, and get an honest debrief on your decisions.',
    price: '$29 / month · Cancel anytime',
    button: 'Try a Free Scenario',
    accent: { border: 'border-amber-200', badge: 'bg-amber-500', button: 'bg-amber-600 hover:bg-amber-700 text-white' },
  },
  {
    id: 'checkride_prep',
    label: 'Checkride Prep',
    href: 'https://checkride.flight-levels.com',
    demoHref: 'https://checkride.flight-levels.com/demo',
    icon: '🎓',
    badge: 'AI',
    blurb: 'Oral exam practice with an AI examiner',
    bestFor: 'Student, instrument and commercial applicants getting ready for the oral.',
    description:
      'Practice your oral exam on demand with an AI examiner trained to think like a real DPE. Private, Instrument and Commercial. Voice-enabled. Available at 11pm the night before your checkride.',
    price: '$29 / month · Cancel anytime',
    button: 'Try Free Demo',
    accent: { border: 'border-teal-100', badge: 'bg-teal-500', button: 'bg-[#0f766e] hover:bg-[#0d6460] text-white' },
  },
  {
    id: 'flight_review_prep',
    label: 'Flight Review Prep',
    href: 'https://flightreview.flight-levels.com',
    demoHref: 'https://flightreview.flight-levels.com/demo',
    icon: '✈️',
    badge: 'AI',
    blurb: 'Brush up before your biennial',
    bestFor: 'Certificated pilots coming up on a flight review who want the ground portion fresh.',
    description:
      'Practice the ground portion of your flight review with an AI CFI. Part 91 regulations, airspace, weather, emergency procedures and more. Available 24/7 before your actual review.',
    price: '$29 / month · Cancel anytime',
    button: 'Try Free Demo',
    accent: { border: 'border-green-100', badge: 'bg-green-500', button: 'bg-green-600 hover:bg-green-700 text-white' },
  },
  {
    id: 'atc_trainer',
    label: 'ATC Trainer',
    href: 'https://practice.flight-levels.com',
    demoHref: 'https://practice.flight-levels.com',
    icon: '🎙️',
    badge: null,
    blurb: 'Clearance readbacks and radio practice',
    bestFor: 'Pilots who want to sound sharper and stay ahead on the radio, especially IFR.',
    description:
      'AI-generated ATC scenarios for practicing ground control and IFR clearance readbacks. Built with authentic ATC knowledge, drawn from years working the controller position.',
    price: '$29 / month · Cancel anytime',
    button: 'Try Free Demo',
    accent: { border: 'border-gray-100', badge: 'bg-blue-500', button: 'bg-[#1d4ed8] hover:bg-[#1e40af] text-white' },
  },
]
