// src/data/chaptersData.js

export const mockTopic = (id) => ([{
  id: `${id}_t1`, name: "Lecture 1 - Core Concepts", videoId: 'placeholder',
  thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400&auto=format&fit=crop',
  notesText: 'Notes are being synthesized.', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '10 Questions'
}]);

export const allChaptersData = {
  physics: {
    colorText: 'text-sky-300',
    colorHex: 'sky',
    'p_u1': {
      name: 'Units and Measurements',
      shortNotes: "A quick review of fundamental quantities, dimensional consistency, and error analysis rules.",
      shortNotesPdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      topics: [
        { id: 'p_u1_t1', name: "Lecture 1 - Introduction to Dimensions", videoId: 'UuzZYVRcemY', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400&auto=format&fit=crop', notesText: 'Introduction to Dimensions', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '10 Questions' },
        { id: 'p_u1_t2', name: "Lecture 2 - Dimensional Analysis Part 1", videoId: 'iqBJ9_Vyj50', thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=400&auto=format&fit=crop', notesText: 'Dimensional Analysis Part 1', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions' },
        { id: 'p_u1_t3', name: "Lecture 3 - Dimensional Analysis Part 2", videoId: 'e3yRZaynPE0', thumbnail: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=400&auto=format&fit=crop', notesText: 'Dimensional Analysis Part 2', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions' },
        { id: 'p_u1_t4', name: "Lecture 4 - Error Analysis", videoId: 'yLUqpb4UosQ', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400&auto=format&fit=crop', notesText: 'Error Analysis Part 1', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '20 Questions' },
        { id: 'p_u1_t5', name: "Lecture 5 - Vernier Calipers", videoId: 'JRv_HJfGXPg', thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=400&auto=format&fit=crop', notesText: 'Vernier Calipers', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '10 Questions' },
        { id: 'p_u1_t6', name: "Lecture 6 - Screw Gauge", videoId: 'zdHaVcc1nOs', thumbnail: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=400&auto=format&fit=crop', notesText: 'Screw Gauge', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '10 Questions' },
        { id: 'p_u1_t7', name: "Lecture 7 - PYQs and Advanced Problems", videoId: 'POg_kjzChqU', thumbnail: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=400&auto=format&fit=crop', notesText: 'PYQs and Advanced Problems', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '25 Questions'}
      ]
    },
    'p_u2': { name: 'Kinematics', shortNotes: 'Notes coming soon.', topics: mockTopic('p_u2') },
    'p_u3': { name: 'Laws of Motion', shortNotes: 'Notes coming soon.', topics: mockTopic('p_u3') },
    'p_u4': { name: 'Work, Energy and Power', shortNotes: 'Notes coming soon.', topics: mockTopic('p_u4') },
    'p_u5': { name: 'Rotational Motion', shortNotes: 'Notes coming soon.', topics: mockTopic('p_u5') },
    'p_u6': { name: 'Gravitation', shortNotes: 'Notes coming soon.', topics: mockTopic('p_u6') },
    'p_u7': { name: 'Properties of Solids and Liquids', shortNotes: 'Notes coming soon.', topics: mockTopic('p_u7') },
    'p_u8': { name: 'Thermodynamics', shortNotes: 'Notes coming soon.', topics: mockTopic('p_u8') },
    'p_u9': { name: 'Kinetic Theory of Gases', shortNotes: 'Notes coming soon.', topics: mockTopic('p_u9') },
    'p_u10': { name: 'Oscillations and Waves', shortNotes: 'Notes coming soon.', topics: mockTopic('p_u10') },
    'p_u11': { 
      name: 'Electrostatics', 
      shortNotes: 'A comprehensive review of electric charges, Coulomb\'s Law, Electric Fields, Gauss\'s Law, and Electric Potential.', 
      shortNotesPdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      topics: [
        { id: 'p_u11_t1', name: "Lecture 1 - Introduction and Properties of Charge", videoId: 'placeholder_e1', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Properties of Charge', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '10 Questions' },
        { id: 'p_u11_t2', name: "Lecture 2 - Coulomb's Law and Superposition", videoId: 'placeholder_e2', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Coulomb\'s Law & Superposition', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions' },
        { id: 'p_u11_t3', name: "Lecture 3 - Electric Field", videoId: 'placeholder_e3', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Concept of Electric Field', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions' },
        { id: 'p_u11_t4', name: "Lecture 4 - Electric Field Lines", videoId: 'placeholder_e4', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Properties of Field Lines', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '10 Questions' },
        { id: 'p_u11_t5', name: "Lecture 5 - Electric Dipole", videoId: 'placeholder_e5', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Axial and Equatorial Fields', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '20 Questions' },
        { id: 'p_u11_t6', name: "Lecture 6 - Electric Flux & Gauss Law", videoId: 'placeholder_e6', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Introduction to Gauss Law', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions' },
        { id: 'p_u11_t7', name: "Lecture 7 - Applications of Gauss Law", videoId: 'placeholder_e7', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Infinite Wires and Sheets', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '20 Questions' },
        { id: 'p_u11_t8', name: "Lecture 8 - Electric Potential", videoId: 'placeholder_e8', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Potential due to Point Charge', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions' },
        { id: 'p_u11_t9', name: "Lecture 9 - Electric Potential due to Dipole", videoId: 'placeholder_e9', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Dipole Potential & Work Done', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '10 Questions' },
        { id: 'p_u11_t10', name: "Lecture 10 - Equipotential Surfaces", videoId: 'placeholder_e10', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Properties of Equipotential Surfaces', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '10 Questions' },
        { id: 'p_u11_t11', name: "Lecture 11 - Electric Potential Energy", videoId: 'placeholder_e11', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'System of Charges', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions', isAdvanced: true },
        { id: 'p_u11_t12', name: "Lecture 12 - Advanced Problems (PYQs)", videoId: 'placeholder_e12', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'JEE Main & Adv Previous Year Questions', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '25 Questions', isAdvanced: true }
      ]
    },
    'p_u12': { name: 'Current Electricity', shortNotes: 'Notes coming soon.', topics: mockTopic('p_u12') },
    'p_u13': { name: 'Magnetic Effects of Current and Magnetism', shortNotes: 'Notes coming soon.', topics: mockTopic('p_u13') },
    'p_u14': { name: 'Electromagnetic Induction and AC', shortNotes: 'Notes coming soon.', topics: mockTopic('p_u14') },
    'p_u15': { name: 'Electromagnetic Waves', shortNotes: 'Notes coming soon.', topics: mockTopic('p_u15') },
    'p_u16': { name: 'Optics', shortNotes: 'Notes coming soon.', topics: mockTopic('p_u16') },
    'p_u17': { name: 'Dual Nature of Matter and Radiation', shortNotes: 'Notes coming soon.', topics: mockTopic('p_u17') },
    'p_u18': { name: 'Atoms and Nuclei', shortNotes: 'Notes coming soon.', topics: mockTopic('p_u18') },
    'p_u19': { name: 'Electronic Devices', shortNotes: 'Notes coming soon.', topics: mockTopic('p_u19') },
    'p_u20': { name: 'Experimental Skills', shortNotes: 'Notes coming soon.', topics: mockTopic('p_u20') }
  },
  chemistry: {
    colorText: 'text-emerald-400',
    colorHex: 'emerald',
    'c_u1': { 
      name: 'Some Basic Concepts in Chemistry', 
      shortNotes: 'Core overview of Stoichiometry, Mole Concept, and Chemical Combinations.', 
      topics: [
        { id: 'c_u1_t1', name: "Lecture 1 - Introduction to Chemistry", videoId: 'Qy0Q_AYs63Y', thumbnail: 'https://images.unsplash.com/photo-1603126859592-2361ac86b8db?q=80&w=400', notesText: 'Matter and Classification', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '10 Questions' },
        { id: 'c_u1_t2', name: "Lecture 2 - Laws of Chemical Combinations", videoId: '3vwSPlDrgtU', thumbnail: 'https://images.unsplash.com/photo-1603126859592-2361ac86b8db?q=80&w=400', notesText: 'Chemical combination laws', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions' },
        { id: 'c_u1_t3', name: "Lecture 3 - Mole Concept", videoId: 'omuhMcN9z-M', thumbnail: 'https://images.unsplash.com/photo-1603126859592-2361ac86b8db?q=80&w=400', notesText: 'Atomic mass & Mole concept', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '20 Questions' },
        { id: 'c_u1_t4', name: "Lecture 4 - Molarity & Concentration Terms", videoId: 'xv908em4LtY', thumbnail: 'https://images.unsplash.com/photo-1603126859592-2361ac86b8db?q=80&w=400', notesText: 'Concentration calculations', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions' }
      ]
    },
    'c_u2': { name: 'Atomic Structure', shortNotes: 'Notes coming soon.', topics: mockTopic('c_u2') },
    'c_u4': { name: 'Chemical Thermodynamics', shortNotes: 'Notes coming soon.', topics: mockTopic('c_u4') },
    'c_u6': { name: 'Equilibrium', shortNotes: 'Notes coming soon.', topics: mockTopic('c_u6') },
    'c_u9': { 
      name: 'Classification of Elements & Periodicity', 
      shortNotes: 'Notes on Genesis of Periodic Classification and Periodic Trends.', 
      topics: [
        { id: 'c_u9_t1', name: "Lecture 1 - Genesis of Periodic Classification", videoId: 'TOXF8LXEFJw', thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=400', notesText: 'Mendeleev & Modern Table', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions' },
        { id: 'c_u9_t2', name: "Lecture 2 - Periodic Trends in Properties", videoId: 'KPeSahbVxQE', thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=400', notesText: 'Ionization, Electronegativity', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '20 Questions' }
      ] 
    },
    'c_u3': { name: 'Chemical Bonding and Molecular Structure', shortNotes: 'Notes coming soon.', topics: mockTopic('c_u3') },
    'c_u10': { name: 'p-Block Elements (Group 13-14)', shortNotes: 'Notes coming soon.', topics: mockTopic('c_u10') },
    'c_u13': { 
      name: 'Purification & Characterisation', 
      shortNotes: 'Key methodologies for isolating and purifying organic compounds.', 
      topics: [
        { id: 'c_u13_t1', name: "Lecture 1 - Purification and Characterisation (Live session)", videoId: '9ldKfnFH9L8', thumbnail: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=400', notesText: 'Distillation, Chromatography', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '25 Questions' }
      ] 
    },
    'c_u14': { name: 'Basic Principles of Organic Chemistry', shortNotes: 'Notes coming soon.', topics: mockTopic('c_u14') },
    'c_u15': { name: 'Hydrocarbons', shortNotes: 'Notes coming soon.', topics: mockTopic('c_u15') },
    'c_u5': { 
      name: 'Solutions', 
      shortNotes: 'Concentration of solutions, Raoult’s law, Colligative properties.', 
      topics: [
        { id: 'c_u5_t1', name: "Lecture 1 - Types of Solutions", videoId: 'placeholder_s1', thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400', notesText: 'Types and Concentrations', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '10 Questions' },
        { id: 'c_u5_t2', name: "Lecture 2 - Raoult's Law & Ideal Solutions", videoId: 'placeholder_s2', thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400', notesText: 'Vapour pressure dynamics', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions' },
        { id: 'c_u5_t3', name: "Lecture 3 - Colligative Properties", videoId: 'placeholder_s3', thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400', notesText: 'Boiling & Freezing points', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '20 Questions' },
        { id: 'c_u5_t4', name: "Lecture 4 - Van't Hoff Factor", videoId: 'placeholder_s4', thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400', notesText: 'Abnormal molar mass', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions', isAdvanced: true }
      ] 
    },
    'c_u7': { name: 'Redox Reactions & Electrochemistry', shortNotes: 'Notes coming soon.', topics: mockTopic('c_u7') },
    'c_u8': { name: 'Chemical Kinetics', shortNotes: 'Notes coming soon.', topics: mockTopic('c_u8') },
    'c_u10_2': { 
      name: 'p-Block Elements (Group 15-18)', 
      shortNotes: 'Detailed overview of Nitrogen, Oxygen, Halogen, and Noble Gas families.', 
      topics: [
        { id: 'c_u10_2_t1', name: "Lecture 1 - Group 15 Elements", videoId: 'placeholder_p1', thumbnail: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=400', notesText: 'Nitrogen Family trends', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions' },
        { id: 'c_u10_2_t2', name: "Lecture 2 - Group 16 Elements", videoId: 'placeholder_p2', thumbnail: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=400', notesText: 'Oxygen Family trends', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions' },
        { id: 'c_u10_2_t3', name: "Lecture 3 - Group 17 Elements (Halogens)", videoId: 'placeholder_p3', thumbnail: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=400', notesText: 'Halogens and properties', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions' },
        { id: 'c_u10_2_t4', name: "Lecture 4 - Group 18 Elements (Noble Gases)", videoId: 'placeholder_p4', thumbnail: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=400', notesText: 'Inert gas properties', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions' }
      ] 
    },
    'c_u11': { name: 'd and f Block Elements', shortNotes: 'Notes coming soon.', topics: mockTopic('c_u11') },
    'c_u12': { name: 'Coordination Compounds', shortNotes: 'Notes coming soon.', topics: mockTopic('c_u12') },
    'c_u16': { 
      name: 'Organic Compounds containing Halogens', 
      shortNotes: 'Nomenclature, nature of C-X bond, methods of preparation, and substitution mechanisms.', 
      topics: [
        { id: 'c_u16_t1', name: "Lecture 1 - Nomenclature & Preparation", videoId: 'placeholder_h1', thumbnail: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?q=80&w=400', notesText: 'Haloalkanes intro', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions' },
        { id: 'c_u16_t2', name: "Lecture 2 - SN1 and SN2 Mechanisms", videoId: 'placeholder_h2', thumbnail: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?q=80&w=400', notesText: 'Nucleophilic Substitution', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '20 Questions' },
        { id: 'c_u16_t3', name: "Lecture 3 - Elimination Reactions", videoId: 'placeholder_h3', thumbnail: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?q=80&w=400', notesText: 'Dehydrohalogenation', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions' },
        { id: 'c_u16_t4', name: "Lecture 4 - Haloarenes & Polyhalogens", videoId: 'placeholder_h4', thumbnail: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?q=80&w=400', notesText: 'Aromatic Halogens', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions', isAdvanced: true }
      ] 
    },
    'c_u17': { name: 'Organic Compounds containing Oxygen', shortNotes: 'Notes coming soon.', topics: mockTopic('c_u17') },
    'c_u18': { name: 'Organic Compounds containing Nitrogen', shortNotes: 'Notes coming soon.', topics: mockTopic('c_u18') },
    'c_u19': { name: 'Biomolecules', shortNotes: 'Notes coming soon.', topics: mockTopic('c_u19') },
    'c_u20': { name: 'Principles Related to Practical Chemistry', shortNotes: 'Notes coming soon.', topics: mockTopic('c_u20') }
  },
  mathematics: {
    colorText: 'text-orange-400',
    colorHex: 'orange',
    'm_u1': { 
      name: 'Sets, Relations and Functions', 
      shortNotes: 'Core review of sets representation, union/intersection, and functional mapping.', 
      topics: [
        { id: 'm_u1_t1', name: "Lecture 1 - Introduction to Sets", videoId: '80WDCUHJSKQ', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Sets Introduction', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '10 Questions' },
        { id: 'm_u1_t2', name: "Lecture 2 - Exercise 1.1", videoId: 'bpMG-q9J9CE', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Exercise 1.1 Solutions', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '10 Questions' },
        { id: 'm_u1_t3', name: "Lecture 3 - Exercise 1.2", videoId: 'q7B-QtU4s3E', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Exercise 1.2 Solutions', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions' },
        { id: 'm_u1_t4', name: "Lecture 4 - Exercise 1.3", videoId: 'ECMB8Ti_j6c', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Exercise 1.3 Solutions', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions' },
        { id: 'm_u1_t5', name: "Lecture 5 - Exercise 1.4", videoId: 'JwvL6CMZwfw', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Exercise 1.4 Solutions', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions' },
        { id: 'm_u1_t6', name: "Lecture 6 - Exercise 1.5", videoId: 'cd2WeAQsNMI', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Exercise 1.5 Solutions', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '10 Questions' },
        { id: 'm_u1_t7', name: "Lecture 7 - Exercise 1.6", videoId: 'DwKVjDFQkns', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Exercise 1.6 Solutions', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '10 Questions' }
      ] 
    },
    'm_u2': { name: 'Complex Numbers and Quadratic Equations', shortNotes: 'Notes coming soon.', topics: mockTopic('m_u2') },
    'm_u4': { name: 'Permutations and Combinations', shortNotes: 'Notes coming soon.', topics: mockTopic('m_u4') },
    'm_u5': { name: 'Binomial Theorem', shortNotes: 'Notes coming soon.', topics: mockTopic('m_u5') },
    'm_u6': { name: 'Sequence and Series', shortNotes: 'Notes coming soon.', topics: mockTopic('m_u6') },
    'm_u10_1': { name: 'Straight Lines', shortNotes: 'Notes coming soon.', topics: mockTopic('m_u10_1') },
    'm_u10_2': { name: 'Circles and Conic Sections', shortNotes: 'Notes coming soon.', topics: mockTopic('m_u10_2') },
    'm_u14_1': { name: 'Trigonometry', shortNotes: 'Notes coming soon.', topics: mockTopic('m_u14_1') },
    'm_u3': { 
      name: 'Matrices and Determinants', 
      shortNotes: 'Algebra of matrices, properties of determinants, and system of linear equations.', 
      topics: [
        { id: 'm_u3_t1', name: "Lecture 1 - Introduction to Matrices", videoId: 'placeholder_m1', notesText: 'Matrix Types & Algebra', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions' },
        { id: 'm_u3_t2', name: "Lecture 2 - Operations on Matrices", videoId: 'placeholder_m2', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Multiplication & Properties', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '20 Questions' },
        { id: 'm_u3_t3', name: "Lecture 3 - Transpose & Adjoint", videoId: 'placeholder_m3', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Symmetric & Skew Symmetric', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '15 Questions' },
        { id: 'm_u3_t4', name: "Lecture 4 - Determinants & Inverse", videoId: 'placeholder_m4', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Evaluating Determinants', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '25 Questions', isAdvanced: true }
      ] 
    },
    'm_u7': { name: 'Limit, Continuity and Differentiability', shortNotes: 'Notes coming soon.', topics: mockTopic('m_u7') },
    'm_u8': { name: 'Integral Calculus', shortNotes: 'Notes coming soon.', topics: mockTopic('m_u8') },
    'm_u9': { name: 'Differential Equations', shortNotes: 'Notes coming soon.', topics: mockTopic('m_u9') },
    'm_u11': { name: 'Three Dimensional Geometry', shortNotes: 'Notes coming soon.', topics: mockTopic('m_u11') },
    'm_u12': { name: 'Vector Algebra', shortNotes: 'Notes coming soon.', topics: mockTopic('m_u12') },
    'm_u13': { name: 'Statistics and Probability', shortNotes: 'Notes coming soon.', topics: mockTopic('m_u13') },
    'm_u14_2': { name: 'Inverse Trigonometric Functions', shortNotes: 'Notes coming soon.', topics: mockTopic('m_u14_2') }
  }
};