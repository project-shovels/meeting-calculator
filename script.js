/* ============================================
   Meeting Cost Calculator — CalWizz
   ============================================ */

(function () {
  'use strict';

  // --- State ---
  const state = {
    attendees: 5,
    salary: 150000,
    duration: 30,
    frequency: 'weekly',
    prep: 5,
  };

  // --- DOM refs ---
  const dom = {
    attendeesSlider: document.getElementById('attendees'),
    attendeesValue: document.getElementById('attendees-value'),
    salaryInput: document.getElementById('salary'),
    costPerMeeting: document.getElementById('cost-per-meeting'),
    costMonthly: document.getElementById('cost-monthly'),
    costAnnual: document.getElementById('cost-annual'),
    hoursAnnual: document.getElementById('hours-annual'),
    equivItems: document.getElementById('equiv-items'),
    equivalence: document.getElementById('equivalence'),
    prepBreakdown: document.getElementById('prep-breakdown'),
    prepCostAnnual: document.getElementById('prep-cost-annual'),
    btnCopy: document.getElementById('btn-copy'),
    copyText: document.getElementById('copy-text'),
    btnTwitter: document.getElementById('btn-twitter'),
    toast: document.getElementById('toast'),
  };

  // --- Constants ---
  const WORKING_HOURS_PER_YEAR = 2080;
  const WORKING_DAYS_PER_YEAR = 260;
  const WEEKS_PER_YEAR = 52;
  const MONTHS_PER_YEAR = 12;

  // Frequency multipliers (per year)
  const FREQ_YEARLY = {
    once: 1,
    daily: WORKING_DAYS_PER_YEAR,
    weekly: WEEKS_PER_YEAR,
    biweekly: 26,
    monthly: MONTHS_PER_YEAR,
  };

  // Frequency multipliers (per month)
  const FREQ_MONTHLY = {
    once: 0, // show as one-time
    daily: WORKING_DAYS_PER_YEAR / MONTHS_PER_YEAR,
    weekly: WEEKS_PER_YEAR / MONTHS_PER_YEAR,
    biweekly: 26 / MONTHS_PER_YEAR,
    monthly: 1,
  };

  // Fun comparisons
  const comparisons = [
    { emoji: '💻', template: (v) => `<strong>${fmt(Math.round(v / 1999))}</strong> MacBook Pros`, min: 1999 },
    { emoji: '🎬', template: (v) => `<strong>${fmt(Math.round(v / 15.49))}</strong> months of Netflix`, min: 100 },
    { emoji: '☕', template: (v) => `<strong>${fmt(Math.round(v / 6))}</strong> cups of fancy coffee`, min: 50 },
    { emoji: '🚗', template: (v) => `<strong>${fmt(Math.round(v / 400))}</strong> monthly car payments`, min: 400 },
    { emoji: '✈️', template: (v) => `<strong>${fmt(Math.round(v / 350))}</strong> round-trip flights`, min: 350 },
    { emoji: '🏠', template: (v) => `<strong>${fmt(Math.round(v / 2000))}</strong> months of rent`, min: 2000 },
    { emoji: '👩‍💻', template: (v) => `<strong>${fmt(Math.round(v / (state.salary / WEEKS_PER_YEAR)))}</strong> weeks of one person's salary`, min: 500 },
    { emoji: '🍕', template: (v) => `<strong>${fmt(Math.round(v / 20))}</strong> team pizza lunches`, min: 100 },
    { emoji: '📱', template: (v) => `<strong>${fmt(Math.round(v / 999))}</strong> iPhones`, min: 999 },
    { emoji: '🎓', template: (v) => `<strong>${fmt(Math.round(v / 500))}</strong> online course subscriptions`, min: 500 },
  ];

  // --- Utility ---
  function fmt(n) {
    return n.toLocaleString('en-US');
  }

  function fmtDollars(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 10000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    return fmt(Math.round(n));
  }

  // --- Animation: Counting up ---
  const counters = new Map(); // element -> { current, target, rafId }

  function animateCounter(el, target, prefix, suffix) {
    prefix = prefix || '';
    suffix = suffix || '';

    let entry = counters.get(el);
    if (!entry) {
      entry = { current: 0, target: 0, rafId: null };
      counters.set(el, entry);
    }

    entry.target = target;

    if (entry.rafId) return; // already animating

    const start = entry.current;
    const diff = target - start;
    const duration = 400; // ms
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      entry.current = start + diff * eased;

      if (Math.abs(entry.current) >= 10000) {
        el.textContent = fmtDollars(Math.round(entry.current));
      } else {
        el.textContent = fmt(Math.round(entry.current));
      }

      if (progress < 1) {
        entry.rafId = requestAnimationFrame(step);
      } else {
        entry.current = target;
        if (Math.abs(target) >= 10000) {
          el.textContent = fmtDollars(target);
        } else {
          el.textContent = fmt(target);
        }
        entry.rafId = null;

        // If target changed during animation, re-animate
        if (entry.target !== target) {
          animateCounter(el, entry.target, prefix, suffix);
        }
      }
    }

    entry.rafId = requestAnimationFrame(step);
  }

  // --- Calculation ---
  function calculate() {
    const hourlyRate = state.salary / WORKING_HOURS_PER_YEAR;
    const totalMinutes = state.duration + state.prep;
    const costPerMeeting = (hourlyRate * totalMinutes / 60) * state.attendees;
    const prepCostPerMeeting = (hourlyRate * state.prep / 60) * state.attendees;

    const yearlyMeetings = FREQ_YEARLY[state.frequency];
    const monthlyMeetings = FREQ_MONTHLY[state.frequency];

    const costAnnual = costPerMeeting * yearlyMeetings;
    const costMonthly = state.frequency === 'once' ? costPerMeeting : costPerMeeting * monthlyMeetings;
    const hoursAnnual = (totalMinutes / 60) * state.attendees * yearlyMeetings;

    const prepCostAnnual = prepCostPerMeeting * yearlyMeetings;

    return { costPerMeeting, costMonthly, costAnnual, hoursAnnual, prepCostAnnual };
  }

  function updateUI() {
    const { costPerMeeting, costMonthly, costAnnual, hoursAnnual, prepCostAnnual } = calculate();

    animateCounter(dom.costPerMeeting, Math.round(costPerMeeting));
    animateCounter(dom.costMonthly, Math.round(costMonthly));
    animateCounter(dom.costAnnual, Math.round(costAnnual));
    animateCounter(dom.hoursAnnual, Math.round(hoursAnnual));

    // Prep breakdown
    if (state.prep > 0 && state.frequency !== 'once') {
      dom.prepBreakdown.classList.add('visible');
      dom.prepCostAnnual.textContent = fmtDollars(Math.round(prepCostAnnual));
    } else {
      dom.prepBreakdown.classList.remove('visible');
    }

    // Equivalence
    updateEquivalence(costAnnual);

    // URL
    updateURL();
  }

  function updateEquivalence(annualCost) {
    // Pick 3 relevant comparisons
    const relevant = comparisons.filter(c => annualCost >= c.min);
    const picked = [];

    // Always show salary comparison if available
    const salaryComp = relevant.find(c => c.emoji === '👩‍💻');
    if (salaryComp) picked.push(salaryComp);

    // Fill remaining with varied comparisons
    const rest = relevant.filter(c => c.emoji !== '👩‍💻');
    // Shuffle deterministically based on annualCost
    const seed = Math.round(annualCost / 100);
    rest.sort((a, b) => {
      const ha = hashStr(a.emoji + seed);
      const hb = hashStr(b.emoji + seed);
      return ha - hb;
    });

    for (const c of rest) {
      if (picked.length >= 3) break;
      const val = Math.round(annualCost / parseValue(c, annualCost));
      if (val > 0) picked.push(c);
    }

    dom.equivItems.innerHTML = picked.map(c => `
      <div class="equiv-item">
        <span class="equiv-emoji">${c.emoji}</span>
        <span class="equiv-text">${c.template(annualCost)}</span>
      </div>
    `).join('');

    dom.equivalence.style.display = picked.length > 0 ? '' : 'none';
  }

  function parseValue(comp, v) {
    // Extract the divisor from the template by running it
    // Rough heuristic: just return annualCost / result
    return 1; // unused, we use template directly
  }

  function hashStr(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
  }

  // --- URL Params ---
  function updateURL() {
    const params = new URLSearchParams();
    params.set('a', state.attendees);
    params.set('s', state.salary);
    params.set('d', state.duration);
    params.set('f', state.frequency);
    params.set('p', state.prep);
    const url = window.location.pathname + '?' + params.toString();
    history.replaceState(null, '', url);
  }

  function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('a')) state.attendees = clamp(parseInt(params.get('a')) || 5, 2, 50);
    if (params.has('s')) state.salary = clamp(parseInt(params.get('s')) || 150000, 20000, 1000000);
    if (params.has('d')) {
      const d = parseInt(params.get('d'));
      if ([15, 25, 30, 45, 60, 90].includes(d)) state.duration = d;
    }
    if (params.has('f')) {
      const f = params.get('f');
      if (FREQ_YEARLY[f] !== undefined) state.frequency = f;
    }
    if (params.has('p')) {
      const p = parseInt(params.get('p'));
      if ([0, 5, 10, 15, 30].includes(p)) state.prep = p;
    }
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  // --- Sync UI from State ---
  function syncInputsFromState() {
    // Attendees
    dom.attendeesSlider.value = state.attendees;
    dom.attendeesValue.textContent = state.attendees;
    updateSliderFill(dom.attendeesSlider);

    // Salary
    dom.salaryInput.value = state.salary;
    syncSalaryPresets();

    // Duration chips
    document.querySelectorAll('[data-duration]').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.duration) === state.duration);
    });

    // Frequency chips
    document.querySelectorAll('[data-frequency]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.frequency === state.frequency);
    });

    // Prep chips
    document.querySelectorAll('[data-prep]').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.prep) === state.prep);
    });
  }

  function syncSalaryPresets() {
    const presets = [120000, 130000, 150000, 200000];
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.salary) === state.salary);
    });
  }

  function updateSliderFill(slider) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const val = parseFloat(slider.value);
    const pct = ((val - min) / (max - min)) * 100;
    slider.style.setProperty('--fill', pct + '%');
  }

  // --- Event Listeners ---
  function bindEvents() {
    // Attendees slider
    dom.attendeesSlider.addEventListener('input', () => {
      state.attendees = parseInt(dom.attendeesSlider.value);
      dom.attendeesValue.textContent = state.attendees;
      updateSliderFill(dom.attendeesSlider);
      updateUI();
    });

    // Salary input
    dom.salaryInput.addEventListener('input', () => {
      const val = parseInt(dom.salaryInput.value);
      if (!isNaN(val) && val > 0) {
        state.salary = val;
        syncSalaryPresets();
        updateUI();
      }
    });

    // Salary presets
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.salary = parseInt(btn.dataset.salary);
        dom.salaryInput.value = state.salary;
        syncSalaryPresets();
        updateUI();
      });
    });

    // Duration chips
    document.querySelectorAll('[data-duration]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.duration = parseInt(btn.dataset.duration);
        document.querySelectorAll('[data-duration]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateUI();
      });
    });

    // Frequency chips
    document.querySelectorAll('[data-frequency]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.frequency = btn.dataset.frequency;
        document.querySelectorAll('[data-frequency]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateUI();
      });
    });

    // Prep chips
    document.querySelectorAll('[data-prep]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.prep = parseInt(btn.dataset.prep);
        document.querySelectorAll('[data-prep]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateUI();
      });
    });

    // Copy link
    dom.btnCopy.addEventListener('click', async () => {
      const url = window.location.href;
      try {
        await navigator.clipboard.writeText(url);
        showToast('Link copied to clipboard!');
        dom.copyText.textContent = 'Copied!';
        setTimeout(() => { dom.copyText.textContent = 'Copy Link'; }, 2000);
      } catch {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = url;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Link copied!');
        dom.copyText.textContent = 'Copied!';
        setTimeout(() => { dom.copyText.textContent = 'Copy Link'; }, 2000);
      }
    });

    // Twitter share
    dom.btnTwitter.addEventListener('click', () => {
      const { costPerMeeting, costAnnual } = calculate();
      const text = `Our ${state.duration}-min meeting with ${state.attendees} people costs $${fmt(Math.round(costPerMeeting))} per session — that's $${fmtDollars(Math.round(costAnnual))}/year! 😱\n\nCalculate yours:`;
      const url = window.location.href;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      window.open(twitterUrl, '_blank', 'width=600,height=400');
    });
  }

  function showToast(msg) {
    dom.toast.textContent = msg;
    dom.toast.classList.add('show');
    setTimeout(() => dom.toast.classList.remove('show'), 2500);
  }

  // --- Init ---
  function init() {
    // Footer year
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Load from URL if params exist
    loadFromURL();

    // Sync inputs to state
    syncInputsFromState();

    // Bind events
    bindEvents();

    // Initial calculation
    updateUI();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
