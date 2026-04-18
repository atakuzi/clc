window.APP_DATA = {
  syncFilterRoles: [
    { role: 'cg', label: 'CG / Senior Leaders' },
    { role: 'oic', label: 'OIC / NCOIC' },
    { role: 'art', label: 'ART (RTE)' },
    { role: 'cdo', label: 'CDO' },
    { role: 'intake', label: 'Intake &amp; Integration' },
    { role: 'pm', label: 'Product Managers' },
    { role: 'sm', label: 'Scrum Masters' },
    { role: 'dev', label: 'Developers' },
    { role: 'km', label: 'Knowledge Mgmt' },
    { role: 'sustainment', label: 'Sustainment' },
    { role: 'training', label: 'Training Team' }
  ],
  sprintBlocks: [
    {
      name: 'Discovery & Framing (Weeks 2-3)',
      label: 'Discovery &amp; Framing',
      subtitle: 'Weeks 2&ndash;3',
      className: 'sb1',
      flex: 2,
      meetings: ['Daily Standup (<=15 min)', 'Sprint kickoff planning'],
      deliverables: ['Technical discovery completed', 'Work estimates finalized', 'Prototypes if needed', 'Sprint-ready backlog']
    },
    {
      name: 'Dev Sprint 1 (Weeks 4-5)',
      label: 'Dev Sprint 1',
      subtitle: 'Weeks 4&ndash;5',
      className: 'sb-dev',
      flex: 2,
      meetings: ['Daily Standup (<=15 min)', 'AAR w/ DSD & Stakeholders', 'ART back-brief to boss'],
      deliverables: ['Sprint 1 increment', 'Updated milestone chart', 'Sprint boundary AAR']
    },
    {
      name: 'Dev Sprint 2 (Weeks 6-7)',
      label: 'Dev Sprint 2',
      subtitle: 'Weeks 6&ndash;7',
      className: 'sb-dev',
      flex: 2,
      meetings: ['Daily Standup (<=15 min)', 'Scrum of Scrums (~D+35)', 'Product Midpoint Check-in', 'AAR w/ DSD & Stakeholders'],
      deliverables: ['Sprint 2 increment', 'Midpoint assessment', 'Process adjustments documented']
    },
    {
      name: 'Dev Sprint 3 (Weeks 8-9)',
      label: 'Dev Sprint 3',
      subtitle: 'Weeks 8&ndash;9',
      className: 'sb-dev',
      flex: 2,
      meetings: ['Daily Standup (<=15 min)', 'AAR w/ DSD & Stakeholders'],
      deliverables: ['Sprint 3 increment', 'Integration testing', 'Updated milestone chart']
    },
    {
      name: 'Dev Sprint 4 (Weeks 10-11)',
      label: 'Dev Sprint 4',
      subtitle: 'Weeks 10&ndash;11',
      className: 'sb-dev',
      flex: 2,
      meetings: ['Daily Standup (<=15 min)', 'AAR w/ DSD & Stakeholders'],
      deliverables: ['Feature completion', 'Dev freeze before demo', 'Bug fixes only', 'Demo materials prepped']
    },
    {
      name: 'Demo / Retro (Week 12)',
      label: 'Demo/Retro',
      subtitle: 'Week 12',
      className: 'sb4',
      flex: 1,
      meetings: ['Product Demo (PMs lead)', 'Cycle Retro / AAR (all leads + DSD Director)'],
      deliverables: ['Working capability demonstrated', 'Feedback categorized: fix now / next cycle / backlog', 'Invest/divest/pivot decisions', 'Lessons learned documented']
    }
  ],
  meetings: [
    {
      phase: 'psb',
      style: 'background:rgba(42,8,69,0.04);',
      cells: [
        'DSD Lead Planning Day',
        'D-1',
        'Half day',
        'DSD Lead, Intake &amp; Integration Team, Team Leads, ART',
        'Intake &amp; Integration team presents scoped problems. Team leads recommend priority, then resource allocation. PSB RXL (rehearsal).',
        'PSB briefing package ready; draft order; no surprises at PSB'
      ]
    },
    {
      phase: 'psb',
      style: 'background:rgba(42,8,69,0.04);',
      cells: [
        'PSB with CG',
        'D-Day',
        'As scheduled',
        'CG (chairs), DSD, Division Chiefs, ART, CDO, PMs',
        'CG approves/defers/divests each project. Priorities ranked. Resources allocated.',
        'GO/NO-GO per project; decisions documented same day'
      ]
    },
    {
      phase: 'psb',
      style: 'background:rgba(42,8,69,0.04);',
      cells: [
        'ART Sync',
        'D+1',
        '1&ndash;2 hrs',
        'ART, Scrum Masters, team leads',
        'Assign teams to projects, identify cross-team dependencies, start work breakdown',
        'Teams assigned; dependency map'
      ]
    },
    {
      phase: 'psb',
      style: 'background:rgba(42,8,69,0.04);',
      cells: [
        'PI Kickoff',
        'D+2',
        '1&ndash;2 hrs',
        'All team members',
        'Brief PSB summary, set cycle objectives, Sprint 1 scope understood',
        'Everyone aligned on what we&rsquo;re building this cycle'
      ]
    },
    {
      phase: 'psb',
      style: 'background:rgba(42,8,69,0.04);',
      cells: [
        'BHO &mdash; Intake &amp; Integration to Team',
        'D+3',
        '1&ndash;2 hrs',
        'ART, PMs, Stakeholders',
        'Build stakeholder map per project: consumer, success criteria, approver',
        'Stakeholder map per project complete'
      ]
    },
    {
      phase: 'sprint',
      cells: [
        'Daily Standup',
        'Every work day (Wk 2&ndash;12)',
        '&le;15 min',
        'Sprint team (devs, SM, PM)',
        'What did you do, what will you do, any blockers',
        'Blockers escalated same day'
      ]
    },
    {
      phase: 'midpoint',
      style: 'background:rgba(212,130,10,0.04);',
      cells: [
        'Scrum of Scrums',
        '~D+35 (midpoint)',
        '1 hr',
        'All Scrum Masters + ART',
        '<strong>Process only</strong> &mdash; not project content. Is what we are doing working?',
        'Process changes agreed for remaining sprints'
      ]
    },
    {
      phase: 'midpoint',
      style: 'background:rgba(212,130,10,0.04);',
      cells: [
        'Product Midpoint Check-in',
        '~D+35 (same day)',
        '1 hr',
        'PMs + Stakeholders',
        '<strong>Project-specific.</strong> What&rsquo;s on track, what&rsquo;s at risk, what needs to pivot.',
        'Decisions documented; priorities adjusted if needed'
      ]
    },
    {
      phase: 'sprint',
      cells: [
        'Sprint Boundary AAR',
        'End of each sprint',
        '30&ndash;45 min',
        'Sprint team',
        'Internal team retro &mdash; what worked, what didn&rsquo;t',
        'Milestone chart updated; demo materials prepped'
      ]
    },
    {
      phase: 'sprint',
      style: 'background:rgba(212,130,10,0.04);',
      cells: [
        'AAR w/ DSD &amp; Stakeholders',
        'O/A first day of each sprint',
        '30&ndash;45 min',
        'ART, DSD, Stakeholders',
        'ART provides project updates to DSD and stakeholders. Status, risks, decisions.',
        'Leadership informed; blockers escalated'
      ]
    },
    {
      phase: 'sprint',
      style: 'background:rgba(212,130,10,0.04);',
      cells: [
        'ART Back-Brief',
        'Start of dev sprints',
        '30 min',
        'ART Leadership, boss',
        'Back-brief: the plan, dependencies, projected progress',
        'Boss aligned on expectations and constraints'
      ]
    },
    {
      phase: 'demo',
      style: 'background:rgba(196,26,28,0.04);',
      cells: [
        'Product Demo',
        'Week 12',
        'As needed',
        'PMs (lead), devs (support), stakeholders, CG/SLs',
        'Demo working capability &mdash; not slides. Named consumer validates.',
        'Feedback collected same day; categorized: fix now / next cycle / backlog / won&rsquo;t do'
      ]
    },
    {
      phase: 'demo',
      style: 'background:rgba(196,26,28,0.04);',
      cells: [
        'Cycle Retro / AAR',
        'Week 12 (after demo)',
        '1&ndash;2 hrs',
        'OIC/NCOIC (lead), ART, all team leads, <strong>DSD Director</strong>',
        'Full cycle retro. Cross-team patterns. Process changes for next cycle. <strong>Decision point: invest, divest, or pivot</strong> on each capability.',
        'Actionable items with owners and deadlines; invest/divest/pivot decisions documented'
      ]
    }
  ],
  syncMatrix: [
    {
      role: 'cg',
      cells: [
        { html: 'CG / Senior Leaders', className: 'col-role' },
        { html: '<ul><li>Chair PSB (D-Day)</li><li>Set priorities</li><li>Approve/defer/divest</li></ul>' },
        { html: 'No direct involvement', className: 'draft-note' },
        { html: 'No direct involvement', className: 'draft-note' },
        { html: 'No direct involvement', className: 'draft-note' },
        { html: 'No direct involvement', className: 'draft-note' },
        { html: 'No direct involvement', className: 'draft-note' },
        { html: '<ul><li>Attend demo</li><li>Provide feedback</li><li>Approve next cycle priorities</li></ul>' }
      ]
    },
    {
      role: 'oic',
      cells: [
        { html: 'OIC / NCOIC', className: 'col-role' },
        { html: '<ul><li>Attend Planning Day (D-1)</li><li>Brief at PSB</li><li>ART Sync (D+1)</li><li>PI Kickoff (D+2)</li></ul>' },
        { html: '<ul><li>Validate scope decisions</li><li>Resource allocation</li></ul>' },
        { html: '<ul><li>Remove blockers</li><li>Monitor progress</li></ul>' },
        { html: '<ul><li>Midpoint check-in (~D+35)</li><li>Remove blockers</li></ul>' },
        { html: '<ul><li>Remove blockers</li><li>Monitor progress</li></ul>' },
        { html: '<ul><li>Remove blockers</li><li>Monitor progress</li></ul>' },
        { html: '<ul><li>Review demo materials</li><li>Lead internal AAR</li><li>Prep next cycle PSB brief</li></ul>' }
      ]
    },
    {
      role: 'art',
      cells: [
        { html: 'ART (RTE)', className: 'col-role' },
        { html: '<ul><li>Support Planning Day (D-1)</li><li>Attend PSB</li><li>Lead ART Sync (D+1)</li><li>Lead PI Kickoff (D+2)</li><li>BHO &mdash; Intake &amp; Integration to Team (D+3)</li></ul>' },
        { html: '<ul><li>Assign teams &amp; work</li><li>Coordinate cross-team deps</li></ul>' },
        { html: '<ul><li>Facilitate sprint ceremonies</li><li>Shield devs from interruptions</li><li>AAR w/ DSD &amp; Stakeholders</li><li>Back-brief boss on plan &amp; dependencies</li></ul>' },
        { html: '<ul><li>Scrum of Scrums (~D+35)</li><li>Product Midpoint Check-in</li><li>Process adjustments</li><li>AAR w/ DSD &amp; Stakeholders</li></ul>' },
        { html: '<ul><li>Facilitate sprint ceremonies</li><li>Handle random drop-ins</li><li>AAR w/ DSD &amp; Stakeholders</li></ul>' },
        { html: '<ul><li>Facilitate sprint ceremonies</li><li>Handle random drop-ins</li><li>AAR w/ DSD &amp; Stakeholders</li></ul>' },
        { html: '<ul><li>Coordinate demo logistics</li><li>Facilitate Retro</li><li>Aggregate lessons learned</li></ul>' }
      ]
    },
    {
      role: 'cdo',
      cells: [
        { html: 'CDO', className: 'col-role' },
        { html: '<ul><li>Attend PSB</li><li>Align data strategy</li></ul>' },
        { html: '<ul><li>Validate data requirements</li><li>Governance guidance</li></ul>' },
        { html: '<ul><li>Available for governance decisions</li><li>Stakeholder engagement as needed</li></ul>', colspan: 4, style: 'text-align:center;' },
        { html: '<ul><li>Attend demo</li><li>Strategic feedback</li></ul>' }
      ]
    },
    {
      role: 'intake',
      cells: [
        { html: 'Intake &amp; Integration Team<br><span style="font-weight:400;font-size:10px;">(Deputy + 2&ndash;3)</span>', className: 'col-role' },
        { html: '<ul><li>Present scoped problems (D-1)</li><li>PSB RXL (rehearsal)</li><li>BHO &mdash; Team handoff (D+3)</li></ul>' },
        { html: '<ul><li><strong>PRIMARY EFFORT</strong></li><li>Scope incoming projects</li><li>Data connection &amp; history review</li><li>Feasibility assessment</li><li>Write sprint-ready requirements</li></ul>', style: 'background:rgba(55,126,184,0.06);' },
        { html: '<ul><li>Clarify requirements for devs</li><li>Begin scoping next cycle</li></ul>' },
        { html: '<ul><li>Continue next-cycle scoping</li><li>Answer dev questions</li></ul>' },
        { html: '<ul><li>Continue next-cycle scoping</li><li>Answer dev questions</li></ul>' },
        { html: '<ul><li>Finalize next-cycle scope</li><li>Support dev freeze prep</li></ul>' },
        { html: '<ul><li>Validate demo against requirements</li><li>Lessons learned (Responsible)</li></ul>' }
      ]
    },
    {
      role: 'pm',
      cells: [
        { html: 'Product Managers', className: 'col-role' },
        { html: '<ul><li>Attend PSB</li><li>BHO (D+3) &mdash; Intake &amp; Integration to Team</li><li>Stakeholder maps</li></ul>' },
        { html: '<ul><li>Prioritize backlog</li><li>Define acceptance criteria</li></ul>' },
        { html: '<ul><li>Manage backlog</li><li>Stakeholder engagement</li></ul>' },
        { html: '<ul><li>Midpoint product check-in</li><li>Adjust priorities</li></ul>' },
        { html: '<ul><li>Manage backlog</li><li>Stakeholder engagement</li></ul>' },
        { html: '<ul><li>Prep demo materials</li><li>Milestone chart update</li></ul>' },
        { html: '<ul><li>Lead product demo</li><li>Collect stakeholder feedback</li></ul>' }
      ]
    },
    {
      role: 'sm',
      cells: [
        { html: 'Scrum Masters', className: 'col-role' },
        { html: '<ul><li>ART Sync (D+1)</li><li>PI Kickoff (D+2)</li></ul>' },
        { html: '<ul><li>Stand up sprint ceremonies</li><li>Facilitate discovery sprint</li></ul>' },
        { html: '<ul><li>Daily standups</li><li>Remove blockers</li><li>Protect sprint time</li></ul>' },
        { html: '<ul><li>Scrum of Scrums (~D+35)</li><li>Process change discussion</li><li>Stakeholder engagement plan</li></ul>' },
        { html: '<ul><li>Daily standups</li><li>Remove blockers</li><li>Protect sprint time</li></ul>' },
        { html: '<ul><li>Dev freeze coordination</li><li>Sprint close-out</li></ul>' },
        { html: '<ul><li>Facilitate Demo/Retro</li><li>Update milestone chart</li></ul>' }
      ]
    },
    {
      role: 'dev',
      cells: [
        { html: 'Developers<br><span style="font-weight:400;font-size:10px;">(~5 per team)</span>', className: 'col-role' },
        { html: '<ul><li>PI Kickoff (D+2)</li></ul>' },
        { html: '<ul><li>Technical discovery</li><li>Estimate work</li><li>Prototype if needed</li></ul>' },
        { html: '<ul><li><strong>PRIMARY EFFORT</strong></li><li>Design &amp; build</li><li>Unit testing</li></ul>', style: 'background:rgba(212,130,10,0.06);' },
        { html: '<ul><li><strong>PRIMARY EFFORT</strong></li><li>Continue build</li><li>Integration testing</li></ul>', style: 'background:rgba(212,130,10,0.06);' },
        { html: '<ul><li><strong>PRIMARY EFFORT</strong></li><li>Continue build</li><li>Integration testing</li></ul>', style: 'background:rgba(212,130,10,0.06);' },
        { html: '<ul><li>Feature completion</li><li>Dev freeze before demo</li><li>Bug fixes only</li></ul>', style: 'background:rgba(212,130,10,0.06);' },
        { html: '<ul><li>Support demo</li><li>Internal team AAR</li></ul>' }
      ]
    },
    {
      role: 'km',
      cells: [
        { html: 'Knowledge Mgmt (KM)<br><span style="font-weight:400;font-size:10px;">(Under Intake &amp; Integration)</span>', className: 'col-role' },
        { html: '<ul><li>BHO (D+3)</li></ul>' },
        { html: '<ul><li>Develop artifacts</li><li>Help with documentation</li></ul>', style: 'background:rgba(55,126,184,0.06);' },
        { html: '<ul><li>Update technical docs</li><li>Update user guides</li></ul>' },
        { html: '<ul><li>Update technical docs</li><li>Update user guides</li></ul>' },
        { html: '<ul><li>Update technical docs</li><li>Update user guides</li></ul>' },
        { html: '<ul><li>Update technical docs</li><li>Update user guides</li></ul>' },
        { html: '<ul><li>Link with PMs</li><li>Compile demo &amp; AAR materials</li></ul>' }
      ]
    },
    {
      role: 'sustainment',
      cells: [
        { html: 'Sustainment<br><span class="tbd">TBD &mdash; Need People</span>', className: 'col-role' },
        { html: 'N/A this cycle', className: 'draft-note' },
        { html: 'N/A this cycle', className: 'draft-note' },
        { html: 'N/A this cycle', className: 'draft-note' },
        { html: 'N/A this cycle', className: 'draft-note' },
        { html: 'N/A this cycle', className: 'draft-note' },
        { html: 'N/A this cycle', className: 'draft-note' },
        { html: '<ul><li>Handoff briefing</li><li>Accept deployed capabilities</li></ul>' }
      ]
    },
    {
      role: 'training',
      cells: [
        { html: 'Training Team<br><span style="font-weight:400;font-size:10px;">(Outside ODT)</span>', className: 'col-role' },
        { html: 'N/A', className: 'draft-note' },
        { html: 'N/A', className: 'draft-note' },
        { html: 'N/A', className: 'draft-note' },
        { html: 'N/A', className: 'draft-note' },
        { html: 'N/A', className: 'draft-note' },
        { html: '<ul><li>Develop training materials for new capabilities</li></ul>' },
        { html: '<ul><li>Validate training against demo</li></ul>' }
      ]
    }
  ]
};
