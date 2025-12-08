const mathData = [
  {
    category: "🔢",
    items: [
      { label: "0", latex: "0" },
      { label: "1", latex: "1" },
      { label: "2", latex: "2" },
      { label: "3", latex: "3" },
      { label: "4", latex: "4" },
      { label: "5", latex: "5" },
      { label: "6", latex: "6" },
      { label: "7", latex: "7" },
      { label: "8", latex: "8" },
      { label: "9", latex: "9" },
      { label: "+", latex: "+" },
      { label: "−", latex: "-" },
      { label: "×", latex: "\\times" },
      { label: "÷", latex: "\\div" },
      { label: "=", latex: "=" },
      { label: "≠", latex: "\\neq" },
      { label: "<", latex: "<" },
      { label: ">", latex: ">" },
      { label: "≤", latex: "\\le" },
      { label: "≥", latex: "\\ge" },
      { label: "±", latex: "\\pm" }
    ]
  },
  {
    category: "√",
    items: [
      { label: "a/b", latex: "\\frac{}{}" },
      { label: "√", latex: "\\sqrt{}" },
      { label: "∛", latex: "\\sqrt[3]{}" },
      { label: "ⁿ√", latex: "\\sqrt[n]{}" },
      { label: "|x|", latex: "\\lvert x \\rvert" }
    ]
  },
  {
    category: "∫",
    items: [
      { label: "d/dx", latex: "\\frac{d}{dx} f(x)" },
      { label: "dⁿ/dxⁿ", latex: "\\frac{d^n}{dx^n} f(x)" },
      { label: "∫", latex: "\\int f(x) dx" },
      { label: "∬", latex: "\\iint f(x,y) dx dy" },
      { label: "∭", latex: "\\iiint f(x,y,z) dx dy dz" },
      { label: "∑", latex: "\\sum_{i=1}^n x_i" },
      { label: "∏", latex: "\\prod_{i=1}^n x_i" },
      { label: "lim", latex: "\\lim_{x\\to a} f(x)" },
      { label: "∞", latex: "\\infty" },
      { label: "∇", latex: "\\nabla" },
      { label: "Δf", latex: "\\Delta f" },
      { label: "curl", latex: "\\nabla \\times \\vec{F}" },
      { label: "div", latex: "\\nabla \\cdot \\vec{F}" }
    ]
  },
  {
    category: "Ω",
    items: [
      { label: "π", latex: "\\pi" },
      { label: "α", latex: "\\alpha" },
      { label: "β", latex: "\\beta" },
      { label: "γ", latex: "\\gamma" },
      { label: "δ", latex: "\\delta" },
      { label: "θ", latex: "\\theta" },
      { label: "λ", latex: "\\lambda" },
      { label: "μ", latex: "\\mu" },
      { label: "Σ", latex: "\\Sigma" },
      { label: "Δ", latex: "\\Delta" },
      { label: "Ω", latex: "\\Omega" }
    ]
  },
  {
    category: "⧉",
    items: [
      { label: "[  ]", latex: "\\begin{matrix} & \\\\ & \\end{matrix}" },
      { label: "[3x3]", latex: "\\begin{matrix} & & \\\\ & & \\\\ & & \\end{matrix}" },
      { label: "Vector", latex: "\\vec{v}" },
      { label: "Transpose", latex: "A^T" },
      { label: "Determinant", latex: "\\det(A)" }
    ]
  },
  {
    category: "ℂ",
    items: [
      { label: "|z|", latex: "|z|" },
      { label: "arg(z)", latex: "\\arg(z)" },
      { label: "ℜ(z)", latex: "\\Re(z)" },
      { label: "ℑ(z)", latex: "\\Im(z)" },
      { label: "z̄", latex: "\\overline{z}" },
      { label: "i", latex: "i" }
    ]
  },
  {
    category: "∪",
    items: [
      { label: "∈", latex: "\\in" },
      { label: "∉", latex: "\\notin" },
      { label: "∪", latex: "\\cup" },
      { label: "∩", latex: "\\cap" },
      { label: "⊂", latex: "\\subset" },
      { label: "⊆", latex: "\\subseteq" },
      { label: "⊄", latex: "\\nsubset" },
      { label: "∀", latex: "\\forall" },
      { label: "∃", latex: "\\exists" },
      { label: "¬", latex: "\\neg" },
      { label: "∧", latex: "\\wedge" },
      { label: "∨", latex: "\\vee" }
    ]
  },
  {
    category: "∠",
    items: [
      { label: "sin", latex: "\\sin" },
      { label: "cos", latex: "\\cos" },
      { label: "tan", latex: "\\tan" },
      { label: "csc", latex: "\\csc" },
      { label: "sec", latex: "\\sec" },
      { label: "cot", latex: "\\cot" },
      { label: "arcsin", latex: "\\arcsin" },
      { label: "arccos", latex: "\\arccos" },
      { label: "arctan", latex: "\\arctan" }
    ]
  },
  {
    category: "𝑒ˣ",
    items: [
      { label: "ln", latex: "\\ln" },
      { label: "log", latex: "\\log" },
      { label: "e^x", latex: "e^x" },
      { label: "a^b", latex: "a^b" },
      { label: "exp(x)", latex: "\\exp(x)" }
    ]
  },
  {
    category: "sinh",
    items: [
      { label: "sinh", latex: "\\sinh" },
      { label: "cosh", latex: "\\cosh" },
      { label: "tanh", latex: "\\tanh" },
      { label: "csch", latex: "\\csch" },
      { label: "sech", latex: "\\sech" },
      { label: "coth", latex: "\\coth" }
    ]
  },
  {
    category: "ƒ★",
    items: [
      { label: "Γ", latex: "\\Gamma" },
      { label: "ζ", latex: "\\zeta" },
      { label: "ψ", latex: "\\psi" },
      { label: "erf", latex: "\\operatorname{erf}" },
      { label: "Li", latex: "\\operatorname{Li}" }
    ]
  },
  {
    category: "σ",
    items: [
      { label: "P(A)", latex: "P(A)" },
      { label: "μ", latex: "\\mu" },
      { label: "σ", latex: "\\sigma" },
      { label: "σ²", latex: "\\sigma^2" },
      { label: "E[X]", latex: "E[X]" },
      { label: "Var(X)", latex: "\\mathrm{Var}(X)" },
      { label: "Cov(X,Y)", latex: "\\mathrm{Cov}(X,Y)" },
      { label: "ρ", latex: "\\rho" }
    ]
  },
  {
    category: "⟳",
    items: [
      { label: "↺", command: "undo" },
      { label: "↻", command: "redo" }
    ]
  }
];

export default mathData;
