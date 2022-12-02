<script>

export let data
const values = Object.values(data);
let countryname
// console.log(data)
</script>


<div class="container m-8">
<h1 class="text-2xl">Patscen Test Data Live from Postgres</h1>
{#each values as value }

<li>{value.Country} - { value.Filing_Fee } { value.Currency }</li>
  
{/each}
</div>