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
      shortNotesContent: `📌 UNITS AND MEASUREMENTS - CHAPTER REVIEW

1. Physical Quantities and Units
• Base Quantities: Mass (kg), Length (m), Time (s), Electric Current (A), Thermodynamic Temperature (K), Amount of Substance (mol), Luminous Intensity (cd).
• Supplementary Units: Plane Angle (radian) and Solid Angle (steradian). Solid angle is dimensionless.

2. Dimensional Analysis
• Principle of Homogeneity: Dimensions of all terms separated by +, -, or = signs must be identical.
• Important Dimensions: 
   - Planck's Constant (h) and Angular Momentum (L): [ML²T⁻¹]
   - Impedance of free space: [ML²T⁻³A⁻²] (same as Resistance).

3. Errors in Measurement
• Absolute Error: |True Value - Measured Value|
• Relative/Fractional Error: ΔA / A
• Percentage Error: (ΔA / A) × 100%
• Combination of Errors:
   - Sum/Difference (Z = A ± B): ΔZ = ΔA + ΔB
   - Product/Quotient/Power (Z = A^p · B^q / C^r): ΔZ/Z = p(ΔA/A) + q(ΔB/B) + r(ΔC/C).

4. Measuring Instruments
• Vernier Callipers: LC = 1 MSD - 1 VSD. Total Reading = MSR + (n × LC).
• Screw Gauge: Pitch = Distance/Rotations. LC = Pitch / Circular Divisions.`,
      topics: [
        { 
          id: 'p_u1_t1', name: "Lecture 1 - Introduction to Dimensions", videoId: 'UuzZYVRcemY', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Fundamental and Derived Quantities',
          lectureNotesContent: `📌 LECTURE 1: INTRODUCTION TO DIMENSIONS\n\n1. Physical Quantities\nA physical quantity is a property of a material or system that can be quantified by measurement. It consists of a numerical magnitude and a unit.\n• Base (Fundamental) Quantities: Do not depend on any other physical quantities. (Mass, Length, Time, Electric Current, Temperature, Luminous Intensity, Amount of Substance).\n• Derived Quantities: Expressed in terms of base quantities (e.g., Velocity = Length/Time).\n\n2. The SI System\n• Length: Meter (m)\n• Mass: Kilogram (kg)\n• Time: Second (s)\n• Current: Ampere (A)\n• Temperature: Kelvin (K)\n\n3. Concept of Dimensions\nThe dimensions of a physical quantity denote the powers to which the base quantities are raised to represent that quantity.\n• Denoted by square brackets [ ].\n• Example: Density = Mass / Volume = [M] / [L³] = [ML⁻³T⁰].\n\n4. Key Takeaways for JEE:\nAlways remember the dimensional formulas of frequently asked constants like Gravitational Constant (G), Planck's Constant (h), and Permittivity (ε₀).` 
        },
        { 
          id: 'p_u1_t2', name: "Lecture 2 - Dimensional Analysis Part 1", videoId: 'iqBJ9_Vyj50', thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=400', notesText: 'Principle of Homogeneity',
          lectureNotesContent: `📌 LECTURE 2: DIMENSIONAL ANALYSIS PART 1\n\n1. Principle of Dimensional Homogeneity\nThis principle states that the dimensions of all the terms in a physical equation must be identical.\n• You can only add or subtract quantities that have the same dimensions.\n• E.g., in v = u + at, the dimensions of [v], [u], and [at] must all be [LT⁻¹].\n\n2. Applications of Dimensional Analysis\n• Checking the Correctness of Equations: If LHS dimensions ≠ RHS dimensions, the equation is physically incorrect.\n• Conversion of Units: n₁u₁ = n₂u₂. By knowing the dimensional formula, we can convert the magnitude from one system (like MKS) to another (like CGS).\n\n3. Common Pitfalls:\nA dimensionally correct equation is not necessarily exactly correct (it misses numerical constants like 1/2 or π). However, a dimensionally incorrect equation is ALWAYS wrong.` 
        },
        { 
          id: 'p_u1_t3', name: "Lecture 3 - Dimensional Analysis Part 2", videoId: 'e3yRZaynPE0', thumbnail: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=400', notesText: 'Deducing Relationships',
          lectureNotesContent: `📌 LECTURE 3: DIMENSIONAL ANALYSIS PART 2\n\n1. Deducing Relations Among Physical Quantities\nIf we know the factors on which a physical quantity depends, we can deduce its formula.\n• Method: Let quantity Q depend on A, B, and C. \n  Write Q = k(A^x)(B^y)(C^z).\n  Substitute dimensions for all variables, compare the powers of M, L, and T on both sides to find x, y, and z.\n\n2. Limitations of Dimensional Analysis\n• It provides no information about dimensionless constants (like e, π, or pure numbers).\n• It fails if the quantity depends on more than three factors (since we only have M, L, T equations).\n• Cannot derive formulas containing trigonometric, exponential, or logarithmic functions (these functions and their arguments are dimensionless).` 
        },
        { 
          id: 'p_u1_t4', name: "Lecture 4 - Error Analysis", videoId: 'yLUqpb4UosQ', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Absolute and Relative Errors',
          lectureNotesContent: `📌 LECTURE 4: ERROR ANALYSIS\n\n1. Types of Errors\n• Systematic Errors: Predictable errors (instrumental, imperfect technique). Can be minimized.\n• Random Errors: Unpredictable fluctuations. Minimized by taking multiple readings and calculating the mean.\n\n2. Calculating Errors\n• Absolute Error (Δa): Magnitude of the difference between the true value (mean) and the individual measured value.\n• Mean Absolute Error (Δa_mean): Arithmetic mean of all absolute errors.\n• Relative/Fractional Error: Δa_mean / a_mean.\n• Percentage Error: Relative Error × 100%.\n\n3. Combination of Errors (Highly tested in JEE)\n• Sum/Difference (Z = A ± B): Maximum absolute error ΔZ = ΔA + ΔB.\n• Product/Quotient (Z = AB or Z = A/B): Maximum relative error ΔZ/Z = ΔA/A + ΔB/B.\n• Exponents (Z = A^n): Maximum relative error ΔZ/Z = n(ΔA/A).` 
        },
        { id: 'p_u1_t5', name: "Lecture 5 - Vernier Calipers", videoId: 'JRv_HJfGXPg', thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=400', notesText: 'Least count and Zero error', lectureNotesContent: `📌 LECTURE 5: VERNIER CALIPERS\n\n1. Structure\nConsists of a Main Scale (fixed) and a Vernier Scale (sliding).\n\n2. Least Count (LC)\nThe smallest length that can be measured accurately.\n• LC = 1 Main Scale Division (MSD) - 1 Vernier Scale Division (VSD).\n• Usually, n VSD = (n-1) MSD. Therefore, 1 VSD = (n-1)/n MSD. \n• Hence, LC = MSD/n.\n\n3. Reading the Vernier Caliper\nTotal Reading = Main Scale Reading (MSR) + (Vernier Coincidence × Least Count).\n• MSR is the reading on the main scale just before the zero of the vernier scale.\n\n4. Zero Error\n• Positive Zero Error: Vernier zero is to the right of main scale zero. (Subtract from reading).\n• Negative Zero Error: Vernier zero is to the left of main scale zero. (Add to reading).` },
        { id: 'p_u1_t6', name: "Lecture 6 - Screw Gauge", videoId: 'zdHaVcc1nOs', thumbnail: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=400', notesText: 'Pitch and Circular scale', lectureNotesContent: `📌 LECTURE 6: SCREW GAUGE (MICROMETER)\n\n1. Principle\nWorks on the principle of a screw. Linear distance moved is proportional to the rotation given.\n\n2. Key Terms\n• Pitch: The linear distance moved by the screw in one complete rotation.\n• Least Count (LC) = Pitch / Total number of divisions on the circular scale.\n\n3. Reading the Screw Gauge\nTotal Reading = Linear Scale Reading (LSR) + (Circular Scale Reading × Least Count).\n• Ensure to account for zero error exactly as in vernier calipers.\n• Backlash Error: Error due to wear and tear of threads. Avoided by always turning the screw in one direction.` },
        { id: 'p_u1_t7', name: "Lecture 7 - Significant Figures", videoId: 'Xmjx910G0WI', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Rules for identification', lectureNotesContent: `📌 LECTURE 7: SIGNIFICANT FIGURES\n\n1. Definition\nDigits in a measurement that are known reliably plus the first digit that is uncertain.\n\n2. Rules for Identifying Significant Figures\n• All non-zero digits are significant.\n• Zeros between non-zero digits are significant (e.g., 1005 has 4).\n• Leading zeros are NOT significant (e.g., 0.0045 has 2).\n• Trailing zeros in a number WITH a decimal point ARE significant (e.g., 2.500 has 4).\n• Trailing zeros in a number WITHOUT a decimal point are NOT significant (e.g., 1500 has 2).\n\n3. Operations\n• Addition/Subtraction: The result must have the same number of decimal places as the term with the fewest decimal places.\n• Multiplication/Division: The result must have the same number of significant figures as the term with the fewest significant figures.` },
        { id: 'p_u1_t8', name: "Lecture 8 - Rounding Off & Rules", videoId: 'y1DH1OCQmTE', thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=400', notesText: 'Rounding rules', lectureNotesContent: `📌 LECTURE 8: ROUNDING OFF\n\n1. Basic Rules\n• If the digit to be dropped is less than 5, the preceding digit is left unchanged.\n• If the digit to be dropped is more than 5, the preceding digit is raised by 1.\n\n2. The Rule of 5 (Crucial for JEE)\nWhat if the digit to be dropped is exactly 5 (or 5 followed by zeros)?\n• If the preceding digit is EVEN, it remains unchanged. (e.g., 2.45 rounds to 2.4).\n• If the preceding digit is ODD, it is raised by 1. (e.g., 2.35 rounds to 2.4).\nThis rule ensures statistical fairness when processing large datasets.` },
        { id: 'p_u1_t9', name: "Lecture 9 - PYQs and Advanced Problems", videoId: 'POg_kjzChqU', thumbnail: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=400', notesText: 'JEE Problem Solving', isAdvanced: true, lectureNotesContent: `📌 LECTURE 9: ADVANCED PROBLEM SOLVING\n\n1. Exam Strategy for Dimensional Analysis\n• Many complex integration or differentiation problems in JEE Mains can be solved simply by checking the dimensions of the options.\n• Remember: [d/dx] introduces a [L⁻¹] dimension, and [∫ dx] introduces a [L] dimension.\n\n2. Exam Strategy for Errors\n• The formula for error combination Z = A^p B^q / C^r translates to ΔZ/Z = |p|ΔA/A + |q|ΔB/B + |r|ΔC/C.\n• Notice the absolute value signs! Errors always add up. Never subtract fractional errors.\n\n3. Screw Gauge Traps\n• A common JEE trap is giving pitch as '0.5 mm' instead of 1 mm. Always read the problem carefully to calculate the exact Least Count before doing the main calculation.` }
      ]
    },
    'p_u11': { 
      name: 'Electrostatics', 
      shortNotes: 'Electric charges, Coulomb\'s Law, Electric Fields, Gauss\'s Law, and Electric Potential.', 
      shortNotesPdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      shortNotesContent: `⚡ ELECTROSTATICS - CHAPTER REVIEW

1. Properties of Charge & Coulomb's Law
• Charge is quantized (Q = ne).
• Coulomb’s Law: F = (1/4πε₀) · (|q₁q₂| / r²).

2. Electric Field & Field Lines
• Electric Field (E) = F/q₀. Point charge: E = kq/r².
• Field lines originate at (+), terminate at (-), and never cross.

3. Electric Dipole
• Dipole moment (p = q × 2a) points from (-) to (+).
• Axial Field: E = 2kp/r³ (parallel to p).
• Equatorial Field: E = -kp/r³ (anti-parallel to p).

4. Gauss's Law
• Electric Flux Φ = E · A = q_enclosed / ε₀.
• Infinite Wire: E = λ / (2πε₀r).
• Infinite Sheet: E = σ / (2ε₀).
• Spherical Shell: E = 0 (inside), E = kq/r² (outside).

5. Electric Potential
• Potential (V) = W/q. For a point charge, V = kq/r.
• E = -dV/dr (Electric field is the negative potential gradient).

6. Electric Potential Energy
• U = (kq₁q₂) / r. 
• Dipole in uniform E-field: U = -p · E.`,
      topics: [
        { id: 'p_u11_t1', name: "Lecture 1 - Properties of Charge", videoId: 'm5VbK66a254', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Charge quantization', 
          lectureNotesContent: `📌 LECTURE 1: PROPERTIES OF CHARGE\n\n1. Fundamental Properties\n• Charge is a scalar quantity. SI unit is Coulomb (C).\n• Additivity: Total charge of a system is the algebraic sum of all individual charges.\n• Conservation: Charge can neither be created nor destroyed in an isolated system.\n• Quantization: Charge always exists in integral multiples of the fundamental charge (e). Q = ±ne, where e = 1.6 × 10⁻¹⁹ C.\n\n2. Methods of Charging\n• Conduction: Direct physical contact between a charged and neutral conductor. Charge is shared.\n• Induction: Charging a neutral body by bringing a charged body nearby without physical contact. The induced charge is opposite in sign.\n• Friction: Rubbing two insulators together transfers electrons.` 
        },
        { id: 'p_u11_t2', name: "Lecture 2 - Coulomb's Law", videoId: 'jJLS3PudXM8', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Superposition principle', 
          lectureNotesContent: `📌 LECTURE 2: COULOMB'S LAW & SUPERPOSITION\n\n1. Coulomb's Law\nThe electrostatic force between two point charges is directly proportional to the product of their magnitudes and inversely proportional to the square of the distance between them.\n• F = (1 / 4πε₀) · (|q₁q₂| / r²).\n• Constant k = 1 / 4πε₀ ≈ 9 × 10⁹ N·m²/C².\n• ε₀ = Permittivity of free space = 8.85 × 10⁻¹² C²/N·m².\n\n2. Effect of Medium\nIf charges are placed in a dielectric medium of relative permittivity (dielectric constant) K or ε_r, the force becomes F_medium = F_vacuum / K.\n\n3. Principle of Superposition\nThe net force on a particular charge due to a system of multiple charges is the vector sum of all individual Coulomb forces acting on that charge. Forces are independent of the presence of other charges.` 
        },
        { id: 'p_u11_t3', name: "Lecture 3 - Electric Field", videoId: 'xlWZbN8ueHo', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Point charge field', 
          lectureNotesContent: `📌 LECTURE 3: ELECTRIC FIELD\n\n1. Definition\nThe region around a charged particle where its electrostatic force can be experienced by a test charge.\n• Electric Field Intensity (E) = F / q₀.\n• SI Unit: N/C or V/m.\n\n2. Electric Field due to a Point Charge\n• E = (1 / 4πε₀) · (q / r²).\n• Vector form: E = (kq / r³) · r_vector.\n• Direction: Radially outward for positive charge, radially inward for negative charge.\n\n3. Superposition of Electric Fields\nThe net electric field at a point due to a continuous charge distribution or a system of point charges is the vector sum of individual fields.` 
        },
        { id: 'p_u11_t4', name: "Lecture 4 - Electric Field Lines", videoId: 'CBZDHV2DRQY', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Properties of Field Lines', 
          lectureNotesContent: `📌 LECTURE 4: ELECTRIC FIELD LINES\n\n1. Concept\nImaginary continuous curves used to visually represent the electric field. The tangent at any point on the curve gives the direction of the electric field at that point.\n\n2. Crucial Properties\n• Originate from positive charges and terminate at negative charges.\n• Do NOT form closed loops (conservative nature of electrostatic field).\n• Two field lines can NEVER intersect. If they did, it would imply two different directions of the electric field at the point of intersection, which is impossible.\n• The density/closeness of lines represents the magnitude of the electric field.\n• Field lines are always perpendicular to the surface of a charged conductor.` 
        },
        { id: 'p_u11_t5', name: "Lecture 5 - Electric Dipole", videoId: 'OlNjbqeFZHk', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Axial and Equatorial Fields', 
          lectureNotesContent: `📌 LECTURE 5: ELECTRIC DIPOLE\n\n1. Dipole Moment (p)\nA system of two equal and opposite charges (+q and -q) separated by a small distance 2a.\n• Vector p = q × 2a.\n• Direction is strictly from negative to positive charge.\n\n2. Electric Field on Axial Line\nAt a distance r from the center on the axis:\n• E_axial = (1 / 4πε₀) · (2pr / (r² - a²)²).\n• For short dipole (r >> a): E_axial = 2kp / r³. (Direction is parallel to p).\n\n3. Electric Field on Equatorial Line\nAt a perpendicular distance r from the center:\n• E_equatorial = (1 / 4πε₀) · (p / (r² + a²)^(3/2)).\n• For short dipole (r >> a): E_equatorial = kp / r³. (Direction is anti-parallel to p).\n\n4. Dipole in Uniform Field\n• Net Force = 0.\n• Torque τ = p × E (or pE sinθ).` 
        },
        { id: 'p_u11_t6', name: "Lecture 6 - Electric Flux & Gauss Law", videoId: 'xbFDf8AQ--k', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Introduction to Gauss Law', 
          lectureNotesContent: `📌 LECTURE 6: ELECTRIC FLUX & GAUSS'S LAW\n\n1. Electric Flux (Φ)\nThe total number of electric field lines passing normally through a given area.\n• Φ = E · A = EA cosθ.\n• For a curved surface, Φ = ∮ E · dA.\n• Scalar quantity. Unit: N·m²/C or V·m.\n\n2. Gauss's Law\nThe net electric flux through any closed surface (Gaussian surface) is equal to 1/ε₀ times the net charge enclosed by that surface.\n• Φ = ∮ E · dA = q_enclosed / ε₀.\n• The shape or size of the Gaussian surface does not matter. Only the total enclosed charge matters. Charges outside the surface contribute to the local electric field but contribute ZERO to the net flux.` 
        },
        { id: 'p_u11_t7', name: "Lecture 7 - Applications of Gauss Law", videoId: 'O4iiJB_z6Gk', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Infinite Wires and Sheets', 
          lectureNotesContent: `📌 LECTURE 7: APPLICATIONS OF GAUSS'S LAW\n\n1. Infinite Line of Charge\nLine charge density = λ (C/m).\n• Choose a cylindrical Gaussian surface.\n• Electric Field E = λ / (2πε₀r).\n\n2. Infinite Plane Sheet of Charge\nSurface charge density = σ (C/m²).\n• Choose a pillbox Gaussian surface.\n• Electric Field E = σ / (2ε₀). \n• Note: The field is uniform and independent of distance r!\n\n3. Spherical Shell\nSurface charge density = σ, Radius = R.\n• Outside (r > R): E = kq / r² (behaves like a point charge at center).\n• On surface (r = R): E = kq / R².\n• Inside (r < R): E = 0 (charge enclosed is zero).` 
        },
        { id: 'p_u11_t8', name: "Lecture 8 - Electric Potential", videoId: '1jru_JwEVuE', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Potential due to Point Charge', 
          lectureNotesContent: `📌 LECTURE 8: ELECTRIC POTENTIAL\n\n1. Concept of Potential (V)\nThe amount of work done by an external agent in bringing a unit positive test charge from infinity to a point, without acceleration.\n• V = W_ext / q.\n• Scalar quantity. Unit: Joule/Coulomb = Volt (V).\n\n2. Potential due to a Point Charge\n• V = (1 / 4πε₀) · (q / r).\n• Positive charge produces positive potential; negative charge produces negative potential.\n\n3. Relation between E and V\nElectric field is the negative gradient of potential.\n• E = - dV/dr.\n• This means the electric field always points in the direction of strictly decreasing potential.` 
        },
        { id: 'p_u11_t9', name: "Lecture 9 - Electric Potential due to Dipole", videoId: '3_fZm5URyDY', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Dipole Potential', 
          lectureNotesContent: `📌 LECTURE 9: POTENTIAL OF A DIPOLE\n\n1. General Point\nPotential at distance r and angle θ from the dipole center:\n• V = (k·p·cosθ) / r² (for r >> a).\n\n2. Special Cases\n• Axial Line (θ = 0 or 180): V = ± kp / r².\n• Equatorial Line (θ = 90): V = 0. The entire equatorial plane of a dipole is at zero potential!\n\n3. Work Done in Rotating a Dipole\nWork done to rotate a dipole in a uniform electric field from angle θ₁ to θ₂:\n• W = pE(cosθ₁ - cosθ₂).` 
        },
        { id: 'p_u11_t10', name: "Lecture 10 - Equipotential Surfaces", videoId: 'YSRhzyJQJTk', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Properties of Equipotential Surfaces', 
          lectureNotesContent: `📌 LECTURE 10: EQUIPOTENTIAL SURFACES\n\n1. Definition\nA surface over which the electric potential is constant at every point.\n\n2. Key Properties (Frequent JEE Assertion/Reasoning)\n• Work done in moving a test charge along an equipotential surface is ALWAYS ZERO (since ΔV = 0, W = qΔV = 0).\n• Electric field lines are ALWAYS perfectly perpendicular to equipotential surfaces.\n• Equipotential surfaces never intersect (if they did, the intersection point would have two different potentials, which is impossible).\n\n3. Shapes\n• Point charge: Concentric spheres.\n• Infinite line charge: Coaxial cylinders.\n• Uniform electric field: Parallel planes.` 
        },
        { id: 'p_u11_t11', name: "Lecture 11 - Electric Potential Energy", videoId: 'Fb_DvsTQeM4', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'System of Charges', isAdvanced: true, 
          lectureNotesContent: `📌 LECTURE 11: ELECTRIC POTENTIAL ENERGY\n\n1. Definition\nThe energy possessed by a system of charges by virtue of their positions. It equals the work done in assembling the charges from infinity to their current locations.\n\n2. System of Two Point Charges\n• U = (k·q₁·q₂) / r.\n• Include algebraic signs of charges. Like charges yield positive PE (repulsion), unlike charges yield negative PE (bound system).\n\n3. Multi-charge System\nTotal PE is the sum of energies of all possible pairs of charges. For 3 charges:\n• U_total = k [ (q₁q₂/r₁₂) + (q₂q₃/r₂₃) + (q₁q₃/r₁₃) ].\n\n4. Potential Energy of Dipole in E-Field\n• U = -p · E = -pE cosθ.\n• Stable equilibrium at θ=0 (U is min). Unstable at θ=180 (U is max).` 
        },
        { id: 'p_u11_t12', name: "Lecture 12 - Advanced Problems (PYQs)", videoId: 'iVux9LPIiGI', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'JEE Previous Year Questions', isAdvanced: true, 
          lectureNotesContent: `📌 LECTURE 12: ADVANCED ELECTROSTATICS (PYQs)\n\n1. Cavity Problems inside Conductors\n• By Gauss's Law, the electric field inside the bulk material of a conductor is always zero.\n• If a charge +q is placed inside a cavity of a neutral conductor, an equal and opposite charge -q is induced on the inner surface of the cavity, and +q is induced on the outer surface of the conductor to maintain neutrality.\n\n2. Solid Non-Conducting Sphere\nCharge is uniformly distributed throughout the volume (Volume charge density ρ).\n• Outside (r > R): E = kq/r², V = kq/r.\n• Inside (r < R): E = (kq/R³)·r, V = (kq / 2R³)·(3R² - r²). The potential at the center is 1.5 times the potential at the surface!\n\n3. Electrostatic Pressure\nThe outward pressure on the surface of a charged conductor is P = σ² / 2ε₀.` 
        }
      ]
    },
    'p_u2': { name: 'Kinematics', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('p_u2') },
    'p_u3': { name: 'Laws of Motion', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('p_u3') },
    'p_u4': { name: 'Work, Energy and Power', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('p_u4') },
    'p_u5': { name: 'Rotational Motion', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('p_u5') },
    'p_u6': { name: 'Gravitation', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('p_u6') },
    'p_u7': { name: 'Properties of Solids and Liquids', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('p_u7') },
    'p_u8': { name: 'Thermodynamics', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('p_u8') },
    'p_u9': { name: 'Kinetic Theory of Gases', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('p_u9') },
    'p_u10': { name: 'Oscillations and Waves', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('p_u10') },
    'p_u12': { name: 'Current Electricity', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('p_u12') },
    'p_u13': { name: 'Magnetic Effects of Current and Magnetism', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('p_u13') },
    'p_u14': { name: 'Electromagnetic Induction and AC', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('p_u14') },
    'p_u15': { name: 'Electromagnetic Waves', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('p_u15') },
    'p_u16': { name: 'Optics', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('p_u16') },
    'p_u17': { name: 'Dual Nature of Matter and Radiation', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('p_u17') },
    'p_u18': { name: 'Atoms and Nuclei', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('p_u18') },
    'p_u19': { name: 'Electronic Devices', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('p_u19') },
    'p_u20': { name: 'Experimental Skills', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('p_u20') }
  },
  chemistry: {
    colorText: 'text-emerald-400',
    colorHex: 'emerald',
    'c_u1': { 
      name: 'Some Basic Concepts in Chemistry', 
      shortNotes: 'Core overview of Stoichiometry, Mole Concept, and Chemical Combinations.',
      shortNotesPdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      shortNotesContent: `🧪 SOME BASIC CONCEPTS IN CHEMISTRY - CHAPTER REVIEW

1. Laws of Chemical Combinations
• Conservation of Mass: Matter is neither created nor destroyed.
• Definite Proportions: Elements in a compound always exist in a fixed mass ratio.
• Multiple Proportions: If elements form >1 compound, the varying masses of one element combine in simple whole number ratios.

2. Mole Concept
• 1 Mole = 6.022 × 10²³ particles.
• Number of moles (n) = Given Mass / Molar Mass = Given Volume at STP / 22.4 L.
• Empirical Formula = Simplest ratio of atoms. Molecular Formula = n × Empirical Formula.

3. Concentration Terms
• Molarity (M): Moles of solute / Volume of solution (L). Depends on Temp.
• Molality (m): Moles of solute / Mass of solvent (kg). Independent of Temp.
• Mole Fraction (X): Moles of component / Total Moles.

4. Limiting Reagent
• The reactant completely consumed first. Divide initial moles by stoichiometric coefficient to find it.`,
      topics: [
        { id: 'c_u1_t1', name: "Lecture 1 - Introduction to Chemistry", videoId: 'Qy0Q_AYs63Y', thumbnail: 'https://images.unsplash.com/photo-1603126859592-2361ac86b8db?q=80&w=400', notesText: 'Matter and Classification', 
          lectureNotesContent: `📌 LECTURE 1: INTRODUCTION TO CHEMISTRY\n\n1. Nature of Matter\nMatter is anything that has mass and occupies space. It exists in three physical states:\n• Solid: Definite shape and volume.\n• Liquid: Definite volume, takes shape of container.\n• Gas: Neither definite shape nor volume.\n\n2. Classification of Matter\n• Pure Substances: Fixed composition. Elements (one type of atom) and Compounds (two or more elements in a fixed ratio).\n• Mixtures: Variable composition. Homogeneous (uniform composition, e.g., sugar solution) and Heterogeneous (non-uniform, e.g., sand and salt).\n\n3. Measurement: Precision and Accuracy\n• Precision: Closeness of various measurements for the same quantity to each other.\n• Accuracy: Agreement of a particular value to the true value of the result.\nExample: True value = 2.0g. \nReadings 1.95g and 1.93g are precise but not accurate.\nReadings 1.99g and 2.01g are both precise and accurate.` 
        },
        { id: 'c_u1_t2', name: "Lecture 2 - Laws of Chemical Combinations", videoId: '3vwSPlDrgtU', thumbnail: 'https://images.unsplash.com/photo-1603126859592-2361ac86b8db?q=80&w=400', notesText: 'Chemical combination laws', 
          lectureNotesContent: `📌 LECTURE 2: LAWS OF CHEMICAL COMBINATIONS\n\n1. Law of Conservation of Mass (Lavoisier)\nMatter can neither be created nor destroyed in a chemical reaction. Total mass of reactants = Total mass of products.\n\n2. Law of Definite Proportions (Proust)\nA given compound always contains exactly the same proportion of elements by weight, regardless of the source. (e.g., Water is always 1:8 by mass of H:O).\n\n3. Law of Multiple Proportions (Dalton)\nIf two elements form more than one compound, the masses of one element that combine with a fixed mass of the other are in a ratio of small whole numbers. (e.g., CO and CO₂. For 12g of C, O is 16g and 32g. Ratio is 1:2).\n\n4. Gay Lussac’s Law of Gaseous Volumes\nWhen gases combine, they do so in a simple ratio by volume, provided all gases are at the same temperature and pressure.\n\n5. Avogadro's Law\nEqual volumes of all gases at the same temperature and pressure contain equal numbers of molecules.` 
        },
        { id: 'c_u1_t3', name: "Lecture 3 - Mole Concept", videoId: 'omuhMcN9z-M', thumbnail: 'https://images.unsplash.com/photo-1603126859592-2361ac86b8db?q=80&w=400', notesText: 'Atomic mass & Mole concept', 
          lectureNotesContent: `📌 LECTURE 3: MOLE CONCEPT & STOICHIOMETRY\n\n1. The Mole\nOne mole is the amount of a substance that contains exactly 6.022 × 10²³ elementary entities (Avogadro's number, N_A). It bridges the micro world (atoms) and macro world (grams).\n\n2. Key Conversion Formulas\n• Number of moles (n) = Given Mass (w) / Molar Mass (M).\n• Number of moles (n) = Number of particles (N) / N_A.\n• Number of moles (n) = Given Volume of gas at STP / 22.4 L.\n\n3. Empirical and Molecular Formula\n• Empirical Formula (EF): Simplest whole number ratio of atoms in a compound.\n• Molecular Formula (MF): Exact number of atoms in a molecule.\n• Relation: MF = (EF)_n, where n = Molar Mass / Empirical Formula Mass.\n\n4. Limiting Reagent (LR)\nThe reactant that is completely consumed in a reaction. It dictates the maximum amount of product formed.\n• Trick to find LR: Divide the initial moles of each reactant by their respective stoichiometric coefficients. The lowest value indicates the limiting reagent.` 
        },
        { id: 'c_u1_t4', name: "Lecture 4 - Molarity & Concentration Terms", videoId: 'xv908em4LtY', thumbnail: 'https://images.unsplash.com/photo-1603126859592-2361ac86b8db?q=80&w=400', notesText: 'Concentration calculations', 
          lectureNotesContent: `📌 LECTURE 4: CONCENTRATION OF SOLUTIONS\n\n1. Molarity (M)\nDefined as the number of moles of solute dissolved per liter of solution.\n• M = Moles of solute / Volume of solution (L).\n• Changes with temperature because volume changes with temperature.\n\n2. Molality (m)\nDefined as the number of moles of solute dissolved per kilogram of solvent.\n• m = Moles of solute / Mass of solvent (kg).\n• Does NOT change with temperature (preferred for colligative properties).\n\n3. Mole Fraction (X)\nThe ratio of moles of one component to the total moles of all components.\n• X_A = n_A / (n_A + n_B).\n• Sum of mole fractions = 1. (X_A + X_B = 1).\n\n4. Dilution Law\nWhen a solution is diluted, the moles of solute remain constant.\n• M₁V₁ = M₂V₂.\n\n5. Mixing Solutions\nWhen two solutions of the same substance are mixed:\n• M_mix = (M₁V₁ + M₂V₂) / (V₁ + V₂).` 
        }
      ]
    },
    'c_u5': { 
      name: 'Solutions', 
      shortNotes: 'Concentration of solutions, Raoult’s law, Colligative properties.', 
      shortNotesPdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      shortNotesContent: `🧪 SOLUTIONS - CHAPTER REVIEW

1. Solubility & Henry's Law
• Gas in liquid solubility increases with P, decreases with T.
• Henry's Law: P = K_H · X. Higher K_H = Lower solubility.

2. Vapour Pressure & Raoult's Law
• P_total = P°_A X_A + P°_B X_B.
• Ideal Solutions: Obey Raoult's law. ΔH_mix = 0, ΔV_mix = 0.
• Non-Ideal (Positive Deviation): A-B bonds weaker. Forms Min. Boiling Azeotrope.
• Non-Ideal (Negative Deviation): A-B bonds stronger. Forms Max. Boiling Azeotrope.

3. Colligative Properties (Depend on NUMBER of particles)
• RLVP: (P° - P_s) / P° = i · X_solute
• Boiling Point Elevation: ΔT_b = i · K_b · m
• Freezing Point Depression: ΔT_f = i · K_f · m
• Osmotic Pressure: π = i · C · R · T

4. Van't Hoff Factor (i)
• i > 1 (Dissociation), i < 1 (Association), i = 1 (Non-electrolyte).`,
      topics: [
        { id: 'c_u5_t1', name: "Lecture 1 - Introduction to Solutions", videoId: 'nn-1UU_1PX8', thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400', notesText: 'Concentration calculations', 
          lectureNotesContent: `📌 LECTURE 1: INTRODUCTION & CONCENTRATION\n\n1. What is a Solution?\nA homogeneous mixture of two or more chemically non-reacting substances whose composition can be varied within certain limits. We focus primarily on binary solutions (1 Solute + 1 Solvent).\n\n2. Concentration Review\n• Mass Percentage (w/w): (Mass of solute / Mass of solution) × 100\n• Volume Percentage (v/v): (Volume of solute / Volume of solution) × 100\n• Parts per million (ppm): Used for trace quantities. (Mass of solute / Mass of solution) × 10⁶\n• Molarity (M) and Molality (m) are critical. Remember: Molality is independent of temperature.` 
        },
        { id: 'c_u5_t2', name: "Lecture 2 - Solubility & Henry's Law", videoId: 'ltirLC4AD2E', thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400', notesText: 'Henry\'s law and applications', 
          lectureNotesContent: `📌 LECTURE 2: SOLUBILITY & HENRY'S LAW\n\n1. Solubility of Solid in Liquid\n• Like dissolves like (Polar solutes in polar solvents).\n• Effect of Temp: If dissolution is endothermic (ΔH > 0), solubility increases with temperature. If exothermic, it decreases.\n• Pressure has no significant effect.\n\n2. Solubility of Gas in Liquid\n• Highly dependent on Pressure and Temperature.\n• Effect of Temp: Solubility of gases ALWAYS decreases with an increase in temperature (dissolution is exothermic).\n\n3. Henry's Law\nThe partial pressure of the gas in vapor phase (P) is proportional to the mole fraction of the gas (X) in the solution.\n• P = K_H · X\n• K_H is Henry's Law constant. Higher K_H implies lower solubility at a given pressure.\n• Applications: Carbonated beverages, scuba diving (bends), high altitudes (anoxia).` 
        },
        { id: 'c_u5_t3', name: "Lecture 3 - Vapour Pressure & Raoult's Law", videoId: 'qpfnOJlL3SU', thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400', notesText: 'Raoult\'s Law for volatile liquids', 
          lectureNotesContent: `📌 LECTURE 3: VAPOUR PRESSURE & RAOULT'S LAW\n\n1. Vapour Pressure\nThe pressure exerted by the vapors of a liquid in equilibrium with its liquid phase at a given temperature. Increases with temperature.\n\n2. Raoult's Law for Volatile Liquids\nFor a solution of volatile liquids, the partial vapour pressure of each component in the solution is directly proportional to its mole fraction.\n• P_A = P°_A · X_A\n• P_B = P°_B · X_B\n• P_total = P_A + P_B = P°_A X_A + P°_B X_B\n\n3. Relation with Henry's Law\nRaoult's law is a special case of Henry's law where the constant K_H becomes equal to the vapor pressure of the pure component (P°).` 
        },
        { id: 'c_u5_t4', name: "Lecture 4 - Ideal & Non-Ideal Solutions", videoId: 'Lrn31fEY5uc', thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400', notesText: 'Positive & Negative deviations', 
          lectureNotesContent: `📌 LECTURE 4: IDEAL AND NON-IDEAL SOLUTIONS\n\n1. Ideal Solutions\nObey Raoult's law exactly over the entire range of concentration.\n• A-B interactions are perfectly equal to A-A and B-B interactions.\n• ΔH_mix = 0 (No heat absorbed or evolved).\n• ΔV_mix = 0 (No expansion or contraction).\n• Examples: Benzene + Toluene, n-Hexane + n-Heptane.\n\n2. Non-Ideal Solutions (Positive Deviation)\n• A-B interactions are WEAKER than A-A / B-B. Molecules escape easily.\n• P_total > Expected.\n• ΔH_mix > 0 (Endothermic), ΔV_mix > 0 (Expansion).\n• Examples: Ethanol + Acetone, Carbon disulphide + Acetone.\n\n3. Non-Ideal Solutions (Negative Deviation)\n• A-B interactions are STRONGER than A-A / B-B. Molecules are held tightly.\n• P_total < Expected.\n• ΔH_mix < 0 (Exothermic), ΔV_mix < 0 (Contraction).\n• Examples: Chloroform + Acetone (due to H-bonding), Nitric acid + Water.` 
        },
        { id: 'c_u5_t5', name: "Lecture 5 - Azeotropic Mixtures", videoId: 'i5rSNwv9v9s', thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400', notesText: 'Minimum & Maximum boiling', 
          lectureNotesContent: `📌 LECTURE 5: AZEOTROPES\n\n1. Definition\nAzeotropes are binary mixtures having the same composition in liquid and vapor phase and boil at a constant temperature. They cannot be separated by fractional distillation.\n\n2. Minimum Boiling Azeotrope\n• Formed by solutions showing large POSITIVE deviation from Raoult's law.\n• The boiling point of the azeotrope is lower than the boiling points of both pure components.\n• Example: 95% Ethanol-Water mixture.\n\n3. Maximum Boiling Azeotrope\n• Formed by solutions showing large NEGATIVE deviation from Raoult's law.\n• The boiling point of the azeotrope is higher than the boiling points of both pure components.\n• Example: 68% Nitric Acid-Water mixture.` 
        },
        { id: 'c_u5_t6', name: "Lecture 6 - Colligative Properties & RLVP", videoId: 'aMbnHVKiYWg', thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400', notesText: 'Relative Lowering of Vapour Pressure', 
          lectureNotesContent: `📌 LECTURE 6: COLLIGATIVE PROPERTIES & RLVP\n\n1. Colligative Properties\nProperties of ideal dilute solutions that depend ONLY on the NUMBER of solute particles and not on their chemical nature.\n\n2. Relative Lowering of Vapour Pressure (RLVP)\nWhen a non-volatile solute is added to a solvent, the vapour pressure of the solvent decreases. \n• ΔP = P°_A - P_A\n• RLVP = (P°_A - P_A) / P°_A = X_B (Mole fraction of solute).\n• This formula is used extensively in JEE to determine the molar mass of an unknown non-volatile solute: \n  (P°_A - P_s) / P°_A = (n_B) / (n_A + n_B).` 
        },
        { id: 'c_u5_t7', name: "Lecture 7 - Elevation in Boiling Point", videoId: 'EEnbajugGfg', thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400', notesText: 'Ebullioscopy', 
          lectureNotesContent: `📌 LECTURE 7: ELEVATION IN BOILING POINT\n\n1. Concept\nAdding a non-volatile solute lowers the vapour pressure. Hence, a higher temperature is needed to make the vapour pressure equal to atmospheric pressure (the definition of boiling).\n\n2. Formula\n• ΔT_b = T_b(solution) - T°_b(pure solvent)\n• ΔT_b is directly proportional to molality (m).\n• ΔT_b = K_b · m\n• K_b is the Ebullioscopic Constant (Molal Elevation Constant). Unit: K kg mol⁻¹.\n• Important: K_b depends ONLY on the nature of the solvent, not the solute.` 
        },
        { id: 'c_u5_t8', name: "Lecture 8 - Depression in Freezing Point", videoId: '1b0tmhf8c3s', thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400', notesText: 'Cryoscopy', 
          lectureNotesContent: `📌 LECTURE 8: DEPRESSION IN FREEZING POINT\n\n1. Concept\nFreezing point is the temperature at which the liquid and solid phases have the same vapour pressure. A non-volatile solute lowers the vapour pressure of the liquid, causing it to intersect the solid phase vapour pressure curve at a lower temperature.\n\n2. Formula\n• ΔT_f = T°_f(pure solvent) - T_f(solution)\n• ΔT_f is directly proportional to molality (m).\n• ΔT_f = K_f · m\n• K_f is the Cryoscopic Constant (Molal Depression Constant). Unit: K kg mol⁻¹.\n• Application: Using ethylene glycol as antifreeze in car radiators.` 
        },
        { id: 'c_u5_t9', name: "Lecture 9 - Osmosis & Osmotic Pressure", videoId: 'p-aCsUDvoSo', thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400', notesText: 'Osmotic pressure', 
          lectureNotesContent: `📌 LECTURE 9: OSMOSIS & OSMOTIC PRESSURE\n\n1. Osmosis\nThe spontaneous net flow of solvent molecules through a semi-permeable membrane from a region of lower solute concentration (pure solvent) to a region of higher solute concentration.\n\n2. Osmotic Pressure (π)\nThe excess pressure that must be applied to the solution side to just stop the flow of solvent.\n• π = C · R · T (where C is molarity, R is gas constant, T is temperature in Kelvin).\n\n3. Types of Solutions\n• Isotonic: Two solutions having the same osmotic pressure at a given temperature.\n• Hypertonic: A solution with higher osmotic pressure (cells shrink in it due to exosmosis).\n• Hypotonic: A solution with lower osmotic pressure (cells swell in it due to endosmosis).` 
        },
        { id: 'c_u5_t10', name: "Lecture 10 - Van't Hoff Factor", videoId: 'JCmK2OJGwyY', thumbnail: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400', notesText: 'Abnormal Molar Mass', isAdvanced: true, 
          lectureNotesContent: `📌 LECTURE 10: VAN'T HOFF FACTOR (i)\n\n1. Abnormal Molar Mass\nIf solutes undergo dissociation (e.g., NaCl into Na+ and Cl-) or association (e.g., Acetic acid forming dimers in benzene), the number of particles in solution changes. Colligative properties depend on the NUMBER of particles, so the observed property will differ from the calculated one.\n\n2. Van't Hoff Factor (i)\n• i = Observed Colligative Property / Calculated Colligative Property.\n• i = Normal Molar Mass / Abnormal (Observed) Molar Mass.\n• i = Total moles of particles after association/dissociation / Initial moles.\n\n3. Modified Formulas\nALWAYS use the modified formulas in JEE if the solute is an electrolyte:\n• ΔP / P°_A = i · X_B\n• ΔT_b = i · K_b · m\n• ΔT_f = i · K_f · m\n• π = i · C · R · T\n\n4. Degree of Dissociation (α)\n• i = 1 + (n - 1)α, where n is the number of ions produced per molecule.\n5. Degree of Association (α)\n• i = 1 + (1/n - 1)α, where n is the number of molecules associating.` 
        }
      ] 
    },
    'c_u2': { name: 'Atomic Structure', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('c_u2') },
    'c_u4': { name: 'Chemical Thermodynamics', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('c_u4') },
    'c_u6': { name: 'Equilibrium', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('c_u6') },
    'c_u9': { name: 'Classification of Elements & Periodicity', shortNotes: 'Notes on Genesis of Periodic Classification and Periodic Trends.', shortNotesPdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', topics: mockTopic('c_u9') },
    'c_u3': { name: 'Chemical Bonding and Molecular Structure', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('c_u3') },
    'c_u10': { name: 'p-Block Elements (Group 13-14)', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('c_u10') },
    'c_u13': { name: 'Purification & Characterisation', shortNotes: 'Key methodologies for isolating and purifying organic compounds.', shortNotesPdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', topics: mockTopic('c_u13') },
    'c_u14': { name: 'Basic Principles of Organic Chemistry', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('c_u14') },
    'c_u15': { name: 'Hydrocarbons', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('c_u15') },
    'c_u7': { name: 'Redox Reactions & Electrochemistry', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('c_u7') },
    'c_u8': { name: 'Chemical Kinetics', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('c_u8') },
    'c_u10_2': { name: 'p-Block Elements (Group 15-18)', shortNotes: 'Detailed overview of Nitrogen, Oxygen, Halogen, and Noble Gas families.', shortNotesPdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', topics: mockTopic('c_u10_2') },
    'c_u11': { name: 'd and f Block Elements', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('c_u11') },
    'c_u12': { name: 'Coordination Compounds', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('c_u12') },
    'c_u16': { name: 'Organic Compounds containing Halogens', shortNotes: 'Nomenclature, nature of C-X bond, methods of preparation, and substitution mechanisms.', shortNotesPdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', topics: mockTopic('c_u16') },
    'c_u17': { name: 'Organic Compounds containing Oxygen', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('c_u17') },
    'c_u18': { name: 'Organic Compounds containing Nitrogen', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('c_u18') },
    'c_u19': { name: 'Biomolecules', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('c_u19') },
    'c_u20': { name: 'Principles Related to Practical Chemistry', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('c_u20') }
  },
  mathematics: {
    colorText: 'text-orange-400',
    colorHex: 'orange',
    'm_u1': { 
      name: 'Sets, Relations and Functions', 
      shortNotes: 'Core review of sets representation, union/intersection, and functional mapping.',
      shortNotesPdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      shortNotesContent: `📐 SETS, RELATIONS & FUNCTIONS - CHAPTER REVIEW

1. Sets & Subsets
• A set is a well-defined collection of objects.
• Total subsets of a set with n elements = 2ⁿ.
• Power Set P(A) is the collection of all subsets.

2. Set Operations
• Union (A ∪ B): Elements in A or B.
• Intersection (A ∩ B): Elements in both A and B.
• Difference (A - B): Elements in A but not B.
• De Morgan's Laws: (A ∪ B)' = A' ∩ B' AND (A ∩ B)' = A' ∪ B'.

3. Cardinality Formulas
• n(A ∪ B) = n(A) + n(B) - n(A ∩ B).
• n(A ∪ B ∪ C) = n(A) + n(B) + n(C) - n(A ∩ B) - n(B ∩ C) - n(A ∩ C) + n(A ∩ B ∩ C).

4. Relations
• Reflexive: (a, a) ∈ R for all a.
• Symmetric: If (a, b) ∈ R, then (b, a) ∈ R.
• Transitive: If (a, b) ∈ R and (b, c) ∈ R, then (a, c) ∈ R.
• Equivalence Relation: Reflexive, Symmetric, and Transitive.

5. Functions (Mappings)
• One-One (Injective): Distinct elements have distinct images.
• Onto (Surjective): Range = Codomain.
• Bijective: Both One-One and Onto. Only bijective functions have an inverse.`,
      topics: [
        { id: 'm_u1_t1', name: "Lecture 1 - Introduction to Sets", videoId: 'Gjj_kMtZkCo', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Sets Introduction', 
          lectureNotesContent: `📌 LECTURE 1: INTRODUCTION TO SETS\n\n1. Definition\nA set is a well-defined collection of objects. "Well-defined" means there should be no ambiguity regarding whether a particular object belongs to the collection or not.\n\n2. Representation of Sets\n• Roster / Tabular Form: All elements are listed, separated by commas, and enclosed in braces {}. Example: Vowels V = {a, e, i, o, u}. Order does not matter, and elements are not repeated.\n• Set-Builder Form: All elements share a single common property. Example: V = {x : x is a vowel in English alphabet}.\n\n3. Types of Sets\n• Empty / Null / Void Set (∅ or {}): A set containing no elements.\n• Finite Set: A set with a specific number of elements.\n• Infinite Set: A set with an infinite number of elements.\n• Equal Sets: Two sets A and B are equal if they have exactly the same elements. Order and repetition do not change equality.` 
        },
        { id: 'm_u1_t2', name: "Lecture 2 - Subsets & Intervals", videoId: 'UXQ5rz4M_mI', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Subset logic', 
          lectureNotesContent: `📌 LECTURE 2: SUBSETS & INTERVALS\n\n1. Subsets\nA set A is a subset of B (A ⊆ B) if every element of A is also an element of B.\n• Every set is a subset of itself (A ⊆ A).\n• The empty set is a subset of every set (∅ ⊆ A).\n• If A ⊆ B and B ⊆ A, then A = B.\n• Total number of subsets of a set with n elements is 2ⁿ.\n\n2. Intervals as Subsets of Real Numbers (R)\n• Open Interval (a, b): Includes all real numbers between a and b, EXCLUDING a and b. Set form: {x : a < x < b}.\n• Closed Interval [a, b]: Includes all real numbers between a and b, INCLUDING a and b. Set form: {x : a ≤ x ≤ b}.\n• Half-Open / Half-Closed [a, b) or (a, b]: Includes one endpoint but not the other.\n\n3. Power Set and Universal Set\n• Power Set P(A): The collection of ALL subsets of a set A. It is a set of sets.\n• Universal Set (U): The overarching set containing all elements and sets relevant to a particular context.` 
        },
        { id: 'm_u1_t3', name: "Lecture 3 - Set Operations", videoId: '5Gdl11kiI-g', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Union and Intersection', 
          lectureNotesContent: `📌 LECTURE 3: OPERATIONS ON SETS\n\n1. Union of Sets (A ∪ B)\nThe set of all elements which are in A, or in B, or in both.\n• Commutative: A ∪ B = B ∪ A\n• Associative: (A ∪ B) ∪ C = A ∪ (B ∪ C)\n• Idempotent: A ∪ A = A\n• Law of Identity: A ∪ ∅ = A\n\n2. Intersection of Sets (A ∩ B)\nThe set of all elements which are common to both A and B.\n• Disjoint Sets: If A ∩ B = ∅, the sets are disjoint.\n• Distributive Law (Crucial): A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C).\n\n3. Difference of Sets (A - B)\nThe set of elements which belong to A but DO NOT belong to B.\n• A - B = A ∩ B'\n\n4. Complement of a Set (A')\nThe set of all elements in the Universal set (U) that are not in A.\n• (A')' = A\n• De Morgan's Laws: (A ∪ B)' = A' ∩ B' and (A ∩ B)' = A' ∪ B'.` 
        },
        { id: 'm_u1_t4', name: "Lecture 4 - Cardinality & Venn Diagrams", videoId: 'Otj-0xdM62Q', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Practical word problems', 
          lectureNotesContent: `📌 LECTURE 4: CARDINALITY & VENN DIAGRAMS\n\n1. Venn Diagrams\nVisual representations of sets using circles inside a rectangle (representing the Universal set). Very useful for solving complex wording problems in JEE without using algebra.\n\n2. Cardinality Formulas (Practical Word Problems)\nLet n(A) represent the number of elements in a finite set A.\n• For any two sets: n(A ∪ B) = n(A) + n(B) - n(A ∩ B).\n• If A and B are disjoint: n(A ∪ B) = n(A) + n(B).\n• For three sets (Learn this!): n(A ∪ B ∪ C) = n(A) + n(B) + n(C) - n(A ∩ B) - n(B ∩ C) - n(A ∩ C) + n(A ∩ B ∩ C).\n• Number of elements in EXACTLY ONE of two sets A and B = n(A ∪ B) - n(A ∩ B).` 
        },
        { id: 'm_u1_t5', name: "Lecture 5 - Cartesian Product & Relations", videoId: 'fbBPEVwwnkM', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Intro to relations', 
          lectureNotesContent: `📌 LECTURE 5: CARTESIAN PRODUCT & RELATIONS\n\n1. Cartesian Product (A × B)\nThe set of all ordered pairs (a, b) where a ∈ A and b ∈ B.\n• If n(A) = p and n(B) = q, then n(A × B) = pq.\n• Note: A × B ≠ B × A unless A = B.\n\n2. Relations\nA relation R from set A to set B is a subset of the Cartesian product A × B. It establishes a link between the first element and second element of ordered pairs.\n• Domain: Set of all first elements of the ordered pairs in R.\n• Range: Set of all second elements of the ordered pairs in R.\n• Codomain: The entire set B.\n• The total number of possible relations from A to B is 2^(pq).` 
        },
        { id: 'm_u1_t6', name: "Lecture 6 - Types of Relations", videoId: 'SvIBEs_YetQ', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Reflexive, Symmetric, Transitive', 
          lectureNotesContent: `📌 LECTURE 6: TYPES OF RELATIONS\n\nA relation R on a single set A is categorized as:\n\n1. Reflexive Relation\n• For EVERY element a ∈ A, the pair (a, a) must belong to R.\n• (If even one element misses its doublet, it is not reflexive).\n\n2. Symmetric Relation\n• If (a, b) ∈ R, then (b, a) MUST also belong to R, for all a, b ∈ A.\n\n3. Transitive Relation (Most tricky!)\n• If (a, b) ∈ R AND (b, c) ∈ R, then (a, c) MUST belong to R.\n• NOTE: If (a, b) ∈ R but there is NO (b, c) in the relation at all, the relation is STILL considered transitive by default! It only fails if the "bridge" exists but the final link (a, c) is missing.\n\n4. Equivalence Relation\nA relation that is simultaneously Reflexive, Symmetric, and Transitive.` 
        },
        { id: 'm_u1_t7', name: "Lecture 7 - Functions & Types", videoId: '-pXzLzYTmGM', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'One-one, Onto mapping', 
          lectureNotesContent: `📌 LECTURE 7: FUNCTIONS\n\n1. Definition\nA relation f from set A to set B is a function if EVERY element of set A has ONE AND ONLY ONE image in set B.\n• Vertical Line Test: A graph represents a function if no vertical line intersects the curve more than once.\n\n2. Types of Functions (Mappings)\n• One-One (Injective): Every element in the domain has a distinct image in the codomain. If f(x₁) = f(x₂), then x₁ = x₂.\n• Many-One: Two or more elements in the domain have the same image.\n• Onto (Surjective): Every element in the codomain has at least one pre-image in the domain. Mathematical condition: Range = Codomain.\n• Into: At least one element in the codomain has no pre-image. (Range ⊂ Codomain).\n• Bijective: A function that is BOTH One-One and Onto. Only bijective functions have an inverse.` 
        }
      ] 
    },
    'm_u3': { 
      name: 'Matrices and Determinants', 
      shortNotes: 'Algebra of matrices, properties of determinants, and system of linear equations.', 
      shortNotesPdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      shortNotesContent: `📐 MATRICES & DETERMINANTS - CHAPTER REVIEW

1. Matrices & Types
• Order is m × n (rows × columns).
• Symmetric: A = Aᵀ.
• Skew-Symmetric: A = -Aᵀ (Main diagonal elements are zero).

2. Matrix Operations
• Addition: Matrices must be of identical order.
• Multiplication (AB): Columns of A must equal rows of B. Generally, AB ≠ BA.
• Transpose Reversal Law: (AB)ᵀ = BᵀAᵀ.

3. Determinants (|A|)
• |A| = |Aᵀ|.
• Swapping two rows/columns flips the sign.
• |AB| = |A| |B|.
• |kA| = kⁿ |A|.

4. Adjoint & Inverse
• A(adj A) = |A|I.
• A⁻¹ = (1/|A|) · adj(A). Exists only if |A| ≠ 0.
• Reversal Law: (AB)⁻¹ = B⁻¹A⁻¹.

5. System of Linear Equations (AX = B)
• Consistent: Unique solution (|A| ≠ 0).
• Inconsistent: No solution (|A| = 0 and (adj A)B ≠ 0).
• Infinite solutions: (|A| = 0 and (adj A)B = 0).`,
      topics: [
        { id: 'm_u3_t1', name: "Lecture 1 - Introduction to Matrices", videoId: 'zd_DiEhylh4', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Matrix Types & Algebra', 
          lectureNotesContent: `📌 LECTURE 1: INTRODUCTION TO MATRICES\n\n1. Definition and Order\nA matrix is an ordered rectangular array of numbers or functions. \n• Order is m × n (m rows, n columns).\n• Elements are denoted as a_ij (element in ith row and jth column).\n\n2. Types of Matrices\n• Row Matrix: Only 1 row (1 × n).\n• Column Matrix: Only 1 column (m × 1).\n• Square Matrix: Rows = Columns (n × n).\n• Diagonal Matrix: A square matrix where all non-diagonal elements are zero.\n• Scalar Matrix: A diagonal matrix where all diagonal elements are equal.\n• Identity Matrix (I): A scalar matrix where all diagonal elements are 1.\n• Zero/Null Matrix (O): All elements are zero.\n\n3. Equality of Matrices\nTwo matrices are equal if they have the exact same order AND every corresponding element is equal.` 
        },
        { id: 'm_u3_t2', name: "Lecture 2 - Operations on Matrices", videoId: 'j3fjBZFkgts', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Multiplication & Properties', 
          lectureNotesContent: `📌 LECTURE 2: OPERATIONS ON MATRICES\n\n1. Addition and Scalar Multiplication\n• Addition: Matrices must be of the same order. Add corresponding elements.\n• Scalar Multiplication: If matrix A is multiplied by scalar k, EVERY element of A is multiplied by k.\n\n2. Matrix Multiplication (The core operation)\n• Condition: For AB to be defined, number of columns in A must equal number of rows in B. If A is m×n and B is n×p, AB will be m×p.\n• Process: Row-by-Column multiplication.\n\n3. Properties of Multiplication\n• Not generally commutative: AB ≠ BA.\n• Associative: A(BC) = (AB)C.\n• Distributive: A(B+C) = AB + AC.\n• Multiplication by Identity: AI = IA = A.\n• Zero Product Property: AB = O does NOT necessarily mean A = O or B = O (a key difference from standard algebra).` 
        },
        { id: 'm_u3_t3', name: "Lecture 3 - Transpose & Adjoint", videoId: 'Cz4sw-fNF9k', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Symmetric & Skew Symmetric', 
          lectureNotesContent: `📌 LECTURE 3: TRANSPOSE & ADJOINT\n\n1. Transpose of a Matrix (Aᵀ)\nObtained by interchanging rows and columns.\n• Properties: (Aᵀ)ᵀ = A; (kA)ᵀ = kAᵀ; (A+B)ᵀ = Aᵀ + Bᵀ.\n• Reversal Law (Crucial): (AB)ᵀ = BᵀAᵀ.\n\n2. Symmetric and Skew-Symmetric Matrices\n• Symmetric: A = Aᵀ. Elements symmetric about the main diagonal are equal (a_ij = a_ji).\n• Skew-Symmetric: A = -Aᵀ. Main diagonal elements must be exactly zero. Elements symmetric about the diagonal are negatives of each other (a_ij = -a_ji).\n• Any square matrix can be expressed as the sum of a symmetric and skew-symmetric matrix: A = ½(A + Aᵀ) + ½(A - Aᵀ).\n\n3. Adjoint of a Matrix (adj A)\nThe transpose of the cofactor matrix of A.\n• Crucial Property: A(adj A) = (adj A)A = |A|I.` 
        },
        { id: 'm_u3_t4', name: "Lecture 4 - Determinants & Inverse", videoId: 'OWkczETVnDI', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400', notesText: 'Evaluating Determinants', isAdvanced: true, 
          lectureNotesContent: `📌 LECTURE 4: DETERMINANTS & INVERSE\n\n1. Determinants (|A|)\nA scalar value associated only with square matrices.\n• Sarrus Rule or standard expansion along any row/column.\n\n2. Key Properties of Determinants\n• |A| = |Aᵀ|.\n• Swapping two rows/columns flips the sign of the determinant.\n• If two rows/columns are identical or proportional, |A| = 0.\n• |AB| = |A| |B|.\n• |kA| = kⁿ |A| (where n is the order of the matrix).\n\n3. Inverse of a Matrix (A⁻¹)\n• Formula: A⁻¹ = (1 / |A|) · adj(A).\n• Exists ONLY if |A| ≠ 0 (Non-singular matrix).\n• Reversal Law: (AB)⁻¹ = B⁻¹A⁻¹.\n• Orthogonal Matrix: If A·Aᵀ = I, then A⁻¹ = Aᵀ.\n\n4. System of Linear Equations\n• Equation: AX = B. Solution: X = A⁻¹B.\n• Consistent: Unique solution (|A| ≠ 0).\n• Inconsistent: No solution (|A| = 0 and (adj A)B ≠ 0).\n• Infinite solutions: (|A| = 0 and (adj A)B = 0).` 
        }
      ] 
    },
    'm_u2': { name: 'Complex Numbers and Quadratic Equations', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('m_u2') },
    'm_u4': { name: 'Permutations and Combinations', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('m_u4') },
    'm_u5': { name: 'Binomial Theorem', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('m_u5') },
    'm_u6': { name: 'Sequence and Series', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('m_u6') },
    'm_u10_1': { name: 'Straight Lines', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('m_u10_1') },
    'm_u10_2': { name: 'Circles and Conic Sections', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('m_u10_2') },
    'm_u14_1': { name: 'Trigonometry', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('m_u14_1') },
    'm_u7': { name: 'Limit, Continuity and Differentiability', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('m_u7') },
    'm_u8': { name: 'Integral Calculus', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('m_u8') },
    'm_u9': { name: 'Differential Equations', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('m_u9') },
    'm_u11': { name: 'Three Dimensional Geometry', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('m_u11') },
    'm_u12': { name: 'Vector Algebra', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('m_u12') },
    'm_u13': { name: 'Statistics and Probability', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('m_u13') },
    'm_u14_2': { name: 'Inverse Trigonometric Functions', shortNotes: 'Quick summary and formulas for this chapter.', topics: mockTopic('m_u14_2') }
  }
};