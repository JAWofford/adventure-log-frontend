import './LandingPage.css';
import AppLink from './AppLink';
import landingImage from '../assets/landing-page-image.png';

export default function LandingPage() {
    return (
        <div>
            <div className="hero">
                <div className="hero-inner">
                    <span className="eyebrow">not a trip planner, a trip scrapbook</span>
                    <h1>Every mile, every site, <span>every story</span> — logged.</h1>
                    <p className="lead">Adventure Log is where RVers and campers keep the record: where you stayed, how you got there, and the campground worth telling a friend about.</p>
                    <div className="hero-links">
                        <AppLink
                            to="/register"
                            className="hero-button"
                            label="Start Your Log →" />
                        <a href="#features" className="app-link">Features</a>
                    </div>
                </div>
                <div className="hero-image-wrap">
                <img className="landing-image" src={landingImage} alt="Clipart image of rolling hills and a river with a motorhome traveling down the highway." />
                </div>
            </div>
            <section className="wrap features" id="features">
                <div className="route-divider"><span className="pin"></span> what you can log <span className="pin"></span></div>
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
