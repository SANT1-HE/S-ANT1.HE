(function () {
  const ant = document.getElementById('ant');
  const age = document.getElementById('age');
  const yoe = document.getElementById('yoe');

  const btnCalc = document.getElementById('btn-calc');
  const btnReset = document.getElementById('btn-reset');
  const msg = document.getElementById('validation-msg');

  const outScore = document.getElementById('out-score');
  const outTitle = document.getElementById('out-title');
  const outAdvice = document.getElementById('out-advice');
  const outBox = document.getElementById('out-interpretation');

  function parseNum(el) {
    const v = el.value.trim();
    if (v === '') return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  function validate(a, b, c) {
    const issues = [];
    if (a === null || b === null || c === null) {
      issues.push('All inputs are required.');
    }
    if (a !== null && (a < 0 || a > 100)) issues.push('ANT should be between 0 and 100.');
    if (b !== null && (b < 0 || b > 120)) issues.push('Age should be between 0 and 120.');
    if (c !== null && (c < 0 || c > 40)) issues.push('Years of Education should be between 0 and 40.');
    return issues;
  }

  // s-ANT1 = ( ANT − 11.3984 − (Age*0.0795) + (Age^2*0.0014) − (YearsOfEducation*0.8008) + (YearsOfEducation^2*0.0165) ) / 4.1399
  function computeScore(ANT, Age, YearsOfEducation) {
    const term =
      ANT
      - 11.3984
      - (Age * 0.0795)
      + (Math.pow(Age, 2) * 0.0014)
      - (YearsOfEducation * 0.8008)
      + (Math.pow(YearsOfEducation, 2) * 0.0165);

    return term / 4.1399;
  }

  function interpret(score) {
    // > 15.71 => "Covert HE excluded"
    // 6.47 <= score <= 15.71 => "Uncertain"
    // < 6.47 => "Assume covert HE"
    const res = { label: '', advice: '', cls: 'mdc-interpretation--neutral' };
    if (score > 15.71) {
      res.label = 'Covert HE excluded';
      res.advice = 'Consider alternative diagnosis if neuropsychiatric signs or symptoms are present.';
      res.cls = 'mdc-interpretation--ok';
    } else if (score >= 6.47) {
      res.label = 'Uncertain';
      res.advice = 'PHES; neuropsychological assessment; alternative tests';
      res.cls = 'mdc-interpretation--warn';
    } else {
      res.label = 'Assume covert HE';
      res.advice = 'Start treatment';
      res.cls = 'mdc-interpretation--risk';
    }
    return res;
  }

  function formatScore(x) {
    if (!Number.isFinite(x)) return '—';
    return x.toFixed(2);
  }

  function calculate() {
    const vANT = parseNum(ant);
    const vAge = parseNum(age);
    const vYOE = parseNum(yoe);

    const issues = validate(vANT, vAge, vYOE);
    msg.textContent = issues.length ? issues.join(' ') : '';

    if (issues.length) {
      outScore.textContent = '—';
      outTitle.textContent = '—';
      outAdvice.textContent = 'Fix input issues and recalculate.';
      outBox.className = 'mdc-interpretation mdc-interpretation--neutral';
      return;
    }

    const score = computeScore(vANT, vAge, vYOE);
    const interp = interpret(score);

    outScore.textContent = formatScore(score);
    outTitle.textContent = interp.label;
    outAdvice.textContent = interp.advice;
    outBox.className = 'mdc-interpretation ' + interp.cls;
  }

  function resetAll() {
    ant.value = '';
    age.value = '';
    yoe.value = '';
    msg.textContent = '';
    outScore.textContent = '—';
    outTitle.textContent = '—';
    outAdvice.textContent = 'Enter values and click Calculate.';
    outBox.className = 'mdc-interpretation mdc-interpretation--neutral';
  }

  btnCalc.addEventListener('click', calculate);
  btnReset.addEventListener('click', resetAll);

  // Allow pressing Enter in the form to calculate
  document.getElementById('calc-form').addEventListener('submit', (e) => {
    e.preventDefault();
    calculate();
  });
})();
