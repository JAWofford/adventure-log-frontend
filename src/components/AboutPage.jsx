import { Link } from 'react-router-dom';
import aboutImage from '../assets/about-page-image.jpeg';
import './AboutPage.css';

export default function AboutPage() {
    return (
        <div className="wrap">
            <div className="page-head">
                <h1>About Adventure Log</h1>
                <div className="head-display">
                    <div>
                    <p>The story behind the scrapbook.</p>
                    <p>As RVers ourselves we know what it's like to research a trip
                        whether it's cross country or just a weekend trip a few hours away.
                        Maybe like you we have friends who also camp and RV and just enjoy the
                        outdoors.  It's great to get information from online but getting it directly
                        from people we know carries a lot more weight. We also wanted a way to keep track
                        of that great campsite we stayed in with all the great shade right on the lake.
                    </p>
                    </div>
                    <img className="about-image" src={aboutImage} alt="A couple standing in front of a motorhome." />
                </div>
            </div>


            <div className="about-content">
                <section className="about-section">
                    <h2>What it does</h2>
                    <p>
                        Adventure Log is a place for RV and camper owners to keep a
                        running scrapbook of their trips. Instead of scattered notes
                        and photos across a phone, every trip gets logged as a single
                        record — the route you took, the legs along the way, and the
                        campgrounds you stayed at — so future-you (or your next trip's
                        planning self) has something real to look back on. The best part is that
                        now all this information can easily be shared with friends. Users can get
                        advice on their next trip from people they trust.
                    </p>
                </section>

                <section className="about-section">
                    <h2>Core features</h2>
                    <ul>
                        <li>
                            <strong>Trip Logs</strong> — record a trip with a name, dates,
                            and description, then break it down into route legs: the
                            individual stretches of driving, each with its own title and
                            notes (best gas station, route quirks, anything worth
                            remembering next time).
                        </li>
                        <li>
                            <strong>Campground Reviews</strong> — log a campground once,
                            then attach multiple stays to it over time — the site number,
                            the date, and notes about that specific visit — so a single
                            campground's history builds up the more you return.
                        </li>
                        <li>
                            <strong>Public or private</strong> — every trip log and
                            campground review can be marked public or private, giving you
                            control over what's just for your own record and what's
                            shareable.
                        </li>
                    </ul>
                </section>

                <section className="about-section">
                    <h2>Built with</h2>
                    <p>
                        The frontend is built in React, talking to a Spring Boot and
                        Java backend, with a MySQL database storing everything behind
                        the scenes. Authentication is handled with session-based login
                        through Spring Security.
                    </p>
                </section>

                <Link to="/" className="back-link">← Back to Home</Link>
            </div>
        </div>
    );
}