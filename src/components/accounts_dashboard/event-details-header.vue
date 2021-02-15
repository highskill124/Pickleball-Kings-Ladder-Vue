<template>
  
    <div class="events_top_right event-top-header">
      <ul>
        <li><router-link :to="{ name: 'account-challenges',params:{season:$route.params.season,ladder:$route.params.ladder} }">Challenges</router-link></li>
        <li><router-link :to="{ name: 'account-proposals',params:{season:$route.params.season,ladder:$route.params.ladder} }">Proposals</router-link></li>
        <li><router-link :to="{ name: 'account-matches',params:{season:$route.params.season,ladder:$route.params.ladder} }">Matches</router-link></li>
        <li><router-link :to="{ name: 'account-rankings',params:{season:$route.params.season,ladder:$route.params.ladder} }">Rankings</router-link></li>
      </ul>
    </div>
</template>