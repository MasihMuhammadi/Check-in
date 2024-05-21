import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        gradientPrimary: " linear-gradient(to right, #1e1e1e,80%, #064F97)",
        testImage:
          "url('https://aseel-medusa.s3.us-east-1.amazonaws.com/images/file_01HR3KVAG0C5550CAY3NHHZTGF.png')",
      },
      colors: {
        primary: "#1e1e1e",
        secondary: "#1e1e1ede"
      },
      padding: {
        laptopScreen: "0px 50px",
        IpadScreen: "25px",
        mobileScreen: "20px",
      },
      borderColor: {
        primary: "#1e1e1e",
      },
    },
  },
  plugins: [],
};
export default config;
