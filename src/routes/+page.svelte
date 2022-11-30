<script>

import supabase from '$lib/db'
	import { get } from 'svelte/store';
let countryname
async function getData(countryname) {

  const { data, error } = await supabase
    .from('patscen')
    .select()
    .ilike("Country", "%"+countryname+"%")
  if (error) throw new Error(error.message)
  
  return data
}
</script>
<h1>Kuck mal Arne, alle Daten mit Svelte aus Supabase (Postgres) gezogen. Yay.</h1>
<form on:submit={getData}>
    <input type="text" bind:value={countryname}><input type="submit">
</form>
<!-- {countryname} -->
{#await getData(countryname)}
  <p>Fetching data...</p>
{:then data}
  {#each data as Pats }
    <li>{Pats.Country} - {Pats.Filing_Fee}{Pats.Currency}</li>
  {/each}
{:catch error}
  <p>Something went wrong while fetching the data:</p>
  <pre>{error}</pre>
{/await}