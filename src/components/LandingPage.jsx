import './LandingPage.css';
import AppLink from './AppLink';

export default function LandingPage() {
  return (
    <div>
      <header class="hero">
  <div class="hero-inner">
    <span class="eyebrow">not a trip planner, a trip scrapbook</span>
    <h1>Every mile, every site, <span>every story</span> — logged.</h1>
    <p class="lead">Adventure Log is where RVers and campers keep the record: where you stayed, how you got there, and the campground worth telling a friend about.</p>
    <div class="hero-links">
      <AppLink
        to="/dashboard"
        className="hero-button"
        label="Start Your Log →" />
        <a href="#features" className="app-link">Features</a>
    </div>
  </div>
  </header>
  <section className="wrap features" id="features">
    <div class="route-divider"><span class="pin"></span> what you can log <span class="pin"></span></div>
    <div className="feature-grid">
        <div className="feature">
            <div className="icon">🏕️</div>
            <h3>Campground reviews</h3>
            <p>
                Site number, dates, what the campground was like, notes on your specific site, and other sites worth trying next time.
            </p>
        </div>

        <div className="feature">
            <div className="icon">🗺️</div>
            <h3>Trip logs</h3>
            <p>
                A scrapbook of the route — best gas stations, detours, and notes leg by leg, tied to the campgrounds you stopped at.
            </p>
        </div>

        <div className="feature">
            <div className="icon">🎖️</div>
            <h3>Sticker collection</h3>
            <p>
                Earn and place a virtual sticker for every place you've been — the digital version of the decals on the back window.
            </p>
        </div>

    </div>
</section>

    </div>
    
  )
}
