import { Link } from 'react-router-dom';

const DestinationCard = ({ destination }) => {
    return (
        <div className="card shadow-sm h-100 border-0">
            <img src={destination.image} className="card-img-top" alt={destination.nom} style={{ height: '200px', objectFit: 'cover' }} />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title text-primary">{destination.nom}</h5>
                <h6 className="card-subtitle mb-2 text-muted"><i className="bi bi-geo-alt"></i> {destination.pays}</h6>
                <p className="card-text mb-4">À partir de <strong className="text-warning fs-5">{destination.prix} DH</strong></p>
                <Link to={`/destinations/${destination.id}`} className="btn btn-primary mt-auto">Voir les détails</Link>
            </div>
        </div>
    );
};
export default DestinationCard;