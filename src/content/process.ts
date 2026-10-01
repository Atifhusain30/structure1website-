import type { ProcessStep } from './types';

export const processSteps: ProcessStep[] = [
  {
    number: '01', title: 'Estimate',
    summary: 'Tell us about your project. We reply within one business day with next steps and a ballpark range, then walk the site with you.',
    homeownerDoes: 'Send the form or call. Share a few photos of the space and what you have in mind.',
    weDo: 'Site visit, measurements, and a written, itemized estimate that includes permits and engineering.',
    timing: 'Reply within one business day. Site visit within the week in most cases.',
  },
  {
    number: '02', title: 'Design',
    summary: 'Material selection and drawings tailored to your home, sized to its proportions and roofline.',
    homeownerDoes: 'Choose style, roofing, ceiling finish, lighting, and fans from samples we bring to you.',
    weDo: 'Architectural drawings, wind-load engineering where required, and the HOA package if your neighborhood needs one.',
    timing: 'Typically one to two weeks alongside the permit submission.',
  },
  {
    number: '03', title: 'Permit',
    summary: 'We handle every city permit and HOA submission so the build clears inspection on the first pass.',
    homeownerDoes: 'Sign the HOA form if your community requires an owner signature. That is usually all.',
    weDo: 'Submit plans, answer plan-review comments, and schedule inspections.',
    timing: 'Permit approval usually takes one to two weeks depending on the city.',
  },
  {
    number: '04', title: 'Build',
    summary: 'In-house crew, one lead carpenter, daily progress updates, and a clean site at the end of every day.',
    homeownerDoes: 'Keep the work area clear and enjoy watching it come together.',
    weDo: 'Footings, framing, roofing, ceiling, electrical rough-in coordination, finish work, and a final walk-through with you.',
    timing: 'Three to seven days on site for most patio covers; one to two weeks for larger outdoor living projects. Two to four weeks end to end.',
  },
];
