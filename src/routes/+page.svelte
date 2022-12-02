<script>

import supabase from '$lib/db'
// import { get } from 'svelte/store';
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
<div class="container m-8">
<h1 class="text-2xl">Patscen client side loaded Live from Postgres</h1>
<form on:submit|preventDefault={getData}>
    <input placeholder="Enter a Country Name"
     class="border-2 border-rose-600 rounded" type="text" bind:value={countryname}>
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