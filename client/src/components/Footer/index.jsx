import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
	const location = useLocation();
	const navigate = useNavigate();
	return (
		<footer
			id="foot"
			className="w-100 bg-dark text-white">
			<div className="container text-center p-1">
				{location.pathname !== '/' && (
					<button
						className="btn btn-dark p-1"
						onClick={() => navigate(-1)}>
						&larr; Go Back
					</button>
				)}
				{/* <h4>
					Made with{' '}
					<span
						className="emoji"
						role="img"
						aria-label="heart"
						aria-hidden="false">
						💩
					</span>{' '}
				</h4> */}
				<h4>Contacts Us</h4>
				<ul className="d-flex justify-content-center list-unstyled">
					<li>
						<a
							className="px-4"
							href="https://github.com/MikeNguyen1092">
							Michael Nguyen
						</a>
					</li>
					<li>
						<a href="https://github.com/Jbyrd126">Robert Byrd</a>
					</li>
					<li>
						<a
							className="px-4"
							href="https://github.com/RobertMcDermot">
							{' '}
							Robert McDermot{' '}
						</a>
					</li>
					<li>
						<a href="https://github.com/rmac598">Ryan McIntyre</a>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
