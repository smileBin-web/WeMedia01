
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  proxy: {
    '/hk': {
      secure: false,
      changeOrigin: true,
      // target: 'https://itunes.apple.com',
      target: 'https://localhost:8000',
    }
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'WeMedia01',
      dll: true,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      }
    }],
  ],
}
