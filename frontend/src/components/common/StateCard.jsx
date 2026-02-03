const StateCard = ({ icon = 'ℹ️', title, description, action }) => (
  <div className="state-card card">
    <div className="state-card-icon">{icon}</div>
    <div>
      <h4>{title}</h4>
      {description && <p className="muted">{description}</p>}
    </div>
    {action}
  </div>
);

export default StateCard;
