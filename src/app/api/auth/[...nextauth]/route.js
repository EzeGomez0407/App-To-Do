import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackUrl: process.env.NEXT_PUBLIC,
      returnTo: "/",
    }),
    Credentials({
      name: "credentials",
      async authorize(credentials, req) {
        console.log("URL BASE************ : ", process.env.NEXT_PUBLIC);
        const { error, user } = await (
          await fetch(process.env.NEXT_PUBLIC + "/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })
        ).json();

        if (error) {
          console.log(error);
          throw new Error(error);
        }
        return {
          id: user.id,
          name: user.username,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Personaliza la redirección después del inicio de sesión
      const { name, email, image } = user;
      if (email) {
        if (account.provider === "google") {
          const userExist = await (
            await fetch(`${process.env.NEXT_PUBLIC}/api/user`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            })
          ).json();

          if (!userExist.length) {
            const userExist = await (
              await fetch(`${process.env.NEXT_PUBLIC}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  username: name,
                  email,
                  image,
                  provider: "google",
                }),
              })
            ).json();
          }
          return true;
        } else if (account.provider === "credentials") {
          return true;
        }
        // Redirige al usuario a una página específica después del inicio de sesión
      }
    },

    async jwt({ token, account, user }) {
      token.accessToken = account?.access_token;
      token.image = user?.image ?? token.picture;
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token?.id,
        name: token.name,
        email: token.email,
        image: token.image,
      };
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
