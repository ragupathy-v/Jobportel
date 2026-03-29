import { useNavigate } from "react-router-dom";
import "../Styles/TopCompany.css";

function TopCompanies() {
  const navigate = useNavigate();

  const companies = [
    {
      name: "TCS",
      logo: "🏢",
      jobs: "120 Jobs",
      link: "https://www.tcs.com/careers"
    },
    {
      name: "Infosys",
      logo: "💼",
      jobs: "95 Jobs",
      link: "https://careers.infosys.com"
    },
    {
      name: "Wipro",
      logo: "⚡",
      jobs: "80 Jobs",
      link: "https://careers.wipro.com"
    },
    {
      name: "HCL",
      logo: "🚀",
      jobs: "60 Jobs",
      link: "https://www.hcltech.com/careers"
    },
    {
      name: "Accenture",
      logo: "🎯",
      jobs: "140 Jobs",
      link: "https://www.accenture.com/in-en/careers"
    },
    {
      name: "Zoho",
      logo: "📊",
      jobs: "45 Jobs",
      link: "https://careers.zoho.com"
    }
  ];

  const searchCompany = (company) => {
    navigate(`/jobs?company=${company}`);
  };

  return (
    <section className="section">
      <div className="section-header">
        <div className="section-label">Top Employers</div>
        <h2 className="section-title">Top Companies Hiring Now</h2>
        <p className="section-sub">
          Explore opportunities from leading companies
        </p>
      </div>

      <div className="companies-grid">
        {companies.map((company) => (
          <div className="company-card" key={company.name}>
            <div className="company-logo-big">
              {company.logo}
            </div>

            <div className="company-name">
              {company.name}
            </div>

            <div className="company-jobs-count">
              {company.jobs}
            </div>

            <div className="company-actions">
              <button
                className="company-search"
                onClick={() => searchCompany(company.name)}
              >
                View Jobs
              </button>

              <a
                href={company.link}
                target="_blank"
                rel="noreferrer"
                className="company-visit"
              >
                Visit
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopCompanies;