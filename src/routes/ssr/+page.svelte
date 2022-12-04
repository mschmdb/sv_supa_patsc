<script>
import Nav from '../../components/nav.svelte';
export let data
const values = Object.values(data);

let countryname = ''
let stringToMatch = '';
let countries = values

function getFilteredCountries(countries, stringToMatch){
    if(stringToMatch){
        return countries.filter(country => {
            return country.Country.toLowerCase().includes(stringToMatch.toLowerCase()) || country.Currency.includes(stringToMatch.toUpperCase());
        });
    } else {
        return countries
    }
}

</script>

<Nav>
</Nav>
<div class="container m-8">
<h1 class="text-2xl">Patscen server side loaded Live from Postgres</h1>

<form>
    <input placeholder="Enter a Country Name"
    class="
    block
    rounded-md
    border-gray-300
    m-8
    shadow-sm" type="text" bind:value={stringToMatch}>
</form>
{#each getFilteredCountries(countries, stringToMatch) as value }

<li>{value.Country} - { value.Filing_Fee } { value.Currency }</li>
  
{/each}
</div>