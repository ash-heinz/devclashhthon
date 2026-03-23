// File: src/data/mockTests.js

export const mockTests = {
  mains: [
    { id: 'm26', year: 2026, title: 'JEE Main 2026 (28th Jan Morning)', duration: 180, totalMarks: 300 },
    { id: 'm25', year: 2025, title: 'JEE Main 2025 Full Length', duration: 180, totalMarks: 300 },
    { id: 'm24', year: 2024, title: 'JEE Main 2024 Full Length', duration: 180, totalMarks: 300 },
    { id: 'm23', year: 2023, title: 'JEE Main 2023 Full Length', duration: 180, totalMarks: 300 },
  ],
  advanced: [
    { id: 'a25', year: 2025, title: 'JEE Advanced 2025 Full Length', duration: 360, totalMarks: 360 },
    { id: 'a24', year: 2024, title: 'JEE Advanced 2024 Full Length', duration: 360, totalMarks: 360 },
    { id: 'a23', year: 2023, title: 'JEE Advanced 2023 Full Length', duration: 360, totalMarks: 360 },
  ]
};

export const mockQuestions = [
  // ==========================================
  // CHEMISTRY (25 Questions)
  // ==========================================
  {
    id: 1, subject: 'Chemistry', chapterId: 'c_u16', // Coordination Compounds
    text: "Given below are two statements:\nStatement I : The number of pairs, from the following, in which both the ions are coloured in aqueous solution is 3. [Sc3+, Ti3+], [Mn2+, Cr2+], [Cu2+, Zn2+] and [Ni2+, Ti4+]\nStatement II : Th4+ is the strongest reducing agent among Th4+, Ce4+, Gd3+ and Eu2+.\nIn the light of the above statements, choose the correct answer:",
    options: ["Both Statement I and Statement II are true", "Both Statement I and Statement II are false", "Statement I is true but Statement II is false", "Statement I is false but Statement II is true"],
    correct: 3
  },
  {
    id: 2, subject: 'Chemistry', chapterId: 'c_u13', // Organic/Amines
    text: "A student performed analysis of aliphatic organic compound ‘X’ which on analysis gave C = 61.01%, H = 15.25%, N = 23.74%. This compound, on treatment with HNO2/H2O produced another compound ‘Y’ which did not contain any nitrogen atom. However, the compound ‘Y’ upon controlled oxidation produced another compound ‘Z’ that responded to iodoform test. The structure of ‘X’ is :",
    options: ["CH3CH2NH2", "CH3CH2CH2NH2", "CH3CH(NH2)CH3", "(CH3)3CNH2"],
    correct: 2
  },
  {
    id: 3, subject: 'Chemistry', chapterId: 'c_u5', // Thermodynamics / Equilibrium
    text: "The plot of log10 K vs 1/T gives a straight line. The intercept and slope respectively are (where K is equilibrium constant).",
    options: ["ΔS°/2.303R, -ΔH°/2.303R", "-ΔH°/2.303R, ΔS°/2.303R", "ΔH°/R, -ΔS°/R", "-ΔS°/R, ΔH°/R"],
    correct: 0
  },
  {
    id: 4, subject: 'Chemistry', chapterId: 'c_u13', // Amines
    text: "Total number of alkali insoluble solid sulphonamides obtained by reaction of given amines with Hinsberg's reagent is ________.\nAniline, N-Methylaniline, Methanamine, N,N-Dimethylmethanamine, N-Methyl methanamine, Phenylmethanamine, N-propylaniline, N-phenylaniline, N,N-Dimethylaniline, Allyl amine, Isopropyl amine",
    options: ["2", "3", "4", "5"],
    correct: 1
  },
  {
    id: 5, subject: 'Chemistry', chapterId: 'c_u4', // Chemical Bonding
    text: "Match List - I with List - II according to shape.\nList I: A. XeO3, B. XeF2, C. XeO2F2, D. XeOF4\nList II: I. BrF5, II. NH3, III. [I3]-, IV. SF4",
    options: ["A-II, B-III, C-IV, D-I", "A-I, B-II, C-III, D-IV", "A-III, B-IV, C-I, D-II", "A-IV, B-I, C-II, D-III"],
    correct: 0
  },
  {
    id: 6, subject: 'Chemistry', chapterId: 'c_u8', // d-block elements
    text: "Consider the following reactions involving Na2B4O7 heated to form X and Y. The oxidation states of Cu in Z and Q respectively are :",
    options: ["+2 and +1", "+1 and +2", "+2 and 0", "+1 and 0"],
    correct: 0
  },
  {
    id: 7, subject: 'Chemistry', chapterId: 'c_u4', // Bonding / States of matter
    text: "Given below are two statements :\nStatement I : The increasing order of boiling point of hydrogen halides is HCl < HBr < HI < HF.\nStatement II : The increasing order of melting point of hydrogen halides is HCl < HBr < HF < HI.\nChoose the correct answer:",
    options: ["Both Statement I and Statement II are true", "Both Statement I and Statement II are false", "Statement I is true but Statement II is false", "Statement I is false but Statement II is true"],
    correct: 0
  },
  {
    id: 8, subject: 'Chemistry', chapterId: 'c_u14', // Biomolecules
    text: "Structures of four disaccharides are given below. Among the given disaccharides, the non-reducing sugar is :",
    options: ["Maltose", "Lactose", "Sucrose", "Cellobiose"],
    correct: 2
  },
  {
    id: 9, subject: 'Chemistry', chapterId: 'c_u16', // d-block / Coordination
    text: "Consider the following statements about manganate and permanganate ions. Identify the correct statements.\nA. The geometry of both manganate and permanganate ions is tetrahedral.\nB. The oxidation states of Mn in manganate and permanganate are +7 and +6, respectively.\nD. Manganate ion is paramagnetic and permanganate ion is diamagnetic.",
    options: ["A and D only", "A, B and D only", "A and C only", "B and D only"],
    correct: 0
  },
  {
    id: 10, subject: 'Chemistry', chapterId: 'c_u2', // Atomic Structure
    text: "The wavelength of photon 'A' is 400 nm. The frequency of photon 'B' is 10^16 s^-1. The wave number of photon 'C' is 10^4 cm^-1. The correct order of energy of these photons is :",
    options: ["E_B > E_A > E_C", "E_A > E_B > E_C", "E_C > E_A > E_B", "E_B > E_C > E_A"],
    correct: 0
  },
  {
    id: 11, subject: 'Chemistry', chapterId: 'c_u10', // Organic Chemistry
    text: "The reactions which produce alcohol as the product are : (Oxidation of Alkanes and Alkenes)",
    options: ["A and B only", "B and C only", "A, C and D only", "C and E only"],
    correct: 2
  },
  {
    id: 12, subject: 'Chemistry', chapterId: 'c_u1', // Mole Concept
    text: "For the given reaction; CaCO3 + 2HCl → CaCl2 + H2O + CO2. If 90 g CaCO3 is added to 300 mL of HCl which contains 38.55% HCl by mass and has density 1.13 g mL-1, then which of the following option is correct ?",
    options: ["HCl is the limiting reagent", "CaCO3 is the limiting reagent", "Both are consumed completely", "22.4 L of CO2 is produced at STP"],
    correct: 1
  },
  {
    id: 13, subject: 'Chemistry', chapterId: 'c_u3', // Periodic Properties
    text: "Consider the elements N, P, O, S, Cl and F. The number of valence electrons present in the elements with most and least metallic character from the above list is respectively.",
    options: ["5 and 7", "5 and 6", "6 and 7", "4 and 7"],
    correct: 0
  },
  {
    id: 14, subject: 'Chemistry', chapterId: 'c_u6', // Equilibrium
    text: "Observe the following equilibrium in a 1 L flask. A(g) ⇌ B(g). At T(K), the equilibrium concentrations of A and B are 0.5 M and 0.375 M respectively. 0.1 moles of A is added into the flask. The new equilibrium concentrations of A and B are respectively:",
    options: ["0.557 M and 0.418 M", "0.450 M and 0.525 M", "0.600 M and 0.400 M", "0.500 M and 0.475 M"],
    correct: 0
  },
  {
    id: 15, subject: 'Chemistry', chapterId: 'c_u16', // Coordination Compounds
    text: "The correct increasing order of spin-only magnetic moment values of the complex ions [MnBr4]2− (A), [Cu(H2O)6]2+ (B), [Ni(CN)4]2− (C) and [Ni(H2O)6]2+ (D) is :",
    options: ["C < B < D < A", "B < C < D < A", "C < D < B < A", "D < C < B < A"],
    correct: 0
  },
  {
    id: 16, subject: 'Chemistry', chapterId: 'c_u10', // Organic Acids
    text: "The correct order of acidic strength of the major products formed in the given reactions (A, B, C, D) is :",
    options: ["C > A > B > D", "A > C > D > B", "C > D > A > B", "A > B > C > D"],
    correct: 0
  },
  {
    id: 17, subject: 'Chemistry', chapterId: 'c_u2', // Solutions
    text: "Consider the following aqueous solutions: I. 2.2 g Glucose in 125 mL, II. 1.9 g CaCl2 in 250 mL, III. 9.0 g Urea in 500 mL, IV. 20.5 g Al2(SO4)3 in 750 mL. The correct increasing order of boiling point is :",
    options: ["I < II < III < IV", "II < I < III < IV", "III < I < II < IV", "I < III < II < IV"],
    correct: 1
  },
  {
    id: 18, subject: 'Chemistry', chapterId: 'c_u1', // Mole Concept / Practical Chem
    text: "A student has been given 0.314 g of an organic compound and asked to estimate Sulphur. During the experiment, the student has obtained 0.4813 g of barium sulphate. The percentage of sulphur present in the compound is _________.",
    options: ["21.05%", "15.32%", "18.64%", "25.10%"],
    correct: 0
  },
  {
    id: 19, subject: 'Chemistry', chapterId: 'c_u10', // Organic Chemistry
    text: "Identify the correct statements : The presence of –NO2 group in benzene ring...",
    options: ["activates the ring towards electrophilic substitutions.", "deactivates the ring towards electrophilic substitutions.", "activates the ring towards nucleophilic substitutions.", "Both B and C are correct."],
    correct: 3
  },
  {
    id: 20, subject: 'Chemistry', chapterId: 'c_u10', // GOC
    text: "The cyclic cations having the same number of hyperconjugation are :",
    options: ["A and B", "B and C", "A and C", "All have same"],
    correct: 1
  },
  {
    id: 21, subject: 'Chemistry', chapterId: 'c_u16', // Coordination Compounds
    text: "The number of isoelectronic species among Sc3+, Cr2+, Mn3+, Co3+ and Fe3+ is ‘n’. If ‘n’ moles of AgCl is formed during the reaction of complex [CoCl3(en)2NH3] with excess AgNO3, the number of electrons present in the t2g orbital is :",
    options: ["4", "5", "6", "3"],
    correct: 2
  },
  {
    id: 22, subject: 'Chemistry', chapterId: 'c_u6', // Ionic Equilibrium
    text: "A volume of x mL of 5 M NaHCO3 solution was mixed with 10 mL of 2 M H2CO3 solution to make an electrolytic buffer. If the cell potential is 235.3 mV, then the value of x = ______ mL.",
    options: ["10", "15", "20", "25"],
    correct: 1
  },
  {
    id: 23, subject: 'Chemistry', chapterId: 'c_u6', // Electrochemistry
    text: "For strong electrolyte Λm increases slowly with dilution. Given data at 18°C. The value of constant A based on the data is ________.",
    options: ["1.2", "2.0", "0.5", "1.5"],
    correct: 1
  },
  {
    id: 24, subject: 'Chemistry', chapterId: 'c_u2', // Atomic Structure
    text: "Two positively charged particles m1 (1 amu) and m2 (4 amu) have been accelerated across the same potential difference of 200 keV. The deBroglie wavelength of m1 will be x times of m2. The value of x is :",
    options: ["1", "2", "3", "4"],
    correct: 1
  },
  {
    id: 25, subject: 'Chemistry', chapterId: 'c_u9', // Chemical Kinetics
    text: "Consider two first-order reactions. Rate constant for first reaction at 500 K is double of the same at 300 K. The rate constant for the second reaction at 300 K is _______ × 10^-1 hour^-1.",
    options: ["3", "5", "7", "9"],
    correct: 1
  },

  // ==========================================
  // MATHEMATICS (25 Questions)
  // ==========================================
  {
    id: 31, subject: 'Mathematics', chapterId: 'm_u8', // Integral Calculus
    text: "The area of the region R = {(x, y) : xy ≤ 8, 1 ≤ y ≤ x², x ≥ 0} is:",
    options: ["8 log_e 2 - 14/3", "16 log_e 2 - 14/3", "8 log_e 2 - 7/3", "16 log_e 2 - 7/3"],
    correct: 1
  },
  {
    id: 32, subject: 'Mathematics', chapterId: 'm_u10_1', // Conic Sections
    text: "Let the circle x² + y² = 4 intersect x-axis at the points A(a, 0), a > 0 and B(b, 0). Let P(2 cos α, 2 sin α) and Q(2 cos β, 2 sin β) be two points such that (α - β) = π/2. Then the point of intersection of AQ and BP lies on :",
    options: ["x² + y² = 4", "x² + y² = 2", "x² + y² = 8", "y = x"],
    correct: 0
  },
  {
    id: 33, subject: 'Mathematics', chapterId: 'm_u8', // Differential Equations
    text: "Let y = y(x) be the solution of the differential equation x(dy/dx) - y = x² cot x, x ∈ (0, π). If y(π/2) = π/2, then 6y(π/6) - 8y(π/4) is equal to :",
    options: ["π(2 - √3)", "π(√3 - 2)", "π(3 - √2)", "π(√2 - 3)"],
    correct: 0
  },
  {
    id: 34, subject: 'Mathematics', chapterId: 'm_u11', // 3D Geometry
    text: "Let Q(a, b, c) be the image of the point P(3, 2, 1) in the line (x - 1)/1 = y/2 = (z - 1)/1. Then the distance of Q from the line (x - 9)/3 = (y - 9)/2 = (z - 5)/-2 is :",
    options: ["√14", "√21", "√10", "√29"],
    correct: 1
  },
  {
    id: 35, subject: 'Mathematics', chapterId: 'm_u6', // Trigonometry
    text: "Considering the principal values of inverse trigonometric functions, the value of the expression tan(2 sin⁻¹(2/√13) - 2 cos⁻¹(3/√10)) is equal to :",
    options: ["1", "-1", "17/6", "-17/6"],
    correct: 3
  },
  {
    id: 36, subject: 'Mathematics', chapterId: 'm_u2', // Quadratic Equations
    text: "Let the arithmetic mean of 1/a and 1/b be 5/16, a > 2. If α is such that a, 4, α, b are in A.P., then the equation αx² - ax + 2(α - 2b) = 0 has :",
    options: ["Real and equal roots", "Real and distinct roots", "Imaginary roots", "Exactly one root"],
    correct: 1
  },
  {
    id: 37, subject: 'Mathematics', chapterId: 'm_u1', // Functions
    text: "Given below are two statements : Statement I : The function f(x) = x / (1 + |x|) is one-one. Statement II : The function f(x) = (x² + 4x - 30) / (x² - 8x + 18) is many-one. Choose the correct answer:",
    options: ["Both Statement I and Statement II are true", "Both are false", "Statement I is true, II is false", "Statement I is false, II is true"],
    correct: 0
  },
  {
    id: 38, subject: 'Mathematics', chapterId: 'm_u11', // Vectors
    text: "Let P be a point in the plane of the vectors AB = 3i + j - k and AC = i - j + 3k such that P is equidistant from the lines AB and AC. If |AP| = √(5/2), then the area of the triangle ABP is :",
    options: ["√5 / 2", "5 / 2", "√10 / 2", "10 / 3"],
    correct: 0
  },
  {
    id: 39, subject: 'Mathematics', chapterId: 'm_u8', // Integration
    text: "Let f(x) = ∫ dx / (x^(2/3) + 2x^(1/2)), be such that f(0) = -26 + 24 log_e(2). If f(1) = a + b log_e(3), where a, b ∈ Z, then a + b is equal to :",
    options: ["-5", "-2", "4", "7"],
    correct: 1
  },
  {
    id: 40, subject: 'Mathematics', chapterId: 'm_u10_1', // Conic Sections
    text: "An ellipse has its center at (1, -2), one focus at (3, -2) and one vertex at (5, -2). Then the length of its latus rectum is :",
    options: ["3", "6", "9", "12"],
    correct: 1
  },
  {
    id: 41, subject: 'Mathematics', chapterId: 'm_u4', // Binomial Theorem
    text: "Given below are two statements : Statement I : 25^13 + 20^13 + 8^13 + 3^13 is divisible by 7. Statement II : The integral part of (7 + 4√3)^25 is an odd number. Choose the correct answer:",
    options: ["Both I and II are true", "Both I and II are false", "I is true, II is false", "I is false, II is true"],
    correct: 0
  },
  {
    id: 42, subject: 'Mathematics', chapterId: 'm_u2', // Complex Numbers
    text: "Let A = {z ∈ C : |z - 2| ≤ 4} and B = {z ∈ C : |z - 2| + |z + 2| = 5}. Then the max {|z1 - z2| : z1 ∈ A and z2 ∈ B} is :",
    options: ["6.5", "8.5", "10.5", "12.5"],
    correct: 1
  },
  {
    id: 43, subject: 'Mathematics', chapterId: 'm_u10_1', // Parabola
    text: "Let A be the focus of the parabola y² = 8x. Let the line y = mx + c intersect the parabola at two distinct points B and C. If the centroid of the triangle ABC is (7/3, 4/3), then (BC)² is equal to :",
    options: ["64", "80", "96", "112"],
    correct: 2
  },
  {
    id: 44, subject: 'Mathematics', chapterId: 'm_u8', // Limits and Continuity
    text: "Let f(x) = lim(θ→0) (cos πx - x(2/θ)sin(x-1)) / (1 + x(2/θ)(x-1)), x ∈ R. Consider: (I) f(x) is discontinuous at x = 1. (II) f(x) is continuous at x = -1.",
    options: ["Only I is true", "Only II is true", "Both I and II are true", "Neither I nor II is true"],
    correct: 2
  },
  {
    id: 45, subject: 'Mathematics', chapterId: 'm_u4', // Series
    text: "6/3^26 + 10⋅1/3^25 + 10⋅2/3^24 + 10⋅2^2/3^23 + … + 10⋅2^24/3 is equal to :",
    options: ["1", "2", "3", "4"],
    correct: 1
  },
  {
    id: 46, subject: 'Mathematics', chapterId: 'm_u8', // Definite Integration
    text: "Let [.] denote the greatest integer function. Then ∫(-π/2 to π/2) (12(3 + [x])) / (3 + [sin x] + [cos x]) dx is equal to :",
    options: ["3π", "4π", "5π", "6π"],
    correct: 3
  },
  {
    id: 47, subject: 'Mathematics', chapterId: 'm_u10_1', // Hyperbola
    text: "Let the ellipse E : x²/144 + y²/169 = 1 and the hyperbola H : x²/16 - y²/λ² = -1 have the same foci. If e and L respectively denote the eccentricity and the length of the latus rectum of H, then the value of 24(e + L) is :",
    options: ["45", "55", "65", "75"],
    correct: 2
  },
  {
    id: 48, subject: 'Mathematics', chapterId: 'm_u12', // Probability
    text: "The probability distribution of a random variable X is given. If E(X) = 263/15, then P(X < 20) is equal to :",
    options: ["1/5", "2/5", "3/5", "4/5"],
    correct: 1
  },
  {
    id: 49, subject: 'Mathematics', chapterId: 'm_u8', // Area Under Curve
    text: "Let P1 : y = 4x² and P2 : y = x² + 27 be two parabolas. If the area of the bounded region enclosed between P1 and P2 is six times the area enclosed between y = αx and P1, then α is equal to :",
    options: ["3", "6", "9", "12"],
    correct: 1
  },
  {
    id: 50, subject: 'Mathematics', chapterId: 'm_u6', // Trigonometry
    text: "The sum of all the elements in the range of f(x) = Sgn(sin x) + Sgn(cos x) + Sgn(tan x) + Sgn(cot x), x ≠ nπ/2 is :",
    options: ["0", "2", "4", "6"],
    correct: 0
  },
  {
    id: 51, subject: 'Mathematics', chapterId: 'm_u4', // Binomial Theorem
    text: "The sum of the coefficients of x^499 and x^500 in (1+x)^1000 + x(1+x)^999 + x²(1+x)^998 + … + x^1000 is :",
    options: ["^1001C_500", "^1001C_501", "^1002C_500", "^1002C_501"],
    correct: 2
  },
  {
    id: 52, subject: 'Mathematics', chapterId: 'm_u4', // Sequences
    text: "If Σ (from r=1 to 25) (r / (r^4 + r² + 1)) = p/q, where gcd(p, q) = 1, then p + q is equal to :",
    options: ["325", "651", "976", "1301"],
    correct: 2
  },
  {
    id: 53, subject: 'Mathematics', chapterId: 'm_u5', // Permutations
    text: "Three persons enter in a lift at the ground floor. The lift will go up to 10th floor. The number of ways, in which the three persons can exit the lift at three different floors, if the lift does not stop at first, second and third floors, is equal to :",
    options: ["120", "210", "336", "504"],
    correct: 1
  },
  {
    id: 54, subject: 'Mathematics', chapterId: 'm_u11', // 3D Geometry
    text: "If the distance of the point P(43, α, β), β < 0, from the line r = 4i - k + μ(2i + 3k) along a line with direction ratios 3, -1, 0 is 13√10, then α² + β² is equal to :",
    options: ["100", "125", "150", "175"],
    correct: 1
  },
  {
    id: 55, subject: 'Mathematics', chapterId: 'm_u3', // Matrices
    text: "Let A = [[3, -4], [1, -1]] and B be two matrices such that A^100 = 100B + I. Then the sum of all the elements of B^100 is :",
    options: ["0", "1", "2", "3"],
    correct: 0
  },

  // ==========================================
  // PHYSICS (25 Questions)
  // ==========================================
  {
    id: 61, subject: 'Physics', chapterId: 'p_u1', // Units and Dimensions
    text: "Which one of the following is not a measurable quantity?",
    options: ["Force", "Temperature", "Solid Angle", "None of these"],
    correct: 2
  },
  {
    id: 62, subject: 'Physics', chapterId: 'p_u8', // Kinetic Theory of Gases
    text: "The mean free path of a molecule of diameter 5 × 10^-10 m at the temperature 41°C and pressure 1.38 × 10^5 Pa, is given as ________ m. (Given kB = 1.38 × 10^-23 J/K).",
    options: ["1.5 × 10^-7", "2.8 × 10^-7", "3.2 × 10^-7", "4.0 × 10^-7"],
    correct: 1
  },
  {
    id: 63, subject: 'Physics', chapterId: 'p_u9', // Oscillations
    text: "The time period of a simple harmonic oscillator is T = 2π√(m/k). Measured value of mass (m) is 10 g with an accuracy of 10 mg and time for 50 oscillations is 60 s using a watch of 2 s resolution. Percentage error in determination of spring constant (k) is ________%.",
    options: ["3.4%", "4.5%", "6.7%", "8.2%"],
    correct: 2
  },
  {
    id: 64, subject: 'Physics', chapterId: 'p_u13', // Magnetic Effects
    text: "A long cylindrical conductor with large cross section carries an electric current distributed uniformly over its cross-section. Magnetic field due to this current is:",
    options: ["maximum at either ends", "maximum at the surface of the conductor", "minimum at the surface", "same at all points"],
    correct: 1
  },
  {
    id: 65, subject: 'Physics', chapterId: 'p_u10', // Waves
    text: "The speed of a longitudinal wave in a metallic bar is 400 m/s. If the density and Young's modulus of the bar material are increased by 0.5% and 1%, respectively then the speed of the wave is changed approximately to ______ m/s.",
    options: ["401 m/s", "405 m/s", "408 m/s", "410 m/s"],
    correct: 0
  },
  {
    id: 66, subject: 'Physics', chapterId: 'p_u4', // Rotational Motion
    text: "When the position vector r = xi + yj + zk changes sign as -r, which one of the following vector will not flip under sign change?",
    options: ["Linear Momentum", "Angular Momentum", "Force", "Electric Field"],
    correct: 1
  },
  {
    id: 67, subject: 'Physics', chapterId: 'p_u2', // Laws of Motion
    text: "A small block of mass m slides down from the top of a frictionless inclined surface, while the inclined plane is moving towards left with constant acceleration a0. The time it takes to reach the lowest point of the inclined plane is ________.",
    options: ["√(2L / g sin θ)", "√(2L / (g sin θ + a0 cos θ))", "√(2L / (g sin θ - a0 cos θ))", "√(2L / a0 cos θ)"],
    correct: 1
  },
  {
    id: 68, subject: 'Physics', chapterId: 'p_u15', // EM Waves
    text: "A plane electromagnetic wave is moving in free space with velocity c = 3 × 10^8 m/s and its electric field is given as E = 54 sin(kz - ωt) j V/m. The magnetic field vector B of the wave is :",
    options: ["1.8 × 10^-7 sin(kz - ωt) i T", "1.8 × 10^-7 sin(kz - ωt) -i T", "1.8 × 10^-7 sin(kz - ωt) k T", "54 × 10^-8 sin(kz - ωt) i T"],
    correct: 1
  },
  {
    id: 69, subject: 'Physics', chapterId: 'p_u19', // Semiconductors
    text: "Two p-n junction diodes D1 and D2 are connected as shown in figure. A and B are input signals and C is the output. The given circuit will function as a ________ logic gate.",
    options: ["OR", "AND", "NOR", "NAND"],
    correct: 0
  },
  {
    id: 70, subject: 'Physics', chapterId: 'p_u11', // Electrostatics
    text: "Identify the correct statements : A. Effective capacitance of a series combination of capacitors is always smaller than the smallest capacitance of the capacitor in the combination.",
    options: ["Statement A is True", "Statement A is False", "Both A and B are True", "None of the above"],
    correct: 0
  },
  {
    id: 71, subject: 'Physics', chapterId: 'p_u4', // Rotational Motion
    text: "Two circular discs of radius each 10 cm are joined at their centres by a rod of length 30 cm and mass 600 gm. If the mass of each disc is 600 gm and applied torque between two discs is 43 × 10^5 dyne.cm, the angular acceleration of the discs about the given axis AB is ____ rad/s².",
    options: ["10", "20", "43", "50"],
    correct: 2
  },
  {
    id: 72, subject: 'Physics', chapterId: 'p_u11', // Electrostatics
    text: "Identify the correct statements : A. Electrostatic field lines form closed loops. B. The electric field lines point radially outward when charge is greater than zero.",
    options: ["A is true, B is false", "A is false, B is true", "Both are true", "Both are false"],
    correct: 1
  },
  {
    id: 73, subject: 'Physics', chapterId: 'p_u6', // Properties of Bulk Matter
    text: "Match List - I with List - II : A. Coefficient of viscosity, B. Surface tension, C. Pressure, D. Surface energy.",
    options: ["A-IV, B-III, C-I, D-II", "A-IV, B-III, C-I, D-III", "A-I, B-II, C-III, D-IV", "A-II, B-I, C-IV, D-III"],
    correct: 1
  },
  {
    id: 74, subject: 'Physics', chapterId: 'p_u16', // Optics
    text: "A biconvex lens is formed by using two thin planoconvex lenses. When an object is placed on the left side of lens at a distance of 30 cm, the magnification of the image will be :",
    options: ["-1", "-2", "1", "2"],
    correct: 0
  },
  {
    id: 75, subject: 'Physics', chapterId: 'p_u18', // Atoms and Nuclei
    text: "A nucleus has mass number α and radius Rα. Another nucleus has mass number β and radius Rβ. If β = 8α then Rα / Rβ is :",
    options: ["1/2", "1/4", "1/8", "2"],
    correct: 0
  },
  {
    id: 76, subject: 'Physics', chapterId: 'p_u1', // Kinematics
    text: "A particle starts moving from time t = 0 and its coordinate is given as x(t) = 4t³ - 3t. Identify the correct statement:",
    options: ["Particle returns to origin at t=0.866", "Particle is 1 unit away at turning point", "Acceleration is non-negative", "Particle never turns back"],
    correct: 0
  },
  {
    id: 77, subject: 'Physics', chapterId: 'p_u16', // Optics
    text: "For a transparent prism, if the angle of minimum deviation is equal to its refracting angle, the refractive index n of the prism satisfies:",
    options: ["n < 1", "n > 2", "1 < n < 2", "n = 2"],
    correct: 2
  },
  {
    id: 78, subject: 'Physics', chapterId: 'p_u9', // Oscillations
    text: "As shown in the figure, a spring is kept in a stretched position with some extension by holding the masses 1 kg and 0.2 kg. The angular frequency (in SI unit) of the system is :",
    options: ["5", "10", "15", "20"],
    correct: 1
  },
  {
    id: 79, subject: 'Physics', chapterId: 'p_u1', // Units and Measurement
    text: "In an experiment, a set of reading are obtained as follows - 1.24 mm, 1.25 mm, 1.23 mm, 1.21 mm. The expected least count of the instrument used is _______ mm.",
    options: ["0.1", "0.01", "0.001", "1.0"],
    correct: 1
  },
  {
    id: 80, subject: 'Physics', chapterId: 'p_u17', // Dual Nature of Matter
    text: "Number of photons of equal energy emitted per second by a 6 mW laser source operating at 663 nm is ________.",
    options: ["1 × 10^16", "2 × 10^16", "3 × 10^16", "4 × 10^16"],
    correct: 1
  },
  {
    id: 81, subject: 'Physics', chapterId: 'p_u12', // Current Electricity
    text: "A Wheatstone bridge is initially at room temperature. When R3 resistance is heated, its resistance value goes up by 10%. The potential difference (Va - Vb) is _________ V.",
    options: ["0.2", "0.4", "0.6", "0.8"],
    correct: 1
  },
  {
    id: 82, subject: 'Physics', chapterId: 'p_u14', // Alternating Current
    text: "An inductor stores 16 J of magnetic field energy and dissipates 32 W of thermal energy when an a.c. current of 2 A (rms) and frequency 50 Hz flows through it. The ratio of inductive reactance to its resistance is ______.",
    options: ["100π", "200π", "50π", "150π"],
    correct: 0
  },
  {
    id: 83, subject: 'Physics', chapterId: 'p_u7', // Thermodynamics
    text: "A thermodynamic system is taken through the cyclic process ABC as shown in the figure. The total work done by the system during the cycle ABC is ______ J.",
    options: ["400", "800", "1200", "1600"],
    correct: 1
  },
  {
    id: 84, subject: 'Physics', chapterId: 'p_u16', // Wave Optics
    text: "A beam of light consisting of wavelengths 650 nm and 550 nm illuminates the Young's double slits. The least distance of a point from the central maximum, where the bright fringes due to both coincide, is ________ × 10^-5 m.",
    options: ["1.95", "3.90", "4.25", "2.15"],
    correct: 0
  },
  {
    id: 85, subject: 'Physics', chapterId: 'p_u3', // Work, Energy, Power
    text: "A fly wheel having mass 3 kg and radius 5 m is free to rotate. A string is wound around the wheel and connected to a 3 kg mass. Kinetic energy of the wheel when the mass descends by 3 m is ________ J.",
    options: ["30", "45", "60", "90"],
    correct: 1
  }
];