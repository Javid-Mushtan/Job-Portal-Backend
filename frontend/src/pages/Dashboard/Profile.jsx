import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { getCurrentUser, updateProfile, uploadProfilePicture, uploadResume } from '../../api/users.js';
import StateCard from '../../components/common/StateCard.jsx';

const defaultForm = {
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  country: '',
  zipCode: '',
  bio: '',
};

const Profile = () => {
  const { updateUser } = useAuth();
  const { data: profile, loading, error, execute, setData } = useAsync(getCurrentUser, [], { initialValue: null });
  const [form, setForm] = useState(defaultForm);
  const [status, setStatus] = useState({ saving: false, message: null, error: null });
  const [assetLinks, setAssetLinks] = useState({ resumeUrl: '', profilePictureUrl: '' });
  const [assetStatus, setAssetStatus] = useState({ type: null, loading: false, message: null, error: null });

  useEffect(() => {
    if (profile) {
      setForm({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        country: profile.country || '',
        zipCode: profile.zipCode || '',
        bio: profile.bio || '',
      });
      setAssetLinks({
        resumeUrl: profile.resume || '',
        profilePictureUrl: profile.profilePicture || '',
      });
    }
  }, [profile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ saving: true, message: null, error: null });
    try {
      const updated = await updateProfile(form);
      setStatus({ saving: false, message: 'Profile updated', error: null });
      setData(updated);
      updateUser(updated);
    } catch (err) {
      setStatus({ saving: false, message: null, error: err.message || 'Failed to update profile' });
    }
  };

  const handleAssetUpdate = async (type) => {
    if (!assetLinks[type]) {
      setAssetStatus({ type, loading: false, error: 'Please provide a URL', message: null });
      return;
    }
    setAssetStatus({ type, loading: true, message: null, error: null });
    try {
      if (type === 'resumeUrl') {
        await uploadResume(assetLinks.resumeUrl);
      } else {
        await uploadProfilePicture(assetLinks.profilePictureUrl);
      }
      setAssetStatus({ type, loading: false, message: `${type === 'resumeUrl' ? 'Resume' : 'Avatar'} updated`, error: null });
      execute();
    } catch (err) {
      setAssetStatus({ type, loading: false, message: null, error: err.message });
    }
  };

  if (loading) {
    return <div className="skeleton" style={{ minHeight: '240px' }} />;
  }

  if (error) {
    return <StateCard icon="⚠️" title="Unable to load profile" description={error.message} action={<button type="button" className="btn btn-primary" onClick={execute}>Retry</button>} />;
  }

  return (
    <div className="profile-page">
      <section className="card profile-card">
        <header>
          <p className="pill">Profile</p>
          <h2>Personal information</h2>
          <p className="muted">Keep your details updated to receive better recommendations.</p>
        </header>

        <form className="grid" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              <span>First name</span>
              <input className="input" name="firstName" value={form.firstName} onChange={handleChange} required />
            </label>
            <label>
              <span>Last name</span>
              <input className="input" name="lastName" value={form.lastName} onChange={handleChange} required />
            </label>
          </div>

          <label>
            <span>Phone</span>
            <input className="input" name="phone" value={form.phone} onChange={handleChange} />
          </label>

          <label>
            <span>Address</span>
            <input className="input" name="address" value={form.address} onChange={handleChange} />
          </label>

          <div className="form-grid">
            <label>
              <span>City</span>
              <input className="input" name="city" value={form.city} onChange={handleChange} />
            </label>
            <label>
              <span>State</span>
              <input className="input" name="state" value={form.state} onChange={handleChange} />
            </label>
          </div>

          <div className="form-grid">
            <label>
              <span>Country</span>
              <input className="input" name="country" value={form.country} onChange={handleChange} />
            </label>
            <label>
              <span>ZIP code</span>
              <input className="input" name="zipCode" value={form.zipCode} onChange={handleChange} />
            </label>
          </div>

          <label>
            <span>Bio</span>
            <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Tell us about your focus"></textarea>
          </label>

          {status.error && <p className="error-text">{status.error}</p>}
          {status.message && <p className="success-text">{status.message}</p>}

          <button type="submit" className="btn btn-primary" disabled={status.saving}>
            {status.saving ? 'Saving...' : 'Save changes'}
          </button>
        </form>
      </section>

      <section className="card asset-card">
        <h3>Career assets</h3>
        <div className="form-grid">
          <label>
            <span>Resume URL</span>
            <input
              className="input"
              name="resumeUrl"
              value={assetLinks.resumeUrl}
              onChange={(event) => setAssetLinks((prev) => ({ ...prev, resumeUrl: event.target.value }))}
            />
          </label>
          <button type="button" className="btn btn-ghost" disabled={assetStatus.loading && assetStatus.type === 'resumeUrl'} onClick={() => handleAssetUpdate('resumeUrl')}>
            {assetStatus.loading && assetStatus.type === 'resumeUrl' ? 'Updating...' : 'Update resume'}
          </button>
        </div>

        <div className="form-grid">
          <label>
            <span>Profile picture URL</span>
            <input
              className="input"
              name="profilePictureUrl"
              value={assetLinks.profilePictureUrl}
              onChange={(event) => setAssetLinks((prev) => ({ ...prev, profilePictureUrl: event.target.value }))}
            />
          </label>
          <button type="button" className="btn btn-ghost" disabled={assetStatus.loading && assetStatus.type === 'profilePictureUrl'} onClick={() => handleAssetUpdate('profilePictureUrl')}>
            {assetStatus.loading && assetStatus.type === 'profilePictureUrl' ? 'Updating...' : 'Update avatar'}
          </button>
        </div>

        {assetStatus.error && <p className="error-text">{assetStatus.error}</p>}
        {assetStatus.message && <p className="success-text">{assetStatus.message}</p>}
      </section>
    </div>
  );
};

export default Profile;
