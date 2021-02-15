import VueRouter from "vue-router";
import Index from './components/index';
import playoffsComponent from './components/playoffs';
import calendarComponent from './components/calendar';
import covidomponent from './components/covid';
import rulesComponent from'./components/rules';
import ratingsComponent from'./components/ratings';
import loginComponent from './components/users/login';
import signUpcomponent from './components/users/signup';
import verifyEmailComponent from './components/users/verifyEmail';
import forgetPasswordComponent from './components/users/forgetPassword';
import resetPasswordComponent from './components/users/resetPassword';

import acountsEvents from './components/accounts_dashboard/events';
import acountsEventDetail from './components/accounts_dashboard/event_details';
import accountResetPassword from './components/accounts_dashboard/reset-password';
import accountProfileSettings from './components/accounts_dashboard/profile-settings';


import accountMatches from './components/accounts_dashboard/matches';
import accountChallengs from './components/accounts_dashboard/challenges';
import accountProposals from './components/accounts_dashboard/proposals';
import accountAddMatch from './components/accounts_dashboard/addmatch';
import accountRankings from './components/accounts_dashboard/rankings';
import accountMatch from './components/accounts_dashboard/match';
import accountSupport from './components/accounts_dashboard/support';

import adminSocials from './components/admin/social_links';
import adminAddUpdateSocials from './components/admin/addUpdateSocial_links';
import adminSeasons from './components/admin/seasons';
import adminAddUpdateSeasons from './components/admin/addUpdateSeasons';
import cleancloud from './components/cleancloud';
import adminResetPassword from './components/admin/reset-password';
import adminProfileSettings from './components/admin/profile-settings';
import listUsers from './components/admin/users';
import updateUserPassword from './components/admin/updateUserPassword';
import updateUserSeason from'./components/admin/updateUserSeason';

import { isLoggedIn, isloginAdmin } from "./utils/auth";
const routes = [
    {
        path: "/",
        name: "home",
        component: Index,
        meta: {
            NoLoginRequired: false,
        }
    },
    {
        path: "/clean-cloud",
        name: "clean",
        component: cleancloud,
        meta: {
            NoLoginRequired: false,
        }
    },
    {
        path: "/signup",
        name: "signup",
        component: signUpcomponent,
        meta: {
            NoLoginRequired: false,
        }
    },
    {
        path: "/verify-email-address/:id",
        name: "verify-email-address",
        component: verifyEmailComponent,
        meta: {
            NoLoginRequired: false,
        }
    },
    {
        path: "/login",
        name: "login",
        component: loginComponent,
        meta: {
            NoLoginRequired: false,
        }
    },
    {
        path: "/forget-password",
        name: "forget-password",
        component: forgetPasswordComponent,
        meta: {
            NoLoginRequired: false,
        }
    },
    {
        path: "/forget-password-reset/:id",
        name: "forget-password-reset",
        component: resetPasswordComponent,
        meta: {
            NoLoginRequired: false,
        }
    },
    {
        path:'/playoffs',
        name:'playoffs',
        component:playoffsComponent,
        meta: {
            NoLoginRequired: false,
        }
    },
    {
        path:'/calendar',
        name:'calendar',
        component:calendarComponent,
        meta: {
            NoLoginRequired: false,
        }
    },
    {
        path:'/covid',
        name:'covid',
        component:covidomponent,
        meta: {
            NoLoginRequired: false,
        }
    },
    {
        path:'/rules',
        name:'rules',
        component:rulesComponent,
        meta: {
            NoLoginRequired: false,
        }
    },
    {
        path:'/ratings',
        name:'ratings',
        component:ratingsComponent,
        meta: {
            NoLoginRequired: false,
        }
    },
    {
        path: "/account/events/:season",
        name: "account-events",
        component: acountsEvents,
        meta: {
            NoLoginRequired: false,
            UserLoginRequired: true,
            AdminLoginRequired: false
        },
        reuse: true
    },
    {
        path: "/account/event_details/:season/:ladder",
        name: "account-event_details",
        component: acountsEventDetail,
        meta: {
            NoLoginRequired: false,
            UserLoginRequired: true,
            AdminLoginRequired: false
        }
    },
    {
        path: "/account/profile-settings",
        name: "account-profile-settings",
        component: accountProfileSettings,
        meta: {
            NoLoginRequired: false,
            UserLoginRequired: true,
            AdminLoginRequired: false
        }
    },
    {
        path: "/account/reset-password",
        name: "account-reset-password",
        component: accountResetPassword,
        meta: {
            NoLoginRequired: false,
            UserLoginRequired: true,
            AdminLoginRequired: false
        }
    },
    {
        path: "/account/:season/:ladder/challenges",
        name: "account-challenges",
        component: accountChallengs,
        meta: {
            NoLoginRequired: false,
            UserLoginRequired: true,
            AdminLoginRequired: false
        }
    },
    {
        path: "/account/:season/:ladder/proposals",
        name: "account-proposals",
        component: accountProposals,
        meta: {
            NoLoginRequired: false,
            UserLoginRequired: true,
            AdminLoginRequired: false
        }
    },
    {
        path: "/account/:season/:ladder/:rank/:type/add-match",
        name: "account-add-match",
        component: accountAddMatch,
        meta: {
            NoLoginRequired: false,
            UserLoginRequired: true,
            AdminLoginRequired: false
        }
    },
    {
        path: "/account/:season/:ladder/matches",
        name: "account-matches",
        component: accountMatches,
        meta: {
            NoLoginRequired: false,
            UserLoginRequired: true,
            AdminLoginRequired: false
        }
    },
    {
        path: "/account/:season/:ladder/:rank/match/:id",
        name: "account-match",
        component: accountMatch,
        meta: {
            NoLoginRequired: false,
            UserLoginRequired: true,
            AdminLoginRequired: false
        }
    },
    {
        path: "/account/:season/:ladder/rankings",
        name: "account-rankings",
        component: accountRankings,
        meta: {
            NoLoginRequired: false,
            UserLoginRequired: true,
            AdminLoginRequired: false
        }
    },
    {
        path: "/account/support",
        name: "account-support",
        component: accountSupport,
        meta: {
            NoLoginRequired: false,
            UserLoginRequired: true,
            AdminLoginRequired: false
        }
    },

    /*admin routes */
    {
        path: "/admin/profile-settings",
        name: "admin-profile-settings",
        component: adminProfileSettings,
        meta: {
            NoLoginRequired: false,
            UserLoginRequired: false,
            AdminLoginRequired: true
        }
    },
    {
        path: "/admin/reset-password",
        name: "admin-reset-password",
        component: adminResetPassword,
        meta: {
            NoLoginRequired: false,
            UserLoginRequired: false,
            AdminLoginRequired: true
        }
    },
    {
        path: "/admin/list-users",
        name: "admin-users",
        component: listUsers,
        meta: {
            NoLoginRequired: false,
            UserLoginRequired: false,
            AdminLoginRequired: true
        }
    },
    {
        path: "/admin/update-user/:id",
        name: "admin-user-password",
        component: updateUserPassword,
        meta: {
            NoLoginRequired: false,
            UserLoginRequired: false,
            AdminLoginRequired: true
        }
    },
    {
        path: "/admin/update-user-season/:id",
        name: "admin-user-season",
        component: updateUserSeason,
        meta: {
            NoLoginRequired: false,
            UserLoginRequired: false,
            AdminLoginRequired: true
        }
    },
    {
        path: "/admin/socials",
        name: "admin-socials",
        component: adminSocials,
        meta: {
            NoLoginRequired: false,
            UserLoginRequired: false,
            AdminLoginRequired: true
        }
    },
    {
        path: "/admin/add-socials",
        name: "admin-add-socials",
        component: adminAddUpdateSocials,
        meta: {
            NoLoginRequired: false,
            UserLoginRequired: false,
            AdminLoginRequired: true
        }
    },
    {
        path: "/admin/update-socials/:id",
        name: "admin-update-socials",
        component: adminAddUpdateSocials,
        meta: {
            NoLoginRequired: false,
            UserLoginRequired: false,
            AdminLoginRequired: true
        }
    },
    {
        path: "/admin/seasons",
        name: "admin-seasons",
        component: adminSeasons,
        meta: {
            NoLoginRequired: false,
            UserLoginRequired: false,
            AdminLoginRequired: true
        }
    },
    {
        path: "/admin/add-seasons",
        name: "admin-add-seasons",
        component: adminAddUpdateSeasons,
        meta: {
            NoLoginRequired: false,
            UserLoginRequired: false,
            AdminLoginRequired: true
        }
    },
    {
        path: "/admin/update-seasons/:id",
        name: "admin-update-seasons",
        component: adminAddUpdateSeasons,
        meta: {
            NoLoginRequired: false,
            UserLoginRequired: false,
            AdminLoginRequired: true
        }
    },
];
const router = new VueRouter({
    routes, // short for `routes: routes`
    mode: "history",
    linkActiveClass: "active",
    scrollBehavior() {
        return { x: 0, y: 0 }
    }
});

router.beforeEach((to, from, next) => {
    /** CASE@  if user not login and try to access Client dashboaard protected path*/
    if (to.meta.UserLoginRequired && !isLoggedIn() && to.name !== 'home') {
        const logoutError = "Authorization failed. You need to be logged in view this page.";
        router.push({ name: 'home', params: { logoutError: logoutError } });
    } else if (to.meta.AdminLoginRequired && !isloginAdmin() && to.name !== 'home') {
        const logoutError = "Authorization failed. You need to be logged in view this page.";
        router.push({ name: 'home', params: { logoutError: logoutError } });
    }
     else {
        next();
    }
});
export default router;