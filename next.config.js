/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/warnings",
  ],
  rules: {
    "import/order": [
      "error",
      {
        groups: [["builtin", "external"]],
        "newlines-between": "always",
      },
    ],
  },
};

// module.exports =
//   nextConfig &
//   {
//     async redirects() {
//       return [
//         {
//           source: "/signin",
//           destination: "/dashboard",
//           permanent: false,
//         },
//       ];
//     },
//   };
