<script>

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


<div class="container m-8">
<h1 class="text-2xl">Patscen server side loaded Live from Postgres</h1>

<form>
    <input placeholder="Enter a Country Name"
     class="border-2 border-rose-600 rounded m-8" type="text" bind:value={stringToMatch}>
</form>
{#each getFilteredCountries(countries, stringToMatch) as value }

<li>{value.Country} - { value.Filing_Fee } { value.Currency }</li>
  
{/each}
</div>