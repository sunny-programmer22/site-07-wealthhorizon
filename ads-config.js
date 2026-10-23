/**
 * ==============================================================================
 * WealthHorizon - HilltopAds Monetization Configuration & Integration Script
 * ==============================================================================
 * 
 * Niche: Personal Finance, Passive Income & Investing
 * Domain: WealthHorizon
 * 
 * This file centralizes and manages all 6 HilltopAds monetization ad zones:
 *  - Zone 1: Popunder / OnClick Tag
 *  - Zone 2: In-Page Push (IPP) MultiTag
 *  - Zone 3: MultiTag Banners (728x90 Header Leaderboard & 300x250 Calculator Sidebar)
 *  - Zone 4: Video Slider MultiTag
 *  - Zone 5: Direct Link / SmartLink (Attached to high-intent CTAs: 'Download Free Budgeting Sheet', 'Compare Brokerages')
 *  - Zone 6: Video VAST Ad Tag (Pre-roll / Mid-roll for HTML5 Financial Masterclass Player)
 * 
 * INSTRUCTIONS FOR USER / PUBLISHER:
 * 1. Log in to your HilltopAds Publisher account (https://hilltopads.com).
 * 2. Add your website domain and generate ad codes for each desired format.
 * 3. Replace the placeholder zone IDs and script URLs below with your real HilltopAds credentials.
 * 4. Toggle `isDemoMode: false` when you are ready to serve live production ads.
 * ==============================================================================
 */

const HILLTOP_ADS_CONFIG = {
  // Global switch: When true, shows informative placeholders, demo creatives & interactive simulation toasts.
  // Set to false in production once you fill in your real HilltopAds Zone IDs!
  isDemoMode: true,

  // ----------------------------------------------------------------------------
  // ZONE 1: Popunder / OnClick
  // Full-page monetized popunder triggered on the visitor's first click anywhere on the page
  // ----------------------------------------------------------------------------
  zone1_popunder: {
    enabled: true,
    zoneId: "YOUR_POPUNDER_ZONE_ID", // e.g. "784912"
    scriptUrl: "https://example-hilltopads-cdn.com/popunder.js", // Replace with HilltopAds script URL
    triggerOncePerSession: true,
    delaySeconds: 0
  },

  // ----------------------------------------------------------------------------
  // ZONE 2: In-Page Push (IPP) MultiTag
  // High-CTR native notification appearing inside the page viewport (fintech-themed)
  // ----------------------------------------------------------------------------
  zone2_inPagePush: {
    enabled: true,
    zoneId: "YOUR_IPP_ZONE_ID", // e.g. "892013"
    scriptUrl: "https://example-hilltopads-cdn.com/ipp-multitag.js",
    position: "bottom-right", // "bottom-right" or "bottom-left"
    demoTitle: "📈 High-Yield Alert: 5.25% APY",
    demoMessage: "Top Federal FDIC-insured accounts just raised rates. Calculate your passive monthly yield now.",
    demoIcon: "💰",
    demoTime: "Just now",
    autoShowDelayMs: 3000
  },

  // ----------------------------------------------------------------------------
  // ZONE 3: MultiTag Banners
  // Intelligent auto-optimizing banner ad tags that maximize CPM
  // ----------------------------------------------------------------------------
  zone3_banners: {
    header_728x90: {
      enabled: true,
      zoneId: "YOUR_HEADER_BANNER_ZONE_ID", // e.g. "615024"
      containerId: "ad-zone-header-728x90",
      scriptUrl: "https://example-hilltopads-cdn.com/banner-728x90.js",
      dimensions: { width: 728, height: 90 },
      demoSponsor: "ApexTrader Pro",
      demoHeadline: "Commission-Free Stock & ETF Trading with $200 Bonus",
      demoCta: "Claim Bonus"
    },
    sidebar_300x250: {
      enabled: true,
      zoneId: "YOUR_SIDEBAR_BANNER_ZONE_ID", // e.g. "615025"
      containerId: "ad-zone-sidebar-300x250",
      scriptUrl: "https://example-hilltopads-cdn.com/banner-300x250.js",
      dimensions: { width: 300, height: 250 },
      demoSponsor: "YieldForge Real Estate",
      demoHeadline: "Automate 9.4% Passive Income with Real Estate Debt Funds",
      demoCta: "Start with $100"
    }
  },

  // ----------------------------------------------------------------------------
  // ZONE 4: Video Slider MultiTag
  // Floating slider video unit docked in the bottom corner of the viewport
  // ----------------------------------------------------------------------------
  zone4_videoSlider: {
    enabled: true,
    zoneId: "YOUR_VIDEO_SLIDER_ZONE_ID", // e.g. "931204"
    containerId: "ad-zone-video-slider",
    scriptUrl: "https://example-hilltopads-cdn.com/video-slider.js",
    position: "bottom-right",
    autoSlideDelayMs: 3500,
    demoTitle: "Sponsor Video: Automated Dividend Reinvestment",
    demoSponsor: "Vanguard Wealth Partners"
  },

  // ----------------------------------------------------------------------------
  // ZONE 5: Direct Link / SmartLink
  // Monetized redirect link attached to high-intent CTA buttons
  // ----------------------------------------------------------------------------
  zone5_directLink: {
    enabled: true,
    smartLinkUrl: "https://hilltopads.com/smartlink?zone=YOUR_SMARTLINK_ZONE_ID", // Replace with your live SmartLink URL
    // CSS selectors for buttons that route through this Direct Link:
    selectors: [
      ".smartlink-cta",
      "[data-ad-action='direct-link']",
      ".btn-budget-sheet",
      ".btn-compare-brokerages",
      ".btn-sidehustle-action",
      ".btn-hysa-cta"
    ],
    openInNewTab: true
  },

  // ----------------------------------------------------------------------------
  // ZONE 6: Video VAST
  // Linear Pre-roll / Mid-roll Video Ad for the HTML5 Financial Masterclass Player
  // ----------------------------------------------------------------------------
  zone6_videoVAST: {
    enabled: true,
    zoneId: "YOUR_VAST_ZONE_ID", // e.g. "502391"
    vastTagUrl: "https://hilltopads.com/vast?zone=YOUR_VAST_ZONE_ID", // Replace with HilltopAds VAST Tag URL
    videoPlayerId: "fin-masterclass-video",
    adOverlayId: "vast-ad-overlay",
    durationSeconds: 6,
    skipOffsetSeconds: 4,
    demoAdTitle: "Sponsored Masterclass Sponsor: Robinhood Gold 5.0% APY Cash Sweep",
    demoAdCtaUrl: "https://hilltopads.com/smartlink?zone=YOUR_SMARTLINK_ZONE_ID"
  }
};

/**
 * ==============================================================================
 * HilltopAds Manager Class
 * Handles initialization, DOM injection, event binding, and fallback simulations.
 * ==============================================================================
 */
class HilltopAdsManager {
  constructor(config) {
    this.config = config;
    this.activeToasts = [];
  }

  /**
   * Initializes all enabled HilltopAds zones upon page load
   */
  init() {
    console.log("%c[HilltopAds]%c Initializing WealthHorizon Monetization System...", "color: #10b981; font-weight: bold;", "color: inherit;");
    
    // Inject or simulate zones
    this.initZone1Popunder();
    this.initZone2InPagePush();
    this.initZone3Banners();
    this.initZone4VideoSlider();
    this.initZone5DirectLinks();
    this.initZone6VideoVAST();
    this.initAdInspectorBadge();
  }

  /**
   * ============================================================================
   * ZONE 1: Popunder / OnClick Implementation
   * ============================================================================
   */
  initZone1Popunder() {
    const cfg = this.config.zone1_popunder;
    if (!cfg || !cfg.enabled) return;

    if (!this.config.isDemoMode && cfg.zoneId !== "YOUR_POPUNDER_ZONE_ID") {
      // PRODUCTION MODE: Dynamically inject HilltopAds Popunder Script
      console.log("[HilltopAds] Injecting production Popunder tag:", cfg.zoneId);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `${cfg.scriptUrl}?zone=${encodeURIComponent(cfg.zoneId)}`;
      script.async = true;
      document.head.appendChild(script);
    } else {
      // DEMO / SIMULATION MODE: Bind click listener to demonstrate Popunder trigger
      console.log("[HilltopAds] Zone 1: Popunder active in Demo Mode (click anywhere to test).");
      const triggerPopunderDemo = (e) => {
        // Avoid intercepting interactive calculator controls, forms, or config modal
        if (e.target.closest("button, a, input, select, textarea, .config-modal, .interactive-btn, .range-input")) {
          return;
        }

        if (cfg.triggerOncePerSession && sessionStorage.getItem("wealthhorizon_popunder_triggered")) {
          return;
        }

        sessionStorage.setItem("wealthhorizon_popunder_triggered", "true");
        this.showToastNotification(
          "Zone 1: Popunder / OnClick Triggered",
          `In live production, HilltopAds Popunder (Zone ID: ${cfg.zoneId}) opens an advertiser window behind your active browser on first interaction. Session cap: 1/user.`,
          "gold"
        );
        document.removeEventListener("click", triggerPopunderDemo);
      };

      document.addEventListener("click", triggerPopunderDemo);
    }
  }

  /**
   * ============================================================================
   * ZONE 2: In-Page Push (IPP) MultiTag Implementation
   * ============================================================================
   */
  initZone2InPagePush() {
    const cfg = this.config.zone2_inPagePush;
    if (!cfg || !cfg.enabled) return;

    if (!this.config.isDemoMode && cfg.zoneId !== "YOUR_IPP_ZONE_ID") {
      // PRODUCTION MODE: Inject HilltopAds In-Page Push MultiTag script
      console.log("[HilltopAds] Injecting production In-Page Push MultiTag:", cfg.zoneId);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `${cfg.scriptUrl}?zone=${encodeURIComponent(cfg.zoneId)}`;
      script.async = true;
      document.body.appendChild(script);
    } else {
      // DEMO MODE: Render a sleek native fintech In-Page Push card
      setTimeout(() => {
        const ippContainer = document.getElementById("ad-zone-inpage-push");
        if (!ippContainer) return;

        ippContainer.innerHTML = `
          <div class="ipp-card" id="ipp-demo-card">
            <div class="ipp-header">
              <span class="ipp-badge"><span class="pulse-dot"></span> In-Page Push MultiTag (Zone 2)</span>
              <button class="ipp-close" id="ipp-close-btn" aria-label="Close notification" title="Dismiss notification">&times;</button>
            </div>
            <div class="ipp-body">
              <div class="ipp-icon">${cfg.demoIcon}</div>
              <div class="ipp-content">
                <h4 class="ipp-title">${cfg.demoTitle}</h4>
                <p class="ipp-desc">${cfg.demoMessage}</p>
                <div class="ipp-meta">
                  <span class="ipp-time">${cfg.demoTime}</span>
                  <a href="${this.config.zone5_directLink.smartLinkUrl}" target="_blank" rel="noopener" class="ipp-cta smartlink-cta">View Top Rates &rarr;</a>
                </div>
              </div>
            </div>
            <div class="ipp-footer-info">
              <span>HilltopAds MultiTag Placeholder &bull; Zone ID: <code>${cfg.zoneId}</code></span>
            </div>
          </div>
        `;

        ippContainer.classList.add("ipp-visible");

        const closeBtn = document.getElementById("ipp-close-btn");
        if (closeBtn) {
          closeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            ippContainer.classList.remove("ipp-visible");
            setTimeout(() => ippContainer.remove(), 400);
          });
        }
      }, cfg.autoShowDelayMs || 3000);
    }
  }

  /**
   * ============================================================================
   * ZONE 3: MultiTag Banners (728x90 Header & 300x250 Sidebar)
   * ============================================================================
   */
  initZone3Banners() {
    const banners = this.config.zone3_banners;
    if (!banners) return;

    // 1. Header 728x90 Leaderboard
    if (banners.header_728x90 && banners.header_728x90.enabled) {
      this.renderBannerUnit(banners.header_728x90, "header");
    }

    // 2. Sidebar 300x250 Medium Rectangle
    if (banners.sidebar_300x250 && banners.sidebar_300x250.enabled) {
      this.renderBannerUnit(banners.sidebar_300x250, "sidebar");
    }
  }

  renderBannerUnit(bannerCfg, type) {
    const container = document.getElementById(bannerCfg.containerId);
    if (!container) return;

    if (!this.config.isDemoMode && bannerCfg.zoneId !== "YOUR_HEADER_BANNER_ZONE_ID" && bannerCfg.zoneId !== "YOUR_SIDEBAR_BANNER_ZONE_ID") {
      // PRODUCTION MODE: Inject HilltopAds Banner MultiTag
      console.log(`[HilltopAds] Loading production banner for ${type}:`, bannerCfg.zoneId);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `${bannerCfg.scriptUrl}?zone=${encodeURIComponent(bannerCfg.zoneId)}`;
      script.async = true;
      container.appendChild(script);
    } else {
      // DEMO MODE: Render high-fidelity fintech banner placeholder
      if (type === "header") {
        container.innerHTML = `
          <div class="banner-wrapper banner-728x90">
            <div class="ad-label-tag">HilltopAds MultiTag Banner (Zone 3: 728x90 Leaderboard)</div>
            <div class="banner-creative banner-creative-header">
              <div class="banner-sponsor">
                <span class="sponsor-logo">⚡</span>
                <div>
                  <div class="sponsor-brand">${bannerCfg.demoSponsor}</div>
                  <div class="sponsor-tagline">Award-Winning FinTech Platform</div>
                </div>
              </div>
              <div class="banner-pitch">
                <span class="pitch-highlight">${bannerCfg.demoHeadline}</span>
                <span class="pitch-sub">0% Trading Fees &bull; Instant ACH Funding &bull; SIPC Insured</span>
              </div>
              <div class="banner-action">
                <a href="${this.config.zone5_directLink.smartLinkUrl}" target="_blank" rel="noopener" class="btn-banner smartlink-cta">${bannerCfg.demoCta} &rarr;</a>
                <span class="ad-disclosure">Sponsored &bull; Zone ${bannerCfg.zoneId}</span>
              </div>
            </div>
          </div>
        `;
      } else if (type === "sidebar") {
        container.innerHTML = `
          <div class="banner-wrapper banner-300x250">
            <div class="ad-label-tag">HilltopAds MultiTag Banner (Zone 3: 300x250 Sidebar)</div>
            <div class="banner-creative banner-creative-sidebar">
              <div class="sidebar-ad-badge">Passive Income Spotlight</div>
              <div class="sidebar-ad-icon">🏢</div>
              <h4 class="sidebar-ad-title">${bannerCfg.demoHeadline}</h4>
              <p class="sidebar-ad-desc">Diversify beyond volatile public equities. Institutional commercial real estate yields paid monthly.</p>
              <div class="sidebar-ad-stats">
                <div class="stat-pill"><span class="val">9.4%</span> <span class="lbl">Hist. Return</span></div>
                <div class="stat-pill"><span class="val">$100</span> <span class="lbl">Min. Deposit</span></div>
              </div>
              <a href="${this.config.zone5_directLink.smartLinkUrl}" target="_blank" rel="noopener" class="btn-banner-full smartlink-cta">${bannerCfg.demoCta} &rarr;</a>
              <div class="sidebar-ad-sub">HilltopAds MultiTag &bull; Zone: <code>${bannerCfg.zoneId}</code></div>
            </div>
          </div>
        `;
      }
    }
  }

  /**
   * ============================================================================
   * ZONE 4: Video Slider MultiTag Implementation
   * ============================================================================
   */
  initZone4VideoSlider() {
    const cfg = this.config.zone4_videoSlider;
    if (!cfg || !cfg.enabled) return;

    if (!this.config.isDemoMode && cfg.zoneId !== "YOUR_VIDEO_SLIDER_ZONE_ID") {
      // PRODUCTION MODE: Inject HilltopAds Video Slider MultiTag
      console.log("[HilltopAds] Injecting production Video Slider tag:", cfg.zoneId);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `${cfg.scriptUrl}?zone=${encodeURIComponent(cfg.zoneId)}`;
      script.async = true;
      document.body.appendChild(script);
    } else {
      // DEMO MODE: Render a simulated sleek bottom-right Video Slider unit
      setTimeout(() => {
        const sliderContainer = document.getElementById("ad-zone-video-slider");
        if (!sliderContainer) return;

        sliderContainer.innerHTML = `
          <div class="video-slider-box" id="video-slider-box">
            <div class="slider-header">
              <div class="slider-title-group">
                <span class="live-pulse"></span>
                <span class="slider-heading">HilltopAds Video Slider (Zone 4)</span>
              </div>
              <div class="slider-actions">
                <button class="slider-btn" id="slider-min-btn" title="Minimize Slider">&#8722;</button>
                <button class="slider-btn" id="slider-close-btn" title="Close Slider">&times;</button>
              </div>
            </div>
            <div class="slider-body">
              <div class="slider-video-mock">
                <!-- Visual simulated financial video canvas -->
                <canvas id="slider-canvas" width="280" height="158"></canvas>
                <div class="slider-video-overlay">
                  <span class="slider-ad-tag">HilltopAds MultiTag</span>
                  <span class="slider-sponsor-tag">${cfg.demoSponsor}</span>
                </div>
              </div>
              <div class="slider-info">
                <h5>${cfg.demoTitle}</h5>
                <p>Automate your portfolio compounding with automated reinvestment tools.</p>
                <a href="${this.config.zone5_directLink.smartLinkUrl}" target="_blank" rel="noopener" class="btn-slider-cta smartlink-cta">Learn Strategy &rarr;</a>
              </div>
            </div>
            <div class="slider-footer">
              <span>Zone ID: <code>${cfg.zoneId}</code> &bull; Autoplay muted</span>
            </div>
          </div>
        `;

        sliderContainer.classList.add("slider-visible");

        // Animate canvas chart to simulate a live video stream
        this.animateSliderCanvas("slider-canvas");

        // Close and minimize handlers
        const closeBtn = document.getElementById("slider-close-btn");
        if (closeBtn) {
          closeBtn.addEventListener("click", () => {
            sliderContainer.classList.remove("slider-visible");
            setTimeout(() => sliderContainer.remove(), 400);
          });
        }

        const minBtn = document.getElementById("slider-min-btn");
        let isMinimized = false;
        if (minBtn) {
          minBtn.addEventListener("click", () => {
            isMinimized = !isMinimized;
            sliderContainer.classList.toggle("slider-minimized", isMinimized);
            minBtn.innerHTML = isMinimized ? "&#43;" : "&#8722;";
          });
        }
      }, cfg.autoSlideDelayMs || 3500);
    }
  }

  animateSliderCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame = 0;

    const render = () => {
      frame++;
      ctx.fillStyle = "#0a192f";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw dynamic compounding growth graph
      ctx.beginPath();
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2.5;
      for (let x = 0; x < canvas.width; x++) {
        const progress = x / canvas.width;
        const wave = Math.sin((x + frame * 1.5) * 0.04) * 6;
        const curve = Math.pow(progress, 2.2) * (canvas.height * 0.65);
        const y = canvas.height - 25 - curve + wave;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Glowing stock marker
      const markerX = (frame * 1.5) % canvas.width;
      const markerProg = markerX / canvas.width;
      const markerWave = Math.sin((markerX + frame * 1.5) * 0.04) * 6;
      const markerY = canvas.height - 25 - Math.pow(markerProg, 2.2) * (canvas.height * 0.65) + markerWave;

      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.arc(markerX, markerY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Text simulation
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 11px Inter, sans-serif";
      ctx.fillText("COMPOUND RATE +12.4%", 12, 22);

      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "9px Inter, sans-serif";
      ctx.fillText("LIVE PORTFOLIO TRACKER", 12, 36);

      if (document.getElementById(canvasId)) {
        requestAnimationFrame(render);
      }
    };

    render();
  }

  /**
   * ============================================================================
   * ZONE 5: Direct Link / SmartLink (CTA Buttons)
   * ============================================================================
   */
  initZone5DirectLinks() {
    const cfg = this.config.zone5_directLink;
    if (!cfg || !cfg.enabled) return;

    const selectors = cfg.selectors.join(", ");
    const ctaButtons = document.querySelectorAll(selectors);

    ctaButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        // Prevent default hash/page reload
        e.preventDefault();

        const buttonText = btn.innerText.trim().replace(/\s+/g, " ");

        if (this.config.isDemoMode && cfg.smartLinkUrl.includes("YOUR_SMARTLINK_ZONE_ID")) {
          // DEMO MODE: Show explicit feedback showing the SmartLink trigger
          this.showToastNotification(
            "Zone 5: SmartLink / Direct Link Clicked",
            `[CTA: "${buttonText}"] is attached to HilltopAds SmartLink. In production, this monetized redirect automatically matches the user to high-paying financial/fintech offers.`,
            "emerald"
          );

          // If the button is "Download Free Budgeting Sheet", trigger simulated free download as well
          if (btn.classList.contains("btn-budget-sheet") || buttonText.toLowerCase().includes("budgeting")) {
            setTimeout(() => {
              this.simulateBudgetDownload();
            }, 600);
          }
        } else {
          // PRODUCTION MODE: Route user through HilltopAds SmartLink
          if (cfg.openInNewTab) {
            window.open(cfg.smartLinkUrl, "_blank", "noopener,noreferrer");
          } else {
            window.location.href = cfg.smartLinkUrl;
          }
        }
      });
    });
  }

  simulateBudgetDownload() {
    const sampleCsv = "Date,Category,Description,Income,Expense,Account\n2026-01-01,Income,Primary Salary,6500.00,0.00,Checking\n2026-01-02,Housing,Mortgage/Rent,0.00,1850.00,Checking\n2026-01-05,Investments,Index Fund VOO,0.00,1200.00,Brokerage\n2026-01-07,Passive,High Yield Savings APY,142.50,0.00,HYSA\n2026-01-10,Side Hustle,Digital Template Sales,480.00,0.00,Business\n";
    const blob = new Blob([sampleCsv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "WealthHorizon_2026_Budget_Tracker.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * ============================================================================
   * ZONE 6: Video VAST (Linear Video Ad for HTML5 Video Player)
   * ============================================================================
   */
  initZone6VideoVAST() {
    const cfg = this.config.zone6_videoVAST;
    if (!cfg || !cfg.enabled) return;

    const player = document.getElementById(cfg.videoPlayerId);
    const overlay = document.getElementById(cfg.adOverlayId);
    const playTrigger = document.getElementById("vast-play-btn");

    if (!player || !overlay) return;

    let vastAdPlayed = false;

    const startVastAd = () => {
      if (vastAdPlayed) {
        player.play();
        return;
      }

      console.log("[HilltopAds] Launching Zone 6: Video VAST Pre-roll...");
      overlay.classList.add("ad-active");
      overlay.style.display = "flex";

      let remaining = cfg.durationSeconds || 6;
      let canSkip = false;
      const skipThreshold = cfg.skipOffsetSeconds || 4;

      overlay.innerHTML = `
        <div class="vast-ad-box">
          <div class="vast-top-bar">
            <span class="vast-badge"><span class="pulse-dot"></span> HilltopAds Video VAST (Zone 6)</span>
            <span class="vast-timer" id="vast-timer-count">Ad: ${remaining}s</span>
          </div>
          <div class="vast-sponsor-info">
            <h4>${cfg.demoAdTitle}</h4>
            <p>High-Yield Cash Sweep: Earn 5.0% APY on idle cash + FDIC insurance up to $2.25M.</p>
          </div>
          <div class="vast-controls">
            <a href="${cfg.demoAdCtaUrl}" target="_blank" rel="noopener" class="btn-vast-cta smartlink-cta">Learn More &rarr;</a>
            <button class="btn-vast-skip" id="vast-skip-btn" disabled>Skip in ${skipThreshold}s</button>
          </div>
          <div class="vast-tag-footer">
            HilltopAds VAST Tag: <code>${cfg.vastTagUrl}</code> (Zone: <code>${cfg.zoneId}</code>)
          </div>
        </div>
      `;

      const timerEl = document.getElementById("vast-timer-count");
      const skipBtn = document.getElementById("vast-skip-btn");

      const interval = setInterval(() => {
        remaining--;
        if (timerEl) {
          timerEl.textContent = `Ad: ${remaining}s`;
        }

        const elapsed = (cfg.durationSeconds || 6) - remaining;
        if (elapsed >= skipThreshold && !canSkip) {
          canSkip = true;
          if (skipBtn) {
            skipBtn.disabled = false;
            skipBtn.innerHTML = "Skip Ad &raquo;";
            skipBtn.classList.add("skip-ready");
          }
        }

        if (remaining <= 0) {
          clearInterval(interval);
          finishVastAd();
        }
      }, 1000);

      const finishVastAd = () => {
        clearInterval(interval);
        vastAdPlayed = true;
        overlay.classList.remove("ad-active");
        overlay.style.display = "none";
        console.log("[HilltopAds] VAST ad finished. Resuming masterclass video playback.");
        player.play();
      };

      if (skipBtn) {
        skipBtn.addEventListener("click", () => {
          if (canSkip) finishVastAd();
        });
      }
    };

    if (playTrigger) {
      playTrigger.addEventListener("click", () => {
        playTrigger.style.display = "none";
        startVastAd();
      });
    }

    player.addEventListener("play", () => {
      if (!vastAdPlayed) {
        player.pause();
        if (playTrigger) playTrigger.style.display = "none";
        startVastAd();
      }
    });
  }

  /**
   * ============================================================================
   * Toast Notification System for Ad Zone Interactions
   * ============================================================================
   */
  showToastNotification(title, message, theme = "gold") {
    let container = document.getElementById("ads-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "ads-toast-container";
      container.className = "ads-toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `ads-toast toast-${theme}`;
    toast.innerHTML = `
      <div class="toast-indicator"></div>
      <div class="toast-body">
        <div class="toast-header">
          <strong>${title}</strong>
          <button class="toast-dismiss">&times;</button>
        </div>
        <p class="toast-text">${message}</p>
      </div>
    `;

    container.appendChild(toast);

    // Auto dismiss after 6 seconds
    const dismissTimer = setTimeout(() => {
      this.removeToast(toast);
    }, 6000);

    const dismissBtn = toast.querySelector(".toast-dismiss");
    if (dismissBtn) {
      dismissBtn.addEventListener("click", () => {
        clearTimeout(dismissTimer);
        this.removeToast(toast);
      });
    }
  }

  removeToast(toast) {
    toast.classList.add("toast-leaving");
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 350);
  }

  /**
   * ============================================================================
   * Ad Inspector Badge & Diagnostics Modal
   * Provides the user/developer with instant visibility into all 6 ad zones
   * ============================================================================
   */
  initAdInspectorBadge() {
    const badge = document.createElement("div");
    badge.className = "ad-inspector-trigger";
    badge.innerHTML = `
      <button id="open-ad-inspector-btn" title="View HilltopAds Integration Status">
        <span class="pulse-dot"></span> HilltopAds Monetization Hub (6 Zones Active)
      </button>
    `;
    document.body.appendChild(badge);

    const btn = document.getElementById("open-ad-inspector-btn");
    if (btn) {
      btn.addEventListener("click", () => this.openInspectorModal());
    }
  }

  openInspectorModal() {
    let existingModal = document.getElementById("ad-inspector-modal");
    if (existingModal) existingModal.remove();

    const modal = document.createElement("div");
    modal.id = "ad-inspector-modal";
    modal.className = "config-modal-overlay";
    modal.innerHTML = `
      <div class="config-modal">
        <div class="config-modal-header">
          <div class="modal-title-wrap">
            <span class="gold-icon">💰</span>
            <h3>WealthHorizon &bull; HilltopAds Monetization Suite</h3>
          </div>
          <button class="config-modal-close" id="close-modal-btn">&times;</button>
        </div>
        <div class="config-modal-body">
          <div class="status-summary-bar">
            <div class="summary-item">
              <span class="lbl">Current Mode:</span>
              <span class="val val-highlight">${this.config.isDemoMode ? "🟡 Demo / Simulation Mode" : "🟢 Live Production Mode"}</span>
            </div>
            <div class="summary-item">
              <span class="lbl">Zones Wired:</span>
              <span class="val">6 of 6 Ad Zones Connected</span>
            </div>
          </div>
          
          <p class="modal-intro">
            All 6 HilltopAds ad zones are fully wired with semantic HTML5 placement slots, fallback creatives, and modular configuration.
            To connect your live HilltopAds publisher account, edit <code>ads-config.js</code> and update your Zone IDs.
          </p>

          <div class="zones-table-wrapper">
            <table class="zones-table">
              <thead>
                <tr>
                  <th>Zone #</th>
                  <th>Ad Format</th>
                  <th>Config ID</th>
                  <th>Target Placement</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Zone 1</strong></td>
                  <td>Popunder / OnClick</td>
                  <td><code>${this.config.zone1_popunder.zoneId}</code></td>
                  <td>Global Page Clicks (1x/session)</td>
                  <td><span class="badge-status ready">Ready</span></td>
                </tr>
                <tr>
                  <td><strong>Zone 2</strong></td>
                  <td>In-Page Push (IPP)</td>
                  <td><code>${this.config.zone2_inPagePush.zoneId}</code></td>
                  <td><code>#ad-zone-inpage-push</code> (Bottom-Right)</td>
                  <td><span class="badge-status ready">Ready</span></td>
                </tr>
                <tr>
                  <td><strong>Zone 3A</strong></td>
                  <td>MultiTag 728x90 Leaderboard</td>
                  <td><code>${this.config.zone3_banners.header_728x90.zoneId}</code></td>
                  <td><code>#ad-zone-header-728x90</code> (Top Nav Slot)</td>
                  <td><span class="badge-status ready">Ready</span></td>
                </tr>
                <tr>
                  <td><strong>Zone 3B</strong></td>
                  <td>MultiTag 300x250 Medium Rectangle</td>
                  <td><code>${this.config.zone3_banners.sidebar_300x250.zoneId}</code></td>
                  <td><code>#ad-zone-sidebar-300x250</code> (Calculator Sidebar)</td>
                  <td><span class="badge-status ready">Ready</span></td>
                </tr>
                <tr>
                  <td><strong>Zone 4</strong></td>
                  <td>Video Slider MultiTag</td>
                  <td><code>${this.config.zone4_videoSlider.zoneId}</code></td>
                  <td><code>#ad-zone-video-slider</code> (Docked Corner)</td>
                  <td><span class="badge-status ready">Ready</span></td>
                </tr>
                <tr>
                  <td><strong>Zone 5</strong></td>
                  <td>Direct Link / SmartLink</td>
                  <td><code>${this.config.zone5_directLink.smartLinkUrl}</code></td>
                  <td>Budget Sheet CTA, Compare Brokerages, Action Buttons</td>
                  <td><span class="badge-status ready">Ready</span></td>
                </tr>
                <tr>
                  <td><strong>Zone 6</strong></td>
                  <td>Video VAST Pre-roll Tag</td>
                  <td><code>${this.config.zone6_videoVAST.zoneId}</code></td>
                  <td><code>#fin-masterclass-video</code> HTML5 Player</td>
                  <td><span class="badge-status ready">Ready</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="code-quick-guide">
            <h5>Quick Setup to Go Live:</h5>
            <ol>
              <li>Open <code>ads-config.js</code> in this directory.</li>
              <li>Replace <code>isDemoMode: true</code> with <code>isDemoMode: false</code>.</li>
              <li>Enter your real Zone IDs obtained from <a href="https://hilltopads.com" target="_blank" rel="noopener">hilltopads.com</a>.</li>
            </ol>
          </div>
        </div>
        <div class="config-modal-footer">
          <button class="btn-modal-close" id="btn-modal-dismiss">Done</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = document.getElementById("close-modal-btn");
    const dismissBtn = document.getElementById("btn-modal-dismiss");
    const closeModal = () => modal.remove();

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (dismissBtn) dismissBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }
}

// Instantiate and launch HilltopAds monetization once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.wealthHorizonAds = new HilltopAdsManager(HILLTOP_ADS_CONFIG);
  window.wealthHorizonAds.init();
});
