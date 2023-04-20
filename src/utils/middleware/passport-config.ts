// @ts-nocheck
import logger from "../logger/winston";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import { userModel, User } from "../../model/users";

function isValidPassword(user: User, password: string) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

export const passLog = new Strategy(
  (username: string, password: string, done: Function) => {
    userModel.findOne({ username }, (err: Error, user: User) => {
      if (err) return done(err);

      if (!user) {
        logger.warn("User Not Found with username " + username);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        logger.error("Invalid Password");
        return done(null, false);
      }

      return done(null, user);
    });
  }
);

export const passSign = new Strategy(
  {
    passReqToCallback: true,
  },
  (req: Request, username: string, password: string, done: Function) => {
    userModel.findOne({ username: username }, (err: Error, user: User) => {
      if (err) {
        logger.error("Error in SignUp: " + err);
        return done(err);
      }

      if (user) {
        logger.warn("User already exists");
        return done(null, false);
      }

      const newUser: User = {
        username: username,
        password: createHash(password),
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        address: req.body.address,
        number: req.body.number,
        avatar: req.body.avatar,
      };

      userModel.create(newUser, (err: Error, userWithId: User) => {
        if (err) {
          logger.error("Error in Saving user: " + err);
          return done(err);
        }

        logger.info("Username sign up: " + newUser.username);
        logger.info("User Registration succesful");
        return done(null, userWithId);
      });
    });
  }
);

passport.serializeUser((user: User, done): any => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  userModel.findById(id, done);
});

// const LocalStrategy = passportLocal.Strategy;

export default passport;
