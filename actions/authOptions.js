import { connectDB } from "@/config/database";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";

/*
    Google OAuth authentication options -> used in [...nextauth].js
    to configure the Google authentication provider
    and specify client ID and secret from environment variables
    Also includes authorization parameters to ensure user consent
    and offline access for refresh tokens
    This setup is essential for enabling Google login functionality
    in a Next.js application using NextAuth.js
    and for managing user sessions securely.
    The authOptions object is exported for use in the NextAuth.js configuration.
    https://next-auth.js.org/configuration/providers/oauth
    GoogleProvider is a function that takes an object with clientId and clientSecret
    and returns a provider configuration for Google OAuth authentication.
*/
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // when we click on login it will show google account selection every time
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // naming convention is only NEXTAUTH_SECRET won't work if different name is used
  callbacks: {
    async signIn({ profile }) {
      try {
        // 1. Connect to the database
        await connectDB();
        // 2. Check if user exists
        const userExists = await User.findOne({ email: profile.email });
        // 3. If not, create a new user
        if (!userExists) {
          // Truncate name if it's too long
          const username =
            profile.name.length > 20
              ? profile.name.substring(0, 20)
              : profile.name;
          await User.create({
            email: profile.email,
            username,
            image: profile.picture,
          });
        }
        // 4. Return true or false based on success or failure
        return true;
      } catch (error) {
        console.log("Error in signIn callback:", error);
        return false;
      }
    },
    async session({ session }) {
      try {
        // 1. Get the user from the database
        const user = await User.findOne({ email: session.user.email });
        // 2. Assign the user to the session
        session.user.id = user._id.toString();
        // 3. Return the session
        return session;
      } catch (error) {
        console.log("Error in session callback:", error);
        return session;
      }
    },
  },
};
