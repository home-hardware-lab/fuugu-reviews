document.addEventListener("DOMContentLoaded", function () {
  const meter = document.getElementById("cr-scroll-meter");
  window.addEventListener("scroll", function () {
    const top = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (height > 0 && meter) {
      meter.style.width = ((top / height) * 100).toFixed(1) + "%";
    }
  });

  const bowlsInput = document.getElementById("cr-input-bowls");
  const scaleInput = document.getElementById("cr-input-scale");
  const displayBox = document.getElementById("cr-estimator-display");

  function runEstimator() {
    if (!bowlsInput || !scaleInput || !displayBox) return;

    const bowls = parseInt(bowlsInput.value, 10) || 1;
    const mode = scaleInput.value;

    let extraPouches = 0;
    let note = "Standard weekly schedule (1 pouch per toilet bowl per week).";

    if (mode === "hard") {
      extraPouches = 1 * bowls;
      note = "Adds 1 initial descaling pouch per bowl in Week 1 for hard-water calcium rings.";
    } else if (mode === "rust") {
      extraPouches = 2 * bowls;
      note = "Adds 2 initial shock pouches per bowl in Week 1 for deep well-water rust (use the 105°F warm-water pre-pour trick).";
    }

    const totalPouches = bowls * 4 + extraPouches;
    const totalBoxes = Math.ceil(totalPouches / 2);
    const retailCost = (totalBoxes * 17.95).toFixed(2);
    const bundleEstimate = (totalPouches * 2.69).toFixed(2);

    displayBox.innerHTML =
      "<strong>Calculated 30-Day Requirement:</strong> <strong>" +
      totalPouches +
      " pouches (" +
      totalBoxes +
      " Boxes)</strong>.<br />" +
      "<span>&bull; <em>Protocol:</em> " +
      note +
      "</span><br />" +
      "<span>&bull; <em>Price Audit:</em> Ordering single boxes separately costs <strong>$" +
      retailCost +
      "</strong> ($8.98/clean) compared to roughly <strong>$" +
      bundleEstimate +
      "</strong> (~$2.69/clean) with the multi-box bundle discount.</span>";
  }

  if (bowlsInput && scaleInput) {
    bowlsInput.addEventListener("change", runEstimator);
    scaleInput.addEventListener("change", runEstimator);
    runEstimator();
  }
});
