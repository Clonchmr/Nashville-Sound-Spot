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
              Welcome to Nashville Sound Spot! Your go-to hub for discovering
              the best live music in Music City. Whether you're a fan looking to
              catch your favorite band or an artist wanting to share your
              upcoming shows, you've come to the right place. Connect, explore,
              and stay in the loop with all things music in Nashville—where the
              sound never stops!
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};
