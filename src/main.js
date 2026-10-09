import './style.css'
import leadkuxProductBox from './assets/leadkux-product-box.jpg'

const layers = [
  ['01', 'Windows Product / Control Center', 'Dashboard, businesses, leads, handoffs, outcomes, lifecycle views, configuration, credentials, licensing, updates, onboarding and diagnostics.'],
  ['02', 'Automated Customer Onboarding', 'Readiness evaluation with business, runtime, lead-source, outbound-email and completion gates through a guided onboarding flow.'],
  ['03', 'Lead / Core Integration', 'Authenticated client operations for health, businesses, metrics, lifecycle, handoffs, outcomes, leads, lead creation and inbound webhooks.'],
  ['04', 'Lead Intake & Web Form Integration', 'Normalized lead contracts, web-form field mapping and adaptation, plus webhook submission.'],
  ['05', 'Public Relay & Durable Delivery', 'HTTPS relay, pull/ACK delivery, local webhook worker and durable SQLite/PostgreSQL queue implementations.'],
  ['06', 'Managed Runtime', 'Managed and standalone API/worker entrypoints with endpoint selection, runtime storage and process start/stop/recovery management.'],
  ['07', 'Self-Diagnostics & Recovery', 'Product-health evaluation and runtime recovery are implemented as dedicated product components.'],
  ['08', 'Production Backup & Recovery', 'Backup creation, SHA-256 artifact handling, manifests, validation and controlled JSON/JSONL/SQLite restore workflows.'],
  ['09', 'Production Observability', 'Structured production event journal with event validation and rotation.'],
  ['10', 'Secure Credential Storage', 'Native Windows Credential Store integration for local set, get and delete operations.'],
  ['11', 'Cryptographic Licensing', 'License installation, storage, claims verification, public-key verification and authority-side issuance infrastructure.'],
  ['12', 'Verified Update Delivery', 'Manifest retrieval, version comparison, SHA-256 installer verification, verified launch and customer-state checks.'],
  ['13', 'Commercial Automation', 'Lemon Squeezy event parsing, entitlement resolution, fulfillment, lifecycle execution, renewal and resumption logic.'],
  ['14', 'Customer & Subscription Lifecycle', 'Persistent customer license delivery/recovery plus subscription state and ordering infrastructure.'],
  ['15', 'Commercial Relay & Retention', 'Commercial HTTPS worker/queue infrastructure plus controlled lead and commercial queue retention tooling.'],
]

const layerMarkup = layers.map(([n, title, copy]) => `
  <article class="platform-card">
    <span>${n}</span>
    <div>
      <h3>${title}</h3>
      <p>${copy}</p>
    </div>
  </article>
`).join('')

document.querySelector('#app').innerHTML = `
  <div class="site-shell">

    <header class="site-header">
      <a class="brand" href="#top" aria-label="LeadKux home">
        <span class="brand-mark">LK</span>
        <span class="brand-copy">
          <strong>LEADKUX</strong>
          <small>Lead Recovery Engine</small>
        </span>
      </a>

      <button
        class="nav-toggle"
        type="button"
        aria-label="Open navigation"
        aria-expanded="false"
      >
        <span></span>
        <span></span>
      </button>

      <nav class="main-nav" aria-label="Main navigation">
        <a href="#workflow">How it works</a>
        <a href="#product">Product</a>
        <a href="#pricing">Pricing</a>
        <a href="#validation">Validation</a>
        <a href="#technical">Technical Details</a>
        <a href="#pilot">Pilot</a>
        <a class="nav-cta" href="#contact">Get early access</a>
      </nav>
    </header>

    <main id="top">

      <section class="hero section">
        <div class="hero-grid">

          <div class="hero-copy">
            <div class="eyebrow">
              <span class="status-dot"></span>
              EARLY COMMERCIAL RELEASE
            </div>

            <h1>
              Turn missed leads into
              <span>another chance to win.</span>
            </h1>

            <p class="hero-lead">
              LeadKux is a Windows-based lead-recovery and customer-lifecycle
              system that connects lead intake, durable delivery, local
              processing, onboarding, runtime management and commercial
              software operations.
            </p>

            <div class="hero-actions">
              <a class="button button-primary" href="#contact">
                Get early access <span>→</span>
              </a>
              <a class="button button-secondary" href="/test-drive/">
                TRY NOW <span>→</span>
              </a>

              <a class="button button-secondary" href="#architecture">
                Explore the architecture
              </a>
            </div>

            <p class="hero-note">
              Built as a complete product stack — not just a lead-processing interface.
            </p>
          </div>

          <div class="hero-product-visual">
          <div class="hero-product-glow"></div>

          <img
            src="${leadkuxProductBox}"
            alt="LeadKux Lead Recovery Engine technical product overview"
            class="hero-product-image"
          />

          <div class="hero-product-caption">
            <span>LEADKUX™ LRE</span>
            <strong>Technical Product Overview</strong>
          </div>
        </div>

        </div>

        <div class="hero-system">

            <div class="system-topline">
              <span>LEADKUX SYSTEM</span>
              <span class="system-state">W21 DEV</span>
            </div>

            <div class="system-flow">

              <div class="flow-node active">
                <span class="node-index">01</span>
                <div>
                  <strong>Lead intake</strong>
                  <small>Web form / webhook / integration</small>
                </div>
              </div>

              <div class="flow-line"></div>

              <div class="flow-node">
                <span class="node-index">02</span>
                <div>
                  <strong>Durable relay</strong>
                  <small>Queue → pull → local delivery → ACK</small>
                </div>
              </div>

              <div class="flow-line"></div>

              <div class="flow-node">
                <span class="node-index">03</span>
                <div>
                  <strong>Local runtime</strong>
                  <small>API + worker + persistent state</small>
                </div>
              </div>

              <div class="flow-line"></div>

              <div class="flow-node">
                <span class="node-index">04</span>
                <div>
                  <strong>Lead lifecycle</strong>
                  <small>Qualification → handoff → outcome</small>
                </div>
              </div>

              <div class="flow-line"></div>

              <div class="flow-node">
                <span class="node-index">05</span>
                <div>
                  <strong>Commercial lifecycle</strong>
                  <small>License → entitlement → subscription</small>
                </div>
              </div>

            </div>

            <div class="system-footer">
              <span>Windows</span>
              <span>15 Layers</span>
              <span>7 Routes</span>
            </div>

          </div>
      </section>

      <section class="product-strip section-border">
        <div class="product-strip-inner">
          <span>WINDOWS PRODUCT</span>
          <span>AUTOMATED ONBOARDING</span>
          <span>DURABLE RELAY</span>
          <span>CRYPTOGRAPHIC LICENSING</span>
          <span>VERIFIED UPDATES</span>
          <span>RECOVERY</span>
        </div>
      </section>

      <div class="home-technical-index">
        <nav class="technical-mini-nav" aria-label="Technical details navigation">

          <div class="technical-mini-head">
            <span>TECHNICAL INDEX</span>
            <small>Jump directly to the technical evidence you need.</small>
          </div>

          <div class="technical-mini-links">

            <a href="#architecture" class="tech-nav-cyan">
              <span>01</span>
              Architecture
            </a>

            <a href="#technical" class="tech-nav-cyan">
              <span>02</span>
              Inventory
            </a>

            <a href="#validation" class="tech-nav-green">
              <span>03</span>
              Test Evidence
            </a>

            <a href="#external-delivery" class="tech-nav-green">
              <span>04</span>
              External Delivery
            </a>

            <a href="#api" class="tech-nav-cyan">
              <span>05</span>
              API
            </a>

            <a href="#security-recovery" class="tech-nav-amber">
              <span>06</span>
              Security & Recovery
            </a>

            <a href="#commercial-stack" class="tech-nav-purple">
              <span>07</span>
              Commercial
            </a>

          </div>

        </nav>
      </div>

      <section id="workflow" class="section section-border">

        <div class="section-heading">
          <span class="section-kicker">THE PRODUCT</span>
          <h2>One system around the lead journey.</h2>
          <p>
            LeadKux preserves continuity from incoming inquiry through local
            processing, lifecycle tracking and human action, while the product
            infrastructure handles onboarding, runtime health, licensing,
            updates and recovery.
          </p>
        </div>

        <div class="journey">

          <div class="journey-item">
            <span>01</span>
            <strong>Capture</strong>
            <p>
              Receive normalized lead data through defined web-form and webhook paths.
            </p>
          </div>

          <div class="journey-item">
            <span>02</span>
            <strong>Deliver</strong>
            <p>
              Move lead state through a durable relay with pull and acknowledgement semantics.
            </p>
          </div>

          <div class="journey-item">
            <span>03</span>
            <strong>Process</strong>
            <p>
              Use the local Windows runtime and persistent state to continue the workflow.
            </p>
          </div>

          <div class="journey-item">
            <span>04</span>
            <strong>Track</strong>
            <p>
              Expose leads, lifecycle, handoffs and outcomes through the product environment.
            </p>
          </div>

          <div class="journey-item">
            <span>05</span>
            <strong>Act</strong>
            <p>
              Keep human authority at the point where the opportunity is ready for action.
            </p>
          </div>

        </div>
      </section>

      <section id="product" class="section section-border">

        <div class="section-heading">
          <span class="section-kicker">WINDOWS CONTROL CENTER</span>
          <h2>The customer-facing product, not just the engine.</h2>
          <p>
            The Windows layer brings business selection, dashboard visibility,
            leads, handoffs, outcomes, lifecycle state, configuration, credential
            handling, license operations, update checks, onboarding and
            diagnostics into one product surface.
          </p>
        </div>

        <div class="capability-grid">

          <article class="capability-card">
            <div class="capability-icon">▣</div>
            <h3>Operational dashboard</h3>
            <p>
              Customer-facing access to businesses, leads, lifecycle state,
              handoffs and outcomes.
            </p>
          </article>

          <article class="capability-card">
            <div class="capability-icon">✓</div>
            <h3>Guided onboarding</h3>
            <p>
              Readiness gates cover business setup, runtime, lead source,
              outbound email and completion.
            </p>
          </article>

          <article class="capability-card">
            <div class="capability-icon">⚙</div>
            <h3>Runtime control</h3>
            <p>
              Managed local API and worker processes with start, stop,
              process management and recovery.
            </p>
          </article>

          <article class="capability-card">
            <div class="capability-icon">◇</div>
            <h3>Self-diagnostics</h3>
            <p>
              Dedicated product-health evaluation and runtime recovery components.
            </p>
          </article>

          <article class="capability-card">
            <div class="capability-icon">⌁</div>
            <h3>License operations</h3>
            <p>
              Activation, replacement and renewal are integrated into the product lifecycle.
            </p>
          </article>

          <article class="capability-card">
            <div class="capability-icon">↻</div>
            <h3>Verified updates</h3>
            <p>
              Version checks and SHA-256 installer verification before verified installer launch.
            </p>
          </article>

        </div>
      </section>

      <section id="pricing" class="section section-border pricing-section" aria-labelledby="pricing-title">
        <div class="section-heading">
          <span class="section-kicker">PRICING &amp; PILOT</span>
          <h2 id="pricing-title">Start with a real workflow. Decide with evidence.</h2>
          <p>LeadKux is seeking its first live customer pilots. Evaluate the product
            in a defined business workflow before choosing a paid subscription.</p>
        </div>

        <div class="pricing-grid">
          <article class="pricing-card pricing-card-featured" aria-labelledby="pilot-price-title">
            <span class="pricing-label">FOUNDING CUSTOMER OFFER</span>
            <h3 id="pilot-price-title">Controlled pilot</h3>
            <p class="pricing-amount">€0 <span>/ 30 days</span></p>
            <p class="pricing-description">A focused evaluation, with scope and setup agreed before the pilot begins.</p>
            <ul class="pricing-features">
              <li>One agreed business workflow</li>
              <li>Defined lead source and integration scope</li>
              <li>Evaluate operational behavior and customer outcomes</li>
              <li>No automatic paid conversion</li>
            </ul>
            <div class="pricing-continuation">
              <strong>Choose to continue: €79 / month</strong>
              <span>For the first 6 paid months, then €149 / month.
                Paid continuation requires your separate agreement.</span>
            </div>
            <a class="button button-primary" href="#pilot">Apply for a pilot <span aria-hidden="true">→</span></a>
          </article>

          <article class="pricing-card" aria-labelledby="full-price-title">
            <span class="pricing-label">STANDARD SUBSCRIPTION</span>
            <h3 id="full-price-title">LeadKux Full</h3>
            <p class="pricing-amount">€149 <span>/ month / business</span></p>
            <p class="pricing-description">One business. One Windows installation. The complete existing product feature set.</p>
            <ul class="pricing-features">
              <li>Lead intake and automated follow-up</li>
              <li>Reply detection, human handoff and outcome tracking</li>
              <li>Windows Control Center and guided onboarding</li>
              <li>Diagnostics, backup and recovery</li>
              <li>Software updates during your subscription</li>
            </ul>
            <p class="pricing-scope">Usage limits, support scope and integration requirements
              are agreed in writing before activation.</p>
            <a class="button button-secondary" href="#contact">Discuss your setup <span aria-hidden="true">→</span></a>
          </article>
        </div>

        <div class="pricing-details">
          <p><strong>Optional assisted setup: €199 one-time.</strong>
            Configuration and connection of one supported lead source, subject to an agreed scope.
            No assisted-setup fee for self-service setup.</p>
          <p>Prices are in EUR, excluding applicable taxes. External email or messaging
            provider charges and custom integrations are separate. Any paid setup is agreed
            separately before work starts.</p>
          <p class="pricing-evidence">Customer ROI and conversion improvements have not yet been
            validated in a live customer pilot. No revenue or performance outcome is guaranteed.</p>
        </div>
      </section>

      <section id="architecture" class="section section-border">

        <div class="section-heading">
          <span class="section-kicker">COMPLETE PRODUCT ARCHITECTURE</span>
          <h2>15 production layers.</h2>
          <p>
            The current source inventory identifies a broad product stack
            spanning the Windows application, lead delivery, local runtime,
            operational recovery and commercial infrastructure.
          </p>
        </div>

        <div class="platform-grid">
          ${layerMarkup}
        </div>

      </section>

      <section id="technical" class="section section-border">



        <div class="section-heading">
          <span class="section-kicker">TECHNICAL DETAILS · W21 DEV</span>
          <h2>A measurable implementation surface.</h2>
          <p>
            These figures describe the inventoried W21 DEV source and test
            structure. Test-function counts are intentionally kept separate
            from executed pytest case counts.
          </p>
        </div>

        <div id="external-delivery" class="external-validation">

          <div class="external-validation-head">
            <div>
              <span class="external-kicker">
                EXTERNAL DELIVERY VALIDATION
              </span>

              <h3>
                Authenticated External HTTPS Delivery
              </h3>
            </div>

            <span class="external-status">
              VALIDATED
            </span>
          </div>

          <div class="external-flow">

            <div class="external-node">
              <span>01</span>
              <strong>External HTTPS</strong>
              <small>Public inbound request</small>
            </div>

            <div class="external-arrow">→</div>

            <div class="external-node">
              <span>02</span>
              <strong>Authentication</strong>
              <small>Webhook credential verified</small>
            </div>

            <div class="external-arrow">→</div>

            <div class="external-node">
              <span>03</span>
              <strong>LeadKux Runtime</strong>
              <small>Local processing path reached</small>
            </div>

            <div class="external-arrow">→</div>

            <div class="external-node">
              <span>04</span>
              <strong>Persistent State</strong>
              <small>Delivery persisted locally</small>
            </div>

          </div>

          <div class="external-evidence">

            <div>
              <span>HTTP PATH</span>
              <strong>503 → 401 → SUCCESS</strong>
              <small>
                Configuration failure, invalid credential rejection,
                then authenticated delivery.
              </small>
            </div>

            <div>
              <span>PERSISTENCE</span>
              <strong>VERIFIED</strong>
              <small>
                Delivery and lead state were confirmed in local
                persistence after external delivery.
              </small>
            </div>

            <div>
              <span>DEPLOYMENT BOUNDARY</span>
              <strong>PILOT VALIDATION</strong>
              <small>
                External HTTPS delivery was validated through the
                controlled pilot path. This is not presented as a
                permanent production-hosting claim.
              </small>
            </div>

          </div>

        </div>

        <div class="metrics-grid">

          <div class="metric-card">
            <strong>75</strong>
            <span>Production Python source files</span>
          </div>

          <div class="metric-card">
            <strong>130</strong>
            <span>Production classes</span>
          </div>

          <div class="metric-card">
            <strong>306</strong>
            <span>Functions & methods</span>
          </div>

          <div class="metric-card">
            <strong>103</strong>
            <span>Active non-live test files</span>
          </div>

          <div class="metric-card">
            <strong>498</strong>
            <span>Explicit test functions</span>
          </div>

          <div class="metric-card">
            <strong>24</strong>
            <span>Parametrized test functions</span>
          </div>

          <div class="metric-card">
            <strong>0</strong>
            <span>Production AST parse errors</span>
          </div>

          <div class="metric-card">
            <strong>0</strong>
            <span>Test AST parse errors</span>
          </div>

        </div>

        <div class="evidence-note">
          <span>COUNTING RULE</span>
          <p>
            498 explicit test functions does not mean 498 pytest cases.
            Parameterization can change the executed case count, and the
            inventory itself did not execute live tests.
          </p>
        </div>

      </section>


      <section id="validation" class="section section-border">

        <div class="section-heading">
          <span class="section-kicker">VERIFIED TEST RESULTS</span>
          <h2>Separate executions. Separate evidence.</h2>
          <p>
            Recorded validation runs are presented independently rather than
            being added together into a single inflated test total.
          </p>
        </div>

        <div class="validation-panel test-results-panel">

          <div class="validation-row">
            <div>
              <strong>519 / 519</strong>
              <span>Isolated & local test cases</span>
            </div>
            <span class="validation-badge verified">PASS</span>
          </div>

          <div class="validation-row">
            <div>
              <strong>135 / 135</strong>
              <span>Local E2E validation</span>
            </div>
            <span class="validation-badge verified">PASS</span>
          </div>

          <div class="validation-row">
            <div>
              <strong>8 / 8</strong>
              <span>Public relay test cases</span>
            </div>
            <span class="validation-badge verified">PASS</span>
          </div>

        </div>

        <div class="evidence-note">
          <span>EVIDENCE RULE</span>
          <p>
            These are separate test executions and are not summed.
            Technical validation does not establish customer ROI,
            conversion uplift or full production validation.
          </p>
        </div>

      </section>


      <section class="section section-border technical-stack-section">

        <div class="section-heading">
          <span class="section-kicker">TECHNICAL STACK SUMMARY</span>
          <h2>The LeadKux product surface at a glance.</h2>
          <p>
            A consolidated view of the principal product, delivery,
            persistence, security, recovery and commercial components
            identified in the current W21 DEV inventory.
          </p>
        </div>

        <div class="tech-summary-grid">

          <article>
            <span>PRODUCT</span>
            <strong>Windows Control Center</strong>
            <p>
              Local customer-facing application with onboarding,
              configuration, runtime control, diagnostics and lifecycle views.
            </p>
          </article>

          <article>
            <span>RUNTIME</span>
            <strong>API + Worker</strong>
            <p>
              Managed and standalone runtime components with process
              start, stop and recovery management.
            </p>
          </article>

          <article>
            <span>PUBLIC DELIVERY</span>
            <strong>Authenticated HTTPS Relay</strong>
            <p>
              Durable lead delivery using queue, pull, local delivery
              and acknowledgement semantics.
            </p>
          </article>

          <article>
            <span>PERSISTENCE</span>
            <strong>SQLite + PostgreSQL</strong>
            <p>
              Durable queue implementations exist for local and
              PostgreSQL-backed relay operation.
            </p>
          </article>

          <article>
            <span>CREDENTIALS</span>
            <strong>Windows Credential Store</strong>
            <p>
              Native Windows credential storage for sensitive
              customer-side configuration.
            </p>
          </article>

          <article>
            <span>LICENSING</span>
            <strong>Cryptographic Verification</strong>
            <p>
              Signed license claims, public-key verification and
              separate authority-side license issuance.
            </p>
          </article>

          <article>
            <span>UPDATES</span>
            <strong>SHA-256 Verification</strong>
            <p>
              Installer integrity verification before verified
              installer launch.
            </p>
          </article>

          <article>
            <span>RECOVERY</span>
            <strong>Backup & Restore</strong>
            <p>
              Manifest-based backup validation, artifact integrity
              checks and controlled restore workflows.
            </p>
          </article>

          <article>
            <span>OBSERVABILITY</span>
            <strong>Production Event Journal</strong>
            <p>
              Structured event validation, journaling and rotation
              for operational visibility.
            </p>
          </article>

          <article>
            <span>COMMERCE</span>
            <strong>Lemon Squeezy Integration</strong>
            <p>
              Commercial-event parsing feeds entitlement,
              fulfillment and subscription lifecycle processing.
            </p>
          </article>

          <article>
            <span>CUSTOMER LIFECYCLE</span>
            <strong>License Delivery & Recovery</strong>
            <p>
              Persistent customer delivery state, license recovery
              and recovery-audit infrastructure.
            </p>
          </article>

          <article>
            <span>RETENTION</span>
            <strong>Controlled Queue Cleanup</strong>
            <p>
              Lead and commercial queues include retention and
              probe, verify and cleanup tooling.
            </p>
          </article>

        </div>

      </section>


      <section id="api" class="section section-border">

        <div class="section-heading">
          <span class="section-kicker">PUBLIC RELAY API</span>
          <h2>7 identified FastAPI routes. Two distinct data paths.</h2>
          <p>
            The public relay separates operational lead delivery from
            commercial-event processing.
          </p>
        </div>

        <div class="api-layout">

          <div class="api-routes">

            <div class="api-route">
              <span>GET</span>
              <code>/health</code>
            </div>

            <div class="api-route">
              <span>POST</span>
              <code>/v1/leads</code>
            </div>

            <div class="api-route">
              <span>GET</span>
              <code>/v1/leads/next</code>
            </div>

            <div class="api-route">
              <span>POST</span>
              <code>/v1/leads/{receipt_id}/ack</code>
            </div>

            <div class="api-route commercial">
              <span>POST</span>
              <code>/webhooks/lemonsqueezy</code>
            </div>

            <div class="api-route commercial">
              <span>GET</span>
              <code>/v1/commercial/events/next</code>
            </div>

            <div class="api-route commercial">
              <span>POST</span>
              <code>/v1/commercial/events/{event_id}/ack</code>
            </div>

          </div>


          <div class="data-paths">

            <article>
              <span>LEAD PATH</span>

              <h3>
                Ingress → Durable Queue → Pull →
                Local Delivery → ACK
              </h3>

              <p>
                Lead delivery maintains explicit queue and acknowledgement
                state between the public relay and the local product.
              </p>
            </article>

            <article>
              <span>COMMERCIAL PATH</span>

              <h3>
                Provider Webhook → Commercial Queue →
                Private Worker → ACK
              </h3>

              <p>
                Commercial events travel through a separate processing path
                for subscription and entitlement workflows.
              </p>
            </article>

          </div>

        </div>

      </section>


      <section id="security-recovery" class="section section-border trust-section">

        <div class="section-heading">
          <span class="section-kicker">
            RELIABILITY, SECURITY & RECOVERY
          </span>

          <h2>Controls around the product lifecycle.</h2>

          <p>
            LeadKux includes dedicated controls around credentials,
            software licensing, update integrity, recovery,
            observability and durable state.
          </p>
        </div>

        <div class="trust-grid">

          <div class="trust-item">
            <strong>Native credential storage</strong>
            <span>
              Windows Credential Store integration for sensitive
              local credentials.
            </span>
          </div>

          <div class="trust-item">
            <strong>Cryptographic licensing</strong>
            <span>
              Signed license claims with product-side public-key
              verification and separate authority-side issuance.
            </span>
          </div>

          <div class="trust-item">
            <strong>SHA-256 update verification</strong>
            <span>
              Installer integrity is checked before verified launch.
            </span>
          </div>

          <div class="trust-item">
            <strong>Backup validation</strong>
            <span>
              Backup manifests and artifact integrity checks support
              controlled recovery.
            </span>
          </div>

          <div class="trust-item">
            <strong>Production observability</strong>
            <span>
              Structured event journaling includes event validation
              and rotation.
            </span>
          </div>

          <div class="trust-item">
            <strong>Queue retention</strong>
            <span>
              Lead and commercial queues include controlled retention
              and probe / verify / cleanup tooling.
            </span>
          </div>

        </div>

      </section>

      <section id="commercial-stack" class="section section-border">

        <div class="section-heading">
          <span class="section-kicker">COMMERCIAL INFRASTRUCTURE</span>
          <h2>The product lifecycle extends beyond installation.</h2>
          <p>
            LeadKux includes infrastructure for licensing, entitlement,
            fulfillment and subscription-state handling rather than treating
            commercialization as an external afterthought.
          </p>
        </div>

        <div class="capability-grid">

          <article class="capability-card">
            <div class="capability-icon">$</div>
            <h3>Commerce events</h3>
            <p>
              Lemon Squeezy event parsing feeds a dedicated commercial
              event-processing path.
            </p>
          </article>

          <article class="capability-card">
            <div class="capability-icon">✓</div>
            <h3>Entitlements</h3>
            <p>
              Commercial state can resolve product entitlement and
              fulfillment decisions.
            </p>
          </article>

          <article class="capability-card">
            <div class="capability-icon">↻</div>
            <h3>Subscription lifecycle</h3>
            <p>
              Lifecycle execution includes renewal and resumption logic
              with persistent subscription state.
            </p>
          </article>

          <article class="capability-card">
            <div class="capability-icon">✉</div>
            <h3>License delivery</h3>
            <p>
              Persistent customer delivery storage supports license
              delivery and recovery workflows.
            </p>
          </article>

          <article class="capability-card">
            <div class="capability-icon">◎</div>
            <h3>Recovery audit</h3>
            <p>
              License recovery activity has a dedicated audit surface.
            </p>
          </article>

          <article class="capability-card">
            <div class="capability-icon">⇄</div>
            <h3>Commercial relay</h3>
            <p>
              Dedicated HTTPS client and worker with SQLite and PostgreSQL
              commercial-event queue implementations.
            </p>
          </article>

        </div>

      </section>


      <section class="section section-border">

        <div class="section-heading">
          <span class="section-kicker">RUNTIME SURFACE</span>
          <h2>A deliberately small explicit Python dependency set.</h2>
          <p>
            The current requirements inventory identifies four explicit
            production Python dependencies and a focused runtime surface.
          </p>
        </div>

        <div class="dependency-grid">

          <div>
            <strong>FastAPI</strong>
            <span>0.141.1</span>
          </div>

          <div>
            <strong>Pydantic</strong>
            <span>2.13.5</span>
          </div>

          <div>
            <strong>Uvicorn</strong>
            <span>0.52.3</span>
          </div>

          <div>
            <strong>psycopg[binary]</strong>
            <span>3.3.6</span>
          </div>

        </div>

        <div class="evidence-note">
          <span>CONFIGURATION</span>
          <p>
            The current inventory identified 11 environment-variable
            references spanning runtime/API configuration, SMTP, database
            connectivity, relay authentication and business identity,
            Lemon Squeezy webhook authentication and update-manifest
            configuration.
          </p>
        </div>

      </section>


      <section class="section section-border reference-section">

        <div class="reference-label">
          VALIDATION BOUNDARY
        </div>

        <div class="reference-content">

          <div>
            <span class="reference-status">PILOT NEXT</span>
            <h2>Technical evidence is not business evidence.</h2>
          </div>

          <p>
            LeadKux does not currently claim proven customer ROI,
            proven conversion uplift, rollback-safe updates, fully validated
            provider-originated commercial production E2E, or full production
            validation before a real customer pilot.
          </p>

        </div>

      </section>


      <section id="pilot" class="section section-border pilot-section">

        <div class="pilot-card">

          <div>
            <span class="section-kicker">FOUNDING CUSTOMER PROGRAM</span>

            <h2>
              The next evidence comes from a real customer workflow.
            </h2>

            <p>
              LeadKux is seeking its first controlled customer validations
              with businesses that receive digital inquiries and want to
              evaluate the system inside a defined lead workflow.
            </p>
          </div>

          <div class="pilot-phases">

            <div>
              <span>01</span>
              <strong>Discovery</strong>
              <small>
                Map the existing lead path and identify the recovery gap.
              </small>
            </div>

            <div>
              <span>02</span>
              <strong>Controlled setup</strong>
              <small>
                Configure LeadKux around a limited integration scope.
              </small>
            </div>

            <div>
              <span>03</span>
              <strong>Live pilot</strong>
              <small>
                Introduce real workflow traffic under defined boundaries.
              </small>
            </div>

            <div>
              <span>04</span>
              <strong>Measure</strong>
              <small>
                Evaluate operational behavior and customer outcomes.
              </small>
            </div>

          </div>

          <a class="button button-primary" href="#contact">
            Become a founding customer
            <span>→</span>
          </a>

        </div>

      </section>


      <section class="section section-border about-section">

        <div class="about-grid">

          <div>
            <span class="section-kicker">ABOUT</span>

            <h2>
              LeadKux — powered by the Lead Recovery Engine.
            </h2>
          </div>

          <div class="about-copy">

            <p>
              LeadKux is an independently developed Windows-based lead-recovery
              and customer-lifecycle product spanning lead intake, durable
              relay delivery, local processing, onboarding, runtime management,
              licensing, commercial subscription lifecycle, customer license
              delivery and recovery, update delivery, backup and recovery,
              diagnostics and production observability.
            </p>

            <div class="founder">

              <div class="founder-mark">
                RB
              </div>

              <div>
                <strong>Robert Budai</strong>
                <span>Founder & Creator of LeadKux</span>
              </div>

            </div>

          </div>

        </div>

      </section>


      <section id="contact" class="section section-border contact-section">

        <div class="contact-card">

          <span class="section-kicker">EARLY ACCESS</span>

          <h2>
            Bring LeadKux into
            <span>a real lead workflow.</span>
          </h2>

          <p>
            Contact us if your business receives digital inquiries and
            you want to explore a controlled founding-customer deployment.
          </p>

          <a
            class="button button-primary button-large"
            href="mailto:contact@leadrecoverycore.com?subject=LeadKux%20Founding%20Customer"
          >
            contact@leadrecoverycore.com
            <span>↗</span>
          </a>

          <small>
            Commercial terms and integration scope are agreed before
            deployment. Real-world performance claims will follow
            real-world evidence.
          </small>

        </div>

      </section>

    </main>


    <footer class="site-footer">

      <div class="footer-brand">
        <strong>LEADKUX</strong>
        <span>Lead recovery & lifecycle automation.</span>
      </div>

      <div class="footer-meta">

        <a href="mailto:contact@leadrecoverycore.com">
          contact@leadrecoverycore.com
        </a>

        <span>© 2026 LeadKux</span>

      </div>

    </footer>

  </div>
`

const toggle = document.querySelector('.nav-toggle')
const nav = document.querySelector('.main-nav')

toggle.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true'

  toggle.setAttribute('aria-expanded', String(!isOpen))
  nav.classList.toggle('is-open', !isOpen)
})

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false')
    nav.classList.remove('is-open')
  })
})
