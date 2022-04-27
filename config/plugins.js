module.exports = ({ env }) => ({
  graphql: {
    depthLimit: 10,
    amountLimit: 500,
  },
  upload: {
    provider: 'matrix',
    providerOptions: {
      resolvers: [
        // ImageKit
        // Images, videos
        {
          id: 'images',
          test: {
            ext: ['png', 'jpg', 'jpeg', 'svg', 'webp', 'gif', 'tif', 'mp4', 'webm', 'mov', 'swf', 'pdf'],
          },
          use: {
            provider: "imagekit",
            providerOptions: {
              publicKey: env("IMAGEKIT_PUBLIC_KEY"),
              privateKey: env("IMAGEKIT_PRIVATE_KEY"),
              urlEndpoint: env("IMAGEKIT_URL"),
              params: {
                folder: env("IMAGEKIT_FOLDER"),
              }
            }
          }
        },
        // AWS S3
        // Fallback
        {
          id: 'misc',
          test: '*',
          use: {
            provider: 'aws-s3',
            providerOptions: {
              accessKeyId: env('AWS_ACCESS_KEY_ID'),
              secretAccessKey: env('AWS_ACCESS_SECRET'),
              endpoint: env('AWS_ENDPOINT'),
              params: {
                Bucket: env('AWS_BUCKET'),
              },
            }
          },
        },
      ]
    },
  }
});
