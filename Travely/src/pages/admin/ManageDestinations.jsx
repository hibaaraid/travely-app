import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import './ManageDestinations.css';

const formVide = { titre: '', description: '', prix: '', categorie: 'maroc', date_depart: '', places_disponibles: '' };

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
    // Utiliser FormData pour envoyer fichier + champs texte
    const fd = new FormData();
    Object.entries(formData).forEach(([key, val]) => fd.append(key, val));
    if (imageFile) fd.append('image', imageFile);

    if (editId) {
      fd.append('_method', 'PUT'); // Laravel method spoofing
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
      titre: dest.titre, description: dest.description || '',
      prix: dest.prix, categorie: dest.categorie,
      date_depart: dest.date_depart || '', places_disponibles: dest.places_disponibles || ''
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

  const badgeClass  = (cat) => cat === 'maroc' ? 'badge badge-maroc' : cat === 'etranger' ? 'badge badge-etranger' : 'badge badge-package';

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2 className="page-title">Gestion des destinations</h2>
        <button className="btn-add" onClick={() => setShowModal(true)}>+ Ajouter un voyage</button>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Image</th><th>Titre</th><th>Catégorie</th><th>Prix</th><th>Places</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {destinations.map(dest => (
              <tr key={dest.id}>
                <td>
                  {dest.image
                    ? <img src={`http://127.0.0.1:8000${dest.image}`} alt={dest.titre} className="table-img" />
                    : <div className="table-img-placeholder">?</div>
                  }
                </td>
                <td>{dest.titre}</td>
                <td><span className={badgeClass(dest.categorie)}>{dest.categorie}</span></td>
                <td>{Number(dest.prix).toLocaleString()} DH</td>
                <td>{dest.places_disponibles}</td>
                <td>
                  <div className="actions">
                    <button className="btn-edit" onClick={() => handleEdit(dest)}>Modifier</button>
                    <button className="btn-del" onClick={() => handleDelete(dest.id)}>Supprimer</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={fermerModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">{editId ? 'Modifier le voyage' : 'Ajouter un voyage'}</h3>

            {/* Upload Image */}
            <div className="form-group">
              <label>Image du voyage</label>
              <div className="upload-zone" onClick={() => document.getElementById('imgInput').click()}>
                {imagePreview
                  ? <img src={imagePreview.startsWith('blob') ? imagePreview : `http://127.0.0.1:8000${imagePreview}`} alt="preview" className="upload-preview" />
                  : <div className="upload-placeholder">📷 Cliquer pour choisir une image</div>
                }
              </div>
              <input id="imgInput" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            </div>

            <div className="form-group">
              <label>Titre</label>
              <input name="titre" value={formData.titre} onChange={handleChange} placeholder="Ex: Marrakech Express" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Prix (DH)</label>
                <input name="prix" type="number" value={formData.prix} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Places disponibles</label>
                <input name="places_disponibles" type="number" value={formData.places_disponibles} onChange={handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Catégorie</label>
                <select name="categorie" value={formData.categorie} onChange={handleChange}>
                  <option value="maroc">Maroc</option>
                  <option value="etranger">Étranger</option>
                  <option value="package">Package</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date de départ</label>
                <input name="date_depart" type="date" value={formData.date_depart} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="3" />
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={fermerModal}>Annuler</button>
              <button className="btn-save" onClick={handleSubmit}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDestinations;