
document.addEventListener('DOMContentLoaded', function () {
  // ===== Language packs (EN & PT-PT) — YOUR VERSION =====
  var i18n = {
    en: {
      toggleLabel: 'PT',
      title: 's‑ANT1 (Animal Naming Test) — Screening in Advanced Chronic Liver Disease without overt Hepatic Encephalopathy',
      subtitle: 'ANT stands for <em>Animal Naming Test in 1 minute</em>. This calculator estimates <strong>s‑ANT1</strong> and suggests next steps for patients with advanced chronic liver disease (ACLD) <em>without overt Hepatic Encephalopathy (HE)</em>.',
      inputs: 'Inputs',
      antLabel: 'ANT (animals named in 1 minute)',
      antHint: 'Integer count of unique animal names in 60 seconds.',
      ageLabel: 'Age (years)',
      yoeLabel: 'Years of Education',
      calc: 'Calculate',
      reset: 'Reset',
      result: 'Result',
      scoreLabel: 's‑ANT1',
      awaiting: 'Awaiting input',
      adviceDefault: 'Enter values and click Calculate.',
      formulaSummary: 'Formula',
      formulaCode: 's-ANT1 = ( ANT − 11.3984 − (Age × 0.0795) + (Age² × 0.0014) − (YearsOfEducation × 0.8008) + (YearsOfEducation² × 0.0165) ) / 4.1399 + ANT',
      thresholdsSummary: 'Interpretation thresholds',
      th1: '<strong>Covert Hepatic Encephalopathy excluded</strong>: s‑ANT1 &gt; 15.4',
      th2: '<strong>Uncertain</strong>: 7 ≤ s‑ANT1 ≤ 15.4',
      th3: '<strong>Assume covert Hepatic Encephalopathy</strong>: s‑ANT1 &lt; 7',
      disclaimer: '<strong>Disclaimer:</strong> For informational purposes only and not a substitute for professional medical judgment.',
      // Validation
      vAllRequired: 'All inputs are required.',
      vAntRange: 'ANT should be between 0 and 100.',
      vAgeRange: 'Age should be between 0 and 120.',
      vYoeRange: 'Years of Education should be between 0 and 40.',
      // Interpretation labels & advice
      labelExcluded: 'Covert HE excluded',
      adviceExcluded: 'Consider alternative diagnosis if neuropsychiatric signs or symptoms are present.',
      labelUncertain: 'Uncertain',
      adviceUncertain: 'PHES; neuropsychological assessment; alternative tests',
      labelAssume: 'Assume covert HE',
      adviceAssume: 'Start treatment'
    },
    'pt-pt': {
      toggleLabel: 'EN',
      title: 's‑ANT1 (Animal Naming Test simplificado) — Rastreio de Encefalopatia Hepática Covert na Doença Hepática Crónica avançada',
      subtitle: '<strong>ANT</strong> significa <em>Animal Naming Test em 1 minuto</em> que consiste num teste em que se pede ao doente "Vou-lhe pedir que me diga o maior número de animais que conseguir. Não deve repetir a mesma espécie animal com pequenas variações como por exemplo: cão, cadela. Tem 1 minuto para me dizer o maior número de animais diferentes. Pronto? Começar!". Esta plataforma calcula o valor simplificado do <strong>ANT1</strong>, mediante a idade e anos de escolaridade, para realizar o diagnóstico de <em>Encefalopatia Hepática Covert</em> e ajudar na decisão sobre os próximos passos a seguir.',
      inputs: 'Variávies',
      antLabel: 'ANT (animais nomeados em 1 minuto)',
      antHint: 'Contagem inteira de nomes de animais únicos em 60 segundos.',
      ageLabel: 'Idade (anos)',
      yoeLabel: 'Anos de escolaridade',
      calc: 'Calcular',
      reset: 'Limpar',
      result: 'Resultado',
      scoreLabel: 's‑ANT1',
      awaiting: 'A aguardar dados',
      adviceDefault: 'Introduza os valores e clique em Calcular.',
      formulaSummary: 'Fórmula',
      formulaCode: 's-ANT1 = ( ANT − 11.3984 − (Idade × 0.0795) + (Idade² × 0.0014) − (Anos de escolaridade × 0.8008) + (Anos de escolaridade² × 0.0165) ) / 4.1399 + ANT',
      thresholdsSummary: 'Limiares de interpretação',
      th1: '<strong>Excluída Encefalopatia Hepática covert</strong>: s‑ANT1 &gt; 15.4',
      th2: '<strong>Diagnóstico incerto de Encefalopatia Hepática covert</strong>: 7 ≤ s‑ANT1 ≤ 15.4',
      th3: '<strong>Assumir Encefalopatia Hepática covert </strong>: s‑ANT1 &lt; 7',
      disclaimer: '<strong>Aviso:</strong> Para fins informativos e não substitui o juízo clínico profissional.',
      // Validation
      vAllRequired: 'Todos os campos são obrigatórios.',
      vAntRange: 'O ANT deve estar entre 0 e 100.',
      vAgeRange: 'A idade deve estar entre 0 e 120.',
      vYoeRange: 'Os anos de escolaridade devem estar entre 0 e 40.',
      // Interpretation labels & advice
      labelExcluded: 'Encefalopatia Hepática excluída',
      adviceExcluded: 'Considerar diagnóstico alternativo em caso de sinais/sintomas neuropsiquiátricos.',
      labelUncertain: 'Indeterminado',
      adviceUncertain: 'Realizar Score Psicométrico de Encefalopatia Hepática, avaliação neuropsicológica formal ou ponderar testes alternativos.',
      labelAssume: 'Assumir Encefalopatia Hepática',
      adviceAssume: 'Iniciar tratamento. Aconcelhar para não conduzir se não fizer tratamento'
    }
  };

  // ===== Language utilities =====
  function getLang() {
    var stored = localStorage.getItem('lang');
    if (stored) return stored;
    var nav = (navigator.language || '').toLowerCase();
    if (nav === 'pt-pt') return 'pt-pt';
    return 'en';
  }

  function setText(id, text, allowHTML) {
    var el = document.getElementById(id);
    if (!el) return;
    if (allowHTML) el.innerHTML = text; else el.textContent = text;
  }

  function applyLang(lang) {
    var pack = i18n[lang] || i18n.en;
    document.documentElement.setAttribute('lang', lang === 'pt-pt' ? 'pt' : 'en');
    document.documentElement.setAttribute('data-lang', lang);
    var toggle = document.getElementById('lang-toggle');
    if (toggle) toggle.textContent = pack.toggleLabel;

    setText('t-title', pack.title, false);
    setText('t-subtitle', pack.subtitle, true);
    setText('t-inputs', pack.inputs, false);
    setText('t-ant-label', pack.antLabel, false);
    setText('t-ant-hint', pack.antHint, false);
    setText('t-age-label', pack.ageLabel, false);
    setText('t-yoe-label', pack.yoeLabel, false);
    setText('t-calc', pack.calc, false);
    setText('t-reset', pack.reset, false);
    setText('t-result', pack.result, false);
    setText('t-score-label', pack.scoreLabel, false);

    var outTitleEl = document.getElementById('out-title');
    // Only set neutral texts if no result yet
    if (outTitleEl && outTitleEl.textContent === '—') {
      setText('t-await', pack.awaiting, false);
      setText('out-advice', pack.adviceDefault, false);
    }

    setText('t-formula-summary', pack.formulaSummary, false);
    setText('t-formula-code', pack.formulaCode, true);
    setText('t-thresholds-summary', pack.thresholdsSummary, false);
    setText('t-th1', pack.th1, true);
    setText('t-th2', pack.th2, true);
    setText('t-th3', pack.th3, true);
    setText('t-disclaimer', pack.disclaimer, true);

    // Update validation & interpretation packs
    validationMessages = {
      allRequired: pack.vAllRequired,
      antRange: pack.vAntRange,
      ageRange: pack.vAgeRange,
      yoeRange: pack.vYoeRange
    };
    interpretationPack = {
      excluded: { label: pack.labelExcluded, advice: pack.adviceExcluded, cls: 'mdc-interpretation--ok' },
      uncertain: { label: pack.labelUncertain, advice: pack.adviceUncertain, cls: 'mdc-interpretation--warn' },
      assume:   { label: pack.labelAssume, advice: pack.adviceAssume, cls: 'mdc-interpretation--risk' },
      neutral:  { label: pack.awaiting, advice: pack.adviceDefault, cls: 'mdc-interpretation--neutral' }
    };
  }

  // ===== Grab elements =====
  var ant = document.getElementById('ant');
  var age = document.getElementById('age');
  var yoe = document.getElementById('yoe');

  var btnCalc = document.getElementById('btn-calc');
  var btnReset = document.getElementById('btn-reset');
  var msg = document.getElementById('validation-msg');

  var outScore = document.getElementById('out-score');
  var outTitle = document.getElementById('out-title');
  var outAdvice = document.getElementById('out-advice');
  var outBox = document.getElementById('out-interpretation');
  var outBadge = document.getElementById('t-await'); // reuse badge element

  var interpretationPack = null;
  var validationMessages = null;

  // ===== Helpers =====
  function parseNum(el) {
    var v = (el && el.value) ? el.value.trim() : '';
    if (v === '') return null;
    var n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  function validate(a, b, c) {
    var issues = [];
    if (a === null || b === null || c === null) {
      issues.push(validationMessages.allRequired);
    }
    if (a !== null && (a < 0 || a > 100)) issues.push(validationMessages.antRange);
    if (b !== null && (b < 0 || b > 120)) issues.push(validationMessages.ageRange);
    if (c !== null && (c < 0 || c > 40)) issues.push(validationMessages.yoeRange);
    return issues;
  }

  // s-ANT1 core computation (display text may show "+ ANT", but formula used here is your original)
  function computeScore(ANT, Age, YearsOfEducation) {
    var term =
      ANT
      - 11.3984
      - (Age * 0.0795)
      + (Math.pow(Age, 2) * 0.0014)
      - (YearsOfEducation * 0.8008)
      + (Math.pow(YearsOfEducation, 2) * 0.0165);

    term = term / 4.1399

    return term + ANT;
  }

  // Updated thresholds: >15.4 excluded; 7–15.4 uncertain; <7 assume
  function interpret(score) {
    if (score > 15.4) return interpretationPack.excluded;
    if (score >= 7)   return interpretationPack.uncertain;
    return interpretationPack.assume;
  }

  function formatScore(x) {
    if (!Number.isFinite(x)) return '—';
    return x.toFixed(2);
  }

  // ===== Actions =====
  function calculate() {
    var vANT = parseNum(ant);
    var vAge = parseNum(age);
    var vYOE = parseNum(yoe);

    var issues = validate(vANT, vAge, vYOE);
    msg.textContent = issues.length ? issues.join(' ') : '';

    if (issues.length) {
      outScore.textContent = '—';
      outTitle.textContent = '—';
      outAdvice.textContent = interpretationPack.neutral.advice;
      outBox.className = 'mdc-interpretation mdc-interpretation--neutral';
      if (outBadge) outBadge.textContent = interpretationPack.neutral.label; // "Awaiting input" in current language
      return;
    }

    var score = computeScore(vANT, vAge, vYOE);
    var interp = interpret(score);

    outScore.textContent = formatScore(score);
    outTitle.textContent = interp.label;
    outAdvice.textContent = interp.advice;
    outBox.className = 'mdc-interpretation ' + interp.cls;
    if (outBadge) outBadge.textContent = interp.label; // ✅ badge now shows the category, not "Awaiting input"
  }

  function resetAll() {
    if (ant) ant.value = '';
    if (age) age.value = '';
    if (yoe) yoe.value = '';
    msg.textContent = '';
    outScore.textContent = '—';
    outTitle.textContent = '—';
    outAdvice.textContent = interpretationPack.neutral.advice;
    outBox.className = 'mdc-interpretation mdc-interpretation--neutral';
    if (outBadge) outBadge.textContent = interpretationPack.neutral.label;
  }

  // ===== Wire up events =====
  if (btnCalc) btnCalc.addEventListener('click', calculate);
  if (btnReset) btnReset.addEventListener('click', resetAll);

  var form = document.getElementById('calc-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      calculate();
    });
  }

  // ===== Initialize language & toggle =====
  var currentLang = getLang();
  applyLang(currentLang);

  var toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      currentLang = (currentLang === 'pt-pt') ? 'en' : 'pt-pt';
      localStorage.setItem('lang', currentLang);
      applyLang(currentLang);
      // After language change, if a result is on screen, reapply badge text (keeps current category label)
      if (outTitle && outTitle.textContent !== '—' && outBadge) {
        // Map current title to the pack (simple approach: set to title text itself)
        outBadge.textContent = outTitle.textContent;
      }
    });
  }

  console.log('[s-ANT1] Ready. Lang:', currentLang);
});
