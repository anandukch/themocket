import { OAuth2Client, TokenPayload } from "google-auth-library";
import UserService from "./user.service";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } from "@/utils/variables";
import { isEmpty } from "class-validator";
import ErrorHandler from "@/utils/error";

export default class AuthService {
  private oauth2Client: OAuth2Client;
  constructor(private userService: UserService) {
    this.oauth2Client = new OAuth2Client(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI
    );
  }

  public getUrl = () => {
    const url = this.oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["profile", "email"],
    });
    return url;
  };

  public getGoogleAccountFromCode = async (code: string): Promise<TokenPayload | undefined> => {
    const { tokens } = await this.oauth2Client.getToken(code);

    this.oauth2Client.setCredentials(tokens);
    if (!tokens.id_token) {
      throw new Error("No ID token found");
    }
    const googleUser = await this.oauth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: GOOGLE_CLIENT_ID,
    });

    return googleUser.getPayload();
  };

  //   public async logout(userData: User): Promise<User> {
  //     if (isEmpty(userData)) throw new ErrorHandler(400, "You're not userData");

  //     const findUser: User = await this.userService.findOne({
  //       email: userData.email,
  //       password: userData.password,
  //     });
  //     if (!findUser) throw new ErrorHandler(409, `You're email ${userData.email} not found`);

  //     return findUser;
  //   }

  async createGoogleUser(userPayload?: TokenPayload) {
    if (!userPayload) {
      throw new ErrorHandler(400, "You're not userData");
    }
    return this.userService.createGoogleUser(userPayload);
  }
}
