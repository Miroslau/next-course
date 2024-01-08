import NextAuth, { Session, SessionOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

const checkEmail = (serverUsers: IUser[], formData: IUser) => {
  return serverUsers.find((user) => user.email === formData.email);
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const { user } = session;
      const userSession = await axios
        .get(`${process.env.SERVER}/users`)
        // @ts-ignore
        .then((response) => checkEmail(response.data, user));
      if (userSession && userSession?.id) {
        // @ts-ignore
        user['id'] = userSession?.id.toString();
      }

      return session;
    },
    async signIn({ profile }) {
      try {
        const formData: IUser = {
          id: profile && profile.sub?.toString(),
          name: profile && profile?.name,
          email: profile && profile?.email,
          image: profile && profile?.image,
        };
        const userExists = await axios
          .get(`${process.env.SERVER}/users`)
          .then((response) => checkEmail(response.data, formData));
        if (!userExists) {
          await axios.post(`${process.env.SERVER}/users`, formData);
        }
        return true;
      } catch (error) {
        console.error('Sign In error: ', error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
