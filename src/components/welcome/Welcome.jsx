export const Welcome = () => {
  return (
    <div className="container-fluid">
      <div className="card text-center w-50 mb-5 border-dark welcome-card">
        <h5 className="card-header">Welcome to</h5>
        <img
          src="../../src/assets/Logo.jpg"
          alt="Nashville Sound Spot Logo"
          className="img-logo mb-5 img-fluid"
        />

        <div className="card-body">
          <blockquote className="blockquote">
            <footer className="blockquote-footer">
              Stuff about Sound Spot
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};
