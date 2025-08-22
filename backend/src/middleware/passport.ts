import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import ClientRepository from '../repositories/client.repository';
import HotelierRepository from '../repositories/hotelier.repository';

const clientRepository = new ClientRepository();
const hotelierRepository = new HotelierRepository();

passport.use('client-local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  try {
    //trocar os dois campos por usuário ou senha incorreta
    const client = await clientRepository.findClientByUsername(username);
    if (!client) {
      return done(null, false, { message: 'Usuário não Cadastrado' });
    }

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return done(null, false, { message: 'Senha Incorreta' });
    }

    return done(null, client);
  } catch (err) {
    return done(err);
  }
}));

passport.use('hotelier-local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  try {
    const hotelier = await hotelierRepository.findHotelierByUsername(username);
    if (!hotelier) {
      return done(null, false, { message: 'Usuário não Cadastrado' });
    }

    const isMatch = await bcrypt.compare(password, hotelier.password);
    if (!isMatch) {
      return done(null, false, { message: 'Senha Incorreta' });
    }

    return done(null, hotelier);
  } catch (err) {
    return done(err);
  }
}));

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET!,
};

passport.use('client-jwt', new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const client = await clientRepository.findClientById(jwt_payload.id);
    if (client) {
      return done(null, client);
    }
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
}));

passport.use('hotelier-jwt', new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const hotelier = await hotelierRepository.findHotelierById(jwt_payload.id);
    if (hotelier) {
      return done(null, hotelier);
    }
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
}));

export default passport;
