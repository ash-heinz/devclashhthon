import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

// --- Amateur Doodle Icons ---
const ThinnerStroke = "1";

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white/90">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-emerald-400">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// --- Dynamic Glass CSS Generator ---
const getGlassStyle = (r, g, b, alphaBg = 0.03, alphaBorder = 0.08) => ({
  background: `rgba(${r}, ${g}, ${b}, ${alphaBg})`,
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: `1px solid rgba(${r}, ${g}, ${b}, ${alphaBorder})`,
});

const defaultGlass = getGlassStyle(255, 255, 255, 0.04, 0.1);
const topicGlass = getGlassStyle(255, 255, 255, 0.02, 0.06);
const modalGlass = getGlassStyle(15, 23, 42, 0.8, 0.2);

// --- Component to Display Topic Names (Fetch Logic Commented Out) ---
const YouTubeTopicName = ({ videoId, fallbackName, isAdvanced }) => {
  /*
  const [title, setTitle] = useState(fallbackName);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoId || videoId.includes('placeholder')) {
      setLoading(false);
      return;
    }

    const fetchTitle = async () => {
      try {
        const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
        const data = await response.json();
        if (data.title) {
          setTitle(data.title);
        }
      } catch (error) {
        console.error("Failed to fetch YT title", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTitle();
  }, [videoId]);
  */

  return (
    <div className="flex flex-col justify-center items-start gap-1 w-full pr-2">
      {/* {loading ? (
        <div className="h-5 w-3/4 bg-white/10 animate-pulse rounded"></div>
      ) : ( 
      */}
        <h2 className="text-sm md:text-base font-medium text-white/90 leading-snug line-clamp-2" title={fallbackName}>
          {fallbackName}
        </h2>
      {/* )} */}
      
      {isAdvanced && (
        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider mt-1">
          Advanced
        </span>
      )}
    </div>
  );
};

// --- MOCK DATABASE HELPER ---
const mockTopic = (id) => ([{
  id: `${id}_t1`, name: "Lecture 1 - Core Concepts", videoId: 'placeholder',
  thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400&auto=format&fit=crop',
  notesText: 'Notes are being synthesized.', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', questions: '10 Questions'
}]);

// --- FULL DATABASE: Synced exactly with subject.jsx IDs ---
const allChaptersData = {
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

export default function Chapter() {
  const { subjectId, chapterId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const passedChapterName = location.state?.chapterName;

  const [completedTopics, setCompletedTopics] = useState(() => {
    const saved = localStorage.getItem(`zenjee-progress-${subjectId}-${chapterId}`);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [activeModal, setActiveModal] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(() => {
    return localStorage.getItem('zenjee-show-advanced') === 'true';
  });

  useEffect(() => {
    localStorage.setItem(`zenjee-progress-${subjectId}-${chapterId}`, JSON.stringify([...completedTopics]));
  }, [completedTopics, subjectId, chapterId]);

  useEffect(() => {
    localStorage.setItem('zenjee-show-advanced', showAdvanced);
  }, [showAdvanced]);

  const subjectData = allChaptersData[subjectId] || { colorText: 'text-sky-300', colorHex: 'sky' };
  
  const chapterDetails = subjectData[chapterId] || {
    name: passedChapterName || `Chapter ${chapterId}`,
    shortNotes: "Quick summary and formulas for this chapter.",
    shortNotesPdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', // Fallback URL
    topics: mockTopic(chapterId)
  };

  const displayTitle = allChaptersData[subjectId]?.[chapterId]?.name || passedChapterName || `Chapter ${chapterId}`;

  const toggleTopic = (topicId) => {
    setCompletedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) newSet.delete(topicId);
      else newSet.add(topicId);
      return newSet;
    });
  };

  const openModal = (title, type, content) => setActiveModal({ title, type, content });
  const closeModal = () => setActiveModal(null);

  const visibleTopics = chapterDetails.topics.filter(topic => showAdvanced ? true : !topic.isAdvanced);

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-gradient-to-b from-[#000a24] to-black text-gray-100 font-sans antialiased relative">

      <nav style={defaultGlass} className="flex items-center justify-between px-10 py-4 shrink-0 rounded-b-3xl mx-3 shadow-lg z-40 relative">
        <div className="text-2xl font-semibold tracking-wider text-white flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/')}>
          Zen<span className="text-sky-300 font-extralight">JEE</span>
        </div>
        <div className="flex items-center gap-5 text-base">
          <span className="font-medium text-white/90">Ashwast</span>
          <span className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-200 px-4 py-1 rounded-full border border-orange-500/30">
            🔥 12 Days
          </span>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 flex flex-col pt-8 pb-12 overflow-y-auto custom-scrollbar">

        <div className="flex items-center justify-between mb-8 shrink-0">
          <div className="flex items-center gap-6">
            <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-white/70 hover:text-white">
              ←
            </button>
            <h1 className={`text-3xl font-semibold tracking-wider ${subjectData.colorText}`}>
              {displayTitle}
            </h1>
          </div>

          <div className="flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-full border border-white/10 shadow-inner">
            <span className={`text-sm font-medium transition-colors ${!showAdvanced ? 'text-white' : 'text-white/40'}`}>
              Mains
            </span>
            <button onClick={() => setShowAdvanced(!showAdvanced)} className={`w-12 h-6 rounded-full relative transition-colors duration-300 border ${showAdvanced ? 'bg-indigo-500/30 border-indigo-500/50' : 'bg-black/50 border-white/20'}`}>
              <div className={`w-4 h-4 rounded-full absolute top-[3px] transition-all duration-300 shadow-md ${showAdvanced ? 'left-[26px] bg-indigo-400' : 'left-[3px] bg-white/70'}`} />
            </button>
            <span className={`text-sm font-medium transition-colors ${showAdvanced ? 'text-indigo-300' : 'text-white/40'}`}>
              + Advanced
            </span>
          </div>
        </div>

        <div className="flex-1 space-y-4 mb-8">
          <div className="grid grid-cols-[auto_1.5fr_1.5fr_1.5fr_1fr] gap-6 px-6 items-center text-sm font-medium text-white/50 uppercase tracking-widest border-b border-white/5 pb-2">
            <div className="w-6 flex justify-center">✔</div>
            <div>Topic Name</div>
            <div>Lecture Video</div>
            <div>Lecture Notes</div>
            <div>Practice</div>
          </div>

          {visibleTopics.map((topic) => {
            const isDone = completedTopics.has(topic.id);
            // DYNAMIC THUMBNAIL LOGIC: Fetch from YouTube if a real ID exists, otherwise fallback to the mock database image.
            const thumbnailUrl = (topic.videoId && !topic.videoId.includes('placeholder')) 
              ? `https://img.youtube.com/vi/${topic.videoId}/hqdefault.jpg` 
              : topic.thumbnail;

            return (
              <div key={topic.id} style={topicGlass} className={`grid grid-cols-[auto_1.5fr_1.5fr_1.5fr_1fr] gap-6 p-4 rounded-2xl items-center transition-all duration-300 hover:bg-white/5 animate-fade-in-up ${isDone ? 'opacity-50' : ''}`}>

                <div className="flex items-center justify-center">
                  <button onClick={() => toggleTopic(topic.id)} className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${isDone ? 'bg-emerald-500/20 border-emerald-500/50' : 'border-white/20 hover:border-white/40 bg-black/20'}`}>
                    {isDone && <CheckIcon />}
                  </button>
                </div>

                <YouTubeTopicName
                  videoId={topic.videoId}
                  fallbackName={topic.name}
                  isAdvanced={topic.isAdvanced}
                />

                <a href={`https://youtube.com/watch?v=${topic.videoId}`} target="_blank" rel="noreferrer" className="relative rounded-xl overflow-hidden group border border-white/10 block h-20 bg-black/50 w-full">
                  {/* UPDATED: Utilizing the dynamic thumbnailUrl generated above */}
                  <img src={thumbnailUrl} alt={topic.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform border border-white/10">
                      <PlayIcon />
                    </div>
                  </div>
                </a>

                <div onClick={() => openModal(`${topic.name} - Official Notes`, 'pdf', topic.pdfUrl)} className="rounded-xl border border-white/10 bg-black/20 p-3 cursor-pointer hover:border-indigo-400/30 hover:bg-indigo-500/5 transition-all group overflow-hidden h-20 flex flex-col justify-center w-full">
                  <p className="text-xs text-white/60 line-clamp-2 group-hover:text-white/80 transition-colors">
                    {topic.notesText}
                  </p>
                  <div className="text-[10px] text-indigo-300/70 mt-1 font-medium uppercase tracking-wider">Open PDF ↗</div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="text-xs text-white/80 mb-2 font-medium">{topic.questions}</div>
                  <button className="px-4 py-2 rounded-lg bg-indigo-500/20 text-indigo-200 text-sm font-medium hover:bg-indigo-500/30 transition-colors border border-indigo-500/20 text-center w-full">
                    Solve Now
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-6 shrink-0">
          
          <div onClick={() => openModal(`${displayTitle} Short Notes`, 'pdf', chapterDetails.shortNotesPdf || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf')} style={topicGlass} className={`rounded-2xl p-6 cursor-pointer hover:border-${subjectData.colorHex}-400/30 hover:bg-white/5 transition-all group`}>
            <h3 className={`text-lg font-medium ${subjectData.colorText} mb-2 flex items-center gap-2`}>
              📄 Short Notes Review
            </h3>
            <p className="text-sm text-white/50 line-clamp-2">{chapterDetails.shortNotes}</p>
          </div>

          <div style={topicGlass} className="rounded-2xl p-6 cursor-pointer hover:border-yellow-400/30 hover:bg-yellow-500/5 transition-all flex flex-col justify-center items-center group">
            <h3 className="text-xl font-medium text-yellow-100 mb-1">Chapter PYQs</h3>
            <p className="text-sm text-yellow-200/50 group-hover:text-yellow-200/80">Generate a custom test from past 5 years</p>
          </div>
        </div>
      </main>

      {activeModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-fade-in">
          <div style={modalGlass} className="w-full max-w-5xl h-[90vh] flex flex-col rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0 bg-black/40">
              <h2 className="text-xl font-medium text-white">{activeModal.title}</h2>
              <button onClick={closeModal} className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                <CloseIcon />
              </button>
            </div>
            <div className="flex-1 w-full h-full bg-white/5">
              {activeModal.type === 'pdf' ? (
                <iframe src={activeModal.content} className="w-full h-full" title="PDF Viewer" />
              ) : (
                <div className="p-8 overflow-y-auto custom-scrollbar text-white/80 leading-relaxed whitespace-pre-wrap text-lg h-full">
                  {activeModal.content}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}