import passportJWT from 'passport-jwt';
import config from './config';

const ExtractJWT = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

// TODO: JWT token has no expiration time, should update this to add an expiration date, either hard-coded or through an env variable
const strategy = new JwtStrategy(
	{
		jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('jwt'),
		secretOrKey: config.jwtSecretKey
	},
	(token, done) => {
		if (token) {
			done(null, { _id: token._id });
		} else {
			done(null, false);
		}
	}
);

export default strategy;
