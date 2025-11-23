document.addEventListener('DOMContentLoaded', function () {
  // ===== Grab elements =====ElementById('yoe');  // ===== Grab elements =====

  var btnCalc = document.getElementById('btn-calc');
  var btnReset = document.getElementById('btn-reset');
  var msg = document.getElementById('validation-msg');

  var outScore = document.getElementById('out-score');
  var outTitle = document.getElementById('out-title');
  var outAdvice = document.getElementById('out-advice');
  var outBox = document.getElementById('out-interpretation');

  // Sanity log
  console.log('[s-ANT1] Script loaded. btn-calc:', !!btnCalc, 'btn-reset:', !!btnReset);

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
      issues.push('All inputs are required.');
    }
    if (a !== null && (a < 0 || a > 100)) issues.push('ANT should be between 0 and 100.');
    if (b !== null && (b < 0 || b > 120)) issues.push('Age should be between 0 and 120.');
    if (c !== null && (c < 0 || c > 40)) issues.push('Years of Education should be between 0 and 40.');
    return issues;
  }

  // s-ANT1 = ( ANT − 11.3984 − (Age*0.0795) + (Age^2*0.0014) − (YearsOfEducation*0.8008) + (YearsOfEducation^2*0.0165) ) / 4.1399
  function computeScore(ANT, Age, YearsOfEducation) {
    var term =
      ANT
      - 11.3984
      - (Age * 0.0795)
      + (Math.pow(Age, 2) * 0.0014)
      - (YearsOfEducation * 0.8008)
      + (Math.pow(YearsOfEducation, 2) * 0.0165);
    
    console.log( ANT, Age, YearsOfEducation);
    console.log((Age * 0.0795), Math.pow(Age, 2) * 0.0014, YearsOfEducation * 0.8008, Math.pow(YearsOfEducation, 2) * 0.0165);
    console.log(term / 4.1399);
    return (term / 4.1399) + ANT;
  }

  function interpret(score) {
    // > 15.71 => "Covert HE excluded"
    // 6.47 <= score <= 15.71 => "Uncertain"
    // < 6.47 => "Assume covert HE"
    var res = { label: '', advice: '', cls: 'mdc-interpretation--neutral' };
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
      outAdvice.textContent = 'Fix input issues and recalculate.';
      outBox.className = 'mdc-interpretation mdc-interpretation--neutral';
      return;
    }

    var score = computeScore(vANT, vAge, vYOE);
    var interp = interpret(score);

    outScore.textContent = formatScore(score);
    outTitle.textContent = interp.label;
    outAdvice.textContent = interp.advice;
    outBox.className = 'mdc-interpretation ' + interp.cls;
  }

  function resetAll() {
    if (ant) ant.value = '';
    if (age) age.value = '';
    if (yoe) yoe.value = '';
    msg.textContent = '';
    outScore.textContent = '—';
    outTitle.textContent = '—';
    outAdvice.textContent = 'Enter values and click Calculate.';
    outBox.className = 'mdc-interpretation mdc-interpretation--neutral';
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
});
  var ant = document.getElementById('ant');
  var age = document.getElementById('age');
