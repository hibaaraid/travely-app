const HeroSection = () => {
    return (
        <div className="bg-primary text-white text-center py-5 mb-5" style={{ background: 'linear-gradient(to right, #004AAD, #007BFF)' }}>
            <div className="container py-5">
                <h1 className="display-4 fw-bold">Explorez le monde avec Travely</h1>
                <p className="lead mb-4">Trouvez la destination de vos rêves au meilleur prix.</p>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="input-group input-group-lg">
                            <input type="text" className="form-control" placeholder="Où voulez-vous aller ?" />
                            <button className="btn btn-warning" type="button">Rechercher</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HeroSection;