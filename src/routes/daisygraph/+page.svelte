<script>
import Nav from '../../components/nav.svelte';
import { ProgressBar } from '@skeletonlabs/skeleton';
export let data
const values = Object.values(data);

let countryname = ''
let stringToMatch2 = '';
let filing_fees = values
filing_fees.sort((a,b) => b.Filing_Fee - a.Filing_Fee);
$: b = 27

function getFilteredCountries(filing_fees, b){
    if(b){
        // console.log("test1:")
        return filing_fees.filter(filing_fee => {
            
            return filing_fee.Filing_Fee < b
            
        });
    } else {
        // console.log("test2:")
        return filing_fee
        

    }
}
</script>

<Nav>
</Nav>
<div class="container m-8 w-10/12">
<h1 class="text-2xl">Patscen server side loaded Live from Postgres</h1>

<form>

    <input type="range" min="27" max="9000" class="range" bind:value={b} />

</form>

{b}
<div class="overflow-x-auto">
    <table class="table table-zebra w-full">
      <!-- head -->
      <thead>
        <tr>
         
          <th class="w-96">Country</th>
          <th class="w-1/2">Filing Fee</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        
            {#each getFilteredCountries(filing_fees, b) as values }
            
            <tr>
                <td class="w-1/2 whitespace-normal">{ values.Country }</td>
                <td class="w-1/2"><ProgressBar rounded="rounded-full" track="bg-primary-500-30-token" label="{ values.Currency } {values.Filing_Fee}" value={ Math.round(values.Filing_Fee) } max="2000"></ProgressBar></td>
            </tr>
            {/each}
         
        <!-- row 2 -->
      </tbody>
    </table>
  </div>
</div>