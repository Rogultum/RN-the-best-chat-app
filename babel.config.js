/* eslint-disable func-names */
// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: ['react-native-paper/babel'],
//     env: {
//       production: {
//         plugins: ['react-native-reanimated/plugin'],
//       },
//     },
//   };
// };

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-paper/babel', 'react-native-reanimated/plugin'],
  };
};
