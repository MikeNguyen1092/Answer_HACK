import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
	const location = useLocation();
	const navigate = useNavigate();
	return (
		<footer id="foot" className="w-100 bg-dark text-white p-1">
			<div className="container text-center p-4">
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
