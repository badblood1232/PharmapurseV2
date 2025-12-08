import './home.css'

function Home() {
  return (
    <div className="home">
      <header className="hero">
        <div className="hero__text">
          <p className="eyebrow">Trusted community pharmacy</p>
          <h1>PharmaPurse Pharmacy</h1>
          <p className="lede">
            Your neighborhood partner for prescriptions, wellness advice, and
            everyday health essentials. We combine expert pharmacists with
            convenient services to keep you feeling your best.
          </p>
          <div className="hero__cta">
            <button className="btn primary">Refill a prescription</button>
            <button className="btn ghost">Talk with a pharmacist</button>
          </div>
        </div>
        <div className="hero__card">
          <h3>Services at a glance</h3>
          <ul>
            <li>Prescription refills and transfers</li>
            <li>Free medication consultations</li>
            <li>Immunizations and travel vaccines</li>
            <li>Wellness products and health monitoring</li>
          </ul>
        </div>
      </header>

      <section className="about">
        <div>
          <h2>Why patients choose us</h2>
          <p>
            We make pharmacy care personal. Our licensed pharmacists review
            every order, suggest cost-saving options, and coordinate with your
            providers so you can focus on getting better.
          </p>
          <div className="pillars">
            <div className="card">
              <h4>Expert guidance</h4>
              <p>
                Clear answers about medications, side effects, and how to stay
                on track with your treatment plan.
              </p>
            </div>
            <div className="card">
              <h4>Fast, reliable service</h4>
              <p>
                Refill reminders, quick processing, and options for pickup or
                delivery that fit your schedule.
              </p>
            </div>
            <div className="card">
              <h4>Wellness focus</h4>
              <p>
                Vitamins, supplements, and health essentials curated to support
                everyday wellness for the whole family.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

