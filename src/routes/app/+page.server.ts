// import { auth } from '$lib/server/auth-config';
// import { fail, redirect } from '@sveltejs/kit';
// import type { Actions, PageServerLoad } from './$types';
//
// export const load: PageServerLoad = async (event) => {
//    if (!event.locals.user) {
//       return redirect(302, '/auth/login');
//    }
//    return { user: event.locals.user };
// };
//
// export const actions: Actions = {
//    logout: async (event) => {
//       if (!event.locals.session) {
//          return fail(401);
//       }
//
//       try {
//          await auth.api.signOut({
//             headers: event.request.headers
//          });
//       } catch (error) {
//          console.error('Logout error:', error);
//          return fail(500, { message: 'Failed to sign out' });
//       }
//
//       return redirect(302, '/auth/login');
//    }
// };
