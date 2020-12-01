# Living Food Hawaii

A catering business SPA with dynamic image management, tagging and filtering.

Images are uploaded in parallel, directly to AWS S3, with serverless variant generation and delivery through AWS Lambda and CloudFront.

The gallery lightbox utilizes a novel algorithm for stateless navigation, translation and buffering, discussed in detail here: https://iambryanhaney.medium.com/a-novel-algorithm-for-stateless-navigation-transitions-and-buffering-in-image-galleries-a16bbd48e0e6?sk=7f27d148261528440caa1111c40fa024

Demo video:  
[![LFH Demo](https://img.youtube.com/vi/vMz2zJ2T32w/0.jpg)](https://youtu.be/vMz2zJ2T32w "LFH Demo")

To run, clone locally, switch to the frontend directory and enter `npm i` followed by `npm start`, then switch to the backend directory and run `rails s -p 3001`.

