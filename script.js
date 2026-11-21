document.addEventListener("DOMContentLoaded", function () {
  const progressBar = document.getElementById("reading-progress");
  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight > 0 && progressBar) {
      const scrolled = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrolled.toFixed(1) + "%";
    }
  });

  const toiletsSelect = document.getElementById("calc-toilets");
  const hardnessSelect = document.getElementById("calc-hardness");
  const outputBox = document.getElementById("calc-output");

  function updateCalculator() {
    if (!toiletsSelect || !hardnessSelect || !outputBox) return;

    const toilets = parseInt(toiletsSelect.value, 10) || 1;
    const hardness = hardnessSelect.value;

    let extraInitialPouches = 0;
    let tipText = "Standard weekly maintenance (1 pouch per toilet per week).";

    if (hardness === "hard") {
      extraInitialPouches = 1 * toilets;
      tipText = "Includes 1 extra initial descaling pouch per bowl in Week 1 for hard-water calcium rings.";
    } else if (hardness === "rust") {
      extraInitialPouches = 2 * toilets;
      tipText = "Includes 2 extra initial shock pouches per bowl in Week 1 for deep well-water rust/scale (use the 105°F warm-water pre-pour trick).";
    }

    const monthlyPouches = toilets * 4 + extraInitialPouches;
    const boxesNeeded = Math.ceil(monthlyPouches / 2);
    const singleBoxCost = (boxesNeeded * 17.95).toFixed(2);
    const bundleCostPerPouch = 2.69;
    const estimatedBundleTotal = (monthlyPouches * bundleCostPerPouch).toFixed(2);

    outputBox.innerHTML =
      "<strong>Recommended 30-Day Supply:</strong> <strong>" +
      monthlyPouches +
      " pouches (" +
      boxesNeeded +
      " Boxes)</strong>.<br />" +
      "<span>&bull; <em>Why:</em> " +
      tipText +
      "</span><br />" +
      "<span>&bull; <em>Cost Comparison:</em> Buying single boxes separately costs <strong>$" +
      singleBoxCost +
      "</strong> ($8.98/clean) vs. roughly <strong>$" +
      estimatedBundleTotal +
      "</strong> (~$2.69/clean) with the official multi-box bundle discount.</span>";
  }

  if (toiletsSelect && hardnessSelect) {
    toiletsSelect.addEventListener("change", updateCalculator);
    hardnessSelect.addEventListener("change", updateCalculator);
    updateCalculator();
  }
});
