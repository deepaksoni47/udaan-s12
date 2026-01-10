/* ===================================
   UDAAN SEASON 12 - JAVASCRIPT
   Interactive Features & Animations
   =================================== */

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener("DOMContentLoaded", function () {
  initParticles();
  initTribalLoader();
  initAOS();
  initTyped();
  initTilt();
  initCountdownTimer();
  initHeroTyping();
  // Only initialize form-related logic when the registration form exists on the page
  if (document.getElementById("registrationForm")) {
    initFormLogic();
    initProgressTracking();
  }
  initSoundToggle();
});

// ===================================
// PARTICLES.JS CONFIGURATION
// ===================================
function initParticles() {
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: ["#c68642", "#4a7c2c", "#8f9779"],
        },
        shape: {
          type: ["circle", "triangle"],
          stroke: {
            width: 0,
            color: "#000000",
          },
        },
        opacity: {
          value: 0.3,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#c68642",
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5,
            },
          },
          push: {
            particles_nb: 4,
          },
        },
      },
      retina_detect: true,
    });
  }
}

// ===================================
// AOS (ANIMATE ON SCROLL) INITIALIZATION
// ===================================
function initAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
      delay: 0,
      disable: false,
    });
  }
}

// ===================================
// TYPED.JS - ANIMATED TITLE
// ===================================
function initTyped() {
  if (typeof Typed !== "undefined") {
    new Typed(".typed-text", {
      strings: ["UDAAN", "उड़ान", "UDAAN"],
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: "|",
      autoInsertCss: true,
    });
  }
}

// ===================================
// VANILLA TILT - CARD EFFECTS
// ===================================
function initTilt() {
  // Disable Tilt on mobile devices
  const isMobileDevice = () => {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth <= 768
    );
  };

  if (typeof VanillaTilt !== "undefined") {
    // Only apply tilt and glare on desktop
    if (!isMobileDevice()) {
      // Tilt effect on theme cards (desktop only)
      VanillaTilt.init(document.querySelectorAll(".theme-card"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
        perspective: 1000,
      });

      // Tilt effect on board cards
      VanillaTilt.init(document.querySelectorAll(".board-card"), {
        max: 8,
        speed: 300,
        glare: true,
        "max-glare": 0.2,
        perspective: 800,
      });

      // Tilt effect on form container
      VanillaTilt.init(document.querySelectorAll(".form-container"), {
        max: 2,
        speed: 400,
        glare: true,
        "max-glare": 0.1,
        perspective: 1000,
      });
    } else {
      // On mobile, disable tilt/glare by removing the data attributes
      document.querySelectorAll("[data-tilt]").forEach((el) => {
        el.removeAttribute("data-tilt");
        el.removeAttribute("data-tilt-glare");
        el.removeAttribute("data-tilt-max");
        el.removeAttribute("data-tilt-speed");
      });
    }
  }
}

// ===================================
// SOUND TOGGLE FUNCTIONALITY
// ===================================
function initSoundToggle() {
  const soundToggle = document.getElementById("soundToggle");
  let isMuted = true;

  // Create ambient forest sound (optional - using Web Audio API)
  let audioContext;
  let oscillator;
  let gainNode;

  soundToggle.addEventListener("click", function () {
    isMuted = !isMuted;

    if (isMuted) {
      soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
      soundToggle.classList.add("muted");
      stopAmbientSound();
    } else {
      soundToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
      soundToggle.classList.remove("muted");
      playAmbientSound();
    }

    // Add pulse animation
    soundToggle.style.animation = "none";
    setTimeout(() => {
      soundToggle.style.animation = "";
    }, 10);
  });

  // Set icon to muted by default on load
  soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
  soundToggle.classList.add("muted");

  function playAmbientSound() {
    // Create forest ambient sound using Web Audio API
    try {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }

      // Resume audio context if suspended (required by browsers)
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      // Create master gain for volume control
      const masterGain = audioContext.createGain();
      masterGain.gain.setValueAtTime(0.2, audioContext.currentTime);
      masterGain.connect(audioContext.destination);

      // ===== WIND/RUSTLING (White Noise) =====
      const bufferSize = audioContext.sampleRate * 2;
      const noiseBuffer = audioContext.createBuffer(
        1,
        bufferSize,
        audioContext.sampleRate
      );
      const noiseData = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        noiseData[i] = Math.random() * 2 - 1;
      }
      const noiseSource = audioContext.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      // Filter noise for wind effect
      const noiseFilter = audioContext.createBiquadFilter();
      noiseFilter.type = "lowpass";
      noiseFilter.frequency.setValueAtTime(2000, audioContext.currentTime);

      const noiseGain = audioContext.createGain();
      noiseGain.gain.setValueAtTime(0.08, audioContext.currentTime);

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      noiseSource.start();

      // ===== DEEP FOREST AMBIENCE (Low Frequency) =====
      const deepOsc = audioContext.createOscillator();
      deepOsc.type = "sine";
      deepOsc.frequency.setValueAtTime(50, audioContext.currentTime);

      const deepGain = audioContext.createGain();
      deepGain.gain.setValueAtTime(0.05, audioContext.currentTime);

      deepOsc.connect(deepGain);
      deepGain.connect(masterGain);
      deepOsc.start();

      // ===== BIRD CHIRPS (High Frequency Oscillators) =====
      const createBirdChirp = (startFreq, duration, delay) => {
        setTimeout(() => {
          if (!isMuted) {
            const bird = audioContext.createOscillator();
            const birdGain = audioContext.createGain();

            bird.type = "sine";
            bird.frequency.setValueAtTime(startFreq, audioContext.currentTime);

            birdGain.gain.setValueAtTime(0.06, audioContext.currentTime);
            birdGain.gain.exponentialRampToValueAtTime(
              0.001,
              audioContext.currentTime + duration
            );

            // Frequency sweep for chirp effect
            bird.frequency.exponentialRampToValueAtTime(
              startFreq * 1.5,
              audioContext.currentTime + duration * 0.3
            );
            bird.frequency.exponentialRampToValueAtTime(
              startFreq * 0.8,
              audioContext.currentTime + duration
            );

            bird.connect(birdGain);
            birdGain.connect(masterGain);

            bird.start();
            bird.stop(audioContext.currentTime + duration);
          }
        }, delay);
      };

      // Create repeating bird patterns
      const birdPatterns = [
        { freq: 2000, duration: 0.15, interval: 4000 },
        { freq: 2500, duration: 0.12, interval: 5500 },
        { freq: 1800, duration: 0.18, interval: 6200 },
      ];

      birdPatterns.forEach((pattern) => {
        const chirpInterval = setInterval(() => {
          if (isMuted) {
            clearInterval(chirpInterval);
          } else {
            createBirdChirp(
              pattern.freq,
              pattern.duration,
              Math.random() * 500
            );
          }
        }, pattern.interval);
      });

      // ===== GENTLE SWELLING (Amplitude Modulation) =====
      const swell = audioContext.createOscillator();
      const swellGain = audioContext.createGain();

      swell.frequency.setValueAtTime(0.3, audioContext.currentTime); // Very slow 0.3 Hz
      swellGain.gain.setValueAtTime(0.02, audioContext.currentTime);

      swell.connect(swellGain);
      swellGain.connect(masterGain.gain);
      swell.start();

      // Store for cleanup
      window.audioOscillators = [noiseSource, deepOsc, swell];
    } catch (e) {
      console.log("Web Audio API not supported", e);
    }
  }

  function stopAmbientSound() {
    // Stop all oscillators
    if (window.audioOscillators) {
      window.audioOscillators.forEach((osc) => {
        try {
          osc.stop();
        } catch (e) {
          // Oscillator already stopped
        }
      });
      window.audioOscillators = null;
    }

    if (oscillator) {
      try {
        oscillator.stop();
      } catch (e) {
        // Oscillator already stopped
      }
      oscillator = null;
    }
  }
}

// ===================================
// FORM VALIDATION & LOGIC
// ===================================
function initFormLogic() {
  const form = document.getElementById("registrationForm");
  const errorBox = document.getElementById("formError");
  if (!form) return;

  // disable native validation so we can show custom messages
  form.setAttribute("novalidate", "true");

  // enforce numeric-only input for phone fields on input
  const phoneFields = [
    document.getElementById("mobileInput"),
    document.getElementById("whatsappInput"),
  ];
  phoneFields.forEach((f) => {
    if (!f) return;
    // ensure mobile keyboard on supporting devices
    f.setAttribute("inputmode", "numeric");
    f.setAttribute("maxlength", "10");
    // strip any non-digit characters on input (fallback)
    f.addEventListener("input", () => {
      const cleaned = f.value.replace(/\D/g, "").slice(0, 10);
      if (f.value !== cleaned) f.value = cleaned;
    });

    // Extra guards: block non-digits on keypress/keyup
    f.addEventListener("keypress", (e) => {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
    });

    f.addEventListener("keyup", () => {
      const cleaned = f.value.replace(/\D/g, "").slice(0, 10);
      if (f.value !== cleaned) f.value = cleaned;
    });

    // Block non-digit keystrokes at keydown level (extra guard)
    f.addEventListener("keydown", (e) => {
      // Allow control keys
      const ctrlKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
        "Home",
        "End",
      ];
      if (ctrlKeys.includes(e.key)) return;
      // Allow digits only
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    });

    // Prevent non-digit characters from being inserted (better UX on mobile)
    f.addEventListener("beforeinput", (e) => {
      // some browsers provide e.data for the inserted text
      const data = e.data;
      if (data && /\D/.test(data)) {
        e.preventDefault();
      }
      // if the inputType is insertFromPaste, allow paste handler to clean
    });

    // Clean pasted content
    f.addEventListener("paste", (e) => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData("text");
      const cleaned = (text || "").replace(/\D/g, "").slice(0, 10);
      // insert cleaned content at cursor position
      const start = f.selectionStart || 0;
      const end = f.selectionEnd || 0;
      const newVal = (f.value.slice(0, start) + cleaned + f.value.slice(end))
        .replace(/\D/g, "")
        .slice(0, 10);
      f.value = newVal;
      // move caret
      const pos = Math.min(start + cleaned.length, 10);
      f.setSelectionRange(pos, pos);
      // trigger input event handlers
      const ev = new Event("input", { bubbles: true });
      f.dispatchEvent(ev);
    });
  });

  // Helpers for inline invalid state
  function markInvalid(el) {
    if (!el) return;
    el.classList.add("invalid");
    const lbl = el.parentElement && el.parentElement.querySelector("label");
    if (lbl) lbl.classList.add("invalid");
  }

  function clearInvalid(el) {
    if (!el) return;
    el.classList.remove("invalid");
    const lbl = el.parentElement && el.parentElement.querySelector("label");
    if (lbl) lbl.classList.remove("invalid");
  }

  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function isValidPhone(v) {
    return /^\d{10}$/.test(v);
  }

  const boardGrid = document.getElementById("boardGrid");
  const fullnameField = document.getElementById("fullnameInput");
  const emailField = document.getElementById("emailInput");
  const mobileField = document.getElementById("mobileInput");
  const whatsappField = document.getElementById("whatsappInput");
  const courseField = document.getElementById("courseInput");
  const deptField = document.getElementById("departmentInput");
  const semesterField = document.getElementById("semesterSelect");

  // Allowed character sets and max lengths per field
  const fieldConstraints = [
    { el: fullnameField, allowed: /[A-Za-z .'-]/, max: 60 },
    { el: courseField, allowed: /[A-Za-z0-9 &().,'-]/, max: 50 },
    { el: deptField, allowed: /[A-Za-z0-9 &().,'-]/, max: 60 },
    { el: emailField, allowed: /[A-Za-z0-9@._+-]/, max: 100 },
  ];

  fieldConstraints.forEach(({ el, allowed, max }) => {
    if (!el) return;
    el.setAttribute("maxlength", String(max));
    el.addEventListener("beforeinput", (e) => {
      const data = e.data;
      if (data && !allowed.test(data)) {
        e.preventDefault();
      }
    });
    el.addEventListener("input", () => {
      const cleaned = (el.value || "")
        .split("")
        .filter((ch) => allowed.test(ch))
        .join("")
        .slice(0, max);
      if (el.value !== cleaned) el.value = cleaned;
      clearError();
    });
  });

  // Real-time validation listeners
  if (fullnameField)
    fullnameField.addEventListener("input", () => {
      if (fullnameField.value.trim()) clearInvalid(fullnameField);
      else markInvalid(fullnameField);
      clearError();
    });

  if (emailField)
    emailField.addEventListener("input", () => {
      if (isValidEmail(emailField.value.trim())) clearInvalid(emailField);
      else if (emailField.value.trim().length) markInvalid(emailField);
      else clearInvalid(emailField);
      clearError();
    });

  [mobileField, whatsappField].forEach((f) => {
    if (!f) return;
    f.addEventListener("input", () => {
      if (isValidPhone(f.value.trim())) clearInvalid(f);
      else if (f.value.trim().length) markInvalid(f);
      else clearInvalid(f);
      clearError();
    });
  });

  if (courseField)
    courseField.addEventListener("input", () => {
      if (courseField.value.trim()) clearInvalid(courseField);
      else markInvalid(courseField);
      clearError();
    });

  if (deptField)
    deptField.addEventListener("input", () => {
      if (deptField.value.trim()) clearInvalid(deptField);
      else markInvalid(deptField);
      clearError();
    });

  if (semesterField)
    semesterField.addEventListener("change", () => {
      if (semesterField.value) clearInvalid(semesterField);
      else markInvalid(semesterField);
      clearError();
    });

  // Board checkbox listener
  document.querySelectorAll('input[name="boards[]"]').forEach((cb) => {
    cb.addEventListener("change", () => {
      if (
        document.querySelectorAll('input[name="boards[]"]:checked').length > 0
      ) {
        if (boardGrid) boardGrid.classList.remove("invalid");
        clearError();
      }
    });
  });

  function showError(message, el) {
    if (errorBox) {
      errorBox.style.display = "block";
      errorBox.textContent = message;
    }
    if (el) {
      // mark invalid on the element and focus if possible
      if (el.classList) el.classList.add("invalid");
      if (el.focus && typeof el.focus === "function") el.focus();
    }
    // if message relates to boards selection, highlight board grid
    if (message && message.toLowerCase().includes("board")) {
      if (boardGrid) boardGrid.classList.add("invalid");
    }
  }

  function clearError() {
    if (errorBox) {
      errorBox.style.display = "none";
      errorBox.textContent = "";
    }
    // remove invalid classes from inputs and labels
    form
      .querySelectorAll(".invalid")
      .forEach((el) => el.classList.remove("invalid"));
    if (boardGrid) boardGrid.classList.remove("invalid");
  }

  form.addEventListener("submit", function (e) {
    clearError();

    const fullname = document.getElementById("fullnameInput");
    const email = document.getElementById("emailInput");
    const mobile = document.getElementById("mobileInput");
    const whatsapp = document.getElementById("whatsappInput");
    const course = document.getElementById("courseInput");
    const department = document.getElementById("departmentInput");
    const semester = document.getElementById("semesterSelect");
    const boards = document.querySelectorAll('input[name="boards[]"]:checked');

    // basic checks
    if (!fullname || !fullname.value.trim()) {
      e.preventDefault();
      showError("Please enter your full name.", fullname);
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      e.preventDefault();
      showError("Please enter a valid university email address.", email);
      return;
    }

    const phonePattern = /^\d{10}$/;
    if (!mobile || !phonePattern.test(mobile.value.trim())) {
      e.preventDefault();
      showError("Please enter a valid 10-digit mobile number.", mobile);
      return;
    }

    if (!whatsapp || !phonePattern.test(whatsapp.value.trim())) {
      e.preventDefault();
      showError("Please enter a valid 10-digit WhatsApp number.", whatsapp);
      return;
    }

    if (!course || !course.value.trim()) {
      e.preventDefault();
      showError("Please enter your course.", course);
      return;
    }

    if (!department || !department.value.trim()) {
      e.preventDefault();
      showError("Please enter your department.", department);
      return;
    }

    if (!semester || !semester.value) {
      e.preventDefault();
      showError("Please select your current semester.", semester);
      return;
    }

    if (!boards || boards.length === 0) {
      e.preventDefault();
      showError("Please select at least one board to audition for.");
      return;
    }

    // If we reach here, allow submission to continue
  });
}

// ===================================
// FORM LOGIC - SINGLE PAGE FORM
// ===================================
function initFormLogic() {
  const form = document.getElementById("registrationForm");
  const successMessage = document.getElementById("successMessage");
  const mobileInput = document.querySelector('input[name="mobile"]');
  const whatsappInput = document.getElementById("whatsappInput");
  const sameAsPhoneCheckbox = document.getElementById("sameAsPhone");

  // Helper to manage floating labels when field has content
  function updateFilledState(el) {
    if (!el) return;
    const hasValue = (el.value || "").toString().trim().length > 0;
    if (hasValue) {
      el.classList.add("filled");
      const grp = el.closest(".input-group");
      if (grp) grp.classList.add("filled");
    } else {
      el.classList.remove("filled");
      const grp = el.closest(".input-group");
      if (grp) grp.classList.remove("filled");
    }
  }

  // Attach listeners to inputs, textareas and selects to toggle .filled
  Array.from(
    form.querySelectorAll(
      ".input-group input, .input-group textarea, .input-group select"
    )
  ).forEach((el) => {
    // initialize state
    updateFilledState(el);
    // update on input/change/blur
    el.addEventListener("input", () => updateFilledState(el));
    el.addEventListener("change", () => updateFilledState(el));
    el.addEventListener("blur", () => updateFilledState(el));
  });

  const boardGrid = document.getElementById("boardGrid");

  // Create a small helper to render inline error text like Bootstrap's invalid feedback
  function ensureErrorElement(input) {
    if (!input) return null;
    const parent = input.closest(".input-group") || input.parentElement;
    if (!parent) return null;
    let errorEl = parent.querySelector(".field-error");
    if (!errorEl) {
      errorEl = document.createElement("div");
      errorEl.className = "field-error";
      parent.appendChild(errorEl);
    }
    return errorEl;
  }

  function setFieldError(input, message) {
    const errorEl = ensureErrorElement(input);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = "block";
    }
    if (input) input.classList.add("invalid");
  }

  function clearFieldError(input) {
    if (!input) return;
    const parent = input.closest(".input-group") || input.parentElement;
    const errorEl = parent && parent.querySelector(".field-error");
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.style.display = "none";
    }
    input.classList.remove("invalid");
  }

  // Board specific inline error
  const boardErrorEl = (() => {
    if (!boardGrid) return null;
    let el = boardGrid.parentElement.querySelector(".field-error");
    if (!el) {
      el = document.createElement("div");
      el.className = "field-error";
      boardGrid.insertAdjacentElement("afterend", el);
    }
    return el;
  })();

  function setBoardError(message) {
    if (boardErrorEl) {
      boardErrorEl.textContent = message;
      boardErrorEl.style.display = "block";
    }
    if (boardGrid) boardGrid.classList.add("invalid");
  }

  function clearBoardError() {
    if (boardErrorEl) {
      boardErrorEl.textContent = "";
      boardErrorEl.style.display = "none";
    }
    if (boardGrid) boardGrid.classList.remove("invalid");
  }

  // Clear board error inline when a choice is made
  const boardCheckboxes = form.querySelectorAll(
    'input[type="checkbox"].board-checkbox'
  );
  boardCheckboxes.forEach((cb) => {
    cb.addEventListener("change", () => {
      const anyChecked = Array.from(boardCheckboxes).some((c) => c.checked);
      if (anyChecked) clearBoardError();
    });
  });

  // Auto-fill WhatsApp number when checkbox is checked
  if (sameAsPhoneCheckbox && mobileInput && whatsappInput) {
    sameAsPhoneCheckbox.addEventListener("change", function () {
      if (this.checked) {
        whatsappInput.value = mobileInput.value;
        whatsappInput.disabled = true;
      } else {
        whatsappInput.disabled = false;
      }
      // Ensure label floats properly even when input is disabled
      updateFilledState(whatsappInput);
    });

    // Also update WhatsApp when mobile number changes (if checkbox is checked)
    mobileInput.addEventListener("input", function () {
      if (sameAsPhoneCheckbox.checked) {
        whatsappInput.value = this.value;
        updateFilledState(whatsappInput);
      }
      updateFilledState(mobileInput);
    });
  }

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
      submitForm();
    }
  });

  function validateForm() {
    const inputs = form.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );
    let isValid = true;
    const errorMessages = [];

    inputs.forEach((input) => {
      const label = input.parentElement.querySelector("label");
      const fieldName = label
        ? label.textContent.replace("*", "").trim()
        : "This field";

      clearFieldError(input);

      if (!input.value.trim() && input.type !== "checkbox") {
        isValid = false;
        highlightError(input, `${fieldName} is required.`);
        errorMessages.push(`${fieldName} is required.`);
        return;
      }

      // Validate email
      if (input.type === "email" && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          isValid = false;
          highlightError(input, "Please enter a valid email address.");
          errorMessages.push("Please enter a valid email address.");
        }
      }

      // Validate phone numbers
      if (input.type === "tel" && input.value) {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(input.value)) {
          isValid = false;
          highlightError(input, "Phone numbers must be 10 digits.");
          errorMessages.push("Phone numbers must be 10 digits.");
        }
      }
    });

    // Check if at least one board is selected
    const checkboxes = form.querySelectorAll(
      'input[type="checkbox"].board-checkbox'
    );
    const isAnyChecked = Array.from(checkboxes).some((cb) => cb.checked);

    clearBoardError();
    if (!isAnyChecked) {
      isValid = false;
      setBoardError("Please select at least one board.");
      errorMessages.push("Please select at least one board.");
    }

    // Show error messages if any
    const errorDiv = document.getElementById("formError");
    if (!isValid && errorDiv) {
      errorDiv.innerHTML = errorMessages
        .map((e) => `<div>• ${e}</div>`)
        .join("");
      errorDiv.style.display = "block";
    } else if (errorDiv) {
      errorDiv.innerHTML = "";
      errorDiv.style.display = "none";
    }

    return isValid;
  }

  function highlightError(input, message) {
    if (!input) return;
    input.style.borderBottomColor = "#ff6b6b";
    input.classList.add("invalid");
    if (message) setFieldError(input, message);
    const onInput = () => {
      removeError(input);
      input.removeEventListener("input", onInput);
    };
    input.addEventListener("input", onInput);
  }

  function removeError(input) {
    if (!input) return;
    input.style.borderBottomColor = "";
    clearFieldError(input);
  }

  // No longer use alert, errors are shown inline
  function showError(message) {
    const errorDiv = document.getElementById("formError");
    if (errorDiv) {
      errorDiv.innerHTML = `<div>• ${message}</div>`;
      errorDiv.style.display = "block";
    }
  }

  function submitForm() {
    // Hide error message
    const errorDiv = document.getElementById("formError");
    if (errorDiv) {
      errorDiv.innerHTML = "";
      errorDiv.style.display = "none";
    }
    // Redirect to confirmation page
    window.location.href = "confirmation.html";
  }

  function createConfetti() {
    // Simple confetti animation
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${
                  ["#d4af37", "#a5d6a7", "#cc5500"][
                    Math.floor(Math.random() * 3)
                  ]
                };
                left: ${Math.random() * 100}%;
                top: -10px;
                opacity: ${Math.random()};
                transform: rotate(${Math.random() * 360}deg);
                pointer-events: none;
                z-index: 10000;
            `;
      document.body.appendChild(confetti);

      confetti.animate(
        [
          { transform: "translateY(0) rotate(0deg)", opacity: 1 },
          {
            transform: `translateY(${window.innerHeight + 10}px) rotate(${
              Math.random() * 720
            }deg)`,
            opacity: 0,
          },
        ],
        {
          duration: Math.random() * 2000 + 3000,
          easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }
      );

      setTimeout(() => confetti.remove(), 5000);
    }
  }

  function showSection(index) {
    // Hide all sections
    sections.forEach((section) => {
      section.classList.remove("active");
    });

    // Show current section
    sections[index].classList.add("active");

    // Update progress steps
    updateProgressSteps(index);

    // Update button visibility
    updateButtons(index);

    // Scroll to top of form
    document.querySelector(".form-container").scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  function updateProgressSteps(index) {
    progressSteps.forEach((step, i) => {
      if (i < index) {
        step.classList.add("completed");
        step.classList.remove("active");
      } else if (i === index) {
        step.classList.add("active");
        step.classList.remove("completed");
      } else {
        step.classList.remove("active", "completed");
      }
    });
  }

  function updateButtons(index) {
    // Previous button
    if (index === 0) {
      prevBtn.style.display = "none";
    } else {
      prevBtn.style.display = "flex";
    }

    // Next/Submit button
    if (index === sections.length - 1) {
      nextBtn.style.display = "none";
      submitBtn.style.display = "flex";
    } else {
      nextBtn.style.display = "flex";
      submitBtn.style.display = "none";
    }
  }

  function validateSection(index) {
    const section = sections[index];
    const inputs = section.querySelectorAll(
      "input[required], select[required]"
    );
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
        highlightError(input);
      } else {
        removeError(input);
      }

      // Validate email
      if (input.type === "email" && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          isValid = false;
          highlightError(input);
        }
      }

      // Validate phone numbers
      if (input.type === "tel" && input.value) {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(input.value)) {
          isValid = false;
          highlightError(input);
        }
      }
    });

    // For board selection section, check if at least one board is selected
    if (index === 3) {
      const checkboxes = section.querySelectorAll('input[type="checkbox"]');
      const isAnyChecked = Array.from(checkboxes).some((cb) => cb.checked);

      if (!isAnyChecked) {
        isValid = false;
        showError("Please select at least one board");
      }
    }

    return isValid;
  }

  function validateForm() {
    // Validate all sections
    for (let i = 0; i < sections.length; i++) {
      if (!validateSection(i)) {
        currentSection = i;
        showSection(i);
        return false;
      }
    }
    return true;
  }

  function highlightError(input) {
    input.style.borderBottom = "2px solid #cc5500";
    input.style.animation = "shake 0.5s";

    setTimeout(() => {
      input.style.animation = "";
    }, 500);
  }

  function removeError(input) {
    input.style.borderBottom = "";
  }

  function showError(message) {
    // Create temporary error message
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #cc5500, #8b2e1f);
            color: #f4f1de;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
            font-family: var(--font-philosopher);
        `;
    errorDiv.textContent = message;

    document.body.appendChild(errorDiv);

    setTimeout(() => {
      errorDiv.style.animation = "slideOutRight 0.5s ease-out";
      setTimeout(() => {
        errorDiv.remove();
      }, 500);
    }, 3000);
  }

  function animateTransition(direction) {
    const activeSection = document.querySelector(".form-section.active");

    if (direction === "next") {
      activeSection.style.animation = "slideInRight 0.5s ease-out";
    } else {
      activeSection.style.animation = "slideInLeft 0.5s ease-out";
    }

    setTimeout(() => {
      activeSection.style.animation = "";
    }, 500);
  }

  function submitForm() {
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<span class="btn-text">Submitting...</span> <span class="btn-icon"><i class="fas fa-spinner fa-spin"></i></span>';

    // Simulate form submission (in production, this would be actual PHP processing)
    setTimeout(() => {
      // Hide form
      form.style.display = "none";

      // Show success message
      const successMessage = document.getElementById("successMessage");
      successMessage.classList.add("show");

      // Trigger confetti effect
      createConfetti();

      // Reset button
      submitBtn.disabled = false;
      submitBtn.innerHTML =
        '<span class="btn-text">Submit Application</span> <span class="btn-icon"><i class="fas fa-paper-plane"></i></span>';

      // In production, uncomment the line below to actually submit the form
      // form.submit();
    }, 2000);
  }

  function createConfetti() {
    // Simple confetti effect using particles
    const colors = ["#c68642", "#4a7c2c", "#8f9779", "#cc5500", "#d4a574"];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${
                  colors[Math.floor(Math.random() * colors.length)]
                };
                top: -10px;
                left: ${Math.random() * 100}%;
                opacity: 1;
                transform: rotate(${Math.random() * 360}deg);
                z-index: 10000;
                pointer-events: none;
            `;

      document.body.appendChild(confetti);

      // Animate confetti
      const duration = 2000 + Math.random() * 1000;
      const targetY = window.innerHeight + 50;
      const targetX = confetti.offsetLeft + (Math.random() - 0.5) * 200;

      confetti.animate(
        [
          {
            transform: `translate(0, 0) rotate(0deg)`,
            opacity: 1,
          },
          {
            transform: `translate(${
              targetX - confetti.offsetLeft
            }px, ${targetY}px) rotate(${Math.random() * 720}deg)`,
            opacity: 0,
          },
        ],
        {
          duration: duration,
          easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }
      ).onfinish = () => {
        confetti.remove();
      };
    }
  }
}

// ===================================
// PROGRESS BAR TRACKING
// ===================================
function initProgressTracking() {
  const form = document.getElementById("registrationForm");
  const progressFill = document.getElementById("progressFill");
  // If form or progress element are missing, skip progress tracking
  if (!form || !progressFill) return;

  // Update progress based on form completion
  form.addEventListener("input", updateProgress);

  function updateProgress() {
    const inputs = form.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');

    let totalFields = inputs.length;
    let filledFields = 0;

    // Count filled required fields
    inputs.forEach((input) => {
      if (input.value.trim()) {
        filledFields++;
      }
    });

    // Check if at least one checkbox is selected
    const isAnyChecked = Array.from(checkboxes).some((cb) => cb.checked);
    if (isAnyChecked) {
      filledFields++;
      totalFields++;
    } else if (checkboxes.length > 0) {
      totalFields++;
    }

    const progress = totalFields === 0 ? 0 : (filledFields / totalFields) * 100;
    if (progressFill) progressFill.style.width = progress + "%";
  }
}

// ===================================
// GSAP ANIMATIONS
// ===================================
if (typeof gsap !== "undefined") {
  // Animate tribal patterns
  gsap.to(".tribal-pattern", {
    rotation: 360,
    duration: 30,
    repeat: -1,
    ease: "none",
  });

  // Animate section icons on scroll
  const sectionIcons = document.querySelectorAll(".section-icon");
  sectionIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      gsap.to(icon, {
        scale: 1.2,
        rotation: 15,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    });

    icon.addEventListener("mouseleave", () => {
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    });
  });

  // Animate form inputs on focus
  const inputs = document.querySelectorAll("input, select");
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      const wrapper = input.closest(".input-wrapper, .select-wrapper");
      if (wrapper) {
        gsap.to(wrapper, {
          scale: 1.02,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    });

    input.addEventListener("blur", () => {
      const wrapper = input.closest(".input-wrapper, .select-wrapper");
      if (wrapper) {
        gsap.to(wrapper, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    });
  });
}

// ===================================
// SMOOTH SCROLL FOR NAVIGATION
// ===================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ===================================

// ===================================
// ADD CSS ANIMATIONS DYNAMICALLY
// ===================================
const style = document.createElement("style");
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes slideInLeft {
        from {
            transform: translateX(-50px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// CONSOLE EASTER EGG
// ===================================
console.log(
  "%c🌿 UDAAN Season 12 🌿",
  "font-size: 20px; color: #c68642; font-weight: bold;"
);
console.log(
  "%cTheme: The Significance of Tribes in Wildlife and Forest Conservation",
  "font-size: 14px; color: #4a7c2c; font-style: italic;"
);
console.log(
  "%cJoin our tribe and make a difference! 🍃",
  "font-size: 12px; color: #8f9779;"
);

// ===================================
// COUNTDOWN TIMER INITIALIZATION
// ===================================
function initCountdownTimer() {
  // Set registration close date - Change this to your desired deadline
  // Format: new Date('YYYY-MM-DD HH:mm:ss')
  const registrationDeadline = new Date("2026-02-15 23:59:59").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = registrationDeadline - now;

    if (distance < 0) {
      // Countdown finished
      document.getElementById("days").textContent = "00";
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      document.getElementById("seconds").textContent = "00";

      // Optional: Change label to indicate registration closed
      const label = document.querySelector(".countdown-label");
      if (label) label.textContent = "Registrations Closed";
      return;
    }

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM
    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(
      2,
      "0"
    );
    document.getElementById("minutes").textContent = String(minutes).padStart(
      2,
      "0"
    );
    document.getElementById("seconds").textContent = String(seconds).padStart(
      2,
      "0"
    );
  }

  // Initial update
  updateCountdown();

  // Update every second
  setInterval(updateCountdown, 1000);
}

// ===================================
// HERO SUBTITLE TYPING
// ===================================
function initHeroTyping() {
  const el = document.getElementById("heroSubtitle");
  if (!el) return;

  const text = el.textContent.trim();
  el.textContent = "";

  // Delay slightly to ensure external libs initialize and element is painted
  setTimeout(() => {
    // Prefer TypeIt if available
    if (typeof TypeIt !== "undefined") {
      new TypeIt("#heroSubtitle", {
        strings: text,
        speed: 70,
        cursor: true,
        waitUntilVisible: true,
        lifeLike: true,
        breakLines: false,
        afterComplete: function (instance) {
          instance.destroy();
        },
      }).go();
      return;
    }

    // Fallback to Typed.js if available
    if (typeof Typed !== "undefined") {
      new Typed("#heroSubtitle", {
        strings: [text],
        typeSpeed: 70,
        showCursor: true,
        onComplete: function () {
          // Keep the final text
        },
      });
      return;
    }

    // Final fallback - simple manual typer
    let i = 0;
    const speed = 70;
    const interval = setInterval(() => {
      el.textContent += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
  }, 150);
}

// Initialize tribal loader (preloader)
function initTribalLoader() {
  // Hide loader shortly after window load to ensure assets are ready
  window.addEventListener("load", () => {
    const loader = document.getElementById("tribal-loader");
    if (!loader) return;
    // give a short grace period then hide
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 1400);
  });
}

// ===================================
// BOARD SELECTION TOGGLE FUNCTION
// ===================================
function toggleBoard(card) {
  const checkbox = card.querySelector('input[type="checkbox"]');

  // Wait for event propagation
  setTimeout(() => {
    if (checkbox.checked) {
      card.classList.add("selected");
    } else {
      card.classList.remove("selected");
    }
  }, 10);
}
