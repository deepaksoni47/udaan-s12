

document.addEventListener("DOMContentLoaded", function () {
  initParticles();
  initTribalLoader();
  initAOS();
  initTyped();
  initTilt();
  initCountdownTimer();
  initHeroTyping();
  
  if (document.getElementById("registrationForm")) {
    initFormLogic();
    initProgressTracking();
  }
  initSoundToggle();
});

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

function initTyped() {
  if (typeof Typed !== "undefined") {
    new Typed(".typed-text", {
      strings: ["UDAAN", "à¤‰à¤¡à¤¼à¤¾à¤¨", "UDAAN"],
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

function initTilt() {
  
  const isMobileDevice = () => {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth <= 768
    );
  };

  
  const supportsHover = () =>
    window.matchMedia &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (typeof VanillaTilt !== "undefined") {
    
    if (supportsHover()) {
      
      VanillaTilt.init(document.querySelectorAll(".theme-card"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
        perspective: 1000,
      });

      
      VanillaTilt.init(document.querySelectorAll(".board-card"), {
        max: 8,
        speed: 300,
        glare: true,
        "max-glare": 0.2,
        perspective: 800,
      });

      
      VanillaTilt.init(document.querySelectorAll(".form-container"), {
        max: 2,
        speed: 400,
        glare: true,
        "max-glare": 0.1,
        perspective: 1000,
      });
    } else {
      
      document.querySelectorAll("[data-tilt]").forEach((el) => {
        el.removeAttribute("data-tilt");
        el.removeAttribute("data-tilt-glare");
        el.removeAttribute("data-tilt-max");
        el.removeAttribute("data-tilt-speed");
      });
      
    }
  }
}

function initSoundToggle() {
  const soundToggle = document.getElementById("soundToggle");
  let isMuted = true;

  
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

    
    soundToggle.style.animation = "none";
    setTimeout(() => {
      soundToggle.style.animation = "";
    }, 10);
  });

  
  soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
  soundToggle.classList.add("muted");

  function playAmbientSound() {
    
    try {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }

      
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      
      const masterGain = audioContext.createGain();
      masterGain.gain.setValueAtTime(0.2, audioContext.currentTime);
      masterGain.connect(audioContext.destination);

      
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

      
      const noiseFilter = audioContext.createBiquadFilter();
      noiseFilter.type = "lowpass";
      noiseFilter.frequency.setValueAtTime(2000, audioContext.currentTime);

      const noiseGain = audioContext.createGain();
      noiseGain.gain.setValueAtTime(0.08, audioContext.currentTime);

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      noiseSource.start();

      
      const deepOsc = audioContext.createOscillator();
      deepOsc.type = "sine";
      deepOsc.frequency.setValueAtTime(50, audioContext.currentTime);

      const deepGain = audioContext.createGain();
      deepGain.gain.setValueAtTime(0.05, audioContext.currentTime);

      deepOsc.connect(deepGain);
      deepGain.connect(masterGain);
      deepOsc.start();

      
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

      
      const swell = audioContext.createOscillator();
      const swellGain = audioContext.createGain();

      swell.frequency.setValueAtTime(0.3, audioContext.currentTime); 
      swellGain.gain.setValueAtTime(0.02, audioContext.currentTime);

      swell.connect(swellGain);
      swellGain.connect(masterGain.gain);
      swell.start();

      
      window.audioOscillators = [noiseSource, deepOsc, swell];
    } catch (e) {
      console.log("Web Audio API not supported", e);
    }
  }

  function stopAmbientSound() {
    
    if (window.audioOscillators) {
      window.audioOscillators.forEach((osc) => {
        try {
          osc.stop();
        } catch (e) {
          
        }
      });
      window.audioOscillators = null;
    }

    if (oscillator) {
      try {
        oscillator.stop();
      } catch (e) {
        
      }
      oscillator = null;
    }
  }
}

function initFormLogic() {
  const form = document.getElementById("registrationForm");
  const errorBox = document.getElementById("formError");
  if (!form) return;

  
  form.setAttribute("novalidate", "true");

  
  const phoneFields = [
    document.getElementById("mobileInput"),
    document.getElementById("whatsappInput"),
  ];
  phoneFields.forEach((f) => {
    if (!f) return;
    
    f.setAttribute("inputmode", "numeric");
    f.setAttribute("maxlength", "10");
    
    f.addEventListener("input", () => {
      const cleaned = f.value.replace(/\D/g, "").slice(0, 10);
      if (f.value !== cleaned) f.value = cleaned;
    });

    
    f.addEventListener("keypress", (e) => {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
    });

    f.addEventListener("keyup", () => {
      const cleaned = f.value.replace(/\D/g, "").slice(0, 10);
      if (f.value !== cleaned) f.value = cleaned;
    });

    
    f.addEventListener("keydown", (e) => {
      
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
      
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    });

    
    f.addEventListener("beforeinput", (e) => {
      
      const data = e.data;
      if (data && /\D/.test(data)) {
        e.preventDefault();
      }
      
    });

    
    f.addEventListener("paste", (e) => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData("text");
      const cleaned = (text || "").replace(/\D/g, "").slice(0, 10);
      
      const start = f.selectionStart || 0;
      const end = f.selectionEnd || 0;
      const newVal = (f.value.slice(0, start) + cleaned + f.value.slice(end))
        .replace(/\D/g, "")
        .slice(0, 10);
      f.value = newVal;
      
      const pos = Math.min(start + cleaned.length, 10);
      f.setSelectionRange(pos, pos);
      
      const ev = new Event("input", { bubbles: true });
      f.dispatchEvent(ev);
    });
  });

  
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
      
      if (el.classList) el.classList.add("invalid");
      if (el.focus && typeof el.focus === "function") el.focus();
    }
    
    if (message && message.toLowerCase().includes("board")) {
      if (boardGrid) boardGrid.classList.add("invalid");
    }
  }

  function clearError() {
    if (errorBox) {
      errorBox.style.display = "none";
      errorBox.textContent = "";
    }
    
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

    
  });
}

function initFormLogic() {
  const form = document.getElementById("registrationForm");
  const successMessage = document.getElementById("successMessage");
  const mobileInput = document.querySelector('input[name="mobile"]');
  const whatsappInput = document.getElementById("whatsappInput");
  const sameAsPhoneCheckbox = document.getElementById("sameAsPhone");

  
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

  
  Array.from(
    form.querySelectorAll(
      ".input-group input, .input-group textarea, .input-group select"
    )
  ).forEach((el) => {
    
    updateFilledState(el);
    
    el.addEventListener("input", () => updateFilledState(el));
    el.addEventListener("change", () => updateFilledState(el));
    el.addEventListener("blur", () => updateFilledState(el));
  });

  const boardGrid = document.getElementById("boardGrid");

  
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

  
  const boardCheckboxes = form.querySelectorAll(
    'input[type="checkbox"].board-checkbox'
  );
  boardCheckboxes.forEach((cb) => {
    cb.addEventListener("change", () => {
      const anyChecked = Array.from(boardCheckboxes).some((c) => c.checked);
      if (anyChecked) clearBoardError();
    });
  });

  
  (function setupLiveValidation() {
    const fullnameInput = document.getElementById("fullnameInput");
    const emailInput = document.getElementById("emailInput");
    const mobileInputLocal = document.getElementById("mobileInput");
    const whatsappInputLocal = document.getElementById("whatsappInput");
    const courseInput = document.getElementById("courseInput");
    const deptInput = document.getElementById("departmentInput");
    const semesterSelect = document.getElementById("semesterSelect");

    function validateEmailVal(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }
    function validatePhoneVal(v) {
      return /^\d{10}$/.test(v);
    }

    if (fullnameInput) {
      fullnameInput.addEventListener("input", () => {
        if (fullnameInput.value.trim()) clearFieldError(fullnameInput);
        else setFieldError(fullnameInput, "Full name is required.");
      });
      fullnameInput.addEventListener("blur", () => {
        if (!fullnameInput.value.trim())
          setFieldError(fullnameInput, "Full name is required.");
      });
    }

    if (emailInput) {
      emailInput.addEventListener("input", () => {
        const v = emailInput.value.trim();
        if (!v) {
          clearFieldError(emailInput);
        } else if (!validateEmailVal(v)) {
          setFieldError(emailInput, "Please enter a valid email address.");
        } else {
          clearFieldError(emailInput);
        }
      });
      emailInput.addEventListener("blur", () => {
        const v = emailInput.value.trim();
        if (v && !validateEmailVal(v))
          setFieldError(emailInput, "Please enter a valid email address.");
      });
    }

    if (mobileInputLocal) {
      mobileInputLocal.addEventListener("input", () => {
        const v = mobileInputLocal.value.replace(/\D/g, "").trim();
        if (!v) clearFieldError(mobileInputLocal);
        else if (!/^\d{10}$/.test(v))
          setFieldError(mobileInputLocal, "Mobile number must be 10 digits.");
        else clearFieldError(mobileInputLocal);
      });
    }

    if (whatsappInputLocal) {
      whatsappInputLocal.addEventListener("input", () => {
        const v = whatsappInputLocal.value.replace(/\D/g, "").trim();
        if (!v) clearFieldError(whatsappInputLocal);
        else if (!/^\d{10}$/.test(v))
          setFieldError(
            whatsappInputLocal,
            "WhatsApp number must be 10 digits."
          );
        else clearFieldError(whatsappInputLocal);
      });
    }

    if (courseInput) {
      courseInput.addEventListener("input", () => {
        if (courseInput.value.trim()) clearFieldError(courseInput);
        else setFieldError(courseInput, "Please enter your course.");
      });
    }

    if (deptInput) {
      deptInput.addEventListener("input", () => {
        if (deptInput.value.trim()) clearFieldError(deptInput);
        else setFieldError(deptInput, "Please enter your department.");
      });
    }

    if (semesterSelect) {
      semesterSelect.addEventListener("change", () => {
        if (semesterSelect.value) clearFieldError(semesterSelect);
        else
          setFieldError(semesterSelect, "Please select your current semester.");
      });
    }
  })();

  
  if (sameAsPhoneCheckbox && mobileInput && whatsappInput) {
    sameAsPhoneCheckbox.addEventListener("change", function () {
      if (this.checked) {
        whatsappInput.value = mobileInput.value;
        whatsappInput.disabled = true;
      } else {
        whatsappInput.disabled = false;
      }
      
      updateFilledState(whatsappInput);
    });

    
    mobileInput.addEventListener("input", function () {
      if (sameAsPhoneCheckbox.checked) {
        whatsappInput.value = this.value;
        updateFilledState(whatsappInput);
      }
      updateFilledState(mobileInput);
    });
  }

  
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

      
      if (input.type === "email" && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          isValid = false;
          highlightError(input, "Please enter a valid email address.");
          errorMessages.push("Please enter a valid email address.");
        }
      }

      
      if (input.type === "tel" && input.value) {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(input.value)) {
          isValid = false;
          highlightError(input, "Phone numbers must be 10 digits.");
          errorMessages.push("Phone numbers must be 10 digits.");
        }
      }
    });

    
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

    
    const errorDiv = document.getElementById("formError");
    if (!isValid && errorDiv) {
      errorDiv.innerHTML = errorMessages
        .map((e) => `<div>â€¢ ${e}</div>`)
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

  
  function showError(message) {
    const errorDiv = document.getElementById("formError");
    if (errorDiv) {
      errorDiv.innerHTML = `<div>â€¢ ${message}</div>`;
      errorDiv.style.display = "block";
    }
  }

  function submitForm() {
    
    const errorDiv = document.getElementById("formError");
    if (errorDiv) {
      errorDiv.innerHTML = "";
      errorDiv.style.display = "none";
    }

    
    const modal = document.getElementById("previewModal");
    if (!modal) {
      
      window.location.href = "confirmation.html";
      return;
    }

    const getVal = (id) =>
      document.getElementById(id)
        ? document.getElementById(id).value.trim()
        : "";

    const fullname = getVal("fullnameInput");
    const email = getVal("emailInput");
    const mobile = getVal("mobileInput");
    const whatsapp = getVal("whatsappInput");
    const course = getVal("courseInput");
    const department = getVal("departmentInput");
    const semester = getVal("semesterSelect");
    const additional = getVal("additionalSkillsInput");
    const hobbies = getVal("hobbiesInput");
    const boards = Array.from(
      document.querySelectorAll('input[name="boards[]"]:checked')
    ).map((b) => b.value);

    const previewContent = modal.querySelector(".preview-content");

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    previewContent.innerHTML = `
      <div class="preview-row"><strong>Full Name</strong><span>${escapeHtml(
        fullname
      )}</span></div>
      <div class="preview-row"><strong>Email</strong><span>${escapeHtml(
        email
      )}</span></div>
      <div class="preview-row"><strong>Mobile</strong><span>${escapeHtml(
        mobile
      )}</span></div>
      <div class="preview-row"><strong>WhatsApp</strong><span>${escapeHtml(
        whatsapp
      )}</span></div>
      <div class="preview-row"><strong>Course</strong><span>${escapeHtml(
        course
      )}</span></div>
      <div class="preview-row"><strong>Department</strong><span>${escapeHtml(
        department
      )}</span></div>
      <div class="preview-row"><strong>Semester</strong><span>${escapeHtml(
        semester
      )}</span></div>
      <div class="preview-row"><strong>Boards</strong><span>${escapeHtml(
        boards.join(", ")
      )}</span></div>
      <div class="preview-row"><strong>Additional Skills</strong><span>${escapeHtml(
        additional
      )}</span></div>
      <div class="preview-row"><strong>Hobbies</strong><span>${escapeHtml(
        hobbies
      )}</span></div>
    `;

    
    
    let _previousFocus = null;
    openPreviewModal(modal);

    
    const editBtn = document.getElementById("previewEdit");
    const confirmBtn = document.getElementById("previewConfirm");
    const closeBtn = document.getElementById("previewClose");

    
    if (!confirmBtn.dataset.bound) {
      confirmBtn.dataset.bound = "1";
      confirmBtn.addEventListener("click", function () {
        confirmBtn.disabled = true;
        confirmBtn.textContent = "Submitting...";
        
        createConfetti();
        setTimeout(() => {
          
          window.location.href = "confirmation.html";
        }, 900);
      });
    }

    if (!editBtn.dataset.bound) {
      editBtn.dataset.bound = "1";
      editBtn.addEventListener("click", function () {
        closePreviewModal(modal);
        
        const firstField = document.getElementById("fullnameInput");
        if (firstField) firstField.focus();
      });
    }

    if (!closeBtn.dataset.bound) {
      closeBtn.dataset.bound = "1";
      closeBtn.addEventListener("click", function () {
        closePreviewModal(modal);
      });
    }

    
    if (!modal.dataset.overlayBound) {
      modal.dataset.overlayBound = "1";
      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          closePreviewModal(modal);
        }
      });

      
      document.addEventListener("keydown", function onEsc(e) {
        if (e.key === "Escape" && modal.classList.contains("open")) {
          closePreviewModal(modal);
        }
      });
    }

    
    function openPreviewModal(m) {
      _previousFocus = document.activeElement;
      m.classList.add("open");
      m.setAttribute("aria-hidden", "false");
      
      const firstAction =
        m.querySelector("#previewEdit") || m.querySelector("#previewConfirm");
      if (firstAction) firstAction.focus();
      
      document.body.style.overflow = "hidden";
    }

    function closePreviewModal(m) {
      m.classList.remove("open");
      m.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (_previousFocus && typeof _previousFocus.focus === "function")
        _previousFocus.focus();
    }
  }

  function createConfetti() {
    
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

  
}

function initProgressTracking() {
  const form = document.getElementById("registrationForm");
  const progressFill = document.getElementById("progressFill");
  
  if (!form || !progressFill) return;

  
  form.addEventListener("input", updateProgress);

  function updateProgress() {
    const inputs = form.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');

    let totalFields = inputs.length;
    let filledFields = 0;

    
    inputs.forEach((input) => {
      if (input.value.trim()) {
        filledFields++;
      }
    });

    
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

if (typeof gsap !== "undefined") {
  
  gsap.to(".tribal-pattern", {
    rotation: 360,
    duration: 30,
    repeat: -1,
    ease: "none",
  });

  
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

console.log(
  "%cðŸŒ¿ UDAAN Season 12 ðŸŒ¿",
  "font-size: 20px; color: #c68642; font-weight: bold;"
);
console.log(
  "%cTheme: The Significance of Tribes in Wildlife and Forest Conservation",
  "font-size: 14px; color: #4a7c2c; font-style: italic;"
);
console.log(
  "%cJoin our tribe and make a difference! ðŸƒ",
  "font-size: 12px; color: #8f9779;"
);

function initCountdownTimer() {
  
  
  const registrationDeadline = new Date("2026-01-31 23:59:59").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = registrationDeadline - now;

    if (distance < 0) {
      
      document.getElementById("days").textContent = "00";
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      document.getElementById("seconds").textContent = "00";

      
      const label = document.querySelector(".countdown-label");
      if (label) label.textContent = "Registrations Closed";
      return;
    }

    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    
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

  
  updateCountdown();

  
  setInterval(updateCountdown, 1000);
}

function initHeroTyping() {
  const el = document.getElementById("heroSubtitle");
  if (!el) return;

  const text = el.textContent.trim();
  el.textContent = "";

  
  setTimeout(() => {
    
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

    
    if (typeof Typed !== "undefined") {
      new Typed("#heroSubtitle", {
        strings: [text],
        typeSpeed: 70,
        showCursor: true,
        onComplete: function () {
          
        },
      });
      return;
    }

    
    let i = 0;
    const speed = 70;
    const interval = setInterval(() => {
      el.textContent += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
  }, 150);
}

function initTribalLoader() {
  
  window.addEventListener("load", () => {
    const loader = document.getElementById("tribal-loader");
    if (!loader) return;
    
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 1400);
  });
}

function toggleBoard(card) {
  const checkbox = card.querySelector('input[type="checkbox"]');

  
  setTimeout(() => {
    if (checkbox.checked) {
      card.classList.add("selected");
    } else {
      card.classList.remove("selected");
    }
  }, 10);
}

