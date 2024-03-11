import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
	const location = useLocation();
	const navigate = useNavigate();
	return (
		<footer className="w-100 fixed-bottom bg-dark text-white p-1 style={{ minHeight: '50px',  }}">
			<div className="container text-center mb-1">
				{location.pathname !== '/' && (
					<button
						className="btn btn-dark mb-3"
						onClick={() => navigate(-1)}>
						&larr; Go Back
					</button>
				)}
				<h4>
					Made with{' '}
					<span
						className="emoji"
						role="img"
						aria-label="heart"
						aria-hidden="false">
						💩
					</span>{' '}
				</h4>
			</div>
		</footer>
	);
};

export default Footer;
