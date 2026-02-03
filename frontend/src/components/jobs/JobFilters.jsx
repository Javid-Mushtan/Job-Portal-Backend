import { useState } from 'react';

const defaultFilters = {
  title: '',
  location: '',
  type: '',
  minSalary: '',
};

const jobTypes = ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'FREELANCE'];

const JobFilters = ({ onApply }) => {
  const [filters, setFilters] = useState(defaultFilters);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onApply?.(filters);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    onApply?.(defaultFilters);
  };

  return (
    <form className="job-filters card" onSubmit={handleSubmit}>
      <div className="filters-grid">
        <label>
          <span>Keyword</span>
          <input className="input" name="title" placeholder="Search roles" value={filters.title} onChange={handleChange} />
        </label>
        <label>
          <span>Location</span>
          <input className="input" name="location" placeholder="City or country" value={filters.location} onChange={handleChange} />
        </label>
        <label>
          <span>Type</span>
          <select name="type" value={filters.type} onChange={handleChange}>
            <option value="">Any</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type.replace('_', ' ')}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Minimum salary ($)</span>
          <input className="input" name="minSalary" type="number" min="0" value={filters.minSalary} onChange={handleChange} />
        </label>
      </div>
      <div className="filters-actions">
        <button type="button" className="btn btn-ghost" onClick={handleReset}>
          Reset filters
        </button>
        <button type="submit" className="btn btn-primary">
          Find jobs
        </button>
      </div>
    </form>
  );
};

export default JobFilters;
