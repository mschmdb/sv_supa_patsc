<script lang=ts>
import Nav from '../components/nav.svelte';
import supabase from '$lib/db'
// import { writable, type Writable } from 'svelte/store';
import { AppRail } from '@skeletonlabs/skeleton';
import { AppRailTile } from '@skeletonlabs/skeleton';

import { writable, type Writable } from 'svelte/store';

const storeValue: Writable<number> = writable(1);

let countryname

async function getData(countryname) {
    if (!countryname || countryname.length < 2) {
        
        return ""
    } else {

  const { data, error } = await supabase
    .from('patscen')
    .select()
    .ilike("Country", "%"+countryname+"%")
  if (error) throw new Error(error.message)
  
  return data
    }
}
</script>
<Nav>
</Nav>
<!-- <AppRail selected={storeValue}>
  <svelte:fragment slot="lead">Patscen</svelte:fragment>
  
    <AppRailTile label="CSR" title="Tile" value={1}>(icon)</AppRailTile>
    <AppRailTile label="Tile" title="Tile" value={1}>(icon)</AppRailTile>

  <svelte:fragment slot="trail">(trail)</svelte:fragment>
</AppRail> -->
<div class="container m-8">

<h1 class="text-2xl">Patscen client side loaded Live from Postgres</h1>

<form on:submit|preventDefault={getData}>
    <input placeholder="Enter a Country Name"
    class="
    block
    rounded-md
    border-gray-300
    m-8
    shadow-sm w-80" type="text" bind:value={countryname}>
    <!-- <input class="border-2 border-rose-600 rounded" type="submit"> -->
</form>
<!-- {countryname} -->
{#await getData(countryname)}
  <p>Fetching data...</p>
{:then data}
  {#each data as Pats }
    <li>{Pats.Country} - {Pats.Filing_Fee} {Pats.Currency}</li>
  {/each}
{:catch error}
  <p>Something went wrong while fetching the data:</p>
  <pre>{error}</pre>
{/await}
</div>