import NextAuth, { Session, SessionOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

console.log('process.env.GOOGLE_ID: ', process.env.GOOGLE_ID);
console.log('process.env.GOOGLE_SECRET: ', process.env.GOOGLE_SECRET);

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
        .get('http://localhost:3004/users')
        // @ts-ignore
        .then((response) => checkEmail(response.data, user));
      console.log('userSession: ', userSession);
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
          username: profile && profile?.name,
          email: profile && profile?.email,
          image: profile && profile?.image,
        };
        const userExists = await axios
          .get('http://localhost:3004/users')
          .then((response) => checkEmail(response.data, formData));
        if (!userExists) {
          await axios.post('http://localhost:3004/users', formData);
        }
        return true;
      } catch (error) {
        console.log('Sign In error: ', error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
