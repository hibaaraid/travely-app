import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import './ManageDestinations.css';

// IMPORT DES ICÔNES (Méthode react-icons / SVG)
import { 
  MdAddCircle, 
  MdImage, 
  MdSchedule, 
  MdGroups, 
  MdEdit, 
  MdDelete, 
  MdCloudUpload,
  MdAddLocation
} from 'react-icons/md';

const formVide = { 
  titre: '', description: '', description_longue: '', 
  prix: '', categorie: 'maroc', date_depart: '', 
  places_disponibles: '', duree: ''
};

const ManageDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [showModal, setShowModal]       = useState(false);
  const [formData, setFormData]         = useState(formVide);
  const [imageFile, setImageFile]       = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [editId, setEditId]             = useState(null);

  useEffect(() => {
    api.get('/destinations').then(res => setDestinations(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    const fd = new FormData();
    Object.entries(formData).forEach(([key, val]) => fd.append(key, val));
    if (imageFile) fd.append('image', imageFile);

    if (editId) {
      fd.append('_method', 'PUT');
      api.post(`/destinations/${editId}`, fd).then(res => {
        setDestinations(destinations.map(d => d.id === editId ? res.data : d));
        fermerModal();
      });
    } else {
      api.post('/destinations', fd).then(res => {
        setDestinations([...destinations, res.data]);
        fermerModal();
      });
    }
  };

  const handleEdit = (dest) => {
    setFormData({
      titre:               dest.titre,
      description:         dest.description        || '',
      description_longue:  dest.description_longue || '',
      prix:                dest.prix,
      categorie:           dest.categorie,
      date_depart:         dest.date_depart        || '',
      places_disponibles:  dest.places_disponibles || '',
      duree:               dest.duree              || ''
    });
    setImagePreview(dest.image || '');
    setImageFile(null);
    setEditId(dest.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Supprimer ce voyage ?")) {
      api.delete(`/destinations/${id}`).then(() => {
        setDestinations(destinations.filter(d => d.id !== id));
      });
    }
  };

  const fermerModal = () => {
    setShowModal(false);
    setFormData(formVide);
    setImageFile(null);
    setImagePreview('');
    setEditId(null);
  };

  const badgeClass = (cat) => 
    cat === 'maroc'    ? 'badge badge-maroc' : 
    cat === 'etranger' ? 'badge badge-etranger' : 
    'badge badge-package';

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="header-text">
          <h2 className="page-title">Gestion des Destinations</h2>
          <p className="page-subtitle">Catalogue des offres de voyage</p>
        </div>
        <button className="btn-add-main" onClick={() => setShowModal(true)}>
          <MdAddCircle size={22} />
          Ajouter un voyage
        </button>
      </div>

      <div className="table-card">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Aperçu</th>
              <th>Destination</th>
              <th>Prix</th>
              <th>Infos</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map(dest => (
              <tr key={dest.id}>
                <td>
                  {dest.image
                    ? <img src={`http://127.0.0.1:8000${dest.image}`} alt={dest.titre} className="table-img-large" />
                    : <div className="table-img-placeholder"><MdImage size={24} /></div>
                  }
                </td>
                <td>
                  <div className="dest-info-cell">
                    <span className="dest-name">{dest.titre}</span>
                    <span className={badgeClass(dest.categorie)}>{dest.categorie}</span>
                  </div>
                </td>
                <td className="price-text">{Number(dest.prix).toLocaleString()} DH</td>
                <td>
                  <div className="logistic-cell">
                    <span className="icon-text">
                        <MdSchedule size={18} color="#e8630a" /> {dest.duree || '—'}
                    </span>
                    <span className="icon-text">
                        <MdGroups size={18} color="#e8630a" /> {dest.places_disponibles} places
                    </span>
                  </div>
                </td>
                <td>
                  <div className="actions-btns">
                    <button className="btn-action edit" onClick={() => handleEdit(dest)}>
                      <MdEdit size={18} /> Modifier
                    </button>
                    <button className="btn-action delete" onClick={() => handleDelete(dest.id)}>
                      <MdDelete size={18} /> Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={fermerModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">
              {editId ? <MdEdit /> : <MdAddLocation />}
              {editId ? 'Modifier le voyage' : 'Nouveau voyage'}
            </h3>

            <div className="form-scroll-area">
                <div className="form-group">
                <label>Image de couverture</label>
                <div className="upload-zone" onClick={() => document.getElementById('imgInput').click()}>
                    {imagePreview
                    ? <img src={imagePreview.startsWith('blob') ? imagePreview : `http://127.0.0.1:8000${imagePreview}`} alt="preview" className="upload-preview" />
                    : <div className="upload-placeholder">
                        <MdCloudUpload size={48} color="#1a2744" />
                        <p>Cliquez pour uploader</p>
                        </div>
                    }
                </div>
                <input id="imgInput" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                </div>

                <div className="form-group">
                <label>Titre du voyage</label>
                <input name="titre" value={formData.titre} onChange={handleChange} placeholder="Ex: Safari au Kenya" />
                </div>

                {/* ... (Reste des champs identiques) ... */}
                <div className="form-row">
                    <div className="form-group">
                        <label>Prix (DH)</label>
                        <input name="prix" type="number" value={formData.prix} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Places</label>
                        <input name="places_disponibles" type="number" value={formData.places_disponibles} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Catégorie</label>
                        <select name="categorie" value={formData.categorie} onChange={handleChange}>
                            <option value="maroc">🇲🇦 Maroc</option>
                            <option value="etranger">🌍 Étranger</option>
                            <option value="package">📦 Package</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Date de départ</label>
                        <input name="date_depart" type="date" value={formData.date_depart} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-group">
                    <label>Durée</label>
                    <input name="duree" value={formData.duree} onChange={handleChange} placeholder="Ex: 7 jours / 6 nuits" />
                </div>

                <div className="form-group">
                    <label>Description courte</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="2" />
                </div>

                <div className="form-group">
                    <label>Programme détaillé</label>
                    <textarea name="description_longue" value={formData.description_longue} onChange={handleChange} rows="4" />
                </div>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={fermerModal}>Annuler</button>
              <button className="btn-save" onClick={handleSubmit}>Enregistrer le voyage</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDestinations;