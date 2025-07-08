export const baseURL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3001/';
// export const baseURL = 'http://localhost:3001/';

const apiRoutes = {
  firebaseGoogleloginURL: '/api/auth/firebase-google',
  usersURL: '/api/users',
  paymentURL: '/api/payment',
  projectsURL: '/api/projects',
  proposalURL: '/api/proposal',
  uploadPhotoURL: '/api/upload/file',
  homeURL: '/api/home',
  gerUserCollectURL: '/api/collect/:userId',
  collectURL: '/api/collect',
};

export default apiRoutes;
